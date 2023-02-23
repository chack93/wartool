import {
  ListWorkloadsCommand,
  WorkloadSummary,
  WellArchitectedClient,
} from "@aws-sdk/client-wellarchitected";

const client = new WellArchitectedClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
});

function loadAllPages<T>(
  op: any,
  opArgs: any,
  outKey: any,
  NextToken?: string
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await client.send(new op({ ...opArgs, NextToken }));
      // @ts-ignore
      if (data["NextToken"]) {
        const nextData = await loadAllPages(
          op,
          opArgs,
          outKey,
          //@ts-ignore
          data["NextToken"]
        );
        //@ts-ignore
        resolve([...data[outKey], ...nextData[outKey]]);
        return;
      }
      //@ts-ignore
      resolve(data[outKey]);
    } catch (e) {
      reject(e);
    }
  });
}

export async function ListWorkload() {
  const data = await loadAllPages<WorkloadSummary[]>(
    ListWorkloadsCommand,
    {},
    "WorkloadSummaries"
  );
  return data;

  /*
  const data = await client.send(new ListWorkloadsCommand({}));
  if (data.NextToken) {
    const part = await client.send(
      new ListWorkloadsCommand({ NextToken: data.NextToken })
    );
  }
  return data.WorkloadSummaries;
  */
}
