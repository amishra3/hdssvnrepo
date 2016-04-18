<%--globalheader component--%>

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

<c:set var="childPages" value="<%=PageUtils.getChildPages(properties.get("rootPath", ""),resourceResolver)%>" />
<c:set var="hideSearch" value="<%=properties.get("hidesearch", false)%>" />

<c:set var="logoTargetURL" value="${properties.	imageurl}" />
<c:set var="hdslogotitle" value="<%=properties.get("hdslogotitle", "Hitachi Data Systems")%>" />
<c:if test="${fn:startsWith(logoTargetURL,'/content/')}">
	<c:set var="logoTargetURL" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("logoTargetURL").toString())%>" />
</c:if>

<%
	JCRDataAccessor dataAccessor = new JCRDataAccessor(pageContext);
	String seacrhpageUrl=properties.get("searchpathurl",String.class);
	if(seacrhpageUrl!=null){
	   String shortseacrhUrl=PathResolver.getShortURLPath(seacrhpageUrl);
	   pageContext.setAttribute("shortseacrhUrl", shortseacrhUrl);
	}
 
	String viewtype = "";
	String[] selectorArray = slingRequest.getRequestPathInfo().getSelectors();
	if (selectorArray != null && selectorArray.length > 0) {
		viewtype = selectorArray[0];
	}

	pageContext.setAttribute("selectorString", viewtype);	

%>

<c:set var="domain" value="" />
<c:set var="linkoverlayURLPath" value="" />

<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>


<c:set var="externalLinksList"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"linkTitle-linktargeturl-linkIconPath-linkurltargettype-linkoverlayurl")%>" />


