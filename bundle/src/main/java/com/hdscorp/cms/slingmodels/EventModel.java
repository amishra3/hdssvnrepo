package com.hdscorp.cms.slingmodels;


import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

/** Sling model for event component
 * 
 * @author ramana
 *
 */
@Model(adaptables = Resource.class)
public class EventModel {
	
	
	@Inject
	@Named("jcr:eventtype")
	@Default(values = {"Event Type cq:tags"})
	private String[] eventType;
	
	@Inject
	@Named("jcr:eventregiontag")
	@Default(values = {"Event Region cq:tags"})
	private String[] eventRegionTag;
	
	@Inject
	@Named("jcr:eventtitle")
	@Default(values = {"Event Title"})
	private String eventTitle;
	
	@Inject
	@Named("jcr:eventstartdate")
	@Default(values = {"Event Start Date"})
	private String eventStartDate;
	
	@Inject
	@Named("jcr:eventenddate")
	@Default(values = {"Event End Date"})
	private String eventEndDate;
	
	@Inject
	@Named("jcr:eventlocation")
	@Default(values = {"Event Location"})
	private String eventLocation;
	@Inject
	@Named("jcr:eventdescription")
	@Default(values = {"Event Description"})
	private String eventDescription;
	
	@Inject
	@Named("jcr:evbackgroundimage")
	@Default(values = {"Event BackGround Image"})
	private String evBackgroundImage;
	
	@Inject
	@Named("jcr:registernowlabel")
	@Default(values = {"Register Now Label"})
	private String registerNowLabel;
	
	@Inject
	@Named("jcr:registernowlink")
	@Default(values = {"Register Now Link"})
	private String registerNowLink;
	
	@Inject
	@Named("jcr:thirdpartyicon")
	@Default(values = {""})
	private String thirdpartyicon;
	
	@Inject
	@Named("jcr:newwindow")
	@Default(values = {""})
	private String newwindow;
	
	@Inject
	@Named("jcr:eventid")
	@Default(values = {""})
	private String eventId;
	

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

	public String getThirdpartyicon() {
		return thirdpartyicon;
	}


	public String getNewwindow() {
		return newwindow;
	}

	public String getEventId() {
		return eventId;
	}
		

	
	}





	

