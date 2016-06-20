<%@include file="/apps/foundation/global.jsp" %>
<%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %>

<c:set var="wemeanbusiness" value="${widgets:getMultiFieldPanelValues(resource, 'wemeanbusiness')}"/>


<div class="numbers clearfix">
    <div class="content-container">
         <h2>${properties.wemeanbusinesstitle}</h2>

<c:choose>
	<c:when test="${empty wemeanbusiness}">
		<wcm:placeholder classNames="cq-dl-placeholder cq-block-placeholder"/>
	</c:when>
	<c:otherwise>

			<c:forEach items="${wemeanbusiness}" var="items">

             <div class="si-comm-box col-md-4">
             <div class="title"><span>${items.columncontentvalue}</span>${items.columncontentvaluetitle}</div>
             <div class="description">
                 <span>${items.columncontentdescription}</span>
             </div>
             </div> 

			</c:forEach>

	</c:otherwise>
</c:choose>

    </div>
</div>

