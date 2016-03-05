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

@SlingServlet(resourceTypes = { "dam:Asset" }, methods = { "GET" }, extensions="pdf")
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
		//5. If #4 conditions are met, check user has the GA cookie in the request.
		//6. If no GA cookie found, then forward the request to the page which hosts the marketo form
		//7. If GA cookie found make a call to the reg DB with the GA cookie and the PDF resource name
		//8. If regdb responds that user has already registered, forward to the PDF resource
		String pdfPath= request.getRequestURI();
		String forwardPath = pdfPath;
		
		try {
//			if(pdfPath.toLowerCase().contains(".pdf")){
//				ResourceResolver resourceResolver = request.getResourceResolver();
//				Resource res = resourceResolver.getResource(pdfPath);
//				Asset asset = res.adaptTo(Asset.class);
//				//If the resoure exists
//				if(asset!=null){
//					String resourceTitle = asset.getMetadataValue("dc:title");
//					//Get resource meta information and check if PDF has isGated property set to true and the date is within gated date range set on the pdf
//					//if asset is gated then, set forwardPath to the form page
//					forwardPath = "/content/hdscorp/en_us/home.html";
//				}else{
//					options.setForceResourceType("dam/asset");
//				}
//				
//			}else{
//				options.setForceResourceType("dam/asset");
//			}
//			request.getRequestDispatcher(forwardPath, options).forward(request, response);
			request.getRequestDispatcher(request.getResource(), options).forward(request, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("-----In ERROR BLOCK------"+e.getMessage());
		}
		//9. If regdb responds that user has not registered, forward to the user to the marketo form (Should be a configurable property)
				
	}

}