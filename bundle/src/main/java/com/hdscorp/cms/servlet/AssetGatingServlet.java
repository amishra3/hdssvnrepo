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
 
@SlingServlet(
		resourceTypes = {"dam:Asset"},
	    methods = {"GET"}
	   // extensions = {"pdf"}
)
@Properties({
    @Property(name="service.pid", value="com.hdscorp.cms.servlet.AssetGatingServlet",propertyPrivate=false),
    @Property(name="service.description",value="Asset Gating Servlet", propertyPrivate=false),
    @Property(name="service.vendor",value="HDS Corp", propertyPrivate=false)
})
public class AssetGatingServlet extends SlingSafeMethodsServlet
{
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException
    {
    	
    	final RequestDispatcherOptions options = new RequestDispatcherOptions();
    	options.setForceResourceType("dam/asset");
        //Do something fun here
    	String forwardPath= "";
    	System.out.println("*********************************************************");
    	System.out.println("**************************dindidnidnididnid in get method*******************************");
    	System.out.println("*********************************************************");
    	System.out.println("*********************************************************");
    	request.getRequestDispatcher(request.getResource(), options).forward(request, response);
    }
 
   
    
}