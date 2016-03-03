<%--

  Training Resources component.

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<c:set var="featuredresources" value="${properties.featuredresources}" scope="request"/>
<c:set var="contenttype" value="${properties.contenttype}" scope="request"/>
<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.FeaturedResourcesModel" var="model" />

<div class="section resourceLibraryfeatered">
<c:forEach var="resource" items="${model.featuredResouceList}" varStatus="loopcnt">

            <div class="col-sm-6">
                <div class="resources-spotlight" style="background-image:url(${resource.featuredBGImage});">
                    <div class="spotlight-mobile hidden-md hidden-lg" style="background-image:url(${resource.featuredBGImage});"></div>
                    <div class="spotlight-content">
                        <div class="icon hidden-xs hidden-sm">
                            <img title="" alt="" src="${resource.featuredIconImage}">
                        </div>
                        <div class="icon hidden-md hidden-lg">
                            <img title="" alt="" src="${resource.featuredIconImage}">
                        </div>
                        <div class="type">${resource.contentType}</div>
                        <div class="spotlight-title"><a href="${resource.resourcePath}" class="animateLink">${resource.resourceTitle} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></div>
                    </div>
                </div>
            </div>
 </c:forEach>


</div>