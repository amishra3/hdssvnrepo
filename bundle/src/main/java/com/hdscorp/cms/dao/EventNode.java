package com.hdscorp.cms.dao;

import java.util.Comparator;

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
	
	private String eventMonth;

	private String eventTyptagId;
	
	private String eventTyptagName;
	
	private String eventRegiontagId;
	
	private String eventRegiontagName;
	
	private int year;
	
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

	public String getEventMonth() {
		return eventMonth;
	}

	public void setEventMonth(String eventMonth) {
		this.eventMonth = eventMonth;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getEventTyptagId() {
		return eventTyptagId;
	}

	public void setEventTyptagId(String eventTyptagId) {
		this.eventTyptagId = eventTyptagId;
	}

	public String getEventTyptagName() {
		return eventTyptagName;
	}

	public void setEventTyptagName(String eventTyptagName) {
		this.eventTyptagName = eventTyptagName;
	}

	public String getEventRegiontagId() {
		return eventRegiontagId;
	}

	public void setEventRegiontagId(String eventRegiontagId) {
		this.eventRegiontagId = eventRegiontagId;
	}

	public String getEventRegiontagName() {
		return eventRegiontagName;
	}

	public void setEventRegiontagName(String eventRegiontagName) {
		this.eventRegiontagName = eventRegiontagName;
	}
	
	
	public class CompareByMonth implements Comparator<EventNode> {
		public int compare(EventNode p1, EventNode p2) {
			if (p1.getEventMonth().compareTo(p2.getEventMonth()) > 0) {
				return 1;
			}
			if (p1.getEventMonth().compareTo(p2.getEventMonth()) < 0) {
				return -1;
			}			
			return 0;
		}

		@Override
		public boolean equals(Object obj) {
			return super.equals(obj);
		}
	}

	public class CompareByYear implements Comparator<EventNode> {
		public int compare(EventNode p1, EventNode p2) {
			return p1.getYear() - p2.getYear();
		}

		@Override
		public boolean equals(Object obj) {
			return super.equals(obj);
		}
	}

}
