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
    	return PathResolver.getShortURLPath(longURL);
    }

}
