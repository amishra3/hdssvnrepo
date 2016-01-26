package com.hdscorp.cms.restservice;

import java.io.IOException;
import java.io.StringReader;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.PressReleaseModel;
import com.hdscorp.cms.service.CreatePageService;
import com.hdscorp.cms.util.JcrUtilService;

@Component(immediate = true)
@Service(value = PressReleasesService.class)
public class PressReleasesService extends GenericRestfulServiceInvokers{
	 static final Logger log = LoggerFactory.getLogger(PressReleasesService.class);
	@Reference
	CreatePageService createPageService;
	public String getPressReleasesResponse(String feedURL) {
		
		System.out.println("inside press service");
		log.info("Start execution of getInvokeResponse()  with feed URL " + feedURL);
		String wsResponse = getWSResponse(feedURL, ServiceConstants.GET_METHOD_TYPE,ServiceConstants.FEED_PARAMETER);
		
		//System.out.println("webservice response"+wsResponse);
		if (getWSInvokeStatus(wsResponse)) {
			return wsResponse;
		} else {
			return savePressRelease(wsResponse);
		}

	}
	
	public String savePressRelease(String wsResponse) {
		log.info("Start execution of getInvoke()");
       System.out.println("inside save response");
		SAXParserFactory factory = SAXParserFactory.newInstance();
        SAXParser saxParser;
		try {
			saxParser = factory.newSAXParser();
		
            PressReleasesSaxHandler pressReleasesSaxHandler  = new PressReleasesSaxHandler();
        
			saxParser.parse(new InputSource(new StringReader(wsResponse)), pressReleasesSaxHandler);
			
			System.out.println("list size"+ pressReleasesSaxHandler.pressReleaseList.size());
			for ( PressReleaseModel pressReleaseModel : pressReleasesSaxHandler.pressReleaseList){
				System.out.println("inside for loop");
				createPageService.createPage(JcrUtilService.getSession(), "/apps/hdscorp/templates/pressreleasedetail", "/content/hdscorp/en_us/lookup/pressreleases", pressReleaseModel);
			}
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (ParserConfigurationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		

		return null;
		
		
		
			}
			
	
	}

