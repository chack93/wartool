import React from "react";

export type UiFactListingItem<T> = { label: string; value: T };

export type UiFactListingProps<T> = {
  items: UiFactListingItem<T>[];
  children?: (cell: T) => JSX.Element;
  className?: string;
};

export default function UiFactListing<T>({
  items,
  children = (item) => <>{`${item}`}</>,
  className = "",
}: UiFactListingProps<T>): JSX.Element {
  return (
    <>
      <div className={`w-fit grid grid-cols-2 gap-3 ${className}`}>
        {items.map((item, itemIdx) => (
          <React.Fragment key={`${itemIdx}-${item.label}-${item.value}`}>
            <div className="text-end">{item.label}:</div>
            <div className="">{children(item.value)}</div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
