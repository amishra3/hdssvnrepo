package com.hdscorp.cms.slingmodels;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

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

@Model(adaptables = { Resource.class })
public class NewsModel {

	@Inject
	@Named("hdsinnewstext")
	@Default(values = { "HDS in the news" })
	private String hdsInNewsText;
	@Inject
	@Named(value = "readmorelabel")
	@Default(values = { "READ MORE" })
	private String readMoreLabel;
	@Inject
	@Named(value = "viewallnewslabel")
	@Default(values = { "VIEW ALL NEWS" })
	private String viewAllNewsLabel;
	@Inject
	@Named(value = "viewallnewslink")
	@Default(values = { "" })
	private String viewAllNewsLink;
	@Inject
	@Named(value = "newsLookuppath")
	@Default(values = { "/content/hdscorp/en_us/newsandinsights/news" })
	private String newsLookupPath;

	@Inject
	@Named("featurednewsimage")
	@Default(values = { "" })
	private String featuredNewsImage;
	@Inject
	@Named("featurednews")
	@Default(values = { "" })
	private String featuredNewsPath;
	@Inject
	@Named("featurednewsdesc")
	@Default(values = { "" })
	private String featuredNewsDesc;

	@Inject
	@Named(value = "noofitemsshown")
	@Default(values = { "10" })
	private String noofitemsshown;
	@Inject
	@Named(value = "loadMoreLabel")
	@Default(values = { "Load More" })
	private String loadMoreLabel;

	private NewsNode featuredNews;
	private List<NewsNode> newsList;

	public NewsNode getFeaturedNews() {

		if (!featuredNewsPath.isEmpty()) {

			Resource resource = JcrUtilService.getResourceResolver().resolve(
					featuredNewsPath + "/jcr:content/newsdetail");
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				featuredNews = new NewsNode();
				ValueMap properties = resource.adaptTo(ValueMap.class);

				featuredNews.setNewsTitle(properties.get("newstitle",
						(String) null).toString());

				Calendar cal = (Calendar) properties.get("newsdate");
				try {

					featuredNews.setNewsDate(ServiceUtil.getStringFromDate(
							cal.getTime(), "MMMM d, yyyy"));
				} catch (ParseException e) {

					e.printStackTrace();
				}

			}
		}
		return featuredNews;
	}

	public List<NewsNode> getNewsList() {

		try {
			SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
					.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			SearchResult result = searchServiceHelper.getPressReleases(null,
					newsLookupPath, 0, null, this.noofitemsshown, "0", "news");
			List<Hit> hits = result.getHits();
						
			newsList = new ArrayList<NewsNode>();
System.out.println("no of hits****"+hits.size());
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

					Calendar cal = (Calendar) properties.get("newsdate");

					newsNode.setNewsDate(ServiceUtil.getStringFromDate(
							cal.getTime(), "MMMM d, yyyy"));

					newsNode.setNewsDetailPath(properties.get("newslink",
							(String) null).toString());
					newsList.add(newsNode);
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return newsList;
	}

	public String getHdsInNewsText() {
		return hdsInNewsText;
	}

	public String getFeaturedNewsImage() {
		return featuredNewsImage;
	}

	public String getFeaturedNewsPath() {
		return featuredNewsPath;
	}

	public String getNoofitemsshown() {
		return noofitemsshown;
	}

	public String getLoadMoreLabel() {
		return loadMoreLabel;
	}

	public String getReadMoreLabel() {
		return readMoreLabel;
	}

	public String getViewAllNewsLabel() {
		return viewAllNewsLabel;
	}

	public String getViewAllNewsLink() {
		return PathResolver.getShortURLPath(viewAllNewsLink) ;
	}
	public String getFeaturedNewsDesc() {
		return featuredNewsDesc;
	}
	public String getNewsLookupPath() {
		return newsLookupPath;
	}
}
