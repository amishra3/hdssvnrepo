package com.hdscorp.cms.dao;

public class ResourceNode {

    private String resourceTitle;
	
	private String resourcePath;
	
	private String resourceDescription;

	private String[] resourceTags;
	
	private String resourceType;
	
	private String contentType;
	private String featuredBGImage;
	public String getFeaturedBGImage() {
		return featuredBGImage;
	}

	public void setFeaturedBGImage(String featuredBGImage) {
		this.featuredBGImage = featuredBGImage;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getResourceTitle() {
		return resourceTitle;
	}

	public void setResourceTitle(String resourceTitle) {
		this.resourceTitle = resourceTitle;
	}

	public String getResourcePath() {
		return resourcePath;
	}

	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}

	public String getResourceDescription() {
		return resourceDescription;
	}

	public void setResourceDescription(String resourceDescription) {
		this.resourceDescription = resourceDescription;
	}

	public String[] getResourceTags() {
		return resourceTags;
	}

	public void setResourceTags(String[] resourceTags) {
		this.resourceTags = resourceTags;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	
	
	
}
