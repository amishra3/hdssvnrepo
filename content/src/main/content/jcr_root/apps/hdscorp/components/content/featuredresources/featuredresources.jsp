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
                        <div class="spotlight-title">
                        
                                    <c:choose>
									    <c:when test="${resource.resourceType == 'video'}">
									        <a href="javascript:void(0)" 
									                           
									
									                               class="l-overlay animateLink" 
									                               data-is-video="true"                                
									                               data-target-content="rl${resource.videoTitleId}" 
									
									                               target="_blank">${resource.resourceTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
									                           <div class="overlay-content" id="rl${resource.videoTitleId}">                          
									                          <div class="">
									                         
									                          <object class="BrightcoveExperience" id="${resource.videoGuid}">  
									                                               
									                            <param name="playerID" value="${resource.videoTitleId}">
									                            <param name="playerKey" value="AQ~~,AAADnJnNnnk~,ltuihYvDjRKL7D7fwmzXgyXNR-vMq9ot">
									                            <!-- for a single video in a Single Video template: Nee to Be Authored-->
									                            <param name="@videoPlayer" value="${resource.videoTitleId}">
									                            <param name="isVid" value="true">
									                            <param name="isUI" value="true">
									                            <param name="dynamicStreaming" value="true">
									                            <param name="htmlFallback" value="true">
									                            <param name="includeAPI" value="true">
									                            <param name="templateLoadHandler" value="onTemplateLoad">
									                            <param name="width" value="720">
									                            <param name="height" value="455">
									                            <param name="showNoContentMessage" value="false" />
									                          </object></div>
									                          </div>
									                               
									                           
									    </c:when>
									    
									    <c:otherwise>
									         <a href="${resource.resourcePath}" class="animateLink" target="_blank">${resource.resourceTitle}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>    
									    </c:otherwise>
									</c:choose> 
                        </div>
                    </div>
                </div>
            </div>
 </c:forEach>


</div>