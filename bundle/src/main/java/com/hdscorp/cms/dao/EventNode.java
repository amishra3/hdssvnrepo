package com.hdscorp.cms.dao;

/**
 * Useful for Event Data Model
 * 
 * @author gokula.nand
 *
 */
public class EventNode {

	private String[] eventType;

	private String eventTitle;

	private String eventStartDate;

	private String eventEndDate;

	private String eventLocation;

	private String eventDescription;

	private String eventImageBackground;

	private String eventRegisterNowLabel;

	private String eventRegisterNowLink;

	private String[] eventRegion;

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

	public String getEventImageBackground() {
		return eventImageBackground;
	}

	public String getEventRegisterNowLabel() {
		return eventRegisterNowLabel;
	}

	public String getEventRegisterNowLink() {
		return eventRegisterNowLink;
	}

	public String[] getEventRegion() {
		return eventRegion;
	}

	public void setEventType(String[] eventType) {
		this.eventType = eventType;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public void setEventStartDate(String eventStartDate) {
		this.eventStartDate = eventStartDate;
	}

	public void setEventEndDate(String eventEndDate) {
		this.eventEndDate = eventEndDate;
	}

	public void setEventLocation(String eventLocation) {
		this.eventLocation = eventLocation;
	}

	public void setEventDescription(String eventDescription) {
		this.eventDescription = eventDescription;
	}

	public void setEventImageBackground(String eventImageBackground) {
		this.eventImageBackground = eventImageBackground;
	}

	public void setEventRegisterNowLabel(String eventRegisterNowLabel) {
		this.eventRegisterNowLabel = eventRegisterNowLabel;
	}

	public void setEventRegisterNowLink(String eventRegisterNowLink) {
		this.eventRegisterNowLink = eventRegisterNowLink;
	}

	public void setEventRegion(String[] eventRegion) {
		this.eventRegion = eventRegion;
	}

}
