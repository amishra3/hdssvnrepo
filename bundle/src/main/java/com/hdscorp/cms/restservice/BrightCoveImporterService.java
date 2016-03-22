package com.hdscorp.cms.restservice;

import java.io.StringReader;
import java.util.HashMap;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.InputSource;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.BrightCoveVideoNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ViewHelperUtil;

/** Useful for get all the data from BrightCove feed and stored each video as a node with properties into the JCR.
 * @author gokula.nand
 */
@Component(metatype = false, enabled = true, label = "BrighCove Importer")

@Service(value = BrightCoveImporterService.class)

public class BrightCoveImporterService extends GenericRestfulServiceInvokers {
	static final Logger log = LoggerFactory.getLogger(BrightTalkWebService.class);
	
	
	
	public String getBrightCoveResponse(String feedURL,String storagePath,boolean deleteParent,int page_number) {
		

		log.info("Start execution of getInvokeResponse()  with feed URL "
				+ feedURL);
		String wsResponse = getWSResponse(feedURL,
				ServiceConstants.GET_METHOD_TYPE,
				ServiceConstants.FEED_PARAMETER);
		if (getWSInvokeStatus(wsResponse)) {
			return wsResponse;
		} else {
			
			return saveBrightCoveResponse(wsResponse,storagePath,feedURL,deleteParent,page_number);
		}

	}

	public String saveBrightCoveResponse(String wsResponse,String storagePath,String feedURL,boolean deleteParent,int page_number) {

		log.info("Bright cove response"
				+ wsResponse.length());
		
		SAXParserFactory factory = SAXParserFactory.newInstance();
		SAXParser saxParser;
		try {
			saxParser = factory.newSAXParser();

			BrightCoveSaxHandler brightCoveSaxHandler = new BrightCoveSaxHandler();

			saxParser.parse(new InputSource(new StringReader(wsResponse)),
					brightCoveSaxHandler);
			log.info("video list size"+brightCoveSaxHandler.videoList.size());
			
			int noOfVideos = brightCoveSaxHandler.videoList.size();
			
			Session session = JcrUtilService.getSession();
			
			
			

			SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
					.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			String[] paths = { storagePath };
			String[] types = { "dam:Asset" };
			SearchResult result = searchServiceHelper.getFullTextBasedResuts(
					paths, null, null, types, null, false, null, null,
					JcrUtilService.getResourceResolver(), null, null);
			List<Hit> hits = result.getHits();
			HashMap<String, String[]> tagsMap = new HashMap<>();
			log.info("video list size in Repository before bright cove Page_"+page_number+" Response Saved"+hits.size());
			for (Hit hit : hits) {
				Resource metadataResource = hit.getResource().getChild(
						"jcr:content/metadata");
				if (metadataResource != null) {
					ValueMap properties = ResourceUtil
							.getValueMap(metadataResource);

					if (properties.containsKey("cq:tags")) {
						String[] assetTags = (String[]) properties
								.get("cq:tags");
						tagsMap.put(properties.get("titleId").toString(), assetTags);
					}
				}
			}
			
			if(deleteParent) {
				Node parentNode = session.getNode(storagePath);
				
				if(parentNode!=null) {
					parentNode.remove();
					session.save();
					parentNode = session.getNode(storagePath.substring(0,storagePath.lastIndexOf("/")));
					
					if(parentNode!=null){
						
					parentNode = parentNode.addNode(storagePath.substring(storagePath.lastIndexOf("/")+1), "sling:Folder");
					
					session.save();
					
				}
				}
			}
			
			for (BrightCoveVideoNode brightCoveVideoNode : brightCoveSaxHandler.videoList) {
				
				
				createVideoNode(session,storagePath,brightCoveVideoNode,tagsMap);
		
		
}
			if(!(noOfVideos<100)) {
				page_number++;
				if(deleteParent){
				feedURL= feedURL+"&page_number="+page_number;
				} else {
					feedURL = feedURL.substring(0,feedURL.lastIndexOf("=")+1)+page_number;
				}
				
				log.info(page_number+"_Page Bright cove feed url** "+feedURL);
				getBrightCoveResponse(feedURL, storagePath, false,page_number);
			}
			
		} catch (Exception e) {

			e.printStackTrace();
		}

		return "Success";

	}

private void createVideoNode (Session session,String storagePath, BrightCoveVideoNode brightCoveVideoNode,HashMap<String, String[]> tagsMap) {
	 try {
	 Node parentNode = session.getNode(storagePath);
	
	if(parentNode!=null) {
		
		
		String nodeName = brightCoveVideoNode.getTitleId();
		
   
    final Node assetNode = parentNode.addNode(nodeName, "dam:Asset");

    
    final Node contentJcrNode = assetNode.addNode(JcrConstants.JCR_CONTENT, "dam:AssetContent");
    final Node metaDataNode = contentJcrNode.addNode("metadata",
            JcrConstants.NT_UNSTRUCTURED);
   
		
		metaDataNode.setProperty(JcrConstants.JCR_TITLE,brightCoveVideoNode.getTitle());
		metaDataNode.setProperty("dc:title",brightCoveVideoNode.getTitle());
		metaDataNode.setProperty("dc:description",brightCoveVideoNode.getDescription());
		metaDataNode.setProperty("guid",brightCoveVideoNode.getGuid());
		metaDataNode.setProperty("pubDate",brightCoveVideoNode.getPubDate());
		
		metaDataNode.setProperty("keywords",brightCoveVideoNode.getKeywords());
		if(tagsMap.containsKey(brightCoveVideoNode.getTitleId())){
			metaDataNode.setProperty("cq:tags",tagsMap.get(brightCoveVideoNode.getTitleId()));
		}
		
		metaDataNode.setProperty("titleId",brightCoveVideoNode.getTitleId());
		metaDataNode.setProperty("duration",brightCoveVideoNode.getDuration());
		metaDataNode.setProperty("resourceType","video");
		
		session.save();
	} 
    
    
}catch (RepositoryException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
}
}