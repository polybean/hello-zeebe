const { ZBClient } = require("zeebe-node");

const zbc = new ZBClient("localhost:26500");
const uuid = require("uuid/v4");

zbc.createWorker(uuid(), "create-claim-request", async (job, complete) => {
  console.log(job.variables);
  complete.success();

  await zbc.publishMessage({
    correlationKey: job.variables.correlationKey,
    messageId: uuid(),
    name: "claim-created",
    variables: { valueToAddToWorkflowVariables: "here", status: "PROCESSED" },
    timeToLive: 10000
  });
});

zbc.createWorker(uuid(), "accept-reject-claim-request", (job, complete) => {
  console.log(job);
  complete.success();
});

(async () => {
  const result = await zbc.createWorkflowInstance(
    "claim-management",
    {
      testData: "something",
      correlationKey: uuid()
    },
    {
      version: 2
    }
  );
  console.log(result);
})();
