<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<c:if test = "${not empty properties.sectionbackground}">
 <c:set var="imgval" value="background-image: url(${properties.sectionbackground})" />
</c:if>


<div class="stop"></div>
<div id="more-enterprise-storage" class="related-products mes-section" style="${imgval}">
 <div class="mes-container container-fluid">
  <h1>${properties.sectiontitle}</h1>
  <h3>${properties.sectionsubtitle}</h3>

  <div class="row row-reduce-half">
   <cq:include path="communitycontentpar" resourceType="hdscorp/components/content/column-control" />
  </div>


 </div>
</div>

