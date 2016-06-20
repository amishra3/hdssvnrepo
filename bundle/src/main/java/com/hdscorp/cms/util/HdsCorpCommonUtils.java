package com.hdscorp.cms.util;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;
import java.util.Calendar;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.servlet.ServletException;

import org.apache.commons.codec.binary.Base64;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;


// A simple contains common utilities like , encryption , decryption , random numbers, hash etc

public class HdsCorpCommonUtils {
	
	
	
	private static Logger logger = LoggerFactory.getLogger(HdsCorpCommonUtils.class);
	
	private static byte[] keyAes = {
			0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16
	};
	private static byte[] IVAes = {
			0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16
	};
	
	// private static byte[] IV = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
	// 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16};
	// private static byte[] key = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
	// 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16};
	// private static byte[] iv3Des = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	// 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	// 0x00, 0x00, 0x00, 0x00, 0x00};
	
	/**
	 * A method to encrypt string with AES
	 * @param strPlain - plain text string
	 * @return encrypted string
	 */
	
	static public String encryptAes(String strPlain) {
		byte[] encrypted = null;
		byte[] toEncrypt = null;
		String encodedText = null;
		Cipher cipher = null;
		
		if (null == strPlain || strPlain.equals(""))
			return strPlain;
		
		toEncrypt = strPlain.getBytes();
		
		try {
			KeyGenerator kgen = KeyGenerator.getInstance("AES");
			
			// kgen.init(192); // 192 and 256 bits may not be available
			
			AlgorithmParameterSpec paramSpec = new IvParameterSpec(IVAes);
			
			// Generate the key specs.
			SecretKeySpec skeySpec = new SecretKeySpec(keyAes, "AES");
			
			// Instantiate the cipher
			
			try {
				cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
				cipher.init(Cipher.ENCRYPT_MODE, skeySpec, paramSpec);
				encrypted = cipher.doFinal(toEncrypt);
				
			} catch (NoSuchAlgorithmException e) {
				logger.error("Exception occured " + e.getMessage());
				e.printStackTrace();
			}
		} catch (NoSuchAlgorithmException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (InvalidAlgorithmParameterException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (BadPaddingException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		}
		encodedText = new String(Base64.encodeBase64(encrypted));
		
		return encodedText;
	}
	
	/**
	 * A method to decrypt string with AES
	 * @param strPlain - encrypted text string
	 * @return plain text string
	 */
	
	static public String decryptAes(String strEncrypted) {
		byte[] encrypted;
		byte[] toPlain;
		String originalString;
		Cipher cipher = null;
		byte[] original = null;
		
		if (null == strEncrypted || strEncrypted.equals(""))
			return strEncrypted;
		
		toPlain = Base64.decodeBase64(strEncrypted.getBytes());
		
		AlgorithmParameterSpec paramSpec = new IvParameterSpec(IVAes);
		// Generate the key specs.
		SecretKeySpec skeySpec = new SecretKeySpec(keyAes, "AES");
		
		try {
			KeyGenerator kgen = KeyGenerator.getInstance("AES");
			// kgen.init(192); // 192 and 256 bits may not be available
			// Instantiate the cipher
			cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, paramSpec);
			original = cipher.doFinal(toPlain);
			
		} catch (NoSuchAlgorithmException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (InvalidAlgorithmParameterException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		} catch (BadPaddingException e) {
			logger.error("Exception occured " + e.getMessage());
			e.printStackTrace();
		}
		
		originalString = new String(original);
		return originalString;
	}
	
	/*public static void main(String[] args) {
		System.out.println("hellooo");
		System.out.println(HdsCorpCommonUtils.encryptAes("123456"));
		System.out.println(HdsCorpCommonUtils.decryptAes("Z8iwc6Uz2M+EpI1l6kLxPQ=="));
		//System.out.println(decryptAes("DDF6C9A1DF4D57AEF043CA8610A5A0DEA097AF0B"));
	}*/
	
	public static String pdfJCRPath(String pdfPath){
		String returnPath = pdfPath ;
		if(returnPath.startsWith("/en-us/pdf")){
			returnPath=returnPath.replace("/en-us/pdf", "/content/dam/public/en_us/pdfs");
			return returnPath;
		}else{
			return returnPath;
		}
	}
	
	public static boolean checkValidReferer(String referer,String gatingParamVal){
		boolean skipForm = false ;
		if(referer==null){
			referer="";
		}
		skipForm = (referer.indexOf(".hds.com")!=-1  && gatingParamVal!=null && gatingParamVal.equalsIgnoreCase("1"));
		if(referer.contains("/cf") || referer.contains("/editor") || referer.contains("/siteadmin")){
			skipForm = true ;
		}
		return skipForm;
	}
	
	public static boolean isGated(String pdfPath,SlingHttpServletRequest request) throws Exception {

		boolean isGatedReturnFlag = false ;
				
		Resource res = PathResolver.getResourceFromShortURL(request, pdfPath);
		if(res!=null){
			Node resourceNode = res.adaptTo(Node.class) ;
			Node metaDataNode= resourceNode.getNode("jcr:content/metadata");
			String resourceTitle = "" ;
			String isGated = "";
			String gatedStartedDate = "";
			String gatedEndDate = "";
			
			Asset asset = res.adaptTo(Asset.class);
			if(asset!=null || metaDataNode!=null){
				try {
					if(asset!=null){
						resourceTitle = asset.getMetadataValue("dc:title");
						isGated = asset.getMetadataValue("dc:gated");
						gatedStartedDate = asset.getMetadataValue("dc:startdate");
						gatedEndDate = asset.getMetadataValue("dc:enddate");						
					}else if(metaDataNode!=null){
						isGated = metaDataNode.getProperty("dc:gated").getString();
						gatedStartedDate = metaDataNode.getProperty("dc:startdate").getString();
						gatedEndDate = metaDataNode.getProperty("dc:enddate").getString();
					}
					logger.debug("PDF Attributes are - "+isGated+" gatedStartedDate - "+gatedStartedDate+" gatedEndDate "+gatedEndDate);
					if(isGated!=null && isGated.equalsIgnoreCase("Yes") && gatedStartedDate!=null && gatedEndDate!=null){
						Calendar currDate =  Calendar.getInstance();
						Calendar startDate = metaDataNode.getProperty("dc:startdate").getValue().getDate();
						Calendar endDate = metaDataNode.getProperty("dc:enddate").getValue().getDate();
						
						long startTime = startDate.getTimeInMillis();
						long endTime = endDate.getTimeInMillis();
						long currTime = currDate.getTimeInMillis();
						
						if(currTime >= startTime && currTime < endTime){
							isGatedReturnFlag=true;
						}	
					}
					
				} catch (ValueFormatException e) {
					// TODO Auto-generated catch block
					logger.error("ValueFormatException  in isGated- " + e.getMessage()+" for the following path --- "+pdfPath);
				} catch (PathNotFoundException e) {
					// TODO Auto-generated catch block
					logger.error("PathNotFoundException  in isGated- " + e.getMessage()+" for the following path --- "+pdfPath);
				} catch (RepositoryException e) {
					// TODO Auto-generated catch block
					logger.error("PathNotFoundException  in isGated- " + e.getMessage()+" for the following path --- "+pdfPath);
				}
	
			}else{
				isGatedReturnFlag =false;
			}
		}
		logger.debug("IS PDF GATED - "+isGatedReturnFlag);
		return isGatedReturnFlag;
	}

	
	
}