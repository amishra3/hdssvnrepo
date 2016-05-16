<%@page import="com.hdscorp.cms.constants.GlobalConstants"%>
<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="org.apache.sling.api.resource.Resource"%>

<%@page import="javax.jcr.Node"%>
<%

Resource res = resourceResolver.getResource(currentPage.getPath()+"/jcr:content") ;
Node node = res.adaptTo(Node.class);

node.setProperty("techSpecContentPath", currentNode.getPath());

node.save();
%>

<c:set var="specrowstoshow" value="${properties.techspecrowstoshow}"/>
<c:set var="footnotecontentlist" value="<%=PageUtils.convertMultiWidgetToList(properties,"footnotenumber-footnotecontent")%>" />

<c:if test="${empty specrowstoshow}">
	<c:set var="specrowstoshow" value="1"/>
</c:if>

<c:set var="showviewallbutton" value="${false}"/>
<c:set var="techspeconlypage" value="${requestScope['techspeconlypage']}" />
<c:set var="totalcolums" value="${properties.numberofcolumnsintable}" />

<wcmmode:edit>
	<c:set var="techspeconlypage" value="${true}" />
</wcmmode:edit>
<c:if test="${not empty properties.techspecdata}">
<div class="row">
<div class="col-sm-12">
	<div id="no-more-tables">
		<table
			class="table-bordered table-striped table-condensed cf specs-table">
			<tbody>

				<c:forEach var="items" items="${properties.techspecdata}" varStatus="status">
					<c:choose>
  						<c:when test="${status.index lt specrowstoshow or techspeconlypage}">
  
							<c:set var="listItem" value="${fn:split(items,'|')}" />
							<c:set var="rowHeading" value="${fn:trim(listItem[0])}" />
							<c:set var="columnContent" value="${fn:trim(listItem[1])}" />
							<c:set var="columns" value="${fn:trim(listItem[2])}" />
		
							<tr>
								<th class="tech-specs-pro-name" data-title="${rowHeading}">${rowHeading}</th>
		
								<c:set var="columnItems" value="${fn:split(columnContent,',')}" />
								<c:forEach var="columnItem" items="${columnItems}" varStatus="columnstatus">
									<c:set var="columnItem" value="${fn:replace(columnItem,'@_',',')}" />
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
						</c:when>
						<c:otherwise>
							<c:set var="showviewallbutton" value="${true}"/>
						</c:otherwise>
					</c:choose>																				
				</c:forEach>
				<c:if test="${fn:length(footnotecontentlist) > 0}">
					<tr>
						<td colspan="${totalcolums}">	
							<p class="textleftalign tbl-foot-caption">
							<c:forEach var="footnoteItem" items="${footnotecontentlist}" varStatus="foorNoteCnt">
									<c:set var="footnotenumber" value="${footnoteItem.footnotenumber}" />
									<c:set var="footnotecontent" value="${footnoteItem.footnotecontent}" />
									<i><sup>${footnotenumber}</sup>${footnotecontent}</i><br>
							</c:forEach>
							</p>
						</td>
					</tr>
				</c:if>
			</tbody>
		</table>
	</div>
	<c:if test="${showviewallbutton and !techspeconlypage}">
        <div class="tbd-dl btn-square btn-square-white">
			<a href ="${currentPage.path}.<%=GlobalConstants.PRODUCT_TECH_SPEC_SELECTOR%>.html" target="${properties.viewopeninnew?'_blank':'_self'}">${properties.viewalllinklabel}</a>
        </div>
	</c:if>
</div>
</div>
</c:if>