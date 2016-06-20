package com.hdscorp.cms.slingmodels;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
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
import com.hdscorp.cms.util.HdsCorpCommonUtils;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class ResourceLibrarySearchModel  {

	@Inject
	private SlingHttpServletRequest request;

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
	@Named("pdfspath")
	@Default(values = { "/content/dam/public/en_us/pdfs" })
	private String pdfspath;
	@Inject
	@Named("videospath")
	@Default(values = { "/content/dam/public/en_us/videos" })
	private String videospath;
	@Inject
	@Named("externalassetpath")
	@Default(values = { "/content/dam/public/en_us/ext" })
	private String externalassetpath;

	
	private String[] selectorTags;
	
	private static final Logger LOG = LoggerFactory.getLogger(ResourceLibrarySearchModel.class);
	
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
			viewtype = viewtype.replaceAll("\\^", "/").replaceAll("[\\[\\](){}]","").replaceAll("~",":");
			this.selectorTags = viewtype.split(",");
			
			return false;
		}
		
	}

	public List<ResourceNode> getResouceList() throws Exception {
		
		TagManager tagManager = JcrUtilService.getResourceResolver().adaptTo(TagManager.class);
		LOG.info("-------------INSIDE Resouce Library  SEARCH Model");
		
		ResourceResolver resourceResolver = JcrUtilService.getResourceResolver();
		SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		String fullText=request.getParameter("fulltext");
		try {
			if(fullText!=null) {
				fullText = URLDecoder.decode(request.getParameter("fulltext"),"UTF-8");
			}
			
		} catch (Exception e) {	
			LOG.info("Exception while decoding the url::" +e.getMessage());
		}
		
		String viewtype = "";
		String sortCriteria = "default";
		String[] selectorArray = request.getRequestPathInfo().getSelectors();
		String tags[] =  {""};
		
		if (selectorArray != null && selectorArray.length > 0) {
			if(selectorArray.length > 1){
				sortCriteria = selectorArray[1];	
			}
			
			if(selectorArray[0].contains("common")){
				viewtype = selectorArray[0];
				viewtype = viewtype.replaceAll("\\^", "/").replaceAll("[\\[\\](){}]","").replaceAll("~",":");
				tags = viewtype.split(",");				
			}else{
				sortCriteria = selectorArray[0];
				viewtype = null ;
				tags = null;
			}

		}else{
			tags = null;
		}
		
		String paths[] = {pdfspath,videospath,externalassetpath};
		
		boolean doPagination = false;
		String type[] = {"dam:Asset","cq:Page"};
		
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,null,type,fullText,doPagination,null,null,resourceResolver,null,null);
		List<Hit> hits = result.getHits();
		
		LOG.info("-------------Hits Size-----"+result.getHits().size());
		LOG.info("-------------Resource Library Query Excecution Time-----"+result.getExecutionTime());
		
		resouceList = new ArrayList<ResourceNode>();
		this.totalNoOfResuts = 	hits.size();		

			for (Hit hit : hits) {
				
				try {				
					ResourceNode resourceNode = ResourceLibraryHelperModel.getResourceNode(hit.getResource(), this.contenttype,this.industrytag, tagManager, request);
					if (resourceNode != null) {
						resourceNode.setGated(HdsCorpCommonUtils.isGated(resourceNode.getResourcePath(), request));
						resouceList.add(resourceNode);
					}
				} catch (Exception e) {
					LOG.error("Error while adding following resource to the result list - "+hit.getResource().getPath()+ " -- "+e.getMessage());
				}
			}
		
		if("default".equals(sortCriteria)){
			Collections.sort(resouceList,new GatedFirstComparator());	
		}else if("alpha".equals(sortCriteria)){
			Collections.sort(resouceList,new LexicographicComparator());
		}else if("date".equals(sortCriteria)){
			Collections.sort(resouceList,new dateComparator());
		}
		
		return resouceList;
	}
			
	public int getTotalNoOfResuts() {
		return totalNoOfResuts;
	}
	
	class LexicographicComparator implements Comparator<ResourceNode> {
	    @Override
	    public int compare(ResourceNode a, ResourceNode b) {
	        return a.getResourceTitle().compareToIgnoreCase(b.getResourceTitle());
	    }
	}

	class dateComparator implements Comparator<ResourceNode> {
	    @Override
	    public int compare(ResourceNode a, ResourceNode b) {
	        return Long.compare(b.getComparisonDateInMilliSec(), a.getComparisonDateInMilliSec());
	    }
	}
	
	class GatedFirstComparator implements Comparator<ResourceNode> {
	    @Override
	    public int compare(ResourceNode a, ResourceNode b) {
	    	int gatedCompareResult = Boolean.valueOf(b.isGated()).compareTo(Boolean.valueOf(a.isGated()));
//	    	if(gatedCompareResult==0){
//	    		gatedCompareResult = a.getResourceTitle().compareTo(b.getResourceTitle());
//	    	}
	    	return gatedCompareResult ;
	    }
	}
}

