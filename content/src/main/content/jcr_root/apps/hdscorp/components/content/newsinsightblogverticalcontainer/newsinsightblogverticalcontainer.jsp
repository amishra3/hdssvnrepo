<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page session="false" %>


<c:set var="newinsightBlogList" value="<%=PageUtils.convertMultiWidgetToList(properties,"nilesectionlabel-nilesectionlink-nileopeninnewwindow-nithirdparty")%>" />


 <div class="explore-insight">
          <div class="explore-insight-container container-fluid">
					<div class="row">
<c:forEach items="${newinsightBlogList}" var="newinsightBlog" varStatus="newsinsightfieldStatus">


    <div class="container-fluid">
									<c:choose>
                                          <c:when test="${newinsightBlog.nithirdparty == '1'}"> 
                                            <h2><a href="${newinsightBlog.nilesectionlink}" target="_blank" class="animateLink"> ${newinsightBlog.nilesectionlabel}<span aria-hidden="true" class="glyphicon glyphicon-new-window"></span></a></h2>
										</c:when>
                                        <c:when test="${newinsightBlog.nileopeninnewwindow == '1'}"> 
                                            <h2><a href="${newinsightBlog.nilesectionlink}" target="_blank" class="animateLink"> ${newinsightBlog.nilesectionlabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
										</c:when>
										<c:otherwise>
                                            <h2><a href="${newinsightBlog.nilesectionlink}" class="animateLink">${newinsightBlog.nilesectionlabel}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a></h2>
									   </c:otherwise>
									</c:choose>
						</div>

    					<div class="col-sm-6">    
							<cq:include path="newsandinsightfirst${newsinsightfieldStatus.count}" resourceType="foundation/components/parsys" />
					    </div>
						 <div class="col-sm-6"> 
							<cq:include path="newsandinsightsecond${newsinsightfieldStatus.count}" resourceType="foundation/components/parsys" />
						</div>

</c:forEach>

					</div>
			</div>
 </div>                         

