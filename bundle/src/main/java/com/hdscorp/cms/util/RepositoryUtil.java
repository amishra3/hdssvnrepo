package com.hdscorp.cms.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jcrom.Jcrom;



public final class RepositoryUtil {
	


   /** Item path separator */
   public static final String PATH_SEPARATOR = "/";
   private static final Log LOG = LogFactory.getLog(RepositoryUtil.class);

    private RepositoryUtil() {
    }


    /**
    * 
    * Creates the isntance of JCROM
    * 
    * @param classes
    * @return JCROM object
    */
   public static Jcrom getJCROM(final Class[] classes) {
      final Jcrom jcrom = new Jcrom(false);
      for (final Class cls : classes) {
         jcrom.map(cls);
      }
      return jcrom;
   }
}
