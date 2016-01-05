<%@include file="/apps/foundation/global.jsp"%>

<c:set var="id" value="${properties.id}"/>


<c:if test="${empty properties.isaccordincontainer }">
	<c:choose>
	    <c:when test="${not empty id}">
	        <div id="${properties.id}" class="${properties.class}"><cq:include path="wrapper-parsys" resourceType="foundation/components/parsys"/></div>
	    </c:when>
	    <c:otherwise>
	        <cq:include path="wrapper-parsys" resourceType="foundation/components/parsys"/>
	    </c:otherwise>
	</c:choose>
</c:if>


<c:if test="${not empty properties.isaccordincontainer }">
	<div class="accordion-menu-container">
		<div class="accordion-menu hidden-sm hidden-md hidden-lg">
			<span class="acc-label" id="stickyNav-${properties.accordincontentsectionnumber}">${properties.mobileaccordinsectiontitle}</span> <span
				class="icon-accordion-closed"></span> <span
				class="icon-accordion-opened"></span>
		</div>
	</div>

	<div class="accordion-content">
		<c:choose>
			<c:when test="${not empty id}">
				<div id="${properties.id}" class="${properties.class}">
					<cq:include path="wrapper-parsys" resourceType="foundation/components/parsys" />
				</div>
			</c:when>
			<c:otherwise>
				<cq:include path="wrapper-parsys" resourceType="foundation/components/parsys" />
			</c:otherwise>
		</c:choose>
	</div>
</c:if>

<wcmmode:edit>
	<c:if test="${not empty id}">
		<p>
			<span class="cq-text-placeholder-ipe">Configure ${properties.id} content here.</span>
		</p>
	</c:if>
    <cq:include path="end" resourceType="/apps/hdscorp/components/content/manual-id-wrapper/end" />
</wcmmode:edit>
