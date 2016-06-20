<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.simplebannerbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>
<c:if test="${not empty properties.voverlay}">
  <c:set var="vid" value="${properties.simplebannerbuttonurl}" />
    <c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${vid});"/>

 </c:if>
<%-- <div class="common-hero-banner partner-program-banner clearfix" style="background-image: url('${properties.simplebannermagePath}');"> --%>
		<div class="common-hero-banner partner-program-banner  clearfix rsImg"  ${hdscorp:bgImgAtrr(properties.simplebannermagePath,properties.simplebannermobileimagePath)} > 
	              <div class="common-hero-banner-container">
                      <div class="col-lg-6 col-md-6 col-xs-12">
	                  <div class="top-banner-heading">
	                  	  <c:if test="${not empty properties.categoryiconpath}">
	                      		<span class="icon"><img src="${properties.categoryiconpath}"></span>
	                      </c:if>
	                      <c:if test="${not empty properties.categorytitle}">
	                      		<span class="text">${properties.categorytitle}</span>
	                      </c:if>
	                  </div>
	                  <h1 class="headline">${properties.simplebannertitle}</h1>
	                  <h3>${properties.simplebannersubtitle}</h3>
	                  <h4 class="sub-headline">${properties.simplebannercontent}</h4>
	                  <c:if test="${not empty properties.simpllebannerbuttonlabel}">
		                  <div class="btn-square-white learn-more-white-link">
		                      <a href="${properties.voverlay?'javascript:void(0);':linkUrl}" onclick="${!properties.voverlay?'':vidurl}" target="${properties.simplebannerurltargettype?'_blank':'_self'}">${properties.simpllebannerbuttonlabel}${not empty properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
		                  </div>
	                  </c:if>
					</div>
	              </div>
	      </div>

