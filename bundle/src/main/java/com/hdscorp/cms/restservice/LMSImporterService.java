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

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.Asset;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PageUtils;

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

		List<LMSBean> listLMLbean = readCSVFile(cvsFilePath);

		for (LMSBean LMLbean : listLMLbean) {
			createLMLNode(JcrUtilService.getSession(), storagePath, LMLbean);
		}

	}

	private List<LMSBean> readCSVFile(String csvFileName) {

		log.info("Start execution of readCSVFile method::" + csvFileName);

		List<LMSBean> listLMLbean = new ArrayList<LMSBean>();
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
					listLMLbean.add(LMSbean);
					log.info(LMSbean.getKeyword() + "" + LMSbean.getDeliveryStyle() + "" + LMSbean.getGlobalId() + ""
							+ LMSbean.getTrainingTitle() + "" + LMSbean.getTrainingDesc() + ""
							+ LMSbean.getIltFacilityCity() + "" + LMSbean.getIltFacilityCountry() + ""
							+ LMSbean.getIltFacilityName() + "" + LMSbean.getLanguage() + ""
							+ LMSbean.getTrainingStartDate() + "" + LMSbean.getTrainingEndDate() + ""
							+ LMSbean.getCostCurrency() + "" + LMSbean.getTrainingPrice() + ""
							+ LMSbean.getCourseDeeplink());
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
		return listLMLbean;
	}

	private void createLMLNode(Session session, String storagePath, LMSBean LMLbean) {
		try {
			final Node parentNode = session.getNode(storagePath);
			if (parentNode != null) {

				long nodeName = Calendar.getInstance().getTimeInMillis();

				Node parentRootNode = null;

				if (PageUtils.doesNodeExist(parentNode, LMLbean.getIltFacilityCountry()) == -1) {
					parentRootNode = parentNode.addNode(LMLbean.getIltFacilityCountry(), JcrConstants.NT_UNSTRUCTURED);
				} else {
					parentRootNode = session.getNode(storagePath + LMLbean.getIltFacilityCountry() + "/");
				}

				Node rootChildNode = parentRootNode.addNode(String.valueOf(nodeName), JcrConstants.NT_UNSTRUCTURED);

				rootChildNode.setProperty(ServiceConstants.LML_KEYWORD, LMLbean.getKeyword());
				rootChildNode.setProperty(ServiceConstants.LML_DELIVERY_STYLE, LMLbean.getDeliveryStyle());
				rootChildNode.setProperty(ServiceConstants.LML_GLOBAL_ID, LMLbean.getGlobalId());
				rootChildNode.setProperty(ServiceConstants.LML_TRANING_TITLE, LMLbean.getTrainingTitle());
				rootChildNode.setProperty(ServiceConstants.LML_TRANING_DESC, LMLbean.getTrainingDesc());
				rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_COUNTRY, LMLbean.getIltFacilityCountry());
				rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_CITY, LMLbean.getIltFacilityCity());
				rootChildNode.setProperty(ServiceConstants.LML_ILT_FACILITY_NAME, LMLbean.getIltFacilityName());
				rootChildNode.setProperty(ServiceConstants.LML_LANGUAGE, LMLbean.getLanguage());
				rootChildNode.setProperty(ServiceConstants.LML_TRANING_START_DATE, LMLbean.getTrainingStartDate());
				rootChildNode.setProperty(ServiceConstants.LML_TRANING_END_DATE, LMLbean.getTrainingEndDate());
				rootChildNode.setProperty(ServiceConstants.LML_COST_CURRENCY, LMLbean.getCostCurrency());
				rootChildNode.setProperty(ServiceConstants.LML_TRANING_PRICE, LMLbean.getTrainingPrice());
				rootChildNode.setProperty(ServiceConstants.LML_COURSE_DEEP_LINK, LMLbean.getCourseDeeplink());
			}
			session.save();
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

		} finally {
			if (null != resourceResolver) {
				resourceResolver.close();
			}
		}
		return null;
	}

}