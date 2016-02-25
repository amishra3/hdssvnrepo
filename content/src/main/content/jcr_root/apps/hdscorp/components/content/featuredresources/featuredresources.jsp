<%--

  Training Resources component.

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.FeaturedResourcesModel" var="model" />


<c:forEach var="resource" items="${model.featuredResouceList}" varStatus="loopcnt">

<div class="category-resources-listing">
                    <div class="section prodnsolcategorycontent">
                        <div class="resource">
                            <div class="type">${resource.contentType}</div>
                            <h3><a href="${resource.resourcePath}" class="animateLink">${resource.resourceTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></h3>
                            <div class="deafultdesc ">
                                <p>${resource.resourceDescription}</p>
                                <p>${resource.featuredBGImage}</p>
                            </div>
                         </div>
                         </div>
                         </div>
</c:forEach>