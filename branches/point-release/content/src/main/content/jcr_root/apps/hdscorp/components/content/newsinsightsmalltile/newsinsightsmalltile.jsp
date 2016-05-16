<%--

  News and Insight Small Tile component.

--%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsInsightSmallTileModel" var="newInsightSmallTitle" />

<div>
    Icon Image Path: ${newInsightSmallTitle.iconImagePath}<br>
    <img src="${newInsightSmallTitle.iconImagePath}" /> <br>
     Icon Image Title : ${newInsightSmallTitle.iconImageTitle}<br>
     Content: ${newInsightSmallTitle.content}<br>

   <c:choose> 
  <c:when test="${newInsightSmallTitle.openNewTab == 'true'}">
		<a href="${newInsightSmallTitle.readMoreLink}" target="_blank">${newInsightSmallTitle.readMoreLabel}</a>
     </c:when>
  <c:otherwise>
 <a href="${newInsightSmallTitle.readMoreLink}">${newInsightSmallTitle.readMoreLabel}</a>
  </c:otherwise>
</c:choose>


</div>