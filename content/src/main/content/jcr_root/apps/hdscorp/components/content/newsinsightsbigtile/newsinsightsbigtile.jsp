<%--

  News Insights Big Tile Component component.

  This is news insights big tile component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>
<h1>News Insights Big Tile Component</h1>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsInsightsBigTileModel" var="newsInsightsBigTileModel" />

<br>Label ::${newsInsightsBigTileModel.nibtLabel}
<br>Label Link::${newsInsightsBigTileModel.nibtLabelLink}
<br>Back Ground Image Path::${newsInsightsBigTileModel.nibtBGImagePath}
<br>Icon Image Path ::${newsInsightsBigTileModel.nibtIconImagePath}
<br>Icon Image Title::${newsInsightsBigTileModel.nibtIconImageTitle}
<br>Content::${newsInsightsBigTileModel.nibtDescription}
<br>open In New window::${newsInsightsBigTileModel.nibtOpenInNewWindow}

