
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss"
	uri="http://www.adobe.com/consulting/acs-aem-commons/xss"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.ResourceListeningAndFilterModel"
	var="resourceLibraryModel" />

ResourceListening And Filtering
<br>
<br>

<h1>
	<b>Search Box Field Values</b>
</h1>

Result Message :${resourceLibraryModel.resultsMessage}
<br>
Search TextBox Message Text:${resourceLibraryModel.searchTextboxMessageText}
<c:choose>

	<c:when test="${empty resourceLibraryModel.resourceLocations}">
		<wcm:placeholder classNames="cq-dl-placeholder cq-block-placeholder" />
	</c:when>

	<c:otherwise>
		<dl>
			<c:forEach items="${resourceLibraryModel.resourceLocations}" var="resourcelocations">
                ResourceLocations:  ${resourcelocations}<br>

			</c:forEach>
		</dl>
	</c:otherwise>

</c:choose>
</p>
<br>
<br>
<br>
<br>
<h1>
	<b>Left Navigation Field Values</b>
</h1>


Featured Label :${resourceLibraryModel.featuredLabel}
<br>
Featured OverLayPath :${resourceLibraryModel.featuredOverlayPath}
<br>

<c:forEach items="${resourceLibraryModel.categories}" var="data" varStatus="status">

	<br> Category Title : ${xss:filterHTML(xssAPI,data['category-title'])}

                             <br>Category Tags :  ${xss:filterHTML(xssAPI,data['category-tag'])}<br>

	<br>
	<c:forEach items="${data['sub-category']}" var="subCategoryData"
		varStatus="counter"> 


                                        <br>     Sub Category Title :  ${xss:filterHTML(xssAPI,subCategoryData['sub-category-title'])}

                                     <br>    Sub Category Tags :  ${xss:filterHTML(xssAPI,subCategoryData['sub-category-tag'])}

                               </c:forEach>

</c:forEach>

<br>
Clear All Filters Label :${resourceLibraryModel.clearAllFiltersLabel}
<br>

<br>
<br>
<br>
<br>
<h1>Get Filter By Industry Field Values</h1>
Get Filter By Industry Label:${resourceLibraryModel.filterByIndustryLabel}
<br>

<c:forEach items="${resourceLibraryModel.labelAndTags}" var="industrydata"
	varStatus="status">

	<br> Idustry Label : ${xss:filterHTML(xssAPI,industrydata['industrylabel'])}

                             <br>Industry Tags :  ${xss:filterHTML(xssAPI,industrydata['industrytag'])}<br>



</c:forEach>
<br>
<br>
<br>
<br>
<h1>Resource By Region Field Values</h1>
Resource By Region Label:${resourceLibraryModel.resourceRegionbyLabel}
<br>
<c:forEach items="${resourceLibraryModel.filterByContentType}" var="contentdata"
	varStatus="status">

	<br> Content Label : ${xss:filterHTML(xssAPI,contentdata['contentlabel'])}

                             <br>Content Tags :  ${xss:filterHTML(xssAPI,contentdata['contenttag'])}<br>
</c:forEach>
