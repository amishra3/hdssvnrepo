package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.hdscorp.cms.dao.NewsNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ViewHelperUtil;
@Model(adaptables = {Resource.class })
public class AwardsModel {
	
	@Inject
	@Named("awardsheaderlabel")
	@Default(values = { "" })
	private String awardsheaderlabel;
	
	@Inject
	@Named(value = "readmorelabel")
	@Default(values = { "READ MORE" })
	private String readmorelabel;
	@Inject
	@Named(value = "viewalllabel")
	@Default(values = { "VIEW ALL " })
	private String viewalllabel;
	@Inject
	@Named(value = "featuredimage")
	@Default(values = { "" })
	private String featuredimage;
	@Inject
	@Named(value = "featurediconimage")
	@Default(values = { "" })
	private String featurediconimage;
	
	public String getFeaturediconimage() {
		return featurediconimage;
	}

	@Inject
	@Named(value = "featuredaward")
	@Default(values = { "" })
	private String featuredaward;
	@Inject
	@Named("featuredawarddesc")
	@Default(values = { "" })
	private String featuredawarddesc;
	@Inject
	@Named(value = "noofawardsshown")
	@Default(values = { "15" })
	private String noofawardsshown;
	@Inject
	@Named(value = "viewalllink")
	@Default(values = { "" })
	private String viewalllink;  
	@Inject
	@Named(value = "awardslookuppath")
	@Default(values = { "" })
	private String awardslookuppath; 
	
	private List<NewsNode> awardsList;
	private NewsNode featuredAward;
	public NewsNode getFeaturedAward() {
		
		if(!featuredaward.isEmpty()){
		
		Resource resource = JcrUtilService.getResourceResolver()
				.resolve(
						featuredaward
								+ "/jcr:content/awarddetail");
		if (!resource
				.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
			featuredAward = new NewsNode();
			ValueMap properties = resource.adaptTo(ValueMap.class);

			featuredAward.setNewsTitle(properties.get("awardtitle",
					(String) null).toString());

			
						
		}
		}
		return featuredAward;
	}

	public String getAwardsheaderlabel() {
		return awardsheaderlabel;
	}

	public String getReadmorelabel() {
		return readmorelabel;
	}

	public String getViewalllabel() {
		return viewalllabel;
	}

	public String getFeaturedimage() {
		return featuredimage;
	}

	public String getFeaturedaward() {
		return featuredaward;
	}

	public String getFeaturedawarddesc() {
		return featuredawarddesc;
	}

	public String getNoofawardsshown() {
		return noofawardsshown;
	}

	public String getViewalllink() {
		return PathResolver.getShortURLPath(viewalllink);
	}

	public String getAwardslookuppath() {
		return awardslookuppath;
	}

	

	public List<NewsNode> getAwardsList() {
		
		try{
		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		SearchResult result = searchServiceHelper.getPressReleases(
				null, awardslookuppath, 0, null,this.noofawardsshown,"0","awards");
		
		List<Hit> hits = result.getHits();
		awardsList = new ArrayList<NewsNode>();
         
		for (Hit hit : hits) {

			Resource resource = JcrUtilService.getResourceResolver()
					.resolve(
							hit.getResource().getPath()
									+ "/jcr:content/awarddetail");
			if (!resource
					.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				NewsNode awardNode = new NewsNode();
				ValueMap properties = resource.adaptTo(ValueMap.class);

				awardNode.setNewsTitle(properties.get("awardtitle",
						(String) null).toString());
				awardNode.setDescription(properties.get("awarddescription",
						(String) null).toString());
				
				awardNode.setNewsDetailPath(properties.get("awardlink",
						(String) null).toString());
				if(properties.containsKey("linktargettype")){
					awardNode.setOpenInNewTab(true);
				} else {
					awardNode.setOpenInNewTab(false);
				}
				if(properties.containsKey("thirdparty")){
					awardNode.setNewWinIcon(true);
				} else {
					awardNode.setNewWinIcon(false);
				}
				awardsList.add(awardNode);
			}

		} }catch (Exception e){
			e.printStackTrace();
		}
		
		return awardsList;
	}
	
	

}
