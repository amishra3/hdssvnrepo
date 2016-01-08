<%--
  categoryfacsets component.
--%>


<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>

<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.CategoryFacetsModel" var="model" />

Add values for Category Facets Model  
<br>
All CategoriesLabel :${model.allCategoriesLabel}
	<c:forEach items="${model.categories}" var="data" varStatus="status"> 

                         <br><br>Category ID : ${xss:filterHTML(xssAPI,data['category-id'])}
                            <br> Category Title : ${xss:filterHTML(xssAPI,data['display-title'])}

                             <br>Category Tags :  ${xss:filterHTML(xssAPI,data['category-tag'])}<br>

                             <br><c:forEach items="${data['sub-category']}" var="subCategoryData" varStatus="counter"> 

                                     <br>  Sub Category ID :  ${xss:filterHTML(xssAPI,subCategoryData['sub-category-ID'])}
                                     <br>  Sub Category Title :  ${xss:filterHTML(xssAPI,subCategoryData['sub-category-title'])}

                                     <br>    Sub Category Tags :  ${xss:filterHTML(xssAPI,subCategoryData['sub-category-tag'])}

                               </c:forEach>   

     </c:forEach>

