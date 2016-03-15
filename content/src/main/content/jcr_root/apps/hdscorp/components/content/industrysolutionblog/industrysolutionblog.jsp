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
                                               <a href="${blogModel.breadmorelink}" target="${blogModel.bopeninnew==1?'_blank':'_self'}" class="animateAnchor bottomPos text-center">${blogModel.breadmore}${not empty properties.bthirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
                                             </div>
                                              </c:if>



                                    </div>




