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
                <div data-events="${eventNodes.eventTyptagId}" 
                data-startDate="${eventNodes.eventStartDate}" 
                data-endDate="${eventNodes.eventEndDate}" 
                data-region="${eventNodes.eventRegiontagId}" 
                class="newsEvents">
                    <small> ${eventNodes.eventTyptagName}</small> 
                    
                    <h3>${eventNodes.eventTitle} </h3>
                    <p>${eventNodes.eventStartDate}&ndash;${eventNodes.eventEndDate}: ${eventNodes.eventLocation}</p>
                    <div class="eventDetails" style="background-image: url('${eventNodes.eventImageBackground}')">
                        <div class="row">
                            <div class="col-md-12">
                                ${eventNodes.eventDescription}
								<div class="btn-square-white request">
    								<a href="${eventNodes.eventRegisterNowLink}" title="${eventNodes.eventRegisterNowLabel}">${eventNodes.eventRegisterNowLabel}</a> 
                                </div>

                            </div>                            
                        </div>
                    </div>
                    <a class="animateLink expandMe less" href="javascript:void(0);"><span class="glyphicon glyphicon-plus-sign"></span>${eventDataModel.detailsLabel} </a>
                </div>
            </c:forEach>
            <!--/ All Events are Loaded here -->
        </div>
    </c:forEach>   
</div>