<%--

  footerwrapper component.

  Component to decide number of columns in footer

--%>
<%
%><%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>

<c:set var="columns" value="<%=properties.get("columns")%>" />


<c:choose>
	<c:when test="${empty columns}">
            Please specify column split for footer links
        </c:when>
	<c:otherwise>
	
	
	
    	<div class="footer">

			<cq:include path="${currentDesign.path}/jcr:content/globalfooter/contactuspromobanner" 
				resourceType="hdscorp/components/content/banners/contactuspromobanner" />
    	
       		
    		<div class="footer-gray">
    			<div class="footer-container content-container container-fluid">
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
    				<a href="#" class="footer-logo"><span class="sprite hitachi-footer-logo"></span></a>
    			</div>
    		</div>
    		<div class="footer-white">
    			<div class="footer-container content-container container-fluid">
    				<cq:include path="${currentDesign.path}/jcr:content/globalfooter/corporatefooter"
								resourceType="hdscorp/components/content/footer/corporatefooter" />
    			
    			</div>
    		</div>
    	</div>

		<cq:include path="${currentDesign.path}/jcr:content/globalfooter/returntotop" resourceType="hdscorp/components/content/footer/returntotop" />

	</c:otherwise>
</c:choose>
