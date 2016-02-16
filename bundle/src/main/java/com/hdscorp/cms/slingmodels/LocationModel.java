package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class LocationModel {
	@Inject
	@Named("jcr:locationimage")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String locationImage;
	
	@Inject
	@Named("jcr:locimagealttext")
	@Default(values = { "Image" })
	private String imageAltText;
	
	@Inject
	@Named("jcr:locationdetail")
	@Default(values = { "Location Detail" })
	private String locationDetail;
	
	@Inject
	@Named("jcr:locationlongitude")
	@Default(values = { "Longitude" })
	private String locationLongitude;
	
	
	@Inject
	@Named("jcr:locationlatitude")
	@Default(values = { "Lattitude" })
	private String locationLatitude;
	
	@Inject
	@Named("jcr:locregion")
	@Default(values = { "Region" })
	private String[] locationRegion;
	
	@Inject
	@Named("jcr:locphonenumber")
	@Default(values = { "phonenumber" })
	private String[] locationPhoneNumber;
	
	@Inject
	@Named("jcr:loccountry")
	@Default(values = { "Country" })
	private String[] locationCountry;
	
	@Inject
	@Named("jcr:loclocations")
	@Default(values = { "Location" })
	private String[] location;

	public String getLocationImage() {
		return locationImage;
	}

	public String getImageAltText() {
		return imageAltText;
	}

	public String getLocationDetail() {
		return locationDetail;
	}

	public String getLocationLongitude() {
		return locationLongitude;
	}

	public String getLocationLatitude() {
		return locationLatitude;
	}

	public String[] getLocationRegion() {
		return locationRegion;
	}

	public String[] getLocationPhoneNumber() {
		return locationPhoneNumber;
	}

	public String[] getLocationCountry() {
		return locationCountry;
	}

	public String[] getLocation() {
		return location;
	}
	
	
	
}
