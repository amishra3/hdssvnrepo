<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<c:set var="ctatargeturl" value="${properties.ctatargeturl}" />
<c:if test="${fn:startsWith(articleurl,'/content/')}">
	<c:set var="ctatargeturl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("ctatargeturl").toString())%>" />
</c:if>


<div class="bannerCarsoul clearfix" id="partnerCarsoul">
        <!--Banner Carsoul Starts here-->
        <div id="partnerHeroBanner">

<c:set var="contentColumn" value="<%=PageUtils.convertMultiWidgetToList(properties,"partnerpagebartitle-bannertitle-bannerdescription-bannerimagepath-ctalabel-ctatargeturl-openinnewwindow")%>" />    
		<c:forEach var="column" items="${contentColumn}" varStatus="loop">

         <c:set var="linkUrl" value="${column.ctatargeturl}"/>
		 <c:if test="${fn:startsWith(linkUrl,'/content/')}">
			   <c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>"/>
		 </c:if>


           <div class="bannerSectionImage" style="background-image:url('${column.bannerimagepath}'); background-repeat: no-repeat;">
                    <div class="content-container hero-content-partner">
                    <div class="col-md-4 partnerLogo col-md-push-8">
                        <a href="javascript:void(0);" class="partnerLogo"></a>
                    </div>
					<c:if test="${not empty column.ctalabel}">
                    <div class="col-md-8 col-md-pull-4">
                        <h2>${column.bannertitle}</h2>
                        <p>${column.bannerdescription}</p>
                        <div class="btn-square-white request call-to-action">
                            <a href="${linkUrl}" target="${column.openinnewwindow==true?'_blank':'_self'}">${column.ctalabel}</a>
                        </div>
                    </div>
					</c:if> 
                </div>
            </div>                   
          </c:forEach>
        </div> 

        <div class="PagerBar" id="partnerpageBar">
            <div class="content-container">
                <c:forEach var="column" items="${contentColumn}" varStatus="loop">
                <div class="col-md-2 smMobile">
                    <a href="javascript:void(0);" class="name">${column.partnerpagebartitle}</a>
                </div>
                </c:forEach>    
            </div>
        </div>
       <!--Banner Carsoul ends here-->
</div>
