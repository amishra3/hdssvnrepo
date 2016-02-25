package com.hdscorp.cms.dao;


public class PartnerDescription {
	
	private String[] categoryTag;
	
	private String description;
	
	private boolean defaultDesc;
	

	public boolean isDefaultDesc() {
		return defaultDesc;
	}

	public void setDefaultDesc(boolean defaultDesc) {
		this.defaultDesc = defaultDesc;
	}

	public String[] getCategoryTag() {
		return categoryTag;
	}

	public void setCategoryTag(String[] categoryTag) {
		this.categoryTag = categoryTag;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
