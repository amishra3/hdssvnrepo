package com.hdscorp.cms.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;
import javax.servlet.jsp.PageContext;

import org.apache.commons.collections.MapUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingScriptHelper;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.text.Text;
import com.hdscorp.cms.constants.PageConstants;
import com.hdscorp.cms.exception.SystemException;



public class JCRDataAccessor {

	 /**
     * pagenation key for the querybuilder.
     */
    private static final String PAGENATION_SIZE = "p.limit";

    /**
     * Default size for the query results.
     */
    private static final String DEFAULT_RESULT_SIZE = "10";

    /**
     * Holds the error string literal for path not found.
     */
    private static final String ERROR_STRING_PATH_NOT_FOUND = "Path not found for the node: ";

    /**
     * Holds the error string literal.
     */
    private static final String ERROR_STRING_NOT_INITIALIZED = " has not been initialized correctly.";

    /**
     * <p>
     * Holds an instance of the {@link PageContext} which is used for carrying
     * out various operations on CRX.
     * </p>
     */
    private PageContext pageContext;

    /**
     * <p>
     * An object of {@link SlingScriptHelper} which is used for carrying our
     * various operations on CRX.
     * </p>
     */
    private SlingScriptHelper slingScriptHelper;

    /**
     * <p>
     * An object of {@link ResourceResolver} which is used for carrying our
     * various operations on CRX.
     * </p>
     */
    private ResourceResolver resourceResolver;

    /**
     * <p>
     * An object of {@link Session} which is used for carrying our various
     * operations on CRX.
     * </p>
     */
    private Session session;

    /**
     * <p>
     * This needs to be provided with a valid and initialized object of
     * {@link PageContext}. This property is stored to operate upon later.
     * </p>
     * 
     * @param pageContext
     *            - object of {@link PageContext} which is used to fetch the
     *            data from underlying CRX.
     * 
     */
    public JCRDataAccessor(final PageContext pageContext) {
        if (pageContext == null) {
            throw new SystemException("Unable to create an object of " + JCRDataAccessor.class
                    + ". Please validate the resources being passed.");
        }

        this.pageContext = pageContext;
    }

    /**
     * <p>
     * This needs to be provided with a valid and initialized object of
     * {@link Session}. This property is stored to operate upon later.
     * </p>
     * 
     * @param session
     *            - object of {@link Session} which is used to fetch the data
     *            from underlying CRX.
     * 
     */
    public JCRDataAccessor(final Session session) {
        if (session == null) {
            throw new SystemException("Unable to create an object of " + JCRDataAccessor.class
                    + ". Please validate the resources being passed.");
        }

        this.session = session;
    }

    /**
     * <p>
     * This method is used internally to return an object of {@link PageContext}
     * .
     * </p>
     * 
     * @return object of {@link PageContext}
     */
    private PageContext getPageContext() {
        if (this.pageContext == null) {
            throw new SystemException("Object of " + JCRDataAccessor.class + ERROR_STRING_NOT_INITIALIZED);
        }

        return this.pageContext;
    }

    /**
     * <p>
     * This method is used internally to return an object of
     * {@link SlingScriptHelper}. This method initializes the object lazily and
     * only when it is needed.
     * </p>
     * 
     * @return object of {@link SlingScriptHelper}
     */
    private SlingScriptHelper getSlingScriptHelper() {
        if (this.slingScriptHelper == null) {
            this.slingScriptHelper = (SlingScriptHelper) getPageContext().findAttribute("sling");
        }

        if (this.slingScriptHelper == null) {
            throw new SystemException("Object of " + JCRDataAccessor.class + ERROR_STRING_NOT_INITIALIZED);
        }
        return this.slingScriptHelper;
    }

    /**
     * <p>
     * This method is used internally to return an object of {@link Session}.
     * This method initializes the object lazily and only when it is needed.
     * </p>
     * 
     * @return object of {@link Session}
     */
    protected Session getSession() {
        if (this.session == null) {
            this.session = getSlingScriptHelper().getRequest().getResourceResolver().adaptTo(Session.class);
        }

        return this.session;
    }

