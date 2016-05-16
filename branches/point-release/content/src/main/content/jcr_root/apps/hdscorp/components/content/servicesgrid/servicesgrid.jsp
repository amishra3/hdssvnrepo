<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.slingmodels.ServicesGridModel"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.ServicesGridModel" var="servicesGridModel" />


<div class="services-list-section services-section service-insights-section clearfix">
    <div class="cs-container content-container">
      <div class="container-fluid">
          <c:set var="seealllinklabel" value="${properties.seealllinklabel}" scope="request" />
        <!--Row Starts-->
        <h2>${properties.sectiontitle}</h2>
        <div class="row-centered">
            <c:forEach var="service" items="${servicesGridModel.categories}" varStatus="loopcnt">
                <c:set var="serviceObj" value="${service}" scope="request" /> 
				<c:set var="loopindex" value="${loopcnt.index}" scope="request" />								

                <cq:include path="servicepar-${loopcnt.index}" resourceType="hdscorp/components/content/servicesgrid/servicetile" /> 
					
			 				<c:remove var="serviceObj" scope="request" />
			 				<c:remove var="loopindex" scope="request" />            
            </c:forEach> 
        </div>
       </div> 
    </div>
    

    <!--/.Row ends-->
</div>