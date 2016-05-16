    <%--
    
      FacebookFeed component component.
    --%>
    <%@include file="/apps/foundation/global.jsp"%>
    <%@page session="false" %>

    <sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.FacebookFeedModel" var="facebookFeedModel" />


  <div class="stay_touch_container" style="background-image: url('${properties.fbbgimage}')">
        <div class="content-container">
        <div class="col-md-12"><div class="top-heading">${facebookFeedModel.title}</div></div>
        <div class="stay-inner-coloum">

 <c:forEach items="${facebookFeedModel.facebookFeedData}" var="facebookFeed" varStatus="feedStatus">
 <div class="col-sm-4">
    <div class="comment_box">
     <div class="icon"><img src="${facebookFeedModel.iconPath}" alt="" title=""></div>
     <div class="type">${facebookFeedModel.facebookPostLabel} ${facebookFeed.createdDate}</div>

          <c:set var='facebookHREFLink' value='<a href="${facebookFeed.link}" target="_blank">${facebookFeed.link}</a>'/>         
         <c:set var='title' value='${fn:replace(facebookFeed.tilte,facebookFeed.link,facebookHREFLink)}'/>   
         
           <c:choose>
          <c:when test="${fn:length(title)>235}">
              <c:set var='title' value='${fn:substring(title, 0, 130)}...'/>                
            </c:when>
            <c:otherwise>
 				<c:set var='title' value='${title}'/>   
            </c:otherwise>
        </c:choose>      
         
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
        <div class="links"><a href="https://www.facebook.com/${facebookFeedModel.searchPost}/posts/${facebookFeed.postId}" target="_blank">${facebookFeedModel.ctaLabel}<span class="glyphicon glyphicon-new-window animateIcon"></span></a>
        </div></div></div>



      </c:forEach>
    </div>
<cq:include path="sociallinksconfig" resourceType="/apps/hdscorp/components/content/sociallinksconfig" />
        </div>
        </div>

