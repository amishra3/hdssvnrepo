package com.hdscorp.cms.scheduler;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.PropertyUnbounded;
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
		@Property(name = ServiceConstants.TWITTER_ACCESS_DETAILS, description = "Provide Twitter Handle Detail EX:- consumerkey=Q7yBVmniWA2TBWCgO8sl9SOXl,consumerSecret=hvlVrHr8DbXYOtddhRL4kTUeqc4eborPDeJ4Im8ctiy2DV1wy1,accessTokenKey=15354310-bevOoaxSL9TWCfzHAgHSTBwYxRfoFpvBmuSBgrKWY,accessTokenSecret=NrnePhQ39PGprGZxW54s9SEAvbkm5cGoeY0Kk4OswHy5p,storagePath=/content/hdscorp/en_us/lookup/twitterfeeddata/jcr:content/,postlimit=3", value = "",unbounded = PropertyUnbounded.ARRAY),		
		@Property(name = ServiceConstants.TWITTER_SCHEDULER_EXPRESSION, description = "Default Cron Job", value = "0 * * * * ? ")})
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

	private String[] twitterAccessDetails;
		

	
	
	
	
	
	/**
	 * Useful to running scheduler based on OSGI config properties.
	 * @param ctx
	 */
     @Activate
	protected void activate(ComponentContext ctx) {
		log.info("[TwitterScheduler]: Activated method called");
		this.schedulerExpression = ctx.getProperties().get(ServiceConstants.TWITTER_SCHEDULER_EXPRESSION).toString();
		this.twitterAccessDetails = getPropertyAsArray(ctx.getProperties().get(ServiceConstants.TWITTER_ACCESS_DETAILS));
		

		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {
				try {
					
					
				if (twitterAccessDetails!=null && twitterAccessDetails.length >1) 	{
					
				for (int i = 0; i <twitterAccessDetails.length ; i++) {
					Map<String,String> map = new HashMap<String,String>();
					String[] accountDeatails = twitterAccessDetails[i].split(",");
					for (String keyValuePair : accountDeatails) {
						String[] keyValue = keyValuePair.split("=");
						

						if (keyValue!=null && keyValue.length>1) {
							
						map.put(keyValue[0], keyValue[1]);
						
						}
						
					}
					
					ServiceUtil.saveWSResponse(twitterService.getTwitterResponse(map.get(ServiceConstants.TWITTER_CONSUMER_KEY), map.get(ServiceConstants.TWITTER_CONSUMER_SECRET),
							map.get(ServiceConstants.TWITTER_ACCESSTOKEN_KEY), map.get(ServiceConstants.TWITTER_ACCESSTOKEN_SECRET), map.get(ServiceConstants.TW_POST_LIMIT)), map.get(ServiceConstants.TWITTER_STORAGE_PATH),
							ServiceConstants.TWITTER_SAVE_FEED_DATA_PROPERTY_NAME);
					
				}
				
				}
				}
				catch (Exception e) {
					log.error("Exception occurs during cron job execution for twitter ", e);
				}
			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}

		log.info("[TwitterScheduler]: Activated method method  Ending.");
	}
     
     private String[] getPropertyAsArray(Object obj){
 		String []paths={""};
 		if(obj!=null) {
 			
 		if(obj instanceof String[]){
 			paths=(String[])obj;
     	}else{
     		paths=new String[1];
     		paths[0]=(String)obj;
     	}
 		
 		}
 		return paths;
 		
 	}

}
