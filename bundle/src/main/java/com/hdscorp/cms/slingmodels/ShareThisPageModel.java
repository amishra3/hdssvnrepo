package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class ShareThisPageModel {


	@Inject
	@Named("stptitle")
	@Default(values = { "" })
	private String stpTitle;
	

	@Inject
	@Named("stpfacebookiconpath")
	@Default(values = { "" })
	private String stpFacebookIconPath;
	

	@Inject
	@Named("stptwittericonpath")
	@Default(values = { "" })
	private String stpTwitterIconPath;
	

	@Inject
	@Named("stplinkediniconpath")
	@Default(values = { "" })
	private String stpLinkedinIconPath;
	

	@Inject
	@Named("stpemailiconpath")
	@Default(values = { "" })
	private String stpEmailIconPath;

	
	public String getStpTitle() {
		return stpTitle;
	}


	public String getStpFacebookIconPath() {
		return stpFacebookIconPath;
	}


	public String getStpTwitterIconPath() {
		return stpTwitterIconPath;
	}


	public String getStpLinkedinIconPath() {
		return stpLinkedinIconPath;
	}


	public String getStpEmailIconPath() {
		return stpEmailIconPath;
	}



}
