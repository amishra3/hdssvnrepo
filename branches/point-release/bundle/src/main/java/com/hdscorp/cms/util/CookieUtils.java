package com.hdscorp.cms.util;

import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author abhinav
 *         <p>
 *         Responsible for cookie related information.
 *         </p>
 */
public final class CookieUtils {

	
	private static final Logger logger = LoggerFactory.getLogger(CookieUtils.class);
	public static Map<String, String> getCookieDataAsMap(String cookieData) {

		Map cookieDataMap = new HashMap();
		if ((null != cookieData) && (!"".equals(cookieData.trim()))) {
			StringTokenizer st = new StringTokenizer(cookieData, ",");

			while (st.hasMoreTokens()) {
				String[] tmp = st.nextToken().split("=");
				if ((null != tmp) && (tmp.length == 2)) {
					cookieDataMap.put(tmp[0], tmp[1]);
					logger.info("cookie values are:"+tmp[0]+tmp[1]);
				}
			}
		}

		return cookieDataMap;

	}

	public static String getCookieMapAsString(Map<String, String> cookieMap) {

		StringBuilder cookieValue = new StringBuilder();
		for (Map.Entry<String, String> entry : cookieMap.entrySet()) {

			cookieValue.append(entry.getKey()).append("=").append(entry.getValue()).append(",");

		}
		logger.info("cookie value:"+cookieValue.toString());
		return cookieValue.toString();

	}

	
}