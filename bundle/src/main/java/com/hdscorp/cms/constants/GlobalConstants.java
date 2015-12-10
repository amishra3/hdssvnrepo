package com.hdscorp.cms.constants;

public final class GlobalConstants {

	public static final String APPLICATION_CONTENT_PATH = "/content/hdscorp/";
	public static final String APPLICATION_DESIGN_ROOT_PATH = "/etc/designs/hdscorp/";
	public static final String PATH_SEPERATOR = "/";
	public static final String EMPTY_STRING = "";
	public static final String HTML_EXTENSION = ".html";

	public static final String JCR_CONTENT = "jcr:content";
	public static final String JCR_CONTENT_WITH_SLASH = "/jcr:content";

	public static final String STRUCTURE_DATA = "structureddata";
	public static final String ARTICLES = "articles";
	public static final String ARTICLE = "article";
	public static final String CATEGORY = "category";
	public static final String RECIPES = "recipes";
	public static final String RECIPE = "recipe";
	public static final String DETAILS = "details";
	public static final String CAROUSEL = "carousel";
	public static final String SOCIAL_SHARE = "socialshare";
	public static final String RIGHT_COLUMN_NAVIGATION = "rightcolumnnavigation";
	public static final String RIGHT_NAVIGATION = "rightnavigation";
	public static final String GRID_DETAILS = "grid_details";
	public static final String ARTICLE_PAGE_PATH = "articlepagepath";
	public static final String RECIPE_PAGE_PATH = "recipepagepath";
	public static final String DATA_NODE_PATH = "dataNodePath";
	public static final String REDIRECT_PAGE_PATH = "redirectPagePath";
	public static final String UNSTRUCTURED_NODE = "nt:unstructured";
	public static final String CQ_PAGE_CONTENT = "cq:PageContent";
	public static final String CQ_PAGE = "cq:Page";
	public static final String JCR_TITLE = "jcr:title";
	public static final String SLING_RESOURCE_TYPE = "sling:resourceType";
	public static final String CQ_TEMPLATE = "cq:template";
	public static final String SLING_VANITY_PATH = "sling:VanityPath";
	public static final String MIX_CREATED = "mix:created";
	public static final String SLING_RESOURCE = "sling:Resource";
	public static final String CQ_TAGGABLE = "cq:Taggable";
	public static final String JCR_DATA = "jcr:data";
	public static final String NODETYPE_RESOURCE = "nt:resource";
	public static final String JCR_MIME_TYPE = "jcr:mimeType";
	public static final String CONTENT_JSON_TYPE = "application/json";

	public static final String COLON = ":";
	public static final String CQ_ACTION = "CQ-Action";
	public static final String ACTIVATE = "Activate";
	public static final String CQ_HANDLE = "CQ-Handle";
	public static final String CONTENT_LENTGTH = "Content-length";
	public static final String RENDITIONS = "renditions";
	public static final String DAM = "dam";

	public static final String QUESTION_MARK = "?";
	public static final String EQUAL_SYMBOL = "=";
	public static final String AMPERCENT = "&";
	public static final String COMMA = ",";
	public static final String LEFT_PARSYS = "left-parsys";
	public static final String PARAGRAPH_COMP = "paragraphcomponent";

	public static final String ARTICLE_COMPONENT_RESOURCE__PATH = "hdscorp/components/content/articles/articledetail";
	public static final String RECIPE_COMPONENT_RESOURCE__PATH = "hdscorp/components/content/recipes/recipedetails";
	public static final String ITEM_COMPONENT_RESOURCE__PATH = "hdscorp/components/content/itemdetails";

	public static Object GRID_VIEW_COMPONENT_RESOURCE_TYPE;
	public static final String GLOBAL_CONFIG_NODE_PATH = "/content/hdscorp/en_us/lookups/config/globalconfig/jcr:content/overlay/globalconfig";

	public static final String FEEDBACK_SERVLET_PATH = "/pbdyn/contactus/postcustomerfeedback.json";
	public static final String LOCATIONS = "locations";
	public static final String LOCATIONS_PATH = "/jcr:content/storeinfo";
	public static final String CUSTOM_LOCATIONS_PATH = "/customstoreinfo/storeinfo.json/jcr:content";
	
	public static final String EMPTY_SPACE = " ";

	public static final String BREAK = "<br/>";

	public static final String COLLECTION_LANDING_TEMPLATE_PATH = "/apps/hdscorp/templates/collectionlanding";
	public static final String CATEGORY_LANDING_TEMPLATE_PATH = "/apps/hdscorp/templates/categorylandingpage";
	public static final String SOUP_LANDING_TEMPLATE_PATH = "/apps/hdscorp/templates/souplandingpage";
	public static final String JCR_CONTENT_DATA = "jcr:content/jcr:data";
	public static final String DETAILS_SLING_RESOURCE_PATH = "jcr:content/details/sling:resourceType";

	public static final String FUNDRAISING_CUSTOMER_TEMPLATE_PATH = "/etc/designs/hdscorp/email/FundraisingCustomerEmail.txt";
	public static final String FUNDRAISING_CAFE_CONTACT_EMAIL_TEMPLATE_PATH = "/etc/designs/hdscorp/email/FundraisingCafeContactEmail.txt";
	public static final String BAKERS_IN_CAFE_CONTACT_TEMPLATE_PATH = "/etc/designs/hdscorp/email/BakersInCafeContactEmail.txt";
	public static final String BIT_CONCEPT_1_TEMPLATE_PATH = "/etc/designs/hdscorp/email/BIT_Email_Concept1.txt";
	public static final String BIT_CONCEPT_2_TEMPLATE_PATH = "/etc/designs/hdscorp/email/BIT_Email_Concept2.txt";
	public static final String BIT_CONCEPT_4_TEMPLATE_PATH = "/etc/designs/hdscorp/email/BIT_Email_Concept4.txt";
	public static final String BIT_CUSTOMER_EMAIL_TEMPLATE_PATH = "/etc/designs/hdscorp/email/BITCustomerEmail.txt";
	public static final String MEDIA_INQUIRIES_EMAIL_TEMPLATE_PATH = "/etc/designs/hdscorp/email/MediaInquiriesEmail.txt";
	public static final String FRANCHISE_INFO_REQUEST_TEMPLATE_PATH = "/etc/designs/hdscorp/email/FranchiseRequestEmail.txt";
	public static final String FRANCHISE_INTERNATIONAL_INFO_REQUEST_TEMPLATE_PATH = "/etc/designs/hdscorp/email/FranchiseInternationalRequestEmail.txt";
	
	public static final String CMS_CITY_NODE = "cmscities";
	public static final String CITY_INFO_NODE = "cities";
	public static final String CITY_CMS_PATH = "/content/hdscorp/en_us/structureddata";
	public static final String CLIENT = "client";
	public static final String SIGNATURE = "signature";
	public static final String GLOBAL_HEADER_CONFIG = "/etc/designs/hdscorp/jcr:content/global/globalheader";

	private GlobalConstants() {
	}
}
