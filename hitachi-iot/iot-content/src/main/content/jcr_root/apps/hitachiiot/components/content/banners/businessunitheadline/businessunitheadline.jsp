<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="iconsinfo" value="<%=PageUtils.convertMultiWidgetToList(properties,"iconurl-icontitle")%>" />
<c:set var="title" value="<%=properties.get("title")%>" />
<c:if test = "${not empty properties.backgroundimage}">
 <c:set var="imgval" value="background-image: url(${properties.backgroundimage})" />
</c:if>
<c:choose>
<c:when test="${not empty title}">
  
<div class="internal-business-units" style="${imgval}">
	<div class="content-container clearfix">
		<div class="col-lg-9">
			<h2>${title}</h2>
			<p>${properties.subtitle}</p>
			<div class="col-sm-4">
				<ul>
				<c:forEach var="iconinfo" items="${iconsinfo}">
					<li><span class="internal-business-unit-icon"><img src="${iconinfo.iconurl}" /></span>${iconinfo.icontitle}</li>
					</c:forEach>
							</ul>
			</div>
		</div>
	</div>
</div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Business Unit Headline Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>
