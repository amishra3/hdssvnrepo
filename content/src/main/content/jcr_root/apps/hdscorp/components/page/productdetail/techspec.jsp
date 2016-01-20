<%@include file="/apps/foundation/global.jsp"%>


<%
String pageTemplatePath=(String)currentPage.getProperties().get("cq:template");
if(pageTemplatePath!=null){
	pageTemplatePath=pageTemplatePath.substring(pageTemplatePath.lastIndexOf('/')+1);
}
%>
<cq:include script="head.jsp"/>
<body class="<%=pageTemplatePath %> contentwidepage">
	<div class="one-column">
		<cq:include script="header.jsp" />
		<cq:include script="techspeccontent.jsp" />
		<cq:include script="footer.jsp" />
	</div>
</body>


