"use client";

import * as React from "react";

export const useOnMount = () => {
  const [didMount, setDidMount] = React.useState(false);

  React.useEffect(() => {
    if (!didMount) {
      setDidMount(true);
    }
  }, [didMount]);

  return didMount;
};
