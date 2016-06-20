<%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>

<c:choose>
	<c:when test="${not empty properties.dtdmbannertitle}">
         <div class="dt-mobility-banner clearfix rsImg" ${hdscorp:bgImgAtrr(properties.dtdmbgimage,properties.dtdmmbbgimage)} > 
                <div class="content-container container-fluid">
                        <div class="col-sm-6 col-xs-12 col-no-pad">
                           <h1 class="top-banner-heading">${properties.dtdmbannertitle}</h1>      
                    </div>
				 </div>
             </div>
        </c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure DataManagement banner </span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>