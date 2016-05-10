package com.hdscorp.cms.listeners;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.Session;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.ConfigurationPolicy;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.event.EventUtil;
import org.osgi.framework.Constants;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.constants.GlobalConstants;
import com.hdscorp.cms.util.CacheInvalidator;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.PropertyResolver;

@Component(immediate = true, label = "HDS Corp Replication EventHandler Listener", description = "HDS Corp Replication EventHandler Listener", metatype = true)
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "HDS Corp Replication EventHandler Listener"),
		@Property(name = "event.topics", value = ReplicationAction.EVENT_TOPIC),
		@Property(name = Constants.SERVICE_VENDOR, value = "HDS Corp") })
public class ReplicationEventHandlerListener implements EventHandler {

	private static final Logger LOG = LoggerFactory.getLogger(ReplicationEventHandlerListener.class);
	private Session session;
	
	
	
	@Override
	public void handleEvent(final Event event) {
		try {
		
			LOG.info("ReplicationEventHandlerListener::"+ EventUtil.isLocal(event));
			if(EventUtil.isLocal(event)){
				final ReplicationAction replicationAction = ReplicationAction.fromEvent(event);
				if(null != replicationAction){
					
					ResourceResolver resourceResolver = null;
					final String pagePath = replicationAction.getPath();
					LOG.info("Replication action {} occured on {} ",replicationAction.getType().getName(),replicationAction.getPath());
					
					if (replicationAction.getType() == ReplicationActionType.ACTIVATE) {

						if(pagePath.startsWith("/en-us/pdf") || pagePath.startsWith("/content/dam/public/en_us")){
					    
						    String[] RLPaths =	getPropertyAsArray(HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.RESOURCE_lIBRARY_PATHS));
							
							for(String path:RLPaths){
								final String shortUrl = PathResolver.getShortURLPath(path);
								CacheInvalidator.invalidateCache(shortUrl, true);
								CacheInvalidator.invalidateCache(path, false);
							}
						
						} else if(pagePath.contains("news-insights/press-releases")){
							    
						    String[] PRPaths =	getPropertyAsArray(HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.PRESS_RELEASES_PATHS));
							
							
							for(String path:PRPaths){
								
								final String shortUrl = PathResolver.getShortURLPath(path);
								CacheInvalidator.invalidateCache(shortUrl, true);
								CacheInvalidator.invalidateCache(path, false);
							}
								
						}else if(pagePath.contains("about-hds/awards")){
								    
						    String[] awardPaths =	getPropertyAsArray(HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.AWARDS_PATHS));
							
							for(String path:awardPaths){
								
								final String shortUrl = PathResolver.getShortURLPath(path);
								CacheInvalidator.invalidateCache(shortUrl, true);
								CacheInvalidator.invalidateCache(path, false);
							}
									
						}else if(pagePath.contains("news-insights/news")){
									    
							    String[] NewsPaths =	getPropertyAsArray(HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.NEWS_PATHS));
								
								for(String path:NewsPaths){
									final String shortUrl = PathResolver.getShortURLPath(path);
									CacheInvalidator.invalidateCache(shortUrl, true);
									CacheInvalidator.invalidateCache(path, false);
								}
						}
						
						
						if (StringUtils.isNotEmpty(pagePath)) {
							if(pagePath.startsWith("/etc/segmentation/hdscorp/")){
								CacheInvalidator.invalidateCache("/etc/segmentation.segment.js", false);
							}
							String shortUrl = PathResolver.getShortURLPath(pagePath);
							
							if(shortUrl.contains(".pdf.html")){
								shortUrl = shortUrl.replace(".html", "");
							}
							
							if (StringUtils.isNotBlank(shortUrl)) {
								// Invalidate Cache for Activated Page
								LOG.info("Page Modified .. invalidating cache...."+ shortUrl);
								if (CacheInvalidator.invalidateCache(shortUrl,true)) {
									LOG.info("Cache Invalidated successfully for page ::"+ shortUrl);
								} else {
									LOG.info("Error while invalidating Cache, check error log ");
								} // end if
							} // end if
						} // end if
						

					}else if(replicationAction.getType() == ReplicationActionType.DEACTIVATE){
					
					}
					

					
				} // end if
			} // end if
		}catch (Exception ex){
			LOG.error("Error occured.. Caused By :-", ex);
		}
	}
	/**
	 * Invalidate cache for respective landing pages
	 * @param type
	 * @return true|false
	 */
	private boolean invalidateLandingPages(final String type){
		boolean processStatus=false;
		try{
			ValueMap configProperties=PropertyResolver.getValueMapObject(GlobalConstants.GLOBAL_CONFIG_NODE_PATH, JcrUtilService.getResourceResolver());
			if(null!=configProperties){
				if(type.equalsIgnoreCase(GlobalConstants.ARTICLES)){
					List<String> pageList=new ArrayList<String>();
					pageList.add((String)configProperties.get("articlelandingpage",""));
					pageList.add((String)configProperties.get("noteworthypage",""));
					pageList.add((String)configProperties.get("newshappenings",""));
					pageList.add((String)configProperties.get("localevents",""));
					if(!pageList.isEmpty()){
						for (String pagePath : pageList){
							if(StringUtils.isNotEmpty(pagePath)){
								CacheInvalidator.invalidateCache(pagePath, true);
							}
						}
					}
				}else if(type.equalsIgnoreCase(GlobalConstants.RECIPES)){
					String recipeLandingPage=(String)configProperties.get("recipelandingpage","");
					if(StringUtils.isNotEmpty(recipeLandingPage)){
						CacheInvalidator.invalidateCache(recipeLandingPage, true);
					}
				}
				processStatus=true;
			}
		}catch (Exception e) {
			LOG.error("Error occured while invalidating landing pages.. Caused By :-"+ e);
		}
		return processStatus;
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
