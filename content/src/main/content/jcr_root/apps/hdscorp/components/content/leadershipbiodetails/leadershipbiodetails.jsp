<%--

  Leadership BIO details component component.

  Leadership BIO details component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<h1> LeaderShip BIO Details Component </h1>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.LeaderShipBIODetailsModel" var="leaderShipBIODetailsModel" />

BIO Image:  ${leaderShipBIODetailsModel.lbdimage} <br>

<img src="${leaderShipBIODetailsModel.lbdimage}" /><br>

BIO Title:  ${leaderShipBIODetailsModel.lbdTitle} <br>

BIO Job Title:  ${leaderShipBIODetailsModel.lbdJobTitle} <br>

BIO Location:  ${leaderShipBIODetailsModel.lbdJobLocation} <br>

BIO Twitter Follow URL:  ${leaderShipBIODetailsModel.lbdTwiterFollowURL} <br>

BIO Facebook URL:  ${leaderShipBIODetailsModel.lbdFacebookFollowURL} <br>

BIO Linkedin URL:  ${leaderShipBIODetailsModel.lbdLinkedinFollowURL} <br>

BIO Content:  ${leaderShipBIODetailsModel.lbdContent} <br>

BIO Follow Label (Default to Follow):  ${currentStyle.lbdfollowlabel} <br>


BIO View ALL link Label:  ${currentStyle.lbdviewalllinklabel} <br>

BIO View ALL link URL:  ${currentStyle.lbdviewalllinkurl} <br>

BIO View ALL link Open in New Window ?:  ${currentStyle.lbdviewalllinkopeninnewwindow} <br>


   <c:choose> 
  <c:when test="${currentStyle.lbdviewalllinkopeninnewwindow == 'on'}">
		<a href="${currentStyle.lbdviewalllinkurl}" target="_blank">${currentStyle.lbdviewalllinklabel}</a>
     </c:when>
  <c:otherwise>
	<a href="${currentStyle.lbdviewalllinkurl}">${currentStyle.lbdviewalllinklabel}</a>
  </c:otherwise>
</c:choose>
