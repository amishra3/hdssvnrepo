
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss"
	uri="http://www.adobe.com/consulting/acs-aem-commons/xss"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.ResourceLibraryModel"
	var="resourceLibraryModel" />

<div class="product-search-area clearfix">
                <div class="content-container">
                    <div class="container-fluid">
                       
                        <div class="col-xs-12 col-md-10 col-md-offset-1">
                            <div id="custom-search-input">
                                <div class="pr-search">
                                    <input type="text" id="searchFilter" name="searchFilter" placeholder="${properties.searchboxdeafulttext}">
                                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Container-Results container-fluid overRideRight">
                    	
                    	
                    	<c:if test="${empty properties.contentrenderingpagepath}">
                    		<c:set var="contentrenderingpagepath" value="/content/hdscorp/en_us/lookup/resourcelibraryrenderer" scope="request"/>
                    	</c:if>
                    
                    	<cq:include path="subcategoryfilterpar" resourceType="hdscorp/components/content/categoryfacets" />
                        
                        
                      
                    </div>
                </div>
            </div>