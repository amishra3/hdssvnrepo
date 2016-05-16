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
/**
 * Sling model for NewsInsightExplorerVerticalContainer component
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class NewsInsightExplorerVerticalContainerModel {
	private static final Logger log = LoggerFactory.getLogger(NewsInsightExplorerVerticalContainerModel.class);
	@Inject
	@Named("nivcmuultifield")
	@Default(values = { "Labels" })
	private String[] nivcMuultifield;

	private List<Map<String, String>> nivcList;

	public String[] getNivcMuultifield() {
		return nivcMuultifield;
	}

	public List<Map<String, String>> getNivcList() {
		String[] listofObject = getNivcMuultifield();
		nivcList = new ArrayList<Map<String, String>>();
		for (int index = 0; index < listofObject.length; index++) {
			Map<String, String> map = new HashMap<String, String>();

			try {
				JSONObject json = new JSONObject(listofObject[index]);
				map.put(json.getString("nilesectionlabel"), json.getString("nilesectionlink").concat("$").concat(json.getString("nileopeninnewwindow")));
				nivcList.add(map);
			} catch (Exception e) {
				log.info("Exception during parsing the JSON " + e);
			}

		}
		log.info("List of map result::" + nivcList);
		return nivcList;

	}

}
