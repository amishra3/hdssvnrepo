package com.hdscorp.cms.service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.hdscorp.cms.dao.PressReleaseModel;
import com.hdscorp.cms.exception.SystemException;

import com.hdscorp.cms.util.JcrUtilService;

@Component(immediate = true)
@Service(value = CreatePageService.class)
public class CreatePageService {

	
	private final String blackSlash = "/";

	public void createPage(Session session, String template, String path,
			PressReleaseModel pressReleaseModel) {
		try {
			System.out.println("inside create page method*** " + template);
			String pagePath = appendDateToPagePath(path,
					pressReleaseModel.getPubDate());
			System.out.println("page path" + pagePath);
			String pageName = "";
			Page page = null;
			String pageTitle = pressReleaseModel.getTitle();
			pageName = pressReleaseModel.getTitle();

			pageName = pageName.replaceAll("[^-a-zA-Z0-9 ]+", "");
			pageName = pageName.toLowerCase().replaceAll("\\s+", "-");
			page = createPath(pagePath, session, template, pageName, pageTitle);
			Resource resource = JcrUtilService.getResourceResolver()
					.getResource(page.getPath() + "/jcr:content");

			Node jcrContent = resource.adaptTo(Node.class);
			Node pressRelease = jcrContent.addNode("pressrelease",
					"nt:unstructured");

			pressRelease.setProperty("pressreleasetitle",
					pressReleaseModel.getTitle());
			pressRelease.setProperty("pressreleasedate",
					pressReleaseModel.getPubDate());
			pressRelease.setProperty("sling:resourceType",
					"hdscorp/components/content/pressrelease");
			pressRelease.setProperty("pressreleasedesc",
					getPressReleaseDesc(pressReleaseModel.getLink()));

			session.save();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private String appendDateToPagePath(final String pagePath, String pubdate) {

		SimpleDateFormat format = new SimpleDateFormat(
				"EEE, d MMM yyyy HH:mm:ss Z");
		int year = 0;
		try {

			Date sysDate = format.parse(pubdate);

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

			System.out.println("before creating page");
			if (!session.itemExists(currentPath + "/" + pageName)) {
				page = pageManager.create(path, pageName, template, pageTitle);
			}

		} catch (WCMException e) {
			e.printStackTrace();
		} catch (RepositoryException e) {
			throw new SystemException(
					"RepositoryException raised during creating Asset Path ", e);
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
