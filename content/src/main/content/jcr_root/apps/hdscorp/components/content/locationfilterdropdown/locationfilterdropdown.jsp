
<%--

  Location Filter DropDown Component component.

  This is Location Filter DropDown Component

--%>
<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.day.cq.tagging.Tag"%>

<%@page import="com.day.cq.tagging.TagManager"%>

<%@page import="org.json.JSONArray"%>

<%@page import="org.json.JSONObject"%>



<%@page session="false"%>
<h1>Location Filter Dropdown Component</h1>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.LocationsDropDownFilterModel"
	var="locationsDropDownFilterModel" />


<%
	TagManager tm = resourceResolver.adaptTo(TagManager.class);
%>

<br>
all regions label :${locationsDropDownFilterModel.locAllRegionsLabel}
<br>

<c:forEach items="${locationsDropDownFilterModel.locRegions}"
	var="locRegions" varStatus="status">

	<br>Location filter dropdown Region Label :  ${xss:filterHTML(xssAPI,locRegions['locregionlabel'])}

    <br>Location filter dropdown Region Tags :  ${xss:filterHTML(xssAPI,locRegions['locregiontag'])}
    <c:set var="filterRegionTags" value="${locRegions['locregiontag']}"
		scope="request" />

	<br>
	<%
		String filterDropDownRegionTags = request.getAttribute("filterRegionTags").toString();

			if (!filterDropDownRegionTags.isEmpty()) {
				filterDropDownRegionTags = filterDropDownRegionTags.substring(2,
						filterDropDownRegionTags.length() - 2);
				String[] regiontag = filterDropDownRegionTags.split(",");
				for (String filterRegionTag : regiontag) {

					filterRegionTag = filterRegionTag.replaceAll("\"", "");

					Tag tag = tm.resolve(filterRegionTag);

					out.println("<br>Location filter dropdown Region tagID  ::" + tag.getTagID() + "<br>");
					out.println("Location filter dropdown  tagName  ::" + tag.getName() + "<br>");
				}

			}
	%>


	<c:forEach items="${locRegions['countries']}" var="countries"
		varStatus="counter">


		<br>  Location filter dropdown   country Label :  ${xss:filterHTML(xssAPI,countries['country-label'])}

                                     <br> Location filter dropdown   country Tag :  ${xss:filterHTML(xssAPI,countries['country-tag'])}



            <br>
		<c:set var="filterDropDownCountryTags"
			value="   ${countries['country-tag']}" scope="request" />

		<%
			String filterDropDownCountryTags = request.getAttribute("filterDropDownCountryTags").toString();

					if (!filterDropDownCountryTags.isEmpty()) {
						filterDropDownCountryTags = filterDropDownCountryTags.substring(5,
								filterDropDownCountryTags.length() - 2);

						String[] countryTag = filterDropDownCountryTags.split(",");
						for (String filterCountryTag : countryTag) {

							filterCountryTag = filterCountryTag.replaceAll("\"", "");

							Tag tag = tm.resolve(filterCountryTag);

							out.println("<br>Location filter dropdown Country tagID  ::" + tag.getTagID() + "<br>");
							out.println("Location filter dropdown Country  tagName  ::" + tag.getName() + "<br>");
						}

					}
		%>
		<c:set var="countryJson" value="   ${countries['locations']}"
			scope="request" />
		<br>

		<%
			String countryJsonStr = request.getAttribute("countryJson").toString();

					JSONArray jsonArrayLocation = new JSONArray(countryJsonStr);

					if (jsonArrayLocation.length() > 0) {
						for (int index = 0; index < jsonArrayLocation.length(); index++) {

							String jsonData = jsonArrayLocation.get(index).toString();
							JSONObject outerObject = new JSONObject(jsonData);

							out.print("Location filter dropdown Label  ::" + outerObject.getString("location-label")
									+ "<br>");
							out.print("Location filter dropdown Tag ::" + outerObject.getJSONArray("location-tag")
									+ "<br>");

							String filterDropDownLocationTags = outerObject.getJSONArray("location-tag").toString();

							if (!filterDropDownLocationTags.isEmpty()) {
								filterDropDownLocationTags = filterDropDownLocationTags.substring(2,
										filterDropDownLocationTags.length() - 2);

								String[] locationTag = filterDropDownLocationTags.split(",");
								for (String filterLocactionTag : locationTag) {

									filterLocactionTag = filterLocactionTag.replaceAll("\"", "");

									Tag tag = tm.resolve(filterLocactionTag);

									out.println("<br> Location filter dropdown Location tagID  ::" + tag.getTagID()
											+ "<br>");
									out.println("Location filter dropdown Location  tagName  ::" + tag.getName()
											+ "<br>");
								}
							}
						}
					}
		%>


	</c:forEach>


</c:forEach>


<h1>Locations Details</h1>



<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.LocationDataModel"
	var="locationNode" />


<c:forEach items="${locationNode.locationNodes}" var="locationNodes">

	<br> location backgroundImage: ${locationNodes.locationImage}
  <br>  location Image Alt Text: ${locationNodes.imageAltText}
   <br> location Detail: ${locationNodes.locationDetail}
   <br> location Longitude: ${locationNodes.locationLongitude}
   <br> location Latitude: ${locationNodes.locationLatitude}

    <br> location Latitude: ${locationNodes.locationLatitude}







<br>
	<c:forEach var="locationPhoneNumber"
		items="${locationNodes.locationPhoneNumber}" varStatus="loopcnt">

		<br>PhoneNumber ::${locationPhoneNumber}

		</c:forEach>

	<c:set var="regiontags" value="${locationNodes.locationRegion}"
		scope="request" />

	<c:set var="countrytags" value="${locationNodes.locationCountry}"
		scope="request" />

	<c:set var="locationtags" value="${locationNodes.location}"
		scope="request" />

	<%
		String[] regions = (String[]) request.getAttribute("regiontags");

			for (String tags : regions) {
				Tag tag = tm.resolve((String) tags);

				out.println(" Region tags   ::" + tags + "<br>");
				out.println("Region tagID  ::" + tag.getTagID() + "<br>");
				out.println("Region  tagName  ::" + tag.getName() + "<br>");

			}

			out.println("<br><br><br><br>");

			String[] countries = (String[]) request.getAttribute("countrytags");

			for (String tags : countries) {
				Tag tag = tm.resolve((String) tags);

				out.println("country tags   ::" + tags + "<br>");
				out.println("country tagID  ::" + tag.getTagID() + "<br>");
				out.println("country tagName  ::" + tag.getName() + "<br>");

			}

			out.println("<br><br><br><br>");

			String[] locations = (String[]) request.getAttribute("locationtags");

			for (String tags : locations) {
				Tag tag = tm.resolve((String) tags);

				out.println("Location tags   ::" + tags + "<br>");
				out.println("Location tagID  ::" + tag.getTagID() + "<br>");
				out.println("Location  tagName  ::" + tag.getName() + "<br>");

			}
	%>


</c:forEach>




<h3>End</h3>
