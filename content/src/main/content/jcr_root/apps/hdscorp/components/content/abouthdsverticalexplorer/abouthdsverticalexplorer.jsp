<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="java.util.Map"%>
<%@page import=" org.apache.sling.api.resource.*,
 org.apache.sling.api.scripting.*,
 org.apache.sling.jcr.api.*,
 javax.jcr .*,
 java.lang.String.*,com.day.cq.wcm.api.*,org.apache.sling.api.resource.*"%>

 <%@page import="java.util.Date"%>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.AboutHDSVerticalExplorerModel" var="aboutHDSVerticalExplorerModel" />

<div class="about-hds-events blog-left" style="background-image: url('${aboutHDSVerticalExplorerModel.backgroundImagePath}')">                             
	<div class="hidden-sm hidden-md hidden-lg">
		<img src="${aboutHDSVerticalExplorerModel.backgroundImagePath}" alt="" class="img-responsive">
	</div>

    <div class="about-hds-events-content"> 
        <div class="date-stamp hidden-sm hidden-md hidden-lg">
			<span><img src="${properties.deviceimagepath}" alt=""></span>
			<span>${aboutHDSVerticalExplorerModel.iconImageLabel}, ${aboutHDSVerticalExplorerModel.iconImageDate}</span>
		</div>

        <div class="date-stamp hidden-xs">
            <img alt="${aboutHDSVerticalExplorerModel.iconImageLabel}" src="${aboutHDSVerticalExplorerModel.iconImagePath}">
            <span>${aboutHDSVerticalExplorerModel.iconImageLabel}, ${aboutHDSVerticalExplorerModel.iconImageDate}</span>
        </div>
        <div class="clearfix"></div>
        <div class="title">
            <a href="${properties.aheiconbimagedesclink}">${aboutHDSVerticalExplorerModel.iconImageDesc}</a>

        </div>
    </div>
</div>