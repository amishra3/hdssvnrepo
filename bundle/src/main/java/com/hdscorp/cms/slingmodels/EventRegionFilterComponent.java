package com.hdscorp.cms.slingmodels;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.hdscorp.cms.util.MultifieldUtil;

/**Sling model for Event region and Filter component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class EventRegionFilterComponent extends MultifieldUtil {
	@Inject
	@Named("eshownfrom")
	@Default(values = { "eshownfrom" })
	private String eshownfrom;

	@Inject
	@Named(" 	")
	@Default(values = { "eupdatelabel" })
	private String eupdatelabel;

	@Inject
	@Named("eallevent")
	@Default(values = { "eallevent" })
	private String eallevent;
	@Inject
	@Named("efilterbylabel")
	@Default(values = { "efilterbylabel" })
	private String efilterbylabel;
	



	@Inject
	@Named("eventtypes")
	@Default(values = { "eventtypes" })
	private String[] eventtypes;

	
	@Inject
	@Named("regions")
	@Default(values = { "regions" })
	private String[] regions;
	
	
	public String getEshownfrom() {
		return eshownfrom;
	}

	public String getEupdatelabel() {
		return eupdatelabel;
	}

	public String getEallevent() {
		return eallevent;
	}
	public String getEfilterbylabel() {
		return efilterbylabel;
	}
	public List<Map<String, Object>> getEventtypes() {
		return super.getMultiFieldPanelValues(eventtypes);
	}



	public List<Map<String, Object>> getRegions() {
		return super.getMultiFieldPanelValues(regions);
	}
	
	

}
