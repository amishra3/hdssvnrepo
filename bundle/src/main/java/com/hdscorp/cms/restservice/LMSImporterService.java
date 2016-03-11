package com.hdscorp.cms.restservice;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceProvider;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
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

	@Reference
	ResourceResolverFactory resourceResolverFactory;
	@Reference
	ResourceProvider resourceProvider;
	ResourceResolver resourceResolver = null;

	public void saveLMLResponse(String cvsFilePath, String storagePath) {

		List<LMSBean> listLMSbean = readCSVFile(cvsFilePath);

		Session session = JcrUtilService.getSession();
		try {
			Resource resource = null;
			resource = resourceResolver.resolve(storagePath);
			Page page = resource.adaptTo(Page.class);

			Iterator<Page> requiredRoot = page.listChildren();
			if (requiredRoot.hasNext()) {
				while (requiredRoot.hasNext()) {
					Page child = requiredRoot.next();
					Node childNode = child.adaptTo(Node.class);
					childNode.remove();
					session.save();
				}
			}

			for (LMSBean LMSbean : listLMSbean) {
				createLMLNode(session, storagePath, LMSbean);
			}

		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error " + stack.toString());

		} finally {
			if (null != resourceResolver) {
				resourceResolver.close();
			}

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
				null };

		try {
			beanReader = new CsvBeanReader(new InputStreamReader(getInputStream(csvFileName)),
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

				// this.resourceResolver =
				// this.resourceResolverFactory.getAdministrativeResourceResolver(null);
				Page prodPage = null;
				Resource resource = null;
				resource = resourceResolver.resolve(storagePath);
				Page pg = resource.adaptTo(Page.class);
				// session = this.resourceResolver.adaptTo(Session.class);

				if (session != null) {

					// Create Page
					PageManager pageManager = this.resourceResolver.adaptTo(PageManager.class);
					if (!PageUtils.doesPageExist(pg, LMSbean.getIltFacilityCountry().replaceAll(" ", "-"))) {
						prodPage = pageManager.create(parentNode.getPath(),
								LMSbean.getIltFacilityCountry().replaceAll(" ", "-"), null,
								LMSbean.getIltFacilityCountry());
						Node pageNode = prodPage.adaptTo(Node.class);
						// Node rootChildNode = resource.adaptTo(Node.class);
						Node jcrNode = null;

						resource = resourceResolver.getResource(prodPage.getPath().concat("/jcr:content"));
						Node jcr = resource.adaptTo(Node.class);
						jcr.remove();
						session.save();
						jcrNode = pageNode.addNode("jcr:content", "cq:PageContent");
						session.save();

					} else {

						log.info("inside else" + parentNode.getPath()
								+ LMSbean.getIltFacilityCountry().replaceAll(" ", "-"));
						prodPage = pageManager.create(
								parentNode.getPath().concat("/")
										+ LMSbean.getIltFacilityCountry().replaceAll(" ", "-").concat("/"),
								pageName.toString(), null, LMSbean.getIltFacilityCountry());

						resource = resourceResolver.getResource(prodPage.getPath().concat("/jcr:content"));
						Node jcr = resource.adaptTo(Node.class);
						Node pageNode = prodPage.adaptTo(Node.class);
						jcr.remove();
						session.save();

						Node jcrNode = pageNode.addNode("jcr:content", "cq:PageContent");
						session.save();
						resource = resourceResolver.getResource(prodPage.getPath().concat("/jcr:content"));

						Node rootChildNode = resource.adaptTo(Node.class);
						log.info("chid node testing" + rootChildNode.getPath());
						rootChildNode.setProperty(ServiceConstants.LML_KEYWORD, LMSbean.getKeyword());
						rootChildNode.setProperty(ServiceConstants.LML_DELIVERY_STYLE, LMSbean.getDeliveryStyle());
						rootChildNode.setProperty(ServiceConstants.LML_GLOBAL_ID, LMSbean.getGlobalId());
						rootChildNode.setProperty(ServiceConstants.LML_JCR_TRANING_TITLE, LMSbean.getTrainingTitle());
						rootChildNode.setProperty(ServiceConstants.LML_JCR_TRANING_DESC, LMSbean.getTrainingDesc());
						rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_COUNTRY,
								LMSbean.getIltFacilityCountry());
						rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_CITY, LMSbean.getIltFacilityCity());
						rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_NAME, LMSbean.getIltFacilityName());
						rootChildNode.setProperty(ServiceConstants.LML_LANGUAGE, LMSbean.getLanguage());
						Calendar calendarStartDate = Calendar.getInstance();
						calendarStartDate.setTime(ServiceUtil.getDatefromString(LMSbean.getTrainingStartDate(),
								ServiceConstants.DATE_FORMAT_FROM_LML));
						rootChildNode.setProperty(ServiceConstants.LML_TRANING_START_DATE, calendarStartDate);
						Calendar calendarEndDate = Calendar.getInstance();
						calendarEndDate.setTime(ServiceUtil.getDatefromString(LMSbean.getTrainingEndDate(),
								ServiceConstants.DATE_FORMAT_FROM_LML));
						rootChildNode.setProperty(ServiceConstants.LML_TRANING_END_DATE, calendarEndDate);
						rootChildNode.setProperty(ServiceConstants.LML_COST_CURRENCY, LMSbean.getCostCurrency());
						rootChildNode.setProperty(ServiceConstants.LML_TRANING_PRICE, LMSbean.getTrainingPrice());
						rootChildNode.setProperty(ServiceConstants.LML_COURSE_DEEP_LINK, LMSbean.getCourseDeeplink());
						rootChildNode.setProperty(ServiceConstants.LML_CHILD_NODE, "true");

						session.save();
					}

				}
			}

		}

		catch (Exception e) {
			log.error("Unable to create node:" + e);
		}
	}

	private InputStream getInputStream(String filePath) {
		try {
			log.info("Start  Execution of getInputStream method :" + filePath);
			resourceResolver = resourceResolverFactory.getAdministrativeResourceResolver(null);
			Resource resource = resourceResolver.getResource(filePath);
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

}