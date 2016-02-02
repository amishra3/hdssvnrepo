package com.hdscorp.cms.restservice;

import java.io.StringReader;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.InputSource;

import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.dao.PressReleaseNode;
import com.hdscorp.cms.service.CreatePageService;
import com.hdscorp.cms.util.JcrUtilService;

@Component(immediate = true)
@Service(value = PressReleasesService.class)
public class PressReleasesService extends GenericRestfulServiceInvokers {
	static final Logger log = LoggerFactory
			.getLogger(PressReleasesService.class);
	@Reference
	CreatePageService createPageService;

	public String getPressReleasesResponse(String feedURL,String type) {

		log.info("Start execution of getInvokeResponse()  with feed URL "
				+ feedURL);
		String wsResponse = getWSResponse(feedURL,
				ServiceConstants.GET_METHOD_TYPE,
				ServiceConstants.FEED_PARAMETER);
		if (getWSInvokeStatus(wsResponse)) {
			return wsResponse;
		} else {
			return savePressRelease(wsResponse,type);
		}

	}

	public String savePressRelease(String wsResponse,String type) {

		SAXParserFactory factory = SAXParserFactory.newInstance();
		SAXParser saxParser;
		try {
			saxParser = factory.newSAXParser();

			PressReleasesSaxHandler pressReleasesSaxHandler = new PressReleasesSaxHandler();

			saxParser.parse(new InputSource(new StringReader(wsResponse)),
					pressReleasesSaxHandler);
if(type.equalsIgnoreCase("pressRelease") ){
			for (PressReleaseNode pressReleaseModel : pressReleasesSaxHandler.pressReleaseList) {

				createPageService.createPage(JcrUtilService.getSession(),
						"/apps/hdscorp/templates/pressreleasedetail",
						"/content/hdscorp/en_us/lookup/pressreleases",
						pressReleaseModel,type);
			}
} else {
	for (PressReleaseNode pressReleaseModel : pressReleasesSaxHandler.pressReleaseList) {

		createPageService.createPage(JcrUtilService.getSession(),
				"/apps/hdscorp/templates/newsdetail",
				"/content/hdscorp/en_us/lookup/news",
				pressReleaseModel,type);
	}
}
		} catch (Exception e) {

			e.printStackTrace();
		}

		return "Success";

	}

}
