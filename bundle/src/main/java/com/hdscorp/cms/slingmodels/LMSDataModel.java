package com.hdscorp.cms.slingmodels;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.constants.PageConstants;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.restservice.LMSBean;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ServiceUtil;
import com.hdscorp.cms.util.ViewHelperUtil;

/**
 * Sling model for getting all search based on keyword and date filters for LMS.
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
public class LMSDataModel {
	private static final Logger log = LoggerFactory.getLogger(LMSDataModel.class);

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	private ResourceResolver resourceResolver;

	private List<LMSBean> lmsBeanNode;

	public HashMap<String, List<LMSBean>> maplmsBeanList;

	@Inject
	@Named("tdsearchlookuppath")
	@Default(values = { "/content/hdscorp/en_us/lookup/lmsdata" })
	private String searchlookuppath;

	@Inject
	@Named("tdnoofitemsshowinpage")
	@Default(values = { "10" })
	private String noOfItemsShown;

	@Inject
	@Named("tdnoresultsfoundmsg")
	@Default(values = { "No Results" })
	private String noResultsMsg;

	@Inject
	@Named("tdloadmorelabel")
	@Default(values = { "Load 10 More Results" })
	private String loadMoreLabel;

	@Inject
	@Named("tddatelabel")
	@Default(values = { "Date:" })
	private String dateLabel;

	@Inject
	@Named("tdlocationlabel")
	@Default(values = { "Location:" })
	private String locationLabel;

	@Inject
	@Named("tddurationlabel")
	@Default(values = { "Duration:" })
	private String durationLabel;

	@Inject
	@Named("tdlanguagelabel")
	@Default(values = { "Language:" })
	private String languageLabel;

	public String getNoOfItemsShown() {
		return noOfItemsShown;
	}

	public String getNoResultsMsg() {
		return noResultsMsg;
	}

	public String getLoadMoreLabel() {
		return loadMoreLabel;
	}

	public String getDateLabel() {
		return dateLabel;
	}

	public String getLocationLabel() {
		return locationLabel;
	}

	public String getDurationLabel() {
		return durationLabel;
	}

	public String getLanguageLabel() {
		return languageLabel;
	}

	public String getSearchLookUpPath() {
		return searchlookuppath;
	}

	public List<LMSBean> getLmsBeanNode() {
		log.info("Start Execution of getLmsBeanNode() method");
		String lookupPath = this.searchlookuppath;
		log.info("lookup path is::" + lookupPath);

		String searchKeyword = request.getParameter("searchKey");
		String startDateProperty = "jcr:content/trainingStartDate";

		String lowerBound = request.getParameter("lowerBound");

		String upperBound = request.getParameter("upperBound");

		String sortby = "@jcr:content/trainingStartDate";
		
		log.info("lower Bound::"+lowerBound);
		log.info("lower upperBound::"+upperBound);

		try {
			if (searchKeyword != null) {
				searchKeyword = URLDecoder.decode(searchKeyword, "UTF-8");
				log.info("searchKeyword::" + searchKeyword);

			}
			if (lowerBound != null) {
				lowerBound = URLDecoder.decode(lowerBound, "UTF-8");
				lowerBound=ServiceUtil.getDisplayDateFormat(lowerBound, "MM/dd/yyyy", "yyyy-MM-dd");
				log.info("lowerbound::" + lowerBound);

			} 
			if (upperBound != null) {
				upperBound = URLDecoder.decode(upperBound, "UTF-8");
				upperBound=ServiceUtil.getDisplayDateFormat(upperBound, "MM/dd/yyyy", "yyyy-MM-dd");
				upperBound=ServiceUtil.getNextDate(upperBound);
				log.info("upperbound::" + upperBound);

			}
			
			SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
					.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			log.info("searchServiceHelper::" + searchServiceHelper);

			SearchResult result = searchServiceHelper.getTrainingResults(lookupPath, searchKeyword, startDateProperty,
					lowerBound, upperBound, resourceResolver, sortby, null);

			// SearchResult result =
			// searchServiceHelper.getTrainingResults("/content/hdscorp/en_us/lmstest",
			// null, "jcr:content/trainingStartDate", null, null,
			// resourceResolver, "@jcr:content/trainingStartDate", null);

			log.info("result:::" + result.getHits().size());
			if (result.getHits().size() > 0) {
				lmsBeanNode = new ArrayList<LMSBean>();
				List<Hit> hits = result.getHits();

				for (Hit hit : hits) {
					Page reourcePage;
					reourcePage = hit.getResource().adaptTo(Page.class);
					String pagePath = reourcePage.getPath();

					log.info("LMS directory path is::" + pagePath);

					Resource res = resourceResolver.resolve(pagePath + PageConstants.PAGE_CONTENT);

					if (res != null) {
						ValueMap properties = res.adaptTo(ValueMap.class);

						if (properties.get(ServiceConstants.LML_CHILD_NODE) != null && properties
								.get(ServiceConstants.LML_CHILD_NODE).toString().equalsIgnoreCase("true")) {

							LMSBean lmsBean = new LMSBean();

							lmsBean.setTrainingTitle(properties.get(ServiceConstants.LML_JCR_TRANING_TITLE) != null
									? properties.get(ServiceConstants.LML_JCR_TRANING_TITLE).toString() : "");

							String startDate = "";
							String endDate = "";
							if (properties.get(ServiceConstants.LML_TRANING_START_DATE) != null) {
								Calendar calStartDate = (Calendar) properties
										.get(ServiceConstants.LML_TRANING_START_DATE);
								startDate = ServiceUtil.getStringFromDate(calStartDate.getTime(),
										ServiceConstants.DATE_FORMAT_TO_DISPLAY_LML);
								lmsBean.setTrainingStartDate(startDate);

							}

							if (properties.get(ServiceConstants.LML_TRANING_END_DATE) != null) {
								Calendar calEndDate = (Calendar) properties.get(ServiceConstants.LML_TRANING_END_DATE);
								endDate = ServiceUtil.getStringFromDate(calEndDate.getTime(),
										ServiceConstants.DATE_FORMAT_TO_DISPLAY_LML);
								lmsBean.setTrainingEndDate(endDate);
							}

							lmsBean.setLanguage(properties.get(ServiceConstants.LML_LANGUAGE) != null
									? properties.get(ServiceConstants.LML_LANGUAGE).toString() : "");
							lmsBean.setIltFacilityCountry(
									properties.get(ServiceConstants.LML_ILT_FACILITY_COUNTRY) != null
											? properties.get(ServiceConstants.LML_ILT_FACILITY_COUNTRY).toString()
											: "");
							lmsBean.setIltFacilityCity(properties.get(ServiceConstants.LML_ILT_FACILITY_CITY) != null
									? properties.get(ServiceConstants.LML_ILT_FACILITY_CITY).toString() : "");

							String iltFacilityCity = lmsBean.getIltFacilityCity();
							if (iltFacilityCity != null && !iltFacilityCity.isEmpty()) {
								lmsBean.setLocation(iltFacilityCity.trim().concat(ServiceConstants.COMMA_SEPRATOR
										+ ServiceConstants.EMPTY_SPACE + lmsBean.getIltFacilityCountry()));
							} else {
								lmsBean.setLocation(lmsBean.getIltFacilityCountry());
							}

							lmsBean.setCourseDeeplink(properties.get(ServiceConstants.LML_COURSE_DEEP_LINK) != null
											? properties.get(ServiceConstants.LML_COURSE_DEEP_LINK).toString()
											: "");
							
							lmsBean.setMonth(
									ServiceUtil
											.getMonth(Integer.parseInt(startDate.substring(0,
													startDate.indexOf(ServiceConstants.SLASH_SEPRATOR))) - 1)
									.toUpperCase() + ServiceConstants.EMPTY_SPACE
									+ startDate.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1));
							
							lmsBean.setYear(Integer.parseInt(
									startDate.substring(startDate.lastIndexOf(ServiceConstants.SLASH_SEPRATOR) + 1)));

							lmsBean.setMonthNumber((Integer.parseInt(
									startDate.substring(0, startDate.indexOf(ServiceConstants.SLASH_SEPRATOR))) - 1));

							lmsBean.setDuration(
									ServiceUtil.getFeedTimeDifference(startDate, endDate).replace("ago", ""));

							lmsBeanNode.add(lmsBean);
						}
					}

				}

			}

		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error while reading pages:: " + stack.toString());

		}
		return lmsBeanNode;
	}

	public HashMap<String, List<LMSBean>> getMaplmsBeanList() {

		log.info("Start Execution of getMaplmsBeanList()");
		List<LMSBean> listOfNodes = getLmsBeanNode();

		if (listOfNodes != null && listOfNodes.size() > 0) {
			// Collections.sort(listOfNodes, lmsObject.new CompareByMonth());
			// Collections.sort(listOfNodes, lmsObject.new CompareByYear());
			maplmsBeanList = new HashMap<String, List<LMSBean>>();
			for (int index = 0; index < listOfNodes.size(); index++) {
				LMSBean lmsNode = listOfNodes.get(index);
				if (!maplmsBeanList.containsKey(lmsNode.getMonth())) {
					List<LMSBean> monthlylist = new ArrayList<LMSBean>();
					monthlylist.add(lmsNode);
					maplmsBeanList.put(lmsNode.getMonth(), monthlylist);
				} else {
					maplmsBeanList.get(lmsNode.getMonth()).add(lmsNode);
				}
			}
		}

		return maplmsBeanList;
	}

}
