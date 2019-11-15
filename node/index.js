const { ZBClient } = require("zeebe-node");

const zbc = new ZBClient("localhost:26500");

zbc.createWorker("my-first-worker", "log", (job, complete) => {
  console.log(job);
  // complete.success({
  //   approved: true,
  //   customerId: 99
  // });
  complete.success();
});

// zbc.createWorker("my-second-worker", "fetch-items", (job, complete) => {
//   console.log(job);
//   complete.success();
// });

// zbc.createWorker("my-third-worker", "ship-parcel", (job, complete) => {
//   console.log(job);
//   complete.success();
// });
