package com.hdscorp.cms.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SystemIntegratorsNode {

	private String systemIntegratorTitle;

	private String systemIntegratorPath;

	private String systemIntegratorDescription;

	private String systemIntegratorBackgroundImagePath;

	private String systemIntegratorIconImagePath;

	private String systemIntegratorIconImageAltText;

	private String systemIntegratorName;

	private String systemIntegratorHeadLine;

	private String systemIntegratorIntroduction;

	private String[] systemIntegratorTags;

	private List<String> industryTadIds;

	private List<Map<String, String>> contentCell;

	private ArrayList<PartnerDescription> descriptionList;

	public String getSystemIntegratorTitle() {
		return systemIntegratorTitle;
	}

	public void setSystemIntegratorTitle(String systemIntegratorTitle) {
		this.systemIntegratorTitle = systemIntegratorTitle;
	}

	public String getSystemIntegratorPath() {
		return systemIntegratorPath;
	}

	public void setSystemIntegratorPath(String systemIntegratorPath) {
		this.systemIntegratorPath = systemIntegratorPath;
	}

	public String getSystemIntegratorDescription() {
		return systemIntegratorDescription;
	}

	public void setSystemIntegratorDescription(String systemIntegratorDescription) {
		this.systemIntegratorDescription = systemIntegratorDescription;
	}

	public String getSystemIntegratorBackgroundImagePath() {
		return systemIntegratorBackgroundImagePath;
	}

	public void setSystemIntegratorBackgroundImagePath(String systemIntegratorBackgroundImagePath) {
		this.systemIntegratorBackgroundImagePath = systemIntegratorBackgroundImagePath;
	}

	public String getSystemIntegratorIconImagePath() {
		return systemIntegratorIconImagePath;
	}

	public void setSystemIntegratorIconImagePath(String systemIntegratorIconImagePath) {
		this.systemIntegratorIconImagePath = systemIntegratorIconImagePath;
	}

	public String getSystemIntegratorIconImageAltText() {
		return systemIntegratorIconImageAltText;
	}

	public void setSystemIntegratorIconImageAltText(String systemIntegratorIconImageAltText) {
		this.systemIntegratorIconImageAltText = systemIntegratorIconImageAltText;
	}

	public String getSystemIntegratorName() {
		return systemIntegratorName;
	}

	public void setSystemIntegratorName(String systemIntegratorName) {
		this.systemIntegratorName = systemIntegratorName;
	}

	public String getSystemIntegratorHeadLine() {
		return systemIntegratorHeadLine;
	}

	public void setSystemIntegratorHeadLine(String systemIntegratorHeadLine) {
		this.systemIntegratorHeadLine = systemIntegratorHeadLine;
	}

	public String getSystemIntegratorIntroduction() {
		return systemIntegratorIntroduction;
	}

	public void setSystemIntegratorIntroduction(String systemIntegratorIntroduction) {
		this.systemIntegratorIntroduction = systemIntegratorIntroduction;
	}

	public String[] getSystemIntegratorTags() {
		return systemIntegratorTags;
	}

	public void setSystemIntegratorTags(String[] systemIntegratorTags) {
		this.systemIntegratorTags = systemIntegratorTags;
	}

	public List<String> getIndustryTadIds() {
		return industryTadIds;
	}

	public void setIndustryTadIds(List<String> industryTadIds) {
		this.industryTadIds = industryTadIds;
	}

	

	public List<Map<String, String>> getContentCell() {
		return contentCell;
	}

	public void setContentCell(List<Map<String, String>> contentCell) {
		this.contentCell = contentCell;
	}

	public ArrayList<PartnerDescription> getDescriptionList() {
		return descriptionList;
	}

	public void setDescriptionList(ArrayList<PartnerDescription> descriptionList) {
		this.descriptionList = descriptionList;
	}

}
