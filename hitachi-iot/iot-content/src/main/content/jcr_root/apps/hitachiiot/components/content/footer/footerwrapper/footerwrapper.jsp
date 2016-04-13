<%--
  IOT footerwrapper component.
--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>

<div class="footer">
    <div class="footer-white">
      <cq:include path="${currentDesign.path}/jcr:content/globalfooter/returntotop" resourceType="hdscorp/components/content/footer/returntotop" />
      <div class="footer-container content-container container-fluid">
        

       

        <cq:include path="globalfooteripar" resourceType="foundation/components/iparsys" />

        
        <div class="social-links-desktop">
         
         
            <cq:include path="${currentDesign.path}/jcr:content/globalfooter/footersocialconnect" 
    						resourceType="hitachiiot/components/content/footer/footersocialconnect" />
         
         
        </div>



     <cq:include path="iotcorporatefooteripar" resourceType="foundation/components/iparsys" />
       
      </div>
    </div>
</div>




