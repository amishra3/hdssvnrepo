<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="nextLabel" value="${properties.nextlabel}" scope="request"/>
<c:set var="readMoreText" value="${properties.readMoreText}" scope="request"/>
<c:set var="pdfspath" value="${properties.pdfspath}" scope="request"/>
<c:set var="videospath" value="${properties.videospath}" scope="request"/>

<c:set var="contenttype" value="${properties.contenttype}" scope="request"/>
<c:set var="industrytag" value="${properties.industrytag}" scope="request"/>
<% 
String videooverlaymarkup ="<object class='BrightcoveExperience' id='#videoGuid'><param name='playerID' value='#videoTitleId'><param name='playerKey' value='AQ~~,AAADnJnNnnk~,ltuihYvDjRKL7D7fwmzXgyXNR-vMq9ot'><param name='@videoPlayer' value='#videoTitleId'><param name='isVid' value='true'><param name='isUI' value='true'><param name='dynamicStreaming' value='true'><param name='htmlFallback' value='true'><param name='includeAPI' value='true'><param name='templateLoadHandler' value='onTemplateLoad'><param name='width' value='720'><param name='height' value='455'><param name='showNoContentMessage' value='false' /><param name='secureConnections' value='true' /><param name='secureHTMLConnections' value='true' /><param name='includeAPI' value='true' /><param name='templateLoadHandler' value='myTemplateLoaded' /><param name='linkBaseURL' value='https://wwwstage-revamp.hds.com/en-us/news-insights/resources.html#vid=#videoTitleId'/></object>";

%>
<c:set var="overlaymarkup" value="<%=pageProperties.getInherited("videooverlaymarkup", videooverlaymarkup) %>"/>
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
               
            <c:choose>
	    		<c:when test="${resource.resourceType == 'video'}">
	    		<c:set var="videooverlaymarkup" value="${overlaymarkup}"/>
	        		<h3>
	        			<a href="javascript:void(0)" class="l-overlay animateLink" data-is-video="true" data-target-content="rl${resource.videoTitleId}" 
	                               target="_blank">${resource.resourceTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
						<div class="overlay-content" id="rl${resource.videoTitleId}">
						
						<c:set var="videooverlaymarkup" value="${fn:trim(videooverlaymarkup)}"/>
						
						 <c:set var="videooverlaymarkup" value="${fn:replace(videooverlaymarkup,'#videoGuid',resource.videoGuid)}"/>
						 <c:set var="videooverlaymarkup" value="${fn:replace(videooverlaymarkup,'#videoTitleId',resource.videoTitleId)}"/>                          
	                          <div class="">
	                          
		                          ${videooverlaymarkup}
	                          </div>
						</div>
					</h3>
		    </c:when>
	    
		    <c:otherwise>
		         <h3><a href="${resource.resourcePath}" class="animateLink"  target="_blank">${resource.resourceTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></h3>
		    </c:otherwise>
		</c:choose>    
		<div class="deafultdesc">
        	<p>${resource.resourceDescription}</p>
		</div>
	</div>
	           
	 </c:forEach>                       
</div>