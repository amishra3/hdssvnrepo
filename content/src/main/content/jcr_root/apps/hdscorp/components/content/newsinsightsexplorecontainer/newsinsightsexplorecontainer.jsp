<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


  <div class="pr-explore">
      <div class="pr-explore-container">
          <div class="row">
              <div class="col-sm-4">
              	<c:if test="${not empty properties.firstsectiontitle}">
                  	<h2>${properties.firstsectiontitle}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2>
                  </c:if>
                  
                  <cq:include path="firstpar" resourceType="foundation/components/parsys" />
              </div>
              <div class="col-sm-4">
               <c:if test="${not empty properties.secondsectiontitle}">
                   <h2>${properties.secondsectiontitle}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2>
                </c:if>
                
                <cq:include path="secondpar" resourceType="foundation/components/parsys" />
                
              </div>
              <div class="col-sm-4">
              	<c:if test="${not empty properties.thirdsectiontitle}">
                  	<h2>${properties.thirdsectiontitle}<span aria-hidden="true" class="glyphicon glyphicon-menu-right animateIcon"></span></h2>
                     </c:if>

						<cq:include path="thirdpar" resourceType="foundation/components/parsys" />

                 </div>
             </div>
         </div>
     </div>