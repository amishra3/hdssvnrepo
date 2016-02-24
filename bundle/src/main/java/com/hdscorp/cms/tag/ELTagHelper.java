package com.hdscorp.cms.tag;

import com.hdscorp.cms.util.PathResolver;

public class ELTagHelper {
	
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
    	//Check if mobile Image path is empty or null. If yes, set the desktop image as mobile
    	//TBD - Mobile image Path empty then create a mobile resolution URL using ACS commons 
    	//adaptive image service and use that as mobile image path
    	return bgImgAtrr;
    }

    
    public static String imgAtrr(String desktopImagePath,String mobileImagePath)
    {
    	String imgAtrr = "";
    	//Check if mobile Image path is empty or null. If yes, set the desktop image as mobile
    	//TBD - Mobile image Path empty then create a mobile resolution URL using ACS commons 
    	//adaptive image service and use that as mobile image path    	
    	return imgAtrr;
    }
    
}
