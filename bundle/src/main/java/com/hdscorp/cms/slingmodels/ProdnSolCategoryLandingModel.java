package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
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

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class ProdnSolCategoryLandingModel {

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	private ResourceResolver resourceResolver;	
	
	private List<ProductNode> products;

	public List<ProductNode> getProducts() throws RepositoryException {

		try {
			
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
			
			String paths[] = {"/content/hdscorp/en_us/products-solutions"};
			String template= "/apps/hdscorp/templates/productdetail";
			boolean doPagination = false;
			String type[] = {"cq:Page"};
			
			
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
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(" ----IN ERROR BLOCK---"+e.getMessage());
		}
		return products;
	}
}
