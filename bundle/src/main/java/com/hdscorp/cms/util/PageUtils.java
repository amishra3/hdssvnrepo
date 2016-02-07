/*
 * ===========================================================================
 * CQPageUtils.java
 *
 * Created on Jun 16, 2012
 *
 * Copyright 2012, SapientNitro;  All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * SapientNitro, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with SapientNitro.
 * ===========================================================================
 */
package com.hdscorp.cms.util;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.collections.map.LinkedMap;
import org.apache.commons.httpclient.util.URIUtil;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.jcr.resource.JcrResourceUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.LabeledResource;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.constants.PageConstants;
import com.hdscorp.cms.dao.JCRDataAccessor;
import com.hdscorp.cms.exception.SystemException;


/**
 * <p>
 * Common utility methods to process CQ author input.
 * </p>
 */
public final class PageUtils {

    private static final String SEPARATOR = "/";
    private static final Logger log = LoggerFactory.getLogger(PageUtils.class);
    /**
     * HTTP prefix constant.
     */
    public static final String HTTP_PREFIX = "http://";

    /**
     * HTTPS prefix constant.
     */
    public static final String HTTPS_PREFIX = "https://";

    /**
     * <p>
     * Constant for html file extension.
     * </p>
     */
    public static final String PROPERTY_HTML_EXTENSION = ".html";
    /**
     * . Constant for paths starting with content
     */
    public static final String PROPERTY_STARTS_WITH_CONTENT = "/content";
    
    public static final String DEFAULT_URL = "#";

    /**
     * <p/>
     * Private constructor to restrict instance creation.
     * <p/>
     */
    private PageUtils() {
    }

    /**
     * <p>
     * This method returns the values entered through design dialog.
     * </p>
     *
     * @param objects      holding the objects like sling, resource resolver etc.
     * @param propertyName holds the design dialog values
     * @param defaultValue defaultValue to be used in case nothing is provided via design
     *                     dialog
     * @return Object this object can be typecasted as required
     */
    public static Object getPropertyFromCurrentStyle(
            final Map<String, Object> objects, final String propertyName,
            final Object defaultValue) {
        return MapUtils.getObject(
                (ValueMap) objects.get(PageConstants.CURRENT_STYLE),
                propertyName, defaultValue);
    }

    /**
     * This method appends .html extension to the passed url.
     *
     * @param url - The url to which .html extension is to be appended.
     * @return - Complete url with page extension html.
     */
    public static String addHTMLExtensionToURL(final String url) {
        return url + PROPERTY_HTML_EXTENSION;
    }

    /**
     * <p>
     * This method takes multi-widget values as input and outputs a list of maps
     * grouping the properties.
     * </p>
     *
     * @param data          - {@link Map} of all user input received as input
     *                      <code>ViewHelper.onGetData</code> method
     * @param propertyNames - {@link List} of all property names that are a part of the
     *                      multi-widget.
     * @return {@link List} of {@link Map} representing multi-widget rows.
     */
    public static List<Map<String, String>> convertMultiWidgetToList(
            final Map<String, Object> data, final Iterable<String> propertyNames) {
        final List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        final Map<String, Object[]> map = new HashMap<String, Object[]>();
        int maxLength = 0;
        for (final String propertyName : propertyNames) {
            final Object[] objects = ViewHelperUtil.getPropertyAsObjectArray(data,
                    propertyName);
            map.put(propertyName, objects);
            if ((objects != null) && (maxLength < objects.length)) {
                maxLength = objects.length;
            }
        }
        for (int i = 0; i < maxLength; i++) {
            final Map<String, String> row = new HashMap<String, String>();
            for (final String propertyName : propertyNames) {
                row.put(propertyName,
                        getStringFromArrayProperty(map.get(propertyName),
                                propertyName, i));
            }
            list.add(row);
        }
        return list;
    }

