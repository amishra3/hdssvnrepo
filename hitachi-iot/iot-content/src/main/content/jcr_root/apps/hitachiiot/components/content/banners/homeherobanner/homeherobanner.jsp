<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="ourplatformurl" value="${properties.ourplatformurl}" />
<c:set var="videoid" value="${properties.videoid}" />

<c:if test="${fn:startsWith(ourplatformurl,'/content/')}">
	<c:set var="ourplatformurl" value="${hdscorp:shortURL(ourplatformurl)}" />
</c:if>
<% 
	String homeHeroVideoMarkup ="<object class='BrightcoveExperience' id='bgvid' style='width: 100%; height: 100%; border: 2px solid orange;'><param name='bgcolor' value='#FFFFFF' /><param name='width' value='100%' /><param name='height' value='517' /><param name='playerID' value='#videoTitleId'><param name='playerKey' value='AQ~~,AAADnJnNnnk~,ltuihYvDjRIOlM3eAv1n6tj_paXrEum1'><param name='@videoPlayer' value='#videoTitleId'><param name='isVid' value='true'><param name='autoStart' value='true' /><param name='isUI' value='true'><param name='dynamicStreaming' value='true'><param name='wmode' value='transparent' /> </object>";
%>
<c:set var="homeHeroVideoMarkup" value="<%=pageProperties.getInherited("homeherovideomarkup", homeHeroVideoMarkup) %>"/>

<c:set var="homeHeroVideoMarkup" value="${fn:trim(homeHeroVideoMarkup)}"/>

<c:set var="homeHeroVideoMarkup" value="${fn:replace(homeHeroVideoMarkup,'#videoTitleId',videoid)}"/>                          
	                    
<c:set var="html5videourl" value="<%=properties.get("html5videourl", "https://brightcove.hs.llnwd.net/v1/unsecured/media/3971130171001/201605/3207/3971130171001_4879870722001_4879800877001.mp4") %>"/>
	                    
<% 
String scheme = request.getScheme();
String hostName = request.getServerName();
int serverPort = request.getServerPort();

if(scheme.toLowerCase().equals("http") && serverPort!=80){
	String homeHeroVideoMarkupProp = (String)pageContext.getAttribute("homeHeroVideoMarkup");
	homeHeroVideoMarkupProp = homeHeroVideoMarkupProp.replace("secureConnections", "isUI").replace("secureHTMLConnections", "isVid") ;
	pageContext.setAttribute("homeHeroVideoMarkup",homeHeroVideoMarkupProp);
}


%>	                    

<c:choose>
	<c:when test="${not empty properties.herotitlecontent}">

		<c:set var="tabList" value="<%=PageUtils.convertMultiWidgetToList(properties,"tabTitle-tablink-tabIconPath")%>" />

		<div class="iot-hero clearfix hidden-xs hidden-sm hidden-md">
			<c:choose>
				<c:when test="${empty properties.usehtml5player}">
					${homeHeroVideoMarkup}
				</c:when>
				<c:otherwise>
							<video autoplay loop muted class="fillWidth" id='bgvid'>
								<source src="${html5videourl}" type="video/mp4" />
							</video>
				</c:otherwise>
			</c:choose>

			<div class="iot-hero-container content-container">
				<h1 class="headline col-md-7">${properties.herotitlecontent}</h1>

				<h4 class="sub-headline col-md-7">${properties.herosubtitlecontent}</h4>

				<div class="features col-md-7">
					<c:forEach var="tab" items="${tabList}">
						<c:set var="tabTitle" value="${tab.tabTitle}" />
						<c:set var="tablink" value="${tab.tablink}" />
						<c:set var="tabIconPath" value="${tab.tabIconPath}" />
						<div class="button-wrapper">
							<a href="${hdscorp:shortURL(tablink)}" class="btn-square-features"
								style="background-image: url(${tabIconPath});">${tabTitle}</a>
						</div>
					</c:forEach>

				</div>

				<div class="features col-md-7">
					<a href="${ourplatformurl}" class="btn-square-clear platform ">${properties.ourplatformlinktext}</a>
				</div>
			</div>
		</div>

		<div class="iot-hero clearfix hidden-lg" style="background-image:url(${properties.heromobileimage})">
			<div class="iot-hero-container content-container">
				<h1 class="headline col-md-7">${properties.herotitlecontent}</h1>

				<h4 class="sub-headline col-md-7">${properties.herosubtitlecontent}</h4>

				<div class="features col-md-7">
					<c:forEach var="tab" items="${tabList}">
						<c:set var="tabTitle" value="${tab.tabTitle}" />
						<c:set var="tablink" value="${tab.tablink}" />
						<c:set var="tabIconPath" value="${tab.tabIconPath}" />
						<div class="button-wrapper">
							<a href="${hdscorp:shortURL(tablink)}" class="btn-square-features"
								style="background-image: url(${tabIconPath});">${tabTitle}</a>
						</div>
					</c:forEach>

				</div>

				<div class="features col-md-7">
					<a href="${ourplatformurl}" class="btn-square-clear platform ">${properties.ourplatformlinktext}</a>
				</div>
			</div>
		</div>
		

	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Homepage Hero
					Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
<script type="application/ld+json">
{ "@context" : "http://schema.org",
  "@type" : "Organization",
  "name" : "Hitachi Insight Group",
  "url" : "https://www.hitachiinsightgroup.com",
  "sameAs" : [ "https://www.linkedin.com/company/3843",
    "https://twitter.com/Hitachi_SocInn",
    "https://www.facebook.com/hitachi.global/"
 ]
}
</script>
