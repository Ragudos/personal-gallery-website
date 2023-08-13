"use client";

import * as React from "react";

export const useForwardRef = <T,>(
  ref: React.ForwardedRef<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any = null
) => {
  const targetRef = React.useRef<T>(initialValue);

  React.useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};