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
import com.hdscorp.cms.dao.ProductNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = Resource.class)
public class SubCatContentModel {

	@Inject
	private Page resourcePage;

	@Inject
	private ResourceResolver resourceResolver;	
	
	@Inject
	private String[] subcattags;
	
	private List<ProductNode> products;

	public String[] getSubcattags() {
		
		return subcattags;
	}

	
	public List<ProductNode> getProducts() throws RepositoryException {

		SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
        
		String paths[] = {"/content/hdscorp/en_us/products-solutions"};
		String tags[] = subcattags ;
		String template= "/apps/hdscorp/templates/productdetail";
		String type[] = {"cq:Page"};
		boolean doPagination = false;
		
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,template,type,null,doPagination,null,null,resourceResolver,null,null);
		List<Hit> hits = result.getHits();
		products = new ArrayList<ProductNode>();
		
		for (Hit hit : hits) {
			ProductNode productNode = new ProductNode();
			Page reourcePage = hit.getResource().adaptTo(Page.class);
		    String pageTitle = reourcePage.getTitle();
		    String pagePath = reourcePage.getPath();
		    String pageProductDescription = (String)reourcePage.getProperties().get("subtext");
		    if(pagePath.startsWith("/content")){
		    	pagePath=PathResolver.getShortURLPath(pagePath);
		    }
		    productNode.setProductTitle(pageTitle);
		    productNode.setProductDescription(pageProductDescription);
		    productNode.setProductPath(pagePath);
		    products.add(productNode);
		}
		return products;
	}
}
