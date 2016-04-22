<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page
	import="com.hdscorp.cms.slingmodels.LocationsDropDownFilterModel"%>
<%@page session="false"%>
<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.LocationsDropDownFilterModel"
	var="locationsDropDownFilterModel" />
<c:set var="region" value="" />
<c:set var="country" value="" />
<c:set var="locations" value="" scope="request" />
<c:forEach items="${locationsDropDownFilterModel.locRegions}"
	var="locRegions" varStatus="status">

	<c:if
		test="${xss:filterHTML(xssAPI,locRegions['locregionlabel'])==properties.locdefaultregion}">

		<c:set var="region"
			value="${region}${xss:filterHTML(xssAPI,locRegions['locregionlabel'])}" />

		<c:if test="${not empty locRegions['countries']}">

			<c:forEach items="${locRegions['countries']}" var="countries"
				varStatus="counter">

				<c:if
					test="${xss:filterHTML(xssAPI,countries['countrylabel'])== properties.locdefaultcountry}">
					<c:set var="country"
						value="${country}${xss:filterHTML(xssAPI,countries['countrylabel'])}" />



					<c:if test="${not empty countries['locations']}">

						<c:set var="countryJson" value="   ${countries['locations']}"
							scope="request" />
						<br>

						<%
		JSONArray jsonArrayLocation = new JSONArray(request.getAttribute("countryJson").toString());

			if (jsonArrayLocation.length() > 0) {
             for (int index = 0; index < jsonArrayLocation.length(); index++) {
                 	String jsonData = jsonArrayLocation.get(index).toString();
                    JSONObject locationsObject = new JSONObject(jsonData);
                    //out.print( locationsObject.getString("locationlabel"));
                 request.setAttribute("locations",request.getAttribute("locations").toString()+","+locationsObject.getString("locationlabel"));

             }
                }

                %>

					</c:if>
				</c:if>
			</c:forEach>
		</c:if>

	</c:if>

