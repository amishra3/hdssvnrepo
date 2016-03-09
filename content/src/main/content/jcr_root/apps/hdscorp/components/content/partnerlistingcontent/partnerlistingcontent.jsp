<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="partnerfilterlist" value="${widgets:getMultiFieldPanelValues(resource, 'partnerfilterlist')}"/>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PartnersContentModel" var="partnersContentModel" />


<div id="partners" class="partner-section">
	<div class="content-container clearfix">
		<div class="col-sm-12 partners">
			<div class="heading">
                 <h2><img src="${properties.partnercaticonpath}" alt="">${properties.partnercattitle}</h2>
                 <div class="filter">
	                 <div class="btn-group"> 
						<button aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" class="btn dropdown-toggle service-btn" type="button">${properties.partnerfilterlabel}<span aria-hidden="true" class="glyphicon glyphicon-chevron-down hidden-xs hidden-sm"></span></button> 	
						<ul class="dropdown-menu"> 
							<c:forEach items="${partnerfilterlist}" var="definition">
								<c:set var="partnerfiltertitle" value="${xss:encodeForHTML(xssAPI, definition['partnerfiltertitle'])}"/>
								<c:set var="partnercategoryTag" value="${xss:encodeForHTML(xssAPI, definition['partnercategoryTag'])}"/>
								<c:set var="partnercategoryTag" value="${hdscorp:removeDoubleQuotes(partnercategoryTag)}"/>
							    <li><a href="#" data-attr=${fn:replace(fn:replace(partnercategoryTag,'[', ''),']', '')}>${partnerfiltertitle}</a></li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
	                          
			<c:forEach var="partner" items="${partnersContentModel.partners}" varStatus="loopcnt">
				<div class="col-xs-6 col-sm-2 col-md-2 col-lg-2 client-logos">
					<img src="${partner.partnerIconImagePath}" alt="" class="img-responsive"> 
				</div>
            </c:forEach>
	                          
	                          
		</div>
	   <div class="clearfix"></div>
		<div class="col-sm-12 col-no-pad">
			<div class="more-solutions">
				<a class="animateAnchor bottomPos text-center" href="${properties.learnmorelinkpath}" target="${properties.openinnewwindow?'_blank':'_self'}">${properties.learnmorelinklabel}<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span></a>
			</div>
		</div>
	</div>
</div>