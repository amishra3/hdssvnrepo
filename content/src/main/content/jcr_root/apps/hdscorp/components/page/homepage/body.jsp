<%@include file="/apps/foundation/global.jsp"%>

<%
String pageTemplatePath=(String)currentPage.getProperties().get("cq:template");
if(pageTemplatePath!=null){
	pageTemplatePath=pageTemplatePath.substring(pageTemplatePath.lastIndexOf('/')+1);
}
%>

<body class="<%=pageTemplatePath %> home-page">
	 <div class="one-column homepage">
	     <cq:include script="header.jsp"/>
	    <cq:include script="content.jsp"/>
	    <cq:include script="footer.jsp" />
	</div>
	<!-- <cq:includeClientLib js="hdscorp.main" /> -->
</body>