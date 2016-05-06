<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:choose>
	<c:when test="${not empty properties.contactustitlecontent}">

		<c:set var="placardList" value="<%=PageUtils.convertMultiWidgetToList(properties,"placardTitle-placardcontent-phonenumbertext1-phonenumbertext2-contacturllabel1-contacttargeturl1-contacturllabel2-contacttargeturl2-seemorenewwin-seemorenewwin2-thirdparty-thirdparty2-mform-mform1-mformtitle-mformtitle2")%>" />

            <%--<div class="common-hero-short-banner contact-banner clearfix" style="background: url('${properties.contactusimagePath}')">--%>
                <div class="common-hero-short-banner contact-banner clearfix rsImg"  ${hdscorp:bgImgAtrr(properties.contactusimagePath,properties.mobileimage)} > 
                <div class="content-container">
                    <h1 class="headline">${properties.contactustitlecontent}</h1>
					<div class="row detail-container">

					
						<c:forEach var="placardList" items="${placardList}" varStatus="loop">
							<c:set var="placardTitle" value="${placardList.placardTitle}" />
							<c:set var="placardcontent" value="${placardList.placardcontent}" />
							<c:set var="phonenumbertext1" value="${placardList.phonenumbertext1}" />
							<c:set var="phonenumbertext2" value="${placardList.phonenumbertext2}" />
							<c:set var="contacturllabel1" value="${placardList.contacturllabel1}" />
							<c:set var="contacttargeturl1" value="${placardList.contacttargeturl1}" />
							<c:set var="contacturllabel2" value="${placardList.contacturllabel2}" />
							<c:set var="contacttargeturl2" value="${placardList.contacttargeturl2}" />
 							<c:set var="mformtitle" value="${placardList.mformtitle}" />
                            <c:set var="mformtitle2" value="${placardList.mformtitle2}" />

							<c:if test="${fn:startsWith(contacttargeturl1,'/content/')}">
								<c:set var="contacttargeturl1" value="${hdscorp:shortURL(contacttargeturl1)}" />
							</c:if>
				
							<c:if test="${fn:startsWith(contacttargeturl2,'/content/')}">
								<c:set var="contacttargeturl2" value="${hdscorp:shortURL(contacttargeturl2)}" />
							</c:if>


							<div class="col-sm-4">
								<div class="details-box">
									<h2>${placardTitle}</h2>
									<p>${placardcontent}</p>
									<c:if test="${not empty phonenumbertext1}">
										<div class="address-contacts">
											<div class="contact">${phonenumbertext1}</div>
										</div>
									</c:if>
									<c:if test="${not empty phonenumbertext2}">
										<div class="address-contacts">
											<div class="contact">${phonenumbertext2}</div>
										</div>
									</c:if>	

									<c:if test="${not empty contacturllabel1}">
                                        <a data-formtitle="${mformtitle}" rel="${placardList.mform==1?'iframemodal':''}" class="animateLink" href="${contacttargeturl1}" target="${placardList.seemorenewwin==1?'_blank':'_self'}">${contacturllabel1}${placardList.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
									</c:if>

									<c:if test="${not empty contacturllabel2}">
                                        <a data-formtitle="${mformtitle2}" rel="${placardList.mform1==1?'iframemodal':''}" class="animateLink" href="${contacttargeturl2}" target="${placardList.seemorenewwin2==1?'_blank':'_self'}">${contacturllabel2}${placardList.thirdparty2==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
									</c:if>									
								</div>
							</div>	
											<c:set var="phonenumbertext1seo" value="+${phonenumbertext1}" />
                                        <c:if test="${fn:contains(phonenumbertext1,':')}">
                                            <c:set var="phonenumbertext1seo" value="+${fn:substringAfter(phonenumbertext1, ': ')}" />
										</c:if>
                                            <c:set var="phonenumbertext2seo" value="${phonenumbertext2}" />
											<c:if test="${not empty phonenumbertext2}">

                                                    <c:if test="${fn:contains(phonenumbertext2,':')}">
                                                        <c:set var="phonenumbertext2seo" value="+${fn:substringAfter(phonenumbertext2, ': ')}" />
                                                    </c:if>
                                            </c:if>
<script type="application/ld+json">
{ "@context" : "http://schema.org",
  "@type" : "Organization",
  "url" : "https://www.hds.com",
  "contactPoint" : [
    { "@type" : "ContactPoint",
     "telephone" : "${phonenumbertext1seo}",
     "contactOption" : "${phonenumbertext2seo}",
      "contactType" : "${placardTitle}"
    } ] }
</script>

						</c:forEach>

                    </div>
                </div>
            </div>
	</c:when>
	<c:otherwise>
		<wcmmode:edit>
			<p>
				<span class="cq-text-placeholder-ipe">Configure Contact US Hero Banner</span>
			</p>
		</wcmmode:edit>
	</c:otherwise>
</c:choose>   
