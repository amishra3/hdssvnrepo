    <%--
    
      FacebookFeed component component.
    --%>
    <%@include file="/apps/foundation/global.jsp"%>
    <%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils,java.util.List,com.hdscorp.cms.constants.ServiceConstants,org.apache.sling.commons.json.JSONArray, org.apache.sling.commons.json.JSONObject"%>    

    <sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.FacebookFeedModel" var="facebookFeedModel" />




<%

String facebookResponse=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.FacebookSheduler","facebook.storage.path"),ServiceConstants.SAVE_FB_FEED_DATA_PROPERTY_NAME );
JSONArray jsonArrayFacebookResponse = new JSONArray(facebookResponse);
pageContext.setAttribute("facebookFeedlist",PageUtils.jsonArraytoList(jsonArrayFacebookResponse));
String pageId=PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.FacebookSheduler","facebook.searchpost");
pageContext.setAttribute("pageId",pageId);
%>




  <div class="stay_touch_container" style="background-image: url('${properties.fbbgimage}')">
        <div class="content-container">
        <div class="col-md-12"><div class="top-heading">${facebookFeedModel.title}</div></div>
        <div class="stay-inner-coloum">

 <c:forEach items="${facebookFeedlist}" var="facebookFeed" varStatus="feedStatus">
 <div class="col-sm-4">
    <div class="comment_box">
     <div class="icon"><img src="${facebookFeedModel.iconPath}" alt="" title=""></div>
     <div class="type"> FACEBOOK POST ${facebookFeed.createdDate}</div>

          <c:set var='facebookHREFLink' value='<a href="${facebookFeed.link}" target="_blank">${facebookFeed.link}</a>'/>         
         <c:set var='title' value='${fn:replace(facebookFeed.tilte,facebookFeed.link,facebookHREFLink)}'/>    
       <div class="description">${title}</div>
            <c:if test="${not empty facebookFeed.thumbnail}">
  					<div class="post-img"><img src="${facebookFeed.thumbnail}"></div>
            </c:if>
        <c:choose>
          <c:when test="${fn:length(facebookFeed.message)>235}">
              <c:set var='message' value='${fn:substring(facebookFeed.message, 0, 235)}...'/>                
            </c:when>
            <c:otherwise>
 				<c:set var='message' value='${facebookFeed.message}'/>   
            </c:otherwise>
        </c:choose>      
        <div class="inner-comment">${message}</div>
        <div class="links"><a href="https://www.facebook.com/${pageId}/posts/${facebookFeed.postId}" target="_blank">Like/Share/Comment CTA<span class="glyphicon glyphicon-new-window animateIcon"></span></a>
        </div></div></div>



      </c:forEach>
    </div>
<cq:include path="sociallinksconfig" resourceType="/apps/hdscorp/components/content/sociallinksconfig" />
        </div>
        </div>

