/*
 * Decompiled with CFR 0_110.
 * 
 * Could not load the following classes:
 *  com.hdscorp.cms.util.MultifieldUtil
 *  javax.inject.Inject
 *  javax.inject.Named
 *  org.apache.sling.api.resource.Resource
 *  org.apache.sling.models.annotations.Default
 *  org.apache.sling.models.annotations.Model
 */
package com.hdscorp.cms.slingmodels;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.util.PageUtils;

@Model(adaptables = { Resource.class })
public class FacebookFeedModel {
	private static final Logger log = LoggerFactory.getLogger(FacebookFeedModel.class);
	@Inject
	private ResourceResolver resourceResolver;
	
	 @Inject
	 @Named("jcr:fefacebookctalabel")
	 @Default(values = { "ctaLabel" })
	 private String ctaLabel;
     @Inject
	 @Named("jcr:fefacebookpostlabel")
	 @Default(values = { "facebook" })
	 private String facebookPostLabel;
	@Inject
	@Named("jcr:fetitle")
	@Default(values = { "title" })
	private String title;
	
	@Inject
	@Named("jcr:fefacebookpost")
	@Default(values = { "HitachiDataSystems" })
	private String searchPost;
	
	
	@Inject
	@Named(value = "fbbgimage")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String bGImagePath;
	
	@Inject
	@Named(value = "jcr:fefacbookiconpath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String iconPath;
	
	@Inject
	@Named(value = "jfacebooklookuppath")
	@Default(values = { "/content/hdscorp/en_us/lookup/facebookpostdata" })
	private String facebookFeedPath;
	
	private String facebookFeedData;
	
	public String getTitle() {
		return this.title;
	}

	public String getbGImagePath() {
		return this.bGImagePath;
	}

	

	public String getIconPath() {
		return this.iconPath;
	}

	public String getFacebookFeedPath() {
		return facebookFeedPath;
	}

	
	public String getSearchPost() {
		return searchPost;
	}

	public void setSearchPost(String searchPost) {
		this.searchPost = searchPost;
	}

	public String getCtaLabel() {
		return ctaLabel;
	}

	
	public String getFacebookPostLabel() {
		return facebookPostLabel;
	}

	public List<Object> getFacebookFeedData() {
		List<Object> feedData = null;
		if (!facebookFeedPath.trim().equals("")) {
			try {
				Resource resource = resourceResolver.resolve(facebookFeedPath);
				if (resource != null) {
					Page page = resource.adaptTo(Page.class);
					if (page != null) {
						ValueMap properties = page.getProperties();
						String feed = properties.get(ServiceConstants.SAVE_FB_FEED_DATA_PROPERTY_NAME).toString();

						if (feed!=null && !feed.isEmpty() && !feed.equals("null")) {
							JSONArray jsonArray= new JSONArray(feed);							
							feedData = PageUtils.jsonArraytoList(jsonArray);

						}

					}
				}

			} catch (Exception e) {				
				log.error("Exception  occured while readind facebook feed Data" + e);
			}

		}

		return feedData;
	}


}
