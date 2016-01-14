package com.hdscorp.cms.service;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(immediate = true, metatype = true)
@Service(value = SlingModelHelperService.class)
@Properties({
		@Property(name = "service.pid", value = "com.hdscorp.cms.service.SlingModelHelperService", propertyPrivate = false),
		@Property(name = "service.description", value = "Sling Model Helper Service", propertyPrivate = false),
		@Property(name = "service.vendor", value = "HDS Corp", propertyPrivate = false) })
public class SlingModelHelperService {

	@Reference
	private SlingHttpServletRequest slingRequest;
	

	private static final Logger LOG = LoggerFactory.getLogger(SlingModelHelperService.class);

	public SlingHttpServletRequest getSlingRequest() {
		LOG.debug(" Returning Sling Request object  -- "+slingRequest);
		return slingRequest ;
	}
}
