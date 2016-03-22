package com.hdscorp.cms.restservice;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Dictionary;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.constants.ServiceConstants;

/**
 * This service returns short form of URL corresponding URLS
 * 
 * @author gokula.nand
 *
 */
@Component(immediate = true)
@Service(value = ShortenerURLService.class)
public class ShortenerURLService extends GenericRestfulServiceInvokers {
	private static final Logger log = LoggerFactory.getLogger(ShortenerURLService.class);

	@Reference
	ConfigurationAdmin configurationAdmin;

	public static final String SHORTEN_URL = "shorten.url";
	public static final String SHORTEN_PID = "com.hdscorp.cms.restservice.ShortenerURLService";

	public String getShortURL(String pageURL) {
		String shortURL = "";
		if (pageURL != null && !pageURL.isEmpty()) {
			shortURL = getURLfromXML(getWSResponse(getShortURLPreviousPath().concat(pageURL),
					ServiceConstants.GET_METHOD_TYPE, ServiceConstants.FEED_PARAMETER));
			log.info("short url::" + shortURL);
		}
		return shortURL;
	}

	public String getURLfromXML(String xml) {
		if (xml != null && !xml.isEmpty() && xml.indexOf("<shorturl>") != -1) {
			xml = xml.substring(xml.indexOf("<shorturl>") + 10, xml.indexOf("</shorturl>"));
		}
		return xml;

	}

	private String getShortURLPreviousPath() {
		Configuration config;
		String locationPath = "";
		try {
			config = configurationAdmin.getConfiguration(SHORTEN_PID);
			Dictionary props = config.getProperties();
			locationPath = (String) config.getProperties().get(SHORTEN_URL);
			if (locationPath== null || locationPath.isEmpty()) {
				locationPath = ServiceConstants.SHORTEN_URL;
			}
		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error occurs while getting location path:  " + stack.toString());
		}
		return locationPath;
	}

}
