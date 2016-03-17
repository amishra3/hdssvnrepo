package com.hdscorp.cms.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.constants.ServiceConstants;

/**
 * This Utility has common methods which can be used in the services and other
 * implementation.
 * 
 * @author gokula.nand
 */

public class ServiceUtil {

	private static final Logger log = LoggerFactory.getLogger(ServiceUtil.class);

	/**
	 * Useful to store service data into the JCR.
	 * 
	 * @param wsResponse
	 * @param storagePath
	 * @param savedProperty
	 */
	public static void saveWSResponse(String wsResponse, String storagePath, String savedProperty) {
		log.info("Execution start of method saveWSResponse()  JCR Storage Path: " + storagePath
				+ ": JCR Save Property: " + savedProperty);
		Session session = null;
		try {
			session = JcrUtilService.getSession();
			// if(JcrUtilService.getResourceResolver().)
			Resource resource = JcrUtilService.getResourceResolver().resolve(storagePath);
			Node node = resource.adaptTo(Node.class);
			node.setProperty(savedProperty, wsResponse);
			node.save();
			session.save();

		} catch (Exception e) {
			log.error("Exception occurs duing saving data to JCR: ", e);
		} finally {
			if (session != null && session.isLive()) {
				session.logout();
				session = null;
			}

		}
	}

	/**
	 * Useful to get formated date based on provided formats.
	 * 
	 * @param sourceDate
	 * @param feedResponseFormat
	 * @param feedDisplayFormat
	 * @return
	 * @throws ParseException
	 */
	public static String getDisplayDateFormat(String sourceDate, String feedResponseFormat, String feedDisplayFormat)
			throws ParseException {
		if (sourceDate != null && !sourceDate.equals("")) {
			SimpleDateFormat sdfSource = new SimpleDateFormat(feedResponseFormat);
			Date dateTo = sdfSource.parse(sourceDate.trim());
			SimpleDateFormat sdfDestination = new SimpleDateFormat(feedDisplayFormat);
			return sdfDestination.format(dateTo);
		} else {
			return ServiceConstants.EMPTY_SPACE;
		}
	}

	/**
	 * 
	 * @param date
	 * @param displayFormat
	 * @return
	 * @throws ParseException
	 */

	public static String getStringFromDate(Date date, String displayFormat) throws ParseException {

		SimpleDateFormat sdfDestination = new SimpleDateFormat(displayFormat);
		return sdfDestination.format(date);

	}

	/**
	 * 
	 * @param date
	 * @param format
	 * @return
	 * @throws ParseException
	 */
	public static Date getDateFromString(String date, String format) throws ParseException {

		SimpleDateFormat sdfDestination = new SimpleDateFormat(format);
		return sdfDestination.parse(date);

	}

	/**
	 * Useful to get the time difference between the feed PostedDate to
	 * CurrentDate
	 * 
	 * @param createdDate
	 * @return {String}
	 */
	public static String getFeedTimeDifference(String createdDate) throws ParseException {
		log.info("getFeedTimeDifference method execution starting");
		String formattedCreatedDate;
		String formateedCurrentDate;
		StringBuffer feedPostedTime = new StringBuffer();
		Date currentDate = new Date();

		SimpleDateFormat sdf = new SimpleDateFormat(ServiceConstants.FEED_RESPONSE_TIME_FORMAT);
		Date parsedCreatedDate = sdf.parse(createdDate);
		sdf.applyPattern(ServiceConstants.TW_FEED_POSTED_TIME_FORMAT);
		formattedCreatedDate = sdf.format(parsedCreatedDate);
		SimpleDateFormat sdf1 = new SimpleDateFormat(ServiceConstants.FEED_RESPONSE_TIME_FORMAT);
		Date parsedCurrentDate = sdf1.parse(currentDate.toString());
		sdf.applyPattern(ServiceConstants.TW_FEED_POSTED_TIME_FORMAT);
		formateedCurrentDate = sdf.format(parsedCurrentDate);
		int year = Integer.parseInt(formattedCreatedDate.substring(0, 4));
		int month = Integer.parseInt(formattedCreatedDate.substring(5, 7));
		int date = Integer.parseInt(formattedCreatedDate.substring(8, 10));
		int hour = Integer.parseInt(formattedCreatedDate.substring(11, 13));
		int min = Integer.parseInt(formattedCreatedDate.substring(14, 16));
		int year1 = Integer.parseInt(formateedCurrentDate.substring(0, 4));
		int month1 = Integer.parseInt(formateedCurrentDate.substring(5, 7));
		int date1 = Integer.parseInt(formateedCurrentDate.substring(8, 10));
		int hour1 = Integer.parseInt(formateedCurrentDate.substring(11, 13));
		int min1 = Integer.parseInt(formateedCurrentDate.substring(14, 16));

		DateTime beforeDST = new DateTime(year, month, date, hour, min);

		DateTime afterDST = new DateTime(year1, month1, date1, hour1, min1);

		Period p = new Period(beforeDST, afterDST);

		if (p.getYears() >= 1) {
			if (p.getYears() == 1)
				feedPostedTime.append(p.getYears()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_YEAR_MESSAGE);
			else
				feedPostedTime.append(p.getYears()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_YEARS_MESSAGE);

		} else if (p.getMonths() >= 1) {
			if (p.getMonths() == 1)
				feedPostedTime.append(p.getMonths()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_MONTH_MESSAGE);
			else
				feedPostedTime.append(p.getMonths()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_MONTHS_MESSAGE);

		} else if (p.getWeeks() >= 1) {
			if (p.getWeeks() == 1)
				feedPostedTime.append(p.getWeeks()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_WEEK_MESSAGE);
			else
				feedPostedTime.append(p.getWeeks()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_WEEKS_MESSAGE);

		}

		else if (p.getDays() >= 1) {
			if (p.getDays() == 1)
				feedPostedTime.append(p.getDays()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_DAY_MESSAGE);
			else
				feedPostedTime.append(p.getDays()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_DAYS_MESSAGE);
		} else {
			if (p.getHours() >= 1 && p.getHours() < ServiceConstants.HOURS_IN_DAY) {
				if (p.getHours() == 1)
					feedPostedTime.append(p.getHours()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_ONE_HOUR_MESSAGE);
				else
					feedPostedTime.append(p.getHours()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_HOURS_MESSAGE);
			} else {
				if (p.getMinutes() == 1)
					feedPostedTime.append(p.getMinutes()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_ONE_MIN_MESSAGE);
				else
					feedPostedTime.append(p.getMinutes()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_MINS_MESSAGE);
			}

		}
		log.info("feed post time ::" + feedPostedTime);
		return feedPostedTime.toString();

	}

