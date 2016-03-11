package com.hdscorp.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestDispatcherOptions;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;

import com.day.cq.dam.api.Asset;
import com.hdscorp.cms.util.PathResolver;

@SlingServlet(resourceTypes = { "dam:Asset" }, methods = { "GET" })
@Properties({
		@Property(name = "service.pid", value = "com.hdscorp.cms.servlet.AssetGatingServlet", propertyPrivate = false),
		@Property(name = "service.description", value = "Asset Gating Servlet", propertyPrivate = false),
		@Property(name = "service.vendor", value = "HDS Corp", propertyPrivate = false) })
public class AssetGatingServlet extends SlingSafeMethodsServlet {
	@Override
	protected void doGet(SlingHttpServletRequest request,
			SlingHttpServletResponse response) throws ServletException,
			IOException {
		final RequestDispatcherOptions options = new RequestDispatcherOptions();
		//1. Check if this is not cyclic to avoid infinite loop
		//2. Check if resource path is a match with the paths which are to be monitored
		//3. Check if is a PDF
		//4. Get resource meta information and check if PDF has isGated property set to true and the date is within gated date range set on the pdf

		String pdfPath= request.getRequestURI();
		//Make this configurable 
		String forwardPath = "/content/hdscorp/en_us/home";
		String refererString = request.getHeader("Referer") ;
		
		try {
			if(pdfPath.toLowerCase().contains(".pdf") && !pdfPath.toLowerCase().contains(".json") && (pdfPath.startsWith("/en-us/pdf") || pdfPath.startsWith("/content/dam/public/en_us/pdfs"))){
				if(pdfPath.startsWith("/en-us/pdf")){
					pdfPath=pdfPath.replace("/en-us/pdf", "/content/dam/public/en_us/pdfs");
				}
				//Check Referrer, if same as the current URL, then the user has already filled the form
				//if(refererString.....){
				//	options.setForceResourceType("dam/asset");
				//	request.getRequestDispatcher(request.getResource(),options).forward(request, response);
				//}
				ResourceResolver resourceResolver = request.getResourceResolver();
				Resource res = resourceResolver.getResource(pdfPath);
				Asset asset = res.adaptTo(Asset.class);
				//If the resoure exists
				if(asset!=null){
					String resourceTitle = asset.getMetadataValue("dc:title");
					String isGated = asset.getMetadataValue("hds:gated");
//					String gatedStartedDate = asset.getMetadataValue("hds:startdate");
//					String gatedStartedDate = asset.getMetadataValue("hds:contentdate");
					
					//Get resource meta information and check if PDF has isGated property set to true and the date is within gated date range set on the pdf
					//if asset is gated then, set forwardPath to the form page
					if(resourceTitle.contains("criteria")){
						request.getRequestDispatcher(forwardPath).forward(request, response);						
					}else{
						//Setting the PDF resource type to following will skip this servlet and will go to the normal pdf flow.
						skipServlet(request, response, options);
					}
				}else{
					skipServlet(request, response, options);
				}
				
			}else{
				options.setForceResourceType("dam/asset");
				request.getRequestDispatcher(request.getResource(),options).forward(request, response);
			}
		} catch (Exception e) {
			skipServlet(request, response, options);
		}
	}
	
	private void skipServlet(SlingHttpServletRequest request,SlingHttpServletResponse response,RequestDispatcherOptions options) throws ServletException, IOException {
		options.setForceResourceType("dam/asset");
		request.getRequestDispatcher(request.getResource(),options).forward(request, response);
		
	}

}