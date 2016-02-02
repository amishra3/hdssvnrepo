package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class PressReleaseDetailModel {

	@Inject
	@Named("pressreleasetitle")
	private String pressReleaseTitle;
	
	@Inject
	@Named("pressreleasedate")
	private String pressReleaseDate;
	
	@Inject
	@Named("pressreleasedesc")
	private String pressReleaseDescription;

	public String getPressReleaseTitle() {
		return pressReleaseTitle;
	}

	public String getPressReleaseDate() {
		return pressReleaseDate;
	}

	public String getPressReleaseDescription() {
		return pressReleaseDescription;
	}

	

}
