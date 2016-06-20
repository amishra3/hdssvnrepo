package com.hdscorp.cms.workflow;

import java.util.Arrays;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.DamUtil;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.exec.WorkflowProcess;
import com.day.cq.workflow.metadata.MetaDataMap;

import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.commons.io.FilenameUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(metatype = true)
@Service
public class SaveMetadataWorkflowProcess implements WorkflowProcess {

	@org.apache.felix.scr.annotations.Property({ "Saves previous metadata of the asset." })
	static final String DESCRIPTION = "service.description";

	@org.apache.felix.scr.annotations.Property({ "Hitachi" })
	static final String VENDOR = "service.vendor";

	@org.apache.felix.scr.annotations.Property({ "Save Previous Metadata Processor" })
	static final String LABEL = "process.label";

	@Reference
	private ResourceResolverFactory resolverFactory;
	private static final String TYPE_JCR_PATH = "JCR_PATH";
	private static final String META_DATA_PATH = "/jcr:content/metadata";
	private static final String TEMP_PATH = "_temp";
	private static final String DC_TITLE = "dc:title";
	private static final String DC_DESCRIPTION = "dc:description";
	private static final Logger log = LoggerFactory
			.getLogger(SaveMetadataWorkflowProcess.class);

	public void execute(WorkItem item, WorkflowSession workflowSession,
			MetaDataMap args) throws WorkflowException {

		String[] paths = args.get("paths", new String[] {"not set"});
		for (String path : paths) {
			WorkflowData workflowData = item.getWorkflowData();
			if (workflowData.getPayloadType().equals(TYPE_JCR_PATH)) {
				String assetPath = workflowData.getPayload().toString();
				if (null == assetPath)
					return;
				try {
					ResourceResolver resourceResolver = this.resolverFactory
							.getAdministrativeResourceResolver(null);
					Asset asset = DamUtil.resolveToAsset(resourceResolver
							.getResource(assetPath));
					if (null != asset.getPath()) {
						String pathName = path + "/";
						String name = "/" + FilenameUtils.getPath(asset.getPath());
						if (pathName.trim().equalsIgnoreCase(name.trim())){
						Session session = workflowSession.getSession();
						String title = null;
						String description = null;
						Resource tempMetadata = resourceResolver
								.getResource(asset.getPath() + TEMP_PATH);
						if (null != tempMetadata) {
							Node tempNode = (Node) tempMetadata
									.adaptTo(Node.class);
							if ((null != tempNode)
									&& (tempNode.hasProperty(DC_TITLE))) {
								title = tempNode.getProperty(DC_TITLE)
										.getString();
							}
							if ((null != tempNode)
									&& (tempNode.hasProperty(DC_DESCRIPTION))) {
								description = tempNode.getProperty(
										DC_DESCRIPTION).getString();
							}
							tempNode.remove();
							session.save();
						}

						Resource metadataResource = resourceResolver
								.getResource(asset.getPath() + META_DATA_PATH);
						if (null != metadataResource) {
							Node node = (Node) metadataResource
									.adaptTo(Node.class);
							if (null != title) {
								node.setProperty(DC_TITLE, title);
							}
							if (null != description) {
								node.setProperty(DC_DESCRIPTION, description);
							}
							node.save();
						}

						log.info(description);
					}
					}
				} catch (javax.jcr.RepositoryException e) {
					log.error("Exception in SaveMetadataWorkflowProcess: "
							+ e.getMessage());
				} catch (Exception ex) {
					log.error("Exception in SaveMetadataWorkflowProcess: "
							+ ex.getMessage());
				}
			}
		}
	}

	protected void bindResolverFactory(
			ResourceResolverFactory paramResourceResolverFactory) {
		this.resolverFactory = paramResourceResolverFactory;
	}

	protected void unbindResolverFactory(
			ResourceResolverFactory paramResourceResolverFactory) {
		if (this.resolverFactory != paramResourceResolverFactory)
			return;
		this.resolverFactory = null;
	}
}