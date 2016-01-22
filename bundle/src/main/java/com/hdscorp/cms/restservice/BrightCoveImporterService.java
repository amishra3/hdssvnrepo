package com.hdscorp.cms.restservice;

import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Date;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.framework.BundleContext;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.day.cq.polling.importer.ImportException;
import com.day.cq.polling.importer.Importer;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PageUtils;

/** Useful for get all the data from BrightCove feed and stored each video as a node with properties into the JCR.
 * @author gokula.nand
 */
@Component(metatype = false, enabled = true, label = "BrighCove Importer")
@Service
@Property(name = Importer.SCHEME_PROPERTY, value = "brightcoveimporter")
public class BrightCoveImporterService extends GenericRestfulServiceInvokers implements Runnable, Importer {

	private static final Logger log = LoggerFactory.getLogger(BrightCoveImporterService.class);

	private BundleContext bundleContext;

	@Reference
	private ResourceResolverFactory resolverFactory;

	private String importPath;

	public void run() {
		log.info("BrightCoveCustomImporterService Running...");
	}

	protected void activate(ComponentContext ctx) {
		this.bundleContext = ctx.getBundleContext();
	}

	protected void deactivate(ComponentContext ctx) {
		this.bundleContext = null;
	}

	@Override
	public void importData(String scheme, String feedURL, Resource target, String login, String password)
			throws ImportException {
		log.info("Excecution start for importData with login information");
		log.info("Date : " + new Date().toString() + ": scheme : " + scheme + ":feedURL:" + feedURL + ":target:"
				+ target.getPath());
		importPath = target.getPath().substring(1);
		invokeBrightCoveService(feedURL);
		log.info("Excecution End for importData with login information");
	}

	@Override
	public void importData(String scheme, String feedURL, Resource target) throws ImportException {
		log.info("Excecution start for importData without login information");
		log.info("Date : " + new Date().toString() + ": scheme : " + scheme + ":feedURL:" + feedURL + ":target:"
				+ target.getPath());
		importPath = target.getPath().substring(1);
		invokeBrightCoveService(feedURL);
		log.info("Excecution End for importData without login information");

	}

