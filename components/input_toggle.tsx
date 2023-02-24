import React, { useId } from "react";

export type InputToggleProps = {
  label?: string;
  name?: string;
  value: boolean;
  onChange: (on: boolean) => void;
};

export default function InputToggle({
  label,
  name,
  value,
  onChange,
}: InputToggleProps): JSX.Element {
  const lblId = useId();

  return (
    <>
      <label
        htmlFor={lblId}
        className="flex items-center cursor-pointer select-none"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={lblId}
            name={name}
            className="sr-only"
            checked={value}
            onChange={(e) => {
              const checked = e.target.checked;
              onChange(checked);
            }}
          />
          <div
            className={`block ${
              value
                ? "bg-lime-300 dark:bg-lime-700"
                : "bg-rose-300 dark:bg-rose-700"
            } w-14 h-8 rounded-full`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-slate-100 dark:bg-slate-900 w-6 h-6 rounded-full transition ${
              value ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
        {label && <div className="ml-3 text-base">{label}</div>}
      </label>
    </>
  );
}
