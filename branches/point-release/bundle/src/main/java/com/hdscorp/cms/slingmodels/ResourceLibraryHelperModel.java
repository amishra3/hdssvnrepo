package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.dao.ResourceNode;
import com.hdscorp.cms.util.HdsCorpCommonUtils;
import com.hdscorp.cms.util.PathResolver;

public class ResourceLibraryHelperModel {
	public static ResourceNode getResourceNode(Resource resource,
			String[] contenttype, String[] industryTag, TagManager tagManager,SlingHttpServletRequest request) {

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
			resourceNode.setResourcePath(PathResolver.getShortURLPath(resource.getPath()));
			if (properties.containsKey("cq:tags")) {
				String[] assetTags = (String[]) properties.get("cq:tags");
                boolean hasContentType = false;
				
				List<String> industryTadIds = new ArrayList<>();
				resourceNode.setResourceTags(assetTags);
				int i = 0;
				for (String item : assetTags) {
					Tag tag = tagManager.resolve(item);
					if (tag != null) {
						if (contenttype.length > 0
								&& item.contains(contenttype[0])) {
							
							resourceNode.setContentType(tag.getTitle());
							resourceNode.setContentTypeTag(tag.getTagID());
							hasContentType = true;
						}
						if (industryTag.length > 0
								&& item.contains(industryTag[0])) {

							industryTadIds.add(tag.getTagID());
                           
							
						}
					}
					if(!hasContentType){
						resourceNode.setContentType("Video");
					}
					if(industryTadIds.size()>0){
						resourceNode.setIndustryTags(industryTadIds.toArray(new String[0]));
					} else {
						resourceNode.setIndustryTags(new String[] {""});
					}
					
				}

			}
			if (properties.containsKey("resourceType")) {
				resourceNode.setResourceType(properties.get("resourceType")
						.toString());
				if(resourceNode.getResourceType().equalsIgnoreCase("video")) {
					resourceNode.setContentType("Video");
					resourceNode.setVideoGuid(properties.get("guid")
							.toString());
					resourceNode.setVideoTitleId(properties.get("titleId")
							.toString());
				}
			} else {
				resourceNode.setResourceType("pdf");

			}
			
			
			return resourceNode;
		}
		return null;

	}
}
