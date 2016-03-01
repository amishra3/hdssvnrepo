<%--
  Services Detail Cloud Services Quote Component.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.quoteheadline}">

    <div class="managed-cloud-services background-img services-det-bg1 clearfix" style="background-image:url('${properties.quotebackgroundimage}');">
    <div class="managed-cloud-services-container">
        <h2 class="headline">${properties.quoteheadline}</h2>
       <p> <span class="sprite icon-quote open-quote"></span>${properties.quotecontent}<span
				class="sprite icon-quote close-quote"></span></p>

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