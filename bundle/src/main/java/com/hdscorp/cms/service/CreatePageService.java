package com.hdscorp.cms.service;

import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.hdscorp.cms.dao.PressReleaseNode;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.ServiceUtil;

@Component(immediate = true)
@Service(value = CreatePageService.class)
public class CreatePageService {

	private final String blackSlash = "/";

	public void createPage(Session session, String template, String path,
			PressReleaseNode pressReleaseModel,String type) {
		try {
			
			String pagePath = appendDateToPagePath(path,
					pressReleaseModel.getPubDate());
			
			String pageName = "";
			Page page = null;
			String pageTitle = pressReleaseModel.getTitle();
			
		 if(type.equalsIgnoreCase("pressRelease")){
			pageName = pressReleaseModel.getLink().substring(pressReleaseModel.getLink().lastIndexOf('/'), pressReleaseModel.getLink().lastIndexOf('.')); ;
		 } else{
			 pageName= pressReleaseModel.getTitle();
		 }
		 
			pageName = pageName.replaceAll("[^-a-zA-Z0-9 ]+", "");
			pageName = pageName.toLowerCase().replaceAll("\\s+", "-");
			page = createPath(pagePath, session, template, pageName, pageTitle);
			Resource resource = JcrUtilService.getResourceResolver()
					.getResource(page.getPath() + "/jcr:content");

			Node jcrContent = resource.adaptTo(Node.class);
			
			if (type.equalsIgnoreCase("pressRelease")) {
			Node pressRelease = jcrContent.addNode("pressrelease",
					"nt:unstructured");

			pressRelease.setProperty("pressreleasetitle",
					pressReleaseModel.getTitle());

			Date date = ServiceUtil.getDateFromString(
					pressReleaseModel.getPubDate(),
					"EEE, d MMM yyyy HH:mm:ss Z");
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
			//String pubDate = ServiceUtil.getStringFromDate(date, "MM/d/yy");

			pressRelease.setProperty("pressreleasedate", cal);
			//pressRelease.setProperty("pressreleasedate", pubDate);
			pressRelease.setProperty("sling:resourceType",
					"hdscorp/components/content/pressreleasedetail");
			pressRelease.setProperty("pressreleasedesc",
				getPressReleaseDesc(pressReleaseModel.getLink()));
			
			}else {
				Node newsDetail = jcrContent.addNode("newsdetail",
						"nt:unstructured");

				newsDetail.setProperty("newstitle",
						pressReleaseModel.getTitle());

				Date date = ServiceUtil.getDateFromString(
						pressReleaseModel.getPubDate(),
						"EEE, d MMM yyyy HH:mm:ss Z");
	            Calendar cal = Calendar.getInstance();
	            cal.setTime(date);
				//String pubDate = ServiceUtil.getStringFromDate(date, "MM/d/yy");

				newsDetail.setProperty("newsdate", cal);
				newsDetail.setProperty("newslink",pressReleaseModel.getLink());
				//pressRelease.setProperty("pressreleasedate", pubDate);
				newsDetail.setProperty("sling:resourceType",
						"hdscorp/components/content/newsdetail");
				newsDetail.setProperty("linktargettype", true);
				
			}

			session.save();
		} catch (Exception e) {
			
			e.printStackTrace();
		}

	}

	private String appendDateToPagePath(final String pagePath, String pubdate) {

		
		int year = 0;
		try {

			Date sysDate = ServiceUtil.getDateFromString(pubdate,
					"EEE, d MMM yyyy HH:mm:ss Z");

			Calendar cal = Calendar.getInstance();
			cal.setTime(sysDate);

			year = cal.get(Calendar.YEAR);

		} catch (ParseException e) {

			e.printStackTrace();
		}

		return pagePath + blackSlash + year;
	}

	protected Page createPath(final String path, final Session session,
			final String template, final String pageName, final String pageTitle) {
		final String[] pathArray = path.split(blackSlash);
		String currentPath = "";
		String previousPath;
		Page page = null;
		PageManager pageManager = JcrUtilService.getResourceResolver().adaptTo(
				PageManager.class);

		try {
			for (int i = 1; i < pathArray.length; i++) {
				previousPath = currentPath;
				currentPath = currentPath.concat(blackSlash).concat(
						pathArray[i]);
				// Don't do anything if the node already exists
				if (!session.itemExists(currentPath)) {
					// Node is created if it is not present already
					pageManager.create(previousPath, pathArray[i], template,
							pathArray[i]);
				}
			}

			
			if (!session.itemExists(currentPath + "/" + pageName)) {
				page = pageManager.create(path, pageName, template, pageTitle);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} 
		return page;
	}

	private String getPressReleaseDesc(String url) {

		String pressReleaseDesc = "";
		try {

			Document doc = Jsoup.connect(url).get();

			doc.getElementsByTag("style").remove();
			doc.getElementsByClass("PageTitleStyle1").remove();
			Elements content = doc.select("div#printarea");
			pressReleaseDesc = content.toString();
		} catch (IOException e) {

			e.printStackTrace();
		}
		return pressReleaseDesc;
	}
}
