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


    <c:choose>
    <c:when test="{loopCatCount.index==0}">
 <li class="noBorder active">
        </c:when>
        <c:otherwise>
   <li class="">                 
        </c:otherwise>
      </c:choose>
 <a data-href=" ${listCat.legalURL}" href="javascript:void(0);">${listCat.label}</a>

 <c:choose>
    <c:when test=" ${fn:length(listCat.listSubCat)==0}">
  <div class="MobileHolderWrapper"></div></li>
          </c:when>
     <c:otherwise>
          <ul class="" style="display: block;">
               <c:forEach var="subCat" items="${listCat.listSubCat}" varStatus="looSubCount">
                   <li class=""><a data-href="${subCat.legalURL}" class="leftsubtab" href="javascript:void(0);"> ${subCat.label}</a><div class="MobileHolderWrapper"></div></li>
             </c:forEach>
               </ul></li>
         </c:otherwise>
 </c:choose>
</c:forEach>

 </ul>
</div>



<!-- Category Content to Loaded here -->




<div id="contentCatagory" class="col-md-9">
<div class="result-product">
<div class="tab-content current" id="tab-1">
<div id="loadCatagoryContent" class="category-products-listing">
<div class="category-desc legalcontent">
  <c:if test="${not empty includeURL}">
<sling:include path="${includeURL}.html" />
</c:if>
</div></div>
</div>
</div>
</div>