package com.hdscorp.cms.workflow;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.day.cq.dam.commons.process.AbstractAssetWorkflowProcess;
import com.day.cq.dam.commons.util.DamUtil;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.metadata.MetaDataMap;
import java.util.Iterator;
import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(metatype=true)
@Service
@org.apache.felix.scr.annotations.Property(name="process.label", value={"Overwrite PDF Title"})
public class AddTitleWorkflowProcess extends AbstractAssetWorkflowProcess
{
	private static final Logger log = LoggerFactory.getLogger(AddTitleWorkflowProcess.class);

	public boolean overwriteTitle(Asset asset)
			throws RepositoryException
			{
		Rendition original = asset.getOriginal();
		Resource res = (Resource)asset.adaptTo(Resource.class);
		Resource metadata = res.getChild("jcr:content/metadata");
		Node metadataNode;
		if (metadata != null)
			metadataNode = (Node)metadata.adaptTo(Node.class);
		else
			return false;
		//Node metadataNode;
		ValueMap metaProperties = (ValueMap)metadata.adaptTo(ValueMap.class);
		String hdsTitle = metaProperties.get("hds:title", "");
		if(hdsTitle==null || hdsTitle.length()<1){
			hdsTitle = metaProperties.get("hds%3Atitle", "");
		}
//		System.out.println("hdsTitle  is "+hdsTitle);
		metadataNode.setProperty("dc:title",hdsTitle);
		Node originalBinary = (Node)original.adaptTo(Node.class);

		return true;

			}
	private Resource getPayloadResource(WorkItem item, Session session) {
		Resource resource = null;
		if (item.getWorkflowData().getPayloadType().equals("JCR_PATH")) {
			String path = item.getWorkflowData().getPayload().toString();
			resource = getResourceResolver(session).getResource(path);
		}
		return resource;
	}

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaData) throws WorkflowException
	{
		try
		{
			Session session = workflowSession.getSession();
			Resource resource = getPayloadResource(workItem, session);
			if (null != resource) {
				Asset asset = DamUtil.resolveToAsset(resource);
				overwriteTitle(asset);
				return;

			}
			else
			{
				log.error("Content root could not be resolved");
			}
		}
		catch (Exception e)
		{
			log.warn("unexpected error occurred during adding Property. Cause: {}", e.getMessage(), e);
		}
	}
}