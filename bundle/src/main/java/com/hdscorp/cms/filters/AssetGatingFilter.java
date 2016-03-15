package com.hdscorp.cms.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.felix.scr.annotations.sling.SlingFilter;
import org.apache.felix.scr.annotations.sling.SlingFilterScope;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Usually, do nothing
    }

    @Override
    public final void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
    	
    	final WCMMode mode = WCMMode.fromRequest(request);
    	try {
			
			if (!(request instanceof SlingHttpServletRequest) || !(response instanceof SlingHttpServletResponse)) {
				// Not a SlingHttpServletRequest/Response, so ignore.
				chain.doFilter(request, response);
				return;
			}
			
			final SlingHttpServletResponse slingResponse = (SlingHttpServletResponse) response;
			final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;
			String pdfPath= slingRequest.getRequestURI();
			if(!pdfPath.contains("/editor") && !pdfPath.contains("/cf")&& pdfPath.toLowerCase().endsWith(".pdf") && (pdfPath.startsWith("/en-us/pdf") || pdfPath.startsWith("/content/dam/public/en_us/pdfs"))){
				String forwardPath = (String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.ASSET_GATING_FORM_PATH);
				String refererString = slingRequest.getHeader("Referer") ;
				String gatingParam = (String)HdsCorpGlobalConfiguration.getPropertyValue(HdsCorpGlobalConfiguration.ASSET_GATING_SUCCESS_QUERY_PARAMETER);
				String gatingParamVal = slingRequest.getParameter(gatingParam);				
				if(HdsCorpCommonUtils.isGated(pdfPath, slingRequest) && !HdsCorpCommonUtils.checkValidReferer(refererString, gatingParamVal)){
					String targetURL = forwardPath ;
					log.debug("==========PDF is GATED ============Redirecting to "+targetURL);
					slingRequest.setAttribute("pdfPath", pdfPath);
					slingRequest.getRequestDispatcher(targetURL).forward(request,response);
//					HttpServletResponse httpResponse = (HttpServletResponse) response;
//					httpResponse.sendRedirect(PathResolver.getShortURLPath(targetURL));
					return;
				}else{
					log.debug("==========Skipping the Filter==========");
					chain.doFilter(request, response);
					return;
				}

			}else{
				chain.doFilter(request, response);
				return;				
			}			
    		
		} catch (Exception ex) {
			log.error("Asset Gating Filter Error Block - " + ex.getMessage());
		}
        
        // Finally, proceed with the the Filter chain
    	//chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Usually, do Nothing
    }
}