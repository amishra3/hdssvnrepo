<%--

  FacebookFeed component component.

  This is Facebook feed component

--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.constants.ServiceConstants"%> 

<h1>Facebook Feed Component</h1>
<sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.FacebookFeedModel" var="facebookFeedModel" />

Facebook Title :${facebookFeedModel.title}<br>
Background Image Path:${facebookFeedModel.bGImagePath}<br>
<img src="${facebookFeedModel.bGImagePath}"></br>
Import path to read from:${facebookFeedModel.importPath}<br>
Facebook Icon path:${facebookFeedModel.iconPath}<br>
<img src="${facebookFeedModel.iconPath}"></br>
Social Follow US Label:${facebookFeedModel.socialFollowUsLabel}<br>



<div>
    <table>
        <tbody>

        </tbody
        </table>
</div>


   <script type="text/javascript">
 var htmlContent="";

       var feedResponsefromStoredPath=<%=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.FacebookFeedSheduler","facebook.storage.path"), ServiceConstants.SAVE_FB_FEED_DATA_PROPERTY_NAME)%>;


     for(var count=0; count<feedResponsefromStoredPath.length; count++){

         htmlContent+='<tr><td style="text-decoration: underline;">'+feedResponsefromStoredPath[count].createdDate+'</tr></td><tr><td>'+feedResponsefromStoredPath[count].message+
             '</td></tr>';


    }
    $("table tbody").append(htmlContent);
    </script>

