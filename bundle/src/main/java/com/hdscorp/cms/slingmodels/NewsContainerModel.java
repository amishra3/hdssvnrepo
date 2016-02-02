package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.hdscorp.cms.dao.NewsContainerNode;
import com.hdscorp.cms.util.PathResolver;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
public class NewsContainerModel {
	
	@Inject
	private SlingHttpServletRequest request;
	@Inject
	@Named("pressReleasesText")
	@Default(values = { "Press Releases" })
	private String pressReleasesText;
	
	@Inject
	@Named(value = "searchPressReleasesText")
	@Default(values = { "Search press releases" })
	private String searchPressReleasesText;
	@Inject
	@Named(value = "archiveLabel")
	@Default(values = { "ARCHIVE" })
	private String archiveLabel;
	@Inject
	@Named(value = "noOfYears")
	@Default(values = { "2" })
	private String noOfYears;
	@Inject
	@Named(value = "loadmorelabel")
	@Default(values = { "Load More" })
	private String loadMoreLabel;
	
	@Inject
	@Named(value = "lookuppagepath")
	@Default(values = { "/content/hdscorp/en_us/lookup/search-news" })
	private String lookupPagePath;
	
	private List<NewsContainerNode> filterUrls;
	
	public List<NewsContainerNode> getFilterUrls() {
		filterUrls = new ArrayList<NewsContainerNode>();
		String fullText = request.getParameter("fulltext");
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int navYears =  Integer.parseInt(this.noOfYears);
		for (int i = year; i> (year-navYears) ; i--) {
			NewsContainerNode newsContainerNode = new NewsContainerNode();
			if(fullText!=null) {
			newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.lookupPagePath + "."+i)+"?fullText= "+fullText);
			} else {
				newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.lookupPagePath + "."+i));
			}
			newsContainerNode.setFilterText(String.valueOf(i));
			filterUrls.add(newsContainerNode);
		}
		NewsContainerNode newsContainerNode = new NewsContainerNode();
		if(fullText!=null){
			newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.lookupPagePath + "."+"archive"+"."+navYears)+"?fullText= "+fullText);
		}else {
			newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.lookupPagePath + "."+"archive"+"."+navYears));
		}
		
		newsContainerNode.setFilterText(this.archiveLabel);
		filterUrls.add(newsContainerNode);
		
		
		return filterUrls;
	}
	public String getLookupPagePath() {
		return lookupPagePath;
	}
	public String getPressReleasesText() {
		return pressReleasesText;
	}
	public String getSearchPressReleasesText() {
		return searchPressReleasesText;
	}
	public String getArchiveLabel() {
		return archiveLabel;
	}
	public String getNoOfYears() {
		return noOfYears;
	}
	public String getLoadMoreLabel() {
		return loadMoreLabel;
	}
}
