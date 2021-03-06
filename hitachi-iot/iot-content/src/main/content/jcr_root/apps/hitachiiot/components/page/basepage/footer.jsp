<%--  
  <footer.jsp>
  ==============================================================================
  Section which includes branded footer area and global footer links.
  ==============================================================================
--%>
<%@include file="/apps/foundation/global.jsp"%>

    	
<cq:include path="globalfooter" resourceType="hitachiiot/components/content/footer/footerwrapper"/>
<cq:include path="cloudservices" resourceType="cq/cloudserviceconfigs/components/servicecomponents"/> 

<c:set var="domain" value="<%= pageProperties.getInherited("domain", "") %>" />

<c:set var ="pageUrl" value="<%= currentPage.getPath()%>"/>
<c:set var ="pageUrl" value="${domain}/en-us/home.html"/>
<script>
var pageUrl = '<c:out value="${pageUrl}"/>';

</script>
<cq:includeClientLib js="hdsiot.main"/> 
<!-- includeClientLib is not loading the JS lib and that is why doing it conventionally-->
<!-- <script type="text/javascript" src="/etc/clientlibs/hdscorp/main.js"></script> -->

<cq:include script="dtmsetup.jsp"/>
<cq:includeClientLib js="iot.analytics"/>

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

<% 
	String videooverlaymarkup ="<object class='BrightcoveExperience' id='#videoGuid'><param name='playerID' value='#videoTitleId'><param name='playerKey' value='AQ~~,AAADnJnNnnk~,ltuihYvDjRKL7D7fwmzXgyXNR-vMq9ot'><param name='@videoPlayer' value='#videoTitleId'><param name='isVid' value='true'><param name='isUI' value='true'><param name='dynamicStreaming' value='true'><param name='htmlFallback' value='true'><param name='includeAPI' value='true'><param name='templateLoadHandler' value='onTemplateLoad'><param name='width' value='720'><param name='height' value='455'><param name='showNoContentMessage' value='false' /><param name='secureConnections' value='true' /><param name='secureHTMLConnections' value='true' /><param name='includeAPI' value='true' /><param name='templateLoadHandler' value='myTemplateLoaded' /><param name='linkBaseURL' value='https://wwwstage-revamp.hds.com/en-us/news-insights/resources.html#vid=#videoTitleId'/></object>";
%>
<c:set var="overlaymarkup" value="<%=pageProperties.getInherited("videooverlaymarkup", videooverlaymarkup) %>"/>
     
<div style="display: none;" class="bcobjmarkup">
	${overlaymarkup}
</div>