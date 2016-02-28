<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.apache.sling.settings.SlingSettingsService"%>
<%@page import="java.util.Set"%>


<% 
Set<String> runModes = sling.getService(SlingSettingsService.class).getRunModes();
if(runModes.contains("prod")){
	//Include PROD satellite code
%>
	<script
		src="//assets.adobedtm.com/e171f6759c6c455550c5f666e64e8a56fe657d2f/satelliteLib-7f2faccf998d3a358edac4d790c59020820ff755.js"></script>
<%	

}else{
	//Include NONPROD satellite code
%>
	<script
		src="//assets.adobedtm.com/e171f6759c6c455550c5f666e64e8a56fe657d2f/satelliteLib-7f2faccf998d3a358edac4d790c59020820ff755-staging.js"></script>
<%	
}
%>