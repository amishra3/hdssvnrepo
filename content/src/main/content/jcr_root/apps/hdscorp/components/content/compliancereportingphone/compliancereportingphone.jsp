<%@page session="false"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>
<c:set var="contentColumns" value="<%=PageUtils.convertMultiWidgetToList(properties,"contentcountry-contentacode-contentaccessnumber-contentnotes")%>" />



<div class="injectioncontainerwrapper">
<div class="hds-compliance">
    <h1>${properties.sectiontitle}</h1>
	<div class="content-container">${properties.sectionsubtext}

	<div class="row">
	<div class="col-md-12">
	<div class="compliance-section">
	  <table class="table-bordered table-striped table-condensed">
		<thead>
			<tr>	
				<th>${properties.country}</th>
                <th>${properties.acode}</th>
                <th>${properties.accessnumber}</th>
                <th>${properties.notes}</th>
			</tr>
		</thead>			
		<tbody>
            <c:forEach var="column" items="${contentColumns}" varStatus="loop">
                    <tr>
        
        
                        <td data-title="${properties.country}"><p>${column.contentcountry}</p></td>
                        <td data-title="${properties.acode}"><p>${column.contentacode}</p></td>
                        <td data-title="${properties.accessnumber}"><p>${column.contentaccessnumber}</p></td>
                        <td data-title="${properties.notes}"><p>${column.contentnotes}</p></td>
                    </tr>
			</c:forEach>

			
		</tbody>
</table>
		   </div>		
		</div>	 
	 </div>	 
  </div>
</div>
    </div>