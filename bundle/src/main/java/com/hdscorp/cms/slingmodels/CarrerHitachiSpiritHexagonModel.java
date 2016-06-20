package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.util.MultifieldUtil;

/**
 * Sling model for Carrer Hitachi Sprit Hex Component
 * @author gokula.nand
 *
 */

@Model(adaptables=Resource.class)
public class CarrerHitachiSpiritHexagonModel extends MultifieldUtil{

	private static final Logger log = LoggerFactory.getLogger(CarrerHitachiSpiritHexagonModel.class);
	
	@Inject @Named("jcr:chstitle") @Default(values="Hexagon Title")
	private String chsTitle;
	

	@Inject @Named("jcr:chsdescription") @Default(values="HexagonDescription")
	private String chsDescription;
	

	@Inject @Named("jcr:chsbackgroundimage") @Default(values="/content/dam/geometrixx-outdoors/logo.png")
	private String chsBackgroundImage;
	

	@Inject @Named("jcr:hexagondata") @Default(values="Hexagon Data")
	private String[] hexagonData;

	private List<Map<String, String>> chsHexagonList;
	
	public String getChsTitle() {
		return chsTitle;
	}


	public String getChsDescription() {
		return chsDescription;
	}


	public String getChsBackgroundImage() {
		return chsBackgroundImage;
	}


	public String[] getHexagonData() {
		return hexagonData;
	}
	
	

	public List<Map<String, String>> getChsHexagonList() {
		String[] listofObject = getHexagonData();
		chsHexagonList = new ArrayList<Map<String, String>>();
		for (int index = 0; index < listofObject.length; index++) {
			Map<String, String> map = new HashMap<String, String>();

			try {	
				JSONObject json = new JSONObject(listofObject[index]);
				map.put(json.getString("headline"), json.getString("chshexagondescription"));	
				chsHexagonList.add(map);
			} catch (Exception e) {
				log.info("Exception during parsing the JSON " + e);
			}

		}
		log.info("List of map result::" + chsHexagonList);
		return chsHexagonList;

	}

	
}
