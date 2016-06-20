<%--
  Carrer video carousel Component component.
--%>
<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<c:set var="carrerVideocarousel" value="<%=PageUtils.convertMultiWidgetToList(properties,"carrertitle-carrerbannerdescription-carrerbannerimagepath-carrervideoiconpath-carrervideoembededcode-ctalabel-ctatargeturl-openinnewwindow-carrerbutton-mobileimage-voverlay-newwin")%>" />    
<c:set var="carrerCarosuelTitles" value="<%=PageUtils.convertMultiWidgetToList(properties,"carrerpagebartitle")%>" />    

<div class="bannerCarsoul clearfix" id="bannerCarsoul">
                <!--Banner Carsoul Starts here-->
                <div class="caroufredsel_wrapper" style="display: block; text-align: start; float: none; position: relative; top: auto; right: auto; bottom: auto; left: auto; z-index: auto; width: 1349px; height: 705px; margin: 0px; overflow: hidden;"><div id="careerHeroBanner" style="text-align: left; float: none; position: absolute; top: 0px; right: auto; bottom: auto; left: 0px; margin: 0px; width: 9443px; height: 705px; z-index: auto; opacity: 1;">

                    <c:forEach var="carrerVideocarousel" items="${carrerVideocarousel}">
						<c:set var="vurl" value="${carrerVideocarousel.carrervideoembededcode}" />
                        	<c:if test="${not empty carrerVideocarousel.carrervideoembededcode}">
                              <c:set var="vid" value="${carrerVideocarousel.carrervideoembededcode}" />
                                <c:set var="vidurl" value="hds.resourceLib._openvideooverlayById(${vid});"/>
                             </c:if>

 <%--<div class="bannerSectionImage sara" id="sara" style="background-image:url('${carrerVideocarousel.carrerbannerimagepath}'); background-repeat: no-repeat;">--%>
          <div class="bannerSectionImage sara rsImg" id="sara" ${hdscorp:bgImgAtrr(carrerVideocarousel.carrerbannerimagepath,carrerVideocarousel.mobileimage)}; background-repeat:no-repeat;>
     
                        <div class="content-container hero-content-career">
                            <div class="col-md-4 playVideoBox col-md-push-8">
                                <a href="${carrerVideocarousel.voverlay==1?'javascript:void(0);':vurl}" onclick="${carrerVideocarousel.voverlay==2?'':vidurl}" target="${carrerVideocarousel.newwin==1?'_blank':'_self'}" ><img src="${carrerVideocarousel.carrervideoiconpath}" alt="" data-pin-nopin="true">${carrerVideocarousel.newwin==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
                            </div>
                            <div class="col-md-8 col-md-pull-4">
                                <h2>${carrerVideocarousel.carrertitle}</h2>
                                <p>${carrerVideocarousel.carrerbannerdescription}</p>
                                	    	<c:if test="${not empty carrerVideocarousel.carrerbutton}">
                                            <div class="btn-square-white learn-more-white-link watchVideoBtn request">
                                                <a href="${carrerVideocarousel.voverlay==1?'javascript:void(0);':vurl}" onclick="${carrerVideocarousel.voverlay==2?'':vidurl}" target="${carrerVideocarousel.newwin==1?'_blank':'_self'}">${carrerVideocarousel.carrerbutton}${carrerVideocarousel.newwin==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':''}</a>
                                            </div>
                                        </c:if>
                            </div>
                        </div>

                    </div>
                    </c:forEach>
                    </div></div>
                <div class="PagerBar" id="pageBar">
                    <div class="content-container">

      <c:if test="${fn:length(carrerCarosuelTitles)>1}">
<c:forEach var="carrerCarosuelTitle" items="${carrerCarosuelTitles}">
<div class="col-md-2 smMobile">
      <a href="javascript:void(0);" class="name">${carrerCarosuelTitle.carrerpagebartitle}</a>
 </div>

</c:forEach>

      </c:if>

                        </div>

                    </div>
                <!--Banner Carsoul ends here-->
            </div>