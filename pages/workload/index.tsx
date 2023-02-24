import { WorkloadSummary } from "@aws-sdk/client-wellarchitected";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ListWorkload } from "../../api/war";
import InputButton from "../../components/input_button";
import UiFactListing, {
  UiFactListingItem,
} from "../../components/ui_fact_listing";
import UiTable from "../../components/ui_table";
import UiTag from "../../components/ui_tag";
import UiToolBar from "../../components/ui_tool_bar";
import UiWrapper from "../../components/ui_wrapper";

export default function Workload() {
  const [IsInit, setIsInit] = useState(false);
  const [Description, setDescription] = useState("");
  const [WorkloadList, setWorkloadList] = useState<WorkloadSummary[]>([]);

  useEffect(() => {
    (async () => {
      if (IsInit) return;
      setIsInit(true);

      await fetchWorkloadList();
    })();
  }, [IsInit]);

  useEffect(() => {
    (async () => {
      const queryParams = new URLSearchParams(
        location.search || `?${location.hash.substring(1)}`
      );
      setDescription(queryParams.get("d") || "");
    })();
  });

  async function fetchWorkloadList() {
    const list = await ListWorkload();
    setWorkloadList(list);
  }

  function getRiskCountList(
    rc?: Record<string, number>
  ): UiFactListingItem<string>[] {
    if (rc) {
      return Object.keys(rc).map(
        (el) =>
          ({
            label: `Risk ${el.toLowerCase()}`,
            value: `${rc[el]}`,
          } as UiFactListingItem<string>)
      );
    }
    return [];
  }

  return (
    <>
      <Head>
        <title>WARTool - Workload</title>
      </Head>
      <UiToolBar>
        <InputButton
          label="Reload"
          icon="↺"
          onClick={() => {
            fetchWorkloadList();
          }}
          debounceTime={1000}
        />
      </UiToolBar>

      <UiWrapper>
        <pre className="overflow-scroll">
          {JSON.stringify(WorkloadList, null, 2)}
        </pre>
      </UiWrapper>

      {WorkloadList.map((wl) => (
        <UiWrapper key={wl.WorkloadId}>
          <UiFactListing
            items={[
              { label: "Workload Name", value: wl.WorkloadName },
              { label: "Improvement Status", value: wl.ImprovementStatus },
              { label: "Lenses", value: wl.Lenses?.join(", ") },
              { label: "Owner", value: wl.Owner },
              ...getRiskCountList(wl.RiskCounts),
              {
                label: "Updated At",
                value: wl.UpdatedAt?.toLocaleString(),
              },
            ]}
          >
            {(val) => (
              <UiTag>
                <>{val}</>
              </UiTag>
            )}
          </UiFactListing>
        </UiWrapper>
      ))}

      <UiTable
        className=""
        head={[
          { key: "foo", title: "Foo" },
          { key: "bar", title: "Bar" },
          { key: "baz", title: "Baz" },
        ]}
        rowKeyName="foo"
        rows={[
          { foo: "foo1", bar: "bar1", baz: 12, some: "value" },
          { foo: "foo2", bar: "bar2", baz: 4, some: "more" },
          { foo: "foo3", bar: "bar3", baz: 4, some: "something" },
        ]}
      >
        {(cell) => <span>hello-{cell}</span>}
      </UiTable>

      {/*
      <UiWrapper></UiWrapper>
      */}
    </>
  );
}