	public static String getFeedTimeDifference(String startDate, String endDate) throws ParseException {
		log.info("getFeedTimeDifference method execution starting");
		String formattedCreatedDate;
		String formateedCurrentDate;
		StringBuffer feedPostedTime = new StringBuffer();
		

		SimpleDateFormat sdf = new SimpleDateFormat(ServiceConstants.DATE_FORMAT_TO_DISPLAY_LML);
		Date parsedCreatedDate = sdf.parse(startDate);
		sdf.applyPattern(ServiceConstants.TW_FEED_POSTED_TIME_FORMAT);
		formattedCreatedDate = sdf.format(parsedCreatedDate);
		SimpleDateFormat sdf1 = new SimpleDateFormat(ServiceConstants.DATE_FORMAT_TO_DISPLAY_LML);
		Date parsedCurrentDate = sdf1.parse(endDate.toString());
		sdf.applyPattern(ServiceConstants.TW_FEED_POSTED_TIME_FORMAT);
		formateedCurrentDate = sdf.format(parsedCurrentDate);
		int year = Integer.parseInt(formattedCreatedDate.substring(0, 4));
		int month = Integer.parseInt(formattedCreatedDate.substring(5, 7));
		int date = Integer.parseInt(formattedCreatedDate.substring(8, 10));
		int hour = Integer.parseInt(formattedCreatedDate.substring(11, 13));
		int min = Integer.parseInt(formattedCreatedDate.substring(14, 16));
		int year1 = Integer.parseInt(formateedCurrentDate.substring(0, 4));
		int month1 = Integer.parseInt(formateedCurrentDate.substring(5, 7));
		int date1 = Integer.parseInt(formateedCurrentDate.substring(8, 10));
		int hour1 = Integer.parseInt(formateedCurrentDate.substring(11, 13));
		int min1 = Integer.parseInt(formateedCurrentDate.substring(14, 16));

		DateTime beforeDST = new DateTime(year, month, date, hour, min);

		DateTime afterDST = new DateTime(year1, month1, date1, hour1, min1);

		Period p = new Period(beforeDST, afterDST);

		if (p.getYears() >= 1) {
			if (p.getYears() == 1)
				feedPostedTime.append(p.getYears()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_YEAR_MESSAGE);
			else
				feedPostedTime.append(p.getYears()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_YEARS_MESSAGE);

		} else if (p.getMonths() >= 1) {
			if (p.getMonths() == 1)
				feedPostedTime.append(p.getMonths()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_MONTH_MESSAGE);
			else
				feedPostedTime.append(p.getMonths()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_MONTHS_MESSAGE);

		} else if (p.getWeeks() >= 1) {
			if (p.getWeeks() == 1)
				feedPostedTime.append(p.getWeeks()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_WEEK_MESSAGE);
			else
				feedPostedTime.append(p.getWeeks()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_WEEKS_MESSAGE);

		}

		else if (p.getDays() >= 1) {
			if (p.getDays() == 1)
				feedPostedTime.append(p.getDays()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_ONE_DAY_MESSAGE);
			else
				feedPostedTime.append(p.getDays()).append(ServiceConstants.EMPTY_SPACE)
						.append(ServiceConstants.TW_FEED_POSTED_DAYS_MESSAGE);
		} else {
			if (p.getHours() >= 1 && p.getHours() < ServiceConstants.HOURS_IN_DAY) {
				if (p.getHours() == 1)
					feedPostedTime.append(p.getHours()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_ONE_HOUR_MESSAGE);
				else
					feedPostedTime.append(p.getHours()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_HOURS_MESSAGE);
			} else {
				if (p.getMinutes() == 1)
					feedPostedTime.append(p.getMinutes()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_ONE_MIN_MESSAGE);
				else
					feedPostedTime.append(p.getMinutes()).append(ServiceConstants.EMPTY_SPACE)
							.append(ServiceConstants.TW_FEED_POSTED_MINS_MESSAGE);
			}

		}
		log.info("feed post time ::" + feedPostedTime);
		return feedPostedTime.toString();

	}

