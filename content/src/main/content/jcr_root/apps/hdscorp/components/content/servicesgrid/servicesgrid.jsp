<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.slingmodels.ServicesGridModel"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.ServicesGridModel" var="servicesGridModel" />



        <div class="services-list-section services-section clearfix">
            <div class="cs-container content-container">
                <!--Row Starts-->
				<h2>${properties.sectiontitle}</h2>


				<c:forEach var="service" items="${servicesGridModel.categories}" varStatus="loopcnt">
					<c:if test="${(loopcnt.index == 0) || (loopcnt.index mod 3 == 0)}">
						<div class="container-fluid">
					</c:if>
					 
			 				<c:set var="serviceObj" value="${service}" scope="request" /> 
							<c:set var="loopindex" value="${loopcnt.index}" scope="request" />
					
			 				<cq:include path="servicepar-${loopcnt.index}" resourceType="hdscorp/components/content/servicesgrid/servicetile" /> 
					
			 				<c:remove var="serviceObj" scope="request" />
			 				<c:remove var="loopindex" scope="request" />
			 				
				 	<c:if test="${( (loopcnt.index != 0) && (loopcnt.index mod 2 == 0)) || (loopcnt.last)}">
						</div>
					</c:if>	
				</c:forEach> 
	
	
            </div>
            <!--/.Row ends-->
        </div>
					


