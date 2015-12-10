
<%@page session="false"%><%--
  Copyright 1997-2008 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  
--%><%@include file="/apps/foundation/global.jsp"%>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.BannerModel" var="myBannerModel" />


<a href="${myBannerModel.viewAllLink}" target="_blank"><img src="${myBannerModel.banner}"  alt="${myBannerModel.altText}" title="${myBannerModel.title}"/></a>


  displaylabel:
 <c:forEach var="window" items="${myBannerModel.displaylabel}">
   <c:out value="${window}"/> 
</c:forEach>

    iconimagepath: 
 <c:forEach var="window" items="${myBannerModel.iconimagepath}">
<c:out value="${window}"/> 
</c:forEach>

    targeturl: 
 <c:forEach var="window" items="${myBannerModel.targeturl}">
<c:out value="${window}"/> 
</c:forEach>

    iconimage: 
 <c:forEach var="window" items="${myBannerModel.iconimage}">
<c:out value="${window}"/> 
</c:forEach>



<c:forEach items="${myBannerModel.industryTab}" var="element"> 
  <tr>
    <td>${element.displaylabel}</td>
    <td>${element.targeturl}</td>
    <td>${element.iconimagepath}</td>
    <td>${element.iconimage}</td>
  </tr>
</c:forEach>







