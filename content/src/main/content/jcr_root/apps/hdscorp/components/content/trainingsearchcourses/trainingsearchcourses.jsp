<%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>


<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.TrainingSearchCoursesModel"
	var="trainingSearchCoursesModel" />

<c:set var="tabList"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"locationlabel-locationid")%>" />

<div class="accordion-level" id="training" tabindex="-1">
	<div class="accordion-menu-container">
		<div class="accordion-menu hidden-sm hidden-md hidden-lg">
			<span id="stickyNav-0" class="acc-label">${trainingSearchCoursesModel.trainingoverviewheadline}</span>
			<span class="icon-accordion-closed"></span> <span
				class="icon-accordion-opened"></span>
		</div>
	</div>
	<div class="accordion-content">
		<div id="overview"></div>
		<div class="service-support-main training clearfix">
			<div class="content-container clearfix">
				<div class="col-sm-12">
					<div class="col-sm-6">
						<div class="serv-training-overview">
							<h2>${trainingSearchCoursesModel.trainingoverviewheadline}</h2>
							${trainingSearchCoursesModel.trainingcertificationintroduction}
							<div class="training-learn">
								<div class="btn-square-red learn-more-red-link">
									<a href="${trainingSearchCoursesModel.traininglearnmorelink}">${trainingSearchCoursesModel.traininglearnmorelabel}</a>
								</div>
							</div>
						</div>
					</div>

					<div class="col-sm-6">
						<div class="serv-training-overview last" id="serviceTraining">
							<h3>${trainingSearchCoursesModel.searchforcourseslabel}</h3>
							<div class="training-search">
								<input type="text"
									placeholder="${trainingSearchCoursesModel.searchkeyword}">
								<span aria-hidden="true" class="glyphicon glyphicon-search"></span>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="daterangepicker" id="two-inputs">
										<div class="calendar left">
											<div class="daterangepicker_input">
												<input type="text" placeholder="" class="from_date"
													id="date-range200"> <i
													class="fa fa-calendar glyphicon glyphicon-calendar"></i>
											</div>
										</div>
										<span class="visible-lg"><strong>${trainingSearchCoursesModel.tolabel}</strong></span>
										<span class="hidden-lg"><strong>${trainingSearchCoursesModel.tolabel}</strong></span>
										<div class="calendar right">
											<div class="daterangepicker_input">
												<input type="text" placeholder="" class="to_date"
													id="date-range201"> <i
													class="fa fa-calendar glyphicon glyphicon-calendar"></i>
											</div>

										</div>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="col-sm-6 center">
										<div class="btn-group">
											<button aria-expanded="false" aria-haspopup="true"
												data-toggle="dropdown"
                                            class="btn dropdown-toggle service-btn" type="button"><span class="buttonLabel">${trainingSearchCoursesModel.selectlocationlabel}</span><span
													aria-hidden="true" class="glyphicon glyphicon-chevron-down"></span>
											</button>
											<ul class="dropdown-menu">
												<c:forEach var="tabList" items="${tabList}">
                                                    <li><a href="javascript:void(0)">${tabList.locationlabel}</a></li>

												</c:forEach>
											</ul>
										</div>
									</div>

									<div class="col-sm-6">
										<div class="src-btn">
											<div class="btn-square-red search-course-btn">
												<a href="javascript:void(0);">${trainingSearchCoursesModel.searchlabel}</a>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

</div>
