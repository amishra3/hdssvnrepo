package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.dao.ResourceNode;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PageUtils;


@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class FeaturedResourcesModel  {

	@Inject
	private SlingHttpServletRequest request;

	

	@Inject
	@Named("featuredresources")
	@Default(values = { "" })
	private String[] featuredresources;

	@Inject
	@Named("contenttype")
	@Default(values = { "" })
	private String[] contenttype;

	private String[] industrytag = {};

	private List<ResourceNode> featuredResouceList;

	public List<ResourceNode> getFeaturedResouceList() throws ValueFormatException, PathNotFoundException, RepositoryException {

		TagManager tagManager = JcrUtilService.getResourceResolver().adaptTo(
				TagManager.class);

		try {
			List<Map<String, String>> list = PageUtils
					.convertMultiWidgetToList(featuredresources);

			featuredResouceList = new ArrayList<ResourceNode>();

			for (Map<String, String> map : list) {

				Resource resource = JcrUtilService.getResourceResolver()
						.resolve(map.get("featureditem"));

				if (!resource
						.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
					ResourceNode resourceNode = ResourceLibraryHelperModel
							.getResourceNode(resource, contenttype,
									industrytag, tagManager,request);
					if (resourceNode != null) {
						resourceNode.setFeaturedBGImage(map
								.get("featureditembgimage"));
						resourceNode.setDeviceFeautedIconImage(map
								.get("devicefeaturediconimage"));
						resourceNode.setFeaturedIconImage(map
								.get("featurediconimage"));

						featuredResouceList.add(resourceNode);
					}

				}
			}

		} catch (JSONException e) {

			e.printStackTrace();
		}

		return featuredResouceList;
	}

}
