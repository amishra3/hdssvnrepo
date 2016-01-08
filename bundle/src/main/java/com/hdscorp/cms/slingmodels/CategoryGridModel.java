package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.CategoryNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = Resource.class)
public class CategoryGridModel {

	@Inject
	private Page resourcePage;

	@Inject
	private ResourceResolver resourceResolver;	
	
	@Inject
	private String[] categorytag;
	
	@Inject
	private String targetparentdirectory;

	private List<CategoryNode> categories;

	public String[] getCategorytag() {
		
		return categorytag;
	}

	public String getTargetparentdirectory() {
		return targetparentdirectory;
	}

	
	public List<CategoryNode> getCategories() throws RepositoryException {

		SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
        
		String paths[] = {targetparentdirectory};
		String tags[] = categorytag ;
		tags=null;
		String template= "/apps/hdscorp/templates/productcategory";
		String type[] = {"cq:Page"};
		boolean doPagination = false;
		
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,template,type,null,doPagination,null,null,resourceResolver,null,null);
		List<Hit> hits = result.getHits();
		categories = new ArrayList<CategoryNode>();
		
		for (Hit hit : hits) {
		    
		    CategoryNode categoryNode = new CategoryNode(); 
			Page reourcePage = hit.getResource().adaptTo(Page.class);
		    String pageTitle = reourcePage.getTitle();
		    String pagePath = reourcePage.getPath();
		    String pageProductDescription = (String)reourcePage.getProperties().get("subtext");
		    if(pagePath.startsWith("/content")){
		    	pagePath=PathResolver.getShortURLPath(pagePath);
		    }
		    categoryNode.setCategoryTitle(pageTitle);
		    categoryNode.setCategoryDescription(pageProductDescription);
		    categoryNode.setCategoryPath(pagePath);

		    
		    categories.add(categoryNode);
		}
		return categories;
	}
}
