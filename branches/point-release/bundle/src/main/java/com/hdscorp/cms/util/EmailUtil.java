package com.hdscorp.cms.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.mail.ByteArrayDataSource;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.sling.api.resource.Resource;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.mailer.MailService;
import com.hdscorp.cms.util.JcrUtilService;


/**
 * {@link EmailUtil} Responsible to handle Sending Emails
 * @author abhinav
 *
 */
public final class EmailUtil {

	private static final Logger LOG = LoggerFactory.getLogger(PropertyResolver.class);
	private static String COMMA = ",";
	
	/**
	 * Handles to replace email template values using Velocity
	 * @param reader
	 * @param variables
	 * @return {@link String}
	 */
	@SuppressWarnings("rawtypes")
	public static String replace(Reader reader, Map variables) {
		VelocityContext context = new VelocityContext();
		for(Iterator iterator = variables.keySet().iterator(); iterator.hasNext();) {
			String key = (String) iterator.next();
			context.put(key, variables.get(key));
		}
		Velocity.init();
		StringWriter writer = new StringWriter();
        Velocity.evaluate(context, writer, "Velocity Log Tag", reader);
		return writer.toString();
	}
	/**
	 * Handles to Send Emails
	 * @param toEmail
	 * @param fromEmail
	 * @param subject
	 * @param content
	 */
	public static boolean sendEmail(String toEmail, String fromEmail, String subject, String attach,
			String content) {
		HtmlEmail userEmail = new HtmlEmail();
		try {
            Bundle bndl = FrameworkUtil.getBundle(com.day.cq.mailer.MailService.class);
            BundleContext bundleContext = bndl.getBundleContext();
            ServiceReference ref = bundleContext.getServiceReference(MailService.class.getName());
            MailService mailService = (MailService) bundleContext.getService(ref);
            if (LOG.isDebugEnabled()) {
                LOG.debug("mailService:::" + mailService);
            }
			if (null != fromEmail && null != toEmail && !fromEmail.isEmpty()
					&& !toEmail.isEmpty()) {
				List<InternetAddress> emailReceipent = new ArrayList<InternetAddress>();
				String[] toAddressArray = toEmail.split(COMMA);
				for (String emailid : toAddressArray) {
					emailReceipent.add(new InternetAddress(emailid.trim()));
				}
				userEmail.setFrom(fromEmail);
				userEmail.setTo(emailReceipent);
				userEmail.setSubject(subject);
				if(!StringUtils.isEmpty(attach) || null != attach){
					InputStream stream = getPDFAsStream(attach);
					ByteArrayDataSource pdfAttachmt = new ByteArrayDataSource(stream, "application/pdf");
					String[] fileName = attach.split("/");
					userEmail.attach(pdfAttachmt, fileName[fileName.length-1], "files");	
					
				}
				userEmail.setHtmlMsg(content.toString());
				LOG.info("***Mail Sent***" + content.toString());
				mailService.send(userEmail);
				LOG.info("***Mail Sent***" + content.toString());
				return true;
			}
		} catch (AddressException e) {
			LOG.error("Address Exception occured while setting the receiver's email"
					+ e);
		} catch (EmailException e) {
			LOG.error("An Exception occured while sending the mail" + e);
		} catch (Exception e) {
			LOG.error("An Exception occurred while Processing the form" + e);
		}
		return false;
	}
	
	/**
	 * Handles to read Template file from CRX
	 * @param filePath
	 * @return {@link InputStream}
	 * @throws Exception
	 */
	public static InputStream getFileAsStream(String filePath){
		Resource templateResource = JcrUtilService.getResourceResolver().getResource(filePath);
		Node templateNode = templateResource.adaptTo(Node.class);
		Node jcrContent;
		try{
			jcrContent = templateNode.getNode("jcr:content");
			return jcrContent.getProperty("jcr:data").getBinary().getStream();
		}catch (Exception e) {
			LOG.error("Error while getting template information::");
		}
		return null;
	}
	
	public static InputStream getPDFAsStream(String filePath){
		Resource templateResource = JcrUtilService.getResourceResolver().getResource(filePath);
		Node templateNode = templateResource.adaptTo(Node.class);
		Node jcrContent;
		try{
			jcrContent = templateNode.getNode("jcr:content/renditions/original/jcr:content");
			return jcrContent.getProperty("jcr:data").getBinary().getStream();
		}catch (Exception e) {
			LOG.error("Error while getting template information::");
		}
		return null;
	}
}
