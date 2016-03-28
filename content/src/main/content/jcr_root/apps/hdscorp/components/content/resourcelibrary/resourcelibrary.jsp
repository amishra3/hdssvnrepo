
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss"
	uri="http://www.adobe.com/consulting/acs-aem-commons/xss"%>

<c:set var="contentrenderingpagepath" value="${properties.contentrenderingpagepath}" scope="request"/>
<c:set var="featuredlabel" value="${properties.featuredlabel}" scope="request"/>
<c:set var="featuredoverlaypath" value="${properties.featuredoverlaypath}" scope="request"/>
<c:set var="isResourceLibraryPage" value="true" scope="request"/>
<script>
var pageSize = <%=properties.get("pagesize","10")%>;
</script>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.ResourceLibraryModel" var="model" />
    
           <div class="" id="sectionResourceLib">
            <div class="res-filters-search clearfix">
                <div class="content-container clearfix">
                    <div class="col-sm-7 hidden-xs hidden-sm" id="resource-search">
<div class="resource-search">
                        <input type="text" name="resSearch" id="resSearch" placeholder="Search All Resources">
                        <span class="remove glyphicon glyphicon-remove glyphicon-white clearSearchIcon"></span>
                        <span class="glyphicon glyphicon-search searchResource" aria-hidden="true"></span>
                        </div>
                        <div class="errorSearchField alert alert-danger fade in">Please enter search query</div>
                    </div>
                    <div class="hidden-md hidden-lg col-xs-12 search-overlay">
                        <div class="launchLink"> 
                            <a href="javascript:void(0);">${properties.searchboxmessagetext} <span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>
                        </div>
                    </div>
                    <div class="col-sm-5 resource-filters hidden-xs hidden-sm">
                        <a class="filterby" href="javascript:void(0);" data-refilter="FilterByIndustry">
                            <span class="title">${properties.filterbyindustrylabel}</span>
                            <span class="caret-arrow"></span>
                        </a>
                        <a class="filterby" href="javascript:void(0);" data-refilter="FilteyContentType">
                            <span class="title">${properties.filterbycontentlabel}</span>
                            <span class="caret-arrow"></span>
                        </a>
                    </div>
                </div>
                <div class="content-container clearfix filters-section less" id="FilterByIndustry">
                    <div class="col-sm-9 filters-list col-sm-offset-3">
                        <ul class="FilterByIndustryList">
                            <c:forEach items="${model.filterByIndustry}" var="data" varStatus="status">
                            
                             <c:set var="industrytag" value="${xss:encodeForHTML(xssAPI, data['industrytag'])}"/>
                             <c:set var="industrytag" value="${hdscorp:removeDoubleQuotes(industrytag)}"/>
                            
                            <li class="col-xs-4"><div class="checkbox">
                                <input class="filters" type="checkbox" name="ctyFunction"  id="${xss:filterHTML(xssAPI,data['industryid'])}" value="${fn:replace(fn:replace(industrytag,'[', ''),']', '')}">
                                <label for="${xss:filterHTML(xssAPI,data['industryid'])}" class="hds-icon"><span>${xss:filterHTML(xssAPI,data['industrylabel'])}</span></label>
                            </div></li>
                       </c:forEach>
                           
                        </ul>
                        <div class="clearfix"></div>
                        <div class="show-results hidden-sm hidden-xs">
                            <div class="btn-square-red">
                                <a href="javascript:void(0);" target="_self" id="showIndustry">${properties.showresultslabel}</a>
                            </div>
                        </div>
                    </div>
                </div>
				<!-- Mobile Placeholders -->
                <!-- The dark background -->
            <div class="bgCover">
				<div class="overlayBox hidden-md hidden-lg">
					<div class="heading">
						<h3>${properties.searchlabel}</h3>
						<div class="close-search">
							<a href="javascript:void(0);" title="Close" class="closeOverlay">close</a>
						</div>

					</div>
					<div class="searchArea"></div>
					<div class="filtrSideBar"></div>
					<div class="topFilter">
						<h4>${properties.filterbyindustrylabel}</h4>
						<div class="FilterAreaIndustry"></div>
						<h4 class="last">${properties.filterbycontentlabel}</h4>
						<div class="FilterAreaContent"></div>
					</div>
					<div class="FilterAreaBtnPop">
					<div class="clearfix"></div>
							<div class="show-results">
								<div class="btn-square-red">
									<a href="javascript:void(0);" target="_self" id="showIndustry">${properties.showresultslabel}</a>
								</div>
							</div>
						<div class="clearfix"></div>
					<div class="clear-results">
						<div class="btn-square-red">
							<a href="#" target="_self">${properties.clearallfilterslabel}</a>
						</div>
					</div>
					</div>
				</div>
			</div>
            
             <!-- Mobile Placeholders -->
                 <div class="content-container clearfix filters-section less" id="FilteyContentType">
                    <div class="col-sm-9 filters-list col-sm-offset-3">
                        <ul class="FilterByContentList">
                            <c:forEach items="${model.filterByContentType}" var="data" varStatus="status">
                            <c:set var="contenttag" value="${xss:encodeForHTML(xssAPI, data['contenttag'])}"/>
                             <c:set var="contenttag" value="${hdscorp:removeDoubleQuotes(contenttag)}"/>
                            <li class="col-xs-4"><div class="checkbox">
                                <input class="filters" type="checkbox" name="ctyFunction"  id="${xss:filterHTML(xssAPI,data['contentid'])}" value="${fn:replace(fn:replace(contenttag,'[', ''),']', '')}">
                                <label for="${xss:filterHTML(xssAPI,data['contentid'])}" class="hds-icon"><span>${xss:filterHTML(xssAPI,data['contentlabel'])}</span></label>
                            </div></li>
                          </c:forEach> 
                            
                        </ul>
                        <div class="clearfix"></div>
                        <div class="show-results hidden-sm hidden-xs">
                            <div class="btn-square-red">
                                <a href="javascript:void(0);" target="_self" id="showContentType">${properties.showresultslabel}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-container clearfix">
                    <div class="col-md-12 col-xs-12 tagList">
                        <div class="groupedby" id="searchTag">
                            <div class="label">${properties.searchbylabel} </div>
                            <div class="keyword"></div>
                        </div>
                        <div class="groupedby" id="filterTag">
                            <div class="label">${properties.filterbylabel}: </div>
                            <div class="keyword-subcat"></div>
                            <div class="keyword-filter"></div>
                        </div>                        
                    </div>
                </div>
            </div>
            <div class="resources-results content-container container-fluid clearfix">
                <div class="col-md-3 asideWrapper hidden-xs hidden-sm" id="mobilerightMenu">
                   <c:if test="${empty properties.contentrenderingpagepath}">
                    		<c:set var="contentrenderingpagepath" value="/content/hdscorp/en_us/lookup/resourcelibraryrenderer" scope="request"/>
                    	</c:if>
                        <c:if test="${empty properties.featuredoverlaypath}">
                    		<c:set var="featuredoverlaypath" value="/content/hdscorp/en_us/lookup/resourcelibraryrenderer" scope="request"/>
                    	</c:if>
                    	<cq:include path="subcategoryfilterpar" resourceType="hdscorp/components/content/categoryfacets" />
                <div class="clearfix"></div>
                <div class="clear-results hidden-sm hidden-xs">
                    <div class="btn-square-red">
                        <a href="javascript:void(0);" target="_self">${properties.clearallfilterslabel}</a>
                    </div>
                </div>
            </div>
            <div class="col-md-9 col-xs-12" id="contentResourceLibrary">
                <div class="result-resources">
                    <div id="loading" style="display: none;"></div>
                    <div class="resource-heading">
                        <h2>${properties.featuredlabel}</h2>
                    </div>
                    <div class="spolightresults" style="position:relative">
                        <div class="res-spotlight-group clearfix" id="featuredCards">
                        	<c:set var="includeFeaturedtargetURL" value="${requestScope['includeFeaturedtargetURL']}" />
                            <c:if test="${not empty includeFeaturedtargetURL}">
                            	<sling:include path="${includeFeaturedtargetURL}" />
							</c:if>                                                                                   
                        </div>
                        <div class="category-resources-listing">
                            <div class="section prodnsolcategorycontent" id="prodnsolcategorycontent">
                            	<c:set var="includetargetURL" value="${requestScope['includetargetURL']}" />
                            	<c:if test="${not empty includetargetURL}">
                            		<div class="slingcontent">
                                		<sling:include path="${includetargetURL}" />
                                	</div>
                                 </c:if>                            
                                                            
                            </div>
                            <div id="loadResourceContent">
                            </div>
                        </div>
                    </div>
                    <!--/.Product Tiles and resource detail-->
                </div>
            </div>
        </div>
    </div>