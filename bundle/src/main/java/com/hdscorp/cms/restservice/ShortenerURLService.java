package com.hdscorp.cms.restservice;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.hdscorp.cms.constants.ServiceConstants;

/**
 * This service returns short form of URL corresponding URLS
 * @author gokula.nand
 *
 */
@Component(immediate = true)
@Service(value = ShortenerURLService.class)
public class ShortenerURLService  extends GenericRestfulServiceInvokers{
	  private static final Logger log = LoggerFactory.getLogger(ShortenerURLService.class);	
	
	public String getShortURL(String pageURL){
		String shortURL="";
		if(pageURL!=null && !pageURL.isEmpty()){		
		shortURL=getWSResponse(ServiceConstants.SHORTEN_URL.concat(pageURL), ServiceConstants.GET_METHOD_TYPE, ServiceConstants.FEED_PARAMETER);
		log.info("short url::"+shortURL);
		}
		return shortURL;
	}

}
