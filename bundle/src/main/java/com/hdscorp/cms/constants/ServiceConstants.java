package com.hdscorp.cms.constants;

/**
 * The Service Constants is used for all the services.
 * 
 * @author gokula.nand
 */
public final class ServiceConstants {

	/*
	 * Feed constraints
	 */
	public static final String UPDATED_DATE = "updated";
	public static final String TITLE = "title";
	public static final String AUTHOR = "author";
	public static final String SUMMARY = "summary";
	public static final String FEATURED = "bt:featured";
	public static final String STATUS = "bt:status";
	public static final String FORMAT = "bt:format";
	public static final String DURATION = "bt:duration";
	public static final String START = "bt:start";
	public static final String RATING = "bt:rating";
	public static final String COMMUNICATION = "bt:communication";
	public static final String ID = "id";
	public static final String CHANNEL = "bt:channel";
	public static final String LINK = "link";
	public static final String HREF = "href";
	public static final String MIN = " mins";
	public static final int SECOND = 60;
	public static final String ENTRY_TAG = "entry";
	public static final int TIME_OUT = 60 * 1000;

	public static final String JSON_UPDATED_DATE = "updatedDate";
	public static final String JSON_TITLE = "title";
	public static final String JSON_AUTHOR = "author";
	public static final String JSON_SUMMARY = "summary";
	public static final String JSON_FEATURED = "featured";
	public static final String JSON_STATUS = "status";
	public static final String JSON_FORMAT = "format";
	public static final String JSON_DURATION = "duration";
	public static final String JSON_START = "start";
	public static final String JSON_RATING = "rating";
	public static final String JSON_COMMUNICATION_ID = "communicationId";
	public static final String JSON_CHANNEL_ID = "channelId";
	public static final String JSON_HERF_LINK = "herfLink";
	public static final String JSON_THUMBNAIL_PATH = "thumbnailPath";
	public static final String JSON_PREVIEW_IMAGE_PATH = "previewImagePath";
	public static final String JSON_STATUS_CODE = "statusCode";
	public static final String JSON_STATUS_REASON = "statusReason";
	public static final String NOT_FOUND_STATUS_CODE = "400";
	public static final String NOT_FOUND_STATUS_REASON = "Bad Request";
	public static final String OK_FOUND_STATUS_CODE = "200";
	public static final String OK_FOUND_STATUS_REASON = "Provided feed URL have not valid data format";
	public static final String EMPTY_SPACE = " ";
	public static final String DATE_FORMAT_TO = "MM/dd/yyyy";
	public static final String DATE_FORMAT_FROM = "yyyy-MM-dd";
	public static final String DATE_SEPERATOR = "T";
	public static final String UTF_8 = "UTF-8";
	public static final String CONTENT_TYPE = "application/xml";
	public static final String POST_METHOD_TYPE = "Post";
	public static final String GET_METHOD_TYPE = "Get";
	public static final String FEED_PARAMETER = "";
	public static final String SAVE_FEED_DATA_PROPERTY_NAME = "serviceResponse";

	public static final String FEED_URL_KEY = "feed.url";
	public static final String FEED_SCHEDULER_EXPRESSION = "scheduler.expression";
	public static final String FEED_STORAGE_PATH = "storage.path";

	/*
	 * Twitter constraints
	 */
	public static final String TWITTER_CONSUMER_KEY = "twitter.consumerkey";
	public static final String TWITTER_CONSUMER_SECRET = "twitter.consumerSecret";
	public static final String TWITTER_ACCESSTOKEN_KEY = "twitter.accessTokenKey";
	public static final String TWITTER_ACCESSTOKEN_SECRET = "twitter.accessTokenSecret";
	public static final String TWITTER_STORAGE_PATH = "twitter.storagePath";
	public static final String TWITTER_SCHEDULER_EXPRESSION = "scheduler.expression";
	public static final String TW_FEED_POSTED_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String FEED_RESPONSE_TIME_FORMAT = "EEE MMM d HH:mm:ss z yyyy";
	public static final String TW_FEED_POSTED_DAYS_MESSAGE = "days ago";
	public static final String TW_FEED_POSTED_ONE_DAY_MESSAGE = "day ago";
	public static final String TW_FEED_POSTED_YEARS_MESSAGE = "years ago";
	public static final String TW_FEED_POSTED_ONE_YEAR_MESSAGE = "year ago";
	public static final String TW_FEED_POSTED_MONTHS_MESSAGE = "months ago";
	public static final String TW_FEED_POSTED_ONE_MONTH_MESSAGE = "month ago";
	public static final String TW_FEED_POSTED_HOURS_MESSAGE = "hours ago";
	public static final String TW_FEED_POSTED_ONE_HOUR_MESSAGE = "hour ago";
	public static final String TW_FEED_POSTED_MINS_MESSAGE = "mins ago";
	public static final String TW_FEED_POSTED_ONE_MIN_MESSAGE = "min ago";
	public static final String TW_FEED_POSTED_DIFF_FORMAT = "%d hour-h %d min-m";
	public static final String TW_FEED_HOURS_SEPERATOR = "-h";
	public static final String TW_FEED_MINS_SEPERATOR = "-m";
	public static final Integer HOURS_IN_DAY = 24;
	public static final String TW_POST_LIMIT = "twitter.postlimit";
	public static final String TIME_DIFF_POSTDATE_CURRENTDATE = "timeDifference";
	public static final String TWITTER_ID = "twitterID";
	public static final String TWITTER_POSTED_DATE = "twitterPostedDate";
	public static final String TWITTER_MESSAGE_TEXT = "twitterMessageText";
	public static final String TWITTER_MEDIA_URL = "twitterMediaUrl";
	public static final String TWITTER_SAVE_FEED_DATA_PROPERTY_NAME = "twitterResponse";

	/*
	 * Facebook constraints
	 */
	public static final String FB_POST_LIMIT_KEY = "facebook.postlimit";
	public static final String FB_POST_SEARCH_KEY = "facebook.searchpost";
	public static final String FB_POST_APP_ID_KEY = "facebook.appid";
	public static final String FB_POST_APP_SECRET_KEY = "facebook.appsecret";
	public static final String FB_POST_APP_ACCESS_TOKEN_KEY = "facebook.accesstoken";
	public static final String FB_POST_SCHEDULER_EXPRESSION = "facebook.scheduler.expression";
	public static final String FB_POST_STORAGE_PATH = "facebook.storage.path";

	public static final String JSON_FB_ID = "id";
	public static final String JSON_FB_CreatedDate = "createdDate";
	public static final String JSON_FB_MESSAGE = "message";
	public static final String FB_PERSMISSION_STRING = "email, publish_stream, id, name, first_name, last_name, read_stream , generic";
	public static final String FB_POST_FEED_DISPLAY_DATE_FORMAT = "MMMM d, yyyy";
	public static final String SAVE_FB_FEED_DATA_PROPERTY_NAME = "facebookResonse";

}
