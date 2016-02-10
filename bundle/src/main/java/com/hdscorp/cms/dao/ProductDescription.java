package com.hdscorp.cms.dao;


public class ProductDescription {
	
	private String[] categoryTag;
	
	private String description;
	
	private boolean isDefault;
	
	public boolean isDefault() {
		return isDefault;
	}

	public void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
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
