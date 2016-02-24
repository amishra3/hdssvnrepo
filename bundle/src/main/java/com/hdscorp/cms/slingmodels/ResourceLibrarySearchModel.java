package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.ProductDescription;
import com.hdscorp.cms.dao.ProductNode;
import com.hdscorp.cms.dao.ResourceNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class ResourceLibrarySearchModel {

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	private ResourceResolver resourceResolver;	
	
	private List<ResourceNode> resouceList;
	
	private boolean noTags;
	
	public boolean isNoTags() {
		String[] selectorArray = request.getRequestPathInfo().getSelectors();
		if(selectorArray==null || selectorArray.length==0){
			return true;
		}else{
			return false;
		}
		
	}

	public void setNoTags(boolean noTags) {
		this.noTags = noTags;
	}

	private static final Logger LOG = LoggerFactory.getLogger(ResourceLibrarySearchModel.class);

	public List<ResourceNode> getResouceList() throws RepositoryException {

		try {
			
			
			LOG.debug("-------------INSIDE Resouce Library  SEARCH Model");
			
			SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			
			String viewtype = "";
			String[] selectorArray = request.getRequestPathInfo().getSelectors();
			String tags[] =  {""};
			
			if (selectorArray != null && selectorArray.length > 0) {
				viewtype = selectorArray[0];
				viewtype = viewtype.replaceAll("\\|", "/").replaceAll("[\\[\\](){}]","");
				tags = viewtype.split(",");
			}else{
				tags = null;
			}
			
			String paths[] = {"/content/dam/hdscorp/en_us/assets"};
			
			boolean doPagination = false;
			String type[] = {"dam:Asset"};
			
			
			SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,null,type,null,doPagination,null,null,resourceResolver,null,null);
			List<Hit> hits = result.getHits();
			
			LOG.debug("-------------Resouce SEARCH CALL COMPLETED-----"+result.getTotalMatches());
			
			resouceList = new ArrayList<ResourceNode>();
						
			for (Hit hit : hits) {
				ResourceNode resourceNode = new ResourceNode();
				
				
				Resource metadataResource = hit.getResource().getChild("jcr:content/metadata");
				ValueMap properties = ResourceUtil.getValueMap(metadataResource);
				
				if(properties.containsKey("dc:title")){
					resourceNode.setResourceTitle(properties.get("dc:title").toString());
				}
				resourceNode.setResourceDescription(properties.get("dc:description").toString());
				resourceNode.setResourcePath(hit.getResource().getPath());
				if(properties.containsKey("cq:tags")){
					resourceNode.setResourceTags((String[])properties.get("cq:tags"));
				}
				if(properties.containsKey("resourceType")){
				resourceNode.setResourceType(properties.get("resourceType").toString());
				}else {
					resourceNode.setResourceType("pdf");
				}
				
			}
			
		} catch (Exception e) {
			LOG.error("----IN EXCEPTION BLOCK----"+e.getCause());
			LOG.error(e.getMessage());
		}
		return resouceList;
	}
}
