package com.hdscorp.cms.slingmodels;

import java.text.ParseException;
import java.util.Calendar;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.NewsInsightExplorerModel;
import com.hdscorp.cms.util.HdsCorpCommonUtils;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ServiceUtil;


/**
 * Sling model for NewsInsightVerticalExplorer Component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class NewsInsightVerticalExplorerModel {
	private static final Logger log = LoggerFactory.getLogger(NewsInsightVerticalExplorerModel.class);

	private final String FROM_DATE = "yyyy-MM-dd'T'HH:mm:ss.SSSX";
	private final String TO_DATE = "MMMM yyyy";
	@Inject
	@Named("nibtbgimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String backgroundImagePath;

	@Inject
	@Named("nibticonimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String iconImagePath;

	@Inject
	@Named("nibticonimagelabel")
	@Default(values = { "Press Release" })
	private String iconImageLabel;

	@Inject
	@Named("nibtlabeltargeturl")
	@Default(values = { "Target URL" })
	private String targetURL;

	@Inject
	@Named("nibteventtype")
	@Default(values = { "Event Type" })
	private String eventTypetop;

	private NewsInsightExplorerModel newsInsightExplorerTop;

	@Inject
	@Named("nibticonbimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String iconBottomImagePath;

	@Inject
	@Named("nibticonbimagelabel")
	@Default(values = { "Press Release" })
	private String iconImageBottomLabel;

	@Inject
	@Named("nibtlabelbtargeturl")
	@Default(values = { "Target URL" })
	private String targetBottomURL;

	@Inject
	@Named("nibticonreadmorelabel")
	@Default(values = { "Read More" })
	private String readMoreBottomLabel;

	@Inject
	@Named("nibttopeninnewwindow")
	@Default(values = { "false" })
	private String openinnewwindow;
	
	@Inject
	@Named("nibtbottompeninnewwindow")
	@Default(values = { "false" })
	private String bottomopeninnewwindow;

	@Inject
	@Named("nibtbeventtype")
	@Default(values = { "Event Type" })
	private String eventTypeBottom;

	private NewsInsightExplorerModel newsInsightExplorerBottom;

	public String getBackgroundImagePath() {
		return backgroundImagePath;
	}

	public String getIconImagePath() {
		return iconImagePath;
	}

	public String getIconImageLabel() {
		return iconImageLabel;
	}

	public String getTargetURL() {
		return targetURL;
	}

	public String getIconBottomImagePath() {
		return iconBottomImagePath;
	}

	public String getIconImageBottomLabel() {
		return iconImageBottomLabel;
	}

	public String getTargetBottomURL() {
		return targetBottomURL;
	}

	public String getReadMoreBottomLabel() {
		return readMoreBottomLabel;
	}

	public String getEventTypetop() {
		return eventTypetop;
	}

	public String getOpeninnewwindow() {
		return openinnewwindow;
	}

	public String getEventTypeBottom() {
		return eventTypeBottom;
	}

	public String getBottomopeninnewwindow() {
		return bottomopeninnewwindow;
	}
	
	public NewsInsightExplorerModel getNewsInsightExplorerTop() {

		Resource resource = null;
		if (getEventTypetop().equalsIgnoreCase("Press Release")) {
			newsInsightExplorerTop = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetURL() + "/jcr:content/pressrelease");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				ValueMap properties = resource.adaptTo(ValueMap.class);

				newsInsightExplorerTop.setTitle(properties.get("pressreleasetitle", (String) null).toString());

				Calendar cal = (Calendar) properties.get("pressreleasedate");
				try {
					newsInsightExplorerTop.setPubDate(ServiceUtil.getStringFromDate(cal.getTime(),
							ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}

		} else if (getEventTypetop().equalsIgnoreCase("Event")) {

			newsInsightExplorerTop = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetURL() + "/jcr:content/event");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				ValueMap properties = resource.adaptTo(ValueMap.class);
				newsInsightExplorerTop.setTitle(properties.get("jcr:eventtitle", (String) null).toString());
				newsInsightExplorerTop.setId(properties.get(ServiceConstants.EVENT_JCR_EVENT_ID, (String) null).toString());
				try {
					newsInsightExplorerTop.setPubDate(ServiceUtil.getDisplayDateFormat(
							properties.get("jcr:eventenddate", (String) null).toString(),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
										
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}
		}

		else if (getEventTypetop().equalsIgnoreCase("News")) {

			newsInsightExplorerTop = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetURL() + "/jcr:content/newsdetail");
			
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				ValueMap properties = resource.adaptTo(ValueMap.class);
				newsInsightExplorerTop.setTitle(properties.get("newstitle", (String) null).toString());
				Calendar cal = (Calendar) properties.get("newsdate");
				try {
					newsInsightExplorerTop.setPubDate(ServiceUtil.getStringFromDate(cal.getTime(),
							ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}
		}

		else if (getEventTypetop().equalsIgnoreCase("Resource")) {

			newsInsightExplorerTop = new NewsInsightExplorerModel();

			String pdfPath = HdsCorpCommonUtils.pdfJCRPath(getTargetURL());

			resource = JcrUtilService.getResourceResolver().resolve(pdfPath);

			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				Asset asset = resource.adaptTo(Asset.class);
				if (asset != null) {
					newsInsightExplorerTop.setTitle(asset.getMetadataValue("dc:title") != null
							? asset.getMetadataValue("dc:title").toString() : "");
					try {
						if (asset.getMetadataValue("dc:creationdate") != null
								&& !asset.getMetadataValue("dc:creationdate").trim().isEmpty()) {

							newsInsightExplorerTop.setPubDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("dc:creationdate").toString(), FROM_DATE, TO_DATE));
						} else {

							newsInsightExplorerTop.setPubDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("xmp:CreateDate").toString(), FROM_DATE, TO_DATE));
							log.info("padf created date " + asset.getMetadataValue("xmp:CreateDate").toString());
						}
					} catch (Exception e) {
						log.info("Exception occurs duing getting value from Node: " + e);
					}
				}

			}

		}
		return newsInsightExplorerTop;
	}

	public NewsInsightExplorerModel getNewsInsightExplorerBottom() {

		Resource resource = null;
		if (getEventTypeBottom().equalsIgnoreCase("Press Release")) {
			resource = JcrUtilService.getResourceResolver().resolve(getTargetBottomURL() + "/jcr:content/pressrelease");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				newsInsightExplorerBottom = new NewsInsightExplorerModel();
				ValueMap properties = resource.adaptTo(ValueMap.class);

				newsInsightExplorerBottom.setTitle(properties.get("pressreleasetitle", (String) null).toString());

				Calendar cal = (Calendar) properties.get("pressreleasedate");
				try {
					newsInsightExplorerBottom.setPubDate(ServiceUtil.getStringFromDate(cal.getTime(),
							ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}

		} else if (getEventTypeBottom().equalsIgnoreCase("Event")) {
			newsInsightExplorerBottom = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetBottomURL() + "/jcr:content/event");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				ValueMap properties = resource.adaptTo(ValueMap.class);

				newsInsightExplorerBottom.setTitle(properties.get("jcr:eventtitle", (String) null).toString());
				newsInsightExplorerBottom.setId(properties.get(ServiceConstants.EVENT_JCR_EVENT_ID, (String) null).toString());

				try {
					newsInsightExplorerBottom.setPubDate(ServiceUtil.getDisplayDateFormat(
							properties.get("jcr:eventenddate", (String) null).toString(),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}
		}

		else if (getEventTypeBottom().equalsIgnoreCase("News")) {

			newsInsightExplorerBottom = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetBottomURL() + "/jcr:content/newsdetail");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				ValueMap properties = resource.adaptTo(ValueMap.class);
				
				newsInsightExplorerBottom.setTitle(properties.get("newstitle", (String) null).toString());
				Calendar cal = (Calendar) properties.get("newsdate");
				try {
					newsInsightExplorerBottom.setPubDate(ServiceUtil.getStringFromDate(cal.getTime(),
							ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}
		}

		else if (getEventTypeBottom().equalsIgnoreCase("Resource")) {

			newsInsightExplorerBottom = new NewsInsightExplorerModel();

			String pdfPath = HdsCorpCommonUtils.pdfJCRPath(getTargetBottomURL());

			resource = JcrUtilService.getResourceResolver().resolve(pdfPath);

			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				Asset asset = resource.adaptTo(Asset.class);

				if (asset != null) {
					newsInsightExplorerBottom.setTitle(asset.getMetadataValue("dc:title") != null
							? asset.getMetadataValue("dc:title").toString() : "");
					try {
						if (asset.getMetadataValue("dc:creationdate") != null
								&& !asset.getMetadataValue("dc:creationdate").trim().isEmpty()) {

							newsInsightExplorerBottom.setPubDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("dc:creationdate").toString(), FROM_DATE, TO_DATE));

						} else {

							newsInsightExplorerBottom.setPubDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("xmp:CreateDate").toString(), FROM_DATE, TO_DATE));
							log.info("padf created date " + asset.getMetadataValue("xmp:CreateDate").toString());
						}
					} catch (Exception e) {
						log.info("Exception occurs duing getting value from Node: " + e);
					}
				}
			}

		}

		return newsInsightExplorerBottom;
	}
}