    /**
     * <p>
     * This method takes multi-widget values as input and outputs a list of maps
     * grouping the properties.
     * </p>
     *
     * @param data          - {@link Map} of all user input received as input
     *                      <code>ViewHelper.onGetData</code> method
     * @param propertyNames - {@link List} of all property names that are a part of the
     *                      multi-widget.
     * @return {@link List} of {@link Map} representing multi-widget rows
     */
    public static List<Map<String, String>> convertMultiWidgetToList(
            final ValueMap propertyMap, final String property) {
        final String[] propertyNames = property.split("-");
        final List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        final Map<String, Object[]> map = new HashMap<String, Object[]>();
        int maxLength = 0;
        for (final String propertyName : propertyNames) {
            final Object[] objects = ViewHelperUtil.getPropertyAsObjectArray(
                    propertyMap, propertyName);
            map.put(propertyName, objects);
            if ((objects != null) && (maxLength < objects.length)) {
                maxLength = objects.length;
            }
        }
        for (int i = 0; i < maxLength; i++) {
            final Map<String, String> row = new HashMap<String, String>();
            for (final String propertyName : propertyNames) {
                row.put(propertyName,
                        getStringFromArrayProperty(map.get(propertyName),
                                propertyName, i));
            }
            list.add(row);
        }
        return list;
    }

    /**
     * <p>
     * This method takes multi-widget property as input and outputs a list of
     * values as JSON.
     * </p>
     *
     * @param property - {@link Property} Instance.
     * @return JSONArray Instance.
     */
    public static JSONArray convertMultiPropertyToJson(final Property property) {

        final Value[] values = ViewHelperUtil.getPropertyAsValueArray(property);
        final JSONArray valueArray = new JSONArray();
        try {

            for (final Value value : values) {
                final JSONObject jsonObject = new JSONObject();
                jsonObject.put("text", value.getString());
                jsonObject.put("value", value.getString());
                valueArray.put(jsonObject);
            }
        } catch (ValueFormatException e) {
            throw new SystemException(
                    "ValueFormatException while reading multi value property",
                    e);
        } catch (IllegalStateException e) {
            throw new SystemException(
                    "IllegalStateException while reading multi value property",
                    e);
        } catch (RepositoryException e) {
            throw new SystemException(
                    "RepositoryException while reading multi value property", e);
        } catch (JSONException e) {
            throw new SystemException(
                    "JSON Exception while reading multi value property", e);
        }
        return valueArray;
    }

    /**
     * Return an index item of a component property which is an array.
     *
     * @param objectArray  , property value Array
     * @param propertyName , name of the component property to be retrieved
     * @param index        - index at which the peoperty has to be returned
     * @return String at index of property Array
     */
    private static String getStringFromArrayProperty(
            final Object[] objectArray, final String propertyName,
            final int index) {
        String propertyValue = null;
        if ((objectArray != null) && (index < objectArray.length)) {
            if (objectArray[index] != null) {
                propertyValue = objectArray[index].toString();
            }
        }
        return propertyValue;
    }

    /**
     * <p>
     * Validate url entered by author and add HTTP prefix to return valid url.
     * </p>
     *
     * @param urlString , url of link as entered in component(should not be null)
     * @return url of link, empty string returned if no url found
     */
    public static String createUrl(final String urlString) {
        String url = StringUtils.EMPTY;
        url = urlString;
        if (url.trim().startsWith(DEFAULT_URL)) {
        	url = url.trim();
        } else if (url.trim().startsWith(PROPERTY_STARTS_WITH_CONTENT)) {
            url += PROPERTY_HTML_EXTENSION;
        } else if (!(url.trim().startsWith(HTTP_PREFIX) || url.trim()
                .startsWith(HTTPS_PREFIX))
                && !StringUtils.EMPTY.equals(url)) {
            url = HTTP_PREFIX + url;
        }

        url = StringEscapeUtils.escapeHtml(url);
        return url;
    }

    /**
     * This method instantiates the {@link com.day.cq.wcm.foundation.List}
     * class, passing it the SlingHttpServletRequest. This class expects the
     * dialog values from one of the tabs in list component and based on
     * selected properties from dialog returns the list of pages. <B>This call
     * will fail in case the call is made for any request not instantiated for a
     * {@link com.day.cq.wcm.foundation.List} component.</B>
     *
     * @param objects holding the objects like sling, resource resolver etc.
     * @return Iterator<Page> - that iterates over the list of pages returned by
     *         List class.
     */
    public static Iterator<Page> getChildPages(
            final SlingHttpServletRequest slingRequest) {
        final com.day.cq.wcm.foundation.List list = new com.day.cq.wcm.foundation.List(
                slingRequest);
        return list.getPages();
    }

