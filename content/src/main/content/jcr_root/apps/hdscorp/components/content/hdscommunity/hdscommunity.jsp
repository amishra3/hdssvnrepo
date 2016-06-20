<%--

  HDS Community component.

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<c:set var="communityList"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"hccontent-hcmtitle-hclinklabel-hclink-hcopeninnewwindow-hcbackgroundimage-hcmtype-hciconimage")%>" />

    <div class="hds-community-section" style="background-image:url('${properties.hcbackgroundimage}');">
	<div class="hds-community-container container-fluid">
		<div class="hds-title">${properties.hctitle}</div>
		<div class="row">

			<c:forEach items="${communityList}" var="multifieldData1">
				<div class="col-sm-6">
					    <div class="col-md-6">
						<div class="community-common-box">
						<div class="icon">
						 <img src="${multifieldData1.hciconimage}" alt="${multifieldData1.hcmtype}" title="${multifieldData1.hcmtype}">
                        </div>
						    <div class="type">${multifieldData1.hcmtype}</div>
							<h5>${multifieldData1.hcmtitle}</h5>
							<div class="description">${multifieldData1.hccontent}</div>
							<div class="comm-read-more">
								<c:choose>
									<c:when test="${multifieldData1.hcopeninnewwindow == '1'}">
										<a href="${multifieldData1.hclink}" class="animateLink"
											target="_blank">${multifieldData1.hclinklabel} <span
											class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>
									</c:when>
									<c:otherwise>

										<a href="${multifieldData1.hclink}" class="animateLink">${multifieldData1.hclinklabel}
											<span class="glyphicon glyphicon-menu-right animateIcon"
											aria-hidden="true"></span>
										</a>

									</c:otherwise>


								</c:choose>
							</div>
						</div>
					</div>
				</div>

			</c:forEach>

		</div>
		<div class="hds-community-join hidden-xs">
			<c:choose>
				<c:when test="${properties.hccomopeninnewwindow}">
					<a href="${properties.hcjoinlink}" class="animateLink"
						target="_blank">${properties.hcjoinlabel}<span
						class="glyphicon glyphicon-new-window" aria-hidden="true"></span></a>
				</c:when>
				<c:otherwise>
					<a href="${properties.hcjoinlink}" class="animateLink">${properties.hcjoinlabel}<span
						class="glyphicon glyphicon-menu-right animateIcon"
						aria-hidden="true"></span></a>
				</c:otherwise>


			</c:choose>
		</div>

	</div>
</div>