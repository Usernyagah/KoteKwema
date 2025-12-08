import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // You can log to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
            <h2 className="text-2xl font-semibold text-white/90 mb-6">
              Something went wrong
            </h2>
            <p className="text-white/70 mb-8">
              We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
            </p>
            {this.state.error && process.env.NODE_ENV === 'development' && (
              <details className="mb-8 text-left bg-[#333333] p-4 rounded text-white/60 text-sm">
                <summary className="cursor-pointer mb-2 font-semibold">Error Details (Development Only)</summary>
                <pre className="whitespace-pre-wrap overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white text-[#1A1A1A] font-bold rounded hover:bg-white/90 transition-colors"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded hover:bg-white/10 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

