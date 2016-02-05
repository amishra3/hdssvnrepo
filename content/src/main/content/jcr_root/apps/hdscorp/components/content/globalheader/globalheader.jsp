<%--
  globalheader component.
--%>

<%@page import="com.hdscorp.cms.dao.JCRDataAccessor"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PropertyResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.day.cq.wcm.api.WCMMode"%>
<%@page import="com.day.cq.wcm.api.PageFilter"%>
<%@page import="org.apache.sling.api.resource.ValueMap"%>
<%@ page import="java.util.Iterator"%>
<%@page import="javax.servlet.jsp.PageContext"%>


<%@include file="/apps/foundation/global.jsp"%>

<c:set var="childPages"
	value="<%=PageUtils.getChildPages(properties.get("rootPath", ""),resourceResolver)%>" />
<c:set var="childs"
	value="<%=PageUtils.getChildPages(properties.get("rootPath", ""),resourceResolver)%>" />

<c:set var="logoTargetURL" value="${properties.	imageurl}" />
<c:if test="${fn:startsWith(logoTargetURL,'/content/')}">
	<c:set var="logoTargetURL"
		value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("logoTargetURL").toString())%>" />
</c:if>



<%
	JCRDataAccessor dataAccessor = new JCRDataAccessor(pageContext);
	String seacrhpageUrl=properties.get("searchpathurl",String.class);
	if(seacrhpageUrl!=null){
	   String shortseacrhUrl=PathResolver.getShortURLPath(seacrhpageUrl);
	   pageContext.setAttribute("shortseacrhUrl", shortseacrhUrl);
	}

%>

<c:set var="externalLinksList"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"linkTitle-linktargeturl-linkIconPath-linkurltargettype")%>" />


<!-- HEADER STARTS -->

<div class="hds-global-header">
	<div class="header-container content-container">
		<a href="${logoTargetURL}"><span
			class="hitachi-logo hidden-xs hidden-sm"></span></a> <a
			href="${logoTargetURL}"><span
			class="hitachi-logo-mobile hidden-md hidden-lg"></span></a>

		<div class="hds-quick-navigation hidden-xs hidden-sm">
			<ul>
				<c:forEach var="externalLink" items="${externalLinksList}">
					<c:set var="linkTitle" value="${externalLink.linkTitle}" />
					<c:set var="linktargeturl" value="${externalLink.linktargeturl}" />
					<c:set var="linkIconPath" value="${externalLink.linkIconPath}" />
					<c:set var="linkurltargettype"
						value="${externalLink.linkurltargettype}" />
					<li><a href="${linktargeturl}" x-cq-linkchecker="skip"
						target="${linkurltargettype?'_blank':'_self'}"> <span
							class="icon nav-globe"
							style="background-image: url(${linkIconPath});background-position: 0 0;"></span>
							${linkTitle}
					</a></li>

				</c:forEach>

				<li class="search"><input type="text"
					placeholder="${properties.searchboxtext}"><span
					class="icon nav-search"></span></li>
			</ul>
		</div>

		<button class="navbar-toggle collapsed nav-button" type="button"
			data-toggle="collapse" data-target="#bs-navbar"
			aria-controls="bs-navbar" aria-expanded="false" id="hdsMobileNaV">
			<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
			<span class="icon-bar"></span> <span class="icon-bar"></span> <span
				class="icon-bar"></span>
		</button>
		<div class="search-mobile">
			<span class="sprite icon-search-mobile"></span>
		</div>

	</div>

	<div class="hds-main-navigation-container hidden-xs hidden-sm">
		<div class="hds-main-navigation">
			<h5 class="col-md-3">
				<a href="${logoTargetURL}"> <span
					class="sprite hitachi-sublogo-mobile hidden-sm hidden-md hidden-lg">Hitachi
						Data Systems</span><span class="sprite hitachi-sublogo hidden-xs">Hitachi
						Data Systems</span>
				</a>
			</h5>
			<ul class="col-md-9 col-xs-12 removePosRelative globalNavWrapper">
				<c:forEach var="childPage" items="${childPages}" varStatus="count">
					<c:if test="${childPage.hideInNav != true}">
						<c:set var="pagepath" value="${childPage.path}/jcr:content" />
						<c:set var="pageprops"
							value="<%=dataAccessor.getResource(pageContext.getAttribute("pagepath").toString())%>" />
						<c:set var="subtext" value="${pageprops.subtext}" />
						<c:set var="navpath" value="${pageprops.navpath}" />


						<c:if test="${not empty pageprops.navpath}">
                      <sling:include path="${pageprops.navpath}" />
                        </c:if>

					</c:if>
				</c:forEach>


			</ul>
		</div>
	</div>

	<cq:include path="${currentDesign.path}/jcr:content/breadcrumbpar"
		resourceType="hdscorp/components/content/breadcrumb" />

</div>

<!-- HEADER ENDS HERE -->