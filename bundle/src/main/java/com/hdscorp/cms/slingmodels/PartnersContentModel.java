package com.hdscorp.cms.slingmodels;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.PartnerDescription;
import com.hdscorp.cms.dao.PartnerNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = Resource.class)
public class PartnersContentModel {

	@Inject
	private Page resourcePage;

	@Inject
	private ResourceResolver resourceResolver;	
	
	@Inject
	private String[] partnertags;
	@Inject
	@Default(values = {""})
	private String[] partnerdesctags;
					 
	
	private List<PartnerNode> partners;

	public String[] getPartnertags() {
		
		return partnertags;
	}

	public String[] getPartnerdesctags() {
		return 	partnerdesctags;
	}

	private static final Logger LOG = LoggerFactory.getLogger(SubCatContentModel.class);
	
	public List<PartnerNode> getPartners() throws RepositoryException, JsonParseException, JsonMappingException, IOException {
		
		try {
			LOG.debug("-------------INSIDE getProducts in SubCatContentModel.Making the Search Service call");

			SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			
			String paths[] = {"/content/hdscorp/en_us/lookup/partners"};
			String tags[] = partnertags ;
			String template= "/apps/hdscorp/templates/partnerdetail";
			String type[] = {"cq:Page"};
			boolean doPagination = false;
			
			SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,template,type,null,doPagination,null,null,resourceResolver,"@jcr:content/jcr:title","asc");
			
			LOG.debug("-------------SEARCH CALL COMPLETED-----"+result.getTotalMatches());
			List<Hit> hits = result.getHits();
			partners = new ArrayList<PartnerNode>();
			
			for (Hit hit : hits) {
				PartnerNode partnerNode = new PartnerNode();
				Page reourcePage = hit.getResource().adaptTo(Page.class);
			    String pageTitle = reourcePage.getTitle();
			    String pagePath = reourcePage.getPath();
			    String[] partnerTags= (String[])reourcePage.getProperties().get("cq:tags");
			    
			    Resource parResource = reourcePage.getContentResource("par") ;
			    Resource partnerMetaDeta = parResource.getChild("partnerdescriptionco") ;
			    ValueMap partnerMetaDetaMap= partnerMetaDeta.adaptTo(ValueMap.class);
			    partnerNode.setPartnerBackgroundImagePath((String)partnerMetaDetaMap.get("backgroundimagepath", ""));
			    partnerNode.setPartnerIconImagePath((String)partnerMetaDetaMap.get("partnericonimagepath", ""));
			    partnerNode.setPartnerIconImageAltText((String)partnerMetaDetaMap.get("partnericonimagealttext", ""));
			    partnerNode.setPartnerTags(partnerTags);
			    
			    Resource descriptionListResource = null;
			    if(partnerMetaDeta!=null){
			    	descriptionListResource = partnerMetaDeta.getChild("productdescriptions") ;	
			    }
			    
			    String[] partnerMultiDescriptionList = new String[0];
			    ObjectMapper mapper = new ObjectMapper();
			    if(descriptionListResource!=null){
			    	ValueMap descriptioNodeProps= descriptionListResource.adaptTo(ValueMap.class);
			    	if(descriptioNodeProps.containsKey("productDefaultDescription")) {
			    		partnerNode.setPartnerDescription(descriptioNodeProps.get("productDefaultDescription").toString());
			    	} 
			    	if(partnerdesctags.length>0 && !partnerdesctags[0].isEmpty()) {
				    	partnerMultiDescriptionList = descriptioNodeProps.get("descriptionlist",new String[0]);
				    	
					    for(String desc:partnerMultiDescriptionList){
					    	PartnerDescription prodDescObj = mapper.readValue(desc, PartnerDescription.class);
					    	
					    	if(Arrays.asList(prodDescObj.getCategoryTag()).contains(partnerdesctags[0])) {
					    		partnerNode.setPartnerDescription(prodDescObj.getDescription());
					    		break;
					    	}
					    }
			    	} 
			    }

			    
			    if(pagePath.startsWith("/content")){
			    	pagePath=PathResolver.getShortURLPath(pagePath);
			    }
			    partnerNode.setPartnerTitle(pageTitle);
			    partnerNode.setPartnerPath(pagePath);
			    
			    partners.add(partnerNode);
			    
			}
		} catch (Exception e) {
			LOG.error("----IN EXCEPTION BLOCK----"+e.getCause());
			LOG.error(e.getMessage());
		}
		return partners;
	}
}
