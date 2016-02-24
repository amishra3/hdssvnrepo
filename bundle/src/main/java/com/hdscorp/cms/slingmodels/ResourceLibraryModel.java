package com.hdscorp.cms.slingmodels;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.hdscorp.cms.util.MultifieldUtil;

@Model(adaptables = Resource.class)
public class ResourceLibraryModel extends MultifieldUtil {
	@Inject
	@Named("resultsmessage")
	@Default(values = { "resultsmessage" })
	private String resultsMessage;

	@Inject
	@Named("searchtextboxmessagetext")
	@Default(values = { "searchtextboxmessagetext" })
	private String searchTextboxMessageText;

	@Inject
	@Named("resourcelocations")
	@Default(values = { "resourcelocations" })
	private String[] resourceLocations;

	@Inject
	@Named("featuredlabel")
	@Default(values = { "featuredlabel" })
	private String featuredLabel;

	@Inject
	@Named("featuredoverlaypath")
	@Default(values = { "featuredoverlaypath" })
	private String featuredOverlayPath;

	@Inject
	@Named("categories")
	@Default(values = { "categories" })
	private String[] categories;

	@Inject
	@Named("clearallfilterslabel")
	@Default(values = { "clearallfilterslabel" })
	private String clearAllFiltersLabel;

	@Inject
	@Named("filterbyindustrylabel")
	@Default(values = { "filterbyindustrylabel" })
	private String filterByIndustryLabel;

	@Inject
	@Named("labelandtags")
	@Default(values = { "labelandtags" })
	private String[] labelAndTags;

	@Inject
	@Named("resourceregionbylabel")
	@Default(values = { "resourceregionbylabel" })
	private String resourceRegionbyLabel;

	@Inject
	@Named("filterbycontenttype")
	@Default(values = { "filterbycontenttype" })
	private String[] filterByContentType;

	public String getResultsMessage() {
		return resultsMessage;
	}

	public String getSearchTextboxMessageText() {
		return searchTextboxMessageText;
	}

	public String[] getResourceLocations() {
		return resourceLocations;
	}

	public String getFeaturedLabel() {
		return featuredLabel;
	}

	public String getFeaturedOverlayPath() {
		return featuredOverlayPath;
	}

	public List<Map<String, Object>> getCategories() {
		return super.getMultiFieldPanelValues(categories);
	}

	public String getClearAllFiltersLabel() {
		return clearAllFiltersLabel;
	}

	public String getFilterByIndustryLabel() {
		return filterByIndustryLabel;
	}

	public List<Map<String, Object>> getLabelAndTags() {
		return super.getMultiFieldPanelValues(labelAndTags);
	}

	public String getResourceRegionbyLabel() {
		return resourceRegionbyLabel;
	}

	public List<Map<String, Object>> getFilterByContentType() {
		return super.getMultiFieldPanelValues(filterByContentType);
	}

}
