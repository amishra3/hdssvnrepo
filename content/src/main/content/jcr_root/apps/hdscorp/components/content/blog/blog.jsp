<%--Blog component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.BlogModel" var="blogModel" />

<img src="${blogModel.bimagepath}" />
Blog Image Path: ${blogModel.bimagepath} <br>

Blog Author: ${blogModel.bautherdetails} <br>

Blog Title: ${blogModel.btitle} <br>

Blog Content: ${blogModel.bcontent} <br>

Blog Read More: ${blogModel.breadmore} <br>

Blog Read More Link: ${blogModel.breadmorelink} <br>

Blog Open in new Window: ${blogModel.bopeninnew} <br>

<c:choose>
    <c:when test="${blogModel.bopeninnew=='true'}">
        <a href="${blogModel.breadmorelink}" target="_blank">${blogModel.breadmore}</a>
</c:when>

    <c:otherwise>
         <a href="${blogModel.breadmorelink}">${blogModel.breadmore}</a>

    </c:otherwise>

</c:choose>


