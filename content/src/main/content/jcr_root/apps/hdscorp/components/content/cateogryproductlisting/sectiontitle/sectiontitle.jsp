<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<a name="categorycontent" style="display: none;"></a> 												
<c:if test="${not empty properties.sectiontitle}">
    <h2 class="hidden-xs hidden-sm">${properties.sectiontitle}</h2>
</c:if>
