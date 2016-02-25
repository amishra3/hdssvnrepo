<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<cq:include path="productdescriptions" resourceType="hdscorp/components/content/partnerdescriptioncontent/partnerdescription" />

${properties.backgroundimagepath}<br/>
${properties.partnericonimagepath}<br/>
${properties.partnericonimagealttext}