</c:forEach>
<%--
region  :::  ${region}<br>
Country ::: ${country}<br>
Locations :::<%=request.getAttribute("locations").toString()%><br>
--%>
<div class="pr-list grey-bg clearfix" id="LoactionFilters">
	<div class="content-container">
		<div id="LoactionFilters"
			class="Container-legal-terms container-fluid overRideRight">
			<h2 class="grey-heading">${properties.locworldwidelocationslabel}</h2>
			<div class="select-boxes">

				<input type="hidden" value="${properties.loclocationtype}"
					id="locationEvent" name="locationEvent"> <input
					type="hidden" value="${properties.locdefaultregion}"
					id="locationEventRegion" name="locationEventRegion"> <input
					type="hidden" value="${properties.locdefaultcountry}"
					id="locationEventCountry" name="locationEventCountry"> <input
					type="hidden" value="${properties.locdefaultlocation}"
					id="locationEventLocation" name="locationEventLocation">

				<div class="col-md-4">

					<div class="select-style">
						<select id="allRegion" name="allRegion" autocomplete="off">

							<option value=" ">${properties.locallregionslabel}</option>

							<c:forEach items="${locationsDropDownFilterModel.locRegions}"
								var="locRegions" varStatus="status">
								<c:if
									test="${xss:filterHTML(xssAPI,locRegions['locregionlabel'])==properties.locdefaultregion}">

								</c:if>
								<c:set var="stateJson" value=" ${locRegions['countries']}"
									scope="request" />
								<c:set var="filterRegionTags"
									value="${locRegions['locregiontag']}" scope="request" />
								<c:if test="${not empty filterRegionTags}">
									<c:set var="filterDropDownRegionTag"
										value="${fn:substring(filterRegionTags,2,fn:length(filterRegionTags)-2)}" />
									<c:set var="filterDropDownRegionTag"
										value="${fn:split(filterDropDownRegionTag, ',')}" />

									<c:forEach var="regionTags" items="${filterDropDownRegionTag}"
										varStatus="loopcnt">
										<c:set var="search" value='"' />
										<c:set var="replace" value='' />
										<c:set var="regionTagID"
											value="${fn:replace(regionTags, search, replace)}" />
										<option value="${regionTagID}">${xss:filterHTML(xssAPI,locRegions['locregionlabel'])}</option>


									</c:forEach>
								</c:if>


							</c:forEach>
						</select>
					</div>
				</div>



				<div class="col-md-4">
					<div class="select-style">
						<select id="allCountries" name="allCountries" autocomplete="off">
							<option selected="selected">${properties.locallcountrieslabel}</option>

							<c:forEach items="${locationsDropDownFilterModel.locRegions}"
								var="locRegions" varStatus="status">
								<c:if
									test="${xss:filterHTML(xssAPI,locRegions['locregionlabel'])==properties.locdefaultregion}">
									<c:forEach items="${locRegions['countries']}" var="countries"
										varStatus="counter">
										<option
											value="${xss:filterHTML(xssAPI,countries['countrylabel'])}">${xss:filterHTML(xssAPI,countries['countrylabel'])}</option>

									</c:forEach>
								</c:if>
							</c:forEach>



						</select>
					</div>
				</div>
				<div class="col-md-4">
					<div class="select-style">
						<select id="allLocations" name="allLocations" autocomplete="off">
							<option selected="selected">${properties.localllocationslabel}</option>


							<c:forEach items="${locationsDropDownFilterModel.locRegions}"
								var="locRegions" varStatus="status">

								<c:if
									test="${xss:filterHTML(xssAPI,locRegions['locregionlabel'])==properties.locdefaultregion}">

									<c:set var="region"
										value="${region}${xss:filterHTML(xssAPI,locRegions['locregionlabel'])}" />

									<c:if test="${not empty locRegions['countries']}">

										<c:forEach items="${locRegions['countries']}" var="countries"
											varStatus="counter">

											<c:if
												test="${xss:filterHTML(xssAPI,countries['countrylabel'])== properties.locdefaultcountry}">
												<c:set var="country"
													value="${country}${xss:filterHTML(xssAPI,countries['countrylabel'])}" />


												<c:if test="${not empty countries['locations']}">

													<c:set var="countryJson"
														value="   ${countries['locations']}" scope="request" />
													<br>

													<%
		JSONArray jsonArrayLocation = new JSONArray(request.getAttribute("countryJson").toString());

			if (jsonArrayLocation.length() > 0) {
             for (int index = 0; index < jsonArrayLocation.length(); index++) {
                 	String jsonData = jsonArrayLocation.get(index).toString();
                    JSONObject locationsObject = new JSONObject(jsonData);
                 %>
													<option
														value="<%=locationsObject.getString("locationlabel")%>"><%=locationsObject.getString("locationlabel")%>
													</option>

													<%

             }
                }

                %>

												</c:if>
											</c:if>
										</c:forEach>
									</c:if>

								</c:if>

							</c:forEach>



						</select>
					</div>
				</div>

			</div>
		</div>

	</div>
	<div class="content-container">
		<div class="Container-legal-terms container-fluid overRideRight">
			<div class="location-nav-tabs">
				<ul class="nav nav-tabs hidden-md hidden-lg">
					<li class="col-xs-6 current" data-tab="tab-2"><a
						href="javascript:void(0)">${properties.locmapviewlabel}</a></li>
					<li class="col-xs-6" data-tab="tab-1"><a
						href="javascript:void(0);">${properties.loclistviewlabel}</a></li>
				</ul>
			</div>
			<div class="posRelativeLocation">
				<div id="loading"></div>
				<div class="col-md-3 col-sm-12 tabbed-content" id="tab-1">
					<div class="content">
						<div class="scrollbar-inner">
							<h2></h2>
							<div id="locationDetailsContent"></div>
						</div>
					</div>
				</div>
				<!-- Map Content to Loaded here -->
				<div class="col-md-9 col-sm-12 tabbed-content current" id="tab-2">
					<div id="gmap" style="width: 100%; height: 792px;"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<c:forEach items="<%=properties.get("jcr:locregions",null)%>"
	var="locRegions" varStatus="status">

	<c:choose>
		<c:when test="${status.index==0}">
			<c:set var="locationJson" value="${locRegions}" />
		</c:when>
		<c:otherwise>
			<c:set var="locationJson" value="${locationJson},${locRegions}" />
		</c:otherwise>
	</c:choose>
</c:forEach>

<c:set var="additonJson"
	value="&quot;type&quot;: &quot;${properties.loclocationtype}&quot;,&quot;showphonenumberlabel&quot;:&quot;${properties.locshowphonenumberslabel}&quot;,&quot;drivingdirection&quot;:&quot;${properties.locdrivingdirectionslabel}&quot;" />
<c:set var="finallocationJson"
	value="{&quot;data&quot;:[${locationJson}],${additonJson}}" />

<script type="text/javascript">
	var getJSONLocation = ${finallocationJson};
</script>