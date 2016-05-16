package com.hdscorp.cms.slingmodels;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.hdscorp.cms.util.MultifieldUtil;
/** Sling model for LocationsFilterDropDown component
 * 
 * @author ramana
 *
 */
@Model(adaptables = Resource.class)
public class LocationsDropDownFilterModel extends MultifieldUtil {

	@Inject
	@Named("jcr:locallregionslabel")
	@Default(values = { "All Regions" })
	private String locAllRegionsLabel;

	@Inject
	@Named("jcr:locregions")
	@Default(values = { "regions" })
	private String[] locRegions;

	public String getLocAllRegionsLabel() {
		return locAllRegionsLabel;
	}

	public List<Map<String, Object>> getLocRegions() {
		return super.getMultiFieldPanelValues(locRegions);
	}

}
