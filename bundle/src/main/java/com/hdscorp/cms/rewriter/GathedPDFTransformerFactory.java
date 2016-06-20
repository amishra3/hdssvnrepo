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
 * HDS CORP -Gated PDF Indicator (href=*.pdf) Rewriter
 * Re-writes markup to indicate that the PDF URL is gated"
 * by adding a css class
 */
@Component(metatype = true, label = "Gated Content Indicator Transformer Factory",
    description = "Sling Rewriter Transformer Factory to add class to gated pdf anchors")
@Properties({
    @Property(name = "pipeline.type",
        value = "gated-pdf", propertyPrivate = true)
})
@Service(value = {TransformerFactory.class})
public final class GathedPDFTransformerFactory implements TransformerFactory, EventHandler {
		
	SlingHttpServletRequest slingRequest;
    
    private static final Logger log = LoggerFactory.getLogger(GathedPDFTransformerFactory.class);
    
    private static final String ATTR_ANCHOR_LINK_PATH = "href";
    
    private static final String ATTR_ANCHOR_CSS = "class";

    private static final String PDF_TYPE_EXTENSION = ".pdf";
    
    private static final String GATED_EXTERNAL_PATH = "/ext/";
    
    private static final String GATED_CSS_NAME= " isGatedLock";


    public GathedPDFTransformerFactory()  {
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
        return new VersionableClientlibsTransformer();
    }

    private Attributes gatedPDF(final String elementName, final Attributes attrs,SlingHttpServletRequest slingRequest) {
        if (this.isPDF(elementName, attrs)) {

        	return this.rebuildClassAttributes(new AttributesImpl(attrs), attrs.getIndex("", ATTR_ANCHOR_CSS),
                    attrs.getValue("", ATTR_ANCHOR_CSS), LibraryType.CSS,attrs.getValue("", ATTR_ANCHOR_LINK_PATH),slingRequest);
            
        } else {
            return attrs;
        }
    }
    

    private Attributes rebuildClassAttributes(final AttributesImpl newAttributes, final int index, final String cssclasses,
            final LibraryType libraryType, String pdfPath,SlingHttpServletRequest slingRequest) {
    	
		final String gatedCSSClass = GATED_CSS_NAME;
		boolean isGated = false;
    	try {
    		isGated = HdsCorpCommonUtils.isGated(pdfPath, slingRequest);
		} catch (Exception ex) {
			// TODO Auto-generated catch block
			ex.printStackTrace();
		} 

		if (StringUtils.isNotBlank(gatedCSSClass) && isGated && index > -1) {
			log.debug("Added gated class to -"+pdfPath);
			newAttributes.setValue(index, cssclasses+" "+gatedCSSClass);
		} else {
			log.debug("Is not Gated Content.No need to add class.");
		}

		return newAttributes;
	}
    

    private boolean isPDF(final String elementName, final Attributes attrs) {
        final String type = attrs.getValue("", "type");
        final String href = attrs.getValue("", "href");

        if (StringUtils.equals("a", elementName) && StringUtils.startsWith(href, "/") && (StringUtils.endsWith(href, PDF_TYPE_EXTENSION) || StringUtils.contains(href, GATED_EXTERNAL_PATH))) {
            return true;
        }

        return false;
    }


    private class VersionableClientlibsTransformer extends AbstractTransformer {
    	
    	private SlingHttpServletRequest slingRequest;
    	
    	public void init(ProcessingContext context, ProcessingComponentConfiguration config) throws IOException {
            this.slingRequest = context.getRequest();
            log.info("Transforming request {}.", slingRequest.getRequestURI());
        }

    	
        @SuppressWarnings("deprecation")
		public void startElement(final String namespaceURI, final String localName, final String qName,final Attributes attrs)throws SAXException {
        	
            getContentHandler().startElement(namespaceURI, localName, qName, gatedPDF(localName, attrs,slingRequest));
        }
    }

    @Override
    public void handleEvent(Event event) {
        String path = (String) event.getProperty(SlingConstants.PROPERTY_PATH);
    }

}