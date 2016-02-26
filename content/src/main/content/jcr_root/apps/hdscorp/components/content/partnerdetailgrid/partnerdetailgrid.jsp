<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.slingmodels.ServicesGridModel"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PartnerGridModel" var="PartnerGridModel" />


<div class="services-list-section partner-section clearfix" style="background-image: url('${properties.partnergridimagepath}');">
    <div class="cs-container content-container">

                    <!--Row Starts-->
					<h2>EXPLORE OUR CURRENT PROGRAMS AND PARTNERS</h2>

				<c:forEach var="partner" items="${PartnerGridModel.categories}" varStatus="loopcnt">
					<c:if test="${(loopcnt.index == 0) || (loopcnt.index mod 3 == 0)}">
               <div class="container-fluid">

					</c:if>

			 				<c:set var="partnerObj" value="${partner}" scope="request" /> 
							<c:set var="loopindex" value="${loopcnt.index}" scope="request" />

												

			 				<cq:include path="partnerpar-${loopcnt.index}" resourceType="hdscorp/components/content/partnerdetailgrid/partnertile" /> 

			 				<c:remove var="partnerObj" scope="request" />
			 				<c:remove var="loopindex" scope="request" />

				 	<c:if test="${( (loopcnt.index != 0) && (loopcnt.index mod 2 == 0)) || (loopcnt.last)}">


					</c:if>	
        

				</c:forEach> 
	
	
           </div>

                <!--/.Row ends-->
            </div>

