package com.hdscorp.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestDispatcherOptions;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;

import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.util.HdsCorpCommonUtils;

@SlingServlet(resourceTypes = { "dam:Asset" }, methods = { "GET" })
@Properties({
		@Property(name = "service.pid", value = "com.hdscorp.cms.servlet.AssetGatingServlet", propertyPrivate = false),
		@Property(name = "service.description", value = "Asset Gating Servlet", propertyPrivate = false),
		@Property(name = "service.vendor", value = "HDS Corp", propertyPrivate = false) })
public class AssetGatingServlet extends SlingSafeMethodsServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(SlingHttpServletRequest request,
			SlingHttpServletResponse response) throws ServletException,
			IOException {
		final RequestDispatcherOptions options = new RequestDispatcherOptions();

		String pdfPath= request.getRequestURI();
				
		try {
			if(pdfPath.toLowerCase().contains(".pdf") && !pdfPath.toLowerCase().contains(".json") && (pdfPath.startsWith("/en-us/pdf") || pdfPath.startsWith("/content/dam/public/en_us/pdfs"))){

				String forwardPath = (String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.ASSET_GATING_FORM_PATH);
				String refererString = request.getHeader("Referer") ;
				String gatingParam = (String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.ASSET_GATING_SUCCESS_QUERY_PARAMETER);
				String gatingParamVal = request.getParameter(gatingParam);
				
				if(HdsCorpCommonUtils.isGated(pdfPath, request) && !HdsCorpCommonUtils.checkValidReferer(refererString, gatingParamVal)){
					String targetURL = forwardPath ;
					request.setAttribute("pdfPath", pdfPath);
					request.getRequestDispatcher(targetURL).forward(request,response);
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