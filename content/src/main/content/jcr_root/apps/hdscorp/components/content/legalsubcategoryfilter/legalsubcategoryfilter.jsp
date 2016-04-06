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
	<c:set var="activeMainCatIndex" value="0" />
	<c:set var="activeSubCatIndex" value="0" />
	<c:set var="activeSubCatId" value="" />
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
								<c:set var="activeMainCatIndex" value="${loopCatCount.index}" />			
							</c:if>
						<li>
							 <a data-href="${listCat.legalURL}.html" href="javascript:void(0);">${listCat.label}
                            <span class="icon-accordion-closed"></span> 
                                <span class="icon-accordion-opened"></span></a>


							 <c:if test="${fn:length(listCat.listSubCat)!=0}">					
							  <ul>
							   <c:forEach var="subCat" items="${listCat.listSubCat}" varStatus="looSubCount">
								   <c:if test="${selectorString== subCat.subCatId}">
										<c:set var="includeURL" value="${subCat.legalURL}" />
										<c:set var="activeSubCatIndex" value="${looSubCount.index}" />
										<c:set var="activeMainCatIndex" value="${loopCatCount.index}" />
										<c:set var="activeSubCatId" value="${subCat.subCatId}" />			
									</c:if>
							   
								   <li>
                                       <div class="checkbox">
										<input type="radio" value="${subCat.legalURL}.html" id="${subCat.subCatId}" name="cbxFunction" class="filters">
											<label class="hds-icon" for="${subCat.subCatId}"><span>${subCat.label}</span></label>
										</div>

                                       </li>
							 </c:forEach>
							   </ul>
						  </c:if>
						  <% 
								String currentPageShortUrl = (String)pageContext.getAttribute("currentPageShortUrl");
								String currentCategoryID = (String)pageContext.getAttribute("subcatid");
								pageContext.setAttribute("currentCategoryUrl", currentPageShortUrl.replace(".html", "."+currentCategoryID+".html"));
								System.out.println((String)pageContext.getAttribute("includeURL"));
						  %>
						  
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
				                    <sling:include path="${includeURL}.html" />
				                </c:if>
							</div>
						</div>					
					</div>
				</div>
			</div>
		</div>
</div>

<script type="text/javascript">
	var activeMainCat = "<%=pageContext.getAttribute("activeMainCatIndex")%>" ;
	var activeSubCat = "<%=pageContext.getAttribute("activeSubCatIndex")%>" ;
	var activeSubCatID = "<%=pageContext.getAttribute("activeSubCatId")%>" ;
</script>
