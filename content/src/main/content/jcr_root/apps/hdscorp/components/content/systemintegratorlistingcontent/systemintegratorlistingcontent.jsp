<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<c:set var="industryfilterlist" value="${widgets:getMultiFieldPanelValues(resource, 'industryfilterlist')}"/>
<c:set var="contenttypefilterlist" value="${widgets:getMultiFieldPanelValues(resource, 'contenttypefilterlist')}"/>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.SystemIntegratorsContentModel" var="systemIntegratorsContentModel" />

<div id="partnerDetailSection" class="partners-section">
    <div class="content-container container-fluid">
        <div class="partner-program clearfix">
            <div class="heading clearfix">
                <div class="icon">
                    <img alt="" src="${properties.siiconpath}">
                </div>
                <h2>${properties.sittitle}</h2>
               	<c:if test="${empty properties.hideindustryfilter}">
	                <div class="partner-filters hidden-xs hidden-sm">
						<a data-refilter="FilterByIndustry" href="javascript:void(0);" class="filterby">
							<span class="title">${properties.industryfilterlabel}</span>
							<span class="caret-arrow"></span>
						</a>
					</div>
				</c:if>
            </div>		
			<c:if test="${empty properties.hideindustryfilter}">
			<div class="partner-filters-search clearfix">
				<div class="content-container clearfix">
					<div class="hidden-md hidden-lg col-xs-12 search-overlay">
						<div class="launchLink">
							${properties.sisearchpartnerlabel} <span aria-hidden="true" class="glyphicon glyphicon-search"></span> 
						</div>
					</div>					
				</div>
				
					<div id="FilterByIndustry" class="content-container clearfix filters-section less">
						<div class="col-sm-9 filters-list col-sm-offset-3">
							
								<ul class="FilterByIndustryList">
									<c:forEach items="${industryfilterlist}" var="definition">
			    						<c:set var="industryfiltertitle" value="${xss:encodeForHTML(xssAPI, definition['industryfiltertitle'])}"/>
			                            <c:set var="industryTag" value="${xss:encodeForHTML(xssAPI, definition['industryTag'])}"/>
			                            <c:set var="industryfilterid" value="${xss:encodeForHTML(xssAPI, definition['industryfilterid'])}"/>
										<c:set var="industryTag" value="${hdscorp:removeDoubleQuotes(industryTag)}"/>
		
										<li class="col-xs-4"><div class="checkbox">
											<input class="filters" type="checkbox" name="cbxFunction"  id="${industryfilterid}" value="${fn:replace(fn:replace(industryTag,'[', ''),']', '')}">
											<label for="${industryfilterid}" class="hds-icon"><span>${industryfiltertitle}</span></label>
										</div></li>									
									</c:forEach>
								</ul>
	
							<div class="clearfix"></div>
							<div class="show-results hidden-sm hidden-xs">
								<div class="btn-square-red">
									<a id="showIndustry" target="_self" href="javascript:void(0);">${properties.sishowresultslabel}</a>
								</div>
							</div>
						</div>
					</div>				
				<div class="content-container clearfix">
					<div class="col-md-12 col-xs-12 tagList">
						<div id="filterTag" class="groupedby">
							<div style="display:none;" class="label">${properties.sifilterbylabel} </div>
							<div style="display:none;" class="keyword-filter"></div>
						</div>
					</div>
				</div>

				<!-- Mobile Placeholders -->
				<!-- The dark background -->
				<div class="bgCover" style="opacity: 0; display: none;">&nbsp;</div>
				<div class="overlayBox partner-mobile hidden-md hidden-lg" style="display: none;">
					<div class="heading">
						<h3>${properties.sisearchpartnerlabel}</h3>
						<div class="close-search">
							<a class="closeOverlay" title="Close" href="javascript:void(0);">
								<img alt="Close" src="images/sprites/close.png"></a>
						</div>

					</div>
					<div class="cat-filter-scroll">
						<div class="topFilter">
							<h4>${properties.industryfilterlabel}</h4>
							<div class="FilterAreaIndustry"></div>
						</div>
					</div>
					<div class="FilterAreaBtnPop">
					<div class="clearfix"></div>
							<div class="show-results">
								<div class="btn-square-red">
									<a id="mobShowFilters" target="_self" href="javascript:void(0);">${properties.sishowresultslabel}</a>
								</div>
							</div>
						<div class="clearfix"></div>
					<div class="clear-results">
						<div class="btn-square-red"> 
							<a target="_self" href="#">${properties.siclearallfilterslabel}</a>
						</div>
					</div>
					</div>
				</div>
			 <!-- Mobile Placeholders -->
			</div>
			</c:if>
					<div class="partner-list clearfix" id="partner-list">

						<c:forEach var="systemIntegrators" items="${systemIntegratorsContentModel.systemIntegrators}" varStatus="loopcnt">
									<c:forEach var="industryTadIds" items="${systemIntegrators.industryTadIds}" varStatus="loop">
                    <c:choose>
						<c:when test="${loop.index== 0}">
 						<c:set var="industryTadIds1" value="${industryTadIds}" /> 

						</c:when>
				<c:otherwise>
			            <c:set var='industryTadIds1' value='${industryTadIds1},${industryTadIds}' />
				</c:otherwise>
							</c:choose>


                                    </c:forEach>
                            <div class="partner col-xs-6 col-sm-6 col-md-2 col-lg-2" data-indstry="${industryTadIds1}">
                                <div class="logo">
                                    <img src="${systemIntegrators.partnerIconImagePath}" alt="${systemIntegrators.partnerIconImageAltText}" title="${systemIntegrators.partnerIconImageAltText}" class="img-responsive">
                                </div>
                                <div class="partner-detail">
                                    <div class="close"></div>
                                    <h2 class="ptitle"> ${systemIntegrators.partnerName}</h2>
                                    <h4>${systemIntegrators.partnerHeadLine}</h4>
                                    <p> ${systemIntegrators.partnerIntroduction}</p>

										<c:forEach var="column" items="${systemIntegrators.contentCell}" varStatus="loop">
                                        		<a class="animateLink" href="${column.seemoretargeturl}" target="${column.seemorenewwin==1?'_blank':'_self'}">${column.seemorelabel}${column.thirdparty==1?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':' <span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a><br>
                                        </c:forEach>
                           		 </div>
                			</div> 
				
				 
				     </c:forEach>
			</div>



        </div>
    </div>
</div>