
<%--
    
      FacebookFeed component component.
    
      This is Facebook feed component
    
    --%>
<%@include file="/apps/foundation/global.jsp"%>
<%@page session="false"%>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.constants.ServiceConstants"%>

<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.FacebookFeedModel"
	var="facebookFeedModel" />



<div class="stay_touch_container">
	<div class="content-container">
		<div class="col-md-12">
			<div class="top-heading">${facebookFeedModel.title}</div>
		</div>
		<div class="stay-inner-coloum">

			<script type="text/javascript">
            var htmlContent="";
            var feedResponsefromStoredPath=<%=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.FacebookSheduler","facebook.storage.path"),ServiceConstants.SAVE_FB_FEED_DATA_PROPERTY_NAME )%>;

            for(var count=0; count<feedResponsefromStoredPath.length; count++){
                var message=feedResponsefromStoredPath[count].message;
                var url=message.substring(message.indexOf("http"));

                var linkUrl="<a href='"+url+"'>"+url+"</a>";

                message=message.replace(url,linkUrl);


                htmlContent+='<div class="col-sm-4"><div class="comment_box"><div class="icon"><img src="${facebookFeedModel.iconPath}" alt="" title=""></div><div class="type">'+feedResponsefromStoredPath[count].createdDate+'</div><div class="description">'+message+
                    '</div></div></div>';
            }
            $(".stay-inner-coloum").append(htmlContent);
        </script>
			<cq:include path="socialconfig"
				resourceType="/apps/hdscorp/components/content/sociallinksconfig" />

		</div>
	</div>