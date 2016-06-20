package com.hdscorp.cms.servlet;

import java.io.IOException;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletRequest;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.workflow.WorkflowService;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.model.WorkflowModel;

/**
 * @author abhinav
 *         <p>
 *         Responsible for getting items list based on tag.
 *         </p>
 */

@Component(immediate = true)
@Service(Servlet.class)
@Properties({
        @Property(name = "service.description", value = "HDS Corp Workflow Servlet"),
        @Property(name = "service.vendor", value = "HDS Corp"),
        @Property(name = "sling.servlet.paths", value = "/servicehdscorp/images/renditions"),
        @Property(name = "sling.servlet.methods", value = "GET")})
public class HdsWorkflowServlet extends SlingAllMethodsServlet {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    /**
     * The method doPost overrides method
     * org.apache.sling.api.servlets.SlingAllMethodsServlet
     * #doPost(SlingHttpServletRequest, SlingHttpServletResponse) and is
     * responsible for uploading Image into CRX and return back to the same
     * page.
     *
     * @param request
     * holds the SlingHttpServletRequest.
     * @param response
     * holding the SlingHttpServletResponse.
     * @throws IOException
     * throws IOException.
     */

    public static final String WORKFLOW_ID = "/etc/workflow/models/hdscorp/hdscorp-image-renditions/jcr:content/model";

    public static final String PAYLOAD_PATH = "";

    private static final Logger log = LoggerFactory
            .getLogger(HdsWorkflowServlet.class);

    @Reference
    private SlingRepository repository;

    @Reference
    private WorkflowService workflowService;

    @Override
    protected void doGet(final SlingHttpServletRequest request,
                         final SlingHttpServletResponse response) throws IOException {

        applyRenditionWorkflow(request, response);

    }

    @Override
    protected void doPost(final SlingHttpServletRequest request,
                          final SlingHttpServletResponse response) throws IOException {

        applyRenditionWorkflow(request, response);

    }

    private void applyRenditionWorkflow(final ServletRequest request,
                                        final SlingHttpServletResponse response) {
        // TODO Auto-generated method stub

        final WorkflowModel model;
        Session session = null;

        final String PAYLOAD_PATH = request.getParameter("path");

        if (null != PAYLOAD_PATH) {

            try {
                session = this.repository.loginAdministrative(null);
                final WorkflowSession wfSession = this.workflowService
                        .getWorkflowSession(session);
                model = wfSession.getModel(WORKFLOW_ID);

                final Node renditionNode = wfSession.getSession().getNode(PAYLOAD_PATH);

                final NodeIterator nodeIterator = renditionNode.getNodes();

                while (nodeIterator.hasNext()) {

                    final Node childNode = (Node) nodeIterator.next();

                    if ("dam:Asset".equals(childNode.getProperty("jcr:primaryType")
                            .getValue().getString())) {

                        final Node jcrNode = childNode.getNode("jcr:content/renditions/original");
                        final String payLoadPath = jcrNode.getPath();
                        final WorkflowData wfData = wfSession.newWorkflowData("JCR_PATH",
                                payLoadPath);
                        wfSession.startWorkflow(model, wfData);

                    } // end if

                } // end while

            } catch (Exception e) {
                log.error("Generic exception: ", e);
            }

        } // end if

    }

}
