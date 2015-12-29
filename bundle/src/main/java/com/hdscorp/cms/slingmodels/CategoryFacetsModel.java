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
public class CategoryFacetsModel extends MultifieldUtil{
	@Inject
	@Named("allCategoriesLabel")
	@Default(values = { "allCategoriesLabel" })
	private String allCategoriesLabel;
	
	@Inject
	@Named("categories")
	@Default(values = { "categories" })
	private String[] categories;
	
	
	
	public String getAllCategoriesLabel() {
		return allCategoriesLabel;
	}

	public List<Map<String, Object>> getCategories() {
		return super.getMultiFieldPanelValues(categories);
	}
	

	
}
