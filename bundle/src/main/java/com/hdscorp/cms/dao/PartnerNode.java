package com.hdscorp.cms.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class PartnerNode {
	


	private String partnerTitle;
	
	private String partnerPath;
	
	private String partnerDescription;
	
	private String partnerBackgroundImagePath;

	private String partnerIconImagePath;
	
	private String partnerIconImageAltText;

	private List<Map<String, String>> contentCell;
	
	private String partnerviewMoreLabel;
	
	private String partnerviewMorelink;
	
	private String partneroinwindow;

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

	public List<Map<String, String>> getContentCell() {
		return contentCell;
	}

	public void setContentCell(List<Map<String, String>> contentCell) {
		this.contentCell = contentCell;
	}

	public String getPartnerviewMoreLabel() {
		return partnerviewMoreLabel;
	}

	public void setPartnerviewMoreLabel(String partnerviewMoreLabel) {
		this.partnerviewMoreLabel = partnerviewMoreLabel;
	}

	public String getPartnerviewMorelink() {
		return partnerviewMorelink;
	}

	public void setPartnerviewMorelink(String partnerviewMorelink) {
		this.partnerviewMorelink = partnerviewMorelink;
	}

	public String getPartneroinwindow() {
		return partneroinwindow;
	}

	public void setPartneroinwindow(String partneroinwindow) {
		this.partneroinwindow = partneroinwindow;
	}

	

}
