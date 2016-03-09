<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<c:if test = "${not empty properties.sectionbackground}">
 <c:set var="imgval" value="background-image: url(${properties.sectionbackground})" />
</c:if>


<%-- <div class="about-hds-csr-quote csr-quote-5 clearfix" id="features-benefits" style="background-image:url(${properties.sectionbackground})">--%>
    <div class="about-hds-csr-quote csr-quote-5 clearfix rsImg" id="features-benefits" style="background-image: url();" ${hdscorp:bgImgAtrr(properties.sectionbackground,properties.mobileimage)} > 
                        <div class="about-hds-csr-quote-container">
                            <div class="col-lg-7 col-md-7 col-xs-12 about-hds-ethics">
                                <h2 class="headline">${properties.sectiontitle}</h2>
                                <p>${properties.sectiondescription}</p>
                            </div>
                            
                            <div class="clearfix"></div>

                            <div class="row row-reduce-half about-hds-ethics-cta container-fluid">

                              <cq:include path="communitycontentpar" resourceType="hdscorp/components/content/column-control" />
                              
                            </div>

                        </div>
                    </div>
