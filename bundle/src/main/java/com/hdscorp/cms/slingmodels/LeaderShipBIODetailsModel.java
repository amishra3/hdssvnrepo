package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

/**Sling model for Leadership BIO Details Component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class LeaderShipBIODetailsModel {

	@Inject
	@Named("jcr:lbdimage")
	@Default(values = "/content/dam/geometrixx-outdoors/logo.png")
	private String lbdimage;

	@Inject
	@Named("jcr:lbdtitle")
	@Default(values = "Title")
	private String lbdTitle;

	@Inject
	@Named("jcr:lbdjoblocation")
	@Default(values = "Job Location")
	private String lbdJobLocation;

	@Inject
	@Named("jcr:lbdjobtitle")
	@Default(values = "Job Title")
	private String lbdJobTitle;

	@Inject
	@Named("jcr:lbdtwitterfollowurl")
	@Default(values = "Twitter follow URL")
	private String lbdTwiterFollowURL;

	@Inject
	@Named("jcr:lbdfacebookfollowurl")
	@Default(values = "Facebook follow URL")
	private String lbdFacebookFollowURL;

	@Inject
	@Named("jcr:lbdlinkedinfollowurl")
	@Default(values = "Linkedin follow URL")
	private String lbdLinkedinFollowURL;

	@Inject
	@Named("jcr:lbdcontent")
	@Default(values = "Content")
	private String lbdContent;



	public String getLbdimage() {
		return lbdimage;
	}

	public String getLbdTitle() {
		return lbdTitle;
	}

	public String getLbdJobLocation() {
		return lbdJobLocation;
	}

	public String getLbdJobTitle() {
		return lbdJobTitle;
	}

	public String getLbdTwiterFollowURL() {
		return lbdTwiterFollowURL;
	}

	public String getLbdFacebookFollowURL() {
		return lbdFacebookFollowURL;
	}

	public String getLbdLinkedinFollowURL() {
		return lbdLinkedinFollowURL;
	}

	public String getLbdContent() {
		return lbdContent;
	}


}
