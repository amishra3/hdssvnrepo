package com.hdscorp.cms.slingmodels;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.NewsNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ServiceUtil;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = {Resource.class })
public class PressReleasesModel {
	
	@Inject
	@Named("pressreleaseslabel")
	@Default(values = { "Press Releases" })
	private String pressReleasesLabel;
	@Inject
	@Named("pressreleaseslookuppath")
	@Default(values = { "/content/hdscorp/en_us/newsandinsights/press-releases/pressreleases" })
	private String newsPath;
	@Inject
	@Named(value = "readmorelabel")
	@Default(values = { "READ MORE" })
	private String readMoreLabel;
	@Inject
	@Named(value = "viewallprlabel")
	@Default(values = { "VIEW ALL PREE RELEASES" })
	private String viewAllPrLabel;
	@Inject
	@Named(value = "featuredprimage")
	@Default(values = { "" })
	private String featuredPrImage;
	@Inject
	@Named(value = "priconimage")
	@Default(values = { "" })
	private String priconimage;
	@Inject
	@Named(value = "featuredpressrelease")
	@Default(values = { "" })
	private String featuredPressRelease;
	@Inject
	@Named("featuredprdesc")
	@Default(values = { "" })
	private String featuredPrDesc;
	@Inject
	@Named(value = "noofpressreleasesshown")
	@Default(values = { "15" })
	private String noofPressReleasesShown;
	@Inject
	@Named(value = "viewallprlink")
	@Default(values = { "" })
	private String viewAllPrLink;  
	@Inject
	@Named(value = "pressreleaseslookuppath")
	@Default(values = { "" })
	private String pressReleasesLookuppath; 
	
	private List<NewsNode> pressReleaseList;
	private NewsNode featuredPR;
	public NewsNode getFeaturedPR() {
		
		
		
		Resource resource = JcrUtilService.getResourceResolver()
				.resolve(
						featuredPressRelease
								+ "/jcr:content/pressrelease");
		if (!resource
				.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
			featuredPR = new NewsNode();
			ValueMap properties = resource.adaptTo(ValueMap.class);

			featuredPR.setNewsTitle(properties.get("pressreleasetitle",
					(String) null).toString());

			Calendar cal  =(Calendar) properties.get("pressreleasedate");
			try {
			
					
			
				featuredPR.setNewsDate(ServiceUtil.getStringFromDate(cal.getTime(),
						"MMMM d, yyyy"));
			} catch (ParseException e) {
				
				e.printStackTrace();
			}
						
		}
		
		return featuredPR;
	}

	public List<NewsNode> getPressReleaseList() {
		
		try{
		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		SearchResult result = searchServiceHelper.getPressReleases(
				null, newsPath, 0, null,this.noofPressReleasesShown,"0","pressRelease");
		List<Hit> hits = result.getHits();
		pressReleaseList = new ArrayList<NewsNode>();

		for (Hit hit : hits) {

			Resource resource = JcrUtilService.getResourceResolver()
					.resolve(
							hit.getResource().getPath()
									+ "/jcr:content/pressrelease");
			if (!resource
					.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

				NewsNode newsNode = new NewsNode();
				ValueMap properties = resource.adaptTo(ValueMap.class);

				newsNode.setNewsTitle(properties.get("pressreleasetitle",
						(String) null).toString());

				Calendar cal  =(Calendar) properties.get("pressreleasedate");
				
				
						
				newsNode.setNewsDate(ServiceUtil.getStringFromDate(cal.getTime(),
						"MMMM d, yyyy"));
				Page reourcePage = hit.getResource().adaptTo(Page.class);
				newsNode.setNewsDetailPath(PathResolver.getShortURLPath(reourcePage.getPath()));
				pressReleaseList.add(newsNode);
			}

		} }catch (Exception e){
			e.printStackTrace();
		}
		
		return pressReleaseList;
	}
	
	public String getPressReleasesLabel() {
		return pressReleasesLabel;
	}
	public String getReadMoreLabel() {
		return readMoreLabel;
	}
	public String getViewAllPrLabel() {
		return viewAllPrLabel;
	}
	public String getFeaturedPrImage() {
		return featuredPrImage;
	}
	public String getFeaturedPressRelease() {
		return featuredPressRelease;
	}
	
	public String getFeaturedPrDesc() {
		return featuredPrDesc;
	}
	public String getNoofPressReleasesShown() {
		return noofPressReleasesShown;
	}
	public String getViewAllPrLink() {
		
		return PathResolver.getShortURLPath(viewAllPrLink);
	}
	public String getPriconimage() {
		return priconimage;
	}
}
