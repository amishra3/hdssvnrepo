package com.hdscorp.cms.dao;

public class NewsNode {
	
	private String newsTitle;
    private String imgpath;
	private String newsDetailPath;
	private String description;
	private boolean openInNewTab;
	private boolean newWinIcon;
	private String imageAlt;
	
	public boolean isNewWinIcon() {
		return newWinIcon;
	}

	public void setNewWinIcon(boolean newWinIcon) {
		this.newWinIcon = newWinIcon;
	}

	public boolean isOpenInNewTab() {
		return openInNewTab;
	}

	public void setOpenInNewTab(boolean openInNewTab) {
		this.openInNewTab = openInNewTab;
	}

	public String getDescription() {
		return description;
	}

	public String getImgpath() {
		return imgpath;
	}

	public void setImgpath(String imgpath) {
		this.imgpath = imgpath;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	private String newsDate;
	
	public String getNewsTitle() {
		return newsTitle;
	}

	public void setNewsTitle(String newsTitle) {
		this.newsTitle = newsTitle;
	}

	public String getNewsDetailPath() {
		return newsDetailPath;
	}

	public void setNewsDetailPath(String newsDetailPath) {
		this.newsDetailPath = newsDetailPath;
	}

	public String getNewsDate() {
		return newsDate;
	}

	public void setNewsDate(String newsDate) {
		this.newsDate = newsDate;
	}

	public String getImageAlt() {
		return imageAlt;
	}

	public void setImageAlt(String imageAlt) {
		this.imageAlt = imageAlt;
	}


	

}
