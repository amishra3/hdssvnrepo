package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.dao.TagResults;
import com.hdscorp.cms.util.MultifieldUtil;

/**
 * Sling model for Event region and Filter component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class EventRegionFilterComponent extends MultifieldUtil {
	private static final Logger log = LoggerFactory.getLogger(EventRegionFilterComponent.class);
	@Inject
	private ResourceResolver resourceResolver;

	@Inject
	@Named("eshownfrom")
	@Default(values = { "Showing From" })
	private String eshownfrom;

	@Inject
	@Named("eshownto")
	@Default(values = { "To" })
	private String eshownto;

	@Inject
	@Named("eupdatelabel")
	@Default(values = { "Update" })
	private String eupdatelabel;

	@Inject
	@Named("eallevent")
	@Default(values = { "All Events" })
	private String eallevent;
	@Inject
	@Named("efilterbylabel")
	@Default(values = { "Filter By Region" })
	private String efilterbylabel;

	@Inject
	@Named("efseenextthreemonthmessage")
	@Default(values = { "See Next 3 Months of Events" })
	private String seenextthreemonth;
	
	@Inject
	@Named("eventtypes")
	@Default(values = { "eventtypes" })
	private String[] eventtypes;

	@Inject
	@Named("regions")
	@Default(values = { "regions" })
	private String[] regions;

	private List<Map<String, List<TagResults>>> eventTag;

	private List<Map<String, List<TagResults>>> regionTag;

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

	public String getEshownto() {
		return eshownto;
	}


	public String getSeenextthreemonth() {
		return seenextthreemonth;
	}

	public List<Map<String, List<TagResults>>> getEventTag() {
		eventTag = new ArrayList<Map<String, List<TagResults>>>();
		Map<String, List<TagResults>> resultMap = new HashMap<>();
		TagManager tm = resourceResolver.adaptTo(TagManager.class);
		List<Map<String, Object>> list = getEventtypes();
		if(list!=null && list.size()>0){
		Object[] values = new Object[list.size()];
		for (Map<String, Object> map : list) {
			int index = 0;
			String labelKey = "";
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				String key = entry.getKey();
				if (key.equalsIgnoreCase("elabel")) {
					labelKey = entry.getValue().toString();
					// resultMap.put(entry.getValue().toString(), "");
				}

				else if (key.equalsIgnoreCase("econtenttag")) {
					// Object value = entry.getValue();
					values[index] = entry.getValue();
					String[] strings = values[index].toString().replace("[", "").replace("]", "").replace("\"", "")
							.split(",");

					StringBuffer sb = new StringBuffer();

					List<TagResults> tagsResult = new ArrayList();
					for (int count = 0; count < strings.length; count++) {
						TagResults tags = new TagResults();
						Tag tag = tm.resolve((String) strings[count]);
						if(tag!=null){
						tags.setTagId(tag.getTagID());
						tags.setTagName(tag.getName());
						tags.setTitle(tag.getTitle());
						tagsResult.add(tags);
						sb.append(tag.getTagID() + "-" + tag.getName());
						}
					}
					if (!resultMap.containsKey(labelKey)) {
						resultMap.put(labelKey, tagsResult);
					}

				}

			}

		}
		}
		eventTag.add(resultMap);
		return eventTag;
	}
	
	public List<Map<String, List<TagResults>>> getRegionTag() {
		regionTag = new ArrayList<Map<String, List<TagResults>>>();
		Map<String, List<TagResults>> resultMap = new LinkedHashMap<>();
		TagManager tm = resourceResolver.adaptTo(TagManager.class);
		List<Map<String, Object>> list = getRegions();
		if(list!=null && list.size()>0){
		Object[] values = new Object[list.size()];
		for (Map<String, Object> map : list) {
			int index = 0;
			String labelKey = "";
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				String key = entry.getKey();
				if (key.equalsIgnoreCase("eregionlabel")) {
					labelKey = entry.getValue().toString();
					// resultMap.put(entry.getValue().toString(), "");
				}

				else if (key.equalsIgnoreCase("eregionsttag")) {
					// Object value = entry.getValue();
					values[index] = entry.getValue();
					String[] strings = values[index].toString().replace("[", "").replace("]", "").replace("\"", "")
							.split(",");

					StringBuffer sb = new StringBuffer();

					List<TagResults> tagsResult = new ArrayList();
					for (int count = 0; count < strings.length; count++) {
						TagResults tags = new TagResults();
						Tag tag = tm.resolve((String) strings[count]);
						if(tag!=null){
						tags.setTagId(tag.getTagID());
						tags.setTagName(tag.getName());
						tags.setTitle(tag.getTitle());
						tagsResult.add(tags);
						sb.append(tag.getTagID() + "-" + tag.getName());
						}
					}
					if (!resultMap.containsKey(labelKey)) {
						resultMap.put(labelKey, tagsResult);
					}

				}

			}

		}
	}
		//resultMap = new TreeMap<String, List<TagResults>>(resultMap);
		regionTag.add(resultMap);
		return regionTag;
	}

	
}
