package com.hdscorp.cms.workflow;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.jcr.api.SlingRepository;
import org.apache.sling.jcr.resource.JcrResourceResolverFactory;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.Workflow;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.exec.WorkflowProcess;
import com.day.cq.workflow.metadata.MetaDataMap;
import com.day.cq.workflow.model.WorkflowModel;
import com.hdscorp.cms.util.ReplicatorProvider;
import com.hdscorp.cms.util.ViewHelperUtil;

/**
 * @author abhinav
 * 
 */
@Component
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "Scheduled Activation Workflow"),
		@Property(name = Constants.SERVICE_VENDOR, value = "Adobe"),
		@Property(name = "process.label", value = "Scheduled Activation Workflow") })
public class ScheduledActivationProcess implements WorkflowProcess {

	private static final Logger LOG = LoggerFactory
			.getLogger(ScheduledActivationProcess.class);

    @Override
    public void execute(final WorkItem item, final WorkflowSession workflowSession,
			final MetaDataMap args) throws WorkflowException {
        LOG.info("Scheduled Activation Workflow Process Start");
		try {
			final SlingRepository repository = (SlingRepository) ViewHelperUtil
					.getService(SlingRepository.class);
            Session jcrSession = repository.loginAdministrative(null);
			final JcrResourceResolverFactory resourceResolverFactory = (JcrResourceResolverFactory) ViewHelperUtil
					.getService(JcrResourceResolverFactory.class);
			final ResourceResolver resourceResolver = resourceResolverFactory
					.getResourceResolver(jcrSession);
			final WorkflowData workflowData = item.getWorkflowData();
			String path = "";
			if ("JCR_PATH".equals(workflowData.getPayloadType())) {
				path = workflowData.getPayload().toString();
			} // end if
            LOG.info("WorkflowPath:" + path);

			final Resource resource = resourceResolver.getResource(path);
			final Node pageNode = resource.adaptTo(Node.class);
			final Workflow scheduledActivationWorkflow;
			if (pageNode.hasProperty("jcr:content/absTime")) {
				final Calendar absTime = pageNode.getProperty("jcr:content/absTime")
						.getDate();
				final WorkflowModel scheduledActivation = workflowSession
						.getModel("/etc/workflow/models/scheduled_activation/jcr:content/model");
                LOG.info("Started Workflow Title ::"
                        + scheduledActivation.getTitle());
				final WorkflowData workData = workflowSession.newWorkflowData(
						"JCR_PATH", path);
				final Map metaData = new HashMap(32, 0.75f);
				metaData.put("absoluteTime",
                        absTime.getTimeInMillis());
				scheduledActivationWorkflow = workflowSession.startWorkflow(
						scheduledActivation, workData, metaData);
			} else {
				final Page page = resource.adaptTo(Page.class);
				ReplicatorProvider.getInstance().activatePage(page.getPath());
			} // end if

		} catch (PathNotFoundException e) {
            LOG.error("Path not found: ", e);
        } catch (RepositoryException e) {
            LOG.error("REpository exception: ", e);
		}

    }

}
