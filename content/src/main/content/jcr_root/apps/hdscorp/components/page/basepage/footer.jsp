<%--  
  <footer.jsp>
  ==============================================================================
  Section which includes branded footer area and global footer links.
  ==============================================================================
--%>
<%@include file="/apps/foundation/global.jsp"%>

    	
<cq:include path="globalfooter" resourceType="hdscorp/components/content/footer/footerwrapper"/>
<cq:include path="cloudservices" resourceType="cq/cloudserviceconfigs/components/servicecomponents"/> 

<cq:includeClientLib js="hdscorp.main"/> 
<!-- includeClientLib is not loading the JS lib and that is why doing it conventionally-->
<!-- <script type="text/javascript" src="/etc/clientlibs/hdscorp/main.js"></script> -->

<cq:include script="dtmsetup.jsp"/>
<cq:includeClientLib js="hdscorp.analytics"/>

<div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="plan-info" aria-hidden="true">
    <div class="modal-vertical-align-section">
    <div class="modal-dialog modal-full-screen modal-vertical-align-center">
        <div class="modal-content">
            <div class="modal-header">
                <div class="title"></div>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  <span class="close"></span>
                </button>
            </div>
            <div class="modal-body">
                <!-- /# content goes here -->
            </div>
        </div>
    </div>
    </div>
</div> 