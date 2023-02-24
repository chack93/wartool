import React from "react";

export type UiToolBarProps = {
  children: JSX.Element;
};

export default function UiToolBar({ children }: UiToolBarProps): JSX.Element {
  return (
    <>
      <div className="flex justify-start content-center pb-3 mb-3 border-b border-slate-300 dark:border-slate-700">
        {children}
      </div>
    </>
  );
}
