import React from "react";

export type UiTagProps = {
  children: JSX.Element;
  className?: string;
};

export default function UiTag({
  children,
  className = "",
}: UiTagProps): JSX.Element {
  return (
    <>
      <div
        className={`flex justify-center content-center gap-2 w-fit px-2 py-px rounded-full text-sm bg-lime-300 dark:bg-lime-700 ${className}`}
      >
        {children}
      </div>
    </>
  );
}
