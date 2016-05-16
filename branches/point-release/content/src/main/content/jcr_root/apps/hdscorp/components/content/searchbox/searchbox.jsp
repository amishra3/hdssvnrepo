<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>


<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.SearchBoxModel" var="mySearchBox" />


 		 Search Button Icon Image <img src="${mySearchBox.sbimage}" /> <br>
 		Search Button Icon Image Path: ${mySearchBox.sbimage}<br>
        Search Box Text: ${mySearchBox.sbboxtext}<br>
      	Clear Search button label: ${mySearchBox.sbclearbutton}<br>       
     	Load more button display count:  ${mySearchBox.sbloadmorebutton}<br>

