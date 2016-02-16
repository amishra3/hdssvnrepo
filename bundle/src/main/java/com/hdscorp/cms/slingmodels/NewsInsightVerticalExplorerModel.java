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

import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.NewsInsightExplorerModel;
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
	private String eventType;

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

	public String getEventType() {
		return eventType;
	}

	public String getOpeninnewwindow() {
		return openinnewwindow;
	}

	public String getEventTypeBottom() {
		return eventTypeBottom;
	}

	public NewsInsightExplorerModel getNewsInsightExplorerTop() {

		Resource resource = null;
		if (getEventType().equalsIgnoreCase("Press Release")) {
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

		} else if (getEventType().equalsIgnoreCase("Event")) {

			newsInsightExplorerTop = new NewsInsightExplorerModel();
			resource = JcrUtilService.getResourceResolver().resolve(getTargetURL() + "/jcr:content/event");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				ValueMap properties = resource.adaptTo(ValueMap.class);
				newsInsightExplorerTop.setTitle(properties.get("jcr:eventtitle", (String) null).toString());
				try {
					newsInsightExplorerTop.setPubDate(ServiceUtil.getDisplayDateFormat(
							properties.get("jcr:eventenddate", (String) null).toString(),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
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

				try {
					newsInsightExplorerBottom.setPubDate(ServiceUtil.getDisplayDateFormat(
							properties.get("jcr:eventenddate", (String) null).toString(),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_FULL_MONTH_YEAR));
				} catch (ParseException e) {
					log.info("Exception occurs duing getting value from Node: " + e);
				}

			}
		}
		return newsInsightExplorerBottom;
	}

}
