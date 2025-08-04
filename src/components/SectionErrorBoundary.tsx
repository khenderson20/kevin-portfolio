import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  sectionName: string;
}

interface State {
  hasError: boolean;
}

class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.sectionName} section:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-fallback" aria-label={`${this.props.sectionName} section error`}>
          <p>Something went wrong in the {this.props.sectionName} section.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;