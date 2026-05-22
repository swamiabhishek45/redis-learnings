import { Worker } from "bullmq";



const emailWorker = new Worker(
    "emails",
    async (job) => {
        console.log("Processing email job...", job.id, job.name, job.data);
        (await Promise((resolve) => setTimeout(resolve, 1500)));
        console.log("Processing email job...", job.id, job.name, job.data);
    },
    {connection}
)

Worker.on("completed", (job) => {
    console.log("Job Completed!", job.id, job.name, job.data);
    
})

Worker.on("failed", (job, err) => {
    console.log("Job Failed!", job.id, job.name, job.data, err);
    
})