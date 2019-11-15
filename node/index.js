const { ZBClient } = require("zeebe-node");

const zbc = new ZBClient("localhost:26500");
const uuid = require("uuid/v4");

zbc.createWorker(uuid(), "create-claim-request", async (job, complete) => {
  console.log("create-claim-request");
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
  console.log("accept-reject-claim-request");
  console.log(job);
  complete.success({
    approved: true
  });
});

zbc.createWorker(uuid(), "update-dispute-case-status", (job, complete) => {
  console.log("update-dispute-case-status");
  console.log(job);
  complete.success();
});

zbc.createWorker(uuid(), "create-claim", (job, complete) => {
  console.log("create-claim");
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
      version: 3
    }
  );
  console.log(result);
})();
