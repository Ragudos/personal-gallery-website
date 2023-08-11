"use client";

import * as React from "react";

const ErrorPage: React.FC<{
  error: Error;
  reset: () => void
}> = ({
  error,
  
}) => {

  return (
    <div>{error.message}</div>
  );
};

export default ErrorPage;