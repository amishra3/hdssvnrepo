<%@page session="false"%>

<%@ page import="org.apache.sling.api.resource.ResourceResolver,
					com.day.cq.wcm.commons.WCMUtils,
					com.day.cq.wcm.api.components.Toolbar"%>

<%@include file="/apps/foundation/global.jsp"%>

<%-- HTML Container:
if in edit mode, render the component so authors can see full "component" as it will appear on preview mode
--%>

<c:choose>
    <c:when test="${wcmMode eq editMode or wcmMode eq designMode}">
        <c:choose>
            <c:when test="${properties.disable}">
                <%
                    if (editContext != null) {
                        Toolbar tb = editContext.getEditConfig().getToolbar();
                        tb.add(2,new Toolbar.Label("Disabled"));
                        tb.add(3, new Toolbar.Separator());
                    }
                %>
            </c:when>
            <c:otherwise>
                <c:choose>
                    <c:when test = "${properties.markup != null}">
                        <div class ="injectioncontainerwrapper">
                            ${properties.markup}
                        </div>
                        <style type="text/css">
                            ${properties.style}
                        </style>
                        <script type="text/javascript">
                            ${properties.script}
                        </script>
                    </c:when>
                </c:choose>
            </c:otherwise>
        </c:choose>
    </c:when>
    <c:otherwise>
        <c:choose>
            <c:when test="${not properties.disable}">
                <div class="${properties.name}">
                    ${properties.markup}
                </div>
                <style type="text/css">
                    ${properties.style}
                </style>
                <script type="text/javascript">
                    ${properties.script}
                </script>
            </c:when>
        </c:choose>
    </c:otherwise>
</c:choose>

