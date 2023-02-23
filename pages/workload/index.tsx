import { WorkloadSummary } from "@aws-sdk/client-wellarchitected";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ListWorkload } from "../../api/war";

export default function Workload() {
  const [IsInit, setIsInit] = useState(false);
  const [Description, setDescription] = useState("");
  const [WorkloadList, setWorkloadList] = useState<WorkloadSummary[]>([]);

  useEffect(() => {
    (async () => {
      if (IsInit) return;
      setIsInit(true);

      const list = await ListWorkload();
      setWorkloadList(list);
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

  return (
    <>
      <Head>
        <title>WARTool - Workload</title>
      </Head>
      <h1 className="text-3xl">Workload</h1>
      <div className="text">{`Something: ${Description}`}</div>
      <pre className="overflow-scroll">
        {JSON.stringify(WorkloadList, null, 2)}
      </pre>
    </>
  );
}
