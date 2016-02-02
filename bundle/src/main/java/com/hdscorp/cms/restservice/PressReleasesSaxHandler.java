package com.hdscorp.cms.restservice;

import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import com.hdscorp.cms.dao.PressReleaseNode;

public class PressReleasesSaxHandler extends  DefaultHandler {
	
	   
	List<PressReleaseNode> pressReleaseList = new ArrayList<>();
	PressReleaseNode pressReleaseModel = null;
	String content = null;

	   @Override
	   public void startElement(String uri, 
	      String localName, String qName, Attributes attributes)
	         throws SAXException {
		   
		   
		   switch(qName){
		   case "item":
			   
			   pressReleaseModel = new PressReleaseNode();
			   break;
		   }
	      
	   }

	   @Override
	   public void endElement(String uri, 
	      String localName, String qName) throws SAXException {
		  
		  
		   switch(qName){
		   case "item":
			   
			   pressReleaseList.add(pressReleaseModel);
			   break;
		   case "title":
			   if(pressReleaseModel!=null){
			   pressReleaseModel.setTitle(content);
			   }
			   break;
		   case "pubDate":
			   pressReleaseModel.setPubDate(content);
			   break;
		   case "link":
			   if(pressReleaseModel!=null){
			   pressReleaseModel.setLink(content);
			   }
			   break;
		   case "description":
			   pressReleaseModel.setDescription(content);
			   break;
		   }

	   }

	   @Override
	   public void characters(char ch[], 
	      int start, int length) throws SAXException {
		   
		   content = String.copyValueOf(ch, start, length).trim();

	   }

}
