<%@include file="/apps/foundation/global.jsp" %>
<%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %>

<c:set var="columncontent" value="${widgets:getMultiFieldPanelValues(resource, 'columncontent')}"/>


<div class="hitachi-honor clearfix">
<div class="content-container">
    <div class="col-md-8 col-md-offset-2 clearfix">
        <h2>${properties.sectiontitle}</h2>
    </div>

<c:choose>
	<c:when test="${empty columncontent}">
		<wcm:placeholder classNames="cq-dl-placeholder cq-block-placeholder"/>
	</c:when>
	<c:otherwise>

			<c:forEach items="${columncontent}" var="items">
                <c:if test="${not empty items.columncontentdescription}">
            	 <div class="col-sm-4 col-no-pad">
             <div class="hitachi-honor-box">
                 <p>${items.columncontentdescription}</p>
             </div>
             </div>
            </c:if>


			</c:forEach>

	</c:otherwise>
</c:choose>

            <div class="clearfix"></div>
            <div claiss="col-sm-12">
            <p class="tagline">${properties.sectiontagline}</p>
            </div>

    </div>
</div>