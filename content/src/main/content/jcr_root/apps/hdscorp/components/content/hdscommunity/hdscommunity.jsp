<%--

  HDS Community component.

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="communityList" value="<%=PageUtils.convertMultiWidgetToList(properties,"hccontent-hcmtitle-hclinklabel-hclink-hcopeninnewwindow-hcbackgroundimage")%>" />


  <div class="hds-community-section">
                <div class="hds-community-container container-fluid">
                    <div class="hds-title">${properties.hctitle}</div>
                    <div class="row">

  <c:forEach items="${communityList}" var="multifieldData1">
                        <div class="col-sm-6">
                            <div class="hds-community-blog blog-left" style="background-image:url('${multifieldData1.hcbackgroundimage}');">
                                <div class="hds-community-blog-content">
								<div class="hds-community-blog-title">${multifieldData1.hcmtitle}</div>
    							<div class="hds-community-blog-description">${multifieldData1.hccontent}</div>
                                    <div class="hds-community-blog-more">
                                            <c:choose>
    <c:when test="${multifieldData1.hcopeninnewwindow == '1'}"> 
<a href="${multifieldData1.hclink}" class="animateLink" target="_blank">${multifieldData1.hclinklabel} <span class="glyphicon glyphicon-share animateIcon" aria-hidden="true"></span></a>
               </c:when>
        <c:otherwise>

<a href="${multifieldData1.hclink}" class="animateLink">${multifieldData1.hclinklabel} <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>

                                                </c:otherwise>


</c:choose>
                                    </div>
                                </div>
                            </div>
                        </div>
						
		  </c:forEach>					
                     
                    </div>
                    <div class="hds-community-join hidden-xs">
                            <c:choose>
    <c:when test="${properties.hccomopeninnewwindow}"> 
  <a href="${properties.hcjoinlink}" class="animateLink" target="_blank">${properties.hcjoinlabel}<span class="glyphicon glyphicon-share animateIcon" aria-hidden="true"></span></a>
                </c:when>
        <c:otherwise>
  <a href="${properties.hcjoinlink}" class="animateLink">${properties.hcjoinlabel}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
             </c:otherwise>


	</c:choose>                      
                    </div>
                    
                </div>
            </div>