    /**
     * This method instantiates the {@link com.day.cq.wcm.foundation.List}
     * class, passing it the SlingHttpServletRequest. This class expects the
     * root page path to be available as parameter and returns the list of
     * pages.
     *
     * @param path Root path of the page.
     * @return Iterator<Page> - that iterates over the list of pages returned by
     *         List class.
     */
    public static Iterator<Page> getChildPages(final String path,
                                               final ResourceResolver resourceResolver) {
        Iterator<Page> pageIter = null;
        if (StringUtils.isNotEmpty(path)) {
            final Page page = resourceResolver.getResource(path).adaptTo(Page.class);
            pageIter = page.listChildren();
        }

        return pageIter;
    }

    /**
     * @param page - Page Object.
     * @return {@link Map} containing properties of the page.
     */
    private Map<String, Object> getPageProperties(final Page page) {

        final Map<String, Object> resourceMap = new HashMap<String, Object>();

        final Resource resourze = page.getContentResource();

        // put all properties of the page itself.
        resourceMap.putAll(page.getProperties());

        resourceMap.put(PageConstants.DEPTH, page.getDepth());

        resourceMap.put(PageConstants.PAGE_TITLE, page.getTitle());

        // put all the properties for jcr:content
        if (null != resourze) {
            resourceMap.putAll(resourze.adaptTo(ValueMap.class));
        }

        return resourceMap;
    }

    /**
     * <p>
     * return back all properties for a {@link Node}.
     * </p>
     *
     * @param node - object of {@link Node} for which the properties are to
     *             returned.
     * @return - {@link Map} with the node properties.
     */
    private Map<String, Object> getNodeProperties(final Node node) {
        final Map<String, Object> props = new HashMap<String, Object>();

        try {
            // Add node properties.
            final PropertyIterator properties = node.getProperties();
            while (properties.hasNext()) {
                final Property property = properties.nextProperty();

                if (!property.isNode()) {
                    if (property.isMultiple()) {
                        props.put(property.getName(), convertToString(property.getValues()));
                    } else if (property.getType() == 5) {
                        props.put(property.getName(), property.getDate().getTime());
                    } else {
                        props.put(property.getName(), property.getString());
                    }
                }
            }

        } catch (RepositoryException e) {
            final StringBuilder message = new StringBuilder("Error while retrieving properties for node: ");
            message.append(node.toString());
            throw new SystemException(message.toString(), e);
        }

        return props;
    }


    /**
     * retrieves {@link String} values from {@link Value} object.
     *
     * @param values , array of values to be converted to string.
     * @return Array of Strings.
     * @throws ValueFormatException  value format exception
     * @throws IllegalStateException illegal state exception
     * @throws RepositoryException   repository exception
     */
    private String[] convertToString(final Value[] values) throws ValueFormatException,
            IllegalStateException, RepositoryException {
        final String[] strValues = new String[values.length];
        for (int i = 0; i < values.length; i++) {
            strValues[i] = values[i].getString();
        }
        return strValues;
    }

    /**
     * This method instantiates the {@link com.day.cq.wcm.foundation.List}
     * class, passing it the SlingHttpServletRequest. This class expects the
     * root node path to be available as parameter and returns the list of
     * child nodes.
     *
     * @param path Root path of the node.
     * @return Iterator<Node> - that iterates over the list of nodes returned by
     *         List class.
     * @throws RepositoryException
     */
    public static Iterator<Node> getChildNodes(final String path,
                                               final ResourceResolver resourceResolver) {

        Iterator<Node> nodeIter = null;
        try {
            if (StringUtils.isNotEmpty(path)) {
                final Node node = resourceResolver.getResource(path).adaptTo(Node.class);
                nodeIter = node.getNodes();
            }
            return nodeIter;
        } catch (Exception e) {
            log.error("Generic exception: ", e);
        }
        return null;
    }


    /**
     * <p>
     * Responsible for reading the node name from the node path. The underlying
     * implmentation is that the node path always has <code>/</code> as the path
     * separator and this separator is never allows in the paths.
     * </p>
     * <p/>
     * <p>
     * Also, the logic is build on the implementation that any name after the
     * last <code>/</code> will be the node name.
     * </p>
     *
     * @param nodePath - path of the node
     * @return - node name post substring
     */
    public static String getNodeName(final String nodePath) {
        return StringUtils.substringAfterLast(nodePath, SEPARATOR);
    }

