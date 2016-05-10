package com.hdscorp.cms.util;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.QueryBuilder;
import com.hdscorp.cms.constants.GlobalConstants;
import com.hdscorp.cms.dao.JCRDataAccessor;
/**
 * {@link GridComponentHelper} class for Grid Component Update Funcationalty Utility
 * @author abhinav
 *
 */
public final class GridComponentHelper {
	
	private static final Logger LOG = LoggerFactory.getLogger(GridComponentHelper.class);
	private static final String _MENU_ITEMS_LIST="menuitemlist";
	private static final String _TAG_NAME="tagname";
	private static final String _PARENT_TAG_NAME="parenttag";
	private static final String _PAGE_PATH="path";
	private static final String _CATEGORIES="categories";

	/**
	 * Private Constructor
	 */
	private GridComponentHelper(){
	}
	private static List getGridList(List gridPages) {
		// TODO Auto-generated method stub
		try{
			
			List<String> itemsList=new ArrayList<String>();
			Iterator pageIterator = gridPages.iterator();
			Map nodeProperties = null;
			String pagePath = null;
			String pageName = null;
			while (pageIterator.hasNext()) {
				nodeProperties = (Map) pageIterator.next();
				pagePath=(String)nodeProperties.get(_PAGE_PATH);
				Resource resource=JcrUtilService.getResourceResolver().getResource(pagePath);
				pageName = resource.getName();
				itemsList.add(pagePath);
				itemsList.add(pageName);
			}
			
			return itemsList;
			
		} catch (Exception e){
			
		}
		return null;
	}
	/**
	 * Get Grid Component Reference Pages
	 * @param itemTag
	 * @return  List object
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static List getGridReferencePages(final String itemTag){
        LOG.info("GridComponentHelper :: Finding grid reference pages");
		try{
			final Map queryParams = new HashMap();
			List searchItemsList = new ArrayList();
			queryParams.put("type", "nt:unstructured");
			queryParams.put("1_property","sling:resourceType");
			queryParams.put("1_property.value", GlobalConstants.GRID_VIEW_COMPONENT_RESOURCE_TYPE);

			queryParams.put("2_property", _TAG_NAME);
			queryParams.put("2_property.1_value", itemTag);

			queryParams.put("p.limit", "0");
			queryParams.put("p.hits", "selective");
			queryParams.put("p.properties", "tagname menuitemlist placardtype");
			
			final QueryBuilder queryBuilder = JcrUtilService.getResourceResolver().adaptTo(QueryBuilder.class);
			final JCRDataAccessor dataAccessor = new JCRDataAccessor(JcrUtilService.getSession());
			searchItemsList = dataAccessor.findAllNodes(queryBuilder, queryParams);
            LOG.info("Grid Reference Page Count Size  ::" + searchItemsList.size());
			return searchItemsList;
		}catch (Exception e) {
            LOG.error("Error while finding Grid Reference Pages :: Caused by -", e);
		}
		return null;
	}
	
	/**
	 * Get Grid Component Reference Pages for given page path
	 * @param itemTag
	 * @return  List object
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List getGridReferencePagesForPage(final String pagePath){
        LOG.info("GridComponentHelper :: Finding grid reference pages");
		try{
			final Map queryParams = new HashMap();
			List searchItemsList = new ArrayList();
			queryParams.put("type", "nt:unstructured");
			queryParams.put("1_property","sling:resourceType");
			queryParams.put("1_property.value", GlobalConstants.GRID_VIEW_COMPONENT_RESOURCE_TYPE);

			queryParams.put("2_property", "menuitemlist");
			queryParams.put("2_property.1_value", pagePath);

			queryParams.put("p.limit", "0");
			queryParams.put("p.hits", "selective");
			queryParams.put("p.properties", "tagname menuitemlist placardtype");
			
			final QueryBuilder queryBuilder = JcrUtilService.getResourceResolver().adaptTo(QueryBuilder.class);
			final JCRDataAccessor dataAccessor = new JCRDataAccessor(JcrUtilService.getSession());
			searchItemsList = dataAccessor.findAllNodes(queryBuilder, queryParams);
            LOG.info("Grid Reference Page Count Size  ::" + searchItemsList.size());
			return searchItemsList;
		}catch (Exception e) {
            LOG.error("Error while finding Grid Reference Pages :: Caused by -", e);
		}
		return null;
	}
	/**
	 * Check whether given items exists in the items or not
	 * @param items
	 * @param newItem
	 * @return {@link Boolean} true|false
	 */
	private static boolean checkItemsExists(final String[] items, final String newItem){
        LOG.info("GridComponentHelper:: checkItemsExists");
		try{
				boolean flag=false;
				for(int i=0; (null != items) && (i < items.length);i++){
					if(items[i].equalsIgnoreCase(newItem)){
						flag=true;
						if(LOG.isDebugEnabled()){
                            LOG.debug("Duplicate Found .. not adding to grid:" + newItem);
						}
						break;
					}
				}
				return flag;
		}catch (Exception e){
            LOG.error("Error while checking items :: Caused by -", e);
		}
		return false;
	}
	
