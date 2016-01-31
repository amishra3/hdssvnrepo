package com.hdscorp.cms.slingmodels;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.PressReleaseModel;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = Resource.class)
public class ExplorePressReleaseContentModel {

	@Inject
	private Page resourcePage;

	@Inject
	private ResourceResolver resourceResolver;	
		
	private List<PressReleaseModel> pressReleases;

	private static final Logger LOG = LoggerFactory.getLogger(ExplorePressReleaseContentModel.class);
	
	public List<PressReleaseModel> getPressReleases() throws RepositoryException {
		

			LOG.debug("-------------Entering  getPress Releases .Making the Search Service call");

			SearchServiceHelper searchServiceHelper = (SearchServiceHelper)ViewHelperUtil.getService(com.hdscorp.cms.search.SearchServiceHelper.class);
			
			String paths[] = {"/content/hdscorp/en_us/lookup/pressreleases"};
			String tags[] = null ;
			String template= "/apps/hdscorp/templates/pressreleasedetail";
			String type[] = {"cq:Page"};
			boolean doPagination = true;
			String returnOffset = "0";
			String returnLimit = "2";
			
			SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths,tags,template,type,null,doPagination,returnOffset,returnLimit,resourceResolver,null,null);
			
			LOG.debug("-------------SEARCH CALL COMPLETED-----"+result.getTotalMatches());
			List<Hit> hits = result.getHits();
			pressReleases = new ArrayList<PressReleaseModel>();
			
			for (Hit hit : hits) {

				try {
					PressReleaseModel pressRelease = new PressReleaseModel();
					Page reourcePage = hit.getResource().adaptTo(Page.class);
					String pagePath = reourcePage.getPath();
					Node pressReleaseDetailnode = null ;
						
					pressReleaseDetailnode = reourcePage.getContentResource("pressrelease").adaptTo(Node.class);

					String pageTitle = "";
					String pageDescription = "";
					String pagePublishDate = "";

					
					for(PropertyIterator propeIterator = pressReleaseDetailnode.getProperties() ; propeIterator.hasNext();)  {
						Property prop= propeIterator.nextProperty();  
						if(!prop.getDefinition().isMultiple()){  
							if(prop.getName().equals("pressreleasedate")){
								pagePublishDate = prop.getValue().getString();
//								DateFormat format = new SimpleDateFormat("MMMM d, yyyy", Locale.ENGLISH);
//								Date date = format.parse(pagePublishDate);
//								pagePublishDate=date.toString();
							}

							if(prop.getName().equals("pressreleasetitle")){
								pageTitle = prop.getValue().getString();
							}

							if(prop.getName().equals("pressreleasedesc")){
								pageDescription = prop.getValue().getString();
							}				
							
						}
					}
					
					if(pagePath.startsWith("/content")){
						pagePath=PathResolver.getShortURLPath(pagePath);
					}

					pressRelease.setTitle(pageTitle);
					pressRelease.setLink(pagePath);
					pressRelease.setDescription(pageDescription);
					pressRelease.setPubDate(pagePublishDate);
					pressReleases.add(pressRelease );
				} catch (Exception e) {
					// TODO Auto-generated catch block
					LOG.error(e.getMessage());
				}
			}
		return pressReleases;
	}
}
