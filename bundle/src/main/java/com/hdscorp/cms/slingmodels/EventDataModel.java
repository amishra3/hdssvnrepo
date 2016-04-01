package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.constants.PageConstants;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.EventNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ServiceUtil;
import com.hdscorp.cms.util.ViewHelperUtil;

/**
 * Useful for fetch all the event details based on directory.
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class EventDataModel {
	private static final Logger log = LoggerFactory.getLogger(EventDataModel.class);

	@Inject
	private ResourceResolver resourceResolver;

	private List<EventNode> eventNodes;

	@Inject
	@Named("eseventlookuppath")
	@Default(values = { "/content/hdscorp/en_us/lookup/events" })
	private String eventLookupPath;

	@Inject
	@Named("esnoeventfoundmessage")
	@Default(values = { "No Event is found" })
	private String noeventfoundMsg;

	@Inject
	@Named("esdetailslabel")
	@Default(values = { "Detail" })
	private String detailsLabel;

	private HashMap<String, List<EventNode>> eventFinalNodesData;

	public String getEventLookupPath() {
		return eventLookupPath;
	}

	public String getNoeventfoundMsg() {
		return noeventfoundMsg;
	}

	public String getDetailsLabel() {
		return detailsLabel;
	}

	public List<EventNode> getEventNodes() {

		log.info("Execution of getEventDetails method");

		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		log.info("Execution of getEventDetails");
		String paths[] = { getEventLookupPath() };
		String type[] = { "cq:Page" };

		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, null, null, type, null, false, null,
				null, resourceResolver, null, null);
		if (result.getHits().size() > 0) {
			TagManager tm = resourceResolver.adaptTo(TagManager.class);
			List<Hit> hits = result.getHits();
			eventNodes = new ArrayList<EventNode>();

			for (Hit hit : hits) {

				EventNode eventNode = new EventNode();
				Page reourcePage;
				try {
					reourcePage = hit.getResource().adaptTo(Page.class);
					String pagePath = reourcePage.getPath();

					log.info("Events path is::" + pagePath);
					Resource res = resourceResolver.getResource(pagePath + PageConstants.PROPERTY_JCREVENT_PATH);

					if (res != null) {
						ValueMap properties = res.adaptTo(ValueMap.class);

						String streventEndDate = properties.get(ServiceConstants.EVENT_JCR_END_DATE, (String) null);
						Date eventEndDate = ServiceUtil.getDateFromString(streventEndDate,
								ServiceConstants.DATE_FORMAT_FROM_EVENT);
						Date currentDate = new Date();

						if (eventEndDate.after(currentDate) || ServiceUtil.isSameDay(eventEndDate, currentDate)) {
							eventNode.setEventType(
									(String[]) properties.get(ServiceConstants.EVENT_JCR_EVENTTYPE, String[].class));
							String eventType[] = (String[]) properties.get(ServiceConstants.EVENT_JCR_EVENTTYPE,
									String[].class);
							StringBuffer tagId = new StringBuffer();
							StringBuffer tagName = new StringBuffer();
							for (int index = 0; index < eventType.length; index++) {
								Tag tag = tm.resolve((String) eventType[index]);

								if (tag != null) {
									if (index == 0) {
										tagId.append(tag.getTagID());
										tagName.append(tag.getName());
									} else {
										tagId.append(ServiceConstants.COMMA_SEPRATOR + tag.getTagID());
										tagName.append(ServiceConstants.COMMA_SEPRATOR + tag.getName());
									}
								}
							}

							eventNode.setEventTyptagName(tagName.toString());
							eventNode.setEventTyptagId(tagId.toString());
							eventNode.setEventTitle(
									properties.get(ServiceConstants.EVENT_JCR_EVENTTITLE, (String) null));

							eventNode.setThirdpartyicon(
									properties.get(ServiceConstants.EVENT_JCR_THIRD_PARTY_ICON, (String) null));
							eventNode
									.setNewwindow(properties.get(ServiceConstants.EVENT_JCR_NEW_WINDOW, (String) null));
							eventNode.setEventId(properties.get(ServiceConstants.EVENT_JCR_EVENT_ID, (String) null));

							String startDate = ServiceUtil.getDisplayDateFormat(
									properties.get(ServiceConstants.EVENT_JCR_START_DATE, (String) null),
									ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_EVENT);

							eventNode
									.setEventMonth(
											ServiceUtil
													.getMonth(Integer
															.parseInt(startDate.substring(0,
																	startDate.indexOf(ServiceConstants.SLASH_SEPRATOR)))
											- 1).toUpperCase() + ServiceConstants.EMPTY_SPACE
									+ startDate.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1));

							eventNode.setYear(Integer.parseInt(
									startDate.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1)));

							eventNode.setMonthInt((Integer.parseInt(
									startDate.substring(0, startDate.indexOf(ServiceConstants.SLASH_SEPRATOR)))));

							eventNode.setEventStartDate(ServiceUtil.getDisplayDateFormat(
									properties.get(ServiceConstants.EVENT_JCR_START_DATE, (String) null),
									ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_EVENT));
							eventNode.setEventEndDate(ServiceUtil.getDisplayDateFormat(
									properties.get(ServiceConstants.EVENT_JCR_END_DATE, (String) null),
									ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_EVENT));
							eventNode.setEventLocation(
									properties.get(ServiceConstants.EVENT_JCR_LOCATION, (String) null));
							eventNode.setEventDescription(
									properties.get(ServiceConstants.EVENT_JCR_DESCRIPTION, (String) null));
							eventNode.setStatus(properties.get(ServiceConstants.JSON_STATUS, (String) null));
							eventNode.setEventImageBackground(
									properties.get(ServiceConstants.EVENT_JCR_BACKGROUND_IMAGE, (String) null));
							eventNode.setEventRegisterNowLabel(
									properties.get(ServiceConstants.EVENT_JCR_REGISTER_NOW_LABEL, (String) null));
							eventNode.setEventRegisterNowLink(
									properties.get(ServiceConstants.EVENT_JCR_REGISTER_NOW_LINK, (String) null));
							eventNode.setEventRegion(
									(String[]) properties.get(ServiceConstants.EVENT_JCR_REGION_TAG, String[].class));

							String regionType[] = (String[]) properties.get(ServiceConstants.EVENT_JCR_REGION_TAG,
									String[].class);
							StringBuffer eventRegiontagId = new StringBuffer();
							StringBuffer eventRegiontaName = new StringBuffer();
							for (int index = 0; index < regionType.length; index++) {
								Tag tag = tm.resolve((String) regionType[index]);
								if (tag != null) {
									if (index == 0) {
										eventRegiontagId.append(tag.getTagID());
										eventRegiontaName.append(tag.getName());
									} else {
										eventRegiontagId.append(ServiceConstants.COMMA_SEPRATOR + tag.getTagID());
										eventRegiontaName.append(ServiceConstants.COMMA_SEPRATOR + tag.getName());
									}
								}
							}
							eventNode.setEventRegiontagId(eventRegiontagId.toString());
							eventNode.setEventRegiontagName(eventRegiontaName.toString());
							eventNodes.add(eventNode);
						}

					}

				} catch (Exception e) {

					log.error("Error occured during getting value from the pages" + e);
				}

			}
		}
		return eventNodes;
	}

	public HashMap<String, List<EventNode>> getEventFinalNodesData() {
		log.info("Start Execution of getEventFinalNodesData()");
		EventNode EventObject = new EventNode();
		List<EventNode> listOfNodes = getEventNodes();
		List<Map<String, String>> listMapsUpcoming = ServiceUtil.getBrightTalkMapFromJSON(resourceResolver,
				HdsCorpGlobalConfiguration.BRIGHTTALK_DATA_STORAGE_PATH, ServiceConstants.SAVE_FEED_DATA_PROPERTY_NAME,
				ServiceConstants.FEED_UPCOMING);
		if (listMapsUpcoming != null && listMapsUpcoming.size() > 0) {
			for (int index = 0; index < listMapsUpcoming.size(); index++) {
				Map<String, String> hsmap = listMapsUpcoming.get(index);
				EventNode eventNode = new EventNode();
				String startDate = hsmap.get(ServiceConstants.JSON_UPDATED_DATE);

				eventNode
						.setEventMonth(
								ServiceUtil
										.getMonth(Integer.parseInt(startDate.substring(0,
												startDate.indexOf(ServiceConstants.SLASH_SEPRATOR))) - 1)
										.toUpperCase() + ServiceConstants.EMPTY_SPACE
										+ startDate
												.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1));

				eventNode.setYear(Integer
						.parseInt(startDate.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1)));

				eventNode.setMonthInt(
						(Integer.parseInt(startDate.substring(0, startDate.indexOf(ServiceConstants.SLASH_SEPRATOR)))));
				eventNode.setMonthInt(
						(Integer.parseInt(startDate.substring(0, startDate.indexOf(ServiceConstants.SLASH_SEPRATOR)))));

				eventNode.setIsWebcast("true");
				eventNode.setEventTitle(hsmap.get(ServiceConstants.JSON_TITLE));
				eventNode.setEventStartDate(hsmap.get(ServiceConstants.JSON_UPDATED_DATE));
				eventNode.setEventEndDate(hsmap.get(ServiceConstants.JSON_UPDATED_DATE));
				eventNode.setAuthor(hsmap.get(ServiceConstants.JSON_AUTHOR));
				eventNode.setSummary(hsmap.get(ServiceConstants.JSON_SUMMARY));
				eventNode.setFeatured(hsmap.get(ServiceConstants.JSON_FEATURED));
				eventNode.setFormat(hsmap.get(ServiceConstants.JSON_FORMAT));
				eventNode.setDuration(hsmap.get(ServiceConstants.JSON_DURATION));
				eventNode.setStart(hsmap.get(ServiceConstants.JSON_START));
				eventNode.setStart(hsmap.get(ServiceConstants.JSON_STATUS));
				eventNode.setRating(hsmap.get(ServiceConstants.JSON_RATING));
				eventNode.setCategory(hsmap.get(ServiceConstants.JSON_CATEGORY));
				eventNode.setCommunicationId(hsmap.get(ServiceConstants.JSON_COMMUNICATION_ID));
				eventNode.setChannelId(hsmap.get(ServiceConstants.JSON_CHANNEL_ID));
				eventNode.setHerfLink(hsmap.get(ServiceConstants.JSON_HERF_LINK));
				eventNode.setThumbnailPath(hsmap.get(ServiceConstants.JSON_THUMBNAIL_PATH));
				eventNode.setPreviewImagePath(hsmap.get(ServiceConstants.JSON_PREVIEW_IMAGE_PATH));
				listOfNodes.add(eventNode);

			}

		}

		if (listOfNodes != null && listOfNodes.size() > 0) {
			Collections.sort(listOfNodes, EventObject.new CompareByMonth());
			Collections.sort(listOfNodes, EventObject.new CompareByYear());

			eventFinalNodesData = new LinkedHashMap<String, List<EventNode>>();
			for (int index = 0; index < listOfNodes.size(); index++) {
				EventNode eventNode = listOfNodes.get(index);
				if (!eventFinalNodesData.containsKey(eventNode.getEventMonth())) {
					List<EventNode> monthlylist = new ArrayList<EventNode>();
					monthlylist.add(eventNode);
					eventFinalNodesData.put(eventNode.getEventMonth(), monthlylist);
				} else {
					eventFinalNodesData.get(eventNode.getEventMonth()).add(eventNode);
				}
			}
		}

		/*
		 * for (String key : eventFormatedData.keySet()) {
		 * System.out.println("key:::" + key); List<EventNode> value =
		 * eventFormatedData.get(key); if (value != null) { for (EventNode
		 * eventNode : value) { if (eventNode != null) { log.info("month:::" +
		 * eventNode.getEventMonth()); log.info("year:::" +
		 * eventNode.getYear()); } } } }
		 */

		return eventFinalNodesData;
	}

}