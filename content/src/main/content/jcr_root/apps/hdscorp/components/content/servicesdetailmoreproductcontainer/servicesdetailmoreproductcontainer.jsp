<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<div class="resources-section service-detail-resource">
<div class="resources-container container-fluid">
    <c:if test="${not empty properties.sectiontitle}">
                            <h3 class="resources-title">${properties.sectiontitle}</h3>
    </c:if>
                            <!-- row start -->
                            <cq:include path="communitycontentpar" resourceType="hdscorp/components/content/column-control" />
                            <!-- row end -->
    </div>
    </div>