package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.dao.ResourceNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class ResourceLibrarySearchModel  {

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	private ResourceResolver resourceResolver;	
	
	private List<ResourceNode> resouceList;
	private int totalNoOfResuts;
	@Inject
	@Named("contenttype")
	@Default(values = { "" })
	private String[] contenttype;
	@Inject
	@Named("industrytag")
	@Default(values = { "" })
	private String[] industrytag;
	@Inject
	@Named("resourcesPath")
	@Default(values = { "" })
	private String resourcesPath;
	
	private String[] selectorTags;

	
	
	
	public String[] getSelectorTags() {
		return selectorTags;
	}

	private boolean noTags;
	
	public boolean isNoTags() {
		String[] selectorArray = request.getRequestPathInfo().getSelectors();
		if(selectorArray==null || selectorArray.length==0){
			
			return true;
		}else{
			String viewtype = selectorArray[0];
			viewtype = viewtype.replaceAll("\\|", "/").replaceAll("[\\[\\](){}]","");
			this.selectorTags = viewtype.split(",");
			
			return false;
		}
		
	}

	
	
	private static final Logger LOG = LoggerFactory.getLogger(ResourceLibrarySearchModel.class);

	public List<ResourceNode> getResouceList() throws RepositoryException {

		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		LOG.info("-------------INSIDE Resouce Library  SEARCH Model");
		
		SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		String fullText = request.getParameter("fulltext");
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
		
		String paths[] = {resourcesPath};
		
		boolean doPagination = false;
		String type[] = {"dam:Asset"};
		
		
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,null,type,fullText,doPagination,null,null,resourceResolver,null,null);
		List<Hit> hits = result.getHits();
		
		LOG.info("-------------Hits Size-----"+result.getHits().size());
		LOG.info("-------------Resource Library Query Excecution Time-----"+result.getExecutionTime());
		
		
		resouceList = new ArrayList<ResourceNode>();
		this.totalNoOfResuts = 	hits.size();		
		for (Hit hit : hits) {
		
			ResourceNode resourceNode = ResourceLibraryHelperModel.getResourceNode(hit.getResource(),this.contenttype,this.industrytag,tagManager);
			if(resourceNode!=null){
			resouceList.add(resourceNode);
			}
			}
		return resouceList;
		}
			
			
	
	
	public int getTotalNoOfResuts() {
		return totalNoOfResuts;
	}
	
	
	
}

