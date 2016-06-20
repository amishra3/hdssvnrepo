<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


<cq:include path="productdescriptions" resourceType="hdscorp/components/content/systemintegrationcontent/partnerdescription" />

${properties.sibackgroundimagepath}<br/>
${properties.siiconimagepath}<br/>
${properties.siiconimagealttext}