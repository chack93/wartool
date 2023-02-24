import React from "react";

export enum UiTableHeadSort {
  NONE,
  ASC,
  DESC,
}
export type UiTableHead = {
  key: string;
  title: string;
  sort?: UiTableHeadSort;
};

export type UiTableColumn<T> = { [key: string]: T };

export type UiTableRow<T> = UiTableColumn<T>;

export type UiTableProps<T> = {
  head?: UiTableHead[];
  rows: UiTableRow<T>[];
  children?: (cell: T) => JSX.Element;
  renderCell?: (cell: T) => JSX.Element;
  rowKeyName?: string;
  className?: string;
};

export default function UiTable<T>({
  head,
  rows,
  children = (cell) => <>{`${cell}`}</>,
  rowKeyName = "id",
  className = "",
}: UiTableProps<T>): JSX.Element {
  const rowFilter = (row: UiTableRow<T>) => true;
  const rowSort = (rowA: UiTableRow<T>, rowB: UiTableRow<T>) => 0;

  return (
    <>
      <table className={`table-auto w-full border-collapse ${className}`}>
        {head && (
          <thead>
            <tr>
              {head.map((colKey) => (
                <th
                  key={`${colKey.key}-${colKey.title}`}
                  className="p-3 text-left text-base font-medium"
                >
                  {colKey.title}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows
            .filter(rowFilter)
            .sort(rowSort)
            .map((row, rowIdx) => {
              const __rowKey = `${rowIdx}-${row[rowKeyName] || ""}`;
              const headList = (head ||
                Object.keys(row).map((el) => ({
                  key: el,
                  title: "",
                }))) as UiTableHead[];

              const orderedColumnList = headList.map((el) => row[el.key] as T);
              return { __rowKey, orderedColumnList };
            })
            .map((rd) => (
              <tr key={rd.__rowKey}>
                {rd.orderedColumnList.map((cellData, cellIdx) => (
                  <td
                    key={`${rd.__rowKey}-${cellIdx}-${cellData}`}
                    className="p-3 text-left border-y border-slate-300 dark:border-slate-700"
                  >
                    {children(cellData)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
