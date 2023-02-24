import React, { useId, useState } from "react";

export enum InputButtonPropsType {
  Button = "button",
  Submit = "submit",
}

export type InputButtonProps = {
  label?: string;
  icon?: string;
  name?: string;
  type?: InputButtonPropsType;
  onClick: () => void;
  debounceTime?: number;
  className?: string;
};

export default function InputButton({
  label = "",
  icon = "",
  name,
  type = InputButtonPropsType.Button,
  onClick,
  debounceTime = 0,
  className = "",
}: InputButtonProps): JSX.Element {
  const lblId = useId();
  const [LastClick, setLastClick] = useState(0);

  return (
    <>
      <label
        htmlFor={lblId}
        className={`flex justify-center content-center gap-2 cursor-pointer select-none w-fit px-3 py-1 rounded-full text-base bg-lime-300 dark:bg-lime-700 ${className}`}
      >
        {label && <div>{label}</div>}
        {icon && <div>{icon}</div>}
        <input
          id={lblId}
          name={name}
          type={type}
          className="sr-only"
          onClick={() => {
            const now = Date.now();
            if (debounceTime && now - LastClick < debounceTime) {
              return;
            }
            setLastClick(now);
            onClick();
          }}
        />
      </label>
    </>
  );
}
