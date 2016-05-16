package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class PartnerProgramBusinessBenifitModel {
	@Inject
	@Named("jcr:ppbbheadline")
	@Default(values = { "Head Line" })
	private String headLine;
	
	@Inject
	@Named("jcr:ppbbdescription")
	@Default(values = { "Description" })
	private String description;
	
	@Inject
	@Named("jcr:ppbblearnmorelabel")
	@Default(values = { "learn More Label" })
	private String learnMoreLabel;
	
	@Inject
	@Named("jcr:ppbblearnmorelink")
	@Default(values = { "/hdscorp/en_us/partners.html" })
	private String learnMoreLink;
	
	@Inject
	@Named("jcr:ppbbsignuplabel")
	@Default(values = { "sign Up" })
	private String signUpLabel;
	
	@Inject
	@Named("jcr:ppbbsignupnowlink")
	@Default(values = { "/hdscorp/en_us/partners.html" })
	private String signUpLink;
	
	
	
	@Inject
	@Named("jcr:ppbboptionalprogramiconpath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String optionalProgramIconPath;
	
	@Inject
	@Named("jcr:ppbboptionalprogramheadline")
	@Default(values = { "Head Line" })
	private String optionalProgramHeadLine;
	
	@Inject
	@Named("jcr:ppbboptionalprogramdescription")
	@Default(values = { "Description" })
	private String optionalProgarmDescription;
	
	@Inject
	@Named("jcr:ppbboptionalprogramcalltoactionlabel")
	@Default(values = { "Call To Action" })
	private String optionalProgarmCallToActionLabel;
	
	@Inject
	@Named("jcr:ppbboptionalprogramcalltoactionlink")
	@Default(values = { "/hdscorp/en_us/partners.html" })
	private String optionalProgramCallToActionLink;

	
	@Inject
	@Named("jcr:ppbblearnmoreopeninnewwindow")
	@Default(values = { "false" })
	private String learnMoreOpenInNewWindow;

	@Inject
	@Named("jcr:ppbbsignupopeninnewwindow")
	@Default(values = { "false" })
	private String signUpOpenInNewWindow;

	@Inject
	@Named("jcr:ppbbcalltoactionopeninnewwindow")
	@Default(values = { "false" })
	private String callToActionOpenInNewWindow;

	
	public String getHeadLine() {
		return headLine;
	}

	public String getDescription() {
		return description;
	}

	public String getLearnMoreLabel() {
		return learnMoreLabel;
	}

	public String getLearnMoreLink() {
		return learnMoreLink;
	}

	public String getSignUpLabel() {
		return signUpLabel;
	}

	public String getSignUpLink() {
		return signUpLink;
	}

	public String getOptionalProgramIconPath() {
		return optionalProgramIconPath;
	}

	public String getOptionalProgramHeadLine() {
		return optionalProgramHeadLine;
	}

	public String getOptionalProgarmDescription() {
		return optionalProgarmDescription;
	}

	public String getOptionalProgarmCallToActionLabel() {
		return optionalProgarmCallToActionLabel;
	}

	public String getOptionalProgramCallToActionLink() {
		return optionalProgramCallToActionLink;
	}

	public String getLearnMoreOpenInNewWindow() {
		return learnMoreOpenInNewWindow;
	}

	public String getSignUpOpenInNewWindow() {
		return signUpOpenInNewWindow;
	}

	public String getCallToActionOpenInNewWindow() {
		return callToActionOpenInNewWindow;
	}


}
