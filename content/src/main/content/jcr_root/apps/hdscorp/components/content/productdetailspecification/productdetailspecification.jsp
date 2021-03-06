<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="downloadspectargeturl" value="${properties.downloadspectargeturl}" />
<c:if test="${fn:startsWith(downloadspectargeturl,'/content/')}">
	<c:set var="downloadspectargeturl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("downloadspectargeturl").toString())%>" />
</c:if>


	<div class="spec-container container-fluid">
              <h2 class="section-heading fb-title hidden-xs hidden-sm">
                  ${properties.sectiontitle}
                  <c:if test="${not empty properties.downloadspeclinklabel}">
                      <div class="spec-download-pdf">
                        <p><a class="animateLink" href="${downloadspectargeturl}" target="${properties.downloadspeclinkopeninnew?'_blank':'_self'}">${properties.downloadspeclinklabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></p>
                      </div>
                  </c:if>
              </h2>
			<c:if test="${not empty properties.sectionsubtext}">
                <div class="specs_h2"><h4>${properties.sectionsubtext}</h4></div>
            </c:if>
			<!--TECH SPEC TABLE START--> 
			  		<cq:include path="techspecpar" resourceType="hdscorp/components/content/productdetailtechspecs" />
			<!--TECH SPEC TABLE END-->

			 <div class="vsp-soft-products">
			 	<cq:include path="techspeccontentpar" resourceType="hdscorp/components/content/productdetailtechspecaccordincontent" />
			 </div>

          </div>
          
