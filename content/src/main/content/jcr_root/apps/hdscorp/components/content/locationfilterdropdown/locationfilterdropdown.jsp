<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@page import="com.hdscorp.cms.slingmodels.LocationsDropDownFilterModel"%>

<%@page session="false"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.LocationsDropDownFilterModel"
	var="locationsDropDownFilterModel" />

<div class="pr-list grey-bg clearfix">                    
                <div class="row">
                    <h2 class="grey-heading">Worldwide Locations</h2> </div>
					<div class="content-container">
			<div class="select-boxes">
				<div class="col-md-4">
					<div class="bs-docs-example custom_selectBox">
						<select class="selectpicker">
                                <c:forEach items="${locationsDropDownFilterModel.locRegions}" var="locRegions" varStatus="status">
                                     <c:set var="stateJson" value=" ${locRegions['countries']}" scope="request" />
                                    <c:set var="filterRegionTags" value="${locRegions['locregiontag']}" scope="request" />
                                    <c:if test="${not empty filterRegionTags}">

                                        <c:set var="filterDropDownRegionTag" value="${fn:substring(filterRegionTags,2,fn:length(filterRegionTags)-2)}" />
                                        <c:set var="filterDropDownRegionTag" value="${fn:split(filterDropDownRegionTag, ',')}" />
                                        <c:forEach var="regionTags" items="${filterDropDownRegionTag}" varStatus="loopcnt">
                                            <c:set var="search" value='"' />
                                            <c:set var="replace" value='' />
                                            <c:set var="regionTagID" value="${fn:replace(regionTags, search, replace)}"/>
                                             <option value="${regionTagID}">${xss:filterHTML(xssAPI,locRegions['locregionlabel'])}</option> 
                                       </c:forEach>
                                    </c:if>

                                </c:forEach>

						</select>
					</div>
				</div>
				<div class="col-md-4">
					<div class="bs-docs-example custom_selectBox">
						<select class="selectpicker">
                            ${stateJson}---
						</select>
					</div>
				</div>

				<div class="col-md-4">
					<div class="bs-docs-example custom_selectBox">
						<select class="selectpicker">

						</select>
					</div>
				</div>
			</div>
			</div>
			<div class="content-container">
			<div class="contact-inner-area">
				<div class="col-md-3 col-sm-3">
					<div class="scrollbar-inner">
					<div class="content mCustomScrollbar">
					<h1>North America</h1>
					<div class="side-block">
						<img src="images/img1.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img2.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img3.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img1.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img2.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img3.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img1.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img2.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					<div class="side-block">
						<img src="images/img3.jpg" alt=""/>
						<h3>Corporate Headquarters</h3>
						<p>One Perimeter Park South</p>
						<p>Suite 140N</p>
						<p>Santa Clara, California 95050-2639</p>
						<a href="javascript:void(0);" class="animateLink">Driving directions <span class="glyphicon glyphicon-new-window animateIcon" aria-hidden="true"></span></a>
						<a href="javascript:void(0);" class="phone_num animateLink">Show Phone Numbers <span class="glyphicon glyphicon-plus-sign animateIcon" aria-hidden="true"></span></a>
					</div>
					</div>
					</div>
				</div>
                    <!-- Press Release List Content to Loaded here -->
				<div class="col-md-9 col-sm-9">
					<div class="google-iframe">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.7056682372554!2d-121.95035888436652!3d37.373140742937096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fca2c8f58f581%3A0xb9b0b2167e6afc34!2sHitachi+Data+Systems+Corporation!5e0!3m2!1sen!2sin!4v1452253482147" width="100%" height="792" frameborder="0" style="border:0" allowfullscreen></iframe>
					</div>
				</div>
				</div>
            </div>
            </div>


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

<c:set var="search" value='"' />
			<c:set var="regionTagID" value="${fn:replace(regionTags, search, '')}"/>

           <br> Region Tag Id :: ${regionTagID}
       </c:forEach>
	</c:if>



<c:forEach items="${locRegions['countries']}" var="countries" varStatus="counter">


		 <br><br>  country Label :  ${xss:filterHTML(xssAPI,countries['country-label'])}

		<c:set var="filterDropDownCountryTags" value="${countries['country-tag']}" scope="request" />

            <c:if test="${not empty filterDropDownCountryTags}">

          <c:set var="filterDropDownCountryTag" value="${fn:substring(filterDropDownCountryTags,5,fn:length(filterDropDownCountryTags)-2)}"/>
           <c:set var="filterDropDownCountryTag" value="${fn:split(filterDropDownCountryTag, ',')}"/>
                <c:forEach var="countryTags" items="${filterDropDownCountryTag}" varStatus="loopcnt">
					<c:set var="search" value='"' />
                    <c:set var="countryTagID"  value="${fn:replace(countryTags, search, '')}" />
			  <br> country tag Id ${countryTagID}

        </c:forEach>
	</c:if>



	<c:set var="countryJson" value=" ${countries['locations']}" scope="request" />




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