	/**
	 * Checking Grid Item valid or not
	 * @param item
	 * @param tagName
	 * @return {@link Boolean} true| false
	 */
	@SuppressWarnings("unused")
	private static boolean isValidItem(String item,String[] tagNames){
		LOG.info("GridComponentHelper:: isValidItem");
		try{
				String[] itemTags=null;
				if(StringUtils.isNotBlank(item) && null!=tagNames){
					Resource resource=JcrUtilService.getResourceResolver().getResource(item);
					if(null!=resource){
						Node itemNode=resource.adaptTo(Node.class);
						if(itemNode.hasNode(GlobalConstants.JCR_CONTENT)){
							Node contentNode=itemNode.getNode(GlobalConstants.JCR_CONTENT);
							if(contentNode.hasNode(GlobalConstants.DETAILS)){
								//Resource detailsNodePath=JcrUtilService.getResourceResolver().getResource(contentNode.getNode(GlobalConstants.DETAILS).getPath());
								Node detailsNode=contentNode.getNode(GlobalConstants.DETAILS);
								if(detailsNode.hasProperty(_PARENT_TAG_NAME)){
									itemTags=PropertyResolver.getStringArrayProperty(detailsNode.getProperty(_PARENT_TAG_NAME));
								}else if(detailsNode.hasProperty(_CATEGORIES)){
									itemTags=PropertyResolver.getStringArrayProperty(detailsNode.getProperty(_CATEGORIES));
								}
								// Check whether items Tags are matched with Grid Tags
								for(int i=0;null!=itemTags && i<itemTags.length;i++){
									for(int j=0; null!=tagNames && j<tagNames.length;j++){
										if(tagNames[j].equalsIgnoreCase(itemTags[i])){
											LOG.info("Item Tag Matched with Grid Tag" + itemTags[i]);
											return true;
										}
									}
								}
							}
						}
					}
				}
		}catch (Exception e){
			e.printStackTrace();
			LOG.error("Error while validating Item :: Caused by -" +e);	
		}
		return false;
	}
	
	/**
	 * Get Grid Pages based on tags.
	 * @param fullTags
	 * @return  List object
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static List getGridPages(String[] fullTags){
        LOG.info("GridComponentHelper :: Getting all grid pages based on tags");
		try{
			List searchItemsList = new ArrayList();
			final Map queryParams = new HashMap();
			queryParams.put("path",
					"/content/hdscorp/en_us/structureddata/");
			queryParams.put("type", "cq:Page");
			queryParams.put("p.limit", "0");

			queryParams.put("group.1_group.1_property", "jcr:content/cq:tags");
			queryParams.put("group.1_group.1_property.or", "true");
			for (int index = 0; index < fullTags.length; index++) {
				queryParams
						.put("group.1_group.1_property." + (index + 1)
								+ "_value",
								URLDecoder.decode(fullTags[index], "UTF-8"));
			} // end for

			queryParams.put("group.2_group.1_property",
					"jcr:content/details/categories");
			queryParams.put("group.2_group.1_property.or", "true");
			for (int index = 0; index < fullTags.length; index++) {
				queryParams
						.put("group.2_group.1_property." + (index + 1)
								+ "_value",
								URLDecoder.decode(fullTags[index], "UTF-8"));
			} // end for

			queryParams.put("group.3_group.1_property",
					"jcr:content/details/parenttag");
			queryParams.put("group.3_group.1_property.or", "true");
			for (int index = 0; index < fullTags.length; index++) {
				queryParams
						.put("group.3_group.1_property." + (index + 1)
								+ "_value",
								URLDecoder.decode(fullTags[index], "UTF-8"));
			} // end for

			queryParams.put("group.p.or", "true");
			
			final QueryBuilder queryBuilder = JcrUtilService.getResourceResolver().adaptTo(QueryBuilder.class);
			final JCRDataAccessor dataAccessor = new JCRDataAccessor(JcrUtilService.getSession());
			searchItemsList = dataAccessor.findAllNodes(queryBuilder, queryParams);
            LOG.info("Total Grid pages for the Tags::" + searchItemsList.size());
			return searchItemsList;
		}catch (Exception e) {
            LOG.error("Error while finding Grid Reference Pages :: Caused by -", e);
		}
		return null;
	}
}
