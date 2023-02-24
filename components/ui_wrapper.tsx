import React from "react";

export type UiWrapperProps = {
  children: JSX.Element;
  className?: string;
};

export default function UiWrapper({
  children,
  className = "",
}: UiWrapperProps): JSX.Element {
  return (
    <>
      <div
        className={`my-3 p-3 rounded bg-slate-200 dark:bg-slate-800 shadow ${className}`}
      >
        {children}
      </div>
    </>
  );
}
