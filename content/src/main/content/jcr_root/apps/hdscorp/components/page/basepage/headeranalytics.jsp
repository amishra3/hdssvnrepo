<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.apache.sling.settings.SlingSettingsService"%>
<%@page import="java.util.Set"%>


<% 

String prodAnalyticsDefaultScript = "//assets.adobedtm.com/e171f6759c6c455550c5f666e64e8a56fe657d2f/satelliteLib-7f2faccf998d3a358edac4d790c59020820ff755.js" ;
String stgAnalyticsDefaultScript = "//assets.adobedtm.com/e171f6759c6c455550c5f666e64e8a56fe657d2f/satelliteLib-bacf5ad16a0dee8f02e5b10fadeed5a897694c27-staging.js" ;

String prodAnalyticsScriptPath = pageProperties.getInherited("prodAnalyticsScriptPath", prodAnalyticsDefaultScript);
String stgAnalyticsScriptPath = pageProperties.getInherited("stgAnalyticsScriptPath", stgAnalyticsDefaultScript);

pageContext.setAttribute("prodAnalyticsScriptPath",prodAnalyticsScriptPath);
pageContext.setAttribute("stgAnalyticsScriptPath",stgAnalyticsScriptPath);

Set<String> runModes = sling.getService(SlingSettingsService.class).getRunModes();
if(runModes.contains("prod") && !runModes.contains("author")){
	//Include PROD satellite code
%>
	<script src="${prodAnalyticsScriptPath}"></script>
		
	
<%	

}else{
	//Include NONPROD satellite code
%>
	<script src="${stgAnalyticsScriptPath}"></script>		
<%	
}
%>