    /**
     * This method is used to get the current locale of the page which would be
     * used in setting the path for driver profile page based on the current
     * locale.
     *
     * @param pagePath - path of the page whose locale is to be figured out
     * @return currentLocale - of the current page.
     */
    public static String getLocale(String pagePath) {

        for (int i = 0; i <= 2; i++) {
            pagePath = StringUtils.substringAfter(pagePath, SEPARATOR);
        }

        return StringUtils.substringBefore(pagePath, SEPARATOR);
    }


    public static String addOrReplaceParam(final String requestUrl, final String paramName, final Object paramValue) {
        String pValue = "";
        if (paramValue instanceof String) {
            pValue = (String) paramValue;
        } else if (paramValue instanceof Long) {
            pValue = paramValue.toString();
        }

        String updatedURL = requestUrl.replaceAll("\\." + paramName + "@" + "[a-zA-Z0-9]*" + "\\.", ".");
        updatedURL = updatedURL.replace(".html", "");
        updatedURL = updatedURL + "." + paramName + "@" + pValue;
        updatedURL += ".html";

        return updatedURL;
    }

    public static String replacehtmlTags(String str) {
        if ((str != null) && !str.isEmpty()) {
            str = str.replace("<p>", "").replace("</p>", "");
            str = str.replace("<h2>", "").replace("</h2>", "");
            str = str.replace("<h3>", "").replace("</h3>", "");
            str = str.replace("<span", "<p").replace("</span>", "</p>");
            str = str.replaceFirst("<br>", "");
        }
        return str;
    }

    public static String replaceSpanTag(String str) {
        if ((str != null) && !str.isEmpty()) {
            str = str.replace("<span", "</p><p").replace("</span>", "</p>");
        }

        return str;
    }

    public static String removeParaTag(String str) {
        if ((str != null) && !str.isEmpty()) {
            str = str.replace("<p>", "").replace("</p>", "");
        }
        return str;
    }


    public static List<String> getPropertyValues(final Property property) {
        final List<String> propertyValue = new ArrayList<String>();
        try {
            if (property.isMultiple()) {
                final Value[] values = property.getValues();
                for (final Value value : values) {
                    propertyValue.add(value.getString());

                }
            } else {
                propertyValue.add(property.getValue().getString());
            }
        } catch (RepositoryException e) {
            log.error("Repository exception: ", e);
        }
        return propertyValue;
    }

    public static Map<String, Object> getmapFromStringArrayproperty(final Property property) {
        final Map<String, Object> propertyMap = new LinkedMap();


        try {
            if ((property != null) && property.isMultiple()) {
                final Value[] values = property.getValues();
                for (int i = 0; i < values.length; i += 2) {
                    if ((values[i] != null) && (values[i + 1] != null)) {
                        propertyMap.put(values[i].getString(), values[i + 1].getString());
                    }

                }
            }
        } catch (RepositoryException e) {
            log.error("Repository exception: ", e);
        }
        return propertyMap;
    }

    public static Boolean createNodesForJSON(final String nodeName,
                                             final Node currentNode, final LabeledResource currentPage,
                                             final ResourceResolver resourceResolver) {
        Boolean flag = false;
        try {

            String nodePath = currentPage.getPath() + "/jcr:content/"
                    + nodeName;
            Session session = null;
            if (currentNode == null) {
                nodePath = currentPage.getPath() + "/jcr:content/"
                        + nodeName;
                session = resourceResolver.adaptTo(Session.class);
                final Node node = JcrResourceUtil.createPath(nodePath,
                        "nt:unstructured", "nt:unstructured", session, false);
                if (node != null) {
                    node.setProperty("sling:resourceType",
                            "hdscorp/components/content/" + nodeName);

                }
                session.save();
                log.debug("Node Created...");
                flag = true;
            } else {
                flag = true;
            }

        } catch (RepositoryException e) {
            log.error("Error while creating Node...", e);
        }
        return flag;
    }
    
public static String  getComponentPath(final Page currentPage, ResourceResolver resourceResolver,String parent,String componentName) {
    	
        String nodepath  = ""; 
       
        Session   session=null;
       
        try {

            String nodePath = currentPage.getPath() + "/jcr:content/"
                    + parent+"/"+componentName;
           
            session = resourceResolver.adaptTo(Session.class);
            
            JCRDataAccessor jCRDataAccessor=new JCRDataAccessor(session);
            
          Node node=  jCRDataAccessor.getNode(nodePath);
            
            if (node != null) {
            	
            	nodepath=node.getPath();
               
            } 
            
          
            

        } catch (Exception e) {
        	
              log.error("Error while creating Node...", e);
            
             
        }
        
        return nodepath;
    }

