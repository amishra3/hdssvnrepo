<%--
  Services Detail Promo Banner Component.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.promoheadline}">

    <div class="services-promo-banner promo1 clearfix" style="background-image:url('${properties.promobackgroundimage}')!important;">
    <div class="services-promo-container">
    <div class="col-lg-8 col-md-12 col-xs-12 overRideleft">
        <h2 class="headline">${properties.promoheadline}</h2>
        <p class="sub-text">${properties.promosubtext}</p>
    </div>
    </div>
    </div>

	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Services Detail Promo Banner Component</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>         