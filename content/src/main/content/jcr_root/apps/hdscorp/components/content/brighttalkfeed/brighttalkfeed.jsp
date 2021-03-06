<%--Brighttalk component.--%>
<%@page import="com.hdscorp.cms.config.HdsCorpGlobalConfiguration"%>
<%@page import="com.hdscorp.cms.scheduler.BrightCoveScheduler"%>
<%@page import="org.apache.sling.api.resource.ValueMap"%>
<%@page import="org.apache.sling.api.resource.Resource"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.constants.ServiceConstants"%> 
<%@page import="com.hdscorp.cms.util.ServiceUtil"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>

<c:if test="${ empty properties.usemebedcode}">

<% 


List<Map<String, String>> listMaps=ServiceUtil.getBrightTalkMapFromJSON(resourceResolver,HdsCorpGlobalConfiguration.BRIGHTTALK_DATA_STORAGE_PATH,ServiceConstants.SAVE_FEED_DATA_PROPERTY_NAME,ServiceConstants.FEED_RECORDED);
pageContext.setAttribute("listMaps", listMaps); 

%>

<c:set var='playerpath' value='${properties.playerpagepath}'/>
<c:if test="${empty properties.playerpagepath}">
	<c:set var='playerpath' value='/content/hdscorp/en_us/lookup/webcast'/>
</c:if>

<c:set var='playerpath' value='${hdscorp:shortURL(playerpath)}'/>
<c:set var="detailslabel" value="${properties.detailslabel}" scope="application" />
<c:set var="webcastnotfound" value="${properties.nowebcastfoundmessage}" scope="application" />
<c:set var="registernow" value="${properties.registerlabel}" scope="application" />
<c:set var="playermodal" value="${properties.playeropeninmodal}" scope="application" />

<div class="pr-list no-padding">
    <div class="product-category-list pt-0">
        <div class="product-category-list-container">
            <div class="row">
                <div class="col-md-3 webcast-listing">
                    <cq:include path="brighttalkfeedFilters" resourceType="hdscorp/components/content/brigthtalkleftpannel" />
                </div>
                <!--  webcast Content to be Loaded here -->
                <div id="contentWebCast">
                    <div class="col-md-9 newsWrapper">
                        <div class="noWebcastFilter">${properties.nowebcastfoundmessage} </div>
                        <c:forEach items="${listMaps}" var="listm" varStatus="status">
                            <div class="newsEvents ${status.first ? 'firstChild' : ''} scrollto${listm.communicationId}" data-webcast="${listm.category}">
                                <h3>${listm.title}</h3>
                                <small>${listm.duration}</small>
                                <h4 class="author">${listm.author}</h4>
                                <p>${listm.summary}<br><br><small>${listm.status} ${listm.updatedDate}</small></p>
                                <div class="WebcastDetails">

                                    <c:choose>
                                        <c:when test="${listm.status == 'recorded'}">
                                            <div class="bgcastDetails">
                                            	<img src="${listm.previewImagePath}" alt=""/>
                                                <%--<a rel="modal" href="https://www.brighttalk.com/webcast/${listm.channelId}/${listm.communicationId}" comid="${listm.communicationId}" target="_blank" class="playvideo brighttalklink" title="${properties.playlabel}">${properties.playlabel}</a> --%>
												<!-- Make the URL of the rendering page authorable -->
                                                <a rel="${not empty properties.playeropeninmodal?'modal':'dummy'}" href="${playerpath}?commid=${listm.communicationId}" comid="${listm.communicationId}" target="_blank" class="playvideo" title="${properties.playlabel}">${properties.playlabel}</a>
                                            </div>
                                        </c:when>
                                        <c:otherwise>
                                            <%--<a href="https://www.brighttalk.com/webcast/${listm.channelId}/${listm.communicationId}" comid="${listm.communicationId}" class="brighttalklink" title="Play">${properties.registerlabel}</a> --%>
                                            <a rel="${not empty properties.playeropeninmodal?'modal':'dummy'}" href="${playerpath}?commid=${listm.communicationId}" comid="${listm.communicationId}" target="_blank" title="Play">${properties.registerlabel}</a>
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                                        <div class="expandMe less ${listm.communicationId}"><span class="glyphicon glyphicon-plus-sign"></span>${properties.detailslabel} </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

 <script>
    </script>
    
</c:if>    

<c:if test="${ not empty properties.usemebedcode}">
	${properties.html5embedcode}
</c:if>