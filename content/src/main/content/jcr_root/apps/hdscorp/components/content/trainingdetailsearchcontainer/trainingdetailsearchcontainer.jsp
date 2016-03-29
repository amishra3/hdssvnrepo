<%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>

<!--pls use below as per requirement
{lmsDataModel.noOfItemsShown}
{lmsDataModel.noResultsMsg}
{lmsDataModel.loadMoreLabel}
-->
<c:set var="searchlookuppath" value="${properties.tdsearchlookuppath}" scope="request"/>
<c:set var="noOfItemsShown" value="${properties.tdnoofitemsshowinpage}" scope="request"/>
<c:set var="noResultsMsg" value="${properties.tdnoresultsfoundmsg}" scope="request"/>
<c:set var="loadMoreLabel" value="${properties.tdloadmorelabel}" scope="request"/>
<c:set var="dateLabel" value="${properties.tddatelabel}" scope="request"/>
<c:set var="locationLabel" value="${properties.tdlocationlabel}" scope="request"/>
<c:set var="durationLabel" value="${properties.tddurationlabel}" scope="request"/>
<c:set var="languageLabel" value="${properties.tdlanguagelabel}" scope="request"/>

<sling:adaptTo adaptable="${slingRequest}" adaptTo="com.hdscorp.cms.slingmodels.LMSDataModel" var="lmsDataModel" />



<div class="col-md-9" id="contentCatagory">
   <c:forEach items="${lmsDataModel.maplmsBeanList}" var="lmsmapList" varStatus="lmsStatus">
      <div class="result-product training-result">
         <div class="category-heading hidden-xs hidden-sm">
            <h2>${lmsmapList.key} </h2>
         </div>
         <div class="tab-content current">
            <div class="category-products-listing">
               <c:forEach items="${lmsmapList.value}" var="listLMSObject" varStatus="lmsStatus">
                   <c:set var="country" value="${fn:replace(listLMSObject.iltFacilityCountry,' ', '')}"/>
                   <div class="result-section" filter="show" data-country="${fn:toLowerCase(country)}">
                     <h3> <a href="javascript:void(0)">${listLMSObject.trainingTitle} <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a></h3>
                     <ul>
                        <li>${lmsDataModel.dateLabel} ${listLMSObject.trainingStartDate}</li>
                        <li>${lmsDataModel.locationLabel} ${listLMSObject.location}</li>
                        <li>${lmsDataModel.durationLabel} ${listLMSObject.duration}</li>
                        <li>${lmsDataModel.languageLabel} ${listLMSObject.language}</li>
                     </ul>
                  </div>
               </c:forEach>
            </div>
         </div>
      </div>
   </c:forEach>
   <div class="btn-square-red result-btn">
      <a href="javascript:void(0);" title="Load More">${lmsDataModel.loadMoreLabel}</a>
   </div>
</div>