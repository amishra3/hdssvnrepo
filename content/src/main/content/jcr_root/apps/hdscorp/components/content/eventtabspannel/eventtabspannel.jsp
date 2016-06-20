<%--Event tab pannel component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="tabEventList" value="<%=PageUtils.convertMultiWidgetToList(properties,"etptabname-etptabid")%>" />

<ul class="nav nav-tabs">
<c:forEach var="tabList" items="${tabEventList}" varStatus="loopCounter">
    <c:choose>
    <c:when test="${loopCounter.count==1}">
<li class="active"><a data-toggle="tab" href="${tabList.etptabid}">${tabList.etptabname}</a></li>
    </c:when>
 <c:otherwise>
    <li><a data-toggle="tab" href="${tabList.etptabid}">${tabList.etptabname}</a></li>
        </c:otherwise>
    </c:choose>

</c:forEach>
</ul>