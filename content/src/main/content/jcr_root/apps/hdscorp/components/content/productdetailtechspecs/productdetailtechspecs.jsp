<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="org.apache.sling.api.resource.Resource"%>

<%@page import="javax.jcr.Node"%>
<%

Resource res = resourceResolver.getResource(currentPage.getPath()+"/jcr:content") ;
Node node = res.adaptTo(Node.class);

node.setProperty("techSpecContentPath", currentNode.getPath());

node.save();
%>
<div class="col-sm-12">
	<div id="no-more-tables">
		<table
			class="table-bordered table-striped table-condensed cf specs-table">
			<tbody>

				<c:forEach var="items" items="${properties.techspecdata}" varStatus="status">
					<c:set var="listItem" value="${fn:split(items,'|')}" />
					<c:set var="rowHeading" value="${fn:trim(listItem[0])}" />
					<c:set var="columnContent" value="${fn:trim(listItem[1])}" />
					<c:set var="columns" value="${fn:trim(listItem[2])}" />

					<tr>
						<th class="tech-specs-pro-name" data-title="${rowHeading}">${rowHeading}</th>

						<c:set var="columnItems" value="${fn:split(columnContent,',')}" />
						<c:forEach var="columnItem" items="${columnItems}" varStatus="columnstatus">
							<td>
								<div class="product-specs clearfix">
									<c:set var="cellContent" value="${fn:split(columnItem,'~!')}" />
									<c:if test="${fn:length(cellContent) gt 1}">
										<div class="pro-type">${fn:trim(cellContent[0])}</div>
										<div class="pro-category">${fn:trim(cellContent[1])}</div>
									</c:if>

									<c:if test="${fn:length(cellContent) eq 1}">
										<div class="pro-category">${columnItem}</div>
									</c:if>
									
								</div>
							</td>

						</c:forEach>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
	<a href ="<%=currentPage.getPath()%>.techspec.html">View All</a>
</div>