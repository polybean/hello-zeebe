package com.example.zeebe;

import io.zeebe.client.api.response.ActivatedJob;
import io.zeebe.client.api.worker.JobClient;
import io.zeebe.spring.client.EnableZeebeClient;
import io.zeebe.spring.client.annotation.ZeebeWorker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.Instant;

@SpringBootApplication
@EnableZeebeClient
public class ZeebeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZeebeApplication.class, args);
	}

	@ZeebeWorker(type = "log")
	public void shipParcel(final JobClient client, final ActivatedJob job) {
		logJob(job);
		client.newCompleteCommand(job.getKey()).send().join();
	}

	private static void logJob(final ActivatedJob job) {
//		log.info(
//				"complete job\n>>> [type: {}, key: {}, element: {}, workflow instance: {}]\n{deadline; {}]\n[headers: {}]\n[variables: {}]",
//				job.getType(),
//				job.getKey(),
//				job.getElementId(),
//				job.getWorkflowInstanceKey(),
//				Instant.ofEpochMilli(job.getDeadline()),
//				job.getCustomHeaders(),
//				job.getVariables());
		System.out.println(job);
	}
}
