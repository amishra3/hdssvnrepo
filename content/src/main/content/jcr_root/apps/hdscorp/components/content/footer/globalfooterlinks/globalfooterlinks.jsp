<%--

  footerwrapper component.

  Component to decide number of columns in footer

--%>
<%
%><%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>
<c:set var="domain" value="" />
<c:set var="port" value="<%= request.getServerPort() %>" />
<c:if test="${empty port || port == 80}">
	<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />
</c:if>

<c:set var="columns" value="<%=properties.get("columns")%>" />
<c:set var="footerlinksmsg" value="<%= pageProperties.getInherited("footerlinksmsg", "Specify footer columns") %>" />

<c:choose>
	<c:when test="${empty columns}">
        ${footerlinksmsg} 
        </c:when>
	<c:otherwise>
   	
    		
    			
    				<div class="nav-list-container">
	    				<c:forEach var="i" begin="1" end="${columns}" varStatus="status">
	    					<c:set var="path" value="brandedfooter_${i}" />
                            <ul class="nav-list col-sm-6 col-md-3 ${i!=1? 'hide-small': ''}">
	    						<cq:include path="${currentDesign.path}/jcr:content/globalfooter/${path}" 
	    							resourceType="hdscorp/components/content/footer/globalfooter" />
	    					</ul>
	    				</c:forEach>

    				</div>

    				<div class="social">
    				
    					<cq:include path="${currentDesign.path}/jcr:content/globalfooter/footersocialconnect" 
    						resourceType="hdscorp/components/content/footer/footersocialconnect" />

    				</div>
        <a href="${fn:contains(properties.logolinkUrl, 'http')?'':domain}${hdscorp:shortURL(properties.logolinkUrl)}" class="footer-logo"><span class="sprite hitachi-footer-logo"></span></a>
    			
    		
</c:otherwise>
</c:choose>