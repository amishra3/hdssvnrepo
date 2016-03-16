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
import com.hdscorp.cms.restservice.BrightCoveImporterService;
import com.hdscorp.cms.util.ServiceUtil;

/**
 * This is a BrightCove Scheduler service is used for getting feed posts from Bright cove feed.
 * @author gokula.nand
 */
@Component(label = "BrightCove Scheduler", description = "This service basically is used for consuming data from the feed", metatype = true, immediate = true)
@Service(BrightCoveScheduler.class)
@Properties({
		@Property(name = ServiceConstants.FEED_URL_KEY, description = "Default feed URL is provided you can change it accordingly", value = "http://api.brightcove.com/services/library?command=search_videos&any=tag:hdscorp&output=mrss&token=J-KzSklqGjvSZ83MDVgB1Z3dYwbchmoH_8O2TX0j_JZflnvN9eqcNQ.."),
		@Property(name = ServiceConstants.FEED_SCHEDULER_EXPRESSION, description = "Default Cron Job", value = "0 25 13 * * ?"),
		@Property(name = ServiceConstants.FEED_STORAGE_PATH, description = "Default storage path", value = "/content/dam/public/en_us/videos") })

public class BrightCoveScheduler {
	private static final Logger log = LoggerFactory.getLogger(BrightCoveScheduler.class);

	@Reference
	private Scheduler scheduler;

	
	@Reference
	private BrightCoveImporterService brightCoveImporterService;

	

	private String schedulerExpression;

	private String feedURL;

	private String storagePath;

	/**
	 * Useful to running scheduler based on OSGI config properties.
	 * @param ctx
	 */
	@Activate
	protected void activate(ComponentContext ctx) {
		log.info("Execution start for activate method of Brightcove Schedular");
		this.schedulerExpression = ctx.getProperties().get(ServiceConstants.FEED_SCHEDULER_EXPRESSION).toString();
		this.feedURL = ctx.getProperties().get(ServiceConstants.FEED_URL_KEY).toString();
		this.storagePath = ctx.getProperties().get(ServiceConstants.FEED_STORAGE_PATH).toString();
		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {
				log.info("started brightcove scheduler");
				brightCoveImporterService.getBrightCoveResponse(feedURL,storagePath);
			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}

		log.info("Execution end for activate method of Brightcove Schedular");
	}

}