package com.hdscorp.cms.restservice;

import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXParseException;

import com.hdscorp.cms.constants.ServiceConstants;

/**
 * This service is basically used for get all feed data from provided feed URL
 * and method is getBrightTalkResponse(String feedUrl)
 * 
 * @author gokula.nand
 */

@Component(immediate = true)
@Service(value = BrightTalkWebService.class)
public class BrightTalkWebService extends GenericRestfulServiceInvokers {
	static final Logger log = LoggerFactory.getLogger(BrightTalkWebService.class);

	public String getBrightTalkResponse(String feedURL) {
		log.info("Start execution of getInvokeResponse()  with feed URL " + feedURL);
		String wsResponse = getWSResponse(feedURL, ServiceConstants.GET_METHOD_TYPE, ServiceConstants.FEED_PARAMETER);
		if (getWSInvokeStatus(wsResponse)) {
			return wsResponse;
		} else {
			return getBrightTalkFeedData(wsResponse);
		}

	}

	public String getBrightTalkFeedData(String xmlFeed) {
		log.info("xml feed response" + xmlFeed);

		JSONArray feedList = new JSONArray();
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(new InputSource(new StringReader(xmlFeed)));
			NodeList nList = document.getElementsByTagName(ServiceConstants.ENTRY_TAG);

			JSONObject feed = null;
			boolean term = false;
			for (int nCount = 0; nCount < nList.getLength(); nCount++) {

				Node nNode = nList.item(nCount);

				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					term = false;

					Element eElement = (Element) nNode;

					feed = new JSONObject();

					NodeList categoriesList = eElement.getElementsByTagName(ServiceConstants.CATEGORY);
					StringBuffer categoryBuffer = new StringBuffer();
					for (int catCount = 0; catCount < categoriesList.getLength(); catCount++) {
						Node nNodeHref = categoriesList.item(catCount);
						Element eElementHref = (Element) nNodeHref;
						if (eElementHref.getAttribute(ServiceConstants.TERM).toString().equalsIgnoreCase("0")) {
							term = true;
						}

						if (catCount == 0)
							categoryBuffer.append(eElementHref.getAttribute(ServiceConstants.TERM).toString()
									.replaceAll(ServiceConstants.REG_EXP, ""));
						else
							categoryBuffer.append("," + eElementHref.getAttribute(ServiceConstants.TERM).toString()
									.replaceAll(ServiceConstants.REG_EXP, ""));
					}

					if (!term) {

						feed.put(ServiceConstants.JSON_CATEGORY, categoryBuffer.toString());

						feed.put(ServiceConstants.JSON_UPDATED_DATE, formatDate(
								eElement.getElementsByTagName(ServiceConstants.UPDATED_DATE).item(0).getTextContent()));
						feed.put(ServiceConstants.JSON_TITLE,
								eElement.getElementsByTagName(ServiceConstants.TITLE).item(0).getTextContent());
						feed.put(ServiceConstants.JSON_AUTHOR,
								eElement.getElementsByTagName(ServiceConstants.AUTHOR).item(0).getTextContent());
						feed.put(ServiceConstants.JSON_SUMMARY,
								eElement.getElementsByTagName(ServiceConstants.SUMMARY).item(0).getTextContent());
						if (eElement.getElementsByTagName(ServiceConstants.FEATURED).item(0) != null) {
							feed.put(ServiceConstants.JSON_FEATURED,
									eElement.getElementsByTagName(ServiceConstants.FEATURED).item(0).getTextContent());
						} else {
							feed.put(ServiceConstants.JSON_FEATURED, "");
						}
						feed.put(ServiceConstants.JSON_STATUS,
								eElement.getElementsByTagName(ServiceConstants.STATUS).item(0).getTextContent());
						feed.put(ServiceConstants.JSON_FORMAT,
								eElement.getElementsByTagName(ServiceConstants.FORMAT).item(0).getTextContent());
						feed.put(ServiceConstants.JSON_DURATION,
								String.valueOf(Integer.parseInt(eElement.getElementsByTagName(ServiceConstants.DURATION)
										.item(0).getTextContent()) / ServiceConstants.SECOND)
								.concat(ServiceConstants.MIN));
						feed.put(ServiceConstants.JSON_START,
								eElement.getElementsByTagName(ServiceConstants.START).item(0).getTextContent());
						feed.put(ServiceConstants.JSON_RATING,
								eElement.getElementsByTagName(ServiceConstants.RATING).item(0).getTextContent());

						NodeList nCommunication = eElement.getElementsByTagName(ServiceConstants.COMMUNICATION);
						Node nNodeCommunication = nCommunication.item(0);
						Element eElementCommunication = (Element) nNodeCommunication;
						feed.put(ServiceConstants.JSON_COMMUNICATION_ID,
								eElementCommunication.getAttribute(ServiceConstants.ID));

						NodeList nChannel = eElement.getElementsByTagName(ServiceConstants.CHANNEL);
						Node nNodeChannel = nChannel.item(0);
						Element eElementChannel = (Element) nNodeChannel;
						feed.put(ServiceConstants.JSON_CHANNEL_ID, eElementChannel.getAttribute(ServiceConstants.ID));

						NodeList hrefLinks = eElement.getElementsByTagName(ServiceConstants.LINK);
						for (int hCount = 0; hCount < hrefLinks.getLength(); hCount++) {
							Node nNodeHref = hrefLinks.item(hCount);
							Element eElementHref = (Element) nNodeHref;
							if (hCount == 0) {
								feed.put(ServiceConstants.JSON_HERF_LINK,
										eElementHref.getAttribute(ServiceConstants.HREF));
							} else if (hCount == 1) {
								feed.put(ServiceConstants.JSON_THUMBNAIL_PATH,
										eElementHref.getAttribute(ServiceConstants.HREF));
							} else if (hCount == 2) {
								feed.put(ServiceConstants.JSON_PREVIEW_IMAGE_PATH,
										eElementHref.getAttribute(ServiceConstants.HREF));
							}

						}
						feedList.put(feed);
					}
				}
				
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
			log.error("JSON Parsing exception: ", e);
		}
		log.info("End execution of getInvoke()");
		return feedList.toString();

	}
	
	public static void main(String args[]){
		
		BrightTalkWebService bb=new BrightTalkWebService();
		System.out.println(bb.getBrightTalkResponse("https://www.brighttalk.com/channel/12821/feed"));
		
	}

}
