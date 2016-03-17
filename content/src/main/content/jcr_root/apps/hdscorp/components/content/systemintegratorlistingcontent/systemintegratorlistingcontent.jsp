<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>

<c:set var="industryfilterlist" value="${widgets:getMultiFieldPanelValues(resource, 'industryfilterlist')}"/>
<c:set var="contenttypefilterlist" value="${widgets:getMultiFieldPanelValues(resource, 'contenttypefilterlist')}"/>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.SystemIntegratorsContentModel" var="systemIntegratorsContentModel" />

<div class="partners-section" id="partnerDetailSection">
                <div class="content-container container-fluid">
                    <div class="partner-program clearfix">
                        <div class="heading">
                            <div class="icon">
                                <img src="${properties.siiconpath}" alt="">
                            </div>
                            <h2>${properties.sittitle}</h2>
                        </div>						
						<div class="partner-filters-search clearfix">
							<div class="content-container clearfix">
							
								<div class="col-sm-5 partner-filters hidden-xs hidden-sm">
									<a class="filterby" href="javascript:void(0);" data-refilter="FilterByIndustry">
										<span class="title">${properties.industryfilterlabel}</span>
										<span class="caret-arrow"></span>
									</a>
									<a class="filterby" href="javascript:void(0);" data-refilter="FilteyContentType">
										<span class="title">${properties.contentfilterlabel}</span>
										<span class="caret-arrow"></span>
									</a>
								</div>
							</div>
							
							<div class="content-container clearfix filters-section less" id="FilterByIndustry">
								<div class="col-sm-9 filters-list col-sm-offset-3">
									<ul class="FilterByIndustryList">
									<c:forEach items="${industryfilterlist}" var="definition">
								<c:set var="industryfiltertitle" value="${xss:encodeForHTML(xssAPI, definition['industryfiltertitle'])}"/>
								<c:set var="industryTag" value="${xss:encodeForHTML(xssAPI, definition['industryTag'])}"/>
								<c:set var="industryTag" value="${hdscorp:removeDoubleQuotes(industryTag)}"/>
										<li class="col-xs-4"><div class="checkbox">
											<input class="filters" type="checkbox" name="cbxFunction"  id="${fn:replace(fn:replace(industryTag,'[', ''),']', '')}" value="${fn:replace(fn:replace(industryTag,'[', ''),']', '')}">
											<label for="${fn:replace(fn:replace(industryTag,'[', ''),']', '')}" class="hds-icon"><span>${industryfiltertitle}</span></label>
										</div></li>									
									</c:forEach>
									</ul>
									<div class="clearfix"></div>
									<div class="show-results hidden-sm hidden-xs">
										<div class="btn-square-red">
											<a href="javascript:void(0);" target="_self" id="showIndustry">${properties.sishowresultslabel}</a>
										</div>
									</div>
								</div>
							</div>
						
							<div class="content-container clearfix filters-section less" id="FilteyContentType">
								<div class="col-sm-9 filters-list col-sm-offset-3">
									<ul class="FilterByContentList">
									<c:forEach items="${contenttypefilterlist}" var="definition">
								<c:set var="contentfiltertitle" value="${xss:encodeForHTML(xssAPI, definition['contentfiltertitle'])}"/>
								<c:set var="contentTag" value="${xss:encodeForHTML(xssAPI, definition['contentTag'])}"/>
								<c:set var="contentTag" value="${hdscorp:removeDoubleQuotes(contentTag)}"/>
										<li class="col-xs-4"><div class="checkbox">
											<input class="filters" type="checkbox" name="cbxFunction"  id="${fn:replace(fn:replace(contentTag,'[', ''),']', '')}" value="${fn:replace(fn:replace(contentTag,'[', ''),']', '')}">
											<label for="${fn:replace(fn:replace(contentTag,'[', ''),']', '')}" class="hds-icon"><span>${contentfiltertitle}</span></label>
										</div></li>									
									</c:forEach>
									</ul>
									<div class="clearfix"></div>
									<div class="show-results hidden-sm hidden-xs">
										<div class="btn-square-red">
											<a href="javascript:void(0);" target="_self" id="showContentType">${properties.sishowresultslabel}</a>
										</div>
									</div>
								</div>
							</div>							
							<div class="content-container clearfix">
								<div class="col-md-12 col-xs-12 tagList">
									<div class="groupedby" id="searchTag" style="display:none;">
										<div class="label">Searched by: </div>
										<div class="keyword"></div>
									</div>
									<div class="groupedby" id="filterTag">
										<div class="label" style="display:none;">Filterd by: </div>
										<div class="keyword-subcat"></div>
										<div class="keyword-filter" style="display:none;"></div>
									</div>
								</div>																
								
							</div>
							
							
							<!-- Mobile Placeholders -->
							<!-- The dark background -->
							<div class="bgCover">&nbsp;</div>
							<div class="overlayBox hidden-md hidden-lg">
								<div class="heading">
									<h3>SEARCH</h3>
									<div class="close-search">
										<a href="javascript:void(0);" title="Close" class="closeOverlay">
											<img src="images/sprites/close.png" alt="Close"></a>
									</div>

								</div>
								<div class="cat-filter-scroll">
									<div class="searchArea"></div>
									<div class="filtrSideBar"></div>
									<div class="topFilter">
										<h4>${properties.industryfilterlabel}</h4>
										<div class="FilterAreaIndustry"></div>
										<h4 class="last">${properties.contentfilterlabel}</h4>
										<div class="FilterAreaContent"></div>
									</div>
								</div>
								<div class="FilterAreaBtnPop">
								<div class="clearfix"></div>
										<div class="show-results">
											<div class="btn-square-red">
												<a href="javascript:void(0);" target="_self" id="mobShowFilters">${properties.sishowresultslabel}</a>
											</div>
										</div>
									<div class="clearfix"></div>
								<div class="clear-results">
									<div class="btn-square-red">
										<a href="#" target="_self">Clear All FIlters</a>
									</div>
								</div>
								</div>
							</div>
						 <!-- Mobile Placeholders -->
							
							
						</div>
                     <c:forEach var="partner" items="${systemIntegratorsContentModel.partners}" varStatus="loopcnt">
						<div class="partner-list clearfix" id="partner-list">
						<div class="partner col-xs-6 col-sm-2 col-md-2 col-lg-2" data-indstry="Information Technology" data-contenttype="Datasheets" data-pname="Adobe B-Series">
                                <div class="logo">
                                    <img src="${partner.partnerIconImagePath}" alt="" class="img-responsive">
                                </div>
                                <div class="partner-detail" style="background-image:url(${partner.partnerBackgroundImagePath});)">
                                    <div class="close">
                                        <img src="images/partner-detail-close.png">
                                    </div>
                                    <h2 class="ptitle"> ${partner.partnerName}</h2>
                                    <h4>${partner.partnerHeadLine}</h4>
                                    <p> ${partner.partnerIntroduction}</p>


                            </div>
                            </div>
							
							 </div>
							  </c:forEach>
							 </div>
							 </div>						
                    </div>


