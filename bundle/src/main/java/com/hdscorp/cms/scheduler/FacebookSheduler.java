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
import com.hdscorp.cms.restservice.FacebookWebService;
import com.hdscorp.cms.util.ServiceUtil;
import facebook4j.FacebookException;

/**
 * This service is used for getting feed posts from Facebook based on OSGI properties.
 * @author gokula.nand
 */

@Component(label = "Facebook Scheduler", description = "This service basically is used for consuming data from the facebook feed", metatype = true, immediate = true)
@Service(FacebookSheduler.class)
@Properties({ @Property(name =ServiceConstants.FB_POST_LIMIT_KEY, description = "Default facebook post limit", value = "3"),
		@Property(name =ServiceConstants.FB_POST_SEARCH_KEY, description = "Default facebook search post name", value = "94005676787"),
		@Property(name =ServiceConstants.FB_POST_APP_ID_KEY, description = "Default appId is provided you can change it accordingly", value = "950791251665098"),
		@Property(name =ServiceConstants.FB_POST_APP_SECRET_KEY, description = "Default appSecret is provided you can change it accordingly", value = "7ff465350e35a3648dce0f3b7233ab91"),
		@Property(name =ServiceConstants.FB_POST_APP_ACCESS_TOKEN_KEY, description = "Default accessToken is provided you can change it accordingly", value = "CAANgvVbPoMoBAKRaoLFtUXOf0EXo1Pzd0PsDxS6OgIG8tUAYxbJz3lEGPIImHhOnZCZC8ZCeY6QVxWBzStZC3UguZCx5PFpJdoJvfD2afXIXIZCzyHFHik0q6kmQI6KPAcybVT6NLtTVWAva14svaA2ya8oiro6Kb5ivezvlHwCRQeag5UnJgfpE5SqowhZAq4ZD"),
		@Property(name =ServiceConstants.FB_POST_SCHEDULER_EXPRESSION, description = "Default Cron Job", value = "0 30 13 * * ?"),
		@Property(name =ServiceConstants.FB_POST_STORAGE_PATH, description = "Default storage path", value = "/content/hdscorp/en_us/test/jcr:content/") })

public class FacebookSheduler {

	private static final Logger log = LoggerFactory.getLogger(FacebookSheduler.class);

	@Reference
	private Scheduler scheduler;

	@Reference
	private SlingRepository repository;

	@Reference
	private FacebookWebService facebookWebService;

	@Reference
	private ResourceResolverFactory resolverFactory;

	private String appId;

	private String appSecret;

	private String accessToken;

	private String schedulerExpression;

	private String storagePath;

	String searchPost;

	String postLimit;
	
/**
 * Useful to running scheduler based on OSGI config properties.
 * @param ctx
 */
	@Activate
	protected void activate(ComponentContext ctx) {
		log.info("Execution start for activate method of Facebook Schedular");
		this.schedulerExpression = ctx.getProperties().get(ServiceConstants.FB_POST_SCHEDULER_EXPRESSION).toString();
		this.appId = ctx.getProperties().get(ServiceConstants.FB_POST_APP_ID_KEY).toString();
		this.appSecret = ctx.getProperties().get(ServiceConstants.FB_POST_APP_SECRET_KEY).toString();
		this.accessToken = ctx.getProperties().get(ServiceConstants.FB_POST_APP_ACCESS_TOKEN_KEY).toString();
		this.storagePath = ctx.getProperties().get(ServiceConstants.FB_POST_STORAGE_PATH).toString();
		this.postLimit = ctx.getProperties().get(ServiceConstants.FB_POST_LIMIT_KEY).toString();
		this.searchPost = ctx.getProperties().get(ServiceConstants.FB_POST_SEARCH_KEY).toString();
		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {
				try {
					log.info("started facebook");
					ServiceUtil.saveWSResponse(
							facebookWebService.getFacebookFeed(searchPost, postLimit, appId, appSecret, accessToken),
							storagePath, ServiceConstants.SAVE_FB_FEED_DATA_PROPERTY_NAME);					
				} catch (FacebookException e) {
					log.error("Exception occurs duing cron job execution for facebook ", e);
				}
			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}
		log.info("Execution end for activate method of Facebook Schedular");
	}

}
