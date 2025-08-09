interface SectionLoaderProps {
  sectionName?: string;
}

function SectionLoader({ sectionName = "section" }: SectionLoaderProps) {
  return (
    <div className="section-loading flex items-center justify-center min-h-screen">
      <div className="loading-content text-center">
        {/* Animated loading spinner */}
        <div className="loading-spinner mb-4">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
        </div>
        
        {/* Loading text */}
        <div className="loading-text">
          <p className="text-emerald-300 text-lg font-medium mb-2">
            Loading {sectionName}...
          </p>
          <p className="text-gray-400 text-sm">
            Please wait while we prepare your content
          </p>
        </div>
        
        {/* Loading progress dots */}
        <div className="loading-dots flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default SectionLoader;
