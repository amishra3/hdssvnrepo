<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7" > <![endif]-->
<!--[if IE 7]>         <html lang="en" class="no-js lt-ie10 lt-ie9 lt-ie8" > <![endif]-->
<!--[if IE 8]>         <html lang="en" class="no-js lt-ie10 lt-ie9" > <![endif]-->
<!--[if IE 9]>         <html lang="en" class="no-js lt-ie10" > <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en" class="no-js" > <!--<![endif]-->

<%@include file="/apps/foundation/global.jsp"%>


<%
String pageTemplatePath=(String)currentPage.getProperties().get("cq:template");
if(pageTemplatePath!=null){
	pageTemplatePath=pageTemplatePath.substring(pageTemplatePath.lastIndexOf('/')+1);
}
%>
<cq:include script="head.jsp"/>
<c:set var="techspeconlypage" value="${true}" scope="request"/>

<body class="<%=pageTemplatePath %> contentwidepage techspeconly hds-megaMenu-push" id="tech-specifications">
	<div class="one-column">
		<cq:include script="header.jsp" />
        <div class="spec-section">
			<cq:include script="techspeccontent.jsp" />
        </div>
		<cq:include script="footer.jsp" />
	</div>
</body>
</html>