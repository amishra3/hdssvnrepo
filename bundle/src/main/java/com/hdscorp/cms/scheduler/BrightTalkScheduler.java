package com.hdscorp.cms.scheduler;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.scheduler.Scheduler;
import org.apache.sling.jcr.api.SlingRepository;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.restservice.BrightTalkWebService;
import com.hdscorp.cms.restservice.FeedConstant;

@Component(label = "BrightTalk Scheduler", description = "This service basically is used for consuming data from the feed", metatype = true, immediate = true)
@Service(BrightTalkScheduler.class)
@Properties({
		@Property(name = "feed.url", description = "Default feed URL is provided you can change it accordingly", value = "https://www.brighttalk.com/channel/12821/feed"),
		@Property(name = "scheduler.expression", description = "Default Cron Job", value = "0 25 13 * *?"),
		@Property(name = "storage.path", description = "Default storage path", value = "/content/hdscorp/en_us/test/jcr:content/") })

public class BrightTalkScheduler {
	private static final Logger log = LoggerFactory.getLogger(BrightTalkScheduler.class);

	@Reference
	private Scheduler scheduler;

	@Reference
	private SlingRepository repository;

	private String schedulerExpression;

	private String feedURL;

	private String storagePath;

	protected void activate(ComponentContext ctx) {
		this.schedulerExpression = ctx.getProperties().get("scheduler.expression").toString();
		this.feedURL = ctx.getProperties().get("feed.url").toString();
		this.storagePath = ctx.getProperties().get("storage.path").toString();
		Map<String, Serializable> configOne = new HashMap<>();

		final Runnable job = new Runnable() {
			public void run() {
				BrightTalkWebService brightTalkService = new BrightTalkWebService();
				saveWSResponse(brightTalkService.getInvoke(feedURL));
				log.info("data is saved::" + brightTalkService.getInvoke(feedURL));

			}
		};
		try {
			this.scheduler.addJob("cronJob", job, configOne, schedulerExpression, true);

		} catch (Exception e) {
			job.run();
		}

	}

	private void saveWSResponse(String wsResponse) {
		Session session = null;
		try {
			session = this.repository.loginAdministrative(null);
			Node node = session.getNode(storagePath);
			node.setProperty(FeedConstant.SAVE_FEED_DATA_PROPERTY_NAME, wsResponse);
			session.save();

		} catch (Exception e) {
			log.error("Exception occurs duing saving data to JCR: ", e);
		} finally {
			if (session != null && session.isLive()) {
				session.logout();
				session = null;
			}

		}
	}

}