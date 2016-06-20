package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class NewsDetailModel {

	@Inject
	@Named("newstitle")
	private String newsTitle;


	@Inject
	@Named("newsdate")
	private String newsDate;
	
	@Inject
	@Named("newslink")
	private String newsLink;
	
	@Inject
	@Named("thirdparty")
	private String newWinIcon;


	public String getNewsTitle() {
		return newsTitle;
	}

	public String getNewsDate() {
		return newsDate;
	}

	public String getNewsLink() {
		return newsLink;
	}
	
	public String getNewWinIcon() {
		return newWinIcon;
	}

	

}
