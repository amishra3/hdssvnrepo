<%--Brighttalk component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.constants.ServiceConstants"%> 
<%@page import="com.hdscorp.cms.util.ServiceUtil"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>

<% List<Map<String, String>> listMaps=ServiceUtil.getBrightTalkMapFromJSON(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.BrightTalkScheduler","storage.path"),ServiceConstants.SAVE_FEED_DATA_PROPERTY_NAME);
pageContext.setAttribute("listMaps", listMaps); 
 %>
 
<c:set var='playerpath' value='${properties.playerpagepath}'/>
<c:if test="${empty properties.playerpagepath}">
	<c:set var='playerpath' value='/content/hdscorp/en_us/lookup/Webcast'/>
</c:if>

<c:set var='playerpath' value='${hdscorp:shortURL(playerpath)}'/>


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
                        <div class="noEventFilter">No webcast is found </div>
                        <c:forEach items="${listMaps}" var="listm" varStatus="status">
                            <div class="newsEvents ${status.first ? 'firstChild' : ''}" data-webcast="${listm.category}">
                                <h3>${listm.title}</h3>
                                <small>${listm.duration}</small>
                                <h4 class="author">${listm.author}</h4>
                                <p>${listm.summary}<br><br><small>Recorded ${listm.updatedDate}</small></p>
                                <div class="WebcastDetails">
                                   
                                    <c:choose>
                                        <c:when test="${listm.status == 'recorded'}">
                                            <div class="bgcastDetails" style="background-image: url('${listm.previewImagePath}')">
												<%--<a rel="modal" href="https://www.brighttalk.com/webcast/${listm.channelId}/${listm.communicationId}" comid="${listm.communicationId}" target="_blank" class="playvideo brighttalklink" title="Play">Play</a> --%>
												<!-- Make the URL of the rendering page authorable -->
                                                <a rel="${not empty properties.playeropeninmodal?'modal':'dummy'}" href="${playerpath}?wcmmode=disabled&commid=${listm.communicationId}" target="_blank" class="playvideo" title="Play">Play</a>
                                            </div>
                                        </c:when>
                                        <c:otherwise>
											<%--<a href="https://www.brighttalk.com/webcast/${listm.channelId}/${listm.communicationId}" comid="${listm.communicationId}" class="brighttalklink" title="Play">Register</a> --%>
                                            <a rel="${not empty properties.playeropeninmodal?'modal':'dummy'}" href="${playerpath}?wcmmode=disabled&commid=${listm.communicationId}" target="_blank" title="Play">Register</a>
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                                <a href="javascript:void(0);" class="animateLink expandMe less"><span class="glyphicon glyphicon-plus-sign"></span>details </a>
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