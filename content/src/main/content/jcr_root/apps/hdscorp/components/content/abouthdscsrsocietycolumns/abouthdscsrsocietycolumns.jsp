<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="ctalabelurl" value="${properties.ctalabelurl}" />
<c:if test="${fn:startsWith(articleurl,'/content/')}">
	<c:set var="ctalabelurl" value="${hdscorp:shortURL(ctalabelurl)}" />
</c:if>
<c:set var="contentColumn" value="<%=PageUtils.convertMultiWidgetToList(properties,"columntitle-columndescription-columnmagepath-ctalabel-ctalabelurl-openininewwindow")%>" />    
<div class="about-hds-articles">
    <div class="content-container container-fluid">
        <div class="row">
            <c:forEach var="column" items="${contentColumn}" varStatus="loop">
             <c:set var="linkUrl" value="${column.ctalabelurl}"/>
			<c:if test="${fn:startsWith(linkUrl,'/content/')}">
				<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
			</c:if>	
            <div class="col-md-4">
                <div class="about-hds-articles-spotlight spotlight1" style="background-image: url('${column.columnmagepath}');">
                    <div class="spotlight-mobile spotlight1 hidden-md hidden-lg"></div>
                    <div class="spotlight-content">
                        <div class="spotlight-title">${column.columntitle}</div>
                        <div class="spotlight-description">${column.columndescription}</div>
                        <div class="spotlight-more">
                            <a href="${linkUrl}" target="${column.openininewwindow==1?'_blank':'_self'}" class="animateLink">${column.ctalabel}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
                        </div>
                    </div>
                </div>
            </div>  
            </c:forEach>
        </div>
     </div>
</div>