<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<c:if test = "${not empty properties.sectionbackground}">
 <c:set var="imgval" value="background-image: url(${properties.sectionbackground})" />
</c:if>


<div class="stop"></div>
<div id="more-enterprise-storage" class="mes-section" style="${imgval}">
 <div class="mes-container container-fluid">
  <header>${properties.sectiontitle}</header>

  <div class="row row-reduce-half">
   <cq:include path="communitycontentpar" resourceType="hdscorp/components/content/column-control" />
  </div>


 </div>
</div>