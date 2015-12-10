package com.hdscorp.cms.util;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


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
}