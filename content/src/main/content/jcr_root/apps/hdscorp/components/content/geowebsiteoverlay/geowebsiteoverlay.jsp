<%@include file="/apps/foundation/global.jsp"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.GeoSelectorModel"
	var="geoSelectorModel" />


<c:set var="geoGlobalId" value="${properties.geoglobalid}" scope="application" /> 

<div class="geo">
	<div class="geo-selc">
		<div class="content-container global-sel">
			<div class="col-sm-12">
				<h2>${properties.geoallregionlabel}</h2>
				<div class="close_btn">
					<img src="images/close-btn.png" alt="">
				</div>

				<ul class="nav nav-pills nav-justified">
					<c:forEach var="listReg1" items="${geoSelectorModel.regions}"
						varStatus="loopRegCount">

						<li  class="${loopRegCount.index == 0? 'active':''}"><a data-toggle="tab" href="#${listReg1.regionId}">${listReg1.regionLabel}</a></li>
						</c:forEach>
				</ul>
				<div class="tab-content">
					<c:forEach var="listReg" items="${geoSelectorModel.regions}"
						varStatus="loopRegCount">

						<div id="${listReg.regionId}" class="tab-pane fade in active">
							<div class="states-names">
								<div class="col-sm-3 col-no-pad">
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