package com.hdscorp.cms.slingmodels;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.dao.ProductDescription;
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

	private static final Logger LOG = LoggerFactory.getLogger(SubCatContentModel.class);
	
	public List<ProductNode> getProducts() throws RepositoryException, JsonParseException, JsonMappingException, IOException {
		
		try {
			LOG.debug("-------------INSIDE getProducts in SubCatContentModel.Making the Search Service call");

			SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			
			String paths[] = {"/content/hdscorp/en_us/products-solutions"};
			String tags[] = subcattags ;
			String template= "/apps/hdscorp/templates/productdetail";
			String type[] = {"cq:Page"};
			boolean doPagination = false;
			
			SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,template,type,null,doPagination,null,null,resourceResolver,null,null);
			
			LOG.debug("-------------SEARCH CALL COMPLETED-----"+result.getTotalMatches());
			List<Hit> hits = result.getHits();
			products = new ArrayList<ProductNode>();
			
			for (Hit hit : hits) {
				ProductNode productNode = new ProductNode();
				Page reourcePage = hit.getResource().adaptTo(Page.class);
			    String pageTitle = reourcePage.getTitle();
			    String pagePath = reourcePage.getPath();
			    String pageProductDescription = (String)reourcePage.getProperties().get("subtext");
			    
			    Resource descriptionListResource = reourcePage.getContentResource("productdescriptions") ;
			    String[] productMultiDescriptionList = new String[0];
			    ObjectMapper mapper = new ObjectMapper();
				ArrayList<ProductDescription> descriptionList = new ArrayList<ProductDescription>();
			    if(descriptionListResource!=null){
			    	ValueMap descriptioNodeProps= descriptionListResource.adaptTo(ValueMap.class);
			    	productMultiDescriptionList = descriptioNodeProps.get("descriptionlist",new String[0]);
				    for(String desc:productMultiDescriptionList){
				    	ProductDescription prodDescObj = mapper.readValue(desc, ProductDescription.class);
				    	descriptionList.add(prodDescObj);
				    }
			    }

			    
			    if(pagePath.startsWith("/content")){
			    	pagePath=PathResolver.getShortURLPath(pagePath);
			    }
			    productNode.setProductTitle(pageTitle);
			    productNode.setProductDescription(pageProductDescription);
			    productNode.setProductPath(pagePath);
			    productNode.setDescriptionList(descriptionList);
			    
			    products.add(productNode);
			    
			}
		} catch (Exception e) {
			LOG.error("----IN EXCEPTION BLOCK----"+e.getCause());
			LOG.error(e.getMessage());
		}
		return products;
	}
}
