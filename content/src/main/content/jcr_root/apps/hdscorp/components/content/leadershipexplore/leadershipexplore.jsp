<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>

<c:set var="leadershipList"
	value="<%=PageUtils.convertMultiWidgetToList(properties,"leiconimage-leiconimagelabel-lesctionimagealttext-leicondate-lecontent-lereadmorelabel-lereadmorelabellink-leopeninnewwindow-leiconimagealt")%>" />





<div class="pr-explore aboutleader-bg" style="background-image: url('${properties.lesectionbgimage}')">
	<div class="pr-explore-container">

		<div class="row">

					<h2 class="col-sm-12">

                        <c:choose>
				<c:when test="${properties.lesectionopeninnewwindow}">

						<a class="animateLink" href="${properties.lesectionlink}" target="_blank">${properties.lesectionlabel}
                            <span class="glyphicon glyphicon-share animateIcon"
							aria-hidden="true"></span>
						</a>
</c:when>
				<c:otherwise>

                    <a class="animateLink" href="${properties.lesectionlink}">${properties.lesectionlabel}
                            <span class="glyphicon glyphicon-menu-right animateIcon"
							aria-hidden="true"></span>
                        </a>
                    </c:otherwise>


			</c:choose>

                            </h2>

			<c:forEach items="${leadershipList}" var="leadershipList">

				<div class="col-sm-4">
					<div class="pr-common-box">
						<div class="icon">
							<img src="${leadershipList.leiconimage}" alt="${leadershipList.leiconimagealt}" title="${leadershipList.leiconimagealt}">
						</div>

						<div class="type">${leadershipList.leiconimagelabel},
							${leadershipList.leicondate}</div>
						<div class="description">${leadershipList.lecontent}</div>



						<div class="read-more">
                            <c:choose>
								<c:when test="${leadershipList.leopeninnewwindow == '1'}">

									<a class="animateLink" href="${leadershipList.lereadmorelabellink}"
										target="_blank" >${leadershipList.lereadmorelabel } <span
										aria-hidden="true"
										class="glyphicon glyphicon-share"></span></a>

								</c:when>
								<c:otherwise>

									<a class="animateLink" href="${leadershipList.lereadmorelabellink}"
										>${leadershipList.lereadmorelabel }<span
										aria-hidden="true"
										class="glyphicon glyphicon-menu-right animateIcon"></span></a>


								</c:otherwise>


							</c:choose>
							


						</div>
					</div>
				</div>
			</c:forEach>

		</div>
	</div>
</div>