<%--

  categoryfacsets component.



--%>
<%
%><%@include file="/apps/foundation/global.jsp"%>
<%
%><%@page session="false"%>
<%
%><%@ page import="org.apache.sling.commons.json.JSONObject"%>
<%@ page import="org.apache.sling.commons.json.JSONArray"%>

<%@ page import="java.io.PrintWriter"%>
<%@ page import="java.util.Arrays"%>
<%@include file="/apps/foundation/global.jsp"%>
<%@ page import="com.day.cq.wcm.api.WCMMode"%>
<%@page session="false"%>
<%@page import="javax.jcr.PropertyIterator"%>
<%
	// TODO add you code here
%>



<%
if (currentNode.hasProperty("allCategoriesLabel")) {
    Property allCategoriesLabel=currentNode.getProperty("allCategoriesLabel");%>
<h3>
    AllCategoriesLabel&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<%=allCategoriesLabel.getValue()%></h3>


<%}
    try {



        Property property = null;
        if (currentNode.hasProperty("categories")) {
            property = currentNode.getProperty("categories");
        }
        if (property != null) {
            JSONObject obj = null;

            Value[] values = null;
            if (property.isMultiple()) {
                values = property.getValues();
            } else {
                values = new Value[1];
                values[0] = property.getValue();
            }
            for (Value val : values) {
                obj = new JSONObject(val.getString());
%>

<h3>
    CategoryDisplayTitle&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b><%= obj.get("display-title") %></b>,
	<h3 />

	<h3>
        CategoryTagID &nbsp&nbsp&nbsp :&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b><%= obj.get("category-tag") %></b>,
	</h3>



	<%
                JSONObject cs = null;

                if(obj.get("sub-category") != null){
                    JSONArray subcate = new JSONArray(String.valueOf(obj.get("sub-category")));

                    for(int r = 0; r < subcate.length(); r++){
                        cs = new JSONObject(String.valueOf(subcate.get(r)));%>
	<h3>
        SubcategoryDisplayTitle&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<%=cs.get("sub-category-title")%>
	</h3>
	<h3>
        SubCategoryTagId&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<%=cs.get("sub-category-tag") %></h3>
	<% }
                }%>

	<%
            }
        } else {
%>
	Add values in dialog <br>
	<br>
	<%
        }
    } catch (Exception e) {
        e.printStackTrace(new PrintWriter(out));
    }

    %>