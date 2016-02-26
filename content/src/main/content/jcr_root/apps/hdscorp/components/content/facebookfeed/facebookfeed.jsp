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
                var facebookPostMsg="";
                var title="";
                var link="";
                var thumbnail="";
                var desc="";
                if(feedResponsefromStoredPath[count].message!=null){
                    facebookPostMsg=feedResponsefromStoredPath[count].message;				
                    facebookPostMsg=facebookPostMsg.replace("\r\n", "\r\n");

                }

                if(feedResponsefromStoredPath[count].tilte!=null){
                    title=feedResponsefromStoredPath[count].tilte;
                }


                  if(feedResponsefromStoredPath[count].link!=null){
                    link=feedResponsefromStoredPath[count].link;
                }

                 if(feedResponsefromStoredPath[count].thumbnail!=null){
                    thumbnail=feedResponsefromStoredPath[count].thumbnail;
                }


                if(facebookPostMsg.length> 235){
			     facebookPostMsg=facebookPostMsg.substring(0,235)+"...";
                }

                var facebookHREFLink='<a href='+link+' target="_blank">'+link+'</a>';              
				title=title.replace(link,facebookHREFLink);


                var postId=feedResponsefromStoredPath[count].postId;


                htmlContent+='<div class="col-sm-4"><div class="comment_box"><div class="icon"><img src="${facebookFeedModel.iconPath}" alt="" title=""></div><div class="type"> FACEBOOK POST, '+feedResponsefromStoredPath[count].createdDate+'</div><div class="description">'+title+
                    '</div><div class="post-img"><img src="'+thumbnail+'"></div><div class="inner-comment">'+facebookPostMsg+'</div><div class="links"><a href="https://www.facebook.com/124181477968641/posts/'+postId+'" target="_blank">Like/Share/Comment CTA<span class="glyphicon glyphicon-new-window animateIcon"></span></a></div></div></div>';
            }
            $(".stay-inner-coloum").append(htmlContent);
        </script>
    </div>
<cq:include path="sociallinksconfig" resourceType="/apps/hdscorp/components/content/sociallinksconfig" />
        </div>
        </div>

