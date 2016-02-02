<%--

 

  Hdscorp News Detail component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>

<h4> News detail Component</h4>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsDetailModel" var="news" />

<h1>${news.newsTitle}</h1>
<h1>${news.newsLink}</h1>


