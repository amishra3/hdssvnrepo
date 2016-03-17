package com.hdscorp.cms.dao;

import java.util.ArrayList;


public class PartnerNode {
	

	private String partnerTitle;
	
	private String partnerPath;
	
	private String partnerDescription;
	
	private String partnerBackgroundImagePath;

	private String partnerIconImagePath;
	
	private String partnerIconImageAltText;

	private String partnerName;
	
	private String partnerHeadLine;
	
	private String partnerIntroduction;
	
	private String[] partnerTags;
	
	private ArrayList<PartnerDescription> descriptionList;

	
	public String getPartnerTitle() {
		return partnerTitle;
	}

	public void setPartnerTitle(String partnerTitle) {
		this.partnerTitle = partnerTitle;
	}

	public String getPartnerPath() {
		return partnerPath;
	}

	public void setPartnerPath(String partnerPath) {
		this.partnerPath = partnerPath;
	}

	
	public String getPartnerBackgroundImagePath() {
		return partnerBackgroundImagePath;
	}

	public void setPartnerBackgroundImagePath(String partnerBackgroundImagePath) {
		this.partnerBackgroundImagePath = partnerBackgroundImagePath;
	}

	public String getPartnerIconImagePath() {
		return partnerIconImagePath;
	}

	public void setPartnerIconImagePath(String partnerIconImagePath) {
		this.partnerIconImagePath = partnerIconImagePath;
	}

	public String getPartnerIconImageAltText() {
		return partnerIconImageAltText;
	}

	public void setPartnerIconImageAltText(String partnerIconImageAltText) {
		this.partnerIconImageAltText = partnerIconImageAltText;
	}

	
	public ArrayList<PartnerDescription> getDescriptionList() {
		return descriptionList;
	}

	public void setDescriptionList(ArrayList<PartnerDescription> descriptionList) {
		this.descriptionList = descriptionList;
	}

	public String[] getPartnerTags() {
		return partnerTags;
	}

	public void setPartnerTags(String[] partnerTags) {
		this.partnerTags = partnerTags;
	}


	public String getPartnerDescription() {
		return partnerDescription;
	}

	public void setPartnerDescription(String partnerDescription) {
		this.partnerDescription = partnerDescription;
	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getPartnerHeadLine() {
		return partnerHeadLine;
	}

	public void setPartnerHeadLine(String partnerHeadLine) {
		this.partnerHeadLine = partnerHeadLine;
	}

	public String getPartnerIntroduction() {
		return partnerIntroduction;
	}

	public void setPartnerIntroduction(String partnerIntroduction) {
		this.partnerIntroduction = partnerIntroduction;
	}


}
