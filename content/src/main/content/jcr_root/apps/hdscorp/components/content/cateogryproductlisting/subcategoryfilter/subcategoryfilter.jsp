<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="subcatlist" value="<%=PageUtils.convertMultiWidgetToList(properties,"subcatdisplaylabel-subcatcontenturl-subcatid")%>" />

<%
	String viewtype = "";
	String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
	if (selectorArray != null && selectorArray.length > 0) {
		viewtype = selectorArray[0];
	}
	
	pageContext.setAttribute("selectorString", viewtype);
%>
<c:if test="${empty selectorString}">
	<c:set var="activeSubCatIndex" value="0" />
</c:if>

<div class="col-md-3 category-listing">
	<ul id="asideLinks">
	
		<c:forEach var="subcat" items="${subcatlist}" varStatus="loopcnt">
			<c:set var="linkUrl" value="${subcat.subcatcontenturl}"/>
			<c:if test="${fn:startsWith(linkUrl,'/content/')}">
				<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
			</c:if>	
			<c:set var="subcatid" value="${subcat.subcatid}" />
			
			<c:if test="${empty selectorString && loopcnt.index == 0}">
				<c:set var="includeURL" value="${subcat.subcatcontenturl}" />
			</c:if>
			
			<c:if test="${selectorString== subcat.subcatid}">
				<c:set var="includeURL" value="${subcat.subcatcontenturl}" />
				<c:set var="activeSubCatIndex" value="${loopcnt.index}" />			
			</c:if>
			
			<li class="linkLeft ${loopcnt.index== activeSubCatIndex?'active':''}">
				<a href="javascript:void(0);"
					data-loadhtml="${linkUrl}"
					class="${loopcnt.index==0?'active':'dummyclass'}"> 
						${subcat.subcatdisplaylabel}
						<span class="icon-accordion-closed hidden-md hidden-lg"
						style="display: none;"></span> 
						<span class="icon-accordion-opened hidden-md hidden-lg"
						style="display: inline-block;"></span>
				</a>			
			
				<div class="MobileHolderWrapper"></div>
			</li>
		
		</c:forEach>	
			
	</ul>
	
</div>

<!-- Category Content to Loaded here -->
<div class="col-md-9 category-products">
	<div id="contentCatagory">
		<c:if test="${not empty includeURL}">
			<sling:include path="${includeURL}.html" />
		</c:if>
	</div>
</div>
