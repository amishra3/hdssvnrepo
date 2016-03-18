package com.hdscorp.cms.search;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.Predicate;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
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

	private static final Logger LOG = LoggerFactory
			.getLogger(SearchServiceHelper.class);
	private static final String TYPE = "cq:Page";
	private static final String ORDER_BY_PROPERTY = "@jcr:score";
	private static final String PR_ORDER_BY_PROPERTY = "@jcr:content/pressrelease/pressreleasedate";
	private static final String NEWS_ORDER_BY_PROPERTY = "@jcr:content/newsdetail/newsdate";
	private static final String AWARDS_ORDER_BY_PROPERTY = "@jcr:content/awarddetail/awarddate";
	private static final String ORDER_BY_SORT = "desc";
	private static final String ARCHIVE = "archive";

	public SearchResult getTagBasedResuts(String[] paths, String[] tags,
			String template, String type,String orderByProperty,
			String orderBySort) {

		
		Map<String, String> searchParams = new HashMap<String, String>();

		if (type != null && !type.isEmpty()) {
			searchParams.put("type", type);
		}

		searchParams.put("group.1_group.p.or", "true");
		int i = 0;
		for (String path : paths) {
			searchParams.put("group.1_group." + ++i + "_path", path);
		}

		if(tags!=null) {
			searchParams.put("group.2_group.p.and", "true");
			searchParams.put("group.2_group.1_property", "jcr:content/cq:tags");
			int k = 0;
			for (String tag : tags) {
				searchParams.put("group.2_group.1_property." + ++k + "_value", tag);
			}
		}
		

		if (template != null && !template.isEmpty()) {
			searchParams.put("group.2_group.2_property","@jcr:content/cq:template");
			searchParams.put("group.2_group.2_property.1_value", template);
		}

		searchParams.put("group.p.and", "true");
		searchParams.put("p.guesstotal", "true");
		searchParams.put("p.offset", "0");
		searchParams.put("p.limit", "-1");
		if (orderByProperty != null && !orderByProperty.isEmpty()) {
			searchParams.put("orderby", orderByProperty);
		} else {
			searchParams.put("orderby", ORDER_BY_PROPERTY);
		}
		if (orderBySort != null && !orderBySort.isEmpty()) {
			searchParams.put("orderby.sort", ORDER_BY_SORT);
		} else {
			searchParams.put("orderby.sort", "desc");
		}
		LOG.info("before cretae query************" + searchParams.toString());
		Query query = queryBuilder.createQuery(PredicateGroup.create(searchParams),JcrUtilService.getSession());
		SearchResult result = query.getResult();
		
		return result;
	}

	public SearchResult getPressReleases(String filter, String path, int noOfYears,String fullText,String limit,String offSet,String searchType) {

		Map<String, String> searchParams = new HashMap<String, String>();
		PredicateGroup combinedPredicate = new PredicateGroup();

		searchParams.put("type", "cq:Page");
        if(searchType.equalsIgnoreCase("pressRelease")) {
		searchParams.put("property", "jcr:content/pressrelease/pressreleasetitle");
		searchParams.put("property.operation", "exists");
		searchParams.put("orderby.sort", "desc");
		searchParams.put("orderby", PR_ORDER_BY_PROPERTY);
        } else if(searchType.equalsIgnoreCase("news")) {
        	searchParams.put("property", "jcr:content/newsdetail/newstitle");
    		searchParams.put("property.operation", "exists");
    		searchParams.put("orderby.sort", "desc");
    		searchParams.put("orderby", NEWS_ORDER_BY_PROPERTY);
        }else {
        	searchParams.put("property", "jcr:content/awarddetail/awardtitle");
    		searchParams.put("property.operation", "exists");
    		searchParams.put("orderby.sort", "desc");
    		searchParams.put("orderby", AWARDS_ORDER_BY_PROPERTY);
        }
        if(offSet!=null){
        	searchParams.put("p.offset",offSet);
        } else {
        	searchParams.put("p.offset", "0");
        }
		
		if(limit != null) {
			
			searchParams.put("p.limit", limit);
		} else {
			searchParams.put("p.limit", "-1");
		}
		
		searchParams.put("group.p.and", "true");
		int groupCnt = 1;

		if(fullText!=null && searchType.equalsIgnoreCase("pressRelease")) {
		    searchParams.put("group." + groupCnt + "_group.p.or", "true");
			searchParams.put("group." + groupCnt + "_group.1_fulltext",fullText);
			searchParams.put("group." + groupCnt+ "_group.1_fulltext.relPath", "jcr:content/@cq:tags");
			searchParams.put("group." + groupCnt + "_group.2_fulltext",fullText);
			searchParams.put("group." + groupCnt + "_group.2_fulltext.relPath","jcr:content/pressrelease/@pressreleasetitle");
			searchParams.put("group." + groupCnt + "_group.3_fulltext",fullText);
			searchParams.put("group." + groupCnt+ "_group.3_fulltext.relPath","jcr:content/pressrelease/@pressreleasedesc");
		}else if(fullText!=null && searchType.equalsIgnoreCase("news")){
		    searchParams.put("group." + groupCnt + "_group.p.or", "true");
			searchParams.put("group." + groupCnt + "_group.1_fulltext",fullText);
			searchParams.put("group." + groupCnt+ "_group.1_fulltext.relPath", "jcr:content/@cq:tags");
			searchParams.put("group." + groupCnt + "_group.2_fulltext",fullText);
			searchParams.put("group." + groupCnt + "_group.2_fulltext.relPath","jcr:content/newsdetail/@newstitle");
		} else if(fullText!=null && searchType.equalsIgnoreCase("awards")) {
			searchParams.put("group." + groupCnt + "_group.p.or", "true");
			searchParams.put("group." + groupCnt + "_group.1_fulltext",fullText);
			searchParams.put("group." + groupCnt+ "_group.1_fulltext.relPath", "jcr:content/@cq:tags");
			searchParams.put("group." + groupCnt + "_group.2_fulltext",fullText);
			searchParams.put("group." + groupCnt + "_group.2_fulltext.relPath","jcr:content/awarddetail/@awardtitle");
		}
      
		if(filter!=null) {
		
			if (!filter.equalsIgnoreCase(ARCHIVE)) {
				
				path = path + "/" + filter;
				searchParams.put("path", path);
				combinedPredicate = PredicateGroup.create(searchParams);
			} else {
				
				
				searchParams.put("path", path);
				PredicateGroup doNotSearchGroup = new PredicateGroup();
				int year = Calendar.getInstance().get(Calendar.YEAR);
				
				for (int i = year; i >(year - noOfYears); i--) {
	
					Predicate excludePathPredicate = new Predicate("path").set(
							"path", path + "/" + i);
					doNotSearchGroup.add(excludePathPredicate);
				}
	
				doNotSearchGroup.setAllRequired(false);
				doNotSearchGroup.setNegated(true);
				combinedPredicate = PredicateGroup.create(searchParams);
				combinedPredicate.add(doNotSearchGroup);
	
			}
		} else {
			searchParams.put("path", path);
			combinedPredicate = PredicateGroup.create(searchParams);
		}
		Query query = queryBuilder.createQuery(combinedPredicate,JcrUtilService.getSession());
		
		SearchResult result = query.getResult();
		return result;

	}

	private void getSingleTypeTagSearchParams(Map<String, String> searchParams,
			String[] tags, String[] types, int groupCnt) {

		for (String type : types) {

			if (type.equals(TYPE)) {

				searchParams.put("group." + groupCnt + "_group.1_property",
						"jcr:content/cq:tags");

			} else {
				searchParams.put("group." + groupCnt + "_group.1_property",
						"jcr:content/metadata/cq:tags");

			}
			int k = 0;
			for (String tag : tags) {
				searchParams.put("group." + groupCnt + "_group.1_property."
						+ ++k + "_value", tag);
			}
		}

	}

	private void getMultipleTypeTagSearchParams(
			Map<String, String> searchParams, String[] tags, int groupCnt) {

		searchParams.put("group." + groupCnt + "_group.1_group.1_property",
				"jcr:content/cq:tags");
		searchParams.put("group." + groupCnt + "_group.2_group.1_property",
				"jcr:content/metadata/cq:tags");
		int k = 0;
		for (String tag : tags) {
			searchParams.put("group." + groupCnt + "_group.1_group.1_property."
					+ ++k + "_value", tag);
			searchParams.put("group." + groupCnt + "_group.2_group.1_property."
					+ ++k + "_value", tag);
		}

	}

	private void getSingleTypeFullTextSearchParams(
			Map<String, String> searchParams, String searchKeyword,
			String[] types, int groupCnt) {
		for (String type : types) {

			if (type.equals(TYPE)) {

				/*
				 * searchParams.put("group." + groupCnt + "_group.1_fulltext",
				 * searchKeyword); searchParams.put("group." + groupCnt +
				 * "_group.1_fulltext.relPath", "jcr:content");
				 */
				searchParams.put("group." + groupCnt + "_group.1_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.1_fulltext.relPath", "jcr:content/@cq:tags");
				searchParams.put("group." + groupCnt + "_group.2_fulltext",
						searchKeyword);
				searchParams
						.put("group." + groupCnt + "_group.2_fulltext.relPath",
								"jcr:content/@jcr:title");
				searchParams.put("group." + groupCnt + "_group.3_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.3_fulltext.relPath",
						"jcr:content/@jcr:description");
			} else {

				/*
				 * searchParams.put("group." + groupCnt + "_group.1_fulltext",
				 * searchKeyword); searchParams.put("group." + groupCnt +
				 * "_group.1_fulltext.relPath", "jcr:content");
				 */
				/*
				 * searchParams.put("group." + groupCnt + "_group.2_fulltext",
				 * searchKeyword); searchParams.put("group." + groupCnt +
				 * "_group.2_fulltext.relPath", "jcr:content/metadata");
				 */
				searchParams.put("group." + groupCnt + "_group.1_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.1_fulltext.relPath",
						"jcr:content/metadata/@cq:tags");
				searchParams.put("group." + groupCnt + "_group.2_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.2_fulltext.relPath",
						"jcr:content/metadata/@dc:title");
				searchParams.put("group." + groupCnt + "_group.3_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.3_fulltext.relPath",
						"jcr:content/metadata/@jcr:description");
				searchParams.put("group." + groupCnt + "_group.4_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.4_fulltext.relPath",
						"jcr:content/metadata/@pdfx:Comments");
				searchParams.put("group." + groupCnt + "_group.5_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.5_fulltext.relPath",
						"jcr:content/metadata/@pdfx:Company");
				searchParams.put("group." + groupCnt + "_group.6_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.6_fulltext.relPath",
						"jcr:content/metadata/@pdf:Keywords");
				searchParams.put("group." + groupCnt + "_group.7_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.7_fulltext.relPath",
						"jcr:content/metadata/@dc:description");
				searchParams.put("group." + groupCnt + "_group.8_fulltext",
						searchKeyword);
				searchParams.put("group." + groupCnt
						+ "_group.8_fulltext.relPath",
						"jcr:content/metadata/@keywords");
			}
		}
	}

	private void getMultipleTypeFullTextSearchParams(
			Map<String, String> searchParams, String searchKeyword, int groupCnt) {

		searchParams.put("group." + groupCnt + "_group.1_group.p.or", "true");
		searchParams.put("group." + groupCnt + "_group.2_group.p.or", "true");
		/*
		 * searchParams.put("group." + groupCnt + "_group.1_fulltext",
		 * searchKeyword); searchParams.put("group." + groupCnt +
		 * "_group.1_fulltext.relPath", "jcr:content");
		 * searchParams.put("group." + groupCnt + "_group.2_fulltext",
		 * searchKeyword); searchParams.put("group." + groupCnt +
		 * "_group.2_fulltext.relPath", "jcr:content/metadata");
		 */

		searchParams.put("group." + groupCnt + "_group.1_group.1_fulltext",
				searchKeyword);
		searchParams.put("group." + groupCnt
				+ "_group.1_group.1_fulltext.relPath", "jcr:content/@cq:tags");
		searchParams.put("group." + groupCnt + "_group.1_group.2_fulltext",
				searchKeyword);
		searchParams
				.put("group." + groupCnt + "_group.1_group.2_fulltext.relPath",
						"jcr:content/@jcr:title");
		searchParams.put("group." + groupCnt + "_group.1_group.3_fulltext",
				searchKeyword);
		searchParams.put("group." + groupCnt
				+ "_group.1_group.3_fulltext.relPath",
				"jcr:content/@jcr:description");

		searchParams.put("group." + groupCnt + "_group.2_group.1_fulltext",
				searchKeyword);
		searchParams.put("group." + groupCnt
				+ "_group.2_group.1_fulltext.relPath",
				"jcr:content/metadata/@cq:tags");

		searchParams.put("group." + groupCnt + "_group.2_group.2_fulltext",
				searchKeyword);
		searchParams.put("group." + groupCnt
				+ "_group.2_group.2_fulltext.relPath",
				"jcr:content/metadata/@jcr:title");

		searchParams.put("group." + groupCnt + "_group.2_group.3_fulltext",
				searchKeyword);

		searchParams.put("group." + groupCnt
				+ "_group.2_group.3_fulltext.relPath",
				"jcr:content/metadata/@pdfx:Comments");
		searchParams.put("group." + groupCnt + "_group.2_group.4_fulltext",
				searchKeyword);
		searchParams.put("group." + groupCnt
				+ "_group.2_group.4_fulltext.relPath",
				"jcr:content/metadata/@pdfx:Company");
		searchParams.put("group." + groupCnt + "_group.2_group.5_fulltext",
				searchKeyword);
		searchParams.put("group." + groupCnt
				+ "_group.2_group.5_fulltext.relPath",
				"jcr:content/metadata/@pdf:Keywords");
		searchParams.put("group." + groupCnt + "_group.2_group.6_fulltext",
				searchKeyword);
		searchParams.put("group." + groupCnt
				+ "_group.2_group.6_fulltext.relPath",
				"jcr:content/metadata/@jcr:description");
	}

	public SearchResult getFullTextBasedResuts(String[] paths, String[] tags,
			String template, String[] types, String searchKeyword,
			boolean doPagination, String returnOffset, String returnLimit,
			ResourceResolver resourceResolver, String orderByProperty,
			String orderBySort) {

		Map<String, String> searchParams = new HashMap<String, String>();

		int groupCnt = 1;

		if (types != null && types.length > 0) {

			searchParams.put("group." + groupCnt + "_group.p.or", "true");
			int j = 0;
			for (String type : types) {
				searchParams.put("group." + groupCnt + "_group." + ++j
						+ "_type", type);
			}
			groupCnt++;

		} else {
			searchParams.put("type", TYPE);
		}

		if (paths != null && paths.length > 0) {
			searchParams.put("group." + groupCnt + "_group.p.or", "true");
			int i = 0;
			for (String path : paths) {
				searchParams.put("group." + groupCnt + "_group." + ++i
						+ "_path", path);
			}
			groupCnt++;
		}

		if (tags != null && tags.length > 0) {
			searchParams.put("group." + groupCnt + "_group.p.facets", "true");
			searchParams.put("group." + groupCnt + "_group.p.or", "true");
			if (types != null && types.length == 1) {
				getSingleTypeTagSearchParams(searchParams, tags, types,
						groupCnt);

			} else {
				getMultipleTypeTagSearchParams(searchParams, tags, groupCnt);
			}
			groupCnt++;
		}

		if(types != null && types.length == 1) {
			if (!types[0].equals(TYPE)) {
				
			
			searchParams.put("group." + groupCnt + "_group.1_property", "jcr:content/metadata/dc:title");
			searchParams.put("group." + groupCnt + "_group.1_property.operation", "exists");
			
			groupCnt++;
			}
		}
		
		
		if (template != null && !template.isEmpty()) {
			if(template.contains(",")){
				String [] templates = template.split(",");
				searchParams.put("group." + groupCnt + "_group.p.or", "true");
				int i = 0;
				searchParams.put("group." + groupCnt + "_group." + 1
						+ "_property", "@jcr:content/cq:template");
				for (String pageTemplate : templates) {
					++i;
					searchParams.put("group." + groupCnt + "_group." + 1
							+ "_property."+ i+"_value", pageTemplate);

				}
				groupCnt++;

			}else{
				searchParams.put("group." + groupCnt + "_group.1_property",
						"@jcr:content/cq:template");
				searchParams.put("group." + groupCnt + "_group.1_property.1_value",
						template);
				groupCnt++;
			}
		}

		
		if (searchKeyword != null) {
			searchParams.put("group." + groupCnt + "_group.p.or", "true");
			if (types != null && types.length == 1) {
				getSingleTypeFullTextSearchParams(searchParams, searchKeyword,
						types, groupCnt);
			} else {
				getMultipleTypeFullTextSearchParams(searchParams,
						searchKeyword, groupCnt);
			}

		}

		searchParams.put("p.guesstotal", "false");

		if (doPagination) {
			searchParams.put("p.offset", returnOffset);
			searchParams.put("p.limit", returnLimit);
		} else {
			searchParams.put("p.offset", "0");
			searchParams.put("p.limit", "-1");
		}
		// searchParams.put("group.p.and", "true");
		// searchParams.put("p.facets", "true");

		if (orderByProperty != null && !orderByProperty.isEmpty()) {
			searchParams.put("orderby", orderByProperty);
		} else {
			searchParams.put("orderby", ORDER_BY_PROPERTY);
		}
		if (orderBySort != null && !orderBySort.isEmpty()) {
// Not needed as by default sort would be ascending			
//			searchParams.put("orderby.sort", ORDER_BY_SORT);
		} else {
			searchParams.put("orderby.sort", "desc");
		}
//		System.out.println("before cretae query************"
//				+ searchParams.toString());
		LOG.debug("before cretae query************" + searchParams.toString());
		
		Query query = queryBuilder.createQuery(
				PredicateGroup.create(searchParams),
				resourceResolver.adaptTo(Session.class));
		
		SearchResult results = query.getResult();
		LOG.debug("results.getQueryStatement************" + results.getQueryStatement());
		return results;
	}


	public SearchResult getTrainingResults(String path, String searchKeyword,String startDateProperty,
			String lowerBound, String upperBound,
			ResourceResolver resourceResolver, String orderByProperty,
			String orderBySort) {

		Map<String, String> searchParams = new HashMap<String, String>();

		searchParams.put("type", TYPE);
		searchParams.put("path", path);
		searchParams.put("property", "jcr:content/jcr:title");
		searchParams.put("property.operation", "exists");
		int groupCnt = 1;
		if (lowerBound!=null || upperBound!=null ) {
			
		
		searchParams.put("group." + groupCnt + "_group.1_daterange.property",
				startDateProperty);
		
		if(lowerBound!=null && !lowerBound.isEmpty()){
		searchParams.put("group." + groupCnt + "_group.1_daterange.lowerBound",
				lowerBound);
		}
		if(upperBound!=null && !upperBound.isEmpty()){
		searchParams.put("group." + groupCnt + "_group.1_daterange.upperBound",
				upperBound);
		} 
		groupCnt++;
		}
		
		if (searchKeyword != null) {
			searchParams.put("group." + groupCnt + "_group.p.or", "true");
			
			searchParams.put("group." + groupCnt + "_group.1_fulltext",
					searchKeyword);
			searchParams.put("group." + groupCnt + "_group.1_fulltext.relPath",
					"jcr:content/@jcr:title");
			searchParams.put("group." + groupCnt + "_group.2_fulltext",
					searchKeyword);
			searchParams.put("group." + groupCnt + "_group.2_fulltext.relPath",
					"jcr:content/@jcr:description");
			searchParams.put("group." + groupCnt + "_group.3_fulltext",
					searchKeyword);
			searchParams.put("group." + groupCnt + "_group.3_fulltext.relPath",
					"jcr:content/@iltFacilityCity");
			searchParams.put("group." + groupCnt + "_group.4_fulltext",
					searchKeyword);
			searchParams.put("group." + groupCnt + "_group.4_fulltext.relPath",
					"jcr:content/@iltFacilityCountry");
			searchParams.put("group." + groupCnt + "_group.5_fulltext",
					searchKeyword);
			searchParams.put("group." + groupCnt + "_group.5_fulltext.relPath",
					"jcr:content/@iltFacilityName");
			searchParams.put("group." + groupCnt + "_group.6_fulltext",
					searchKeyword);
			searchParams.put("group." + groupCnt + "_group.6_fulltext.relPath",
					"jcr:content/@Keyword");
		}

		searchParams.put("p.guesstotal", "false");

		searchParams.put("p.offset", "0");
		searchParams.put("p.limit", "-1");

		if (orderByProperty != null && !orderByProperty.isEmpty()) {
			searchParams.put("orderby", orderByProperty);
		} else {
			searchParams.put("orderby", ORDER_BY_PROPERTY);
		}
		if (orderBySort != null && !orderBySort.isEmpty()) {
			// Not needed as by default sort would be ascending
			// searchParams.put("orderby.sort", ORDER_BY_SORT);
		} else {
			searchParams.put("orderby.sort", "desc");
		}
		// System.out.println("before cretae query************"
		// + searchParams.toString());
		LOG.debug("before cretae query************" + searchParams.toString());
		Query query = queryBuilder.createQuery(
				PredicateGroup.create(searchParams),
				resourceResolver.adaptTo(Session.class));
		SearchResult results = query.getResult();
		return results;
	}
}

