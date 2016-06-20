package com.hdscorp.cms.slingmodels;

import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = { Resource.class })
public class IndustryTab {
	@Inject
	@Named("jcr:displaylabel")
	@Default(values = { "displayLabel" })
	private List<String> displaylabel;
	@Inject
	@Named("jcr:iconimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private List<String> iconimagepath;
	@Inject
	@Named("jcr:targeturl")
	@Default(values = { "http://www.google.com" })
	private List<String> targeturl;
	@Inject
	@Named("jcr:iconimage")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private List<String> iconimage;

	public List<String> getDisplaylabel() {
		return this.displaylabel;
	}

	public List<String> getIconimagepath() {
		return this.iconimagepath;
	}

	public List<String> getTargeturl() {
		return this.targeturl;
	}

	public List<String> getIconimage() {
		return this.iconimage;
	}
}