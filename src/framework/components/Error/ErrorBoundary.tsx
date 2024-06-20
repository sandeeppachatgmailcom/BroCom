import { Component, ErrorInfo, ReactNode } from "react";
import { ImSpinner9 } from "react-icons/im";
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state to indicate the error
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Error caught by error boundary:", error, errorInfo);

  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any fallback UI
      return (<div className="h-screen w-screen flex justify-center items-center flex-col font-bold font-roboto">
        <div className="w-1/2 h-[50%] shadow-xl  bg-opacity-5 justify-center items-center flex flex-col">
          <h1 className="text-2xl text-blue-500 animate-pulse">Something went wrong. Please try again</h1>

          <ImSpinner9 className="w-20 text-orange-600   h-20 animate-spin " />
        </div>

      </div>)
    }

    return this.props.children;
  }
}

export default ErrorBoundary;