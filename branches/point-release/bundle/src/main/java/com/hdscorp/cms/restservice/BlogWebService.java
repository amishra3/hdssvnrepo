package com.hdscorp.cms.restservice;

import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXParseException;

import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.service.CreatePageService;
import com.hdscorp.cms.util.ServiceUtil;

/**
 * This service is basically used for get all blog feed data from provided feed URL
 * and method is getBlogResponse(String feedUrl, String feedPostLimit)
 * 
 * @author gokula.nand
 */

@Component(immediate = true)
@Service(value = BlogWebService.class)
public class BlogWebService extends GenericRestfulServiceInvokers {

	static final Logger log = LoggerFactory.getLogger(BlogWebService.class);

	@Reference
	CreatePageService createPageService;

	public String getBlogResponse(String feedURL, String feedPostLimit) {
		log.info("Start execution of getBlogResponse()  with feed URL " + feedURL);
		String wsResponse = getWSResponse(feedURL, ServiceConstants.GET_METHOD_TYPE, ServiceConstants.FEED_PARAMETER);
		if (getWSInvokeStatus(wsResponse)) {
			return wsResponse;
		} else {
			return getBlogFeedData(wsResponse, feedPostLimit);
		}

	}

	public String getBlogFeedData(String xmlFeed, String feedPostLimit) {
		log.info("Start execution of getBlogFeedData()");

		JSONArray feedList = new JSONArray();
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(new InputSource(new StringReader(xmlFeed)));
			NodeList nList = document.getElementsByTagName(ServiceConstants.BLOG_TAG);

			JSONObject feed = null;

			for (int nCount = 0; nCount < Integer.parseInt(feedPostLimit); nCount++) {

				Node nNode = nList.item(nCount);

				if (nNode.getNodeType() == Node.ELEMENT_NODE) {

					Element eElement = (Element) nNode;

					feed = new JSONObject();

					feed.put(ServiceConstants.JSON_TITLE,
							eElement.getElementsByTagName(ServiceConstants.TITLE).item(0).getTextContent());
					feed.put(ServiceConstants.JSON_AUTHOR,
							eElement.getElementsByTagName(ServiceConstants.AUTHOR).item(0).getTextContent());
					feed.put(ServiceConstants.JSON_LINK,
							eElement.getElementsByTagName(ServiceConstants.LINK).item(0).getTextContent());

					feed.put(ServiceConstants.JSON_UPDATED_DATE, ServiceUtil.getDisplayDateFormat(
							eElement.getElementsByTagName(ServiceConstants.PUB_DATE).item(0).getTextContent(),
							ServiceConstants.BLOG_TO_DATE_FORMAT, ServiceConstants.FB_POST_FEED_DISPLAY_DATE_FORMAT));
					feed.put(ServiceConstants.JSON_DC_DATE,
							eElement.getElementsByTagName(ServiceConstants.DC_DATE).item(0).getTextContent());
					feed.put(ServiceConstants.JSON_GUID,
							eElement.getElementsByTagName(ServiceConstants.GUID).item(0).getTextContent());
					feed.put(ServiceConstants.JSON_DURATION,
							eElement.getElementsByTagName(ServiceConstants.DATE_TO_TEXT).item(0).getTextContent());
					feed.put(ServiceConstants.JSON_OBJECT_TYPE,
							eElement.getElementsByTagName(ServiceConstants.OBJECT_TYPE).item(0).getTextContent());
					String description = Jsoup
							.parse(eElement.getElementsByTagName(ServiceConstants.DESCRIPTION).item(0).getTextContent())
							.text();					
					feed.put(ServiceConstants.JSON_DESCRIPTION, description);
					if (eElement.getElementsByTagName(ServiceConstants.REPLY_TYPE).item(0) != null) {
						feed.put(ServiceConstants.JSON_REPLY_TYPE,
								eElement.getElementsByTagName(ServiceConstants.REPLY_TYPE).item(0).getTextContent());
					}

					NodeList categoriesList = eElement.getElementsByTagName(ServiceConstants.CATEGORY);
					String domainName = "";
					StringBuffer categoryBuffer = new StringBuffer();
					for (int catCount = 0; catCount < categoriesList.getLength(); catCount++) {
						Node nNodeHref = categoriesList.item(catCount);
						Element eElementHref = (Element) nNodeHref;
						domainName = eElementHref.getAttribute(ServiceConstants.DOMAIN);
						if (catCount == 0)
							categoryBuffer.append(eElement.getElementsByTagName(ServiceConstants.CATEGORY)
									.item(catCount).getTextContent());
						else
							categoryBuffer.append("," + eElement.getElementsByTagName(ServiceConstants.CATEGORY)
									.item(catCount).getTextContent());

					}

					feed.put(ServiceConstants.JSON_CATEGORY, categoryBuffer.toString());
					feed.put(ServiceConstants.JSON_DOMAIN, domainName);

				}

				feedList.put(feed);

			}

		} catch (SAXParseException e) {
			log.error("Data is not valid format: ", e);
			JSONObject jsonObjet = new JSONObject();
			try {
				jsonObjet.put(ServiceConstants.JSON_STATUS_CODE, ServiceConstants.OK_FOUND_STATUS_CODE);
				jsonObjet.put(ServiceConstants.JSON_STATUS_REASON, ServiceConstants.OK_FOUND_STATUS_REASON);
				return jsonObjet.toString();
			} catch (JSONException e1) {
				log.error("JSON Parsing exception: ", e1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("JSON Parsing exception: ", e);

		}
		log.info("End execution of getInvoke()");
		return feedList.toString();

	}

}
