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
import com.hdscorp.cms.dao.EventNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ViewHelperUtil;

/** Useful for fetch all the event details based on directory.
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
					eventNode.setEventType(properties.get("eventtype").toString());
					eventNode.setEventTitle(properties.get("eventtitle", (String) null));
					eventNode.setEventStartDate(properties.get("eventstartdate", (String) null));
					eventNode.setEventEndDate(properties.get("eventenddate", (String) null));
					eventNode.setEventLocation(properties.get("eventlocation", (String) null));
					eventNode.setEventDescription(properties.get("eventdescription", (String) null));
					eventNode.setEventImageBackground(properties.get("evbackgroundimage", (String) null));
					eventNode.setEventRegisterNowLabel(properties.get("registernowlabel", (String) null));
					eventNode.setEventRegisterNowLink(properties.get("registernowlink", (String) null));
					eventNode.setEventRegion(properties.get("eventregiontag").toString());
				}

			} catch (RepositoryException e) {

				log.error("Error occured during getting value from the pages" + e);
			}

			eventNodes.add(eventNode);
		}
		return eventNodes;
	}

}
