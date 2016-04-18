package com.hdscorp.cms.restservice;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.io.CsvBeanReader;
import org.supercsv.io.ICsvBeanReader;
import org.supercsv.prefs.CsvPreference;

import com.day.cq.dam.api.Asset;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PageUtils;
import com.hdscorp.cms.util.ServiceUtil;

/**
 * Useful for get all the data from CSV excel sheet and store each row data in a
 * node with properties into the JCR.
 * 
 * @author gokula.nand
 */
@Component(metatype = false, enabled = true, label = "LMS Importer")

@Service(value = LMSImporterService.class)

public class LMSImporterService {
	static final Logger log = LoggerFactory.getLogger(LMSImporterService.class);

	private final String forwardSlash = "/";
	private  String nodeName = "lmsdata";

	public void saveLMLResponse(String cvsFilePath, String storagePath) {

		List<LMSBean> listLMSbean = readCSVFile(cvsFilePath);

		Session session = JcrUtilService.getSession();
		try {

			Resource resource = JcrUtilService.getResourceResolver().resolve(storagePath);			
			if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
				Node parentNode = session.getNode(storagePath);

				if (parentNode != null) {
					parentNode.remove();
					session.save();
					parentNode = session.getNode(storagePath.substring(0, storagePath.lastIndexOf(forwardSlash)));			
					if (storagePath.lastIndexOf(forwardSlash) != -1) {
						nodeName = storagePath.substring(storagePath.lastIndexOf(forwardSlash) + 1);
					}
					if (parentNode != null) {
						Page page = createPath(parentNode.getPath(), session, null, nodeName, "LMS Data");

					}

				}
			} else {
				createPath(storagePath.substring(0, storagePath.lastIndexOf(forwardSlash)), session, null, nodeName,
						"LMS Data");
			}
			if (listLMSbean != null && listLMSbean.size() > 0) {
				for (LMSBean LMSbean : listLMSbean) {
					createLMLNode(session, storagePath, LMSbean);
				}
			}

		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error " + stack.toString());

		}

	}

	private List<LMSBean> readCSVFile(String csvFileName) {

		log.info("Start execution of readCSVFile method::" + csvFileName);

		List<LMSBean> listLMSbean = new ArrayList<LMSBean>();
		ICsvBeanReader beanReader = null;
		CellProcessor[] processors = new CellProcessor[] { null, // keyword
				null, // DeliveryStyle
				null, // globalId
				null, // trainingTitle
				null, // trainingDesc
				null, // iltFacilityCountry
				null, // iltFacilityCity
				null, // iltFacilityName
				null, // language
				null, // trainingStartDate
				null, // trainingEndDate
				null, // costCurrency
				null, // trainingPrice
				null, // courceDeeplink
				null};

		try {
			beanReader = new CsvBeanReader(new InputStreamReader(getInputStream(csvFileName),"UTF-8"),
					CsvPreference.STANDARD_PREFERENCE);
			final String[] header = new String[] { ServiceConstants.LML_KEYWORD, ServiceConstants.LML_DELIVERY_STYLE,
					ServiceConstants.LML_GLOBAL_ID, ServiceConstants.LML_TRANING_TITLE,
					ServiceConstants.LML_TRANING_DESC, ServiceConstants.LML_ILT_FACILITY_COUNTRY,
					ServiceConstants.LML_ILT_FACILITY_CITY, ServiceConstants.LML_ILT_FACILITY_NAME,
					ServiceConstants.LML_LANGUAGE, ServiceConstants.LML_TRANING_START_DATE,
					ServiceConstants.LML_TRANING_END_DATE, ServiceConstants.LML_COST_CURRENCY,
					ServiceConstants.LML_TRANING_PRICE, ServiceConstants.LML_COURSE_DEEP_LINK };
			LMSBean LMSbean = null;
			int row = 0;
			while ((LMSbean = beanReader.read(LMSBean.class, header, processors)) != null) {
				row++;
				if (row > 1) {
					listLMSbean.add(LMSbean);
					log.info("LMS keyword :" + LMSbean.getKeyword());
				}
			}
		} catch (Exception ex) {
			StringWriter stack = new StringWriter();
			ex.printStackTrace(new PrintWriter(stack));
			log.error("Error " + stack.toString());
		} finally {
			if (beanReader != null) {
				try {
					beanReader.close();
				} catch (IOException ex) {
					log.error("Error closing the reader: " + ex);
				}
			}
		}
		return listLMSbean;
	}

	private void createLMLNode(Session session, String storagePath, LMSBean LMSbean) {
		try {
			final Node parentNode = session.getNode(storagePath);

			if (parentNode != null) {
				Long pageName = Calendar.getInstance().getTimeInMillis();
				Page prodPage = null;
				Resource resource = JcrUtilService.getResourceResolver().resolve(storagePath);
				Page pg = resource.adaptTo(Page.class);

				if (session != null) {
					if (!PageUtils.doesPageExist(pg, LMSbean.getIltFacilityCountry().replaceAll(" ", "-"))) {

						prodPage = createPath(parentNode.getPath(), session, null,
								LMSbean.getIltFacilityCountry().replaceAll(" ", "-"), LMSbean.getIltFacilityCountry());
						prodPage = createPath(
								parentNode.getPath().concat(forwardSlash) + LMSbean.getIltFacilityCountry().replaceAll(" ", "-"),
								session, null, pageName.toString(), LMSbean.getIltFacilityCountry());
						session.save();
						creatNode(prodPage.getPath(), LMSbean);
					
					} else {
						prodPage = createPath(
								parentNode.getPath().concat(forwardSlash) + LMSbean.getIltFacilityCountry().replaceAll(" ", "-"),
								session, null, pageName.toString(), LMSbean.getIltFacilityCountry());
						session.save();
						creatNode(prodPage.getPath(), LMSbean);
						
					}

				}
			}

		}

		catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Unable to create node:" + stack.toString());
		}
	}

	private InputStream getInputStream(String filePath) {
		try {
			log.info("Start  Execution of getInputStream method :" + filePath);
			Resource resource = JcrUtilService.getResourceResolver().getResource(filePath);
			Asset asset = resource.adaptTo(Asset.class);
			InputStream data = asset.getOriginal().getStream();
			log.info("Input Stream::" + data);
			if (null != data) {
				return data;
			}
		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error while reading file from DAM " + stack.toString());

		}
		return null;
	}

	private Page createPath(final String path, final Session session, final String template, final String pageName,
			final String pageTitle) {
		final String[] pathArray = path.split(forwardSlash);
		String currentPath = "";
		String previousPath;
		Page page = null;
		PageManager pageManager = JcrUtilService.getResourceResolver().adaptTo(PageManager.class);

		try {
			for (int i = 1; i < pathArray.length; i++) {
				previousPath = currentPath;
				currentPath = currentPath.concat(forwardSlash).concat(pathArray[i]);
				// Don't do anything if the node already exists
				if (!session.itemExists(currentPath)) {
					// Node is created if it is not present already
					pageManager.create(previousPath, pathArray[i], template, pathArray[i]);
				}
			}

			if (!session.itemExists(currentPath + forwardSlash + pageName)) {
				page = pageManager.create(path, pageName, template, pageTitle);
			}
			Resource resource = JcrUtilService.getResourceResolver().getResource(page.getPath() + "/jcr:content");
			Node pageNode = resource.adaptTo(Node.class);
			pageNode = session.getNode(page.getPath() + "/jcr:content");
			pageNode.remove();
			pageNode = session.getNode(page.getPath());
			pageNode.addNode("jcr:content", "cq:PageContent");

			// pageNode.setProperty(ServiceConstants.LML_JCR_TRANING_TITLE,
			// pageTitle);
			session.save();

		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error while creating nodes" + stack.toString());
		}
		return page;
	}

	private void creatNode(String pagePath, LMSBean LMSbean) {

		try {
			Resource resource = JcrUtilService.getResourceResolver().getResource(pagePath + "/jcr:content");
			Node rootChildNode = resource.adaptTo(Node.class);
			rootChildNode.setProperty(ServiceConstants.LML_KEYWORD, LMSbean.getKeyword());
			rootChildNode.setProperty(ServiceConstants.LML_DELIVERY_STYLE, LMSbean.getDeliveryStyle());
			rootChildNode.setProperty(ServiceConstants.LML_GLOBAL_ID, LMSbean.getGlobalId());
			rootChildNode.setProperty(ServiceConstants.LML_JCR_TRANING_TITLE, LMSbean.getTrainingTitle());
			rootChildNode.setProperty(ServiceConstants.LML_JCR_TRANING_DESC, LMSbean.getTrainingDesc());
			rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_COUNTRY, LMSbean.getIltFacilityCountry());
			rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_CITY, LMSbean.getIltFacilityCity());
			rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_NAME, LMSbean.getIltFacilityName());
			rootChildNode.setProperty(ServiceConstants.LML_LANGUAGE, LMSbean.getLanguage());
			Calendar calendarStartDate = Calendar.getInstance();
			calendarStartDate.setTime(ServiceUtil.getDatefromString(LMSbean.getTrainingStartDate(),
					ServiceConstants.DATE_FORMAT_FROM_LML));
			rootChildNode.setProperty(ServiceConstants.LML_TRANING_START_DATE, calendarStartDate);
			Calendar calendarEndDate = Calendar.getInstance();
			calendarEndDate.setTime(
					ServiceUtil.getDatefromString(LMSbean.getTrainingEndDate(), ServiceConstants.DATE_FORMAT_FROM_LML));
			rootChildNode.setProperty(ServiceConstants.LML_TRANING_END_DATE, calendarEndDate);
			rootChildNode.setProperty(ServiceConstants.LML_COST_CURRENCY, LMSbean.getCostCurrency());
			rootChildNode.setProperty(ServiceConstants.LML_TRANING_PRICE, LMSbean.getTrainingPrice());
			rootChildNode.setProperty(ServiceConstants.LML_COURSE_DEEP_LINK, LMSbean.getCourseDeeplink());
			rootChildNode.setProperty(ServiceConstants.LML_CHILD_NODE, "true");
			rootChildNode.save();
		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error while setting values for nodes" + stack.toString());
		}

	}

}