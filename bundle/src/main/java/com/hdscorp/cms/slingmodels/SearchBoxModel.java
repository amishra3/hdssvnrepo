package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables=Resource.class)
public class SearchBoxModel {

	
	@Inject @Named("jcr:sbboxtext") @Default(values="Default Search Box text")
	private String sbboxtext;
	
	@Inject @Named("jcr:sbimage") @Default(values="/content/dam/geometrixx-outdoors/logo.png")
	private String sbimage;
	
	@Inject @Named("jcr:sbclearbutton") @Default(values="Default Clear Search button label")
	private String sbclearbutton;
	
	@Inject @Named("jcr:sbloadmorebutton") @Default(values="Default Load more button display count")
	private String sbloadmorebutton;

	public String getSbboxtext() {
		return sbboxtext;
	}

	public String getSbimage() {
		return sbimage;
	}

	public String getSbclearbutton() {
		return sbclearbutton;
	}

	public String getSbloadmorebutton() {
		return sbloadmorebutton;
	}
	
	

	
}
