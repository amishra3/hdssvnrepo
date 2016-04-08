<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<%@page import="com.hdscorp.cms.util.PathResolver"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="linkUrl" value="${properties.aboutusbuttonurl}" />

<c:if test="${fn:startsWith(linkUrl,'/content/')}">
	<c:set var="linkUrl" value="${hdscorp:shortURL(linkUrl)}" />
</c:if>

<div class="global-platform clearfix">
	<div class="global-platform-container content-container">
		<div class="global-platform-image hidden-sm col-md-4">
		</div>
		<div class="global-platform-content col-md-8">
			<h1>A Global IoT Platform</h1>
			<h4>Sub-head here </h4>
			<p>
				Your challenges are unique. There may be similar situations, but no two sets of needs are exactly alike.</p>
			<p>
			   agility lets it adapt across industries and organizations, scale to any size, and evolve as required. And it’s open source, allowing for collaboration and innovation from the people who will use and benefit from the solution.
			</p>
			<a href="#" class="btn-transparent-square">Our IoT Platform</a>
		</div>
	</div>
</div>