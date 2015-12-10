package com.hdscorp.cms.util;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.constants.GlobalConstants;
/**
 * Singleton
 * {@link CacheInvalidator} class used to invalidate cache 
 * @author abhinav
 *
 */
public final class CacheInvalidator {
	
	private static final Logger LOG = LoggerFactory.getLogger(CacheInvalidator.class);

	/**
	 * Private Constructor
	 */
    private CacheInvalidator() {
    }

    /**
	 * Used to invalidate cache from web servers for requested page
	 * @param invalidateUrl
	 * @param isPage
	 * @return {@link Boolean} true | false
	 */
	public static boolean invalidateCache(final String invalidateUrl, final boolean hasShortUrl){
        LOG.info("CacheInvalidation :: Requestd Path" + invalidateUrl);
		 	String page = null;
		 	String handle = null;
		 	String shorteningPath=null;
	        String []servers=null;
	        String webServerUri=null;
	        PostMethod[] post = null;
	        HttpClient httpClient=null;
	        		
            if(StringUtils.isEmpty(invalidateUrl)){
            	if(LOG.isDebugEnabled()){
                    LOG.debug("Request Cache Invalidate URL should not be null or empty" + invalidateUrl);
        		}
            	return false;
            }
	        try{
	        	httpClient = new HttpClient();
	        	webServerUri=(String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.DISPACHER_URI);
	        	final Object serversObject=HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.WEBSERVERS);
	        	if(serversObject instanceof String[]){
	        		servers=(String[])serversObject;
	        	}else{
	        		servers=new String[1];
	        		servers[0]=(String)serversObject;
	        	}
	        	if((null == servers) || (0 == servers.length) || StringUtils.isEmpty(webServerUri)){
	        		if(LOG.isDebugEnabled()){
                        LOG.debug("Web Servers Address or Dispatcher URI information should not null or empty");
	        		}
	        		return false;
	        	}
	            post = new PostMethod[servers.length];
	            for(int i = 0; ((null != servers) && (i < servers.length)); i++) {
	                if (LOG.isDebugEnabled()) {
                        LOG.debug("Servers[" + i + "]::" + servers[i]);
                        LOG.debug("Request URI::" + servers[i] + webServerUri);
	                }
	                post[i] = new PostMethod(servers[i] + webServerUri);
	                post[i].setRequestHeader(GlobalConstants.CQ_ACTION,GlobalConstants.ACTIVATE);
	            }
	            // Check if request URL has Short URL, get the shorten URL otherwise process directly
	            if(hasShortUrl) {
                    shorteningPath = PathResolver.getShortURLPath(invalidateUrl);
                } else {
                    shorteningPath = invalidateUrl;
                }
	        	
                if(LOG.isDebugEnabled()){
                    LOG.debug("Invalidating {0} page cache from Dispatcher" + shorteningPath);
	             }
                 page=shorteningPath;
	             handle = page;
	             if(LOG.isDebugEnabled()) {
                     LOG.debug("::page::" + page + " :: handle::" + handle);
	              }
	              // Make a call to all web servers to invalidate cache
	              for(int j = 0; j < post.length; j++){
	                   post[j].setRequestHeader(GlobalConstants.CQ_HANDLE, handle);
	                   final RequestEntity body = new StringRequestEntity(page, null, null);
	                   post[j].setRequestEntity(body);
	                   post[j].setRequestHeader(GlobalConstants.CONTENT_LENTGTH,String.valueOf(body.getContentLength()));
	                   if (LOG.isDebugEnabled()) {
                           LOG.debug("Calling Execute method for server  " + servers[j]);
	                   }
	                   final int responseCode = httpClient.executeMethod(post[j]);
	                   if(LOG.isDebugEnabled()){
                           LOG.debug("Response Code for " + servers[j] + " is::" + responseCode);
                           LOG.debug("Response of page::" + page + "handle::" + handle + " Server:: " + servers[j]
                                   + " is::" + post[j].getResponseBodyAsString());
	                    }
	                }
	               return true;
	        } catch (HttpException e) {
                LOG.error("HTTP exception: ", e);
            } catch(Exception e){
                LOG.error("Error while invalidating cache for requested page :" + invalidateUrl + "Caused By-" , e.getMessage());
	        }finally{
                for (final PostMethod aPost : post) {
                    aPost.releaseConnection();
                }
	        }
	        return false;
	 }
}
