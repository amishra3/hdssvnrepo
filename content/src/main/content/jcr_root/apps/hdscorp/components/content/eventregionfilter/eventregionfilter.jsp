
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss"
	uri="http://www.adobe.com/consulting/acs-aem-commons/xss"%>
<%@page import="com.day.cq.search.result.SearchResult,com.day.cq.search.result.Hit,java.util.List"%>

<%@page import="com.hdscorp.cms.util.PropertyResolver"%>

<%@page import="com.hdscorp.cms.slingmodels.EventDataModel,java.util.ArrayList"%>
<%@page import="com.hdscorp.cms.dao.EventNode,com.hdscorp.cms.util.ViewHelperUtil,com.hdscorp.cms.search.SearchServiceHelper"%>



<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.EventRegionFilterComponent" var="resourceLibraryModel" />

<h1>Event Filter </h1>
<br>
<br>



Showing From:${resourceLibraryModel.eshownfrom}
<br><br>
Update Label:${resourceLibraryModel.eupdatelabel}
<br><br>
All Events:${resourceLibraryModel.eallevent}
<br><br>

<c:choose>
<c:when test="${empty resourceLibraryModel.eventtypes}">
		<wcm:placeholder classNames="cq-dl-placeholder cq-block-placeholder" />
	</c:when>

	<c:otherwise>

<c:forEach items="${resourceLibraryModel.eventtypes}" var="eventtype"
	varStatus="status">


	   <br>Event Labell:       ${xss:filterHTML(xssAPI,eventtype['elabel'])}<br>
       <br>Event Content Tag:  ${xss:filterHTML(xssAPI,eventtype['econtenttag'])}<br>
        <br>Event Region Tag :  ${xss:filterHTML(xssAPI,eventtype['eregionttag'])}<br>


</c:forEach>
	</c:otherwise>

</c:choose>

<br>
<br>
<br>
<h1>Regional Filter</h1>
<br>
<br>
Filter by Label:${resourceLibraryModel.efilterbylabel}
<br>
<c:choose>
<c:when test="${empty resourceLibraryModel.regions}">
		<wcm:placeholder classNames="cq-dl-placeholder cq-block-placeholder" />
	</c:when>

	<c:otherwise>

<c:forEach items="${resourceLibraryModel.regions}" var="region"
	varStatus="status">


	   <br>Region Label: ${xss:filterHTML(xssAPI,region['eregionlabel'])}<br>
       <br>Region Tag :  ${xss:filterHTML(xssAPI,region['eregionsttag'])}<br>


</c:forEach>
	</c:otherwise>

</c:choose>


<br>
<br>
<br>



<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.EventDataModel" var="eventDataModel" />


<c:forEach items="${eventDataModel.eventNodes}" var="eventNodes"> 



	<c:forEach items="${eventNodes.eventType}" var="eventTag" >
    ${eventTag} <br>
    </c:forEach>


    ${eventNodes.eventTitle} <br>
    ${eventNodes.eventStartDate}<br>
    ${eventNodes.eventDescription}<br>
	${eventNodes.eventLocation}<br>
    ${eventNodes.eventImageBackground}<br>
    ${eventNodes.eventRegisterNowLink}<br>
	${eventNodes.eventRegisterNowLabel}<br>

    <c:forEach items="${eventNodes.eventRegion}" var="eventRegionTag" >
    ${eventRegionTag}<br>
  </c:forEach>





</c:forEach>


