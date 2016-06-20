package com.hdscorp.cms.slingmodels;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.ProductDescription;
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

	private static final Logger LOG = LoggerFactory.getLogger(ProdnSolCategoryLandingModel.class);

	public List<ProductNode> getProducts() throws RepositoryException {

		try {
			
			
			LOG.debug("-------------INSIDE getProducts in ProdnSolCategoryLandingModel .GETTING THE SEARCH SERVICE");
			
			SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			
			String viewtype = "";
			String[] selectorArray = request.getRequestPathInfo().getSelectors();
			String tags[] =  {""};
			
			if (selectorArray != null && selectorArray.length > 0) {
				viewtype = selectorArray[0];
				viewtype = viewtype.replaceAll("\\^", "/").replaceAll("[\\[\\](){}]","").replaceAll("~",":");
				tags = viewtype.split(",");
			}else{
				tags = null;
			}
			
			String paths[] = {"/content/hdscorp/en_us"};
			String template= "/apps/hdscorp/templates/productdetail";
			
			if(tags!=null && tags.length > 0){
				//Include services in case of categories
				template= "/apps/hdscorp/templates/productdetail,/apps/hdscorp/templates/servicedetail";
			}
			boolean doPagination = false;
			String type[] = {"cq:Page"};
			
			
			String fullText=request.getParameter("fulltext");
			try {
				if(fullText!=null) {
					fullText = URLDecoder.decode(request.getParameter("fulltext"),"UTF-8");
				}
			} catch (Exception e) {	
				LOG.info("Exception while decoding the url::" +e.getMessage());
			}
			
			
			SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,template,type,fullText,doPagination,null,null,resourceResolver,null,null);
			List<Hit> hits = result.getHits();
			
			LOG.debug("-------------SEARCH CALL COMPLETED-----"+result.getTotalMatches());
			
			products = new ArrayList<ProductNode>();
			boolean defultDescriptionFound = false ;
			
			for (Hit hit : hits) {
				ProductNode productNode = new ProductNode();
				Page reourcePage = hit.getResource().adaptTo(Page.class);
				String pageTitle;
				if (null != reourcePage.getProperties().get("productSearchAltTitle")) {
					pageTitle = (String)reourcePage.getProperties().get("productSearchAltTitle");	
				} else {		
					pageTitle = reourcePage.getTitle();
				}
				String productAltTitle = "";
				if (null != reourcePage.getProperties().get("productSearchKeyword")) {
					productAltTitle = (String)reourcePage.getProperties().get("productSearchKeyword");
				}
			    String pagePath = reourcePage.getPath();
			    String pageProductDescription = (String)reourcePage.getProperties().get("subtext");
			    String[] pageTags= (String[])reourcePage.getProperties().get("cq:tags");
			    Resource descriptionListResource = reourcePage.getContentResource("productdescriptions") ;
			    String[] productMultiDescriptionList = new String[0];
			    ObjectMapper mapper = new ObjectMapper();
		    	ArrayList<ProductDescription> descriptionList = new ArrayList<ProductDescription>();
			    if(descriptionListResource!=null){
			    	ValueMap descriptioNodeProps= descriptionListResource.adaptTo(ValueMap.class);
			    	productMultiDescriptionList = descriptioNodeProps.get("descriptionlist",new String[0]);
				    for(String desc:productMultiDescriptionList){
				    	ProductDescription prodDescObj = mapper.readValue(desc, ProductDescription.class);
				    	if(!defultDescriptionFound){
					    	for(String prodTag:prodDescObj.getCategoryTag()){
						    	if(tags!=null && Arrays.asList(tags).contains(prodTag) && !defultDescriptionFound){
						    		defultDescriptionFound=true;
						    		prodDescObj.setDefaultDesc(true);
						    		break;
						    	}
					    	}
				    	}
				    	descriptionList.add(prodDescObj);
				    }
			    }
			    
			    if(pagePath.startsWith("/content")){
			    	pagePath=PathResolver.getShortURLPath(pagePath);
			    }
			    productNode.setProductTitle(pageTitle);
			    productNode.setProductDescription(pageProductDescription);
			    productNode.setProductPath(pagePath);
			    productNode.setProductTags(pageTags);
			    productNode.setDescriptionList(descriptionList);
			    productNode.setProductAltTitle(productAltTitle);
			    products.add(productNode);
			}
			
		} catch (Exception e) {
			LOG.error("----IN EXCEPTION BLOCK----"+e.getCause());
			LOG.error(e.getMessage());
		}
		
		if (products.size() > 0) {
			Collections.sort(products, new Comparator<ProductNode>() {
				@Override
				public int compare(final ProductNode object1, final ProductNode object2) {
					return object1.getProductTitle().compareTo(object2.getProductTitle());
				}
			});
		}
		
		return products;
	}
}
