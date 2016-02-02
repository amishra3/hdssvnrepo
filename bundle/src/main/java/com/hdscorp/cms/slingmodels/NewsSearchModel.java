package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.hdscorp.cms.dao.NewsNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ServiceUtil;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
public class NewsSearchModel {

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	@Named("newsPath")
	@Default(values = { "/content/hdscorp/en_us/lookup/news" })
	private String newsPath;
	@Inject
	@Named("readmoretext")
	@Default(values = { "READ MORE" })
	private String readMoreText;
	@Inject
	@Named(value = "loadMoreLabel")
	@Default(values = { "Load More" })
	private String loadMoreLabel;

	public String getLoadMoreLabel() {
		return loadMoreLabel;
	}

	public String getReadMoreText() {
		return readMoreText;
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
					newsList.add(newsNode);
				}

			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(" ----IN ERROR BLOCK---" + e.getMessage());
		}
		return newsList;
	}
}
