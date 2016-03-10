<%--

  footerwrapper component.

  Component to decide number of columns in footer

--%>
<%
%><%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>
	
    	<div class="footer">

			<cq:include path="contactusipar" resourceType="foundation/components/iparsys" /> 
       		
    		<div class="footer-gray">
    			<div class="footer-container content-container container-fluid">
    			<cq:include path="globalfooteripar" resourceType="foundation/components/iparsys" />    			    				    			
    			</div>
    		</div>
    		<div class="footer-white">
    			<div class="footer-container content-container container-fluid">  			
    			<cq:include path="corporatefooteripar" resourceType="foundation/components/iparsys" /> 				
    			</div>	
    		</div>
    	</div>

		<cq:include path="${currentDesign.path}/jcr:content/globalfooter/returntotop" resourceType="hdscorp/components/content/footer/returntotop" />

	