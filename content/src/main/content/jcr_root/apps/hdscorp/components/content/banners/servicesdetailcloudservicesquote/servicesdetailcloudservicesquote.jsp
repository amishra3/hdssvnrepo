<%--
  Services Detail Cloud Services Quote Component.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="quotecon" value="${properties.hideqotes}"/>  
<c:set var="quotelength" value="${fn:length(quotecon)}"/> 
<c:choose>
	<c:when test="${not empty properties.quoteheadline}">
<%-- <div class="managed-cloud-services background-img services-det-bg1 clearfix" style="background-image:url('${properties.quotebackgroundimage}');"> --%>
    <div class="managed-cloud-services background-img services-det-bg1 clearfix rsImg" style="background-image: url();" ${hdscorp:bgImgAtrr(properties.quotebackgroundimage,properties.quotebackgroundmobileimage)} > 
    <div class="managed-cloud-services-container">
        <h2 class="headline">${properties.quoteheadline}</h2>
		<c:choose>
            		<c:when test="${quotelength gt 0}">
                        <p>${properties.quotecontent}</p>
                      </c:when>
                      
                      <c:otherwise>
                        <p><span class="sprite icon-quote open-quote"></span>${properties.quotecontent}<span
                                    class="sprite icon-quote close-quote"></span></p>
                      </c:otherwise>
		</c:choose>

    </div>
    </div>

	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Services Detail Cloud Services Quote Component</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>         