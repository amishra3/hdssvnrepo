<%--

  News Insights Big Tile Component component.

  This is news insights big tile component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="java.util.Map"%>
<%@page import=" org.apache.sling.api.resource.*,
 org.apache.sling.api.scripting.*,
 org.apache.sling.jcr.api.*,
 javax.jcr .*,
 java.lang.String.*,com.day.cq.wcm.api.*,org.apache.sling.api.resource.*"%>

 <%@page import="java.util.Date"%>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.NewsVerticalExplorerModel" var="newsVerticalExplorer" />



   <div class="pr-common-box hidden-xs hidden-sm">
                                <div class="icon">
                                    <img src="${newsVerticalExplorer.iconImagePath}" alt="" title="">
                                </div>
                                <div class="type">${newsVerticalExplorer.iconImageLabel} ${newsVerticalExplorer.newsInsightExplorer.pubDate}</div>
                                <div class="description">${newsVerticalExplorer.newsInsightExplorer.title}</div>
                                <div class="read-more">
                                    <c:choose>
                                        <c:when test="${newsVerticalExplorer.openinnewwindow}">
									 <a href="${newsVerticalExplorer.targetURL}" target="_blank" class="animateLink">${newsVerticalExplorer.readMoreLabel} <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>
                                        </c:when>
                                        <c:otherwise>
                                        <a href="${newsVerticalExplorer.targetURL}" class="animateLink">${newsVerticalExplorer.readMoreLabel}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
                                        </c:otherwise>
                                    </c:choose>

                                </div>
                            </div>


