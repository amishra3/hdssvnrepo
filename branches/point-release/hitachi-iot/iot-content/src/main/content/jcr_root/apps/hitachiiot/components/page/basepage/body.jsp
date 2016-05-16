<%@include file="/apps/foundation/global.jsp"%>

<c:set var="pageTemplate" value="<%=currentPage.getProperties().get("cq:template")%>" />
<c:set var="pagePath" value="<%=currentPage.getProperties().get("cq:template")%>" />
<div style="display: none;" id="pageTemplate"></div>


<body class="<%=currentPage.getProperties().get("cq:template")%>">
    <cq:include script="header.jsp"/>
    <cq:include script="content.jsp"/>
    <cq:include script="footer.jsp" />
    <cq:include script="footeranalytics.jsp" />
</body>