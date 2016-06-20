package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;

import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.util.PathResolver;

@Model(adaptables = Resource.class)
public class PressReleaseDetailModel {
	@Inject
    private Page resourcePage;
	@Inject
	@Named("pressreleasetitle")
	private String pressReleaseTitle;
	
	@Inject
	@Named("pressreleasedate")
	private String pressReleaseDate;
	
	@Inject
	@Named("pressreleasedesc")
	private String pressReleaseDescription;
	
	private String viewAllPRLabel;
	private String viewAllPRLink;
	public String getViewAllPRLabel() {

	return getProperty("viewallprlabel");
	}

	public String getViewAllPRLink() {
		return PathResolver.getShortURLPath(getProperty("viewallprlink"));
	}

	

	public String getPressReleaseTitle() {
		return pressReleaseTitle;
	}

	public String getPressReleaseDate() {
		return pressReleaseDate;
	}

	public String getPressReleaseDescription() {
		return pressReleaseDescription;
	}

	
	private String getProperty(String property){
		String value = "";
		Page page = resourcePage.getAbsoluteParent(4);
		if(page!=null) {
			
		ValueMap properties =  page.getProperties();
		if(properties.containsKey(property)){
		value = properties.get(property).toString();
		}
		}
		
		return value;
	}
	

}
