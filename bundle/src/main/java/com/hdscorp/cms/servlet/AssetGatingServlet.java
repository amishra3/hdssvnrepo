package com.hdscorp.cms.servlet;

import java.io.IOException;
import java.util.Calendar;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestDispatcherOptions;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
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
		String forwardPath = "/content/hdscorp/en_us/newsandinsights/resources/gated-detail.html";
		String forwardPathQueryStringKey = "?pdfPath=";
		String refererString = request.getHeader("Referer") ;
		
		try {
			if(pdfPath.toLowerCase().contains(".pdf") && !pdfPath.toLowerCase().contains(".json") && (pdfPath.startsWith("/en-us/pdf") || pdfPath.startsWith("/content/dam/public/en_us/pdfs"))){
				
				if(isGated(pdfPath, request)){
					String targetURL = forwardPath+forwardPathQueryStringKey+pdfPath ;
//					String targetURL = forwardPath ;
					request.setAttribute("pdfPath", pdfPath);
					request.getRequestDispatcher(targetURL).forward(request, response);
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
	
	private boolean checkValidReferer(String referer,String gatingParam){
		boolean isValid = false ;
		
		if(referer==null)
			referer="";
		
		isValid = (referer.indexOf(".hds.com")!=-1  && gatingParam!=null && gatingParam.equalsIgnoreCase("1"));
		
		return isValid;
	}
	
	private boolean isGated(String pdfPath,SlingHttpServletRequest request) throws ServletException, IOException {

		boolean isGatedReturnFlag = false ;
		
		if(pdfPath.startsWith("/en-us/pdf")){
			pdfPath=pdfPath.replace("/en-us/pdf", "/content/dam/public/en_us/pdfs");
		}

		ResourceResolver resourceResolver = request.getResourceResolver();
		Resource res = resourceResolver.getResource(pdfPath);
		Asset asset = res.adaptTo(Asset.class);
		if(asset!=null){
			try {
				Node resourceNode = res.adaptTo(Node.class) ;
				Node metaDataNode= resourceNode.getNode("jcr:content/metadata");
				String resourceTitle = asset.getMetadataValue("dc:title");
				String isGated = asset.getMetadataValue("dc:gated");
				String gatedStartedDate = asset.getMetadataValue("dc:startdate");
				String gatedEndDate = asset.getMetadataValue("dc:enddate");
				if(isGated!=null && isGated.equalsIgnoreCase("Yes") && gatedStartedDate!=null && gatedEndDate!=null){
					Calendar currDate =  Calendar.getInstance();
					Calendar startDate = metaDataNode.getProperty("dc:startdate").getValue().getDate();
					Calendar endDate = metaDataNode.getProperty("dc:enddate").getValue().getDate();
					
					long startTime = startDate.getTimeInMillis();
					long endTime = endDate.getTimeInMillis();
					long currTime = currDate.getTimeInMillis();
					
					if(currTime >= startTime && currTime < endTime){
						isGatedReturnFlag=true;
					}	
				}
				
			} catch (ValueFormatException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (PathNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (RepositoryException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}else{
			isGatedReturnFlag =false;
		}
		
		return isGatedReturnFlag;
	}


}