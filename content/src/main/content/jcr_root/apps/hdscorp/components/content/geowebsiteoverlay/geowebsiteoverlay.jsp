<%@include file="/apps/foundation/global.jsp"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.GeoSelectorModel"
	var="geoSelectorModel" />


<c:set var="geoGlobalId" value="${properties.geoglobalid}" scope="application" /> 

<div class="hds_globalNav_geo">
	<div class="hds_globalNav_geo-selc">
		<div class="content-container global-sel">
			<div class="col-sm-12">
				<h2 class="hidden-xs hidden-sm">${properties.geoallregionlabel}</h2>
				<div class="geo_close_btn hidden-xs hidden-sm">
				</div>

				<ul class="nav nav-pills nav-justified hidden-xs hidden-sm hdsGeoLocator">
					<c:forEach var="listReg1" items="${geoSelectorModel.regions}"
						varStatus="loopRegCount">

						<li  class="${loopRegCount.index == 0? 'active':''}"><a data-toggle="tab" href="#${listReg1.regionId}">${listReg1.regionLabel}</a></li>
						</c:forEach>
				</ul>
				<div class="tab-content">
					<c:forEach var="listReg" items="${geoSelectorModel.regions}"
						varStatus="loopRegCount">

						<div id="${listReg.regionId}" class="tab-pane fade in ${loopRegCount.index == 0? 'active':''}">
							<div class="states-names">
							<div class="megamenu-heading">
							<h2 class="hidden-md hidden-lg">${listReg.regionLabel}</h2>
							</div>							
								<div class="col-sm-12 col-sm-12 col-md-3 col-no-pad">
									<ul>
										<c:forEach var="listCout" items="${listReg.countries}"
											varStatus="looCount">
											<li><a href="${listCout.countrytargetUrl}">${listCout.countryLabel}</a></li>
										</c:forEach>
									</ul>
								</div>
							</div>
						</div>
					</c:forEach>

				</div>
			</div>
		</div>
	</div>
</div>