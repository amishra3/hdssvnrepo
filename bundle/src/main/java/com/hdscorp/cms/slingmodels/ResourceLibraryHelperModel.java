package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.constants.GlobalConstants;
import com.hdscorp.cms.dao.ResourceNode;
import com.hdscorp.cms.util.HdsCorpCommonUtils;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ServiceUtil;

public class ResourceLibraryHelperModel {
	
	private static final Logger LOG = LoggerFactory.getLogger(ResourceLibraryHelperModel.class);
	
	public static ResourceNode getResourceNode(Resource resource,
			String[] contenttype, String[] industryTag, TagManager tagManager,SlingHttpServletRequest request) throws ValueFormatException, PathNotFoundException, RepositoryException {

		Resource metadataResource = resource.getChild("jcr:content/metadata");
		Node metadataNode = metadataResource.adaptTo(Node.class) ; 
		
		if (metadataResource != null) {

			ResourceNode resourceNode = new ResourceNode();
			ValueMap properties = ResourceUtil.getValueMap(metadataResource);

			if (properties.containsKey("dc:title")) {
				resourceNode.setResourceTitle(properties.get("dc:title").toString());
			} else if (properties.containsKey("dc:hdstitle")) {
				resourceNode.setResourceTitle(properties.get("dc:hdstitle").toString());
			}
			if (properties.containsKey("dc:description")) {
				resourceNode.setResourceDescription(properties.get("dc:description").toString());
			}
			
			if (properties.containsKey("contentpath")) {
				resourceNode.setExternalContentTargetURL(properties.get("contentpath").toString());
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
						if (contenttype.length > 0 && item.contains(contenttype[0])) {
							
							resourceNode.setContentType(tag.getTitle());
							resourceNode.setContentTypeTag(tag.getTagID());
							hasContentType = true;
						}
						if (industryTag.length > 0 && item.contains(industryTag[0])) {
							industryTadIds.add(tag.getTagID());
						}
					}
					if(!hasContentType && resourceNode.getExternalContentTargetURL()== null){
						resourceNode.setContentType("Video");
					}
					if(industryTadIds.size()>0){
						resourceNode.setIndustryTags(industryTadIds.toArray(new String[0]));
					} else {
						resourceNode.setIndustryTags(new String[] {""});
					}
				}
			}
			
			try {
				if (properties.containsKey("resourceType")) {
					resourceNode.setResourceType(properties.get("resourceType").toString());
					if(resourceNode.getResourceType().equalsIgnoreCase("video")) {
						resourceNode.setContentType(GlobalConstants.RESOURCE_TYPE_VIDEO);
						resourceNode.setVideoGuid(properties.get("guid").toString());
						resourceNode.setVideoTitleId(properties.get("titleId").toString());	
						if(properties.containsKey("pubDate")){
							Date pubDate = ServiceUtil.getDateFromString(properties.get("pubDate").toString(),"EEE, d MMM yyyy HH:mm:ss Z");
							Calendar pubDateCalObj =  Calendar.getInstance();
							pubDateCalObj.setTime(pubDate);
							long videoPubDateInMilliSec = pubDateCalObj.getTimeInMillis();
							resourceNode.setComparisonDateInMilliSec(videoPubDateInMilliSec);
							resourceNode.setComparisonDate(pubDate);
						}
					}
				}else {
					if(resourceNode.getExternalContentTargetURL()!= null){
						resourceNode.setResourceType(GlobalConstants.RESOURCE_TYPE_EXTERNAL_CONTENT);
						if(metadataNode!=null && metadataNode.hasProperty("jcr:lastModified"))
						{
							Calendar lastModDate = metadataNode.getProperty("jcr:lastModified").getValue().getDate();
							long lastModInMilliSec = lastModDate.getTimeInMillis();
							resourceNode.setComparisonDateInMilliSec(lastModInMilliSec);
							resourceNode.setComparisonDate(lastModDate.getTime());
						}					
					}else{
						resourceNode.setResourceType(GlobalConstants.RESOURCE_TYPE_PDF);
						if(metadataNode!=null && metadataNode.hasProperty("dc:modified")){
							Calendar pdfModifiedDate = metadataNode.getProperty("dc:modified").getValue().getDate();
							long pdfModifiedDateInMilliSec = pdfModifiedDate.getTimeInMillis();
							resourceNode.setComparisonDateInMilliSec(pdfModifiedDateInMilliSec);
							resourceNode.setComparisonDate(pdfModifiedDate.getTime());
						}
					}
				}
			} catch (Exception e) {
				LOG.error("Exception in ResourceLibraryHelperModel ---- "+e.getMessage());
			}
			
			return resourceNode;
		}
		return null;
	}
}
