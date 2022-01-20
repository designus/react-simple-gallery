import React from 'react';

interface State {
  hasError: boolean;
}

interface Props {}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error: unknown) {
    console.error('Error', error)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong displaying your gallery.</h1>;
    }

    return this.props.children; 
  }
}