<%@page session="false" %>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.slingmodels.ServicesGridModel"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PartnerGridModel" var="PartnerGridModel" />

<div class="services-list-section partner-section clearfix" style="background-image: url('${properties.partnergridimagepath}');">
    <div class="cs-container content-container">
		<c:set var="seealllinklabel" value="${properties.seealllinklabel}" scope="request" />
        <!--Row Starts-->
        <h2>${properties.pdgsectiontitle}</h2>
        <div class="row-centered">
            <c:forEach var="partner" items="${PartnerGridModel.categories}" varStatus="loopcnt">
                <c:set var="partnerObj" value="${partner}" scope="request" /> 
                <c:set var="loopindex" value="${loopcnt.index}" scope="request" />									

                <cq:include path="partnerpar-${loopcnt.index}" resourceType="hdscorp/components/content/partnerdetailgrid/partnertile" /> 

                <c:remove var="partnerObj" scope="request" />
                <c:remove var="loopindex" scope="request" />                
            </c:forEach> 
        </div>
        
    </div>
    

    <!--/.Row ends-->
</div>

