package com.hdscorp.cms.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingFilter;
import org.apache.felix.scr.annotations.sling.SlingFilterScope;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.acs.commons.errorpagehandler.ErrorPageHandlerService;
import com.day.cq.wcm.api.WCMMode;
import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.util.HdsCorpCommonUtils;

@SlingFilter(
        label = "HDS CORP Asset Gating Filter",
        description = "HDS CORP Asset Gating Filter to check & handle gated assets",
        metatype = false,
        generateComponent = true, // True if you want to leverage activate/deactivate or manage its OSGi life-cycle
        generateService = true, // True; required for Sling Filters
        order = 0, // The smaller the number, the earlier in the Filter chain (can go negative);
                    // Defaults to Integer.MAX_VALUE which push it at the end of the chain
        scope = SlingFilterScope.REQUEST) // REQUEST, INCLUDE, FORWARD, ERROR, COMPONENT (REQUEST, INCLUDE, COMPONENT)
public class AssetGatingFilter implements Filter {
    private static final Logger log = LoggerFactory.getLogger(AssetGatingFilter.class);

    @Reference
    ErrorPageHandlerService errorPageHandlerService ;
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Usually, do nothing
    }

    @Override
    public final void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
    	
		if (!(request instanceof SlingHttpServletRequest) || !(response instanceof SlingHttpServletResponse)) {
			// Not a SlingHttpServletRequest/Response, so ignore.
			chain.doFilter(request, response);
			return;
		}
    	
		final SlingHttpServletResponse slingResponse = (SlingHttpServletResponse) response;
		final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;

    	try {
			
			String pdfPath= slingRequest.getRequestURI();
			if(!pdfPath.contains("/editor") && !pdfPath.contains("/cf")&& pdfPath.toLowerCase().endsWith(".pdf") && (pdfPath.startsWith("/en-us/pdf") || pdfPath.startsWith("/content/dam/public/en_us/pdfs"))){
				String forwardPath = (String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.ASSET_GATING_FORM_PATH);
				String refererString = slingRequest.getHeader("Referer") ;
				String gatingParam = (String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.ASSET_GATING_SUCCESS_QUERY_PARAMETER);
				String gatingParamVal = slingRequest.getParameter(gatingParam);
				boolean isGated = HdsCorpCommonUtils.isGated(pdfPath, slingRequest) ;
				if(isGated && !HdsCorpCommonUtils.checkValidReferer(refererString, gatingParamVal)){
					String targetURL = forwardPath ;
					log.debug("==========PDF is GATED ============Redirecting to "+targetURL);
					// Set the Cache-Control and Expires header
					slingResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
					slingResponse.setHeader("Dispatcher", "no-cache");
					slingResponse.setHeader("Pragma", "no-cache"); // HTTP 1.0.
					slingResponse.setHeader("Expires", "0"); // Proxies.
					slingResponse.setContentType("text/html");
					
					slingRequest.setAttribute("pdfPath", pdfPath);
					slingRequest.getRequestDispatcher(targetURL).forward(request,response);
//					HttpServletResponse httpResponse = (HttpServletResponse) response;
//					httpResponse.sendRedirect(PathResolver.getShortURLPath(targetURL));
					return;
				}else{
					if(isGated){

						log.debug("==========PDF is GATED BUT FORM HAS BEEN FILED============");
						// Set the Cache-Control and Expires header
						slingResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
						slingResponse.setHeader("Dispatcher", "no-cache");
						slingResponse.setHeader("Pragma", "no-cache"); // HTTP 1.0.
						slingResponse.setHeader("Expires", "0"); // Proxies.
						slingResponse.setContentType("text/html");

					}
					log.debug("==========Skipping the Filter==========");
					chain.doFilter(request, response);
					return;
				}

			}else{
				chain.doFilter(request, response);
				return;				
			}			
    		
		} catch (ResourceNotFoundException ex) {
			
			 if (errorPageHandlerService != null && errorPageHandlerService.isEnabled()) {
			        // Check for and handle 404 Requests properly according on Author/Publish
			        if (errorPageHandlerService.doHandle404(slingRequest, slingResponse)) {
			             String path = errorPageHandlerService.findErrorPage(slingRequest, slingRequest.getResource());
			            if (path != null) {
			            	if(path.contains("500")) {
			            		path = path.replace("500", "404");
			            	}else if(!path.contains("404")){
			            		path = path.replace(".html", "/404.html");
			            	}
			            	log.debug("Request path was -  "+slingRequest.getRequestURI());
			            	log.debug("error page path=======**"+path);
			                slingResponse.setStatus(404);
			                errorPageHandlerService.includeUsingGET(slingRequest, slingResponse, path);
			                return;
			            }
			        }
			    }
			
			log.error("Asset Gating Filter ResourceNotFoundException Error Block - " + ex.getMessage()+" for the following path --- "+((SlingHttpServletRequest)request).getRequestURI());
		} catch (Exception ex) {
			log.error("Asset Gating Filter Error Block - " + ex.getMessage()+" for the following path --- "+((SlingHttpServletRequest)request).getRequestURI());
		}
        
        // Finally, proceed with the the Filter chain
    	chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Usually, do Nothing
    }
}