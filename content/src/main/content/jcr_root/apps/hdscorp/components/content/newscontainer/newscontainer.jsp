<%@page import="com.day.cq.wcm.api.Page"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>


<sling:adaptTo adaptable="${slingRequest}"
	adaptTo="com.hdscorp.cms.slingmodels.NewsContainerModel" var="model" />

<div class="pr-list">                    
                <div class="row pr-list-container">
                    <h2>${model.pressReleasesText}</h2>
                    <div class="pr-search">
                        <input type="text" name ="fulltext" placeholder="${model.searchPressReleasesText}">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </div>
                    <div class="col-md-3 pr-list-archives">
                        <ul id="asideLinks">
                        <c:forEach var="filterUrl" items="${model.filterUrls}" varStatus="loopcnt">
                            <li class="linkLeft">
                                <a href="javascript:void(0);" data-loadhtml="${filterUrl.filterUrl}">
                                ${filterUrl.filterText}
                                <span class="icon-accordion-closed hidden-md hidden-lg"></span>
                                <span class="icon-accordion-opened hidden-md hidden-lg"></span>
                                </a>
                                <div class="MobileHolderWrapper"></div>
                            </li>
                            </c:forEach>
                          </ul>
                    </div>
                    <!-- Press Release List Content to Loaded here -->
                    <div id="contentCatagory"></div>
                </div>
            </div>






