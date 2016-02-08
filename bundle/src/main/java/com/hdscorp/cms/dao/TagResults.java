package com.hdscorp.cms.dao;

/**
 * Useful for Tag Id and Tag Name in the components.
 * 
 * @author gokula.nand
 *
 */
public class TagResults {
	private String tagId;
	private String tagName;
	private String title;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTagId() {
		return tagId;
	}

	public void setTagId(String tagId) {
		this.tagId = tagId;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

}
