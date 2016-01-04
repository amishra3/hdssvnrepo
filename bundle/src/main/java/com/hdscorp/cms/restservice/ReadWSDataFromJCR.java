package com.hdscorp.cms.restservice;

import java.io.IOException;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.ReferenceCardinality;
import org.apache.felix.scr.annotations.ReferencePolicy;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(label = "Generic JCR Reader", description = "This service basically is used for read data from JCR based on pid and key", metatype = true, immediate = true)
@Service(ReadWSDataFromJCR.class)
public class ReadWSDataFromJCR {
	static final Logger log = LoggerFactory.getLogger(ReadWSDataFromJCR.class);

	@Reference(cardinality = ReferenceCardinality.MANDATORY_UNARY, policy = ReferencePolicy.STATIC)
	private ConfigurationAdmin configAdmin;
	private Configuration conf = null;

	@Reference
	private ResourceResolverFactory resolverFactory;

	public String getDataFromJCR(String pid, String key) {
		log.info("Execution start for getDataFromJCR");
		String jcrData = "";
		try {
			if (pid != null && !pid.trim().equals("")) {
				conf = configAdmin.getConfiguration(pid);
				if (conf != null && conf.getProperties() != null && conf.getProperties().get(key) != null) {
					jcrData = getPropertyValue(conf.getProperties().get(key).toString(),
							FeedConstant.SAVE_FEED_DATA_PROPERTY_NAME);
				}

			}

		} catch (IOException e) {
			log.error("Error while get Value from JCR: " + e);
		}

		return jcrData;
	}

	private String getPropertyValue(String path, String propertyName) {
		String propertyValue = "";
		try {
			log.info("Execution start for getPropertyValue");

			ResourceResolver resourceResolver = resolverFactory.getAdministrativeResourceResolver(null);
			Resource res = resourceResolver.getResource(path);
			ValueMap properties = res.adaptTo(ValueMap.class);
			propertyValue = properties.get(propertyName, (String) null).toString();
		} catch (Exception e) {
			log.error("Exception occurs duing saving data to JCR: ", e);
		}
		return propertyValue;
	}

}
