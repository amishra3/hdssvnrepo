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
import com.hdscorp.cms.restservice.TwitterWebService;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ServiceUtil;
/**
 * {@link TwitterScheduler} Executes cron job, Stores TwitterFeed data in jcr
 * @author venkataramana
 *
 */
@Component(immediate = true, metatype = true, label = "TwitterScheduler ", description = "TwitterScheduler")
@Service(TwitterScheduler.class)
@Properties(

{
		@Property(name = ServiceConstants.TWITTER_CONSUMER_KEY, description = "twitter consumerkey", value = "mtu5dhs8kuieZKyprangmE1yP"),
		@Property(name = ServiceConstants.TWITTER_CONSUMER_SECRET, description = "consumersecret", value = "OMXEQdM3XukOMtWFjEEFki9eitOZOreT6nwMqKpHCAOlVsWktP"),
		@Property(name = ServiceConstants.TWITTER_ACCESSTOKEN_KEY, description = "accessTokenKey", value = "3704675233-MjwZevDRLXwlhk35kWfhoJG5pSJZR2BfkEtkpj4"),
		@Property(name = ServiceConstants.TWITTER_ACCESSTOKEN_SECRET, description = "accessTokenSecret", value = "PknaA05nj6csIQqeT3GMrIY863m4FrXugaepl2dGSTV3a"),
		@Property(name = ServiceConstants.TWITTER_STORAGE_PATH, description = "Default storage path", value = "/content/test-website/mywebsite/jcr:content/"),
		@Property(name = ServiceConstants.TWITTER_SCHEDULER_EXPRESSION, description = "Default Cron Job", value = "0 16 13 * * ?"),
		@Property(name = ServiceConstants.TW_POST_LIMIT , description = "number of posts", value = "3") })
public class TwitterScheduler {
	private static final Logger log = LoggerFactory.getLogger(TwitterScheduler.class);

	@Reference
	private Scheduler scheduler;

	@Reference
	private SlingRepository repository;

	@Reference
	private TwitterWebService twitterService;
	@Reference
	private ResourceResolverFactory resolverFactory;
	@Reference
	private JcrUtilService jcrUtilService;

	private String schedulerExpression;

	private String consumerkey;
	private String consumerSecret;
	private String accessTokenKey;
	private String accessTokenSecret;

	private String storagePath;
	private String numberOfPosts;
	
	/**
	 * Useful to running scheduler based on OSGI config properties.
	 * @param ctx
	 */
     @Activate
	protected void activate(ComponentContext ctx) {
		log.info("[TwitterScheduler]: Activated method called");
		this.schedulerExpression = ctx.getProperties().get(ServiceConstants.TWITTER_SCHEDULER_EXPRESSION).toString();
		this.consumerkey = ctx.getProperties().get(ServiceConstants.TWITTER_CONSUMER_KEY).toString();
		this.consumerSecret = ctx.getProperties().get(ServiceConstants.TWITTER_CONSUMER_SECRET).toString();
		this.accessTokenKey = ctx.getProperties().get(ServiceConstants.TWITTER_ACCESSTOKEN_KEY).toString();
		this.accessTokenSecret = ctx.getProperties().get(ServiceConstants.TWITTER_ACCESSTOKEN_SECRET).toString();
		this.storagePath = ctx.getProperties().get(ServiceConstants.TWITTER_STORAGE_PATH).toString();
		this.numberOfPosts = ctx.getProperties().get(ServiceConstants.TW_POST_LIMIT).toString();
		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {

				ServiceUtil.saveWSResponse(twitterService.getTwitterResponse(consumerkey, consumerSecret,
						accessTokenKey, accessTokenSecret, numberOfPosts), storagePath,
						ServiceConstants.TWITTER_SAVE_FEED_DATA_PROPERTY_NAME);

			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}

		log.info("[TwitterScheduler]: Activated method method  Ending.");
	}

}
