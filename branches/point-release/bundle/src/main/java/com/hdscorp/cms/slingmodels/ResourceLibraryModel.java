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
	@Named("filterbyindustry")
	@Default(values = { "" })
	private String[] filterByIndustry;

	@Inject
	@Named("filterbycontenttype")
	@Default(values = { "" })
	private String[] filterByContentType;

	public List<Map<String, Object>> getFilterByIndustry() {
		return super.getMultiFieldPanelValues(filterByIndustry);
	}

	public List<Map<String, Object>> getFilterByContentType() {
		return super.getMultiFieldPanelValues(filterByContentType);
	}

}
