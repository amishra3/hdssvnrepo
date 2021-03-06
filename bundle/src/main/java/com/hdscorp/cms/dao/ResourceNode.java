package com.hdscorp.cms.dao;

import java.util.Date;


public class ResourceNode{

    private String resourceTitle;
	
	private String resourcePath;
	
	private String resourceDescription;
	
	private String deviceFeautedIconImage;

	private String[] resourceTags;
	
	private String videoGuid;
	private String videoTitleId;
	private String resourceType;
	
	private String contentType;
	
	private String contentTypeTag;
	
	private String externalContentTargetURL;
	
	private String videoPubDate;
	
	private long externalLastModInMilliSec ;
	
	private long pdfDcModInMilliSec ;
	
	private long comparisonDateInMilliSec ;
	
	private Date comparisonDate ;
	
	public Date getComparisonDate() {
		return comparisonDate;
	}

	public void setComparisonDate(Date comparisonDate) {
		this.comparisonDate = comparisonDate;
	}

	public long getComparisonDateInMilliSec() {
		return comparisonDateInMilliSec;
	}

	public void setComparisonDateInMilliSec(long comparisonDateInMilliSec) {
		this.comparisonDateInMilliSec = comparisonDateInMilliSec;
	}

	public long getExternalLastModInMilliSec() {
		return externalLastModInMilliSec;
	}

	public void setExternalLastModInMilliSec(long externalLastModInMilliSec) {
		this.externalLastModInMilliSec = externalLastModInMilliSec;
	}

	public long getPdfDcModInMilliSec() {
		return pdfDcModInMilliSec;
	}

	public void setPdfDcModInMilliSec(long pdfDcModInMilliSec) {
		this.pdfDcModInMilliSec = pdfDcModInMilliSec;
	}

	public String getExternalContentTargetURL() {
		return externalContentTargetURL;
	}

	public void setExternalContentTargetURL(String externalContentTargetURL) {
		this.externalContentTargetURL = externalContentTargetURL;
	}
	
	public String getVideoGuid() {
		return videoGuid;
	}

	public void setVideoGuid(String videoGuid) {
		this.videoGuid = videoGuid;
	}

	public String getVideoTitleId() {
		return videoTitleId;
	}

	public void setVideoTitleId(String videoTitleId) {
		this.videoTitleId = videoTitleId;
	}

	private String[] industryTags;
	private boolean gated;
	public boolean isGated() {
		return gated;
	}

	public void setGated(boolean gated) {
		this.gated = gated;
	}

	public String[] getIndustryTags() {
		return industryTags;
	}

	public void setIndustryTags(String[] industryTags) {
		this.industryTags = industryTags;
	}

	private String featuredBGImage;
	private String featuredIconImage;
	public String getContentTypeTag() {
		return contentTypeTag;
	}

	public void setContentTypeTag(String contentTypeTag) {
		this.contentTypeTag = contentTypeTag;
	}
	
	public String getFeaturedIconImage() {
		return featuredIconImage;
	}

	public void setFeaturedIconImage(String featuredIconImage) {
		this.featuredIconImage = featuredIconImage;
	}

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

	public String getDeviceFeautedIconImage() {
		return deviceFeautedIconImage;
	}

	public void setDeviceFeautedIconImage(String deviceFeautedIconImage) {
		this.deviceFeautedIconImage = deviceFeautedIconImage;
	}

	public String getVideoPubDate() {
		return videoPubDate;
	}

	public void setVideoPubDate(String videoPubDate) {
		this.videoPubDate = videoPubDate;
	}
	
}
