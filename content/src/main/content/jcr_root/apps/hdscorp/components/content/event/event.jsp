<%--

  Event Component component.

  Hdscorp event component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%><%
%><h1>Event Component</h1>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.EventModel" var="eventModel" />
<c:forEach var="eventtype" items="${eventModel.eventType}" varStatus="loopcnt">

    <br>Event Type ::${eventtype}

			</c:forEach>


<br>Event Title ::${eventModel.eventTitle}

<br>Event StartDate::${eventModel.eventStartDate}

<br>Event EndDate::${eventModel.eventEndDate}

<br>Event Location::${eventModel.eventLocation}
<c:forEach var="eventregiontag" items="${eventModel.eventRegionTag}" varStatus="loopcnt">

    <br>Event RegionTag ::${eventregiontag}

			</c:forEach>



<br>Event Description::${eventModel.eventDescription}

<br>Background Image Path::${eventModel.evBackgroundImage}

<br>Register Now Label::${eventModel.registerNowLabel}

<br>Register Now Link::${eventModel.registerNowLink}

<br>Third Party::${eventModel.newwindow}
<br>New win::${eventModel.thirdpartyicon}


