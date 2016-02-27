<%--  
  <footer.jsp>
  ==============================================================================
  Section which includes branded footer area and global footer links.
  ==============================================================================
--%>
<%@include file="/apps/foundation/global.jsp"%>

    	
<cq:include path="${currentDesign.path}/jcr:content/globalfooter" resourceType="hdscorp/components/content/footer/footerwrapper"/>
<cq:include path="cloudservices" resourceType="cq/cloudserviceconfigs/components/servicecomponents"/> 

<cq:includeClientLib js="hdscorp.main"/> 
<!-- includeClientLib is not loading the JS lib and that is why doing it conventionally-->
<!-- <script type="text/javascript" src="/etc/clientlibs/hdscorp/main.js"></script> -->

<div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="plan-info" aria-hidden="true">
    <div class="modal-dialog modal-full-screen">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <span class="glyphicon glyphicon-remove-circle"></span>
                </button>
            </div>
            <div class="modal-body">
                <!-- /# content goes here -->
            </div>
        </div>
    </div>
</div> 