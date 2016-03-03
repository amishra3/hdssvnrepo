
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss"
	uri="http://www.adobe.com/consulting/acs-aem-commons/xss"%>

<c:set var="contentrenderingpagepath" value="${properties.contentrenderingpagepath}" scope="request"/>
<c:set var="featuredlabel" value="${properties.featuredlabel}" scope="request"/>
<c:set var="featuredoverlaypath" value="${properties.featuredoverlaypath}" scope="request"/>
<c:set var="isResourceLibraryPage" value="true" scope="request"/>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.ResourceLibraryModel" var="model" />
    
        <div class="" id="sectionResourceLib">
            <div class="res-filters-search clearfix">
                <div class="content-container clearfix">
                    <div class="col-sm-7 resource-search">
                        <input type="text" name="resSearch" id="resSearch" placeholder="${properties.searchboxmessagetext}">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </div>
                    <div class="col-sm-5 resource-filters">
                        <a class="filterby active" href="javascript:void(0);" data-refilter="FilterByIndustry">
                            <span class="title">${properties.filterbyindustrylabel}</span>
                            <span class="caret-down"></span>
                        </a>
                        <a class="filterby active" href="javascript:void(0);" data-refilter="FilteyContentType">
                            <span class="title">${properties.filterbycontentlabel}</span>
                            <span class="caret-up"></span>
                        </a>
                    </div>
                </div>
                <div class="content-container clearfix filters-section less" id="FilterByIndustry">
                    <div class="col-sm-9 filters-list col-sm-offset-3">
                        <ul class="FilterByIndustryList">
                        <c:forEach items="${model.filterByIndustry}" var="data" varStatus="status">
                            <li class="col-xs-4"><div class="checkbox">
                                <input class="filters" type="checkbox" name="cbxFunction"  id="${xss:filterHTML(xssAPI,data['industryid'])}" value="${xss:filterHTML(xssAPI,data['industrytag'])}">
                                <label for="${xss:filterHTML(xssAPI,data['industryid'])}" class="hds-icon"><span>${xss:filterHTML(xssAPI,data['industrylabel'])}</span></label>
                            </div></li>
                       </c:forEach>     
                        </ul>
                        <div class="clearfix"></div>
                        <div class="show-results">
                            <div class="btn-square-red">
                                <a href="javascript:void(0);" target="_self" id="showIndustry">${properties.showresultslabel}</a>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="content-container clearfix filters-section less" id="FilteyContentType">
                    <div class="col-sm-9 filters-list col-sm-offset-3">
                        <ul>
                           <c:forEach items="${model.filterByContentType}" var="data" varStatus="status">
                            <li class="col-xs-4"><div class="checkbox">
                                <input class="filters" type="checkbox" name="cbxFunction"  id="${xss:filterHTML(xssAPI,data['contentid'])}" value="${xss:filterHTML(xssAPI,data['contenttag'])}">
                                <label for="${xss:filterHTML(xssAPI,data['contentid'])}" class="hds-icon"><span>${xss:filterHTML(xssAPI,data['contentlabel'])}</span></label>
                            </div></li>
                       </c:forEach>    
                            
                        </ul>
                        <div class="clearfix"></div>
                        <div class="show-results">
                            <div class="btn-square-red">
                                <a href="javascript:void(0);" target="_self">${properties.showresultslabel}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-container clearfix">
                    <div class="col-md-12">
                        <div class="groupedby">${properties.searchbylabel}</div>
                        <div class="groupedby">${properties.filterbylabel}</div>
                    </div>
                </div>
            </div>
            <div class="resources-results content-container overRideRight clearfix">
                <div class="col-md-3 asideWrapper">
                
                <c:if test="${empty properties.contentrenderingpagepath}">
                    		<c:set var="contentrenderingpagepath" value="/content/hdscorp/en_us/lookup/resourcelibraryrenderer" scope="request"/>
                    	</c:if>
                        <c:if test="${empty properties.featuredoverlaypath}">
                    		<c:set var="featuredoverlaypath" value="/content/hdscorp/en_us/lookup/resourcelibraryrenderer" scope="request"/>
                    	</c:if>
                    	<cq:include path="subcategoryfilterpar" resourceType="hdscorp/components/content/categoryfacets" />
                
                <div class="clearfix"></div>
                <div class="clear-results">
                    <div class="btn-square-red">
                        <a href="#" target="_self">${properties.clearallfilterslabel}</a>
                    </div>
                </div>
            </div>
            <div class="col-md-9" id="contentResourceLibrary">
                <div class="result-resources">
                    <div class="resource-heading hidden-xs hidden-sm">
                        <h2>Featured</h2>
                    </div>
           
                    <!--/.Product Tiles and resource detail-->
                </div>
            </div>
        </div>
    </div>
























