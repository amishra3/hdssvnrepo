package com.hdscorp.cms.scheduler;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.commons.scheduler.Scheduler;
import org.apache.sling.jcr.api.SlingRepository;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.restservice.LMSImporterService;

/**
 * This is a LML Scheduler service is used for getting data from CVS file
 * 
 * @author gokula.nand
 */
@Component(label = "LMS Scheduler", description = "This service basically is used for consuming data from CSV file", metatype = true, immediate = true)
@Service(LMSScheduler.class)
@Properties({
		@Property(name = ServiceConstants.FILE_CSV_PATH, description = "Default CSV file path is provided and you can change it accordingly", value = "/content/dam/hdscorp/en_us/lms/ProdDataCSV.csv"),
		@Property(name = ServiceConstants.FEED_SCHEDULER_EXPRESSION, description = "Default Cron Job", value = "0 25 13 * * ?"),
		@Property(name = ServiceConstants.FEED_STORAGE_PATH, description = "Default storage path", value = "/content/hdscorp/en_us/lookup/lms/jcr:content/") })

public class LMSScheduler {
	private static final Logger log = LoggerFactory.getLogger(LMSScheduler.class);

	@Reference
	private Scheduler scheduler;

	@Reference
	private SlingRepository repository;

	@Reference
	private LMSImporterService lMSImporterService;

	@Reference
	private ResourceResolverFactory resolverFactory;

	private String schedulerExpression;

	private String fileCSVPath;

	private String storagePath;

	/**
	 * Useful to running scheduler based on OSGI config properties.
	 * 
	 * @param ctx
	 */
	@Activate
	protected void activate(ComponentContext ctx) {
		log.info("Execution start for activate method of LMS Schedular");
		this.schedulerExpression = ctx.getProperties().get(ServiceConstants.FEED_SCHEDULER_EXPRESSION).toString();
		this.fileCSVPath = ctx.getProperties().get(ServiceConstants.FILE_CSV_PATH).toString();
		this.storagePath = ctx.getProperties().get(ServiceConstants.FEED_STORAGE_PATH).toString();
		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {
				log.info("started LMS scheduler");
				lMSImporterService.saveLMLResponse(fileCSVPath, storagePath);

			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}

		log.info("Execution end for activate method of LMS Schedular");
	}

}