<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.ViewHelperUtil"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="noOfYears" value="${properties.noOfYears}" scope="request"/>
<c:set var="headerText" value="${properties.headerText}" scope="request"/>
<c:set var="searchText" value="${properties.searchText}" scope="request"/>
<c:set var="loadMoreLabel" value="${properties.loadMoreLabel}" scope="request"/>
<c:set var="archiveLabel" value="${properties.archiveLabel}" scope="request"/>
<c:set var="searchPagePath" value="${properties.searchPagePath}" scope="request"/>
<c:set var="selectorString" value="${slingRequest.requestPathInfo.selectors[0]}"/>




<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.PressReleasesContainerModel" var="model" />

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
	                        	<c:if test="${filterUrl.filterText eq selectorString}">
	                        		<c:set var="activeFilter" value="${true}"/>
	                        		<c:set var="includetargetURL" value="${filterUrl.fullFilterUrl}.html"/>
	                        	</c:if>
	                        	
	                        	<c:if test="${empty selectorString and loopcnt.index==0}">
	                        		<c:set var="activeFilter" value="${true}"/>
	                        		<c:set var="includetargetURL" value="${filterUrl.fullFilterUrl}.html"/>	                        	
	                        	</c:if>
	                        	
	                        	<c:if test="${not empty selectorString and selectorString==(fn:toLowerCase(archiveLabel)) and loopcnt.last}">
	                        		<c:set var="activeFilter" value="${true}"/>
	                        		<c:set var="includetargetURL" value="${filterUrl.fullFilterUrl}.html"/>	                        	
	                        	</c:if>
	                        	
	                        	
	                            <li class="linkLeft ${activeFilter?' active':''}">
	                                <a href="${filterUrl.filterUrl}" data-loadhtml="${filterUrl.filterUrl}" class="${activeFilter?' active':''}">
	                                ${filterUrl.filterText}
	                                <span class="icon-accordion-closed hidden-md hidden-lg"></span>
	                                <span class="icon-accordion-opened hidden-md hidden-lg"></span>
	                                </a>
	                                <div class="MobileHolderWrapper"></div>
	                            </li>
	                            <c:set var="activeFilter" value="${false}"/>
                            </c:forEach>
                          </ul>
                    </div>
                    <!-- Press Release List Content to Loaded here -->

                    <div id="contentCatagory">
                        <c:if test="${not empty includetargetURL}">
							<sling:include path="${includetargetURL}"/>
                            	
						</c:if>



                    </div>
                </div>
            </div>






