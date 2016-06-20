<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<cq:include path="productdescriptions" resourceType="hdscorp/components/content/partnerdescriptioncontent/partnerdescription" />
<c:set var="pcontent" value="<%=PageUtils.convertMultiWidgetToList(properties,"seemorelabel-seemoretargeturl-seemorenewwin-thirdparty")%>" />
${properties.backgroundimagepath}<br/>
${properties.partnericonimagepath}<br/>
${properties.partnericonimagealttext}<br/>

<c:forEach var="column" items="${pcontent}" varStatus="loop">
<a class="animateLink" href="${column.seemoretargeturl}" target="${column.seemorenewwin==1?'_blank':'_self'}">${column.seemorelabel}${column.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a><br>
</c:forEach>