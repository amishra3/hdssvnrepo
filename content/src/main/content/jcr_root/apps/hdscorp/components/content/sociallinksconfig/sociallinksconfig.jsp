
<%@include file="/apps/foundation/global.jsp" %>
<%
%><%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %>


<c:set var="sociallinkconfig" value="${widgets:getMultiFieldPanelValues(resource, 'sociallinksconfig')}"/>

<div class="social-links">

<span>${properties.socialfollowuslabel}</span>
<c:choose>
	<c:when test="${empty sociallinkconfig}">
		<wcm:placeholder classNames="cq-dl-placeholder cq-block-placeholder"/>
	</c:when>
	<c:otherwise>
		<ul>
			<c:forEach items="${sociallinkconfig}" var="items">
			<li>
				<a href="${items.scturl}" target="${properties.socialurltargettype?'_blank':'_self'}"><img src="${items.scicon}" alt=""></a>
			</li>
			</c:forEach>
		</ul>
	</c:otherwise>
</c:choose>
</div>
