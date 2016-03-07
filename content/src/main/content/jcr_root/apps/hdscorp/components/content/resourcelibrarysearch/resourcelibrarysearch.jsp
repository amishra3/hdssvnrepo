<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="nextLabel" value="${properties.nextlabel}" scope="request"/>
<c:set var="readMoreText" value="${properties.readMoreText}" scope="request"/>
<c:set var="resourcesPath" value="${properties.resourcespath}" scope="request"/>

<c:set var="contenttype" value="${properties.contenttype}" scope="request"/>
<c:set var="industrytag" value="${properties.industrytag}" scope="request"/>


<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.ResourceLibrarySearchModel" var="model" />

                 

<div class="section resourceLibraryContent">
<c:forEach var="resource" items="${model.resouceList}" varStatus="loopcnt">
<c:set var="resourceTags" value="${resource.resourceTags}" />
		<c:if test="${not empty  resourceTags}">
			<c:set var="resourceTags" value="${fn:join(resourceTags, ',')}" />
		</c:if>
		<c:set var="industryTags" value="${resource.industryTags}" />
		<c:if test="${not empty  industryTags}">
			<c:set var="industryTags" value="${fn:join(industryTags, ',')}" />
		</c:if>
		
       <div class="resource" data-indstry="${industryTags}" data-contenttype="${resource.contentTypeTag}" data-subfilter="${resourceTags}">
                <div class="type">${resource.contentType}</div>
                <h3><a href="${resource.resourcePath}" class="animateLink">${resource.resourceTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></h3>
                <div class="deafultdesc">
                    <p>${resource.resourceDescription}</p>
                </div>
            </div>
           
 </c:forEach>                       
</div>




