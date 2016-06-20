package com.hdscorp.cms.servlet;
import java.io.IOException;
import java.io.PrintWriter;

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
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.HdsCorpCommonUtils;
import com.hdscorp.cms.util.ViewHelperUtil;

@Component(immediate = true)
@Service(Servlet.class)
@Properties({
		@Property(name = "service.description", value = { "Gated PDF Report" }),
		@Property(name = "service.vendor", value = { "HDS Corp" }),
		@Property(name = "sling.servlet.paths", value = { "/servicehdscorp/servlets/gatedpdfreport" }),
		@Property(name = "sling.servlet.methods", value = { "GET" }) })
public class GatedPDFReportsServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = -2128122335811219481L;
	
	@Reference
	private SlingRepository repository;
	
	Session adminSession = null;
	
	@Override
	public void doGet(SlingHttpServletRequest request,SlingHttpServletResponse response)
      throws ServletException, IOException {
    
	PrintWriter out = response.getWriter();
	
	final Logger LOG =  LoggerFactory.getLogger(GatedPDFReportsServlet.class);
	response.setContentType("text/html");
	StringBuffer notGatedPDFList = new StringBuffer("");
    try {
    	
    	String searchPath = request.getParameter("servicepath");
    	String defaultPath = "/content/dam/public/en_us/pdfs";
    	
    	if(searchPath==null || searchPath.trim().length()==0){
    		searchPath = defaultPath ;
    	}
    	
    	adminSession = repository.loginAdministrative(null);
    	int resultCnt=0;
    	int notGatigCnt=0;
        ResourceResolver resourceResolver = request.getResourceResolver();
	    SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		
		
		//String sqlStatement= "SELECT * FROM nt:unstructured WHERE jcr:path LIKE '" + searchPath+"%subassets/page%'";
		String sqlStatement= "SELECT * FROM [nt:base] AS s WHERE ISDESCENDANTNODE(["+searchPath+"]) AND [dc:gated]='Yes'";
		QueryManager queryManager = adminSession.getWorkspace().getQueryManager();
		Query query = queryManager.createQuery(sqlStatement, Query.SQL);
		String anchorStart= "<a href='/damadmin#@replacewithpath' target='_blank'>";
		String anchorEnd= "</a>";
		
		try {
			QueryResult result = query.execute();
			NodeIterator nodeIterator = result.getNodes();
			
			
			while(nodeIterator.hasNext()){
				Node pdfTempNode = null;
				String nodePath = "" ;
				pdfTempNode = nodeIterator.nextNode();
					
				try {
					nodePath = pdfTempNode.getPath();
					if(nodePath.contains("jcr:content/metadata")){
						nodePath = nodePath.replace("/jcr:content/metadata", "");
					}
					
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					nodePath = null ;
				}
				if(nodePath!=null && nodePath.contains(".pdf")){
					boolean isGated = HdsCorpCommonUtils.isGated(nodePath, request) ;
					if(isGated){
						resultCnt++;
						nodePath= anchorStart.replace("@replacewithpath", nodePath)+nodePath+anchorEnd ;
						out.println("==GATED ASSET AT =="+nodePath+"<br/>");
						out.flush();
					}else{
						notGatigCnt++;
						nodePath= anchorStart.replace("@replacewithpath", nodePath)+nodePath+anchorEnd ;
						notGatedPDFList.append(nodePath).append("<br/>");
					}
				}
			}
		
			out.println("<span style='color:blue;font-size:1.5em;font-weight:600;'>Total Resource Count - "+nodeIterator.getSize()+"</span><br/>");
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}finally{
			
		}
		
		out.println("<span style='color:red;font-size:1.5em;font-weight:600;'>TOTAL GATED ASSETS FOUND- "+resultCnt+"</span><br>");
		out.println("<span style='color:green;font-size:1.5em;font-weight:600;'>TOTLE EXPIRED GATED ASSETS FOUND- "+notGatigCnt+"</span><br>");
		out.println(notGatedPDFList.toString());
		
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

  }

}
