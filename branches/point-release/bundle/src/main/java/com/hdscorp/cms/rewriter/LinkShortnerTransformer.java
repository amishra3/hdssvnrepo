package com.hdscorp.cms.rewriter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.rewriter.ProcessingComponentConfiguration;
import org.apache.sling.rewriter.ProcessingContext;
import org.apache.sling.rewriter.Transformer;
import org.apache.sling.rewriter.TransformerFactory;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;

import com.adobe.acs.commons.rewriter.AbstractTransformer;
import com.day.cq.dam.api.Asset;
import com.day.cq.widget.LibraryType;
import com.hdscorp.cms.util.HdsCorpCommonUtils;

/**
 */
@Component(metatype = true, label = "Custom URL Shortening service",
    description = "Sling Rewriter Transformer Factory to do URL shortening")
@Properties({
    @Property(name = "pipeline.type",
        value = "custom-url-short", propertyPrivate = true)
})
@Service(value = {TransformerFactory.class})
public final class LinkShortnerTransformer implements TransformerFactory, EventHandler {
		
	SlingHttpServletRequest slingRequest;
    
    private static final Logger log = LoggerFactory.getLogger(LinkShortnerTransformer.class);
    
    private SlingHttpServletRequest httpRequest;

    private static final String ATT_NAME = "href";
    private static final String EL_NAME = "a";



    public LinkShortnerTransformer()  {
    	super();
    }

    @Activate
    protected void activate(Map<String, Object> props) {
    	Map<String, Object> authInfo = new HashMap<String, Object>();
    }

    @Deactivate
    protected void deactivate() {
    }

    public void init(ProcessingContext context, ProcessingComponentConfiguration config) throws IOException {
    	slingRequest = context.getRequest() ;
    	log.info("Transforming request {}.", slingRequest.getRequestURI());
    }
    
    public Transformer createTransformer() {
        return new CustomURLShortRewriterTransformer();
    }


    private class CustomURLShortRewriterTransformer extends AbstractTransformer {
    	
    	private SlingHttpServletRequest slingRequest;
    	
    	public void init(ProcessingContext context, ProcessingComponentConfiguration config) throws IOException {
            this.slingRequest = context.getRequest();
            log.info("Transforming request {}.", slingRequest.getRequestURI());
        }

    	
 	   @Override
	    public void startElement(String nsUri, String localname, String qName, Attributes attrs) throws SAXException {
	        /* copy the element attributes */
	        AttributesImpl linkAttrs = new AttributesImpl(attrs);

	        /* Only interested in EL_NAME elements */
	        if (EL_NAME.equalsIgnoreCase(localname)) {

	            /* iterate through the attributes of the element and act only on ATT_NAME attributes */
	            for (int i = 0; i < linkAttrs.getLength(); i++) {
	                if (ATT_NAME.equalsIgnoreCase(linkAttrs.getLocalName(i))) {
	                    String pathInLink = linkAttrs.getValue(i);
	                    log.info("Path in link: {}", pathInLink);


	                    /* use the resource resolver of the http request to reverse-resolve the path  */
	                    String mappedPath = slingRequest.getResourceResolver().map(slingRequest, pathInLink);

	                    log.info("Transformed {} to {}.", pathInLink, mappedPath);

	                    /* update the attribute value */
	                    linkAttrs.setValue(i, mappedPath);
	                }
	            }
	        }

	        /* return updated attributes to super and continue with the transformer chain */
	        super.startElement(nsUri, localname, qName, linkAttrs);
	    }
    	
    }

    @Override
    public void handleEvent(Event event) {
        String path = (String) event.getProperty(SlingConstants.PROPERTY_PATH);
    }

}