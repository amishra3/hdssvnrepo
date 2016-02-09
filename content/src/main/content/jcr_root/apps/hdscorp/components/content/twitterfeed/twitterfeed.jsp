<%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils,com.hdscorp.cms.constants.ServiceConstants"%>
<sling:adaptTo adaptable="${resource}"
	adaptTo="com.hdscorp.cms.slingmodels.TwitterFeedModel"
	var="twitterFeedModel" />
	<c:set var="daysMessage" scope = "request" value="${twitterFeedModel.twDaysMessage}"/>
        <c:set var="monthsmessage" scope = "request" value="${twitterFeedModel.twMonthsMessage}"/>
        <c:set var="yearsmessage" scope = "request" value="${twitterFeedModel.twYearsMessage}"/>
          <c:set var="weeksmessage" scope = "request" value="${twitterFeedModel.twWeeksMessage}"/>
        <c:set var="hoursmessage" scope = "request" value="${twitterFeedModel.twHoursMessage}"/>
        <c:set var="minituesmessage" scope = "request" value="${twitterFeedModel.twMinsMessage}"/>
        <c:set var="agoMessage" scope = "request" value="${twitterFeedModel.twAgoMessage}"/>
<div>
    <table>
        <tbody>

        </tbody>
        </table>
</div>
  <div class="stay-touch-hexagon clearfix" style="background-image: url('${twitterFeedModel.bGImagePath}');">
                <div class="content-container">
                    <h2>${properties.twtitle}</h2>
                </div>
                <div class="stay-touch-hexagon-list twitter-feed">
                    <div class="content-container">
                        <div class="col-sm-10 col-sm-offset-1 col-no-pad hex-contain clearfix">

                        </div>
                    </div>
                </div>

      <cq:include path="sociallinksconfig" resourceType="/apps/hdscorp/components/content/sociallinksconfig" />
            </div>

  <script type="text/javascript">
 var htmlContentTwitter="";
  var feedResponsefromStoredPath=<%=PageUtils.getPropertyValue(resourceResolver,PageUtils.getPropertyValue(resourceResolver,"/apps/hdscorp/config/com.hdscorp.cms.scheduler.TwitterScheduler","twitter.storagePath"),ServiceConstants.TWITTER_SAVE_FEED_DATA_PROPERTY_NAME )%>;
       var propertyValue="";
     for(var count=0; count<feedResponsefromStoredPath.length; count++){
         if(feedResponsefromStoredPath[count].timeDifference.indexOf('day')!=-1){
		  propertyValue='<%=request.getAttribute("daysMessage").toString()%>';
         }else if(feedResponsefromStoredPath[count].timeDifference.indexOf('month')!=-1)   {
		propertyValue='<%=request.getAttribute("monthsmessage").toString()%>';
         }
         else if(feedResponsefromStoredPath[count].timeDifference.indexOf('week')!=-1)   {
		propertyValue='<%=request.getAttribute("weeksmessage").toString()%>';
         }
         else if(feedResponsefromStoredPath[count].timeDifference.indexOf('year')!=-1)   {
 		propertyValue='<%=request.getAttribute("yearsmessage").toString()%>';
         } else if(feedResponsefromStoredPath[count].timeDifference.indexOf('hour')!=-1)   {
		propertyValue='<%=request.getAttribute("hoursmessage").toString()%>';
         }else if(feedResponsefromStoredPath[count].timeDifference.indexOf('min')!=-1)   {
		propertyValue='<%=request.getAttribute("minituesmessage").toString()%>';
         }       
         propertyValue=propertyValue+' <%=request.getAttribute("agoMessage").toString()%>';

 var twitterPostMsg=feedResponsefromStoredPath[count].twitterMessageText;
         if(twitterPostMsg.indexOf('http')!=-1)
         {
             var twitterPostURL=twitterPostMsg.substring(twitterPostMsg.indexOf('http'),twitterPostMsg.length);
                var twitterHREFLink='<a href='+twitterPostURL+'>'+twitterPostURL+'</a>';
				twitterPostMsg=twitterPostMsg.replace(twitterPostURL,twitterHREFLink);

         }

         var postedDate= feedResponsefromStoredPath[count].timeDifference.substring(0,feedResponsefromStoredPath[count].timeDifference.indexOf(" "));
         //htmlContent+='<tr><td style="text-decoration: underline;">Twitter ID  :: '+feedResponsefromStoredPath[count].twitterID+'</tr></td><tr><td> Twitter Media Url ::'+feedResponsefromStoredPath[count].twitterMediaUrl+'</td></tr><tr><td>Twitter MessageText  :: '+feedResponsefromStoredPath[count].twitterMessageText+'</tr></td><tr><td>Twitter Posted Date  :: '+feedResponsefromStoredPath[count].twitterPostedDate+'</td></tr><tr><td>Posted ::  '+postedDate+' ' +propertyValue
         //   '</td></tr>';

         htmlContentTwitter+='<div class="hexagon320"><div class="icon"><img src="${twitterFeedModel.iconPath}" alt="" title=""></div><h4></h4><p>'+twitterPostMsg+'</p><p>'+postedDate+' ' +propertyValue+'</p></div>';

    }
    $(".col-sm-10").append(htmlContentTwitter);
    </script>



    