    public static long getSize(final String path, final ResourceResolver resourceResolver) {
        final Resource r = resourceResolver.getResource(path);
        final Asset a = r.adaptTo(Asset.class);
        if (a != null) {
            final Rendition rnd = a.getOriginal();
            final long size = rnd.getSize() / 1024;
            return size;
        } else {
            return 0;
        }
    }
    
    public static String getFormattedDate(String dateReceivedFromUser){
    	
        DateFormat userDateFormat = new SimpleDateFormat("MM/dd/yy");  
        DateFormat dateFormatNeeded = new SimpleDateFormat("MMMM dd, yyyy");  
        Date date;
		try {
			 date = userDateFormat.parse(dateReceivedFromUser);
			 String convertedDate = dateFormatNeeded.format(date);
			 return convertedDate;
		} catch (ParseException e) {
			log.error("Error while parsing date", e);
		}
		return dateReceivedFromUser; 
    	
    }
    
    public static String getCardNumber(String userInfo){ 
		String cardNumber = null;
		try{
		String userInfoCookie = URIUtil.decode(userInfo, "UTF-8");
		log.debug("Cookie : >>> " + userInfoCookie);
		if (userInfoCookie.contains("cardNumber")) {
			cardNumber = userInfoCookie.split("cardNumber=")[1]
					.split(",")[0];
		}
		else{
			log.debug("Cookie doesnot contain cardNumber: >>> ");
		}
		}catch(Exception e){
			log.debug("Error while Decoding URI:>>> "+e);
		}
		
		
		return cardNumber;
	}
    public static String appendImageReditionPath(SlingHttpServletRequest slingRequest,String imgPath) {
        Resource resource= slingRequest.getResourceResolver().getResource(imgPath+"/jcr:content/metadata");
           if(resource!= null){

               Node ext_node = resource.adaptTo(Node.class);
               if(ext_node != null)
               {
                   try{
              			String extension ="/jcr:content/renditions/cq5dam.web.1280.1280."+ ext_node.getProperty("dam:Fileformat").getValue().getString().toLowerCase();
 			  			imgPath = imgPath+extension;
 			  			return imgPath;
                   } catch (PathNotFoundException e) {
                	   log.error("Exception occourred while retrieving the image path from web: {}", e);
                   }catch (RepositoryException e) {
                	   log.error("Exception occourred while retrieving the image path from web: {}", e);
                   }
 				}  
 			}
     return "";
    }
    
    
    public static String getPropertyValue(ResourceResolver resourceResolver,String path, String propertyName) {
		String propertyValue = "";		
		try {
			log.info("Execution start for getPropertyValue");
			if(resourceResolver!=null && path!=null && !path.isEmpty() && propertyName!=null && !propertyName.isEmpty()){
			Resource res = resourceResolver.getResource(path);
			if(res!=null){
			ValueMap properties = res.adaptTo(ValueMap.class);
			propertyValue = properties.get(propertyName, (String) null).toString();
			}
			}
		} catch (Exception e) {
			log.error("Exception occourred while saving data to JCR: ", e);
		}
		log.info("propertyValue:::"+propertyValue);
		return propertyValue;
	}
    
    
    public static int doesNodeExist(Node content, String nodeName) {
		try {
			int childRecs = 0;
			java.lang.Iterable<Node> requiredRoot = JcrUtils.getChildNodes(content, nodeName);
			Iterator<Node> rootitr = requiredRoot.iterator();

			// only going to be 1 content/nodeName node if it exists
			if (rootitr.hasNext()) {
				// Count the number of child nodes in content/customer
				Node requiredRootNode = content.getNode(nodeName);
				Iterable<Node> itCust = JcrUtils.getChildNodes(requiredRootNode);
				Iterator<Node> childNodeIt = itCust.iterator();

				// Count the number of nodeName child nodes
				while (childNodeIt.hasNext()) {
					childRecs++;
					childNodeIt.next();
				}
				return childRecs;
			} else
				return -1; // required node does not exist
		} catch (Exception e) {
			log.error("Exception occured while checking not into the JCR: " + e);
		}
		return 0;
	}
}
