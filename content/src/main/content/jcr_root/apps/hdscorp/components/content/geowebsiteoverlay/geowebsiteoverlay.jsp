<%@include file="/apps/foundation/global.jsp" %>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %><%
%><%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %><%
%><%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %><%
%><%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>


${properties.selectmessagetext}

<c:set var="overlaymap" value="${widgets:getMultiFieldPanelValues(resource, 'overlaymap')}"/>

<c:choose>

    <c:when test="${empty overlaymap}">
        <wcm:placeholder classNames="cq-dl-placeholder cq-block-placeholder"/>
    </c:when>

    <c:otherwise>
        <dl>
            <c:forEach items="${overlaymap}" var="overlaymapval">
						<c:set var="nwin" value="${overlaymapval.gwoopeninnewwindow}"/>
                			<c:choose>
                            <c:when test="${fn:contains(nwin, 'true')}">
                                <c:set var="nwin" value="_blank"/>
                            </c:when>
                            <c:otherwise>
                               <c:set var="nwin" value="_self"/>
                            </c:otherwise>
                        </c:choose>

                <a href="${overlaymapval.gwotargeturl}" target="${nwin}">
				${overlaymapval.gwocountryname}</a>
				<div><img alt="${overlaymapval.gwoiconimagealttext}" title="${overlaymapval.gwocountryname}" src="${overlaymapval.gwoflagimage}"></div>

				</c:forEach>
        </dl>
    </c:otherwise>

</c:choose>