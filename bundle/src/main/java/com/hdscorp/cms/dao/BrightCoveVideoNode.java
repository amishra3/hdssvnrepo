package com.hdscorp.cms.dao;

public class BrightCoveVideoNode {
	private String title;
	private String description;
	private String guid;
	private String pubDate;
	private String keywords;
	private String smallerThumbnail;
	private String largerThumbnail;
	private String titleId;
	private String duration;
	public String getTitleId() {
		return titleId;
	}
	public void setTitleId(String titleId) {
		this.titleId = titleId;
	}
	private String accountId;
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getGuid() {
		return guid;
	}
	public void setGuid(String guid) {
		this.guid = guid;
	}
	public String getPubDate() {
		return pubDate;
	}
	public void setPubDate(String pubDate) {
		this.pubDate = pubDate;
	}
	public String getKeywords() {
		return keywords;
	}
	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}
	public String getSmallerThumbnail() {
		return smallerThumbnail;
	}
	public void setSmallerThumbnail(String smallerThumbnail) {
		this.smallerThumbnail = smallerThumbnail;
	}
	public String getLargerThumbnail() {
		return largerThumbnail;
	}
	public void setLargerThumbnail(String largerThumbnail) {
		this.largerThumbnail = largerThumbnail;
	}
	
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	
}
