

<%--Industry Solution Blog  component.--%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.BlogModel" var="blogModel" />


                                    <div class="solution-category-box">
                                        <div class="blog-icon">
                                            <img alt="" src="${blogModel.bimagepath}"> &nbsp; ${blogModel.bautherdetails}
                                        </div>
                                            <h2>${blogModel.btitle}</h2>
                                           ${blogModel.bcontent}

                                     <c:if test="${not empty fn:trim(blogModel.breadmore)}">
                                            <div class="more-solutions">
                                                <c:choose>
							<c:when test="${blogModel.bopeninnew=='1'}">  
						<a href="${blogModel.breadmorelink}" target="_blank" class="animateAnchor bottomPos text-center">${blogModel.breadmore} <span aria-hidden="true" class="glyphicon glyphicon-share animateIcon"></span></a>
						</c:when>
					<c:otherwise>  
 					<a href="${blogModel.breadmorelink}" class="animateAnchor bottomPos text-center">${blogModel.breadmore} <span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></a>
  							</c:otherwise>
							</c:choose>  


                                             </div>
                                              </c:if>



                                    </div>




