package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.NewsNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ServiceUtil;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
public class NewsModel {

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	@Named("newsPath")
	@Default(values = { "/content/hdscorp/en_us/lookup/news-releases" })
	private String newsPath;
	@Inject
	@Named("readPressReleaseText")
	@Default(values = { "READ PRESS RELEASE" })
	private String readPressReleaseText;
	
	@Inject
	@Named(value = "loadMoreLabel")
	@Default(values = { "Load More" })
	private String loadMoreLabel;

	public String getLoadMoreLabel() {
		return loadMoreLabel;
	}

	public String getReadPressReleaseText() {
		return readPressReleaseText;
	}

	private List<NewsNode> newsList;

	public List<NewsNode> getNewsList() throws RepositoryException {

		try {

			String fullText = request.getParameter("fulltext");
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

			SearchResult result = searchServiceHelper.getNewsResults(viewtype,
					newsPath, noOfYears,fullText);
			List<Hit> hits = result.getHits();

			newsList = new ArrayList<NewsNode>();

			for (Hit hit : hits) {
				NewsNode newsNode = new NewsNode();
				Page reourcePage = hit.getResource().adaptTo(Page.class);

				newsNode.setNewsTitle(reourcePage.getTitle());
				
				Calendar cal =(Calendar) reourcePage.getProperties().get( "published");
				
				newsNode.setNewsDate(ServiceUtil.getDisplayDateFormat(cal.getTime(), "MMMM d, yyyy"));
				
				newsNode.setNewsDetailPath((String) reourcePage.getProperties()
						.get("id"));
				newsList.add(newsNode);
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(" ----IN ERROR BLOCK---" + e.getMessage());
		}
		return newsList;
	}
}
