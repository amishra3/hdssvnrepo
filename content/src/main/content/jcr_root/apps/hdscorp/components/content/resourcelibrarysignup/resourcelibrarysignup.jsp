
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>


	
	<div class="common-hero-short-banner clearfix" style="background-image:url('${properties.backgroundimgpath}');">
        <div class="content-container">
            <div class="col-lg-6 col-md-12 col-xs-12">
                <h1 class="headline">${properties.resourcelabel}</h1>
                <h4 class="sub-headline">${properties.signupmessagetext}</h4>
            </div>

            <div class="col-lg-6 col-md-12 col-xs-12 resSubscription">
                <iframe src="${properties.formIframeURL}" style="" id="resIframe" scrolling="no"></iframe> 	
            </div>
        </div>
    </div>