<%--  
  <footer.jsp>
  ==============================================================================
  Section which includes branded footer area and global footer links.
  ==============================================================================
--%>
<%@include file="/apps/foundation/global.jsp"%>

    	
<cq:include path="globalfooter" resourceType="hdscorp/components/content/footer/footerwrapper"/>
<cq:include path="cloudservices" resourceType="cq/cloudserviceconfigs/components/servicecomponents"/>
<c:set var="analyticsinfooter" value="<%= pageProperties.getInherited("analyticsinfooter", "") %>" />
<c:set var="clientlibanalytics" value="<%= pageProperties.getInherited("clientlibanalytics", "hdscorp.analytics") %>" /> 
<c:set var="jsmainclientlib" value="<%= pageProperties.getInherited("jsmainclientlib", "hdscorp.main") %>" />

<cq:includeClientLib js="${jsmainclientlib}"/> 

<c:if test="${not empty analyticsinfooter}">
	<cq:include script="headeranalytics.jsp"/>
</c:if>

<cq:include script="dtmsetup.jsp"/>
<cq:includeClientLib js="${clientlibanalytics}"/>

<div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="plan-info" aria-hidden="true">
    <div class="modal-vertical-align-section">
    <div class="modal-dialog modal-full-screen modal-vertical-align-center">
        <div class="modal-content">
            <div class="modal-header">
                <div class="title" id="modalValProp"></div>
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





