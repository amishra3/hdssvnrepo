<%--

  Carrer video carousel Component component.

  Carrer video carousel Component

--%><%
%><%@include file="/libs/foundation/global.jsp"%><%
%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page session="false" %>


<c:set var="carrerVideocarousel" value="<%=PageUtils.convertMultiWidgetToList(properties,"carrertitle-carrerbannerdescription-carrerbannerimagepath-carrervideoiconpath-carrervideoembededcode-ctalabel-ctatargeturl-openinnewwindow")%>" />    
<c:set var="carrerCarosuelTitles" value="<%=PageUtils.convertMultiWidgetToList(properties,"carrerpagebartitle")%>" />    

<div class="bannerCarsoul clearfix" id="bannerCarsoul">
                <!--Banner Carsoul Starts here-->
                <div class="caroufredsel_wrapper" style="display: block; text-align: start; float: none; position: relative; top: auto; right: auto; bottom: auto; left: auto; z-index: auto; width: 1349px; height: 705px; margin: 0px; overflow: hidden;"><div id="careerHeroBanner" style="text-align: left; float: none; position: absolute; top: 0px; right: auto; bottom: auto; left: 0px; margin: 0px; width: 9443px; height: 705px; z-index: auto; opacity: 1;">
                    
                    <c:forEach var="carrerVideocarousel" items="${carrerVideocarousel}">

 <div class="bannerSectionImage sara" id="sara" style="background-image:url('${carrerVideocarousel.carrerbannerimagepath}'); background-repeat: no-repeat;">
                        <div class="content-container hero-content-career">
                            <div class="col-md-4 playVideo col-md-push-8">
                                <a href="javascript:void(0);" class="playVideo"><img src="${carrerVideocarousel.carrervideoiconpath}" alt="" data-pin-nopin="true"></a>
                            </div>
                            <div class="col-md-8 col-md-pull-4">
                                <h2>${carrerVideocarousel.carrertitle}</h2>
                                <p>${carrerVideocarousel.carrerbannerdescription}</p>
                            </div>
                        </div>
                        <div class="video clearfix">
                            <div class="hero-banner-container">
                                <a href="#" class="close-hero"><span class="sprite icon-close-hero"></span></a>
                                <iframe src="${carrerVideocarousel.carrervideoembededcode}" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
                            </div>
                        </div>
                    </div>
                    </c:forEach>
                    </div></div>
                <div class="PagerBar" id="pageBar">
                    <div class="content-container">


<c:forEach var="carrerCarosuelTitle" items="${carrerCarosuelTitles}">
<div class="col-md-2 smMobile">
      <a href="javascript:void(0);" class="name itm0 active">${carrerCarosuelTitle.carrerpagebartitle}</a>
 </div>

</c:forEach>



                        </div>

                    </div>
                <!--Banner Carsoul ends here-->
            </div>