    /**
     * <p>
     * This method is used internally to return an object of
     * {@link ResourceResolver}. This method initializes the object lazily and
     * only when it is needed.
     * </p>
     * 
     * @return object of {@link ResourceResolver}
     */
    private ResourceResolver getResourceResolver() {
        if (this.resourceResolver == null) {
            this.resourceResolver = getSlingScriptHelper().getRequest().getResourceResolver();
        }

        return this.resourceResolver;
    }

    /**
     * <p>
     * Responsible for reading the fetching a {@link Resource} from CRX.
     * </p>
     * 
     * @param path
     *            - {@link String} pointing to the resource location in the CRX
     *            repository.
     * 
     * @return - {@link Map} of properties for the resource
     */
    public Map<String, Object> getResource(final String path) {
        final Node node = this.getNode(path);
        return this.getNodeProperties(node);
    }

    /**
     * <p>
     * Returns back the current page that has initiated the request.
     * </p>
     * 
     * <p>
     * This method also provides the path for the current page in the properties
     * and is accessible via the property <code>CURRENT_PAGE_PATH</code>.
     * </p>
     * 
     * @return object is {@link Page} pointing to the current page that
     *         initiated the request.
     */
    public Map<String, Object> getCurrentPage() {
        final Page page = (Page) this.pageContext.findAttribute(PageConstants.CURRENT_PAGE);
        final Map<String, Object> properties = this.getPageProperties(page);
        properties.put(PageConstants.KEY_CURRENT_PAGE_PATH, page.getPath());
        return properties;
    }

    /**
     * <p>
     * Finds a property set on {@link PageContext}.
     * </p>
     * 
     * @param property
     *            - property to be returned
     * @return - {@link Object}
     */
    public Object findAttribute(final String property) {
        return this.pageContext.findAttribute(property);
    }

    /**
     * <p>
     * Returns all the child nodes for a provided path.
     * </p>
     * 
     * @param path
     *            - {@link String} representing the resource
     * @return - {@link List} of child nodes
     */
    public List<Map<String, Object>> getResources(final String path) {
        final Node node = this.getNode(path);

        final List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();
        try {
            final NodeIterator nodeIterator = node.getNodes();
            while (nodeIterator.hasNext()) {
                final Node childNode = (Node) nodeIterator.next();
                final Map<String, Object> childAsMap = this.getNodeProperties(childNode);
                childAsMap.put("NODE_PATH", childNode.getPath());
                childAsMap.put("NODE_NAME", childNode.getName());
                children.add(childAsMap);
            }
        } catch (RepositoryException rExp) {
            throw new SystemException("Unable to fetch child nodes for: " + path, rExp);
        }

        return children;
    }

    /**
     * <p>
     * Returns properties of the child pages in a page that corresponds to
     * passed path.
     * </p>
     * 
     * @param path
     *            - path corresponding to a page.
     * @return {@link List} containing child page properties.
     * @see com.sapient.platform.core.cms.cq.dao.CQDataAccessor#getChildPages(String)
     */
    public List<Map<String, Object>> getChildPages(final String path) {
        final Node node = this.getNode(path);

        final List<Map<String, Object>> children = new ArrayList<Map<String, Object>>();
        try {
            final NodeIterator nodeIterator = node.getNodes();
            while (nodeIterator.hasNext()) {
                final Node childNode = (Node) nodeIterator.next();
                if ("cq:Page".equals(childNode.getProperty("jcr:primaryType").getValue().getString())) {
                    final Page page = this.loadPage(childNode.getPath());
                    final Map<String, Object> childAsMap = this.getPageProperties(page);
                    childAsMap.put(PageConstants.PATH, page.getPath());
                    childAsMap.put(PageConstants.NAME, page.getName());
                    children.add(childAsMap);
                }
            }
        } catch (RepositoryException rExp) {
            throw new SystemException("Unable to fetch child nodes for: " + path, rExp);
        }

        return children;
    }

