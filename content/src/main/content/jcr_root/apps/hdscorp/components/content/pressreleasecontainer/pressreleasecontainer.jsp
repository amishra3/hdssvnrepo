<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="noOfYears" value="${properties.noOfYears}" scope="request"/>
<c:set var="headerText" value="${properties.headerText}" scope="request"/>
<c:set var="searchText" value="${properties.searchText}" scope="request"/>
<c:set var="loadMoreLabel" value="${properties.loadMoreLabel}" scope="request"/>
<c:set var="archiveLabel" value="${properties.archiveLabel}" scope="request"/>
<c:set var="searchPagePath" value="${properties.searchPagePath}" scope="request"/>

<sling:adaptTo adaptable="${slingRequest}"
	adaptTo="com.hdscorp.cms.slingmodels.PressReleasesContainerModel" var="model" />

<div class="pr-list">       
				<div id="loading"></div>             
                <div class="row pr-list-container">
                    <h2>${model.headerText}</h2>
                    <div class="pr-search">
                        <input type="text" name ="fulltext" id="fulltext" placeholder="${model.searchText}">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </div>
                    <div class="col-md-3 pr-list-archives">
                        <ul id="asideLinks">
                        <c:forEach var="filterUrl" items="${model.filterUrls}" varStatus="loopcnt">
                            <li class="linkLeft">
                                <a href="javascript:void(0);" data-loadhtml="${filterUrl.filterUrl}">
                                ${filterUrl.filterText}
                                <span class="icon-accordion-closed hidden-md hidden-lg"></span>
                                <span class="icon-accordion-opened hidden-md hidden-lg"></span>
                                </a>
                                <div class="MobileHolderWrapper"></div>
                            </li>
                            </c:forEach>
                          </ul>
                    </div>
                    <!-- Press Release List Content to Loaded here -->
                    <div id="contentCatagory"></div>
                </div>
            </div>






