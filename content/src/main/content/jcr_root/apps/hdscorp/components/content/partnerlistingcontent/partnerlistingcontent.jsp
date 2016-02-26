<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@ page import="com.hdscorp.cms.slingmodels.PartnerGridModel"%>
<%@page import="com.hdscorp.cms.search.SearchServiceHelper"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.day.cq.search.result.SearchResult"%>
<%@page import="com.day.cq.search.result.Hit"%>
<%@page import="java.util.List"%>



<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.PartnerGridModel" var="partnerGridModel" /> 
