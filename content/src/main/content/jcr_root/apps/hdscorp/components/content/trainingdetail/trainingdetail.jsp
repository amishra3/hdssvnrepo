<%--

  Training Detail Component component.

  This is Training Detail Component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="locations"
value="<%=PageUtils.convertMultiWidgetToList(properties,"tdlocationid-tdlocationlabel")%>" />

<div class="Container-Results container-fluid overRideRight">
<div class="col-md-3 product-listing">
                            <ul id="asideLinks-product">
                                <li class="">
                                    <a data-href="#" href="javascript:void(0);">
                                    ${properties.tdalltraininglabel}
                                    </a>
                                </li>
                                <li class="active">
                                    <a data-href="#" href="javascript:void(0);">
                                    ${properties.tdsearchbylocationlabel}
                                    <span data-toggle="collapse" class="icon-accordion-closed" style="display: none;"></span>
                                    <span data-toggle="collapse" class="icon-accordion-opened" style="display: inline-block;"></span>
                                    </a>
                                     <ul style="display: block;">
                                        <c:forEach var="location" items="${locations}" varStatus="count">
										<li>
                                            <div class="checkbox">
                                                <input type="checkbox" value="common:product&amp;solutions/storage/cloudstorage" id="cloudStorage" name="cbxFunction" class="filters">
                                                <label class="hds-icon" for="cloudStorage"><span>${location.tdlocationlabel}</span></label>
                                            </div>
                                        </li>
                                        </c:forEach>
                                    </ul>
                                    <div class="MobileHolderWrapper"></div>
                                </li>

                            </ul>
                        </div>

  <sling:include path="${properties.searchpagepath}.html"/>
</div>
</div>
</div> <!--main end-->
