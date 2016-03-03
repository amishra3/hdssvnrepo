<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="downloadspectargeturl" value="${properties.downloadspectargeturl}" />
<c:if test="${fn:startsWith(downloadspectargeturl,'/content/')}">
	<c:set var="downloadspectargeturl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("downloadspectargeturl").toString())%>" />
</c:if>


	<div class="spec-container container-fluid">
              <div class="spec-title hidden-xs">
                  ${properties.sectiontitle}<br>${properties.sectionsubtext}
                  <div class="spec-download-pdf">
                    <p><a class="animateLink" href="${downloadspectargeturl}" target="${properties.downloadspeclinkopeninnew?'_blank':'_self'}">${properties.downloadspeclinklabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></p>
                  </div>
              </div>

			<!--TECH SPEC TABLE START--> 

              <div class="row">
			  		<cq:include path="techspecpar" resourceType="hdscorp/components/content/productdetailtechspecs" />
			  </div>
			<!--TECH SPEC TABLE END-->

			 <div class="vsp-soft-products">
			 	<cq:include path="techspeccontentpar" resourceType="hdscorp/components/content/productdetailtechspecaccordincontent" />
			 </div>

          </div>
          
