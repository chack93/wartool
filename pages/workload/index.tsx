import { WorkloadSummary } from "@aws-sdk/client-wellarchitected";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ListWorkload } from "../../api/war";
import InputButton from "../../components/input_button";
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
            console.log("click");
            //fetchWorkloadList();
          }}
        />
      </UiToolBar>

      <UiWrapper>
        <pre className="overflow-scroll">
          {JSON.stringify(WorkloadList, null, 2)}
        </pre>
      </UiWrapper>
    </>
  );
}
