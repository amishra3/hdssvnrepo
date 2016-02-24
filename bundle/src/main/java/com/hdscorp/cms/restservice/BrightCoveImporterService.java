package com.hdscorp.cms.restservice;

import java.io.StringReader;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.InputSource;

import com.day.cq.commons.jcr.JcrConstants;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.BrightCoveVideoNode;
import com.hdscorp.cms.util.JcrUtilService;

/** Useful for get all the data from BrightCove feed and stored each video as a node with properties into the JCR.
 * @author gokula.nand
 */
@Component(metatype = false, enabled = true, label = "BrighCove Importer")

@Service(value = BrightCoveImporterService.class)

public class BrightCoveImporterService extends GenericRestfulServiceInvokers {
	static final Logger log = LoggerFactory.getLogger(BrightTalkWebService.class);
	
	public String getBrightCoveResponse(String feedURL,String storagePath) {

		log.info("Start execution of getInvokeResponse()  with feed URL "
				+ feedURL);
		String wsResponse = getWSResponse(feedURL,
				ServiceConstants.GET_METHOD_TYPE,
				ServiceConstants.FEED_PARAMETER);
		if (getWSInvokeStatus(wsResponse)) {
			return wsResponse;
		} else {
			return saveBrightCoveResponse(wsResponse,storagePath);
		}

	}

	public String saveBrightCoveResponse(String wsResponse,String storagePath) {

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
			Session session = JcrUtilService.getSession();
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
			
			
			for (BrightCoveVideoNode brightCoveVideoNode : brightCoveSaxHandler.videoList) {
				
				
				createVideoNode(session,storagePath,brightCoveVideoNode);
		
		
}
		} catch (Exception e) {

			e.printStackTrace();
		}

		return "Success";

	}

private void createVideoNode (Session session,String storagePath, BrightCoveVideoNode brightCoveVideoNode ) {
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
		metaDataNode.setProperty("jcr:description",brightCoveVideoNode.getDescription());
		metaDataNode.setProperty("guid",brightCoveVideoNode.getGuid());
		metaDataNode.setProperty("pubDate",brightCoveVideoNode.getPubDate());
		metaDataNode.setProperty("cq:tags",brightCoveVideoNode.getKeywords());
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