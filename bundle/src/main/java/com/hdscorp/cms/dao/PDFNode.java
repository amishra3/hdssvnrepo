package com.hdscorp.cms.dao;

/**Useful for getting PDF nodes data
 * 
 * @author gokula.nand
 *
 */
public class PDFNode {
	
	private String title;
	
	private String description;
	
	private String longDescription;
	

	private String imagePath;
	
	private String createdDate;
	
	private String externalContentURL;

	public String getLongDescription() {
		return longDescription;
	}

	public void setLongDescription(String longDescription) {
		this.longDescription = longDescription;
	}

	public String getExternalContentURL() {
		return externalContentURL;
	}

	public void setExternalContentURL(String externalContentURL) {
		this.externalContentURL = externalContentURL;
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

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	
	
	
	
	

}
