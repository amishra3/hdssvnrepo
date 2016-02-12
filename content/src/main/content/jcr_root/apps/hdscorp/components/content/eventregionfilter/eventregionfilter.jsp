<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss"%>
<%@page import="com.day.cq.search.result.SearchResult,com.day.cq.search.result.Hit,java.util.List"%>

<%@page import="com.hdscorp.cms.util.PropertyResolver"%>

<%@page import="com.hdscorp.cms.slingmodels.EventDataModel,java.util.ArrayList"%>
<%@page import="com.hdscorp.cms.dao.EventNode,com.hdscorp.cms.util.ViewHelperUtil,com.hdscorp.cms.search.SearchServiceHelper"%>

<%@page import="java.util.List,com.day.cq.search.facets.Facet,com.day.cq.search.facets.Bucket,java.util.Map,com.day.cq.tagging.TagManager,com.day.cq.tagging.Tag"%>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.EventRegionFilterComponent" var="eventRegionFilterModel" />


<div class="tabbing-container">
	<div class="content-container">
		<div class="custom-nav-tabs">
			<ul class="nav nav-tabs">
				<li class="active"><a data-toggle="tab" href="#upcoming-events">Upcoming
						Events</a></li>
				<li><a data-toggle="tab" href="#webcasts-demand">Webcasts
						on-demand</a></li>
			</ul>
		</div>
		<div class="tab-content">
			<div id="upcoming-events" class="tab-pane fade in active">
				<!-- Upcoming Events are Loaded here -->
				<div class="newsEventsList no-padding">
					<div class="event-date-panel">
						<div class="row">
							<div class="col-md-7">
								<div class="daterangepicker" id="two-inputs">
									<div class="calendar left">
										<strong>${eventRegionFilterModel.eshownfrom}</strong>
										<div class="daterangepicker_input">
											<input class="from_date" placeholder="" type="text"
												id="date-range200"> <i
												class="fa fa-calendar glyphicon glyphicon-calendar"></i>
										</div>
									</div>
									<div class="calendar right">
										<strong>${eventRegionFilterModel.eshownto}</strong>
										<div class="daterangepicker_input">
											<input class="to_date" placeholder="" type="text"
												id="date-range201"> <i
												class="fa fa-calendar glyphicon glyphicon-calendar"></i>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-2">
								<div class="red-boader-bttn">
									<a id="updateResults" href="javascript:void(0);">${eventRegionFilterModel.eupdatelabel}</a>
								</div>
							</div>
							<div class="col-md-3">
								<div class="bs-docs-example custom_selectBox_red">
									<select class="selectpicker" id="filterRegion"
										name="filterRegion">
										<option value="">Filter by region</option>
										<c:forEach items="${eventRegionFilterModel.regionTag}"
											var="eventTags">
											<c:forEach items="${eventTags}" var="eventTag">
												<c:forEach items="${eventTag.value}" var="tagResults"
													varStatus="tagStatus">
													<c:choose>
														<c:when test="${tagStatus.index== 0}">
															<c:set var='tagslist' value='${tagResults.tagId}' />
															<c:set var='tagsNamelist' value='${tagResults.tagName}' />
														</c:when>
														<c:otherwise>
															<c:set var='tagslist'
																value='${tagslist},${tagResults.tagId}' />
															<c:set var='tagsNamelist'
																value='${tagsNamelist},${tagResults.tagName}' />
														</c:otherwise>
													</c:choose>
												</c:forEach>
												<option value="<c:out value='${tagslist}' />">${eventTag.key}</option>
											</c:forEach>
										</c:forEach>
									</select>
								</div>
							</div>
						</div>
					</div>

					<div class="newsEvents-category-list">
						<div class="product-category-list-container">
							<div class="row">
								<div class="col-md-3 news-listing">
									<ul>
										<li class="active"><a
											data-catagory="${eventRegionFilterModel.eallevent}"
											title="${eventRegionFilterModel.eallevent}" class="active"
											href="javascript:void(0);">${eventRegionFilterModel.eallevent}
												<span class="icon-accordion-closed hidden-md hidden-lg"></span>
												<span class="icon-accordion-opened hidden-md hidden-lg"></span>
										</a>
											<div class="MobileHolderWrapper"></div></li>
										<c:forEach items="${eventRegionFilterModel.eventTag}"
											var="eventTags">
											<c:forEach items="${eventTags}" var="eventTag">
												<c:forEach items="${eventTag.value}" var="tagResults"
													varStatus="tagStatus">
													<c:choose>
														<c:when test="${tagStatus.index== 0}">
															<c:set var='tagslist' value='${tagResults.tagId}' />
															<c:set var='tagsNamelist' value='${tagResults.tagName}' />
														</c:when>
														<c:otherwise>
															<c:set var='tagslist'
																value='${tagslist},${tagResults.tagId}' />
															<c:set var='tagsNamelist'
																value='${tagsNamelist},${tagResults.tagName}' />
														</c:otherwise>
													</c:choose>
												</c:forEach>
												<li><a data-catagory="<c:out value='${tagslist}' />"
													title="${eventTag.key}" href="javascript:void(0);">${eventTag.key}
														<span class="icon-accordion-closed hidden-md hidden-lg"></span>
														<span class="icon-accordion-opened hidden-md hidden-lg"></span>
												</a>
													<div class="MobileHolderWrapper"></div></li>
											</c:forEach>
										</c:forEach>
									</ul>

								</div>
								<!-- Category Content to Loaded here -->
								<div id="newsEventCatagory">
									<cq:include path="eventservice"
										resourceType="hdscorp/components/content/eventservice" />
									<div id="loadMoreMonth" class="btn-square-red load-more-link">
										<a title="See Next 3 Months of Events"
											href="javascript:void(0);">See Next 3 Months of Events</a>
									</div>

								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

			<!--/ Upcoming Events are Loaded here -->

			<div id="webcasts-demand" class="tab-pane fade">
				<!-- Webcast Demand are Loaded here -->
				<cq:include path="brighttalkfeed"
					resourceType="hdscorp/components/content/brighttalkfeed" />
				<!--/ Webcast Demand are Loaded here -->
			</div>

		</div>
	</div>
</div>