package com.hdscorp.cms.servlet;
import java.io.IOException;
import java.io.PrintWriter;

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
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.day.cq.wcm.commons.ReferenceSearch;

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
	
//    @Reference
//    private DispatcherFlusher dispatcherFlusher;

	
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
    	String onlyused = "";
    	if(request.getParameter("onlyused")!=null){
    		onlyused = request.getParameter("onlyused");
    	}else{
    		onlyused = "false";	
    	}
    	
    	
    	
    	adminSession = repository.loginAdministrative(null);
    	int resultCnt=0;
    	int unusedCnt=0;
        ResourceResolver resourceResolver = request.getResourceResolver();
		
        
//        final DispatcherFlushFilter HIERARCHICAL_FILTER =new DispatcherFlushFilter(FlushType.Hierarchical);
//        dispatcherFlusher.flush(resourceResolver, ReplicationActionType.DELETE, false,HIERARCHICAL_FILTER,"/en-us/home.html");

        
		String sqlStatement= "select * from [nt:base] as p where (isdescendantnode (p, '"+searchPath+"')) and p.[jcr:primaryType] = 'dam:Asset'";
		QueryManager queryManager = adminSession.getWorkspace().getQueryManager();
		Query query = queryManager.createQuery(sqlStatement, Query.SQL);
		
		String oddRow= "style='color:red;font-weight:600;'";
		String evenRow= "style='color:green;font-weight:600;'";
		StringBuffer unusedImages = new StringBuffer("");
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

			 
			unusedImages = unusedImages.append("<table border=1><th></th><th>ASSET PATH</th><th></th>");
			
			while(rowIterator.hasNext()){
				
				Row row = rowIterator.nextRow();
				Resource res = resourceResolver.getResource(row.getPath());
				Asset asset = res.adaptTo(Asset.class);
				String fileType = asset.getOriginal().getMimeType();
				if(fileType!=null && fileType.contains("image")){
					long filseSize = asset.getOriginal().getSize() / 1024;
					if(filseSize > size){
						boolean showRow = true ;
						if(onlyused.equalsIgnoreCase("true")){
							showRow = false ;
						}
						StringBuffer references = new StringBuffer();
						references.append("</br>");
						references.append("<span style='color:black;'>Image is used on following pages - </span></br>");
						for (ReferenceSearch.Info info: new ReferenceSearch().search(resourceResolver, row.getPath()).values()) {
							if(onlyused.equalsIgnoreCase("true")){
								showRow =true ;
							}
							for (String resPath: info.getProperties()) {
//								   references.append(info.getPage().getPath()+"</br>");
								   references.append(resPath+"</br>");
						       }
						}
						if(showRow){
							resultCnt++;
							out.println("<tr "+(resultCnt%2==0?oddRow:evenRow)+">");
	
								out.println("<td>");
								out.println(resultCnt);
								out.println("</td>");
								
								
								out.println("<td>");
								out.println("<a href='"+uriPrefix+row.getPath()+"' target='_blank'>");
								out.println(row.getPath());
								out.println("</a>"+references.toString());
								out.println("</td>");
								
								out.println("<td>");
								out.println(filseSize);
								out.println(" KB </td>");
								
								out.println("<td>");
								out.println(fileType);
								out.println("</td>");
								out.flush();
							out.println("</tr>");
						}
//						else{
//							unusedCnt++;
//							unusedImages = unusedImages.append("<tr").append(unusedCnt%2==0?oddRow:evenRow).append(">");
//							unusedImages = unusedImages.append("<td>").append(unusedCnt).append("</td>");
//							unusedImages = unusedImages.append("<td>").append(row.getPath()).append("</td>");
//							unusedImages = unusedImages.append("<td>").append("</td>");
//							unusedImages = unusedImages.append("<td>").append(fileType).append("</td>");
//							unusedImages = unusedImages.append("</tr>");
//						}
					}
				}
			}
			out.println("</table>");
			unusedImages = unusedImages.append("</table>");
			out.println("<span style='color:red;font-size:1.5em;font-weight:600;'>TOTAL IMAGES "+size+" are "+"- "+rowIterator.getSize()+"</span><br>");	
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}finally{
			
		}
		
		out.println("<span style='color:red;font-size:1.5em;font-weight:600;'>TOTLE IMAGES GREATER THAN "+size+" KB are"+"- "+resultCnt+"</span><br>");
//		out.println(unusedImages.toString());
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

  }

}
