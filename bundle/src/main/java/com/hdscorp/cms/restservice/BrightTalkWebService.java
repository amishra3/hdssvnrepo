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

/**
 * This service is basically used for get all feed data from provided feed
 * URL and method is getInvoke(String feedUrl)
 * @author gokula.nand
 */

@Component(immediate = true)
@Service(value = BrightTalkWebService.class)
public class BrightTalkWebService extends GenericRestfulServiceInvokers{
 static final Logger log = LoggerFactory.getLogger(BrightTalkWebService.class);
	
	public String getBrightTalkResponse(String feedURL) {
		log.info("Start execution of getInvokeResponse()  with feed URL" + feedURL);
		String wsResponse = getWSResponse(feedURL, FeedConstant.GET_METHOD_TYPE,FeedConstant.FEED_PARAMETER);
		if (getWSInvokeStatus(wsResponse)) {
			return wsResponse;
		} else {
			return getBrightTalkFeedData(wsResponse);
		}

	}
	
	public String getBrightTalkFeedData(String xmlFeed) {
		log.info("Start execution of getInvoke()");

		JSONArray feedList = new JSONArray();
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(new InputSource(new StringReader(xmlFeed)));
			NodeList nList = document.getElementsByTagName(FeedConstant.ENTRY_TAG);

			JSONObject feed = null;
			for (int nCount = 0; nCount < nList.getLength(); nCount++) {

				Node nNode = nList.item(nCount);

				if (nNode.getNodeType() == Node.ELEMENT_NODE) {

					Element eElement = (Element) nNode;

					feed = new JSONObject();
					feed.put(FeedConstant.JSON_UPDATED_DATE,
							formatDate(eElement.getElementsByTagName(FeedConstant.UPDATED_DATE).item(0).getTextContent()));
					feed.put(FeedConstant.JSON_TITLE,
							eElement.getElementsByTagName(FeedConstant.TITLE).item(0).getTextContent());
					feed.put(FeedConstant.JSON_AUTHOR,
							eElement.getElementsByTagName(FeedConstant.AUTHOR).item(0).getTextContent());
					feed.put(FeedConstant.JSON_SUMMARY,
							eElement.getElementsByTagName(FeedConstant.SUMMARY).item(0).getTextContent());
					if (eElement.getElementsByTagName(FeedConstant.FEATURED).item(0) != null) {
						feed.put(FeedConstant.JSON_FEATURED,
								eElement.getElementsByTagName(FeedConstant.FEATURED).item(0).getTextContent());
					}
					feed.put(FeedConstant.JSON_STATUS,
							eElement.getElementsByTagName(FeedConstant.STATUS).item(0).getTextContent());
					feed.put(FeedConstant.JSON_FORMAT,
							eElement.getElementsByTagName(FeedConstant.FORMAT).item(0).getTextContent());
					feed.put(FeedConstant.JSON_DURATION,
							String.valueOf(Integer.parseInt(
									eElement.getElementsByTagName(FeedConstant.DURATION).item(0).getTextContent())
							/ FeedConstant.SECOND).concat(FeedConstant.MIN));
					feed.put(FeedConstant.JSON_START,
							eElement.getElementsByTagName(FeedConstant.START).item(0).getTextContent());
					feed.put(FeedConstant.JSON_RATING,
							eElement.getElementsByTagName(FeedConstant.RATING).item(0).getTextContent());
					NodeList nCommunication = eElement.getElementsByTagName(FeedConstant.COMMUNICATION);
					Node nNodeCommunication = nCommunication.item(0);
					Element eElementCommunication = (Element) nNodeCommunication;
					feed.put(FeedConstant.JSON_COMMUNICATION_ID, eElementCommunication.getAttribute(FeedConstant.ID));

					NodeList nChannel = eElement.getElementsByTagName(FeedConstant.CHANNEL);
					Node nNodeChannel = nChannel.item(0);
					Element eElementChannel = (Element) nNodeChannel;
					feed.put(FeedConstant.JSON_CHANNEL_ID, eElementChannel.getAttribute(FeedConstant.ID));

					NodeList hrefLinks = eElement.getElementsByTagName(FeedConstant.LINK);
					for (int hCount = 0; hCount < hrefLinks.getLength(); hCount++) {
						Node nNodeHref = hrefLinks.item(hCount);
						Element eElementHref = (Element) nNodeHref;
						if (hCount == 0) {
							feed.put(FeedConstant.JSON_HERF_LINK, eElementHref.getAttribute(FeedConstant.HREF));
						} else if (hCount == 1) {
							feed.put(FeedConstant.JSON_THUMBNAIL_PATH, eElementHref.getAttribute(FeedConstant.HREF));
						} else {
							feed.put(FeedConstant.JSON_PREVIEW_IMAGE_PATH,
									eElementHref.getAttribute(FeedConstant.HREF));
						}

					}

				}
				feedList.put(feed);

			}

		} catch(SAXParseException e){
			log.error("Data is not valid format: ", e);
			JSONObject jsonObjet=new JSONObject();
			try {
				jsonObjet.put(FeedConstant.JSON_STATUS_CODE, FeedConstant.OK_FOUND_STATUS_CODE);
				jsonObjet.put(FeedConstant.JSON_STATUS_REASON, FeedConstant.OK_FOUND_STATUS_REASON);
				return jsonObjet.toString();
			} catch (JSONException e1) {	
				log.error("JSON Parsing exception: ", e1);
			}			
		}
		catch (Exception e)
		{			
			log.error("JSON Parsing exception: ", e);
		}
		log.info("End execution of getInvoke()");
		return feedList.toString();

	}
	
	
}
