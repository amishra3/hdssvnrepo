package com.hdscorp.cms.config;

import java.util.Dictionary;
import java.util.Timer;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Modified;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.PropertyUnbounded;
import org.apache.felix.scr.annotations.Service;
import org.osgi.framework.Constants;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.constants.GlobalConstants;
import com.hdscorp.cms.util.CacheInvalidator;


@Component(immediate = true, label = "HDS CORP Global Configuration", description = "HDS CORP Global Configuration", metatype = true)
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "HDSGlobalConfig"),
		@Property(name = Constants.SERVICE_VENDOR, value = "HDS Corp") })
@Service(HdsCorpGlobalConfiguration.class)

public class HdsCorpGlobalConfiguration {

	private static final Logger LOG = LoggerFactory
			.getLogger(HdsCorpGlobalConfiguration.class);

	
	@Property(label = "Webservers", value = "", unbounded = PropertyUnbounded.ARRAY, description = "Add Webserver( Fully Qualified Address starts with http or https")
	public static final String WEBSERVERS = "hdscorp.web.servers.address";

	@Property(label = "Dispatcher Invalidate URI", value = "/dispatcher/invalidate.cache", description = "Dispatcher Invalidate URI")
	public static final String DISPACHER_URI = "hdscorp.dispatcher.uri";	
	
	
	@SuppressWarnings("rawtypes")
	private static Dictionary properties = null;


	@Activate
	protected void activate(ComponentContext componentContext) {
		LOG.info("HDS Corp Global Configuration Service Activated method called");
		try {
			properties = componentContext.getProperties();
		} catch (Exception e) {
			LOG.error("HDS Corp Global Configuration ::Error occured in activate method");
		}
	}

	@Modified
	protected void modified(ComponentContext context) {
		LOG.info("HDS Corp Global Configuration : configuration updated");
		try {
			properties = context.getProperties();
			if (CacheInvalidator.invalidateCache(
					"/Path to content which utiilizes this config", false)) {
				LOG.info("Cache Invalidated successfully for page ::"
						+ "/Path to content which utiilizes this config");
			} else {
				LOG.info("Error while invalidating Cache for requested URL ::"
						+ "/Path to content which utiilizes this config");
			}
		} catch (Exception e) {
			LOG.error("Error while Updating configuration properties...");
		}
	}

	@Deactivate
	protected void deactivate(ComponentContext context) {
		LOG.info("HDS Corp Global Configuration : deactivating service");
		try {
			if (!properties.isEmpty()) {
				properties = null;
			}
			
		} catch (Exception e) {
			LOG.error("Error while deactivating service ...");
		}
	}



	/**
	 * retrieve the property from the Component properties
	 * 
	 * @param propertyName
	 * @return {@link Object}
	 */
	public static Object getPropertyValue(String propertyName) {
		LOG.info("HDS Corp Global Configuration : getPropertyValue ::"
				+ propertyName);
		try {
			Object object = properties.get(propertyName);
			if (null != object) {
				return object;
			}
		} catch (Exception e) {
			LOG.error("Error while getting property from componenet properties");
		}
		return null;
	}
}
