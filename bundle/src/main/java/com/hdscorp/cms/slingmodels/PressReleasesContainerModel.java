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
public class PressReleasesContainerModel {
	
	@Inject
	private SlingHttpServletRequest request;
	@Inject
	@Named("headerText")
	@Default(values = { "Press Releases" })
	private String headerText;
	
	@Inject
	@Named(value = "searchText")
	@Default(values = { "Search press releases" })
	private String searchText;
	@Inject
	@Named(value = "archiveLabel")
	@Default(values = { "ARCHIVE" })
	private String archiveLabel;
	@Inject
	@Named(value = "noOfYears")
	@Default(values = { "2" })
	private String noOfYears;
	@Inject
	@Named(value = "loadMoreLabel")
	@Default(values = { "Load More" })
	private String loadMoreLabel;
	
	@Inject
	@Named(value = "searchPagePath")
	@Default(values = { "/content/hdscorp/en_us/lookup/search-press-releases" })
	private String searchPagePath;
	
	public String getSearchPagePath() {
		return searchPagePath;
	}
	private List<NewsContainerNode> filterUrls;
	
	public List<NewsContainerNode> getFilterUrls() {
		
		
		filterUrls = new ArrayList<NewsContainerNode>();
		String fullText = request.getParameter("fulltext");
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int navYears =  Integer.parseInt(this.noOfYears);
		for (int i = year; i> (year-navYears) ; i--) {
			NewsContainerNode newsContainerNode = new NewsContainerNode();
			if(fullText!=null) {
				newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.searchPagePath + "."+i)+"?fullText= "+fullText);
				newsContainerNode.setFullFilterUrl(this.searchPagePath + "."+i+"?fullText= "+fullText);
			} else {
				newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.searchPagePath + "."+i));
				newsContainerNode.setFullFilterUrl(this.searchPagePath + "."+i);
			}
			newsContainerNode.setFilterText(String.valueOf(i));
			filterUrls.add(newsContainerNode);
		}
		NewsContainerNode newsContainerNode = new NewsContainerNode();
		if(fullText!=null){
			newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.searchPagePath + "."+"archive"+"."+navYears)+"?fullText= "+fullText);
			newsContainerNode.setFullFilterUrl(this.searchPagePath + "."+"archive"+"."+navYears+"?fullText= "+fullText);
		}else {
			newsContainerNode.setFilterUrl(PathResolver.getShortURLPath(this.searchPagePath + "."+"archive"+"."+navYears));
			newsContainerNode.setFullFilterUrl(this.searchPagePath + "."+"archive"+"."+navYears);
		}
		
		newsContainerNode.setFilterText(this.archiveLabel);
		filterUrls.add(newsContainerNode);
		
		
		return filterUrls;
	}
	
	
	
	public String getHeaderText() {
		return headerText;
	}
	public String getSearchText() {
		return searchText;
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
