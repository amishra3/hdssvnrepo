package com.hdscorp.cms.search;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resources;
import javax.jcr.RepositoryException;

import org.apache.commons.codec.binary.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.hdscorp.cms.constants.PageConstants;
import com.hdscorp.cms.exception.SystemException;
import com.hdscorp.cms.util.JcrUtilService;

@Component(immediate = true, metatype = true)
@Service(value = SearchServiceHelper.class)
@Properties({
		@Property(name = "service.pid", value = "com.hdscorp.cms.service.SearchServiceHelper", propertyPrivate = false),
		@Property(name = "service.description", value = "Search service", propertyPrivate = false),
		@Property(name = "service.vendor", value = "HDS Corp", propertyPrivate = false) })
public class SearchServiceHelper {

	@Reference
	private QueryBuilder queryBuilder;

	public List<Hit> getTagBasedResuts(String[] paths, String[] tags,
			String template, String type) {

		System.out.println("in side service");
		long startTime = Calendar.getInstance().getTimeInMillis();
		System.out.println("start time*************"
				+ Calendar.getInstance().getTimeInMillis());
		Map<String, String> searchParams = new HashMap<String, String>();

		if (type != null && !type.isEmpty()) {
			searchParams.put("type", type);
		}

		searchParams.put("group.1_group.p.or", "true");
		int i = 0;
		for (String path : paths) {

			searchParams.put("group.1_group." + ++i + "_path", path);

		}

		searchParams.put("group.2_group.p.and", "true");
		searchParams.put("group.2_group.1_property",
				"@jcr:content/metadata/cq:tags");
		int k = 0;
		for (String tag : tags) {

			searchParams.put("group.2_group.1_property." + ++k + "_value", tag);

		}

		if (template != null && !template.isEmpty()) {
			searchParams.put("group.2_group.2_property",
					"@jcr:content/cq:template");
			searchParams.put("group.2_group.2_property.1_value", template);
		}

		searchParams.put("group.p.and", "true");
		searchParams.put("p.guesstotal", "true");
		searchParams.put("p.offset", "0");
		searchParams.put("p.limit", "10");
		System.out.println("before cretae query************"
				+ searchParams.toString());
		Query query = queryBuilder.createQuery(
				PredicateGroup.create(searchParams),
				JcrUtilService.getSession());
		SearchResult result = query.getResult();
		List<Hit> hits = result.getHits();
		System.out.println("No of hits***********" + hits.size());
		long endTime = Calendar.getInstance().getTimeInMillis();
		long time = endTime - startTime;
		System.out.println("end time*****" + endTime);
		System.out.println("Total time *************" + time / 1000);

		return hits;

	}

}
