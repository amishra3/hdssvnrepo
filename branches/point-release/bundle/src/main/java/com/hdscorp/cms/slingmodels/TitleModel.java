package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import com.day.cq.wcm.api.Page;

@Model(adaptables = Resource.class)
public class TitleModel {

	@Inject
	private Page resourcePage;

	@Inject
	@Named("jcr:title")
	@Optional
	private String title;

	@Inject
	@Default(values = "H1")
	private String type;

	@Inject
	@Default(values = "No")
	private String underlinetitle;
	
	private String underLineClass = "";

	public String getTitle() {
		if (title == null || title.length() < 1) {
			title = resourcePage.getTitle();
		}
		return title;
	}

	public String getType() {
		return type;
	}

	public String getUnderLineClass() {
		if(underlinetitle.equalsIgnoreCase("Yes")){
			underLineClass= "titleunderline";
		}else{
			underLineClass= " ";
		}
		return underLineClass;
	}

}
