
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>


	
	<div class="common-hero-short-banner clearfix" style="background-image:url('${properties.backgroundimgpath}');">
        <div class="content-container">
            <div class="col-lg-7 col-sm-7 col-xs-12">
                <div class="top-banner-heading">${properties.resourcelabel}</div>
                <h4 class="sub-headline">${properties.signupmessagetext}</h4>
            </div>
            <div class="col-lg-5 col-sm-5 col-xs-12">
                <div class="res-subscribe">
                    <input type="text" placeholder="${properties.entermailidtext}">
                </div>
                <div class="res-subscribe-btn">
                    <div class="btn-square-white">
                        <a href="javascript:void(0)" title="LEARN MORE">${properties.learnmorelabel}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>