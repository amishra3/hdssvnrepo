package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
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

	public List<EventNode> getEventNodes() {

		log.info("Execution of getEventDetails method");

		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		log.info("Execution of getEventDetails");
		String paths[] = { "/content/hdscorp/en_us/events" };
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, null, null, null, null, true, null,
				null, resourceResolver, null, null);
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
					eventNode.setEventType((String[]) properties.get(ServiceConstants.EVENT_JCR_EVENTTYPE, String[].class));
					eventNode.setEventTitle(properties.get(ServiceConstants.EVENT_JCR_EVENTTITLE, (String) null));							
					eventNode.setEventStartDate(ServiceUtil.getDisplayDateFormat(properties.get(ServiceConstants.EVENT_JCR_START_DATE, (String) null),ServiceConstants.DATE_FORMAT_FROM_EVENT,ServiceConstants.DATE_FORMAT_TO_EVENT));
					eventNode.setEventEndDate(ServiceUtil.getDisplayDateFormat(properties.get(ServiceConstants.EVENT_JCR_END_DATE, (String) null),ServiceConstants.DATE_FORMAT_FROM_EVENT,ServiceConstants.DATE_FORMAT_TO_EVENT));
					eventNode.setEventLocation(properties.get(ServiceConstants.EVENT_JCR_LOCATION, (String) null));
					eventNode.setEventDescription(properties.get(ServiceConstants.EVENT_JCR_DESCRIPTION, (String) null));
					eventNode.setEventImageBackground(properties.get(ServiceConstants.EVENT_JCR_BACKGROUND_IMAGE, (String) null));
					eventNode.setEventRegisterNowLabel(properties.get(ServiceConstants.EVENT_JCR_REGISTER_NOW_LABEL, (String) null));
					eventNode.setEventRegisterNowLink(properties.get(ServiceConstants.EVENT_JCR_REGISTER_NOW_LINK, (String) null));
					eventNode.setEventRegion((String[]) properties.get(ServiceConstants.EVENT_JCR_REGION_TAG, String[].class));
				}

			} catch (Exception e) {

				log.error("Error occured during getting value from the pages" + e);
			}

			eventNodes.add(eventNode);
		}
		return eventNodes;
	}

}
