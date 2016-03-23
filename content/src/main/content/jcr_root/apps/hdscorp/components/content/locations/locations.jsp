
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

<br>${currentStyle.locdrivingdirectionslabel}
<br>${currentStyle.locshowphonenumberslabel}
<br>${currentStyle.locdirectionsurlprefix}


