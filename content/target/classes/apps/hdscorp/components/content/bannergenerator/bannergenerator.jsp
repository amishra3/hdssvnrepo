<%--

  bannergenerator component.

--%>

<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.rendition.ImageController"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.day.cq.wcm.api.components.DropTarget,com.day.cq.wcm.api.WCMMode"%>

<jsp:useBean id="imgController" class="com.hdscorp.cms.rendition.ImageController" scope="request" />
<jsp:setProperty name="imgController" property="resourceResolver" value="<%= resourceResolver %>" />


<c:choose>
	<c:when test="${empty properties.bannertype}">
        <c:if test="${requestScope['com.day.cq.wcm.api.WCMMode']=='EDIT' || requestScope['com.day.cq.wcm.api.WCMMode']=='DESIGN'}">
			<cq:text value="Configure the Banner Component" tagName="h2"/>
        </c:if>
	</c:when>

	<c:otherwise>

        <c:choose>
            <c:when test="${'homepagesecindarybanner' eq properties.bannertype}">
                <cq:include script="homepagesecindarybanner.jsp" />
            </c:when>

            <c:when test="${'homepageherobanner' eq properties.bannertype}">
                <cq:include script="homeherobanner.jsp" />
            </c:when>
        </c:choose>	
	</c:otherwise>
</c:choose>
