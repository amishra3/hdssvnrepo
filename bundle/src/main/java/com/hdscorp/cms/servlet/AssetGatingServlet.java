package com.hdscorp.cms.servlet;


import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
 
import javax.servlet.ServletException;
import java.io.IOException;
 
@SlingServlet(
    //resourceTypes = {"dam:Asset"},
    methods = {"GET"},
    extensions = {"pdf"}
)
@Properties({
    @Property(name="service.pid", value="com.hdscorp.cms.servlet.AssetGatingServlet",propertyPrivate=false),
    @Property(name="service.description",value="Asset Gating Servlet", propertyPrivate=false),
    @Property(name="service.vendor",value="HDS Corp", propertyPrivate=false)
})
public class AssetGatingServlet extends SlingAllMethodsServlet
{
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException
    {
        //Do something fun here
    	String forwardPath= "";
    	System.out.println("*********************************************************");
    	System.out.println("**************************dindidnidnididnid*******************************");
    	System.out.println("*********************************************************");
    	System.out.println("*********************************************************");
    	
    }
 
    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException
    {
        //Do something fun here
    	String forwardPath= "";
    	System.out.println("*********************************************************");
    	System.out.println("**************************dindidnidnididnid*******************************");
    	System.out.println("*********************************************************");
    	System.out.println("*********************************************************");
    	
    }
    
}