<!-- HEADER STARTS -->
<div class="hds-global-header clearfix">
	<c:if test="${selectorString!= 'excludetop'}">
		<div class="header-container content-container">
			<a target="${properties.topnewwin?'_blank':'_self'}" href="${fn:contains(properties.topimageurl, 'http')?'':domain}${hdscorp:shortURL(properties.topimageurl)}">

			<span class="hitachi-logo hidden-xs hidden-sm"></span>
			</a>
			 <a href="${fn:contains(properties.topimageurl, 'http')?'':domain}${hdscorp:shortURL(properties.topimageurl)}" target="_blank"><span
				class="hitachi-logo-mobile hidden-md hidden-lg"></span>
			</a>

			<div class="hds-quick-navigation hidden-xs hidden-sm">
				<ul>                  
					<c:forEach var="externalLink" items="${externalLinksList}">
						<c:set var="linkTitle" value="${externalLink.linkTitle}" />
						<c:set var="linktargeturl" value="${externalLink.linktargeturl}" />
						<c:set var="linkIconPath" value="${externalLink.linkIconPath}" />
						<c:set var="linkurltargettype" value="${externalLink.linkurltargettype}" />
                        <c:set var="linkoverlayURL" value="${externalLink.linkoverlayurl}" />

 				        <c:choose>
                            <c:when test="${not empty linkoverlayURL}">
                                <c:set var="linkoverlayURLPath" value="${linkoverlayURL}" />
                                 <li><a id="showGeo" href="javascript:void(0);"> <span class="icon nav-globe" style="background-image: url(${linkIconPath});background-position: 0 0;"></span>
								      <span class="labelText hidden-lg hidden-md">${linkTitle}: </span>
				 	             <span class="icon-accordion-closed"></span>
						    	 <span class="icon-accordion-opened"></span>
						    	 <span class="caret-arrow hidden-sm hidden-xs"></span>
				 	             </a></li>
                            </c:when>
                           <c:otherwise>
 					             <li><a  href="${linktargeturl}" x-cq-linkchecker="skip"
							     target="${linkurltargettype?'_blank':'_self'}"> <span class="icon nav-globe" style="background-image: url(${linkIconPath});background-position: 0 0;"></span>
							          ${linkTitle}
				 		         </a></li>
                          </c:otherwise>
                       </c:choose>
				    </c:forEach>
                 <c:if test="${!hideSearch}">
					<li class="search"><input type="text"
						placeholder="${properties.searchboxtext}" data-href="${shortseacrhUrl}" id="gsaSearchBox"><span
						class="icon nav-search"></span></li>
				  </c:if>
				</ul>
			</div>

			<button class="navbar-toggle collapsed nav-button" type="button"
				data-toggle="collapse" data-target="#bs-navbar"
				aria-controls="bs-navbar" aria-expanded="false" id="hdsMobileNaV">
				<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
				<span class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<c:if test="${!hideSearch}">
			<div class="search-mobile hidden-md hidden-lg">
				<span class="sprite icon-search-mobile"></span>
			</div>
			<div class="search-mobile-container hidden-md hidden-lg">
                <div class="search-section">
                    <div class="col-sm-12 col-no-pad">
                        <label>Search within Hitachi</label>
                    </div>              
                    <div class="col-sm-12 col-no-pad">
                        <input type="text" size="20" maxlength="40" data-href="${fn:contains(shortseacrhUrl, 'http')?'':domain}${shortseacrhUrl}" id="gsaMobSearchBox" class="search-txt">
                        <input type="submit" value="Search" class="btn-search" id="gsaMobSearchBtn">
                    </div>
                </div>
            </div>
            </c:if>
	        <!--Geo OverLay-->
            <c:if test="${not empty linkoverlayURLPath}" >
                <sling:include path="${linkoverlayURLPath}" />
            </c:if>
		</div>
	</c:if>
	<div class="hds-main-navigation-container">
		<div class="hds-main-navigation">
			<div class="col-md-3">
				<a href="${fn:contains(logoTargetURL, 'http')?'':domain}${hdscorp:shortURL(logoTargetURL)}"> <span
					class="sprite hitachi-sublogo-mobile hidden-sm hidden-md hidden-lg">${hdslogotitle}</span>
					<span class="sprite hitachi-sublogo hidden-xs">${hdslogotitle}</span>
				</a>
			</div>

             <c:set var="requestURL" value="${pageContext.request.requestURI}" />

			<ul class="col-md-9 col-xs-12 removePosRelative globalNavWrapper  hidden-xs hidden-sm">
				<c:forEach var="childPage" items="${childPages}" varStatus="count">
					<c:if test="${childPage.hideInNav != true}">
						<c:set var="pagepath" value="${childPage.path}/jcr:content" />
						<c:set var="pageprops" value="<%=dataAccessor.getResource(pageContext.getAttribute("pagepath").toString())%>" />
						<c:set var="subtext" value="${pageprops.subtext}" />
						<c:set var="navpath" value="${pageprops.navpath}" />
						<c:set var="navTitle" value="${childPage.title}" />
						<c:if test="${not empty childPage.navigationTitle}">
							<c:set var="navTitle" value="${childPage.navigationTitle}" />
						</c:if>

                        <c:set var="childPagePath" value="${hdscorp:shortURL(childPage.path)}" />

                        <c:set var="childPagePathWithoutHTML" value="${fn:substringBefore(childPagePath,'.html')}" />

						<li class="${fn:contains(requestURL, childPagePathWithoutHTML)?'active':''} hds-default-nav">
						    <a 
						    	href="${fn:contains(childPage.path, 'http')?'':domain}${hdscorp:shortURL(childPage.path)}"
						    	>${navTitle}
						    	<span class="icon-accordion-closed"></span>
						    	<span class="icon-accordion-opened"></span>
							</a>
							<c:if test="${not empty pageprops.navpath}">
								<%WCMMode prevMode = WCMMode.DISABLED.toRequest(request);%>
								<sling:include path="${pageprops.navpath}" />
								<%prevMode.toRequest(request);%>
						    </c:if>
						</li>
					</c:if>
				</c:forEach>
			</ul>
		</div>
	</div>
	<c:if test="${selectorString!= 'excludetop'}">
		<cq:include path="${currentDesign.path}/jcr:content/breadcrumbpar" resourceType="hdscorp/components/content/breadcrumb" />
	</c:if>
</div>

<!-- HEADER ENDS HERE -->