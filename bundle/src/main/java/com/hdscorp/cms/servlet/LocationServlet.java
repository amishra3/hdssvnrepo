package com.hdscorp.cms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Dictionary;
import java.util.List;

import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.constants.PageConstants;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ViewHelperUtil;

/**
 * 
 * @author gokula.nand
 *
 */
@SlingServlet(methods = { "GET" }, paths = { "/bin/acme/hdscorp/locationservlet" })
public class LocationServlet extends SlingSafeMethodsServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3082661311494888456L;

	@Reference
	ConfigurationAdmin configurationAdmin;

	public static final String LOCATION_PATH = "location.path";
	public static final String LOCATION_PID = "com.hdscorp.cms.servlet.LocationServlet";

	private static final Logger log = LoggerFactory.getLogger(LocationServlet.class);

	@Override
	protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
			throws ServletException, IOException {

		try {
			log.info("Start Execution of Location Servlet");
			getJSONLocation(request, response);
		} catch (Exception e) {
			log.debug(e.getMessage());
		}
	}

	protected void getJSONLocation(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
			throws Exception {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		String selector = request.getParameter("selector");
		String singlelocation = request.getParameter("singlelocation");

		log.info("selector::::::::::::::::::::::::" + selector);
		try {
			if (selector != null) {
				selector = URLDecoder.decode(selector, "UTF-8");
			}
			if (singlelocation != null) {
				singlelocation = URLDecoder.decode(singlelocation, "UTF-8");
			}
			response.getWriter().write("{\"locationJson\":"
					+ getLocationJSON(getLocationPath(), selector, singlelocation).toString() + "}");
		} catch (Exception e) {
			log.error("Error while reading locations json" + e.getMessage());
		}

	}

	public String getLocationJSON(String[] locationPath, String selector, String singlelocation) {

		ResourceResolver resourceResolver = JcrUtilService.getResourceResolver();
		log.info("Execution of getLocationNodes method");
		SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
				.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		String type[] = { "cq:Page" };

		log.info("path is::::" + locationPath[0] + "/" + selector);
		locationPath[0] = locationPath[0] + "/" + selector;

		JSONArray jsonArray = new JSONArray();

		try {

			if (singlelocation != null && singlelocation.equalsIgnoreCase("true")) {
				Resource res = resourceResolver.resolve(locationPath[0] + PageConstants.PROPERTY_JCRLOCATION_PATH);
				if (res != null) {
					JSONObject jsonObject = new JSONObject();
					ValueMap properties = res.adaptTo(ValueMap.class);
					if (properties.get(ServiceConstants.LOCATION_JCR_TITLE, String[].class) != null) {
						jsonArray.put(getJsonObject(properties, jsonObject));
					}
				}
			} else {
				SearchResult result = searchServiceHelper.getFullTextBasedResuts(locationPath, null, null, type, null,
						true, null, null, resourceResolver, null, null);
				List<Hit> hits = result.getHits();

				log.info("No.of hits ::" + hits.size());

				for (Hit hit : hits) {
					JSONObject jsonObject = new JSONObject();
					Page reourcePage;

					reourcePage = hit.getResource().adaptTo(Page.class);
					String pagePath = reourcePage.getPath();
					log.info("page path is::" + pagePath);
					Resource res = resourceResolver.resolve(pagePath + PageConstants.PROPERTY_JCRLOCATION_PATH);

					if (res != null) {
						ValueMap properties = res.adaptTo(ValueMap.class);
						if (properties.get(ServiceConstants.LOCATION_JCR_TITLE, String[].class) != null) {
							jsonArray.put(getJsonObject(properties, jsonObject));
						}

					}

				}
			}

		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error occured during getting value from the pages" + stack.toString());
		}
		return jsonArray.toString();
	}

	private String[] getLocationPath() {
		Configuration config;
		String locationPath[] = new String[10];
		try {
			config = configurationAdmin.getConfiguration(LOCATION_PID);
			Dictionary props = config.getProperties();
			locationPath = (String[]) config.getProperties().get(LOCATION_PATH);
		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error occurs while getting location path:  " + stack.toString());
		}
		return locationPath;
	}

	public JSONObject getJsonObject(ValueMap properties, JSONObject jsonObject) {
		try {

			jsonObject
					.put("region",
							Arrays.toString(
									(String[]) properties.get(ServiceConstants.LOCATION_JCR_REGION, String[].class))
							.replace("[", "").replace("]", ""));

			jsonObject
					.put("country",
							Arrays.toString(
									(String[]) properties.get(ServiceConstants.LOCATION_JCR_COUNTRY, String[].class))
							.replace("[", "").replace("]", ""));

			jsonObject
					.put("location",
							Arrays.toString(
									(String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONS, String[].class))
							.replace("[", "").replace("]", ""));

			jsonObject.put("image",
					Arrays.toString(
							(String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONIMAGE, String[].class))
					.replace("[", "").replace("]", ""));

			jsonObject
					.put("imagealt",
							Arrays.toString((String[]) properties
									.get(ServiceConstants.LOCATION_JCR_LOCATIONIMAGEALTTEXT, String[].class))
					.replace("[", "").replace("]", ""));

			jsonObject.put("locationdetail",
					Arrays.toString(
							(String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONDETAIL, String[].class))
					.replace("[", "").replace("]", ""));

			// String lonitude = new String( Arrays.toString((String[])
			// properties.get(ServiceConstants.LOCATION_JCR_LOCATIONLONGITUDE,
			// String[].class)).replace("[", "").replace("]",
			// "").getBytes("UTF-8"));

			jsonObject.put("locationlongitude",
					Arrays.toString(
							(String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONLONGITUDE, String[].class))
					.replace("[", "").replace("]", ""));

			jsonObject.put("locationlatitude",
					Arrays.toString(
							(String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONLATITUDE, String[].class))
					.replace("[", "").replace("]", ""));

			jsonObject.put("locationphonenumber", Arrays.toString(
					(String[]) properties.get(ServiceConstants.LOCATION_JCR_LOCATIONPHONENUMBER, String[].class))
					.replace("[", "").replace("]", ""));

			jsonObject
					.put("locationtitle",
							Arrays.toString(
									(String[]) properties.get(ServiceConstants.LOCATION_JCR_TITLE, String[].class))
							.replace("[", "").replace("]", ""));

		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error occured puting value in json object::" + stack.toString());
		}
		return jsonObject;
	}

}