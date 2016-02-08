package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
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

	private HashMap<String, List<EventNode>> eventFinalNodesData;

	public List<EventNode> getEventNodes() {

		log.info("Execution of getEventDetails method");

		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		log.info("Execution of getEventDetails");
		String paths[] = { "/content/hdscorp/en_us/events" };
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, null, null, null, null, true, null,
				null, resourceResolver, null, null);
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
					eventNode.setEventType(
							(String[]) properties.get(ServiceConstants.EVENT_JCR_EVENTTYPE, String[].class));
					String eventType[] = (String[]) properties.get(ServiceConstants.EVENT_JCR_EVENTTYPE,
							String[].class);
					StringBuffer tagId = new StringBuffer();
					StringBuffer tagName = new StringBuffer();
					for (int index = 0; index < eventType.length; index++) {
						Tag tag = tm.resolve((String) eventType[index]);

						if (index == 0) {
							tagId.append(tag.getTagID());
							tagName.append(tag.getName());
						} else {
							tagId.append(ServiceConstants.COMMA_SEPRATOR + tag.getTagID());
							tagName.append(ServiceConstants.COMMA_SEPRATOR + tag.getName());
						}
					}

					eventNode.setEventTyptagName(tagName.toString());
					eventNode.setEventTyptagId(tagId.toString());
					eventNode.setEventTitle(properties.get(ServiceConstants.EVENT_JCR_EVENTTITLE, (String) null));
					String startDate = ServiceUtil.getDisplayDateFormat(
							properties.get(ServiceConstants.EVENT_JCR_START_DATE, (String) null),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_EVENT);
					eventNode
							.setEventMonth(
									ServiceUtil
											.getMonth(Integer.parseInt(startDate.substring(0,
													startDate.indexOf(ServiceConstants.SLASH_SEPRATOR))) - 1)
							.toUpperCase() + ServiceConstants.EMPTY_SPACE
							+ startDate.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1));
					eventNode.setYear(Integer
							.parseInt(startDate.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1)));
					eventNode.setEventStartDate(ServiceUtil.getDisplayDateFormat(
							properties.get(ServiceConstants.EVENT_JCR_START_DATE, (String) null),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_EVENT));
					eventNode.setEventEndDate(ServiceUtil.getDisplayDateFormat(
							properties.get(ServiceConstants.EVENT_JCR_END_DATE, (String) null),
							ServiceConstants.DATE_FORMAT_FROM_EVENT, ServiceConstants.DATE_FORMAT_TO_EVENT));
					eventNode.setEventLocation(properties.get(ServiceConstants.EVENT_JCR_LOCATION, (String) null));
					eventNode
							.setEventDescription(properties.get(ServiceConstants.EVENT_JCR_DESCRIPTION, (String) null));
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
						if (index == 0) {
							eventRegiontagId.append(tag.getTagID());
							eventRegiontaName.append(tag.getName());
						} else {
							eventRegiontagId.append(ServiceConstants.COMMA_SEPRATOR + tag.getTagID());
							eventRegiontaName.append(ServiceConstants.COMMA_SEPRATOR + tag.getName());
						}
					}
					eventNode.setEventRegiontagId(eventRegiontagId.toString());
					eventNode.setEventRegiontagName(eventRegiontaName.toString());

				}

			} catch (Exception e) {

				log.error("Error occured during getting value from the pages" + e);
			}

			eventNodes.add(eventNode);
		}
		return eventNodes;
	}

	public HashMap<String, List<EventNode>> getEventFinalNodesData() {
		EventNode EventObject = new EventNode();
		List<EventNode> listOfNodes = getEventNodes();
		Collections.sort(listOfNodes, EventObject.new CompareByMonth());
		Collections.sort(listOfNodes, EventObject.new CompareByYear());
		eventFinalNodesData = new HashMap<String, List<EventNode>>();
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