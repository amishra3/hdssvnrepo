<%--Brighttalk component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.constants.ServiceConstants"%> 




<div>
    <table>
        <tbody>

        </tbody
        </table>
</div>


   <script type="text/javascript">
 var htmlContent="";

       var feedResponsefromStoredPath=<%=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.BrightTalkScheduler.config","storage.path"), ServiceConstants.SAVE_FEED_DATA_PROPERTY_NAME)%>;
 if(feedResponsefromStoredPath.statusCode!=undefined && feedResponsefromStoredPath.statusCode!=''){
         htmlContent+='<tr><td>'+feedResponsefromStoredPath.statusCode+'</td><td>'+feedResponsefromStoredPath.statusReason+'</td></tr>';
     }
    else{


     for(var count=0; count<feedResponsefromStoredPath.length; count++){

         htmlContent+='<tr><td style="text-decoration: underline;">'+feedResponsefromStoredPath[count].title+'</tr></td><tr><td>'+feedResponsefromStoredPath[count].duration+
             '</td></tr><tr><td>'+feedResponsefromStoredPath[count].author+'</td></tr><tr><td>'+feedResponsefromStoredPath[count].summary+
                 '</td></tr><tr><td>recorded '+feedResponsefromStoredPath[count].updatedDate+'</td></tr><tr><td><img src='+feedResponsefromStoredPath[count].thumbnailPath+'></td></tr>';


     }
    }
    $("table tbody").append(htmlContent);
    </script>