    /**
     * <p>
     * Returns the properties for a resource at <code>relPath</code> relative to
     * the node at <code>path</code>.
     * </p>
     * 
     * <p>
     * If <code>relPath</code> contains a path element that refers to a node
     * with same-name sibling nodes without explicitly including an index using
     * the array-style notation (<code>[x]</code>), then the index [1] is
     * assumed (indexing of same name siblings begins at 1, not 0, in order to
     * preserve compatibility with XPath).
     * <p>
     * Within the scope of a single <code>Session</code> object, if a
     * <code>Node</code> object has been acquired, any subsequent call of
     * <code>getNode</code> reacquiring the same node must return a
     * <code>Node</code> object reflecting the same state as the earlier
     * <code>Node</code> object. Whether this object is actually the same
     * <code>Node</code> instance, or simply one wrapping the same state, is up
     * to the implementation.
     * 
     * @param path
     *            the path at this the node is to searched.
     * @param relPath
     *            The relative path of the node to retrieve.
     * @return {@link Map} with the properties of the node at
     *         <code>relPath</code>.
     * 
     */
    public Map<String, Object> getRelativeResource(final String path, final String relPath) {
        // Load the node at path
        Node node = this.getNode(path);
        try {
            node = node.getNode(relPath);
        } catch (RepositoryException rExp) {
            throw new SystemException("Unable to fetch relative node: " + relPath + " for the node: " + path, rExp);
        }
        return this.getNodeProperties(node);
    }

    /**
     * <p>
     * Returns back the current page that has initiated the request.
     * </p>
     * 
     * @param path
     *            - {@link String} pointing to the location of the page to be
     *            loaded.
     * @return object is {@link Map} pointing to the current page that initiated
     *         the request.
     */
    public Map<String, Object> getPage(final String path) {
        final Page page = this.loadPage(path);
        if (page == null) {
            throw new SystemException(JCRDataAccessor.class + " No Page found at : " + path);
        }
        return this.getPageProperties(page);
    }

    /**
     * <p>
     * Fetches a relative page in the hierarchy with respect to the page
     * provided.
     * </p>
     * 
     * @param path
     *            - {@link String} point to the path in the repository
     * @param level
     *            - relative level in the navigation for which the page has to
     *            be returned
     * 
     * @return object of {@link Map} holding the properties of the relative
     *         page. If the provided path is not an object of {@link Page} this
     *         will throw an {@link SystemException}
     * 
     */
    public Map<String, Object> getRelativePage(final String path, final int level) {
        final String relativePath = Text.getAbsoluteParent(path, level);

        final Map<String, Object> properties = this.getPage(relativePath);
        properties.put(PageConstants.KEY_CURRENT_PAGE_PATH, relativePath);
        return properties;
    }

    /**
     * <p>
     * return back all properties for a {@link Node}.
     * </p>
     * 
     * @param node
     *            - object of {@link Node} for which the properties are to
     *            returned.
     * @return - {@link Map} with the node properties.
     * 
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
     * @param values
     *            , array of values to be converted to string.
     * @return Array of Strings.
     * @throws ValueFormatException
     *             value format exception
     * @throws IllegalStateException
     *             illegal state exception
     * @throws RepositoryException
     *             repository exception
     */
    private String[] convertToString(final Value[] values) throws
            IllegalStateException, RepositoryException {
        final String[] strValues = new String[values.length];
        for (int i = 0; i < values.length; i++) {
            strValues[i] = values[i].getString();
        }
        return strValues;
    }

    /**
     * <p>
     * Returns back a {@link Node} for a given path.
     * </p>
     * 
     * @param path
     *            - {@link String} pointing to a Node.
     * @return - {@link Node} for the given path.
     */
    public Node getNode(final String path) {
        Node node = null;
        if (null != getSession()) {
            try {
                node = getSession().getNode(path);
            } catch (PathNotFoundException pnfExp) {
                throw new SystemException(ERROR_STRING_PATH_NOT_FOUND + path, pnfExp);
            } catch (RepositoryException rExp) {
                throw new SystemException("Error while retrieving node: " + path, rExp);
            }
        } else if (null != getResourceResolver()) {
            final Resource resource = getResourceResolver().getResource(path);

            if (resource == null) {
                throw new SystemException(ERROR_STRING_PATH_NOT_FOUND + path);
            }
            node = resource.adaptTo(Node.class);
        } else {
            throw new SystemException(JCRDataAccessor.class
                    + " has not been initialized properly. Could not retreive the resource at: " + path);
        }

        return node;
    }

