<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="seemoreurl" value="${properties.seemoreurl}" />
<c:if test="${fn:startsWith(articleurl,'/content/')}">
	<c:set var="seemoreurl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("articleurl").toString())%>" />
</c:if>

<div class="si-work-today clearfix">
      <div class="content-container">
            <div class="col-sm-12">
               <h3>${properties.socialinovationworktodaytitle}</h3>
            </div>

    <c:set var="contentColumn" value="<%=PageUtils.convertMultiWidgetToList(properties,"socialinovationtilestitle-socialinovationtilesdescription-tilesimagepath-seemorelabel-seemoreurl-seemoreurlopeninnew")%>" />    
			<c:forEach var="column" items="${contentColumn}" varStatus="loop">

                <c:set var="linkUrl" value="${column.seemoreurl}"/>
						<c:if test="${fn:startsWith(linkUrl,'/content/')}">
							<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
						</c:if>	


      <div class="si-work-today-box">
	    <div class="col-sm-6">
            <div class="si-comm-box si-box1" style="background-image: url('${column.tilesimagepath}');">
                <div class="si-comm-box-content">
                     <div class="title">${column.socialinovationtilestitle}</div>
                     <div class="description">${column.socialinovationtilesdescription}</div>

                     <c:if test="${not empty column.seemorelabel}">
                     <div class="read-more">
                       <a class="animateLink" href="${linkUrl}" target="${column.seemoreurlopeninnew==1?'_blank':'_self'}">${column.seemorelabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
                     </div>
                     </c:if>       
                 </div>
             </div>
         </div>
      </div>
                </c:forEach>
   </div>
</div>	

