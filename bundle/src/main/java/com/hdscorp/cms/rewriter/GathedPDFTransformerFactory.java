package com.hdscorp.cms.rewriter;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.LoginException;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.jcr.api.SlingRepository;
import org.apache.sling.jcr.resource.JcrResourceConstants;
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
import com.hdscorp.cms.dao.JCRDataAccessor;
import com.hdscorp.cms.util.PathResolver;

/**
 * HDS CORP -Gated PDF Indicator (href=*.pdf) Rewriter
 * Re-writes markup to indicate that the PDF URL is gated"
 * by adding a css class
 */
@Component(metatype = true, label = "Gated PDF Indicator Transformer Factory",
    description = "Sling Rewriter Transformer Factory to add class to gated pdf anchors")
@Properties({
    @Property(name = "pipeline.type",
        value = "gated-pdf", propertyPrivate = true)
})
@Service(value = {TransformerFactory.class})
public final class GathedPDFTransformerFactory implements TransformerFactory, EventHandler {
	
	@Reference
	ResourceResolverFactory resourceResolverFactory;
	
    @Reference
    private SlingRepository repository;
    
    private ResourceResolver resourceResolver;
    
    Session session = null;
	
    JCRDataAccessor jCRDataAccessor = null;
    
    private static final Logger log = LoggerFactory.getLogger(GathedPDFTransformerFactory.class);
    
    private static final String ATTR_ANCHOR_LINK_PATH = "href";
    
    private static final String ATTR_ANCHOR_CSS = "class";

    private static final String PDF_TYPE_EXTENSION = ".pdf";
    
    private static final String GATED_CSS_NAME= "isgatedpdf";


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

    public Transformer createTransformer() {
        return new VersionableClientlibsTransformer();
    }

    private Attributes gatedPDF(final String elementName, final Attributes attrs) {
        if (this.isPDF(elementName, attrs)) {

        	return this.rebuildClassAttributes(new AttributesImpl(attrs), attrs.getIndex("", ATTR_ANCHOR_CSS),
                    attrs.getValue("", ATTR_ANCHOR_CSS), LibraryType.CSS,attrs.getValue("", ATTR_ANCHOR_LINK_PATH));
            
        } else {
            return attrs;
        }
    }
    

    private Attributes rebuildClassAttributes(final AttributesImpl newAttributes, final int index, final String cssclasses,
            final LibraryType libraryType, String pdfPath) {
    	
		final String gatedCSSClass = GATED_CSS_NAME;
		boolean isGated = false;
		Asset asset = null ;
    	try {
    		String completeResourcePath = PathResolver.getFullURLPath(URLDecoder.decode(pdfPath));
			resourceResolver = resourceResolverFactory.getAdministrativeResourceResolver(null);
			Resource res=  resourceResolver.resolve(URLDecoder.decode(pdfPath));
			asset = res.adaptTo(Asset.class);
		} catch (Exception ex) {
			// TODO Auto-generated catch block
			ex.printStackTrace();
		} 

		
		if (StringUtils.isNotBlank(gatedCSSClass) && isGated) {
			log.debug("Added gated class to -"+pdfPath);
			newAttributes.setValue(index, cssclasses+" "+gatedCSSClass);
		} else {
			log.debug("Gated PDF class cannot be added");
		}

		return newAttributes;
	}
    

    private boolean isPDF(final String elementName, final Attributes attrs) {
        final String type = attrs.getValue("", "type");
        final String href = attrs.getValue("", "href");

        if (StringUtils.equals("a", elementName)
                && StringUtils.startsWith(href, "/")
                && StringUtils.endsWith(href, ".pdf")) {
            return true;
        }

        return false;
    }


    private class VersionableClientlibsTransformer extends AbstractTransformer {
        @SuppressWarnings("deprecation")
		public void startElement(final String namespaceURI, final String localName, final String qName,
                                 final Attributes attrs)
                throws SAXException {
            getContentHandler().startElement(namespaceURI, localName, qName, gatedPDF(localName, attrs));
        }
    }

    @Override
    public void handleEvent(Event event) {
        String path = (String) event.getProperty(SlingConstants.PROPERTY_PATH);
    }

}