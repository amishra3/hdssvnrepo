

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="com.hdscorp.cms.slingmodels.LocationsDropDownFilterModel"%>

<%@page session="false"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.LocationsDropDownFilterModel"
	var="locationsDropDownFilterModel" />

<br>
all regions label :${locationsDropDownFilterModel.locAllRegionsLabel}
<br>


<c:forEach items="${locationsDropDownFilterModel.locRegions}"
	var="locRegions" varStatus="status">

	 <br><br> Region Label :  ${xss:filterHTML(xssAPI,locRegions['locregionlabel'])}

    <c:set var="filterRegionTags" value="${locRegions['locregiontag']}"
		scope="request" />


	<c:if test="${not empty filterRegionTags}">
		<c:set var="filterDropDownRegionTag"
			value="${fn:substring(filterRegionTags,2,fn:length(filterRegionTags)-2)}" />

		<c:set var="filterDropDownRegionTag"
			value="${fn:split(filterDropDownRegionTag, ',')}" />
		<c:forEach var="regionTags" items="${filterDropDownRegionTag}"
			varStatus="loopcnt">


			<c:set var="regionTagID"
				value="${fn:replace(regionTags, '\"', '')}"/>

           <br> Region Tag Id :: ${regionTagID}
       </c:forEach>
	</c:if>



<c:forEach items="${locRegions['countries']}" var="countries"
		varStatus="counter">


		 <br><br>  country Label :  ${xss:filterHTML(xssAPI,countries['country-label'])}

		<c:set var="filterDropDownCountryTags"
			value="   ${countries['country-tag']}" scope="request" />

            <c:if test="${not empty filterDropDownCountryTags}">

          <c:set var="filterDropDownCountryTag" value="${fn:substring(filterDropDownCountryTags,5,fn:length(filterDropDownCountryTags)-2)}"/>
           <c:set var="filterDropDownCountryTag" value="${fn:split(filterDropDownCountryTag, ',')}"/>
                <c:forEach var="countryTags" items="${filterDropDownCountryTag}" varStatus="loopcnt">
                    <c:set var="countryTagID"  value="${fn:replace(countryTags, '\"', '')}" />
			  <br> country tag Id ${countryTagID}

        </c:forEach>
	</c:if>



	<c:set var="countryJson" value="   ${countries['locations']}"
		scope="request" />




	<%
		JSONArray jsonArrayLocation = new JSONArray(request.getAttribute("countryJson").toString());

			if (jsonArrayLocation.length() > 0) {
				for (int index = 0; index < jsonArrayLocation.length(); index++) {

					String jsonData = jsonArrayLocation.get(index).toString();
					JSONObject outerObject = new JSONObject(jsonData);
                        if (outerObject.getString("location-label")!=null)
					out.print("<br> <br> Location  Label  ::" + outerObject.getString("location-label") );

					String filterDropDownLocationTags = outerObject.getJSONArray("location-tag").toString();
					if (!filterDropDownLocationTags.isEmpty()) {
						filterDropDownLocationTags = filterDropDownLocationTags.substring(2,
								filterDropDownLocationTags.length() - 2);

						String[] locationTag = filterDropDownLocationTags.split(",");
						for (String filterLocactionTag : locationTag) {

							filterLocactionTag = filterLocactionTag.replaceAll("\"", "");

							out.println(" <br> Location tagID  ::" + filterLocactionTag );

						}
					}
				}
			}
	%>


</c:forEach>

<br><br><br><br>

</c:forEach>







