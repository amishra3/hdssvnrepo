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
	public static final String CATEGORY = "category";
	public static final String TERM = "term";
	public static final String REG_EXP = "#|\"";
	public static final int TIME_OUT = 60 * 1000;

	/**
	 * Blog Constants
	 */

	public static final String BLOG_TAG = "item";
	public static final String PUB_DATE = "pubDate";
	public static final String DC_DATE = "dc:date";
	public static final String GUID = "guid";
	public static final String DATE_TO_TEXT = "clearspace:dateToText";
	public static final String OBJECT_TYPE = "clearspace:objectType";
	public static final String REPLY_TYPE = "clearspace:replyCount";
	public static final String DOMAIN = "domain";
	public static final String BLOG_TO_DATE_FORMAT = "EEE, d MMM yyyy HH:mm:ss Z";
	public static final String DESCRIPTION = "description";

	public static final String JSON_LINK = "link";
	public static final String JSON_DC_DATE = "dcDate";
	public static final String JSON_GUID = "guid";
	public static final String JSON_OBJECT_TYPE = "objectType";
	public static final String JSON_REPLY_TYPE = "replyCount";
	public static final String JSON_DESCRIPTION = "description";
	public static final String JSON_DOMAIN = "domain";

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
	public static final String JSON_CATEGORY = "category";
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
	public static final String SLASH_SEPRATOR = "/";
	public static final String COMMA_SEPRATOR = ",";
	public static final String DATE_FORMAT_TO = "MM/dd/yyyy";
	public static final String DATE_FORMAT_FROM = "yyyy-MM-dd";
	public static final String DATE_SEPERATOR = "T";
	public static final String UTF_8 = "UTF-8";
	public static final String CONTENT_TYPE = "application/xml";
	public static final String POST_METHOD_TYPE = "Post";
	public static final String GET_METHOD_TYPE = "Get";
	public static final String FEED_PARAMETER = "";
	public static final String SAVE_FEED_DATA_PROPERTY_NAME = "serviceResponse";
	public static final String FEED_UPCOMING = "upcoming";
	public static final String FEED_RECORDED = "recorded";

	public static final String SAVE_BLOG_FEED_DATA_PROPERTY_NAME = "blogResponse";

	public static final String FEED_URL_KEY = "feed.url";
	public static final String FEED_SCHEDULER_EXPRESSION = "scheduler.expression";
	public static final String FEED_STORAGE_PATH = "storage.path";
	public static final String FEED_POST_LIMIT = "feed.limit";
	
	public static final String BRIGHTCOVE_PAGE_SIZE = "brightcove.pagesize";

	/*
	 * Twitter constraints
	 */
	public static final String TWITTER_ACCESS_DETAILS = "twitter.access.details";
	public static final String TWITTER_CONSUMER_KEY = "consumerkey";
	public static final String TWITTER_CONSUMER_SECRET = "consumerSecret";
	public static final String TWITTER_ACCESSTOKEN_KEY = "accessTokenKey";
	public static final String TWITTER_ACCESSTOKEN_SECRET = "accessTokenSecret";
	public static final String TWITTER_STORAGE_PATH = "storagePath";
	public static final String TWITTER_SCHEDULER_EXPRESSION = "scheduler.expression";
	public static final String TW_FEED_POSTED_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String FEED_RESPONSE_TIME_FORMAT = "EEE MMM d HH:mm:ss z yyyy";
	public static final String TW_FEED_POSTED_DAYS_MESSAGE = "days ago";
	public static final String TW_FEED_POSTED_ONE_DAY_MESSAGE = "day ago";
	public static final String TW_FEED_POSTED_YEARS_MESSAGE = "years ago";
	public static final String TW_FEED_POSTED_ONE_YEAR_MESSAGE = "year ago";
	public static final String TW_FEED_POSTED_MONTHS_MESSAGE = "months ago";
	public static final String TW_FEED_POSTED_ONE_MONTH_MESSAGE = "month ago";
	public static final String TW_FEED_POSTED_WEEKS_MESSAGE = "weeks ago";
	 public static final String TW_FEED_POSTED_ONE_WEEK_MESSAGE = "week ago";
	public static final String TW_FEED_POSTED_HOURS_MESSAGE = "hours ago";
	public static final String TW_FEED_POSTED_ONE_HOUR_MESSAGE = "hour ago";
	public static final String TW_FEED_POSTED_MINS_MESSAGE = "mins ago";
	public static final String TW_FEED_POSTED_ONE_MIN_MESSAGE = "min ago";
	public static final String TW_FEED_POSTED_DIFF_FORMAT = "%d hour-h %d min-m";
	public static final String TW_FEED_HOURS_SEPERATOR = "-h";
	public static final String TW_FEED_MINS_SEPERATOR = "-m";
	public static final Integer HOURS_IN_DAY = 24;
	public static final String TW_POST_LIMIT = "postlimit";
	public static final String TIME_DIFF_POSTDATE_CURRENTDATE = "timeDifference";
	public static final String TWITTER_ID = "twitterID";
	public static final String TWITTER_POSTED_DATE = "twitterPostedDate";
	public static final String TWITTER_MESSAGE_TEXT = "twitterMessageText";
	public static final String TWITTER_MEDIA_URL = "twitterMediaUrl";
	public static final String TWITTER_SAVE_FEED_DATA_PROPERTY_NAME = "twitterResponse";
	public static final String TWITTER_URL = "twitterURL";
	public static final String TWITTER_HANDLE = "twitterHandle";
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
	public static final String JSON_FB_POST_ID = "postId";
	public static final String JSON_FB_CreatedDate = "createdDate";
	public static final String JSON_FB_MESSAGE = "message";
	public static final String JSON_FB_TITLE = "tilte";
	public static final String JSON_FB_LINK = "link";
	public static final String JSON_FB_THUMBNAIL = "thumbnail";
	public static final String JSON_FB_TYPE = "type";	
	public static final String FB_PERSMISSION_STRING = "id,message,picture,link,description,icon,created_time";
	public static final String FB_POST_FEED_DISPLAY_DATE_FORMAT = "MMMM d, yyyy";
	public static final String SAVE_FB_FEED_DATA_PROPERTY_NAME = "facebookResponse";
	


	/**
	 * BrightCove Constraints
	 * 
	 */

	public static final String BR_COVE_JCR_TITLE = "jcr:title";
	public static final String BR_COVE_JCR_DISC = "jcr:description";
	public static final String BR_COVE_JCR_GUID = "guid";
	public static final String BR_COVE_JCR_PUB_DATE = "pubDate";
	public static final String BR_COVE_JCR_THUMBNAIL = "thumbnail";
	public static final String BR_COVE_JCR_THUMBNAIL_VS = "thumbnailvs";
	public static final String BR_COVE_JCR_TITLE_ID = "titleid";
	public static final String BR_COVE_JCR_DURATION = "duration";
	public static final String BR_COVE_JCR_ACCOUNT_ID = "accountid";
	public static final String BR_COVE_JCR_URL = "url";
	public static final String BR_COVE_JCR_KEYWORD = "keyword";
	public static final String BR_COVE_JCR_UNSTR = "nt:unstructured";
	public static final String BR_COVE_JRC_NODE_SEPRATOR = "-";

	public static final String BR_COVE_ENTRY = "item";
	public static final String BR_COVE_FEED_TITLE = "title";
	public static final String BR_COVE_FEED_GUID = "guid";
	public static final String BR_COVE_FEED_PUB_DATE = "pubDate";
	public static final String BR_COVE_FEED_THUMBNAIL = "media:thumbnail";
	public static final String BR_COVE_FEED_URL = "url";
	public static final String BR_COVE_FEED_BCTITLE_ID = "bc:titleid";
	public static final String BR_COVE_BC_FEED_DURATION = "bc:duration";
	public static final String BR_COVE_BC_FEED_ACCOUNT_ID = "bc:accountid";
	public static final String BR_COVE_FEED_DISC = "description";
	public static final String BR_COVE_FEED_MEDIA_CONTENT = "media:content";
	public static final String BR_COVE_FEED_MEDIA_KEYWORD = "media:keywords";

	/**
	 * Event Constraints
	 */

	public static final String EVENT_JCR_EVENTTYPE = "jcr:eventtype";
	public static final String EVENT_JCR_EVENTTITLE = "jcr:eventtitle";
	public static final String EVENT_JCR_START_DATE = "jcr:eventstartdate";
	public static final String EVENT_JCR_END_DATE = "jcr:eventenddate";
	public static final String EVENT_JCR_LOCATION = "jcr:eventlocation";
	public static final String EVENT_JCR_DESCRIPTION = "jcr:eventdescription";
	public static final String EVENT_JCR_BACKGROUND_IMAGE = "jcr:evbackgroundimage";
	public static final String EVENT_JCR_REGISTER_NOW_LABEL = "jcr:registernowlabel";
	public static final String EVENT_JCR_REGISTER_NOW_LINK = "jcr:registernowlink";
	public static final String EVENT_JCR_REGION_TAG = "jcr:eventregiontag";
	public static final String EVENT_JCR_THIRD_PARTY_ICON = "jcr:thirdpartyicon";
	public static final String EVENT_JCR_NEW_WINDOW = "jcr:newwindow";
	public static final String EVENT_JCR_EVENT_ID = "jcr:eventid";
	public static final String DATE_FORMAT_FROM_EVENT = "MM/dd/yy";
	public static final String DATE_FORMAT_TO_EVENT = "MM/dd/yyyy";


	/**
	 * Location Constraints
	 */
	public static final String LOCATION_JCR_REGION = "jcr:locregion";
	public static final String LOCATION_JCR_COUNTRY = "jcr:loccountry";
	public static final String LOCATION_JCR_LOCATIONS= "jcr:loclocations";
	public static final String LOCATION_JCR_LOCATIONIMAGE = "jcr:locationimage";
	public static final String LOCATION_JCR_LOCATIONIMAGEALTTEXT = "jcr:locimagealttext";
	public static final String LOCATION_JCR_LOCATIONDETAIL = "jcr:locationdetail";
	public static final String LOCATION_JCR_LOCATIONLATITUDE = "jcr:locationlatitude";
	public static final String LOCATION_JCR_LOCATIONLONGITUDE = "jcr:locationlongitude";
	public static final String LOCATION_JCR_LOCATIONPHONENUMBER = "jcr:locphonenumber";
	public static final String LOCATION_JCR_TITLE = "loctitle";
	public static final String LOCATION_JCR_DRIVING_DIRECTION = "jcr:directiondetail";
	public static final String LOCATION_JCR_LOCATION_LINK = "jcr:locationlink";
	public static final String LOCATION_JCR_LOCATION_LINK_TEXT = "jcr:loclinktext";
	public static final String LOCATION_JCR_LOCATION_LINK_TYPE = "jcr:loclinktargettype";
	

	/**
	 * News and Insights Constraints
	 */
	
	public static final String DATE_FORMAT_TO_FULL_MONTH_YEAR = "MMMM d, yyyy";
	
