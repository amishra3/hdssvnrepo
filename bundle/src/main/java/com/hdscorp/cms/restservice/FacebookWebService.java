package com.hdscorp.cms.restservice;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Dictionary;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.util.ServiceUtil;

import facebook4j.Facebook;
import facebook4j.FacebookException;
import facebook4j.FacebookFactory;
import facebook4j.Post;
import facebook4j.Reading;
import facebook4j.ResponseList;
import facebook4j.conf.Configuration;
import facebook4j.conf.ConfigurationBuilder;
import facebook4j.internal.org.json.JSONArray;
import facebook4j.internal.org.json.JSONObject;


/**
 * This Facebook WebService is used for getting post feeds from facebook.
 * @author gokula.nand
 */
@Component(immediate = true)
@Service(value = FacebookWebService.class)
public class FacebookWebService {
private static final Logger log = LoggerFactory.getLogger(FacebookWebService.class);


@Reference
ConfigurationAdmin configurationAdmin;
final String propProxyHost = "proxy.host";

final String propProxyEnabled = "proxy.enabled";
private static final String HTTPCLIENT_PID = "com.day.commons.httpclient";


/**Useful for get service response based below parameter.
 * 
 * @param facebookPostName
 * @param postLimt
 * @param appId
 * @param appSecret
 * @param accessToken
 * @throws FacebookException
 */
	public String getFacebookFeed(String facebookPostName, String postLimt, String appId, String appSecret,
			String accessToken) throws FacebookException {
		log.info("Execution start for getFacebookFeed() ");
		JSONArray jsonArray = new JSONArray();
		if (getFacebookInstance(appId, appSecret, accessToken) != null) {
			ResponseList<Post> results = getFacebookInstance(appId, appSecret, accessToken).getPosts(facebookPostName,
					new Reading().limit(Integer.parseInt(postLimt)));		
		
			try {
				for (Post post : results) {
				
					/*log.info("facebook result start");
					log.info("post title:::"+post.getMessage());
					log.info("post description :::"+post.getMessage());
					log.info("post link:::"+post.getLink());
					log.info("post thumbnail:::"+post.getPicture());
					log.info("post type:::"+post.getType());
					
					log.info("facebook result end");*/
					
					JSONObject jsonObject = new JSONObject();
					jsonObject.put(ServiceConstants.JSON_FB_ID, post.getId());
					jsonObject.put(ServiceConstants.JSON_FB_POST_ID, post.getId().substring(post.getId().indexOf("_")+1));
					jsonObject.put(ServiceConstants.JSON_FB_MESSAGE, post.getMessage());
					jsonObject.put(ServiceConstants.JSON_FB_CreatedDate,
							ServiceUtil.getDisplayDateFormat(post.getCreatedTime().toString(),
									ServiceConstants.FEED_RESPONSE_TIME_FORMAT,
									ServiceConstants.FB_POST_FEED_DISPLAY_DATE_FORMAT));

					jsonArray.put(jsonObject);
				}
			} catch (Exception e) {
				log.error("Exception occured while fetching feed from facebook " + e);
			}
		}
		return jsonArray.toString();
	}
/**
 * Useful for get instance of ConfigurationBuilder.
 * @param appId
 * @param appSecret
 * @param accessToken
 * @return
 */
	private ConfigurationBuilder getFacebookConfigurationBuilder(String appId, String appSecret, String accessToken) {
		log.info("Execution start for getFacebookConfigurationBuilder() ");
		ConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
		configurationBuilder.setDebugEnabled(true);
		configurationBuilder.setOAuthAppId(appId);
		configurationBuilder.setOAuthAppSecret(appSecret);
		configurationBuilder.setOAuthAccessToken(accessToken);
		configurationBuilder.setOAuthPermissions(ServiceConstants.FB_PERSMISSION_STRING);
		configurationBuilder.setUseSSL(true);
		configurationBuilder.setJSONStoreEnabled(true);
		getProxy(configurationBuilder);
		return configurationBuilder;
	}
/**
 * Useful for get instance of Facebook.
 * @param appId
 * @param appSecret
 * @param accessToken
 * @return
 */
	private Facebook getFacebookInstance(String appId, String appSecret, String accessToken) {
		log.info("Execution start for getFacebookInstance() ");
		Configuration configuration = getFacebookConfigurationBuilder(appId, appSecret, accessToken).build();
		FacebookFactory ff = new FacebookFactory(configuration);
		Facebook facebook = ff.getInstance();
		return facebook;
	}
	
	private ConfigurationBuilder getProxy(ConfigurationBuilder configurationBuilder){
		org.osgi.service.cm.Configuration config;
		try {
			config = configurationAdmin.getConfiguration(HTTPCLIENT_PID);
			Dictionary props = config.getProperties();
			if ((Boolean) props.get(propProxyEnabled)) {
				final String proxyHost = config.getProperties()
                        .get(propProxyHost).toString();		         
               configurationBuilder.setHttpProxyHost(proxyHost.substring(0, proxyHost.indexOf(":")));
               configurationBuilder.setHttpProxyPort(Integer.parseInt(proxyHost.substring(proxyHost.indexOf(":")+1)));
               //configurationBuilder.setHttpProxyUser(PROXY_USER);
              // configurationBuilder.setHttpProxyPassword(PROXY_PASS);                  
			}		
			}
		catch(Exception e){
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error occurs while getting proxy:  "+stack.toString());
				}
		return configurationBuilder;
			}
	
	
}
