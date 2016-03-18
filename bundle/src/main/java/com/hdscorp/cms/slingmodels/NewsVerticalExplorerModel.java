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
 * Sling model for NewsVerticalExplorer Component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class NewsVerticalExplorerModel {
	private static final Logger log = LoggerFactory.getLogger(NewsVerticalExplorerModel.class);
	
	private final String FROM_DATE = "yyyy-MM-dd'T'HH:mm:ss.SSSX";
	private final String TO_DATE = "MMMM yyyy";

	@Inject
	@Named("nveiconbimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String iconImagePath;

	@Inject
	@Named("nveiconbimagelabel")
	@Default(values = { "Press Release" })
	private String iconImageLabel;

	@Inject
	@Named("nvelabelbtargeturl")
	@Default(values = { "Item URL" })
	private String targetURL;

	@Inject
	@Named("nveiconreadmorelabel")
	@Default(values = { "Read More" })
	private String readMoreLabel;

	@Inject
	@Named("nveopeninnewwindow")
	@Default(values = { "false" })
	private String openinnewwindow;

	@Inject
	@Named("nveeventtype")
	@Default(values = { "Event Type" })
	private String eventType;

	private NewsInsightExplorerModel newsInsightExplorer;

	public String getOpeninnewwindow() {
		return openinnewwindow;
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

	public String getReadMoreLabel() {
		return readMoreLabel;
	}

	public String getEventType() {
		return eventType;
	}

	public NewsInsightExplorerModel getNewsInsightExplorer() {

		Resource resource = null;
		if (getEventType().equalsIgnoreCase("Press Release")) {
			resource = JcrUtilService.getResourceResolver().resolve(getTargetURL() + "/jcr:content/pressrelease");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				newsInsightExplorer = new NewsInsightExplorerModel();
				ValueMap properties = resource.adaptTo(ValueMap.class);

				newsInsightExplorer.setTitle(properties.get("pressreleasetitle", (String) null).toString());

				Calendar cal = (Calendar) properties.get("pressreleasedate");
				try {
					newsInsightExplorer.setPubDate(ServiceUtil.getStringFromDate(cal.getTime(),
							ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}

		} else if (getEventType().equalsIgnoreCase("Event")) {
			newsInsightExplorer = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetURL() + "/jcr:content/event");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				ValueMap properties = resource.adaptTo(ValueMap.class);

				newsInsightExplorer.setTitle(properties.get("jcr:eventtitle", (String) null).toString());

				try {
					newsInsightExplorer.setPubDate(ServiceUtil.getDisplayDateFormat(
							properties.get("jcr:eventenddate", (String) null).toString(),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}
		}
		
		else if (getEventType().equalsIgnoreCase("News")) {

			newsInsightExplorer = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetURL() + "/jcr:content/newsdetail");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				ValueMap properties = resource.adaptTo(ValueMap.class);
				newsInsightExplorer.setTitle(properties.get("newstitle", (String) null).toString());
				Calendar cal = (Calendar) properties.get("newsdate");
				try {
					newsInsightExplorer.setPubDate(ServiceUtil.getStringFromDate(cal.getTime(),
							ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}
		}

		else if (getEventType().equalsIgnoreCase("Resource")) {

			newsInsightExplorer = new NewsInsightExplorerModel();

			String pdfPath = HdsCorpCommonUtils.pdfJCRPath(getTargetURL());

			resource = JcrUtilService.getResourceResolver().resolve(pdfPath);

			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				Asset asset = resource.adaptTo(Asset.class);

				if (asset != null) {
					newsInsightExplorer.setTitle(asset.getMetadataValue("dc:title") != null
							? asset.getMetadataValue("dc:title").toString() : "");
					try {
						if (asset.getMetadataValue("dc:creationdate") != null
								&& !asset.getMetadataValue("dc:creationdate").trim().isEmpty()) {

							newsInsightExplorer.setPubDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("dc:creationdate").toString(), FROM_DATE, TO_DATE));

						} else {

							newsInsightExplorer.setPubDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("xmp:CreateDate").toString(), FROM_DATE, TO_DATE));
							log.info("padf created date " + asset.getMetadataValue("xmp:CreateDate").toString());
						}
					} catch (Exception e) {
						log.info("Exception occurs duing getting value from Node: " + e);
					}
				}
			}

		}

		return newsInsightExplorer;
	}

}
