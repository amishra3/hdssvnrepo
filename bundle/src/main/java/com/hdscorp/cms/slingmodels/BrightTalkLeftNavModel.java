package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.dao.TagResults;
import com.hdscorp.cms.util.MultifieldUtil;

/**
 * Sling model for Bright Talk Left Nav Pannel
 * 
 * @author gokula.nand
 *
 */

@Model(adaptables = { Resource.class })
public class BrightTalkLeftNavModel  extends MultifieldUtil{
	@Inject
	private ResourceResolver resourceResolver;
	
	@Inject
	@Named("btlpfeaturedlabel")
	@Default(values = { "Featured" })
	private String btlpfeaturedlabel;
	
	@Inject
	@Named("btlpfeaturedtypes")
	@Default(values = { "Feature Types" })
	private String[] btlpfeaturedtypes;

	private List<Map<String, List<TagResults>>> featuredTag;
	
	public String getBtlpfeaturedlabel() {
		return btlpfeaturedlabel;
	}

	
	public List<Map<String, Object>> getBtlpfeaturedtypes() {
		return super.getMultiFieldPanelValues(btlpfeaturedtypes);
	}


	public List<Map<String, List<TagResults>>> getFeaturedTag() {
		
		featuredTag = new ArrayList<Map<String, List<TagResults>>>();
		Map<String, List<TagResults>> resultMap = new HashMap<>();
		TagManager tm = resourceResolver.adaptTo(TagManager.class);
		List<Map<String, Object>> list = getBtlpfeaturedtypes();
		if(list!=null && list.size()>0){
		Object[] values = new Object[list.size()];
		for (Map<String, Object> map : list) {
			int index = 0;
			String labelKey = "";
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				String key = entry.getKey();
				if (key.equalsIgnoreCase("btlplabel")) {
					labelKey = entry.getValue().toString();
					// resultMap.put(entry.getValue().toString(), "");
				}

				else if (key.equalsIgnoreCase("btlptag")) {
					// Object value = entry.getValue();
					values[index] = entry.getValue();
					String[] strings = values[index].toString().replace("[", "").replace("]", "").replace("\"", "")
							.split(",");

					StringBuffer sb = new StringBuffer();

					List<TagResults> tagsResult = new ArrayList();
					for (int count = 0; count < strings.length; count++) {
						TagResults tags = new TagResults();
						Tag tag = tm.resolve((String) strings[count]);
						tags.setTagId(tag.getTagID());
						tags.setTagName(tag.getName());
						tags.setTitle(tag.getTitle());
						tagsResult.add(tags);
						sb.append(tag.getTagID() + "-" + tag.getName());
					}
					if (!resultMap.containsKey(labelKey)) {
						resultMap.put(labelKey, tagsResult);
					}

				}

			}

		}
		}
		featuredTag.add(resultMap);
		return featuredTag;		
	}
	
	
	
}
