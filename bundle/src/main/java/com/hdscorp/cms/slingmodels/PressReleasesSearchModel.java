package com.hdscorp.cms.slingmodels;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.NewsNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ServiceUtil;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
public class PressReleasesSearchModel {

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	@Named("newsPath")
	@Default(values = { "/content/hdscorp/en_us/lookup/pressreleases" })
	private String newsPath;
	@Inject
	@Named("readMoreText")
	@Default(values = { "READ MORE" })
	private String readMoreText;
	@Inject
	@Named("searchType")
	@Default(values = { "PressRelease" })
	private String searchType;
	@Inject
	@Named("noofItemsShown")
	@Default(values = { "12" })
	private String noofItemsShown;
	
	private static final Logger LOG = LoggerFactory
			.getLogger(PressReleasesSearchModel.class);
	
	public String getNoofItemsShown() {
		return noofItemsShown;
	}

	public String getReadMoreText() {
		return readMoreText;
	}



	@Inject
	@Named(value = "loadMoreLabel")
	@Default(values = { "Load More" })
	private String loadMoreLabel;

	public String getLoadMoreLabel() {
		return loadMoreLabel;
	}

	

	private List<NewsNode> newsList;

	public List<NewsNode> getNewsList() throws RepositoryException {

		try {

			String fullText=request.getParameter("fulltext");
			try {
				
				if(fullText!=null) {
					fullText = URLDecoder.decode(request.getParameter("fulltext"),"UTF-8");
				}
				
			} catch (Exception e) {	
				LOG.info("Exception while decoding the url::" +e.getMessage());
			}
			SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
					.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			Integer year = Calendar.getInstance().get(Calendar.YEAR);

			String viewtype = Integer.toString(year);
			String[] selectorArray = request.getRequestPathInfo()
					.getSelectors();
			int noOfYears = 0;

			if (selectorArray != null && selectorArray.length > 0) {
				viewtype = selectorArray[0];
				viewtype = viewtype.replaceAll("\\|", "/").replaceAll(
						"[\\[\\](){}]", "");
				if (selectorArray.length > 1) {

					noOfYears = Integer.parseInt(selectorArray[1]);
				}

			}

			if(searchType.equalsIgnoreCase("pressRelease")) {
				
			
			SearchResult result = searchServiceHelper.getPressReleases(
					viewtype, newsPath, noOfYears, fullText,null,"0","pressRelease");
			List<Hit> hits = result.getHits();
			LOG.info("No of Matches for Press Releases/ News/ Awards"+hits.size());
			LOG.info("Press Releases/ News/ Awards Query Execution Time"+result.getExecutionTime());
			newsList = new ArrayList<NewsNode>();

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
					
					//Date date = ServiceUtil.getDateFromString(pubDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
					//System.out.println("date after paring"+date);		
					newsNode.setNewsDate(ServiceUtil.getStringFromDate(cal.getTime(),
							"MMMM d, yyyy"));
					Page reourcePage = hit.getResource().adaptTo(Page.class);
					newsNode.setNewsDetailPath(PathResolver.getShortURLPath(reourcePage.getPath()));
					if(properties.get("linktargettype")!=null){
						newsNode.setOpenInNewTab(true);
					} else {
						newsNode.setOpenInNewTab(false);
					}
					if(properties.get("thirdparty")!=null){
						newsNode.setNewWinIcon(true);
					} else {
						newsNode.setNewWinIcon(false);
					}
					newsList.add(newsNode);
				}

			}
			} else if(searchType.equalsIgnoreCase("news")){
				SearchResult result = searchServiceHelper.getPressReleases(
						viewtype, newsPath, noOfYears, fullText,null,"0","news");
				List<Hit> hits = result.getHits();
	              
				newsList = new ArrayList<NewsNode>();

				for (Hit hit : hits) {

					Resource resource = JcrUtilService.getResourceResolver()
							.resolve(
									hit.getResource().getPath()
											+ "/jcr:content/newsdetail");
					if (!resource
							.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

						NewsNode newsNode = new NewsNode();
						ValueMap properties = resource.adaptTo(ValueMap.class);

						newsNode.setNewsTitle(properties.get("newstitle",
								(String) null).toString());

						Calendar cal  =(Calendar) properties.get("newsdate");
						
						
						
						newsNode.setNewsDate(ServiceUtil.getStringFromDate(cal.getTime(),
								"MMMM d, yyyy"));

						
						
						newsNode.setNewsDetailPath(properties.get("newslink",
								(String) null).toString());
						if(properties.get("linktargettype")!=null){
							newsNode.setOpenInNewTab(true);
						} else {
							newsNode.setOpenInNewTab(false);
						}
						if(properties.get("thirdparty")!=null){
							newsNode.setNewWinIcon(true);
						} else {
							newsNode.setNewWinIcon(false);
						}
						newsList.add(newsNode);
					}

				}
			} else {
				SearchResult result = searchServiceHelper.getPressReleases(
						viewtype, newsPath, noOfYears, fullText,null,"0","awards");
				List<Hit> hits = result.getHits();
	              
				newsList = new ArrayList<NewsNode>();

				for (Hit hit : hits) {

					Resource resource = JcrUtilService.getResourceResolver()
							.resolve(
									hit.getResource().getPath()
											+ "/jcr:content/awarddetail");
					if (!resource
							.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

						NewsNode newsNode = new NewsNode();
						ValueMap properties = resource.adaptTo(ValueMap.class);

						newsNode.setNewsTitle(properties.get("awardtitle",
								(String) null).toString());
						newsNode.setImgpath(properties.get("awardimg",
								(String) null).toString());

						newsNode.setImageAlt(properties.get("awardimgalt")!=null?properties.get("awardimgalt",(String) null).toString():"");
						
						Calendar cal  =(Calendar) properties.get("awarddate");
						
						
						
						newsNode.setNewsDate(ServiceUtil.getStringFromDate(cal.getTime(),
								"MMMM d, yyyy"));

						
						
						newsNode.setNewsDetailPath(properties.get("awardlink",
								(String) null).toString());
						if(properties.get("linktargettype")!=null){
							newsNode.setOpenInNewTab(true);
						} else {
							newsNode.setOpenInNewTab(false);
						}
						
						if(properties.get("thirdparty")!=null){
							newsNode.setNewWinIcon(true);
						} else {
							newsNode.setNewWinIcon(false);
						}
						newsList.add(newsNode);
					}

				}
			}

		} catch (Exception e) {
			
			e.printStackTrace();
			
		}
		return newsList;
	}
}
