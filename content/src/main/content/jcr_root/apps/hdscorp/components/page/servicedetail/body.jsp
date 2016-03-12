<%@include file="/apps/foundation/global.jsp"%>


<%
String pageTemplatePath=(String)currentPage.getProperties().get("cq:template");
if(pageTemplatePath!=null){
	pageTemplatePath=pageTemplatePath.substring(pageTemplatePath.lastIndexOf('/')+1);
}
%>

<body class="<%=pageTemplatePath %> contentwidepage">
	<div class="one-column">
	<div class="hds-MobileMenu hds-megaMenu-right">
        <div class="closeHDSMenu">
            <a href="javascript:void(0);" title="Close" id="closeHDSMenu">Close</a>
        </div>
	    <div class="hds-mobile-navigation"></div>
	</div>	
		<cq:include script="header.jsp" />
		<cq:include script="content.jsp" />
		<cq:include script="footer.jsp" />
	</div>
	   <cq:include script="footeranalytics.jsp" />
</body>