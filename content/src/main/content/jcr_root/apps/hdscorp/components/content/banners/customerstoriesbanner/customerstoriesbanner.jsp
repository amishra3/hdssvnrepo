<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>

<c:set var="editbarstyle" value="" />
<wcmmode:edit>
	<c:set var="editbarstyle" value="style='overflow:auto;'" />
</wcmmode:edit>


<c:set var="buttonUrl" value="${properties.viewallctatargeturl}" />

<c:if test="${fn:startsWith(buttonUrl,'/content/')}">
	<c:set var="buttonUrl" value="${hdscorp:shortURL(buttonUrl)}" />
</c:if>


<%--<div class="cs-section" style="background-image: url('${properties.storiesbannermagePath}');">--%>
    <div class="cs-section rsImg" style="background-image: url();" ${hdscorp:bgImgAtrr(properties.storiesbannermagePath,properties.storiesbannermobileimage)} > 
            <div class="cs-container container-fluid">
              <div class="cs-title">${properties.customerstoriessectiontitle}</div>
              <div class="cs-highlight-box">
                <div class="cs-highlight-box-logo">
                  <img src="${properties.contentsectioniconimagepath}">
                </div>
                <div class="cs-highlight-box-hwsw">
                  <span class="hardware">${properties.customerinfotext}</span>
                  <span class="hidden-xs"></span>
                  <span class="software"></span>
                </div>
 				<c:if test="${not empty properties.customerstatementtext}">
                    <div class="cs-highlight-box-message">
                      <span class="sprite icon-quote open-quote"></span>${properties.customerstatementtext}<span class="sprite icon-quote close-quote"></span>
                    </div>
				</c:if>
                <div class="cs-highlight-box-author">
                  <span>${properties.customerstatementauthortext}</span>
                </div>
                <div class="cs-highlight-box-read">
                  <a class="animateLink" href="${properties.readasestudylinktargeturl}" target="${properties.readcasestudylinkopeninnew?'_blank':'_self'}">${properties.readcasestudylinktext}${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                </div>
              </div>



              <div class="cs-selections">
                <!-- row start -->
                <div class="row ${editbarstyle}">
                  <cq:include path="columncontentpar" resourceType="hdscorp/components/content/column-control" />	
                  </div>
                </div>
                <!-- row end -->


              <div class="cs-all">
                <div class="cs-all-box btn-square btn-square-white">
                  <a href="${buttonUrl}" target="_self">${properties.viewallctatext}</a>
                </div>
              </div>
		 </div>
</div>