"use client";

import { useForwardRef } from "@/lib/hooks/use-forward-ref";
import { useRouter } from "next/navigation";
import * as React from "react";

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {}

export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, ...props }, ref) => {
    const router = useRouter();

    const dialogRef = useForwardRef<HTMLDialogElement>(ref);

    React.useEffect(() => {
      if (!dialogRef?.current) return;
      const el = dialogRef.current;
      const handleClick = (e: MouseEvent) => {
        if (e.target === el) {
          el.close();
          router.back();
        }
      };
      el.addEventListener("click", handleClick);
      return () => el.removeEventListener("click", handleClick);
    }, [dialogRef, router]);

    return (
      <dialog ref={dialogRef} {...props}>
        {children}
      </dialog>
    );
  },
);

Dialog.displayName = "Dialog";
