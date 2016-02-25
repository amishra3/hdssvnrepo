<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="nextLabel" value="${properties.nextlabel}" scope="request"/>
<c:set var="readMoreText" value="${properties.readMoreText}" scope="request"/>
<c:set var="resourcesPath" value="${properties.resourcespath}" scope="request"/>
<c:set var="pageSize" value="${properties.pagesize}" scope="request"/>
<c:set var="contenttype" value="${properties.contenttype}" scope="request"/>


<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.ResourceLibrarySearchModel" var="model" />


<c:forEach var="resource" items="${model.resouceList}" varStatus="loopcnt">

<div class="category-resources-listing">
                    <div class="section prodnsolcategorycontent">
                        <div class="resource">
                            <div class="type">${resource.contentType}</div>
                            <h3><a href="${resource.resourcePath}" class="animateLink">${resource.resourceTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></h3>
                            <div class="deafultdesc ">
                                <p>${resource.resourceDescription}</p>
                            </div>
                         </div>
                         </div>
                         </div>
</c:forEach>