    /**
     * <p>
     * Loads a resource for a provided path. This method currently will work
     * only if {@link ResourceResolver} has been passed and for the
     * {@link Session} based initialization this will not work.
     * </p>
     * 
     * @param path
     *            - {@link String} for which the resource has to be loaded
     * @return - {@link Resource} that is loaded for the path.
     */
    private Resource getResourze(final String path) {
        if (null != getResourceResolver()) {
            final Resource resource = getResourceResolver().getResource(path);

            if (resource == null) {
                throw new SystemException(ERROR_STRING_PATH_NOT_FOUND + path);
            }
            return resource;
        } else {
            throw new SystemException("Unable to fetch the resource because " + JCRDataAccessor.class
                    + ERROR_STRING_NOT_INITIALIZED);
        }
    }

    /**
     * 
     * @param path
     *            - corresponding to a page.
     * @return {@link Page}
     */
    private Page loadPage(final String path) {
        return this.getResourze(path).adaptTo(Page.class);
    }

    /**
     * 
     * @param page
     *            - Page Object.
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
        if (null != resourze ) { 
            resourceMap.putAll(resourze.adaptTo(ValueMap.class));        
        }

        return resourceMap;
    }

    /**
     * @param path
     *            - {@link String} pointing to a Node.
     * @return {@link Boolean} true if node exists, otherwise false.. Check
     *         whether a node exists for the specified path.
     */
    public Boolean exists(final String path) {
        try {
            this.getNode(path);
        } catch (SystemException e) {
            return false;
        }
        return true;
    }

    /**
     * <p>
     * This method returns the list of tags of page.
     * </p>
     * 
     * @param path
     *            - a {@link String} holding the path to the page for which the
     *            tags are to be located.
     * @return - a {@link List} of Tags for the page.
     */
    public List<String> getTags(final String path) {
        final List<String> tagList = new ArrayList<String>();
        TagManager tagManager = null;
        tagManager = this.getResourceResolver().adaptTo(TagManager.class);
        if (null != tagManager) {
            final Page currentPage = loadPage(path);
            final Tag[] tags = currentPage.getTags();
            for (final Tag tag : tags) {
                tagList.add(tag.getTitle());
            }
        } else {
            throw new SystemException(JCRDataAccessor.class
                    + " has not been initialized properly. Could not get the tagManager instance");
        }
        return tagList;
    }
    
    /**
     * <p>
     * This method returns the tag object for the tag ID.
     * </p>
     * 
     * @param tagId
     *            - a {@link String} holding the tag ID based on which tag should be located.
     * @return - a {@link Tag} resolved tag object.
     */
    public Tag getTag(final String tagID) {

        TagManager tagManager = null;
        tagManager = this.getResourceResolver().adaptTo(TagManager.class);

        return tagManager.resolve(tagID);
    }

    
    /**
     * <p>
     * This method returns the list of tags of page.
     * </p>
     * 
     * @param path
     *            - a {@link String} holding the path to the page for which the
     *            tags are to be located.
     * @return - a {@link List} of Tags for the page.
     */
    public List<String> getTagsName(final String path) {
        final List<String> tagList = new ArrayList<String>();
        TagManager tagManager = null;
        tagManager = this.getResourceResolver().adaptTo(TagManager.class);
        if (null != tagManager) {
            final Page currentPage = loadPage(path);
            final Tag[] tags = currentPage.getTags();
            for (final Tag tag : tags) {
                tagList.add(tag.getName());
            }
        } else {
            throw new SystemException(JCRDataAccessor.class
                    + " has not been initialized properly. Could not get the tagManager instance");
        }
        return tagList;
    }
    /**
     * <p>
     * This method returns the list of tags matches the passed title.
     * </p>
     * 
     * @param tagTitle
     *            - a {@link String} holding the path to the page for which the
     *            tags are to be located.
     * @return - a {@link List} of Tags for the page.
     */
    public List<String> getTagByTitle(final String tagTitle) {
        final List<String> tagList = new ArrayList<String>();
        TagManager tagManager = null;
        tagManager = this.getResourceResolver().adaptTo(TagManager.class);
        if (null != tagManager) {
            if ((null != tagTitle) && !"".equalsIgnoreCase(tagTitle)) {
                final TagManager.FindResults result = tagManager.findByTitle(tagTitle);
                final Tag[] tags = result.tags;
                for (final Tag tag : tags) {
                    tagList.add(tag.getTagID());
                }
            }
        } else {
            throw new SystemException(JCRDataAccessor.class
                    + " has not been initialized properly. Could not get the tagManager instance");
        }
        return tagList;
    }

