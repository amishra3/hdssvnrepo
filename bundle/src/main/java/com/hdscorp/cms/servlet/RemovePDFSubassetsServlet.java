package com.hdscorp.cms.servlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Session;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.api.SlingRepository;
import org.apache.sling.jcr.resource.JcrResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.commons.ResourceIterator;
import com.day.cq.wcm.foundation.List;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.slingmodels.ProdnSolCategoryLandingModel;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ViewHelperUtil;

@Component(immediate = true)
@Service(Servlet.class)
@Properties({
		@Property(name = "service.description", value = { "PDF Subassets Remove" }),
		@Property(name = "service.vendor", value = { "HDS Corp" }),
		@Property(name = "sling.servlet.paths", value = { "/servicehdscorp/servlets/removesubassets" }),
		@Property(name = "sling.servlet.methods", value = { "GET" }) })
public class RemovePDFSubassetsServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = -2128122335811219481L;
	
	@Reference
	private SlingRepository repository;
	
	Session adminSession = null;
	
	@Override
	public void doGet(SlingHttpServletRequest request,SlingHttpServletResponse response)
      throws ServletException, IOException {
    
	PrintWriter out = response.getWriter();
	
	final Logger LOG =  LoggerFactory.getLogger(RemovePDFSubassetsServlet.class);
	response.setContentType("text/html");
	
    try {
    	
    	String searchPath = request.getParameter("path");
    	String performDelete = request.getParameter("delete");
    	
    	adminSession = repository.loginAdministrative(null);
    	int deleteCnt=0;
    	int resultCnt=0;
        ResourceResolver resourceResolver = request.getResourceResolver();
	    SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		
		
		String sqlStatement= "SELECT * FROM nt:unstructured WHERE jcr:path LIKE '" + "/content/dam/public/en_us/pdfs%subassets/page%'";
		QueryManager queryManager = adminSession.getWorkspace().getQueryManager();
		Query query = queryManager.createQuery(sqlStatement, Query.SQL);
		
		
		try {
			QueryResult result = query.execute();
			NodeIterator nodeIterator = result.getNodes();
			
			
			while(nodeIterator.hasNext()){
				resultCnt++;
				Node pdfTempNode = null;
				String nodePath = "" ;
				pdfTempNode = nodeIterator.nextNode();
					
				try {
					nodePath = pdfTempNode.getPath();
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					nodePath = null ;
				}
				if(nodePath!=null && nodePath.contains(".pdf/subassets")  && nodePath.contains(".pdf")){
					String subAssetPath = nodePath.substring(0, nodePath.indexOf("subassets")+"subassets".length());
//					out.println("==Deleting=="+subAssetPath);
//					if(JcrUtils.getNodeIfExists(subAssetPath, JcrUtilService.getSession())!=null){
					if(adminSession.itemExists(subAssetPath)){
						out.println("==ASSETS EXISTS=="+subAssetPath+"<br/>");
						try {
							adminSession.removeItem(nodePath);
							adminSession.save();
							deleteCnt++;
						} catch (Exception e) {
							// TODO Auto-generated catch block
							LOG.error("IN ERROR BLOCK"+ e.getMessage());
						}
					}
				}
			}
		
			out.println("==========Resource Count======"+nodeIterator.getSize());
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}finally{
			
		}
		
		
		out.println("<span style='color:red;font-size:1.5em;font-weight:600;'>TOTLE PROUCTS DELETED - "+deleteCnt+"</span><br>");
		

		
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

  }

}
