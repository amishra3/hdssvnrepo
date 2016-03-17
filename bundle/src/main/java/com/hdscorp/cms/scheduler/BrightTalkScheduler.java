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

import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.restservice.BrightTalkWebService;
import com.hdscorp.cms.util.ServiceUtil;

/**
 * This is a BrightTalk Scheduler service is used for getting feed posts from Brighttalk feed.
 * @author gokula.nand
 */
@Component(label = "BrightTalk Scheduler", description = "This service basically is used for consuming data from the feed", metatype = true, immediate = true)
@Service(BrightTalkScheduler.class)
@Properties({
		@Property(name = ServiceConstants.FEED_URL_KEY, description = "Default feed URL is provided you can change it accordingly", value = "https://www.brighttalk.com/channel/12821/feed"),
		@Property(name = ServiceConstants.FEED_SCHEDULER_EXPRESSION, description = "Default Cron Job", value = "0 25 13 * * ?"),
		@Property(name = ServiceConstants.FEED_STORAGE_PATH, description = "Default storage path", value = "/content/hdscorp/en_us/test/jcr:content/") })

public class BrightTalkScheduler {
	private static final Logger log = LoggerFactory.getLogger(BrightTalkScheduler.class);

	@Reference
	private Scheduler scheduler;

	@Reference
	private SlingRepository repository;

	@Reference
	private BrightTalkWebService brightTalkService;

	@Reference
	private ResourceResolverFactory resolverFactory;

	private String schedulerExpression;

	private String feedURL;

	private String storagePath;

	/**
	 * Useful to running scheduler based on OSGI config properties.
	 * @param ctx
	 */
	@Activate
	protected void activate(ComponentContext ctx) {
		log.info("Execution start for activate method of BrightTalk Schedular");
		this.schedulerExpression = ctx.getProperties().get(ServiceConstants.FEED_SCHEDULER_EXPRESSION).toString();
		this.feedURL = ctx.getProperties().get(ServiceConstants.FEED_URL_KEY).toString();
		this.storagePath = ctx.getProperties().get(ServiceConstants.FEED_STORAGE_PATH).toString();
		HdsCorpGlobalConfiguration.BRIGHTTALK_DATA_STORAGE_PATH = this.storagePath ;
		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {
				log.info("started brightTalk scheduler");
				ServiceUtil.saveWSResponse(brightTalkService.getBrightTalkResponse(feedURL), storagePath,
						ServiceConstants.SAVE_FEED_DATA_PROPERTY_NAME);
			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}

		log.info("Execution end for activate method of BrightTalk Schedular");
	}

}