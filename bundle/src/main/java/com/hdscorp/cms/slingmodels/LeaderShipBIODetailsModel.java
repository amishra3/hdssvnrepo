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
	@Default(values = "/content/dam/public/en_us/images/aboutus/leader-img.jpg")
	private String lbdimage;

	@Inject
	@Named("jcr:lbdtitle")
	@Default(values = "Title")
	private String lbdTitle;

	
	@Inject
	@Named("jcr:lbdfallowname")
	@Default(values = "follow name")
	private String lbdfallowname;
	
	
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
	
	@Inject
	@Named("jcr:lbdtwittericonpath")
	@Default(values = "Twitter Icon Path")
	private String lbdtwittericonpath;
	
	@Inject
	@Named("jcr:lbdfacebookiconpath")
	@Default(values = "Facebook Icon Path")	
	private String lbdfacebookiconpath;
	
	@Inject
	@Named("jcr:lbdlinkediniconpath")
	@Default(values = "Linkedin Icon Path")	
	private String lbdlinkediniconpath;
	
	@Inject
	@Named("jcr:lbdtwitteralt")
	@Default(values = "Twitter Alt")	
	private String lbdtwitteralt;
	
	@Inject
	@Named("jcr:lbdfacebookalt")
	@Default(values = "Facebook Alt")	
	private String lbdfacebookalt;
	
	@Inject
	@Named("jcr:lbdlinkedinalt")
	@Default(values = "Linkedin Alt")	
	private String lbdlinkedinalt;
	
	@Inject
	@Named("jcr:lbdimagealt")
	@Default(values = "Image Alt")	
	private String lbdimagealt;
	
	
	public String getLbdimagealt() {
		return lbdimagealt;
	}

	public String getLbdtwitteralt() {
		return lbdtwitteralt;
	}

	public String getLbdfacebookalt() {
		return lbdfacebookalt;
	}

	public String getLbdlinkedinalt() {
		return lbdlinkedinalt;
	}

	public String getLbdtwittericonpath() {
		return lbdtwittericonpath;
	}

	public String getLbdfacebookiconpath() {
		return lbdfacebookiconpath;
	}

	public String getLbdlinkediniconpath() {
		return lbdlinkediniconpath;
	}
	

	public String getLbdimage() {
		return lbdimage;
	}

	public String getLbdTitle() {
		return lbdTitle;
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
	
	

	public String getLbdfallowname() {
		return lbdfallowname;
	}


}
