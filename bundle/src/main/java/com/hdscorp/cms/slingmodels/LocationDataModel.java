package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
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
import com.hdscorp.cms.dao.LocationNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = Resource.class)
public class LocationDataModel {
	private static final Logger log = LoggerFactory.getLogger(LocationDataModel.class);

	@Inject
	private ResourceResolver resourceResolver;

	private List<LocationNode> locationNodes;

	public List<LocationNode> getLocationNodes() {

		log.info("Execution of getLocationNodes method");

		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		log.info("Execution of getLocationDetails");
		String paths[] = { "/content/hdscorp/en_us/lookup/locations/locations" };
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, null, null, null, null, true, null,
				null, resourceResolver, null, null);
		TagManager tm = resourceResolver.adaptTo(TagManager.class);

		List<Hit> hits = result.getHits();
		locationNodes = new ArrayList<LocationNode>();

		for (Hit hit : hits) {

			LocationNode locationNode = new LocationNode();
			Page reourcePage;
			try {
				reourcePage = hit.getResource().adaptTo(Page.class);
				String pagePath = reourcePage.getPath();

				log.info("Location path is::" + pagePath);
				Resource res = resourceResolver.getResource(pagePath + PageConstants.PROPERTY_JCRLOCATION_PATH);

				if (res != null) {
					ValueMap properties = res.adaptTo(ValueMap.class);
					locationNode.setLocationRegion((String[]) properties.get("jcr:locregion", String[].class));
					String locationRegion[] = (String[]) properties.get("jcr:locregion", String[].class);
					StringBuffer tagId = new StringBuffer();
					StringBuffer tagName = new StringBuffer();
					for (int index = 0; index < locationRegion.length; index++) {
						Tag tag = tm.resolve((String) locationRegion[index]);

						if (index == 0) {
							tagId.append(tag.getTagID());
							tagName.append(tag.getName());
						} else {
							tagId.append(ServiceConstants.COMMA_SEPRATOR + tag.getTagID());
							tagName.append(ServiceConstants.COMMA_SEPRATOR + tag.getName());
						}
					}

					locationNode.setLocationRegionTagName(tagName.toString());
					locationNode.setLocationRegionTagID(tagId.toString());
					locationNode.setLocationImage(properties.get("jcr:locationimage", (String) null));
					locationNode.setImageAltText(properties.get("jcr:locimagealttext", (String) null));
					locationNode.setLocationDetail(properties.get("jcr:locationdetail", (String) null));
					locationNode.setLocationLongitude(properties.get("jcr:locationlatitude", (String) null));
					locationNode.setLocationLatitude(properties.get("jcr:locationlongitude", (String) null));
					locationNode.setLocationPhoneNumber((String[])properties.get("jcr:locphonenumber", String[].class));

				}
			} catch (Exception e) {

				log.error("Error occured during getting value from the pages" + e);
			}

			locationNodes.add(locationNode);
		}
		return locationNodes;

	}
}
