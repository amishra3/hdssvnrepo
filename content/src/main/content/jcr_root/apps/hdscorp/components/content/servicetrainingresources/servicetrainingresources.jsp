<%--

  Training Resources component.

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>




<c:set var="resourceList" value="<%=PageUtils.convertMultiWidgetToList(properties,"strmbackgroundimage-strmsectiontitle-strconent-strlinklabel-strlink-stropeninnewwindow")%>" />




   <div class="training-resources clearfix" style="background-image: url('${properties.strbackgroundimage}')">
						<div class="content-container clearfix" >
						<h2>${properties.strsectiontitle}</h2>


						<div class="col-sm-12"> 
                          <c:forEach items="${resourceList}" var="multifieldData">
							<div class="col-sm-4 no-padding">
								<div class="train-resrcprdct-bx">
									<div class="imageHolder"><img alt="" src="${multifieldData.strmbackgroundimage}" class="img-responsive"></div>
									<div class="prdct-inner">
										<h3>${multifieldData.strmsectiontitle}</h3>
										<p>${multifieldData.strconent}</p>

<c:choose>
	<c:when test="${multifieldData.stropeninnewwindow=='1'}">

<p><a href="${multifieldData.strlink}" class="animateLink" target="_blank">${multifieldData.strlinklabel} <span class="glyphicon glyphicon-share animateIcon" aria-hidden="true"></span></a></p>
</c:when>
<c:otherwise>
<p><a href="${multifieldData.strlink}" class="animateLink">${multifieldData.strlinklabel} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a></p>
	</c:otherwise>
</c:choose>

									</div>
								</div>
							</div>
							  </c:forEach>
							
						</div>	
						</div>
					</div>