    <%--
    
      FacebookFeed component component.
    
      This is Facebook feed component
    
    --%>
    <%@include file="/apps/foundation/global.jsp"%>
    <%@page session="false" %>
    <%@page import="com.hdscorp.cms.util.PageUtils"%>
    <%@page import="com.hdscorp.cms.constants.ServiceConstants"%> 

    <sling:adaptTo adaptable="${resource}" adaptTo="com.hdscorp.cms.slingmodels.FacebookFeedModel" var="facebookFeedModel" />



    <div class="stay_touch_container" style="background-image: url('${properties.fbbgimage}')">
        <div class="content-container">
        <div class="col-md-12"><div class="top-heading">${facebookFeedModel.title}</div></div>
        <div class="stay-inner-coloum">

        <script type="text/javascript">
            var htmlContent="";
            var feedResponsefromStoredPath=<%=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.FacebookSheduler","facebook.storage.path"),ServiceConstants.SAVE_FB_FEED_DATA_PROPERTY_NAME )%>;

            for(var count=0; count<feedResponsefromStoredPath.length; count++){
                 var facebookPostMsg=feedResponsefromStoredPath[count].message;
           		var facebookPostURL=facebookPostMsg.substring(facebookPostMsg.indexOf('http'),facebookPostMsg.length);
                var facebookHREFLink='<a href='+facebookPostURL+' target="_blank">'+facebookPostURL+'</a>';
				facebookPostMsg=facebookPostMsg.replace(facebookPostURL,facebookHREFLink);
                htmlContent+='<div class="col-sm-4"><div class="comment_box"><div class="icon"><img src="${facebookFeedModel.iconPath}" alt="" title=""></div><div class="type">'+feedResponsefromStoredPath[count].createdDate+'</div><div class="description">'+facebookPostMsg+
                    '</div></div></div>';
            }
            $(".stay-inner-coloum").append(htmlContent);
        </script>
    </div>
<cq:include path="sociallinksconfig" resourceType="/apps/hdscorp/components/content/sociallinksconfig" />
        </div>

