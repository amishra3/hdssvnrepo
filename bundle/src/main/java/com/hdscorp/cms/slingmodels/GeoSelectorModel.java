package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.dao.GeoSelector;

@Model(adaptables = Resource.class)
public class GeoSelectorModel {
	private static final Logger log = LoggerFactory.getLogger(GeoSelectorModel.class);
		
	@Inject
	@Named("regions")
	@Default(values = { "All Regions" })
	private String[] regions;
	
	public List<GeoSelector> getRegions() {
		log.info("start execution of getRegions ()");
		List<GeoSelector> listRegionsObject = new ArrayList<GeoSelector>();

		try {
			for (int index = 0; index < regions.length; index++) {
				JSONObject jsonObject = new JSONObject(regions[index]);
				GeoSelector geoRegion = null;
				if (jsonObject != null) {
					
					geoRegion = new GeoSelector();
					geoRegion.setRegionLabel(jsonObject.getString("regionlabel"));
					geoRegion.setRegionId(jsonObject.getString("regionid"));
					
					JSONArray jsonArrayObject = new JSONArray(jsonObject.getString("regioncountries"));
					if (jsonArrayObject.length() > 0) {
						List<GeoSelector> countries = new ArrayList<GeoSelector>();
						for (int regCount = 0; regCount < jsonArrayObject.length(); regCount++) {
							JSONObject jsonRegObject = new JSONObject(jsonArrayObject.get(regCount).toString());
							GeoSelector geoRegionCountries = new GeoSelector();
							geoRegionCountries.setCountryLabel(jsonRegObject.getString("countrylabel"));
							geoRegionCountries.setCountrytargetUrl(jsonRegObject.getString("countrytargeturl"));
							geoRegionCountries.setOpeninnewwindow(jsonRegObject.getString("openinnewwindow"));
							
							countries.add(geoRegionCountries);
						}
						geoRegion.setCountries(countries);
					}

				}
				listRegionsObject.add(geoRegion);
			}
		} catch (Exception e) {
			log.error("Error while fetching data from Regions: " + e);

		}
		return listRegionsObject;

	}
	
	
}
