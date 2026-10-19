import { Component } from 'react';
import { ErrorState } from './PageState/PageState';

// Keeps a crash in one page from blanking the whole app. Reset by changing `resetKey` (the route).
class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Page crashed:', error, info.componentStack);
    }

    componentDidUpdate(prevProps) {
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ hasError: false });
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorState
                    title="This page ran into a problem"
                    error={{ data: { message: 'Try reloading the page, or pick another page from the menu.' } }}
                    onRetry={() => window.location.reload()}
                />
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
