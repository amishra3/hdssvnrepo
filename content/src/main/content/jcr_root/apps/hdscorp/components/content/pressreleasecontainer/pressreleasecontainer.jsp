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
<c:set var="pageClass" value=" ispressreleasepage"/>
<c:if test="${properties.landingpagetype=='awards'}">
<c:set var="pageClass" value=" isawardspage"/>
</c:if>
<c:if test="${properties.landingpagetype=='news'}">
<c:set var="pageClass" value="isnewspage"/>
</c:if>
<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.PressReleasesContainerModel" var="model" />
<div class="pr-list">
	
	<div class="row pr-list-container ${pageClass}">
		<h1>${model.headerText}</h1>
		<c:if test="${empty properties.showhidesearch}">
            <div class="pr-search">
                <input type="text" name ="fulltext" id="fulltext" placeholder="${model.searchText}">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            </div>
		</c:if>
		<div class="col-md-3 pr-list-archives">
			<ul id="archivesLinks">
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
				
				<c:set var="filterHrefURL" value="${hdscorp:shortURL(currentPage.path)}"/>
				<c:set var="selectorHrefString" value="${hdscorp:concatString(filterUrl.filterText, '.html')}"/>
				<c:set var="filterHrefURL" value="${fn:replace(filterHrefURL,'html',selectorHrefString)}"/>
				
				
				<li class="archiveslinkLeft ${activeFilter?' active':''}">
					<a href="${filterHrefURL}" data-loadhtml="${filterUrl.filterUrl}" class="${activeFilter?' active':''}">
						${filterUrl.filterText}
						<span class="icon-accordion-closed hidden-md hidden-lg"></span>
						<span class="icon-accordion-opened hidden-md hidden-lg"></span>
					</a>
					<div class="MobileHolderWrapper"></div>
				</li>
				<c:set var="activeFilter" value="${false}"/>
				</c:forEach>
			</ul>
			<c:if test="${not empty properties.prlinktext}">
			<div class="pr-md-con-cta">
				<a class="animateLink" href="${properties.prllinkurl}" target="${properties.prtargettype?'_blank':'_self'}">${properties.prlinktext}${properties.prthirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
			</div>
			</c:if>
		</div>
		<!-- Press Release List Content to Loaded here -->
		<div id="contentCatagory">
			<div class="col-md-9 pr-archives-list" style="position:relative">
				<div id="loading"></div>
				<div class="pr-archives-list-items" id="loadPressAwrads">					
					<c:if test="${not empty includetargetURL}">
					<sling:include path="${includetargetURL}"/>					
					</c:if>	
				</div>				
				<div class="pr-load-more">
					<div class="learn-more-red-link" id="loadMorePrBtn">
						<a href="javascript:void(0);">${loadMoreLabel}</a>
					</div>
				</div>
			</div>
		</div>
     </div>
  </div>
		