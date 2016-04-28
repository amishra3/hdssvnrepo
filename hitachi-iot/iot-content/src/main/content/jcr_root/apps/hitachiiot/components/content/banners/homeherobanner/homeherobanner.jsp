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


<c:choose>
	<c:when test="${not empty properties.herotitlecontent}">

		<c:set var="tabList" value="<%=PageUtils.convertMultiWidgetToList(properties,"tabTitle-tablink-tabIconPath")%>" />

		<div class="iot-hero clearfix">
			<div class="hero-banner hidden-md hidden-lg">
			    <img src="${properties.heromobileimage}" />
			  </div>
		<div class="hidden-xs hidden-sm">
			<object id="bgvid" class="BrightcoveExperience"
				style="width: 100%; height: 100%; border: 2px solid orange;">
				<param name="bgcolor" value="#FFFFFF" />
				<param name="width" value="100%" />
				<param name="height" value="517" />
				<param name="playerID" value="${videoid}" />
				<param name="playerKey"
					value="AQ~~,AAADnJnNnnk~,ltuihYvDjRKL7D7fwmzXgyXNR-vMq9ot">
				<param name="@videoPlayer" value="${videoid}" />
				<param name="isVid" value="true" />
				<param name="autoStart" value="true" />
				<param name="isVid" value="true" />
				<param name="isUI" value="true" />
				<param name="dynamicStreaming" value="true" />
				<!--<param name="secureConnections" value="true"/>  -->
			</object>
			</div>
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

