package com.hdscorp.cms.restservice;

/**
 * LMS Bean used for LMS Scheduler
 * 
 * @author gokula.nand
 *
 */
public class LMSBean {

	private String keyword;

	private String deliveryStyle;

	private String globalId;

	private String trainingTitle;

	private String trainingDesc;

	private String iltFacilityCountry;

	private String iltFacilityCity;

	private String iltFacilityName;

	private String language;

	private String trainingStartDate;

	private String trainingEndDate;

	private String costCurrency;

	private String trainingPrice;

	private String courseDeeplink;

	public LMSBean() {

	}

	public LMSBean(String keyword, String deliveryStyle, String globalId, String trainingTitle, String trainingDesc,
			String iltFacilityCountry, String iltFacilityCity, String iltFacilityName, String language,
			String trainingStartDate, String trainingEndDate, String costCurrency, String trainingPrice,
			String courseDeeplink) {
		this.keyword = keyword;
		this.deliveryStyle = deliveryStyle;
		this.globalId = globalId;
		this.trainingTitle = trainingTitle;
		this.trainingDesc = trainingDesc;
		this.iltFacilityCountry = iltFacilityCountry;
		this.iltFacilityCity = iltFacilityCity;
		this.iltFacilityName = iltFacilityName;
		this.language = language;
		this.trainingStartDate = trainingStartDate;
		this.trainingEndDate = trainingEndDate;
		this.costCurrency = costCurrency;
		this.trainingPrice = trainingPrice;
		this.courseDeeplink = courseDeeplink;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public void setDeliveryStyle(String deliveryStyle) {
		this.deliveryStyle = deliveryStyle;
	}

	public void setGlobalId(String globalId) {
		this.globalId = globalId;
	}

	public void setTrainingTitle(String trainingTitle) {
		this.trainingTitle = trainingTitle;
	}

	public void setTrainingDesc(String trainingDesc) {
		this.trainingDesc = trainingDesc;
	}

	public void setIltFacilityCountry(String iltFacilityCountry) {
		this.iltFacilityCountry = iltFacilityCountry;
	}

	public void setIltFacilityCity(String iltFacilityCity) {
		this.iltFacilityCity = iltFacilityCity;
	}

	public void setIltFacilityName(String iltFacilityName) {
		this.iltFacilityName = iltFacilityName;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public void setTrainingStartDate(String trainingStartDate) {
		this.trainingStartDate = trainingStartDate;
	}

	public void setTrainingEndDate(String trainingEndDate) {
		this.trainingEndDate = trainingEndDate;
	}

	public void setCostCurrency(String costCurrency) {
		this.costCurrency = costCurrency;
	}

	public void setTrainingPrice(String trainingPrice) {
		this.trainingPrice = trainingPrice;
	}

	public void setCourseDeeplink(String courseDeeplink) {
		this.courseDeeplink = courseDeeplink;
	}

	public String getKeyword() {
		return keyword;
	}

	public String getDeliveryStyle() {
		return deliveryStyle;
	}

	public String getGlobalId() {
		return globalId;
	}

	public String getTrainingTitle() {
		return trainingTitle;
	}

	public String getTrainingDesc() {
		return trainingDesc;
	}

	public String getIltFacilityCountry() {
		return iltFacilityCountry;
	}

	public String getIltFacilityCity() {
		return iltFacilityCity;
	}

	public String getIltFacilityName() {
		return iltFacilityName;
	}

	public String getLanguage() {
		return language;
	}

	public String getTrainingStartDate() {
		return trainingStartDate;
	}

	public String getTrainingEndDate() {
		return trainingEndDate;
	}

	public String getCostCurrency() {
		return costCurrency;
	}

	public String getTrainingPrice() {
		return trainingPrice;
	}

	public String getCourseDeeplink() {
		return courseDeeplink;
	}

}
