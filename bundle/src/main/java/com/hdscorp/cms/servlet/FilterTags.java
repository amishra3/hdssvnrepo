package com.hdscorp.cms.servlet;

import java.io.IOException;

import java.io.PrintWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import com.day.cq.tagging.TagManager;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.foundation.Search;


import com.hdscorp.cms.util.JcrUtilService;

/**
 * @author Jaya
 *         <p>
 *         record a missed visit
 *         </p>
 */
@Component(immediate = true)
@Service(javax.servlet.Servlet.class)
@Properties({
		@Property(name = "service.description", value = "Filters Tags "),
		@Property(name = "service.vendor", value = "HDS Corp"),
		@Property(name = "sling.servlet.paths", value = "/servicehdscorp/tags/recipes"),
		@Property(name = "sling.servlet.methods", value = "GET") })
public class FilterTags extends SlingAllMethodsServlet {

	private static final Logger LOG = LoggerFactory.getLogger(FilterTags.class);

	@Override
	protected void doGet(final SlingHttpServletRequest request,
			final SlingHttpServletResponse response) throws ServletException,
			IOException {

		try {
			processFilterTagsRequest(request, response);
		} catch (Exception e) {
			LOG.debug(e.getMessage());
		}
	}

	protected void processFilterTagsRequest(
			final SlingHttpServletRequest request,
			final SlingHttpServletResponse response) throws Exception {

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		ServletOutputStream out = response.getOutputStream();

	
		JSONObject filterjson = new JSONObject();
		
		try {

			ResourceResolver resourceResolver = JcrUtilService
					.getResourceResolver();
			Resource pageResource = resourceResolver
					.getResource("/content/hdscorp/en_us/lookups/filtertags/jcr:content/overlay");
			TagManager tagManager=resourceResolver.adaptTo(TagManager.class);
			Node pageNode = pageResource.adaptTo(Node.class);

			NodeIterator filtertagnodesItr = pageNode.getNodes();
			String filterPath = null;
			

		
			for (int itr=1; itr <= filtertagnodesItr.getSize();itr++) {
				Map<String, String> filterMap=new HashMap();
				ArrayList<String> tags = new ArrayList<String>();
				ArrayList<String> titles = new ArrayList<String>();

				filterPath = filtertagnodesItr.nextNode().getPath();
				Resource res = resourceResolver.getResource(filterPath);
				Node currentFilterNode = res.adaptTo(Node.class);
				ValueMap resProps = res.adaptTo(ValueMap.class);

				

				if (resProps.containsKey("filtertag")) {					
					Object[] tagsObj = (Object[]) resProps.get("filtertag");
					for (int i = 0; i < tagsObj.length; i++) {					
						String tag = (String) tagsObj[i];							  
			            
			              Tag filtertag = tagManager.resolve(tag);
			              tags.add(filtertag.getTitle());
			              
			             
					}					
				}

				if (resProps.containsKey("title")) {						
					Object[] titlesObj = (Object[]) resProps.get("title");
					for (int i = 0; i < titlesObj.length; i++) {
						String tagTitle  = (String) titlesObj[i];						
						titles.add(tagTitle);						
					}							
				}

								
				if (tags.size() == titles.size()) {
					for (int i = 0; i < tags.size(); i++) {	
						filterMap.put(titles.get(i), tags.get(i));						
					}
				}
				filterjson.put(currentFilterNode.getProperty("filtertitle").getValue().getString(), filterMap);
			}
			
			out.println("{\"filters\":"+filterjson.toString()+"}");
		} catch (Exception e) {
			LOG.error("Error while reading filtertags" + e.getMessage());
			out.println(e.getMessage());
		}

	}
}