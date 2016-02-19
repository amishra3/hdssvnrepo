<%--

  Locations Component component.

  This is Locations Component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.LocationModel" var="locationModel"/>
<br>${locationModel.locationImage}
<br>${locationModel.imageAltText}
<br>${locationModel.locationDetail}
<br>${locationModel.locationLongitude}
<br>${locationModel.locationLatitude}
<c:forEach var="locationphonenumber" items="${locationModel.locationPhoneNumber}" varStatus="loopcnt">

    <br>PhoneNumber ::${locationphonenumber}

			</c:forEach>

<c:forEach var="locationregion" items="${locationModel.locationRegion}" varStatus="loopcnt">

    <br>Region  ::${locationregion}

			</c:forEach>

<c:forEach var="locationcountry" items="${locationModel.locationCountry}" varStatus="loopcnt">

    <br>Country ::${locationcountry}

			</c:forEach>


<c:forEach var="location" items="${locationModel.location}" varStatus="loopcnt">

    <br>Location ::${location}

			</c:forEach>

<h1>Locations component</h1>

<%out.println("<br>Location Driving Directions Label   ::"+currentStyle.get("jcr:locdrivingdirectionslabel",String.class));

out.println("<br>Locations Show Phone Numbers Label   ::"+currentStyle.get("jcr:locshowphonenumberslabel",String.class));
out.println("<br>Locations Directions Url Prefix   ::"+currentStyle.get("jcr:locdirectionsurlprefix",String.class));
%>


