const ErrorHandler = (response, setError) => {
  switch (response.status) {
    case 200: {
      return true;
    }
    default: {
      setError(response);
      return false;
    }
  }
};

export default ErrorHandler;
