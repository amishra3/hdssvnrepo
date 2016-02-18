package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

/**
 * Sling model for Blog component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class BlogModel {

	@Inject
	@Named("jcr:bimagepath")
	private String bimagepath;

	@Inject
	@Named("jcr:bautherdetails")
	private String bautherdetails;

	@Inject
	@Named("jcr:btitle")
	private String btitle;

	@Inject
	@Named("jcr:bcontent")
	private String bcontent;

	@Inject
	@Named("jcr:breadmore")
	private String breadmore;

	@Inject
	@Named("jcr:breadmorelink")
	private String breadmorelink;

	@Inject
	@Named("jcr:bopeninnew")
	private String bopeninnew;

	public String getBimagepath() {
		return bimagepath;
	}

	public String getBautherdetails() {
		return bautherdetails;
	}

	public String getBtitle() {
		return btitle;
	}

	public String getBcontent() {
		return bcontent;
	}

	public String getBreadmore() {
		return breadmore;
	}

	public String getBreadmorelink() {
		return breadmorelink;
	}

	public String getBopeninnew() {
		return bopeninnew;
	}

}
