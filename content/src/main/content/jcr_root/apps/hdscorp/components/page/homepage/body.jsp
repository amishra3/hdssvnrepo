<%@page import="org.apache.commons.lang.StringUtils"%>
<%@include file="/apps/foundation/global.jsp"%>

<%
String pageTemplatePath=(String)currentPage.getProperties().get("cq:template");
if(pageTemplatePath!=null){
	pageTemplatePath=pageTemplatePath.substring(pageTemplatePath.lastIndexOf('/')+1);
}

String userAgent =  request.getHeader("user-agent");
String rsvis = "rsvis" ;
if(!StringUtils.isEmpty(userAgent) ){
	userAgent = userAgent.toLowerCase();
	if(StringUtils.indexOfAny(userAgent, new String[]{"googlebot", "bingbot","slurp"}) != -1 ){
		rsvis = "norsvis" ;
	}
}
%>

<body class="<%=pageTemplatePath %> home-page hds-megaMenu-push <%=rsvis%>">
    <div class="hds-MobileMenu hds-megaMenu-right">
        <div class="closeHDSMenu">
            <a href="javascript:void(0);" title="Close" id="closeHDSMenu">Close</a>
        </div>
	    <div class="hds-mobile-navigation"></div>
	</div>
	<div class="one-column homepage">
		<cq:include script="header.jsp"/>
		<cq:include script="content.jsp"/>
		<cq:include script="footer.jsp" />
	</div>
	<!-- <cq:includeClientLib js="hdscorp.main" /> -->
	   <cq:include script="footeranalytics.jsp" />

<script type="application/ld+json">
{
   "@context": "http://schema.org",
   "@type": "WebSite",
   "url": "https://www.hds.com/",
   "potentialAction": {
     "@type": "SearchAction",
     "target": "https://www.hds.com/search?site=hdsrevamp&client=hdsrevamp&proxystylesheet=hdsrevamp&q={search_term_string}",
     "query-input": "required name=search_term_string"
   }
}
</script>

<script type="application/ld+json">
{ "@context" : "http://schema.org",
  "@type" : "Organization",
  "name" : "Hitachi Data Systems",
  "url" : "https://www.hds.com",
  "sameAs" : [ "https://www.facebook.com/HitachiDataSystems",
    "https://twitter.com/hdscorp",
    "https://plus.google.com/u/0/+hitachidatasystems/posts",
    "https://www.linkedin.com/company/hitachi-data-systems?trk=tyah",
    "https://www.youtube.com/user/hdscorp",
    "http://www.slideshare.net/hdscorp" ]
}
</script>

<script type="application/ld+json">
{
  "@context" : "http://schema.org",
  "@type" : "WebSite",
  "name" : "HDS",
  "alternateName" : "Hitachi Data Systems",
  "url" : "https://www.hds.com/"
}
</script>
<script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "<%= pageProperties.getInherited("domain", "") %>", 
              "logo": "<%= pageProperties.getInherited("domain", "") %>${scemaLogo}"
    }
</script>

</body>