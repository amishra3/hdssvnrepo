package com.hdscorp.cms.slingmodels;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.inject.Inject;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.PressReleaseModel;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ServiceUtil;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = Resource.class)
public class ExplorePressReleaseContentModel {

	@Inject
	private Page resourcePage;

	@Inject
	private ResourceResolver resourceResolver;	
		
	private List<PressReleaseModel> pressReleases;

	private static final Logger LOG = LoggerFactory.getLogger(ExplorePressReleaseContentModel.class);
	
	public List<PressReleaseModel> getPressReleases() throws RepositoryException {
		

			LOG.debug("-------------Entering  getPress Releases--------");

			SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			
			String path = "/content/hdscorp/en_us/lookup/pressreleases";
			String returnOffset = "0";
			String returnLimit = "2";
			
			
			SearchResult result = searchServiceHelper.getPressReleases(null, path, 0, null , returnLimit, returnOffset, "pressRelease");

			
			LOG.debug("-------------getTotalMatches-----"+result.getTotalMatches());
			List<Hit> hits = result.getHits();
			pressReleases = new ArrayList<PressReleaseModel>();
			
			for (Hit hit : hits) {

				try {
					PressReleaseModel pressRelease = new PressReleaseModel();
					Page reourcePage = hit.getResource().adaptTo(Page.class);
					String pagePath = reourcePage.getPath();
					ValueMap properties = reourcePage.getContentResource("pressrelease").adaptTo(ValueMap.class);
						
					String pageTitle = properties.get("pressreleasetitle",(String) null).toString();
					String pageDescription = properties.get("pressreleasedesc",(String) null).toString();;
					String pagePublishDate = "";
					
					Calendar cal  =(Calendar) properties.get("pressreleasedate");
					try {
						pagePublishDate = ServiceUtil.getStringFromDate(cal.getTime(),"MMMM d, yyyy");
					} catch (ParseException ex) {
						LOG.error(ex.getMessage());
					}

					if(pagePath.startsWith("/content")){
						pagePath=PathResolver.getShortURLPath(pagePath);
					}

					pressRelease.setTitle(pageTitle);
					pressRelease.setLink(pagePath);
					pressRelease.setDescription(pageDescription);
					pressRelease.setPubDate(pagePublishDate);
					pressReleases.add(pressRelease );
				} catch (Exception e) {
					LOG.error(e.getMessage());
				}
			}
		return pressReleases;
	}
}
