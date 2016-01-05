<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>

<div class="stop"></div>

<div class="hds-community-section">
	<div class="hds-community-container container-fluid">
		<div class="hds-title">${properties.sectiontitle}</div>

		<div class="row">
			<cq:include path="communitycontentpar" resourceType="hdscorp/components/content/column-control" />
		</div>


	</div>
</div>