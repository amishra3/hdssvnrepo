<%--Brighttalk component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.constants.ServiceConstants"%> 
<%@page import="com.day.cq.search.result.SearchResult,com.day.cq.search.result.Hit,java.util.List"%>
<%@page import="com.hdscorp.cms.util.PropertyResolver"%>
<%@page import="com.hdscorp.cms.slingmodels.EventDataModel,java.util.ArrayList"%>
<%@page import="com.hdscorp.cms.dao.EventNode,com.hdscorp.cms.util.ViewHelperUtil,com.hdscorp.cms.search.SearchServiceHelper"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.EventDataModel" var="eventDataModel" />




<div class="col-md-9 newsWrapper">
    <div class="noEventFilter">${eventDataModel.noeventfoundMsg} </div>    
    <c:forEach items="${eventDataModel.eventFinalNodesData}" var="eventAlldata">
        <div class="newsWrapper-listing">
            <div class="events_months">                
                <h2>${eventAlldata.key}</h2></div>
            <c:forEach items="${eventAlldata.value}" var="eventNodes">
                 <c:choose>
                    <c:when test="${eventNodes.isWebcast=='true'}">
							<div class="col-md-9 newsWrapper">
                                    <div class="noEventFilter">${webcastnotfound} </div>
                                         <div data-events="hdscorp:events/webcasts" data-region="hdscorp:events/webcasts" class="newsEvents" style="display: block;">
                                            <h3>${eventNodes.eventTitle}</h3>
                                            <small>${eventNodes.duration}</small>
                                            <h4 class="author">${eventNodes.author}</h4>
                                            <p>${eventNodes.summary}<br><br><small>UPCOMING</small></p>
                                             <div class="WebcastDetails">
                                                 <img src="${eventNodes.previewImagePath}" alt=""/>
                                                <a rel="${not empty playermodal?'modal':'dummy'}" href="${playerpath}?wcmmode=disabled&commid=${eventNodes.communicationId}" target="_blank" title="Play">${registernow}</a>
                                            </div>
                                                <a href="javascript:void(0);" class="animateLink expandMe less"><span class="glyphicon glyphicon-plus-sign"></span>${detailslabel}</a>
                                        </div>	
    
                            </div>	
                    </c:when>
                    <c:otherwise>				
                <div data-events="${eventNodes.eventTyptagId}" 
                data-startDate="${eventNodes.eventStartDate}" 
                data-endDate="${eventNodes.eventEndDate}" 
                data-region="${eventNodes.eventRegiontagId}"
                data-event-id="${eventNodes.eventId}" 
                class="newsEvents">
                    <small> ${eventNodes.eventTyptagName}</small> 
                    
                    <h3>${eventNodes.eventTitle} </h3>
                    <p>${eventNodes.eventStartDate}&ndash;${eventNodes.eventEndDate}: ${eventNodes.eventLocation}</p>
                    <div class="eventDetails" style="background-image: url('${eventNodes.eventImageBackground}')">
                        <div class="row">
                            <div class="col-md-12">
                                ${eventNodes.eventDescription}
								<div class="btn-square-white request">                                    
    								<a href="${eventNodes.eventRegisterNowLink}" title="${eventNodes.eventRegisterNowLabel}" target="${eventNodes.newwindow?'_blank':'_self'}">${eventNodes.eventRegisterNowLabel}${eventNodes.thirdpartyicon?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a> 
                                </div>

                            </div>                            
                        </div>
                    </div>
                    <a class="animateLink expandMe less" href="javascript:void(0);"><span class="glyphicon glyphicon-plus-sign"></span>${eventDataModel.detailsLabel} </a>
                </div>
                    </c:otherwise>
                      </c:choose> 

            </c:forEach>
            <!--/ All Events are Loaded here -->
        </div>
    </c:forEach>   
</div>