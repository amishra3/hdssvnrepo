package com.hdscorp.cms.slingmodels;


import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

/** Sling model for event component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class EventModel {
	
	
	@Inject
	@Named("eventtype")
	@Default(values = {"cq:tags"})
	private String[] eventType;
	
	@Inject
	@Named("eventregiontag")
	@Default(values = {"cq:tags"})
	private String[] eventRegionTag;
	
	@Inject
	@Named("eventtitle")
	@Default(values = {"eventtitle"})
	private String eventTitle;
	
	@Inject
	@Named("eventstartdate")
	@Default(values = {"eventstartdate"})
	private String eventStartDate;
	
	@Inject
	@Named("eventenddate")
	@Default(values = {"eventenddate"})
	private String eventEndDate;
	
	@Inject
	@Named("eventlocation")
	@Default(values = {"eventlocation"})
	private String eventLocation;
	@Inject
	@Named("eventdescription")
	@Default(values = {"eventdescription"})
	private String eventDescription;
	
	@Inject
	@Named("evbackgroundimage")
	@Default(values = {"evbackgroundimage"})
	private String evBackgroundImage;
	
	@Inject
	@Named("registernowlabel")
	@Default(values = {"registerNowLabel"})
	private String registerNowLabel;
	
	@Inject
	@Named("registernowlink")
	@Default(values = {"registerNowLink"})
	private String registerNowLink;

	public String[] getEventType() {
		return eventType;
	}

	public String getEventTitle() {
		return eventTitle;
	}

	public String getEventStartDate() {
		return eventStartDate;
	}

	public String getEventEndDate() {
		return eventEndDate;
	}

	public String getEventLocation() {
		return eventLocation;
	}

	public String getEventDescription() {
		return eventDescription;
	}

	public String getEvBackgroundImage() {
		return evBackgroundImage;
	}

	public String getRegisterNowLabel() {
		return registerNowLabel;
	}

	public String getRegisterNowLink() {
		return registerNowLink;
	}

	public String[] getEventRegionTag() {
		return eventRegionTag;
	}


	
	

	}





	

