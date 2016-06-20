package com.hdscorp.cms.restservice;

import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import com.hdscorp.cms.dao.BrightCoveVideoNode;
import com.hdscorp.cms.dao.PressReleaseNode;

public class BrightCoveSaxHandler extends  DefaultHandler {
	
	   
	List<BrightCoveVideoNode> videoList = new ArrayList<>();
	BrightCoveVideoNode brightCoveVideoNode = null;
	String content = null;

	   @Override
	   public void startElement(String uri, 
	      String localName, String qName, Attributes attributes)
	         throws SAXException {
		   
		   
		   switch(qName){
		   case "item":
			   
			   brightCoveVideoNode = new BrightCoveVideoNode();
			   break;
		   }
	      
	   }

	   @Override
	   public void endElement(String uri, 
	      String localName, String qName) throws SAXException {
		  
		  
		   switch(qName){
		   case "item":
			   
			   videoList.add(brightCoveVideoNode);
			   break;
		   case "title":
			   if(brightCoveVideoNode!=null){
				   brightCoveVideoNode.setTitle(content);
				 
			   }
			   break;
		   case "pubDate":
			   brightCoveVideoNode.setPubDate(content);
			   break;
		   case "description":
			   if(brightCoveVideoNode!=null){
				   brightCoveVideoNode.setDescription(content);
			   }
			   break;
		   case "bc:accountid":
			   brightCoveVideoNode.setAccountId(content);
			   break;
		   case "bc:titleid":
			   brightCoveVideoNode.setTitleId(content);
			   
			   break;	 
			   
		   case "bc:duration":
			   brightCoveVideoNode.setDuration(content);
			   
			   break;
		   case "media:keywords":
			   brightCoveVideoNode.setKeywords(content);
			   
			   break;   
		   case "guid":
			   brightCoveVideoNode.setGuid(content);
			   break;
		   }

	   }

	   @Override
	   public void characters(char ch[], 
	      int start, int length) throws SAXException {
		   
		   content = String.copyValueOf(ch, start, length).trim();

	   }

}