/**
	 * Proxy constraints
	 */
	
	public static final String PROP_PROXY_HOST = "proxy.host";
	public static final String PROP_PROXY_ENABLED = "proxy.enabled";
	public static final String HTTPCLIENT_PID = "com.day.commons.httpclient";
	
	
	/** MLS Service Constraints
	 * 
	 */
	public static final String FILE_CSV_PATH = "file.csv.path";
	
	public static final String DATE_FORMAT_FROM_LML = "MM/dd/yyyy HH:mm";	
	public static final String DATE_FORMAT_TO_LML = "MMddyyyy";
	public static final String LML_NODE_SEPERATOR = "-";
	
	public static final String LML_KEYWORD= "Keyword";
	public static final String LML_DELIVERY_STYLE= "deliveryStyle";	
	public static final String LML_GLOBAL_ID= "globalId";
	public static final String LML_TRANING_TITLE= "trainingTitle";
	public static final String LML_TRANING_DESC= "trainingDesc";
	public static final String LML_ILT_FACILITY_COUNTRY= "iltFacilityCountry";
	public static final String LML_ILT_FACILITY_CITY= "iltFacilityCity";
	public static final String LML_ILT_FACILITY_NAME= "iltFacilityName";
	public static final String LML_LANGUAGE= "language";
	public static final String LML_TRANING_START_DATE= "trainingStartDate";
	public static final String LML_TRANING_END_DATE= "trainingEndDate";
	public static final String LML_COST_CURRENCY= "costCurrency";
	public static final String LML_TRANING_PRICE= "trainingPrice";
	public static final String LML_COURSE_DEEP_LINK= "courseDeeplink";
	
	public static final String LML_JCR_TRANING_TITLE= "jcr:title";
	public static final String LML_JCR_TRANING_DESC= "jcr:description";
	public static final String LML_CHILD_NODE= "childNode";
	public static final String DATE_FORMAT_TO_DISPLAY_LML = "MM/dd/yyyy";
	
	public static final String DATE_FORMAT_TO_FEED_LML = "MM/dd/yyyy HH:mm:ss a";
	
	
	
	/**
	 * Shorten URL
	 */

	public static final String SHORTEN_URL= "http://hds.co/yourls-api.php?signature=3608141f9d&action=shorturl&url=";
	
	
}