package com.hdscorp.cms.slingmodels;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.dao.ResourceNode;

public class ResourceLibraryHelperModel {
	public static ResourceNode getResourceNode(Resource resource,
			String[] contenttype, String[] industryTag, TagManager tagManager) {

		Resource metadataResource = resource.getChild("jcr:content/metadata");
		if (metadataResource != null) {

			ResourceNode resourceNode = new ResourceNode();
			ValueMap properties = ResourceUtil.getValueMap(metadataResource);

			if (properties.containsKey("dc:title")) {
				resourceNode.setResourceTitle(properties.get("dc:title")
						.toString());
			} else if (properties.containsKey("dc:hdstitle")) {
				resourceNode.setResourceTitle(properties.get("dc:hdstitle")
						.toString());
			}
			if (properties.containsKey("dc:description")) {
				resourceNode.setResourceDescription(properties.get(
						"dc:description").toString());
			}
			resourceNode.setResourcePath(resource.getPath());
			if (properties.containsKey("cq:tags")) {
				String[] assetTags = (String[]) properties.get("cq:tags");
				resourceNode.setResourceTags(assetTags);

				for (String item : assetTags) {

					if (item.contains(contenttype[0])) {

						Tag tag = tagManager.resolve(item);
						if (tag != null) {
							resourceNode.setContentType(tag.getTitle());
							resourceNode.setContentTypeTag(tag.getTagID());
						}
					}
					if (industryTag.length > 0 && item.contains(industryTag[0])) {

						Tag tag = tagManager.resolve(item);
						if (tag != null) {

							resourceNode.setIndustryTag(tag.getTagID());
						}
					}
				}

			}
			if (properties.containsKey("resourceType")) {
				resourceNode.setResourceType(properties.get("resourceType")
						.toString());
			} else {
				resourceNode.setResourceType("pdf");

			}
			return resourceNode;
		}
		return null;

	}
}
