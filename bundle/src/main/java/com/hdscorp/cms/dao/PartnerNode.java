package com.hdscorp.cms.dao;

import java.util.ArrayList;


public class PartnerNode {
	
	private String productTitle;
	
	private String productPath;
	
	private String productDescription;

	private String[] productTags;
	
	private ArrayList<ProductDescription> descriptionList;
	
	public ArrayList<ProductDescription> getDescriptionList() {
		return descriptionList;
	}

	public void setDescriptionList(ArrayList<ProductDescription> descriptionList) {
		this.descriptionList = descriptionList;
	}

	public String[] getProductTags() {
		return productTags;
	}

	public void setProductTags(String[] productTags) {
		this.productTags = productTags;
	}

	public String getProductTitle() {
		return productTitle;
	}

	public void setProductTitle(String productTitle) {
		this.productTitle = productTitle;
	}

	public String getProductPath() {
		return productPath;
	}

	public void setProductPath(String productPath) {
		this.productPath = productPath;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

}