	private void getBrightCoveFeedData(String xmlFeed, String importPath) {
		log.info("Execution Start for getBrightCoveFeedData()");
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(new InputSource(new StringReader(xmlFeed)));
			NodeList nList = document.getElementsByTagName(ServiceConstants.BR_COVE_ENTRY);			
			Session session = JcrUtilService.getSession();
			for (int nCount = 0; nCount < nList.getLength(); nCount++) {

				Node nNode = nList.item(nCount);

				if (nNode.getNodeType() == Node.ELEMENT_NODE) {

					Element eElement = (Element) nNode;

					String title = eElement.getElementsByTagName(ServiceConstants.BR_COVE_FEED_TITLE).item(0)
							.getTextContent();

					String guid = eElement.getElementsByTagName(ServiceConstants.BR_COVE_FEED_GUID).item(0)
							.getTextContent();

					String pubDate = eElement.getElementsByTagName(ServiceConstants.BR_COVE_FEED_PUB_DATE).item(0)
							.getTextContent();

					NodeList nmediaThumbnailList = eElement
							.getElementsByTagName(ServiceConstants.BR_COVE_FEED_THUMBNAIL);

					String thumbnail = "";
					String thumbnailVS = "";
					for (int mCount = 0; mCount < nmediaThumbnailList.getLength(); mCount++) {
						Node nMediaThumbNail = nmediaThumbnailList.item(mCount);
						Element eElementHref = (Element) nMediaThumbNail;

						if (mCount == 0) {
							thumbnail = eElementHref.getAttribute(ServiceConstants.BR_COVE_FEED_URL);

						} else {
							thumbnailVS = eElementHref.getAttribute(ServiceConstants.BR_COVE_FEED_URL);

						}
					}
					String bcTitle = eElement.getElementsByTagName(ServiceConstants.BR_COVE_FEED_BCTITLE_ID).item(0)
							.getTextContent();

					String duration = eElement.getElementsByTagName(ServiceConstants.BR_COVE_BC_FEED_DURATION).item(0)
							.getTextContent();

					String accountId = eElement.getElementsByTagName(ServiceConstants.BR_COVE_BC_FEED_ACCOUNT_ID)
							.item(0).getTextContent();

					String description = eElement.getElementsByTagName(ServiceConstants.BR_COVE_FEED_DISC).item(0)
							.getTextContent();

					NodeList mediaContentList = eElement
							.getElementsByTagName(ServiceConstants.BR_COVE_FEED_MEDIA_CONTENT);
					Node mediaContentNode = mediaContentList.item(0);
					Element eElementChannel = (Element) mediaContentNode;
					String url = eElementChannel.getAttribute(ServiceConstants.BR_COVE_FEED_URL);
					String keyword = eElement.getElementsByTagName(ServiceConstants.BR_COVE_FEED_MEDIA_KEYWORD).item(0)
							.getTextContent();

					insertDataToNode(importPath, title, guid, pubDate, thumbnail, thumbnailVS, bcTitle, duration,
							accountId, description, url, keyword, session);

				}

			}
			session.logout();

		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Exception occured while getting data from feed " + stack);

		}
		log.info("Execution End for getBrightCoveFeedData()");
	}

	private void insertDataToNode(String importPath, String title, String guid, String pubDate, String thumbnail,
			String thumbnailVS, String bcTitle, String bcDuration, String accountId, String description, String url,
			String keyword, Session session) {
		try {
			javax.jcr.Node root = session.getRootNode();
			javax.jcr.Node content = root.getNode(importPath);
			javax.jcr.Node requiredRoot = null;

			if (PageUtils.doesNodeExist(content, title + guid) == -1) {
				requiredRoot = content.addNode(title +ServiceConstants.BR_COVE_JRC_NODE_SEPRATOR +guid);
			} else {
				requiredRoot = content.getNode(title +ServiceConstants.BR_COVE_JRC_NODE_SEPRATOR +guid);
			}

			// make sure name of node is unique
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_TITLE, title);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_GUID, guid);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_PUB_DATE, pubDate);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_THUMBNAIL, thumbnail);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_THUMBNAIL_VS, thumbnailVS);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_TITLE_ID, bcTitle);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_DURATION, bcDuration);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_ACCOUNT_ID, accountId);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_DISC, description);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_URL, url);
			requiredRoot.setProperty(ServiceConstants.BR_COVE_JCR_KEYWORD, keyword);
			requiredRoot.setPrimaryType(ServiceConstants.BR_COVE_JCR_UNSTR);

			// Save the session changes
			session.save();
		}

		catch (RepositoryException e) {
			log.error("Exception occured while inserting data to the node" + title + guid + ":" + e);
		}
	}

	

	private void invokeBrightCoveService(String feedURL){		
		String wsResponse = getWSResponse(feedURL, ServiceConstants.GET_METHOD_TYPE, ServiceConstants.FEED_PARAMETER);
		if (getWSInvokeStatus(wsResponse)) {
			log.info("status is:::" + wsResponse);
		} else {
			getBrightCoveFeedData(wsResponse, importPath);

		}
		
	}
	
	
	public static void main(String args[]) {
		BrightCoveImporterService custom = new BrightCoveImporterService();
		// String url =
		// "http://api.brightcove.com/services/library?command=search_videos&output=mrss&token=53fuu5vhySNj-Qw2GB7jITysWk85bMcdQvDY6mhhSX_SCggrLyFjuA..";

		// String url =
		// "http://api.brightcove.com/services/library?command=search_videos&output=mrss&token=Da7hG1Xl4FjM2qjsaOafGPybaD2XCX3y_aVg9CTl2RBWlwbCY9qGRQ..";
		// String wsResponse = custom.getWSResponse(url,
		// ServiceConstants.GET_METHOD_TYPE,
		// ServiceConstants.FEED_PARAMETER);
		// System.out.println("wsResponse::" + wsResponse);

		// custom.getBrightCoveFeedData(wsResponse,"fdsfd");

		String name = "/content/dam/hdscorp/brightcove";

		System.out.println(name.substring(1));
		System.out.println(name.substring(1, name.lastIndexOf("/")));

	}
}