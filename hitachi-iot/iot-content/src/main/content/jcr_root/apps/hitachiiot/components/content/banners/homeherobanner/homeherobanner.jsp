<%--
  Homepage Hero Banner component.
--%>

<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="viewlinkUrl" value="${properties.viewalllinkurl}" />

<c:if test="${fn:startsWith(viewlinkUrl,'/content/')}">
	<c:set var="viewlinkUrl" value="${hdscorp:shortURL(viewlinkUrl)}" />
</c:if>



		
	  <div class="iot-hero clearfix rsImg" style="background-image: url();" ${hdscorp:bgImgAtrr(properties.heroimagePath,properties.heromobileimage)}>
       <div class="iot-hero-container content-container">
        <h1 class="headline col-md-7">Hitachi Internet of Things (IoT)</h2>
        
        <h4 class="sub-headline col-md-7">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </h4>

        <div class="features col-md-7">
            <div class="button-wrapper">
                <a href="#" class="btn-square-features cities">SMART CITIES</a>
            </div>
            <div class="button-wrapper">
                <a href="#" class="btn-square-features industry">SMART INDUSTRY</a>
            </div>
            <div class="button-wrapper">
                <a href="#" class="btn-square-features energy">SMART ENERGY</a>
            </div>
        </div>

        <div class="features col-md-7">
            <a href="#" class="btn-square-clear platform ">OUR PLATFORM</a>
        </div>
    </div>
</div>
