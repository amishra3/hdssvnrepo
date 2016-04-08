package com.hdscorp.cms.tag;

import org.apache.commons.lang.StringUtils;

import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;
import com.hdscorp.cms.util.PathResolver;

public class ELTagHelper {
	
//	public static String LOAD_IMAGE_PATH="/etc/clientlibs/hdscorp/main/images/load-indicator.gif";
	public static String LOAD_IMAGE_PATH=HdsCorpGlobalConfiguration.RESPONSIVE_LOADING_IMAGE_PATH;
//	public static String LOAD_IMAGE_PATH="";
	
	/**
     * This is the function that is called by the Expression Language processor.  It must be static.
     * @param longURL
     * @return
     */
    public static String shortURL( String longURL)
    {
    	String shortURL = PathResolver.getShortURLPath(longURL);
    	return shortURL;
    }

    public static String bgImgAtrr(String desktopImagePath,String mobileImagePath)
    {
    	String bgImgAtrr = "";
    	String mobileImageURL= getMobileImagePath(desktopImagePath,mobileImagePath);
//    	bgImgAtrr="data-image-desktop='"+desktopImagePath+"'"+" data-image-mobile="+"'"+mobileImageURL+"'";
    	bgImgAtrr="style=\"background-image: url(\'"+LOAD_IMAGE_PATH+"\'); \"data-image-desktop='"+desktopImagePath+"'"+" data-image-mobile="+"'"+mobileImageURL+"'";
    	return bgImgAtrr;
    }

    
    public static String imgAtrr(String desktopImagePath,String mobileImagePath)
    {
    	String imgAtrr = "";
    	String mobileImageURL= getMobileImagePath(desktopImagePath,mobileImagePath);
    	return imgAtrr;
    }
    
    public static String getMobileImagePath(String desktopImagePath,String mobileImagePath){
    	String mobileImageURL="";
    	if(mobileImagePath==null || StringUtils.isEmpty(mobileImagePath)){
    		//TBD - Get acs commons mobile rendition URL and use that if mobile specific image is not authored.
    		mobileImageURL = desktopImagePath;
    	}else{
    		mobileImageURL = mobileImagePath;
    	}
    	return mobileImageURL;
    }
    
    public static String removeDoubleQuotes(String inputString){
    	String returnString = inputString.replaceAll("\"", "");
    	returnString = inputString.replaceAll("&#34;", "");
    	
    	return returnString;
    }

    public static String concatString(String string1 , String string2 ){
    	return new StringBuilder().append(string1).append(string2).toString();
    	
    }

}
