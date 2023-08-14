import * as React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-full w-8 h-8 border-[1px] border-solid border-foreground border-r-accent animate-spin" />
      Fetching images...
    </div>
  );
};

export default LoadingPage;
