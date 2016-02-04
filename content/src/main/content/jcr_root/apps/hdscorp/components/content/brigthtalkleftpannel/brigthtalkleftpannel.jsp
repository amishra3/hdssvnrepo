
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.BrightTalkLeftNavModel" var="brightTalkLeftNavModel" />







 <ul>
  <li class="active">
<a data-catagory="${brightTalkLeftNavModel.btlpfeaturedlabel}" title="${brightTalkLeftNavModel.btlpfeaturedlabel}" class="active" href="javascript:void(0);">${brightTalkLeftNavModel.btlpfeaturedlabel}<span class="icon-accordion-closed hidden-md hidden-lg"></span>
<span class="icon-accordion-opened hidden-md hidden-lg"></span></a>
<div class="MobileHolderWrapper"></div>
</li>

<c:forEach items="${brightTalkLeftNavModel.featuredTag}" var="featuredTag">
<c:forEach items="${featuredTag}" var="featureTag">
<c:forEach items="${featureTag.value}" var="tagResults" varStatus="tagStatus">
<c:choose>
<c:when test="${tagStatus.index== 0}">
     <c:set var='tagslist' value='${tagResults.tagId}' /> 
      <c:set var='tagsNamelist' value='${tagResults.tagName}' /> 
                   </c:when>
                  <c:otherwise>
	 <c:set var='tagslist' value='${tagslist},${tagResults.tagId}' /> 
      <c:set var='tagsNamelist' value='${tagsNamelist},${tagResults.tagName}' /> 
                   </c:otherwise>
               </c:choose>
                </c:forEach>
           <li>
<a data-catagory="<c:out value='${tagsNamelist}' />" title="${eventTag.key}" href="javascript:void(0);">${featureTag.key}<span class="icon-accordion-closed hidden-md hidden-lg"></span><span class="icon-accordion-opened hidden-md hidden-lg"></span></a><div class="MobileHolderWrapper"></div>
</li>

           </c:forEach>
	</c:forEach>

</ul>