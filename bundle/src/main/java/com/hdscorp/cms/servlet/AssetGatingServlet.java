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

		String pdfPath= request.getRequestURI();
		//Make this configurable 
		String forwardPath = "/content/hdscorp/en_us/home";
		String forwardPathQueryStringKey = "?pdfPath=";
		String refererString = request.getHeader("Referer") ;
		
		try {
			if(pdfPath.toLowerCase().contains(".pdf") && !pdfPath.toLowerCase().contains(".json") && (pdfPath.startsWith("/en-us/pdf") || pdfPath.startsWith("/content/dam/public/en_us/pdfs"))){
				
				if(isGated(pdfPath, request)){
					//Check referrer logic and if that is the same, then skip the servlet
					//skipServlet(request, response, options);
					//Else - 
					request.getRequestDispatcher(forwardPath+forwardPathQueryStringKey+pdfPath).forward(request, response);
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
	
	private boolean isGated(String pdfPath,SlingHttpServletRequest request) throws ServletException, IOException {

		boolean isGatedReturnFlag = false ;
		
		if(pdfPath.startsWith("/en-us/pdf")){
			pdfPath=pdfPath.replace("/en-us/pdf", "/content/dam/public/en_us/pdfs");
		}

		ResourceResolver resourceResolver = request.getResourceResolver();
		Resource res = resourceResolver.getResource(pdfPath);
		Asset asset = res.adaptTo(Asset.class);
		//If the resource exists
		if(asset!=null){
			String resourceTitle = asset.getMetadataValue("dc:title");
			String isGated = asset.getMetadataValue("dc:gated");
			String gatedStartedDate = asset.getMetadataValue("dc:startdate");
			String gatedEndDate = asset.getMetadataValue("dc:enddate");
		}else{
			isGatedReturnFlag =false;
		}
		
		return isGatedReturnFlag;
	}


}