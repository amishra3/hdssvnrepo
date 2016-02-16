package com.hdscorp.cms.dao;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class LocationNode {
	private String locationImage;
	private String imageAltText;
	private String locationDetail;
	private String locationLongitude;
	private String locationLatitude;
	private String[] locationRegion;
	private String[] locationPhoneNumber;
	private String locationCountry;
	private String location;
    private String locationRegionTagID;
    private String locationRegionTagName;
	public String getLocationImage() {
		return locationImage;
	}

	public void setLocationImage(String locationImage) {
		this.locationImage = locationImage;
	}

	public String getImageAltText() {
		return imageAltText;
	}

	public void setImageAltText(String imageAltText) {
		this.imageAltText = imageAltText;
	}

	public String getLocationDetail() {
		return locationDetail;
	}

	public void setLocationDetail(String locationDetail) {
		this.locationDetail = locationDetail;
	}

	public String getLocationLongitude() {
		return locationLongitude;
	}

	public void setLocationLongitude(String locationLongitude) {
		this.locationLongitude = locationLongitude;
	}

	public String getLocationLatitude() {
		return locationLatitude;
	}

	public void setLocationLatitude(String locationLatitude) {
		this.locationLatitude = locationLatitude;
	}

	public String[] getLocationRegion() {
		return locationRegion;
	}

	public void setLocationRegion(String[] locationRegion) {
		this.locationRegion = locationRegion;
	}



	public String[] getLocationPhoneNumber() {
		return locationPhoneNumber;
	}

	public void setLocationPhoneNumber(String[] locationPhoneNumber) {
		this.locationPhoneNumber = locationPhoneNumber;
	}

	public String getLocationCountry() {
		return locationCountry;
	}

	public void setLocationCountry(String locationCountry) {
		this.locationCountry = locationCountry;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getLocationRegionTagID() {
		return locationRegionTagID;
	}

	public void setLocationRegionTagID(String locationRegionTagID) {
		this.locationRegionTagID = locationRegionTagID;
	}

	public String getLocationRegionTagName() {
		return locationRegionTagName;
	}

	public void setLocationRegionTagName(String locationRegionTagName) {
		this.locationRegionTagName = locationRegionTagName;
	}

	
}
