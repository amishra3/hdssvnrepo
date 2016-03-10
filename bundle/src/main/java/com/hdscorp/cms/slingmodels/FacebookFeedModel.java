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

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = { Resource.class })
public class FacebookFeedModel {
	@Inject
	@Named("jcr:fetitle")
	@Default(values = { "title" })
	private String title;
	
	@Inject
	@Named(value = "fbbgimage")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String bGImagePath;
	
	@Inject
	@Named(value = "jcr:fefacbookiconpath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String iconPath;
	
	@Inject
	@Named("jcr:fefacebookpostlabel")
	@Default(values = { "facebookpostLabel" })
	private String facebookpostLabel;
	

	@Inject
	@Named("jcr:fefacebookctalabel")
	@Default(values = { "ctaLabel" })
	private String ctaLabel;

	

	public String getTitle() {
		return this.title;
	}

	public String getbGImagePath() {
		return this.bGImagePath;
	}


	public String getIconPath() {
		return this.iconPath;
	}
	
	public String getFacebookpostLabel() {
		return facebookpostLabel;
	}

	public String getCtaLabel() {
		return ctaLabel;
	}

}
