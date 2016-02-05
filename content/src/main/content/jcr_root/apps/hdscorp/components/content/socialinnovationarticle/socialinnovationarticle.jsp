<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.articlereadbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("linkUrl").toString())%>" />
</c:if>


<c:choose>
	<c:when test="${not empty properties.articletitle}" >

           <div class="social-innovation-article clearfix" style="background-image:url('${properties.articlebackgroundimage}');">
                <div class="content-container">
                    <div class="col-sm-offset-2 col-sm-8 col-no-pad">
                        <h3>${properties.articletitle}</h3>
                        <div class="si-article-content clearfix">
                            <div class="icon col-sm-2"><img src="${properties.articleiconpath}" alt="" title=""></div>
                            <div class="desc col-sm-10 col-no-pad">${properties.articledescription}</div>
                        </div>                        
                    </div>
                    <div class="col-sm-offset-4 col-sm-4 col-no-pad">
                        <div class="btn-square-white si-article-more">
                            <a href="${linkUrl}" target="${properties.articlereadbuttonurlopeninnew?'_blank':'_self'}">${properties.articlereadbuttonlabel}</a>
                        </div>
                    </div>
                </div>
            </div>

	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Social Innovation Article Component </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>
