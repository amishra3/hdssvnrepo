package com.hdscorp.cms.dao;

import java.util.List;

public class GeoSelector {
	
	private String regionLabel;
	private String regionId;
	private String countryLabel;
	private String countrytargetUrl;
	private String openinnewwindow;
	
	private List<GeoSelector> countries;
	
	public String getRegionLabel() {
		return regionLabel;
	}

	public void setRegionLabel(String regionLabel) {
		this.regionLabel = regionLabel;
	}

	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	public String getCountryLabel() {
		return countryLabel;
	}

	public void setCountryLabel(String countryLabel) {
		this.countryLabel = countryLabel;
	}

	public String getCountrytargetUrl() {
		return countrytargetUrl;
	}

	public void setCountrytargetUrl(String countrytargetUrl) {
		this.countrytargetUrl = countrytargetUrl;
	}

	public String getOpeninnewwindow() {
		return openinnewwindow;
	}

	public void setOpeninnewwindow(String openinnewwindow) {
		this.openinnewwindow = openinnewwindow;
	}

	public List<GeoSelector> getCountries() {
		return countries;
	}

	public void setCountries(List<GeoSelector> countries) {
		this.countries = countries;
	}

    
}
