<%--Blog component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<div class="col-md-6">
    <div class="community-common-box">
        <div class="icon">
            <img title="" alt="" src="${properties.bimagepath}">
        </div>
        <div class="author">${properties.bautherdetails}</div>
        <h5>${properties.btitle}</h5>
        <div class="description"> ${properties.bcontent}</div>
        <div class="comm-read-more">
           <a href="${properties.breadmorelink}" class="animateLink" target="${properties.bopeninnew?'_blank':'_self'}">${properties.breadmore} ${properties.thirdparty?' <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>':'<span class="glyphicon glyphicon-menu-right animateIcon" aria-hidden="true"></span>'}</a>
        </div>
    </div>
</div>