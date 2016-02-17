<%--

  Carrer Hitachi Sprit Hex Component component.

  This is Carrer Hitachi Sprit Hex Component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.CarrerHitachiSpiritHexagonModel" var="carrerHitachiSpiritHexagonModel"/>

<div class="hitachi-spirit-hexagon clearfix" style="background-image: url('${carrerHitachiSpiritHexagonModel.chsBackgroundImage}')">
                <div class="content-container">
                    <h2>${carrerHitachiSpiritHexagonModel.chsTitle}</h2>
                    <div class="col-sm-8 col-sm-offset-2">
                        <p>${carrerHitachiSpiritHexagonModel.chsDescription}</p>
                    </div>
                </div>
                <div class="hitachi-spirit-hexagon-list">
                    <div class="content-container">
                        <div class="col-sm-10 col-sm-offset-1 col-no-pad hex-contain clearfix">

                            <c:forEach items="${carrerHitachiSpiritHexagonModel.chsHexagonList}" var="chsHexagonList" varStatus="multfieldStatus">

    				<c:forEach items="${chsHexagonList}" var="chsHexagonObject" varStatus="multiStatus">

                            <div class="hexagon320">
                                <h4>${chsHexagonObject.key}</h4>
                                    ${chsHexagonObject.value}
                            </div>

                </c:forEach>
				</c:forEach>

                        </div>
                    </div>
                </div>
            </div>