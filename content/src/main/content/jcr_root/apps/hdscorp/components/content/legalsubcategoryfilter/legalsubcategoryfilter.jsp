<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.LegalSubCategoryModel" var="legalSubCategoryModel" />
<%
	String viewtype = "";
	String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
	if (selectorArray != null && selectorArray.length > 0) {
		viewtype = selectorArray[0];
	}

	pageContext.setAttribute("selectorString", viewtype);
	
	pageContext.setAttribute("currentPageShortUrl", PathResolver.getShortURLPath(currentPage.getPath()));
%>

<c:if test="${empty selectorString}">
	<c:set var="activeSubCatIndex" value="0" />
</c:if>
<div class="legal-content-area clearfix">
<div class="content-container">
	<div id="legal" class="Container-legal-terms container-fluid overRideRight">
         <h2>${properties.cateogrylabel}</h2>
				<div class="col-md-3 leftsidelisting">
				<ul id="asideLinks-product">
				<c:forEach var="listCat" items="${legalSubCategoryModel.legalcategories}" varStatus="loopCatCount">
					<c:set var="linkUrl" value="${listCat.legalURL}"/>
							<c:if test="${fn:startsWith(linkUrl,'/content/')}">
								<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
							</c:if>	
							
							<c:set var="subcatid" value="${listCat.subCatId}" />
							
							<c:if test="${empty selectorString && loopCatCount.index == 0}">
								<c:set var="includeURL" value="${listCat.legalURL}" />
							</c:if>

							<c:if test="${selectorString== listCat.subCatId}">
								<c:set var="includeURL" value="${listCat.legalURL}" />
								<c:set var="activeSubCatIndex" value="${loopCatCount.index}" />			
							</c:if>
							 <% 
								String currentPageShortUrl = (String)pageContext.getAttribute("currentPageShortUrl");
								String currentCategoryID = (String)pageContext.getAttribute("subcatid");
								pageContext.setAttribute("currentCategoryUrl", currentPageShortUrl.replace(".html", "."+currentCategoryID+".html"));
								
							%>
						<li>
							 <a data-href="${listCat.legalURL}.html" href="javascript:void(0);">${listCat.label}
                            <span class="icon-accordion-closed"></span> 
                                <span class="icon-accordion-opened"></span></a>


							 <c:if test="${fn:length(listCat.listSubCat)!=0}">					
							  <ul>
							   <c:forEach var="subCat" items="${listCat.listSubCat}" varStatus="looSubCount">
								   <li>
                                       <div class="checkbox">
										<input type="radio" value="${subCat.legalURL}.html" id="${subCat.label}" name="cbxFunction" class="filters">
											<label class="hds-icon" for="${subCat.label}"><span>${subCat.label}</span></label>
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

				<!-- Legal Content to Loaded here -->
				<div id="legalContentCatagory" class="col-md-9">
					<div class="result-legal_pages">				
						<div id="loading" style="display: none;"></div>
						<div id="loadCatagoryContent" class="category-products-listing">
							<div class="leagaltext section">
				                <c:if test="${not empty includeURL}">
<%-- 				                    <sling:include path="${includeURL}.html" /> --%>
				                </c:if>
							</div>
						</div>					
					</div>
				</div>
			</div>
		</div>
</div>