    /**
     * <p>
     * Finds nodes at the provided path.
     * </p>
     * 
     * @param queryBuilder
     *            - instance of query builder that will be used to create
     *            queries
     * @param predicate
     *            - instance of predicate holding the map details.
     * @return - {@link List} of hits or search results.
     */
    public List<Map<String, Object>> findNodes(final QueryBuilder queryBuilder, final Map<String, String> predicate) {
        
        String resultCount = MapUtils.getString(predicate, PAGENATION_SIZE, DEFAULT_RESULT_SIZE);
        if (Integer.valueOf(resultCount) <= 0) {
            resultCount = DEFAULT_RESULT_SIZE;
        }
        predicate.put(PAGENATION_SIZE, resultCount);

        final List<Map<String, Object>> responseList = findAllNodes(queryBuilder, predicate);
        
        return responseList;

    }
    
    /**
     * <p>
     * Finds nodes at the provided path and return entire nodes list.
     * </p>
     * 
     * @param queryBuilder
     *            - instance of query builder that will be used to create
     *            queries
     * @param predicate
     *            - instance of predicate holding the map details.
     * @return - {@link List} of hits or search results.
     */
    public List<Map<String, Object>> findAllNodes(final QueryBuilder queryBuilder, final Map<String, String> predicate) {
        List<Hit> hits = null;
        
        final Query query = queryBuilder.createQuery(PredicateGroup.create(predicate), this.getSession());
        final SearchResult result = query.getResult();
        final List<Map<String, Object>> responseList = new ArrayList<Map<String, Object>>();

        hits = result.getHits();
        if (!hits.isEmpty()) {
            for (final Hit hit : hits) {
                final Map<String, Object> nodeProperties = new HashMap<String, Object>();
                try {
                    // put all properties of the hit.
                    nodeProperties.putAll(hit.getProperties());

                    // put all properties of the node fetched in the hit.
                    nodeProperties.putAll(this.getNodeProperties(hit.getNode()));

                    // add the node path to the properties as well.
                    nodeProperties.put(PageConstants.PATH, hit.getPath());
                    nodeProperties.put("NODE_NAME", hit.getNode().getName());

                    responseList.add(nodeProperties);
                } catch (RepositoryException e) {
                    throw new SystemException("Error while getting properties for Missions:", e);
                }
            }
        }

        return responseList;

    } 
    
    /**
     * <p>
     * Finds nodes at the provided path and return results.
     * </p>
     * 
     * @param queryBuilder
     *            - instance of query builder that will be used to create
     *            queries
     * @param predicate
     *            - instance of predicate holding the map details.
     * @return - {@link SearchResult} results.
     */
    public SearchResult searchResults(final QueryBuilder queryBuilder, final Map<String, String> predicate) {       
        final Query query = queryBuilder.createQuery(PredicateGroup.create(predicate), this.getSession());
        final SearchResult result = query.getResult();
        return result;
    } 
    /**
     * <p>
     * Finds nodes at the provided path.
     * </p>
     * 
     * @param queryBuilder
     *            - instance of query builder that will be used to create
     *            queries
     * @param predicate
     *            - instance of predicate holding the map details.
     * @return - {@link List} of hits or search results.
     */
    public long searchResultCount(final QueryBuilder queryBuilder, final Map<String, String> predicate) {
        
        long count = 0;
        final String resultCount = MapUtils.getString(predicate, PAGENATION_SIZE, DEFAULT_RESULT_SIZE);
        predicate.put(PAGENATION_SIZE, resultCount);
        final Query query = queryBuilder.createQuery(PredicateGroup.create(predicate), this.getSession());
        final SearchResult result = query.getResult();
        count = result.getTotalMatches();
        return count;
    }

}
