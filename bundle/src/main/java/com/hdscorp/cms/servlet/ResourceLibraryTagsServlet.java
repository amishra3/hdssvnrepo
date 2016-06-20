package com.hdscorp.cms.servlet;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.jcr.Node;
import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ViewHelperUtil;

@SlingServlet(methods = { "GET" })
@Properties({
		@Property(name = "service.description", value = { "Add tags to assets" }),
		@Property(name = "service.vendor", value = { "HDS Corp" }),
		@Property(name = "sling.servlet.paths", value = { "/bin/rladdtagsservlet" })
		 })
public class ResourceLibraryTagsServlet extends SlingAllMethodsServlet {

	
	final Logger LOG =  LoggerFactory.getLogger(ResourceLibraryTagsServlet.class);

	@Override
	public void doGet(SlingHttpServletRequest request,
			SlingHttpServletResponse response) throws ServletException,
			IOException {

		try {
			LOG.info("inside servlet");  
			String searchPath = request.getParameter("path");

			String defaultPath = "/content/dam/public/en_us/pdfs";
			try {
				
				if(searchPath!=null) {
					searchPath = URLDecoder.decode(request.getParameter("path"),"UTF-8");
				}
				
			} catch (Exception e) {	
				LOG.info("Exception while decoding the url::" +e.getMessage());
			}

			if (searchPath == null || searchPath.trim().length() == 0) {
				searchPath = defaultPath;
			}

			TagManager tagManager = JcrUtilService.getResourceResolver()
					.adaptTo(TagManager.class);

			SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
					.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			String[] paths = { searchPath };
			String[] types = { "dam:Asset" };
			SearchResult result = searchServiceHelper.getFullTextBasedResuts(
					paths, null, null, types, null, false, null, null,
					JcrUtilService.getResourceResolver(), null, null);
			List<Hit> hits = result.getHits();
			LOG.info("ResourceLibraryTagsServlet No of Assets"+hits.size()); 
			
			List<String> excludeTags = new ArrayList<String>();
			excludeTags.add("common:product-and-solutions");
			excludeTags.add("common:services");
			for (Hit hit : hits) {
				Resource metadataResource = hit.getResource().getChild(
						"jcr:content/metadata");
				if (metadataResource != null) {
					ValueMap properties = ResourceUtil
							.getValueMap(metadataResource);

					if (properties.containsKey("cq:tags")) {
						String[] assetTags = (String[]) properties
								.get("cq:tags");
						List<String> tagsList = Arrays.asList(assetTags);
						List<String> list = new ArrayList<String>();
						list.addAll(tagsList);
						LOG.info("Tag list size"+tagsList.size());
						for(String assetTag:assetTags){
						Tag tag = tagManager.resolve(assetTag);
						if(tag!=null){
							if(!list.contains(tag.getParent().getTagID()) && (tag.getParent().getTagID().contains("product-and-solutions") || tag.getParent().getTagID().contains("services")) && !excludeTags.contains(tag.getParent().getTagID()) ) {
								
								
								list.add(tag.getParent().getTagID());
								LOG.info("Added tag "+tag.getParent().getTagID()+"to Asset**"+hit.getPath());  
							}
						}

					}
						Node node = metadataResource.adaptTo(Node.class);  
						
						node.setProperty("cq:tags",list.toArray(new String[0]));
						node.save();
						  
				}
			}
		}
	} catch (Exception e) {
		e.printStackTrace();
	} finally {

	}

		
		
		
	}
		

}