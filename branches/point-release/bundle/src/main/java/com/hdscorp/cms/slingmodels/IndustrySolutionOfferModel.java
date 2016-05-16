package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

/**
 * Sling model for Industry Solution offer component
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class IndustrySolutionOfferModel {

	@Inject
	@Named("isotitle")
	@Default(values = { "" })
    private String title;

	@Inject
	@Named("isosubtitle")
	@Default(values = { "" })
	private String subTitle;
	
	@Inject
	@Named("isodescription")
	@Default(values = { "" })
	private String description;
	
	@Inject
	@Named("isoctalabel")
	@Default(values = { "" })
	private String contactUSLabel;
	
	@Inject
	@Named("isoctatargeturl")
	@Default(values = { "" })
	private String targetURL;
	
	@Inject
	@Named("isotargeturltype")
	@Default(values = { "" })
	private String targetURLType;
	
	@Inject
	@Named("isoshowblog")
	@Default(values = { "3" })
	private String isoShowBlog;

	

	public String getTitle() {
		return title;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public String getDescription() {
		return description;
	}

	public String getContactUSLabel() {
		return contactUSLabel;
	}

	public String getTargetURL() {
		return targetURL;
	}

	public String getTargetURLType() {
		return targetURLType;
	}

	public String getIsoShowBlog() {
		return isoShowBlog;
	}




}