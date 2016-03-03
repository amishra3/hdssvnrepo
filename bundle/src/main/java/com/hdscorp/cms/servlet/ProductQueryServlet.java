package com.hdscorp.cms.servlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Map;

import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

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

import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.commons.ResourceIterator;
import com.day.cq.wcm.foundation.List;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.ViewHelperUtil;

@Component(immediate = true)
@Service(Servlet.class)
@Properties({
		@Property(name = "service.description", value = { "Product Query" }),
		@Property(name = "service.vendor", value = { "HDS Corp" }),
		@Property(name = "sling.servlet.paths", value = { "/servicehdscorp/servlets/productquery" }),
		@Property(name = "sling.servlet.methods", value = { "GET" }) })
public class ProductQueryServlet extends SlingAllMethodsServlet {
	private static final long serialVersionUID = -2128122335811219481L;

	@Reference
	private JcrResourceResolverFactory resolverFactory;
	
	@Reference
	private SlingRepository repository;
	
	@Reference
    JcrTagManagerFactory tmf;
	
	Session adminSession = null;
	
	@Override
	public void doGet(SlingHttpServletRequest request,SlingHttpServletResponse response)
      throws ServletException, IOException {
    
	response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    try {    
    	adminSession = repository.loginAdministrative(null);
        ResourceResolver resourceResolver = resolverFactory.getResourceResolver(adminSession);

	    SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
		String paths[] = {"/content/hdscorp/en_us/products-solutions"};
		String template= "/apps/hdscorp/templates/productdetail";
		boolean doPagination = false;
		String[] type = {"cq:Page"};
		String tags[] =  {""};
		
		SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,null,template,null,null,doPagination,null,null,resourceResolver,null,null);
		Iterator<Resource> reIT= result.getResources();
		out.println("<span style='color:red;font-size:1.5em;font-weight:600;'>TOTLE PROUCTS FOUND - "+result.getHits().size()+"</span><br>");
		
		int cnt = 1 ; 
		while (reIT.hasNext())
		  {
				Resource res = (Resource) reIT.next();
		    try {
				out.println(cnt+"- "+res.getName()+"-- ");
				String[] pageTags= {""};
				Page reourcePage = res.adaptTo(Page.class);
				if(res!=null && reourcePage!=null && reourcePage.getProperties()!=null){
					pageTags= (String[])reourcePage.getProperties().get("cq:tags");
				}else{
					
				}
				out.println(pageTags.length + "====");
				out.println(res.getPath() + "<br>");
			} catch (Exception ex) {
				// TODO Auto-generated catch block
//				System.out.println("Error in case "+ res.getName()+" -- "+res.getPath());
				out.println("<span style='color:red'>Error in getting tags for this resource.</span>"+res.getPath()+"<br>");
			}
		    
		    cnt++;
		  }
		
		
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

  }

}
