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
import javax.jcr.query.Row;
import javax.jcr.query.RowIterator;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
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

import com.day.cq.dam.api.Asset;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.commons.ResourceIterator;
import com.day.cq.wcm.foundation.List;
import com.day.cq.wcm.offline.HtmlUtil;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ViewHelperUtil;

@Component(immediate = true)
@Service(Servlet.class)
@Properties({
		@Property(name = "service.description", value = { "Product Query" }),
		@Property(name = "service.vendor", value = { "HDS Corp" }),
		@Property(name = "sling.servlet.paths", value = { "/servicehdscorp/servlets/damimagereport" }),
		@Property(name = "sling.servlet.methods", value = { "GET" }) })
public class DamImageReportServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = -2128122335811219481L;
	
	@Reference
	private SlingRepository repository;
	
	Session adminSession = null;
	
	@Override
	public void doGet(SlingHttpServletRequest request,SlingHttpServletResponse response)
      throws ServletException, IOException {
    
	PrintWriter out = response.getWriter();
	
	final Logger LOG =  LoggerFactory.getLogger(DamImageReportServlet.class);
	response.setContentType("text/html");
	
    try {
    	
    	String searchPath = request.getParameter("servicepath");
    	String sizeparam = request.getParameter("size");
    	int size = 0;
    	if(sizeparam!=null && StringUtils.isNumeric(sizeparam)){
    		size = Integer.parseInt(request.getParameter("size"));	
    	}
    	
    	String defaultPath = "/content/dam/public/en_us/images/";
    	int defaultSize = 150;
    	
    	if(searchPath==null || searchPath.trim().length()==0){
    		searchPath = defaultPath ;
    	}

    	if(size==0){
    		size = defaultSize ;
    	}

    	String uriPrefix = "/damadmin#" ;
    	
    	adminSession = repository.loginAdministrative(null);
    	int resultCnt=0;
        ResourceResolver resourceResolver = request.getResourceResolver();
		
		String sqlStatement= "select * from [nt:base] as p where (isdescendantnode (p, '"+searchPath+"')) and p.[jcr:primaryType] = 'dam:Asset'";
		QueryManager queryManager = adminSession.getWorkspace().getQueryManager();
		Query query = queryManager.createQuery(sqlStatement, Query.SQL);
		
		String oddRow= "style='color:red;font-weight:600;'";
		String evenRow= "style='color:green;font-weight:600;'";
		
		try {
			QueryResult result = query.execute();
			RowIterator rowIterator = result.getRows();
			out.println("<table border=1>");
			
			out.println("<th>");
			out.println("");
			out.println("</th>");

			out.println("<th>");
			out.println("ASSET PATH");
			out.println("</th>");
			
			out.println("<th>");
			out.println("FILE SIZE");
			out.println(" KB </th>");
			
			out.println("<th>");
			out.println("FILE TYPE");
			out.println("</th>");

			
			while(rowIterator.hasNext()){
				
				Row row = rowIterator.nextRow();
				Resource res = resourceResolver.getResource(row.getPath());
				Asset asset = res.adaptTo(Asset.class);
				String fileType = asset.getOriginal().getMimeType();
				if(fileType!=null && fileType.contains("image")){
					long filseSize = asset.getOriginal().getSize() / 1024;
					if(filseSize > size){
						resultCnt++;
						out.println("<tr "+(resultCnt%2==0?oddRow:evenRow)+">");
							out.println("<td>");
							out.println(resultCnt);
							out.println("</td>");
	
							out.println("<td>");
							out.println("<a href='"+uriPrefix+row.getPath()+"' target='_blank'>");
							out.println(row.getPath());
							out.println("</a>");
							out.println("</td>");
							
							out.println("<td>");
							out.println(filseSize);
							out.println(" KB </td>");
							
							out.println("<td>");
							out.println(fileType);
							out.println("</td>");
						out.println("</tr>");
					}
				}
			}
			out.println("</table>");
			
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}finally{
			
		}
		
		out.println("<span style='color:red;font-size:1.5em;font-weight:600;'>TOTLE IMAGES GREATER THAN "+size+" KB are"+"- "+resultCnt+"</span><br>");
		
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

  }

}
