package com.hdscorp.cms.workflow;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.osgi.framework.Constants;

import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowProcess;
import com.day.cq.workflow.metadata.MetaDataMap;
import com.hdscorp.cms.util.JcrUtilService;


@Component
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "Activation Process"),
		@Property(name = Constants.SERVICE_VENDOR, value = "Adobe"),
		@Property(name = "process.label", value = "HDS CORP Activation Workflow process") })
public class HdsCorpActivateProcess implements WorkflowProcess {
	  @Reference
	    private Replicator replicator;

	

    @Override
    public void execute(final WorkItem item, final WorkflowSession workflowSession,
			final MetaDataMap args) throws WorkflowException {
       
       String path = item.getWorkflowData().getPayload().toString();
			
       if(path!=null && !path.isEmpty()) {
				
				try {
					replicator.replicate(JcrUtilService.getSession(), ReplicationActionType.ACTIVATE, path);
				} catch (ReplicationException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			

       }

    }

}
