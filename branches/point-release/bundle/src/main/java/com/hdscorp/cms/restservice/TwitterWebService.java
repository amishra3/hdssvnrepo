package com.hdscorp.cms.restservice;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Dictionary;
import java.util.List;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.util.ServiceUtil;

import twitter4j.Paging;
import twitter4j.ResponseList;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.UserMentionEntity;
import twitter4j.auth.AccessToken;
import twitter4j.conf.ConfigurationBuilder;

/**
 * This service is basically used for get all feed data from Twitter
 * 
 * @author venkataramana
 */
@Component(immediate = true)
@Service(value = TwitterWebService.class)
public class TwitterWebService extends GenericRestfulServiceInvokers {
	static final Logger log = LoggerFactory.getLogger(TwitterWebService.class);

	/**
	 * creates the Twitter instance using TwitterFactory
	 *
	 * @return {@link twitter instance}
	 */
	public Twitter getTwitterInstance() {
		log.info("[TwitterService]:getTwitterInstance method  Starting.");

		ConfigurationBuilder conbuild = new ConfigurationBuilder();
		getProxy(conbuild);
		TwitterFactory tf = new TwitterFactory(conbuild.build());

		Twitter twitter = tf.getInstance();
		// Twitter twitter = new TwitterFactory().getInstance();

		return twitter;
	}

	/**
	 * retrieves the twitter Response
	 * 
	 * @param consumerkey
	 * @param consumerSecret
	 * @param accessTokenKey
	 * @param accessTokenSecret
	 * @param postsLimit
	 * @return {@link string}
	 */
	public String getTwitterResponse(String consumerkey, String consumerSecret, String accessTokenKey,
			String accessTokenSecret, String postsLimit) {
		log.info("[TwitterService]:getTwitterResponse method  Starting.");

		Twitter twitter = getTwitterInstance();
		ResponseList<Status> twitterResponse = null;
		if (twitter != null) {
			twitter.setOAuthConsumer(consumerkey, consumerSecret);
			twitter.setOAuthAccessToken(new AccessToken(accessTokenKey, accessTokenSecret));

			try {

				twitterResponse = twitter.getUserTimeline(new Paging(1, Integer.parseInt(postsLimit)));
				log.info("twitter feed respones" + twitterResponse);
				return getTwitterFeedData(twitterResponse);

			} catch (Exception e) {
				log.error("[TwitterService]:getTwitterResponse  ", e.getMessage());
			}
		}

		return null;
	}

	/**
	 * changing Twitter response to json response format
	 * 
	 * @param responseList
	 * @return {@link String}
	 */
	public String getTwitterFeedData(ResponseList<Status> responseList) {
		log.info("[TwitterService]:getTwitterFeedData method  Starting.");
		JSONArray feedList = new JSONArray();
		try {
			if (responseList != null && responseList.size() > 0) {
				for (Status status : responseList) {
					JSONObject twitterFeed = new JSONObject();
					twitterFeed.put(ServiceConstants.TWITTER_ID, status.getId());
					twitterFeed.put(ServiceConstants.TWITTER_POSTED_DATE, status.getCreatedAt());
					twitterFeed.put(ServiceConstants.TIME_DIFF_POSTDATE_CURRENTDATE,
							ServiceUtil.getFeedTimeDifference(status.getCreatedAt().toString()));
					twitterFeed.put(ServiceConstants.TWITTER_MESSAGE_TEXT, status.getText());

					List<String> urls = ServiceUtil.extractUrls(status.getText().toString());

					for (UserMentionEntity nameEntity : status.getUserMentionEntities()) {

						twitterFeed.put(ServiceConstants.TWITTER_HANDLE, nameEntity.getName());
					}

					if (urls != null && urls.size() > 0) {
						StringBuffer twURLs = new StringBuffer(140);
						for (String url : urls) {
							twURLs.append(url + ",");
						}

						twitterFeed.put(ServiceConstants.TWITTER_URL, twURLs.toString());
					}

					feedList.put(twitterFeed);

				}

			}

		} catch (Exception e) {
			log.error("[TwitterService]:getTwitterFeedData  ", e.getMessage());
		}

		return feedList.toString();
	}

	private ConfigurationBuilder getProxy(ConfigurationBuilder configurationBuilder) {
		org.osgi.service.cm.Configuration config;
		try {
			config = configurationAdmin.getConfiguration(ServiceConstants.HTTPCLIENT_PID);
			Dictionary props = config.getProperties();
			if ((Boolean) props.get(ServiceConstants.PROP_PROXY_ENABLED)) {
				final String proxyHost = config.getProperties().get(ServiceConstants.PROP_PROXY_HOST).toString();
				configurationBuilder.setHttpProxyHost(proxyHost.substring(0, proxyHost.indexOf(":")));
				configurationBuilder
						.setHttpProxyPort(Integer.parseInt(proxyHost.substring(proxyHost.indexOf(":") + 1)));
			}
		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error occurs while getting proxy:  " + stack.toString());
		}
		return configurationBuilder;
	}

}