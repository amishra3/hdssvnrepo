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
import com.hdscorp.cms.restservice.BlogWebService;
import com.hdscorp.cms.util.ServiceUtil;

/**
 * This is a Blog Scheduler service is used for getting feed posts from Blog
 * feed.
 * 
 * @author gokula.nand
 */
@Component(label = "Blog Scheduler", description = "This service basically is used for consuming data from the feed", metatype = true, immediate = true)
@Service(BlogScheduler.class)
@Properties({ @Property(name = ServiceConstants.FEED_POST_LIMIT, description = "Default feed post limit", value = "2"),
		@Property(name = ServiceConstants.FEED_URL_KEY, description = "Default feed URL is provided you can change it accordingly", value = "https://community.hds.com/view-browse-feed.jspa?userID=-1&browseSite=content&filterID=all~objecttype~objecttype%5bblogpost%5d&browseViewID=content"),
		@Property(name = ServiceConstants.FEED_SCHEDULER_EXPRESSION, description = "Default Cron Job", value = "0 25 13 * * ?"),
		@Property(name = ServiceConstants.FEED_STORAGE_PATH, description = "Default storage path", value = "/content/hdscorp/en_us/test/jcr:content/") })

public class BlogScheduler {
	private static final Logger log = LoggerFactory.getLogger(BlogScheduler.class);

	@Reference
	private Scheduler scheduler;

	@Reference
	private SlingRepository repository;

	@Reference
	private BlogWebService blogWebService;

	@Reference
	private ResourceResolverFactory resolverFactory;

	private String schedulerExpression;

	private String feedURL;

	private String storagePath;

	private String feedPostLimit;

	/**
	 * Useful to running scheduler based on OSGI config properties.
	 * 
	 * @param ctx
	 */
	@Activate
	protected void activate(ComponentContext ctx) {
		log.info("Execution start for activate method of Blog Schedular");
		this.schedulerExpression = ctx.getProperties().get(ServiceConstants.FEED_SCHEDULER_EXPRESSION).toString();
		this.feedURL = ctx.getProperties().get(ServiceConstants.FEED_URL_KEY).toString();
		this.storagePath = ctx.getProperties().get(ServiceConstants.FEED_STORAGE_PATH).toString();
		this.feedPostLimit = ctx.getProperties().get(ServiceConstants.FEED_POST_LIMIT).toString();
		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {
				log.info("started blog scheduler");
				ServiceUtil.saveWSResponse(blogWebService.getBlogResponse(feedURL, feedPostLimit), storagePath,
						ServiceConstants.SAVE_BLOG_FEED_DATA_PROPERTY_NAME);
			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}

		log.info("Execution end for activate method of Blog Schedular");
	}

}