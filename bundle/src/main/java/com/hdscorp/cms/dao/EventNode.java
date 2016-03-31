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

	private int monthInt;
	
	private String thirdpartyicon;
	
	private String newwindow;

	/**
	 * Webcast fields
	 */

	private String isWebcast;

	private String author;

	private String summary;

	private String featured;

	private String status;

	private String format;

	private String duration;

	private String start;

	private String rating;

	private String category;

	private String communicationId;

	private String channelId;

	private String herfLink;

	private String thumbnailPath;

	private String previewImagePath;

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

	public String getThirdpartyicon() {
		return thirdpartyicon;
	}

	public void setThirdpartyicon(String thirdpartyicon) {
		this.thirdpartyicon = thirdpartyicon;
	}

	public String getNewwindow() {
		return newwindow;
	}

	public void setNewwindow(String newwindow) {
		this.newwindow = newwindow;
	}

	
	// Webcast setter/getter

	
	public String getIsWebcast() {
		return isWebcast;
	}

	public void setIsWebcast(String isWebcast) {
		this.isWebcast = isWebcast;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getFeatured() {
		return featured;
	}

	public void setFeatured(String featured) {
		this.featured = featured;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getCommunicationId() {
		return communicationId;
	}

	public void setCommunicationId(String communicationId) {
		this.communicationId = communicationId;
	}

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getHerfLink() {
		return herfLink;
	}

	public void setHerfLink(String herfLink) {
		this.herfLink = herfLink;
	}

	public String getThumbnailPath() {
		return thumbnailPath;
	}

	public void setThumbnailPath(String thumbnailPath) {
		this.thumbnailPath = thumbnailPath;
	}

	public String getPreviewImagePath() {
		return previewImagePath;
	}

	public void setPreviewImagePath(String previewImagePath) {
		this.previewImagePath = previewImagePath;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getMonthInt() {
		return monthInt;
	}

	public void setMonthInt(int monthInt) {
		this.monthInt = monthInt;
	}

	public class CompareByMonth implements Comparator<EventNode> {
		public int compare(EventNode p1, EventNode p2) {
			return p1.getMonthInt() - p2.getMonthInt();
		}

	}

	public class CompareByYear implements Comparator<EventNode> {
		public int compare(EventNode p1, EventNode p2) {
			return p1.getYear() - p2.getYear();
		}

	}

}
