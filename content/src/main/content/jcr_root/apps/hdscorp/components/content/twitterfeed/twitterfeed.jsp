
<%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>

<%@page import="com.hdscorp.cms.util.PageUtils,com.hdscorp.cms.constants.ServiceConstants"%>

<h1>Twitter Feed Component</h1>
<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.TwitterFeedModel"
	var="twitterFeedModel" />

Twitter Title :${twitterFeedModel.title}<br>
BackGround ImageURL:${twitterFeedModel.bGImagePath}<br>
Import path to read from:${twitterFeedModel.importPath}<br>
Social Follow US Label:${twitterFeedModel.socialFollowUsLabel}<br>

<div>
    <table>
        <tbody>

        </tbody
        </table>
</div>


  <script type="text/javascript">
 var htmlContent="";

       var feedResponsefromStoredPath=<%=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.TwitterScheduler","twitter.storagePath"),ServiceConstants.TWITTER_SAVE_FEED_DATA_PROPERTY_NAME )%>;


     for(var count=0; count<feedResponsefromStoredPath.length; count++){

         htmlContent+='<tr><td style="text-decoration: underline;">Twitter ID  :: '+feedResponsefromStoredPath[count].twitterID+'</tr></td><tr><td>'+'</td></tr><tr><td>Twitter MessageText  :: '+feedResponsefromStoredPath[count].twitterMessageText+'</tr></td><tr><td>Twitter Posted Date  :: '+feedResponsefromStoredPath[count].twitterPostedDate+'</td></tr><tr><td>Posted ::  '+feedResponsefromStoredPath[count].timeDifference
             '</td></tr>';


    }
    $("table tbody").append(htmlContent);
    </script>



    
