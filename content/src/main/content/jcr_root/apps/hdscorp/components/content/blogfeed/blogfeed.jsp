<%--Brighttalk component.--%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.constants.ServiceConstants"%> 
<%@page import="com.hdscorp.cms.util.ServiceUtil"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>


<div>
    <table>
        <tbody>

        </tbody
        </table>

</div>


   <script type="text/javascript">
 var htmlContent="";

       var feedResponsefromStoredPath=<%=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.BlogScheduler.config","storage.path"), ServiceConstants.SAVE_BLOG_FEED_DATA_PROPERTY_NAME)%>;

       alert(feedResponsefromStoredPath);
 if(feedResponsefromStoredPath.statusCode!=undefined && feedResponsefromStoredPath.statusCode!=''){
         htmlContent+='<tr><td>'+feedResponsefromStoredPath.statusCode+'</td><td>'+feedResponsefromStoredPath.statusReason+'</td></tr>';
     }
    else{


     for(var count=0; count<feedResponsefromStoredPath.length; count++){
			var desc=feedResponsefromStoredPath[count].description;
         if(desc.length>215)
         {
             desc=desc.substring(0, 210).concat("...");
         }
         htmlContent+='<tr><td style="text-decoration: underline;">'+feedResponsefromStoredPath[count].title+'</tr></td><tr><td>'+feedResponsefromStoredPath[count].author+
             '</td></tr><tr><td>'+feedResponsefromStoredPath[count].link+'</td></tr><tr><td>'+desc+
                 '</td></tr>';


     }
    }
    $("table tbody").append(htmlContent);
    </script>

