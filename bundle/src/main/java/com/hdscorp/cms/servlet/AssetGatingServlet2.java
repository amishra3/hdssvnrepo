package com.hdscorp.cms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.rmi.ServerException;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
  
@SlingServlet(methods = {"GET"}, 
metatype = true,
resourceTypes = {"dam:Asset"},
extensions  = {"pdf"})
public class AssetGatingServlet2 extends SlingAllMethodsServlet{
     private static final long serialVersionUID = 2598426539166789515L;
       
     private static final Logger log = LoggerFactory.getLogger(AssetGatingServlet2.class);
       
     
            
     @Override
     protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServerException, IOException {
        
      try
      {
          log.info("---> THIS IS THE GET METHOD OF slingSevletApp/components/page/slingTemplate");
          PrintWriter out = response.getWriter();
          out.println("<html><body>");
          out.println("<h1>This value was returned by an AEM Sling Servlet bound by using a Sling ResourceTypes property</h1>");
          out.println("</html></body>");
           
      }
      catch(Exception e)
      {
          log.info(e.getMessage(),e);
      }
    }
}