<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="locations" value="<%=PageUtils.convertMultiWidgetToList(properties,"locationtitle-locationaddress-phone")%>" />
<c:set var="title" value="<%=properties.get("title")%>" />
<c:if test = "${not empty properties.sectionbackground}">
 <c:set var="imgval" value="background-image: url(${properties.sectionbackground})" />
</c:if>
<c:choose>
<c:when test="${not empty locations}">
  <div class="services-section clearfix" style="${imgval}">
  <div class="content-container">
    <div class="container-fluid">
      <!--Row Starts-->
      <h2>${title}</h2>
      <div class="row-centered">
      <c:forEach var="location" items="${locations}">
        <div class="col-sm-4 col-centered">
          <div class="section-service-col tile">
            <h4 class="headline">${location.locationtitle}</h4>
             ${location.locationaddress}
            <p>${location.phone}</p>
            
          </div>
        </div>
        </c:forEach>
      </div>
    </div>
  </div>
  <!--/.Row ends-->
</div>
</c:when>
<c:otherwise>
	<wcmmode:edit>
		<p>
			<span class="cq-text-placeholder-ipe">Configure Locations Information Component</span>
		</p>
	</wcmmode:edit>
</c:otherwise>
</c:choose>


