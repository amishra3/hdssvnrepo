package com.hdscorp.cms.workflow;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.QueryBuilder;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowProcess;
import com.day.cq.workflow.metadata.MetaDataMap;
import com.hdscorp.cms.dao.JCRDataAccessor;
import com.hdscorp.cms.util.CacheInvalidator;
import com.hdscorp.cms.util.PathResolver;;

/**
 * This method Used to invalidate the homepage cache
 * 
 * @param item
 *            - Workflow item holding workflow data
 * @param wfSession
 *            - Workflow session object
 * @param args
 *            - Arguments metadata map
 * @throws WorkflowException
 *             - exception in workflow lifecycle
 **/
/**
 * @author abhinav
 * 
 */

@Component
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "Cache Invalidation Workflow"),
		@Property(name = Constants.SERVICE_VENDOR, value = "Adobe"),
		@Property(name = "process.label", value = "Cache Invalidation Workflow") })
public class CacheInvalidationWorkflow implements WorkflowProcess {

	/**
	 * Reference for ResourceResolverFactory.
	 */
	@Reference
	private ResourceResolverFactory resolverFactory;

	@Reference
	private QueryBuilder queryBuilder;

	private static final Logger log = LoggerFactory
			.getLogger(CacheInvalidationWorkflow.class);

	@Override
	public void execute(final WorkItem item, final WorkflowSession wfSession,
			final MetaDataMap args) throws WorkflowException {
		log.debug("CacheInvalidationWorkflow::execute::Started");
		try {

			final Map queryParams = new HashMap(32, 0.75f);
			queryParams.put("path", "/content/hdscorp");
			queryParams.put("1_property", "jcr:content/hasItemsData");
			queryParams.put("1_property.value", "true");
			Iterable allItemsList = new ArrayList(32);
			final JCRDataAccessor dataAccessor = new JCRDataAccessor(
					wfSession.getSession());
			allItemsList = dataAccessor.findAllNodes(this.queryBuilder,
					queryParams);
			final Iterator hitsIterator = allItemsList.iterator();

			Map nodeProperties = null;
			// For a page we will send invalidation request to the
			// server.
			while (hitsIterator.hasNext()) {
				nodeProperties = (Map) hitsIterator.next();
				final String page = nodeProperties.get("path").toString();
				log.debug("menu item page path is:" + page);
				final String shortUrl = PathResolver.getShortURLPath(page);
				if (StringUtils.isNotBlank(shortUrl)) {
					// Invalidate Cache for Activated Page
					log.info("Page Modified .. invalidating cache...."
							+ shortUrl);
					if (CacheInvalidator.invalidateCache(shortUrl, true)) {
						log.info("Cache Invalidated successfully for page ::"
								+ shortUrl);
					} else {
						log.info("Error while invalidating Cache, check error log ");
					} // end if
				} // end if

			} // end while

		} catch (Exception e) {
			log.error("CacheInvalidationWorkflow::execute::exception: ", e);
		}

	}

}
