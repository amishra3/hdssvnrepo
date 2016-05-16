package com.hdscorp.cms.dao;

public class NewsContainerNode {
	private String filterUrl;

	private String filterText;

	private String fullFilterUrl;
	
	public String getFullFilterUrl() {
		return fullFilterUrl;
	}

	public void setFullFilterUrl(String fullFilterUrl) {
		this.fullFilterUrl = fullFilterUrl;
	}

	public String getFilterUrl() {
		return filterUrl;
	}

	public void setFilterUrl(String filterUrl) {
		this.filterUrl = filterUrl;
	}

	public String getFilterText() {
		return filterText;
	}

	public void setFilterText(String filterText) {
		this.filterText = filterText;
	}
}
