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
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.constants.PageConstants;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.LocationNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ViewHelperUtil;

/**
 * Useful for fetch all the Location details based on directory.
 * 
 * @author ramana
 *
 */
@Model(adaptables = Resource.class)
public class LocationDataModel {
	private static final Logger log = LoggerFactory.getLogger(LocationDataModel.class);

	@Inject
	private ResourceResolver resourceResolver;

	private List<LocationNode> locationNodes;
	
	/**
	 * reading locations data from jcr and setting locations data to LocationNode 
	 * 
	 * @return {@link List<LocationNode>}
	 */
	public List<LocationNode> getLocationNodes() {

		log.info("Execution of getLocationNodes method");

		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		log.info("Execution of getLocationDetails");
		String paths[] = { "/content/hdscorp/en_us/lookup/locations" };
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, null, null, null, null, true, null,
				null, resourceResolver, null, null);
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

					locationNode.setLocationRegion((String[]) properties.get(ServiceConstants.LOCATION_JCR_REGION, String[].class));
					locationNode.setLocationCountry((String[]) properties.get(ServiceConstants.LOCATION_JCR_COUNTRY, String[].class));
					locationNode.setLocation((String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONS, String[].class));
					locationNode.setLocationImage(properties.get(ServiceConstants.LOCATION_JCR_LOCATIONIMAGE, (String) null));
					locationNode.setImageAltText(properties.get(ServiceConstants.LOCATION_JCR_LOCATIONIMAGEALTTEXT, (String) null));
					locationNode.setLocationDetail(properties.get(ServiceConstants.LOCATION_JCR_LOCATIONDETAIL, (String) null));
					locationNode.setLocationLongitude(properties.get(ServiceConstants.LOCATION_JCR_LOCATIONLONGITUDE, (String) null));
					locationNode.setLocationLatitude(properties.get(ServiceConstants.LOCATION_JCR_LOCATIONLATITUDE, (String) null));
					locationNode
							.setLocationPhoneNumber((String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONPHONENUMBER, String[].class));

				}
			} catch (Exception e) {

				log.error("Error occured during getting value from the pages" + e);
			}

			locationNodes.add(locationNode);
		}
		return locationNodes;

	}
}
