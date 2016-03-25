<%--

  Training Detail  FilteringComponent component.

  This is Training Detail Filtering Component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>
<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.TrainingDetailFilterModel"
	var="trainingDetailFilterModel" />

<div class="clearfix"> <!--main start-->
<div class="content-container" id="trainingDetail">
<div class="hds-training-cale training-date-pick">
                        <div class="container-fluid">

                           <div class="row">           
                                                <div class="col-md-2 col-xs-6 showsec visible-md visible-lg">
                                                    <label>${trainingDetailFilterModel.tdfShowingFromLabel}</label>
                                                </div>
												<div class="col-md-2 col-xs-6 showsec visible-xs visible-sm">
                                                    <label>${trainingDetailFilterModel.tdfShowingFromLabel}:</label>
                                                </div>
												<div style="padding-left:6px;" class="col-xs-6 visible-xs visible-sm"><label>${trainingDetailFilterModel.tdfShowingToLabel}:</label>

                                                </div>
 
                                                <div class="col-md-6 calendar_bxes">
                                                <div class="daterangepicker" id="two-inputs">
                                                    <div class="calendar left">
                                                        <div class="daterangepicker_input">
                                                            <input type="text" class="from_date" placeholder="" id="date-range200">
                                                            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
                                                        </div>
                                                    </div>
                                                    <span class="visible-lg visible-md"><strong>${trainingDetailFilterModel.tdfShowingToLabel}</strong></span>	
                                                    <div class="calendar right">
                                                       <div class="daterangepicker_input">
                                                            <input type="text" class="to_date" placeholder="" id="date-range201">
                                                            <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 key-wrd-src">
                                                <div class="daterangepicker">
                                                    <div class="daterangepicker_input visible-lg visible-md">
                                                       <input type="text" class="search" placeholder="${trainingDetailFilterModel.tdfKeywordSearchLabel}">
                                                     </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 srching">
                                                <div class="src-btn">
                                                      <div class="btn-square-red search-course-btn">
                                                         <a href="javascript:void(0);">${trainingDetailFilterModel.tdfSearchLabel}</a>
                                                     </div>
                                                  </div>
                                            </div>
                        <div class="errorSearchField alert alert-danger fade in"></div>                       
                    </div>
                        </div>
                    </div>