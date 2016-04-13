<%--
  IOT footerwrapper component.
--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>

<div class="footer">

    <cq:include path="contactusipar" resourceType="foundation/components/iparsys" /> 
    <div class="footer-white">
   
      <div class="footer-container content-container container-fluid">
        

       

        <cq:include path="globalfooteripar" resourceType="foundation/components/iparsys" />

        
        <div class="social-links-desktop">
         
         
            <cq:include path="${currentDesign.path}/jcr:content/globalfooter/footersocialconnect" 
    						resourceType="hitachiiot/components/content/footer/footersocialconnect" />
         
         
        </div>



     <cq:include path="iotcorporatefooteripar" resourceType="foundation/components/iparsys" />
       
      </div>
      
      <cq:include path="${currentDesign.path}/jcr:content/globalfooter/returntotop" resourceType="hdscorp/components/content/footer/returntotop" />
    </div>
</div>




