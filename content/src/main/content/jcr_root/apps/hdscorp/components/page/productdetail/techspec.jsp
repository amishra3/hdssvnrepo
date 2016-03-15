<%@include file="/apps/foundation/global.jsp"%>


<%
String pageTemplatePath=(String)currentPage.getProperties().get("cq:template");
if(pageTemplatePath!=null){
	pageTemplatePath=pageTemplatePath.substring(pageTemplatePath.lastIndexOf('/')+1);
}
%>
<cq:include script="head.jsp"/>
<c:set var="techspeconlypage" value="${true}" scope="request"/>

<body class="<%=pageTemplatePath %> contentwidepage techspeconly" id="tech-specifications">
	<div class="one-column">
		<cq:include script="header.jsp" />
        <div class="spec-section">
			<cq:include script="techspeccontent.jsp" />
        </div>
		<cq:include script="footer.jsp" />
	</div>
</body>


