<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.slingmodels.CategoryFacetsModel"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.CategoryFacetsModel" var="model" />

<%
	String viewtype = "";
	String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
	if (selectorArray != null && selectorArray.length > 0) {
		viewtype = selectorArray[0];
	}
	
	pageContext.setAttribute("selectorString", viewtype);
	
	pageContext.setAttribute("currentPageShortUrl", PathResolver.getShortURLPath(currentPage.getPath()));
	
	
%>

<c:set var="contentrenderingpagepath" value="${requestScope['contentrenderingpagepath']}" />

<c:set var="allfilteractiveclass" value="" />

<c:if test="${properties.allCategoriesid==selectorString || empty selectorString}">
	<c:set var="allfilteractiveclass" value="active" />
	<c:set var="includetargetURL" value="${contentrenderingpagepath}.html" scope="request"/>
</c:if>

		<c:choose>
		    <c:when test="${isResourceLibraryPage}">
		    <c:set var="includetargetURL" value="${featuredoverlaypath}.html" scope="request"/>
		    <div class="resources-listing">
			<ul id="asideLinks-product">
		       <li class="${allfilteractiveclass}"><a href="${currentPageShortUrl}" featured-href="${featuredoverlaypath}.html" data-href=""> ${featuredlabel} </a></li>
		       </c:when>
		    
		    <c:otherwise>
		    <div class="col-md-3 product-listing">
			<ul id="asideLinks-product">
		       <li class="${allfilteractiveclass}"><a href="${currentPageShortUrl}" data-href="${contentrenderingpagepath}.html"> ${properties.allCategoriesLabel} </a></li>
		    </c:otherwise>
		</c:choose>

		<c:forEach items="${model.categories}" var="data" varStatus="status">

				<c:set var="categorytags" value="${data['category-tag']}"/>
				<c:set var="categoryTargetURL" value="${contentrenderingpagepath}.${fn:replace(categorytags, '/', '^')}.html"/>
				<c:set var="categoryTargetURL" value="${fn:replace(categoryTargetURL, ':', '~')}"/>
				<c:set var="categoryTargetURL" value="${fn:replace(categoryTargetURL, '\"', '')}"/>
				<c:set var="categoryFeaturedOverlayPath" value="" />
		        <c:if test="${not empty data['featuredoverlaypath']}">
					<c:set var="categoryFeaturedOverlayPath" value="${xss:filterHTML(xssAPI,data['featuredoverlaypath'])}.html" />
				</c:if>
				
				<c:set var="activeclass" value=" "/>
				<c:if test="${selectorString==data['category-id']}">
					<c:set var="includetargetURL" value="${categoryTargetURL}" scope="request"/>
					<c:set var="includeFeaturedtargetURL" value="${categoryFeaturedOverlayPath}" scope="request"/>
					<c:set var="activeclass" value=" class='active'"/>
				</c:if>
		

				<li ${activeclass}>
				
				<c:set var="currentCategoryID" value="${xss:filterHTML(xssAPI,data['category-id'])}"/>
				
				
				<% 
				String currentPageShortUrl = (String)pageContext.getAttribute("currentPageShortUrl");
				String currentCategoryID = (String)pageContext.getAttribute("currentCategoryID");
				pageContext.setAttribute("currentCategoryUrl", currentPageShortUrl.replace(".html", "."+currentCategoryID+".html"));
				%>
					
					<a href="${currentCategoryUrl}#${currentCategoryID}" featured-href="${categoryFeaturedOverlayPath}" data-href="${categoryTargetURL}" x-cq-linkchecker="valid" id="${currentCategoryID}" name="${currentCategoryID}">
							${xss:filterHTML(xssAPI,data['display-title'])} 
							<span class="icon-accordion-closed"></span> 
							<span class="icon-accordion-opened"></span>
					</a>
				    <c:if test="${selectorString== xss:filterHTML(xssAPI,data['category-id'])}">
						<c:set var="includeURL" value="${subcat.subcatcontenturl}" />
						<c:set var="activeSubCatIndex" value="${status.index}" />			
					</c:if>
					
					<c:if test="${not empty data['sub-category']}">
						<ul>
							<c:forEach items="${data['sub-category']}" var="subCategoryData" varStatus="counter">
							<li>
								<div class="checkbox">
									<input class="filters" type="checkbox" name="cbxFunction"
										id="${xss:filterHTML(xssAPI,subCategoryData['sub-category-ID'])}"
										value="${xss:filterHTML(xssAPI,subCategoryData['sub-category-tag'])}">
									
									<label for="${xss:filterHTML(xssAPI,subCategoryData['sub-category-ID'])}" class="hds-icon"><span>${xss:filterHTML(xssAPI,subCategoryData['sub-category-title'])}</span></label>
								</div>
							</li>
		
							</c:forEach>
						</ul>
					</c:if>
					<div class="MobileHolderWrapper"></div>
				</li>
		</c:forEach>

	</ul>
</div>

