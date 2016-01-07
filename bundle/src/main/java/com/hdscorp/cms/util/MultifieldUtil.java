package com.hdscorp.cms.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.commons.json.JSONTokener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * {@link MultifieldUtil} Usefull To Retrive JSON Data From Multifields,NestedMultifields
 * @author Ramana
 *
 */
public class MultifieldUtil {

	 private final Logger LOGGER = LoggerFactory.getLogger(MultifieldUtil.class);
	 
	
	 public List<Map<String, Object>> getMultiFieldPanelValues(String[] items) {
		LOGGER.info("[MultifieldUtil]:getMultiFieldPanelValues method  Starting.");
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		if (items != null) {
			
			for (String value : items) {
				try {
					JSONObject parsed = new JSONObject(value);
					if (parsed != null) {
						Map<String, Object> columnMap = new HashMap<String, Object>();
						for (Iterator<String> iterator = parsed.keys(); iterator.hasNext();) {
							String key = iterator.next();
							String innerValue = parsed.getString(key);
							Object json = new JSONTokener(innerValue).nextValue();
							 if (json instanceof JSONArray) {
								JSONArray jsonArray = (JSONArray) json;
								List<Map<String, Object>> subCategoriesList = new ArrayList<Map<String, Object>>();
								boolean isSubCategoriesArray = true;
								for (int i = 0; i < jsonArray.length(); i++) {
									try {
										JSONObject obj = jsonArray.getJSONObject(i);
										if (obj instanceof JSONObject) {
											subCategoriesList.add(getSubCategory(obj));
										}
									} catch (Exception e) {
										// If it is array of tag values and not sub categories array
										columnMap.put(key, innerValue);
										isSubCategoriesArray = false;
										break;
									}

								}
								if (isSubCategoriesArray)
									columnMap.put(key, subCategoriesList);
							} else {

								columnMap.put(key, innerValue);
							}
						
						}
						results.add(columnMap);
					}
				} catch (JSONException e) {
					LOGGER.error("[MultifieldUtil]:getMultiFieldPanelValues ", e.getMessage());
					e.printStackTrace();
				}
			}
		}
		LOGGER.debug("[MultifieldUtil]:getMultiFieldPanelValues Category values :", results);
		LOGGER.info("[MultifieldUtil]:getMultiFieldPanelValues method  Ending.");
		return results;
	}
	 
	private Map<String, Object> getSubCategory(JSONObject parsed) {
		LOGGER.info("[MultifieldUtil]:getSubCategory  Method  Starting.");
		Map<String, Object> columnMap = new HashMap<String, Object>();
		try {
			if (parsed != null) {

				for (Iterator<String> iterator = parsed.keys(); iterator.hasNext();) {
					String key = iterator.next();
					String innerValue = parsed.getString(key);
					columnMap.put(key, innerValue);
				}
			}
		} catch (JSONException e) {
			LOGGER.error("[MultifieldUtil]:getSubCategory ", e.getMessage());
		}
		LOGGER.debug("[MultifieldUtil]:getSubCategory SubCategory Values:",columnMap);
		LOGGER.info("[MultifieldUtil]:getSubCategory  Method  Ending.");
		return columnMap;
		
	}

}
