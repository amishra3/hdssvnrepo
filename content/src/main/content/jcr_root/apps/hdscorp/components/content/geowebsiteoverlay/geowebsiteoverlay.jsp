<%@include file="/apps/foundation/global.jsp" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.GeoSelectorModel" var="geoSelectorModel" />

<body class="geo">
<div class="one-column">
<div class="geo-selc">
<div class="content-container global-sel">
<div class="col-sm-12">
<h2>${properties.geoallregionlabel}</h2>
<div class="close_btn"><img src="images/close-btn.png" alt=""></div>

<ul class="nav nav-pills nav-justified">
<c:forEach var="listReg" items="${geoSelectorModel.regions}" varStatus="loopRegCount">

<c:choose>
        <c:when test="$${loopRegCount.index == 0}">
          <li class="active"><a data-toggle="tab" href="#americans">${listReg.regionLabel}</a></li>
        </c:when>
<c:otherwise>
    <li><a data-toggle="tab" href="#Asia">${listReg.regionLabel}</a></li>
    <c:set var="regionlength" value="${fn:length(geoSelectorModel.regions)}" />
</c:otherwise>

</c:choose>
<c:if test="${loopRegCount.count ==regionlength}">
</ul>
</c:if>
</c:forEach>

<div class="tab-content">

<c:forEach var="listReg" items="${geoSelectorModel.regions}" varStatus="loopRegCount">

<div id="${listReg.regionId}" class="tab-pane fade in active">

     <div class="states-names">
          <div class="col-sm-3 col-no-pad">
               <ul>
                   <c:forEach var="listCout" items="${listReg.countries}" varStatus="looCount">
                  <li><a href="${listCout.countrytargetUrl}">${listCout.countryLabel}</a></li>
                       </c:forEach>
               </ul>
          </div>    
     </div> 

</div>

</c:forEach>

</div>
</div>
</div>
</div>
</div>