	public static String getMonth(int month) {
		String[] monthNames = { "January", "February", "March", "April", "May", "June", "July", "August", "September",
				"October", "November", "December" };
		return monthNames[month];
	}

	public static List<Map<String, String>> getBrightTalkMapFromJSON(ResourceResolver resourceResolver,
			String storagePath, String savedProperty, String webcastStatus) {
		log.info("Start execution of getBrightTalkMapFromJSON()");
		List<Map<String, String>> listMap = new ArrayList<>();

		try {
			String jsonArrayObject = PageUtils.getPropertyValue(resourceResolver, storagePath, savedProperty);
			log.debug("jsonArrayObject :::::::::::::::::" + jsonArrayObject);
			if (jsonArrayObject.contains(ServiceConstants.JSON_STATUS_CODE)) {
				Map<String, String> map = new HashMap<String, String>();
				JSONObject jsonObject = new JSONObject(jsonArrayObject);
				map.put(ServiceConstants.JSON_STATUS_CODE, jsonObject.getString(ServiceConstants.JSON_STATUS_CODE));
				map.put(ServiceConstants.JSON_STATUS_REASON, jsonObject.getString(ServiceConstants.JSON_STATUS_REASON));
				listMap.add(map);
				return listMap;
			}
			JSONArray jsonArray = new JSONArray(jsonArrayObject);
			for (int i = 0; i < jsonArray.length(); i++) {
				Map<String, String> map = new HashMap<String, String>();
				JSONObject item = jsonArray.getJSONObject(i);
				if (webcastStatus != null && !webcastStatus.isEmpty()
						&& webcastStatus.equalsIgnoreCase(item.getString(ServiceConstants.JSON_STATUS))) {
					map.put(ServiceConstants.JSON_TITLE, item.getString(ServiceConstants.JSON_TITLE));
					map.put(ServiceConstants.JSON_UPDATED_DATE, item.getString(ServiceConstants.JSON_UPDATED_DATE));
					map.put(ServiceConstants.JSON_AUTHOR, item.getString(ServiceConstants.JSON_AUTHOR));
					map.put(ServiceConstants.JSON_SUMMARY, item.getString(ServiceConstants.JSON_SUMMARY));
					map.put(ServiceConstants.JSON_FEATURED, item.getString(ServiceConstants.JSON_FEATURED));
					map.put(ServiceConstants.JSON_STATUS, item.getString(ServiceConstants.JSON_STATUS));
					map.put(ServiceConstants.JSON_FORMAT, item.getString(ServiceConstants.JSON_FORMAT));
					map.put(ServiceConstants.JSON_DURATION, item.getString(ServiceConstants.JSON_DURATION));
					map.put(ServiceConstants.JSON_START, item.getString(ServiceConstants.JSON_START));
					map.put(ServiceConstants.JSON_RATING, item.getString(ServiceConstants.JSON_RATING));
					map.put(ServiceConstants.JSON_CATEGORY, item.getString(ServiceConstants.JSON_CATEGORY));
					map.put(ServiceConstants.JSON_COMMUNICATION_ID,
							item.getString(ServiceConstants.JSON_COMMUNICATION_ID));
					map.put(ServiceConstants.JSON_CHANNEL_ID, item.getString(ServiceConstants.JSON_CHANNEL_ID));
					map.put(ServiceConstants.JSON_HERF_LINK, item.getString(ServiceConstants.JSON_HERF_LINK));
					map.put(ServiceConstants.JSON_THUMBNAIL_PATH, item.getString(ServiceConstants.JSON_THUMBNAIL_PATH));
					map.put(ServiceConstants.JSON_PREVIEW_IMAGE_PATH,
							item.getString(ServiceConstants.JSON_PREVIEW_IMAGE_PATH));
					listMap.add(map);
				}

			}
		} catch (Exception e) {
			log.error("Exception while creating map::" + e);
		}
		return listMap;
	}

	public static Date getDatefromString(String dateStr, String dateformate) {

		SimpleDateFormat formatter = new SimpleDateFormat(dateformate);

		try {
			Date date = formatter.parse(dateStr);
			return date;
		} catch (Exception e) {
			log.info("Exception while converting Date::" + e);
		}
		return null;

	}
}