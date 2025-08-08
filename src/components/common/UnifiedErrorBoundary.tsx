import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Unified Error Boundary that replaces both ErrorBoundary and SectionErrorBoundary
 * Provides consistent error handling across the application
 */
class UnifiedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error with section context if provided
    const context = this.props.sectionName ? `${this.props.sectionName} section` : 'application';
    console.error(`Error in ${context}:`, error, errorInfo);
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback with section-specific messaging
      const sectionName = this.props.sectionName;
      const errorMessage = sectionName 
        ? `Something went wrong in the ${sectionName} section.`
        : 'Something went wrong.';

      return (
        <div 
          className="error-fallback flex flex-col items-center justify-center min-h-[200px] p-8 text-center"
          role="alert"
          aria-label={sectionName ? `${sectionName} section error` : 'Application error'}
        >
          <div className="glass-effect rounded-lg p-6 max-w-md">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-300 mb-4">
              {errorMessage}
            </p>
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Try again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 text-xs text-red-300 bg-red-900/20 p-2 rounded overflow-auto max-h-32">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default UnifiedErrorBoundary;
