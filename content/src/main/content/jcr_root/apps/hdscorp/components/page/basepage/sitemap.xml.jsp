<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/etc/designs/hdscorp/clientLibs/xsl/sitemap.xsl"?><%
%><%@page contentType="application/xml;charset=ISO-8859-1"%>
<%--


Following things can be configured:
1)  "Change Frequency" and "Priority" both of which are page properties for each page
2)  To prevent a page from appearing in sitemap, enable the "Hide in Navigation" in the page properties for that page
3)  To prevent all the descendants of a page from appearing in sitemap, select "No" for "Display Descendants" in Sitemap-Settings in page properties for that page
--%>
<%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false"%><%
%><%@page import="java.util.*,
               com.day.cq.wcm.api.PageFilter,
               org.apache.sling.api.resource.ResourceResolver,
               org.apache.sling.api.resource.ValueMap,
               com.hdscorp.cms.util.PropertyResolver"%><%
%>
<c:set var="hidepdfsinsitemap" value="<%=pageProperties.getInherited("hidepdfsinsitemap", false) %>"/>

 <%

    Page navRootPage = currentPage.getAbsoluteParent(1); //Get Main Navigation Root
	String 	rlpdfspath = pageProperties.getInherited("rlpdfspath", "/content/dam/public/en_us/pdfs");
    String domain = request.getServerName();
    Integer integerPort = new Integer(request.getServerPort());
    String port = integerPort.toString();
    if(!(port.equals(""))&&(!(port.equals("80"))))
    {
        domain += (":" + port);
    }
    if(navRootPage == null && currentPage != null) //Check if page exists
    {
        navRootPage = currentPage;
    }
    if(navRootPage != null)
    {
        out.write("\n<urlset xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\" xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
        %>
        out.write("<url>\n");
        out.write("<loc>http://<%=domain%></loc>\n");
        out.write("</url>\n");
        <%=PropertyResolver.buildSubList(navRootPage,domain)%>
        <c:if test="${!hidepdfsinsitemap}">
        	<%=PropertyResolver.buildAssetSitemap(rlpdfspath,domain)%>
        </c:if>
    <%
        out.write("</urlset>\n");
    }
	%>
