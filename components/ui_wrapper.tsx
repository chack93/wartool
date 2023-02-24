import React from "react";

export type UiWrapperProps = {
  children: JSX.Element;
};

export default function UiWrapper({ children }: UiWrapperProps): JSX.Element {
  return (
    <>
      <div className="p-3 rounded bg-slate-200 dark:bg-slate-800 shadow">
        {children}
      </div>
    </>
  );
}
