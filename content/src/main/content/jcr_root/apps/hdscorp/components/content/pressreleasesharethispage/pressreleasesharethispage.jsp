<%--

  Press Release share This Page component component.

  This is Press Release share This Page component

--%><%
%><%@include file="/apps/foundation/global.jsp"%><%
%><%@page session="false" %>
<%@page import="com.hdscorp.cms.util.PageUtils"%>
<%@page import="com.hdscorp.cms.util.PathResolver"%>


                            <div class="share-this-page clearfix">
                                <div class="heading">${currentStyle.prstptitle}</div>

                                <div class="share-links">


                                    <c:set var="path" value="<%=currentPage.getPath()%>"/>
                                    <c:if test="${fn:startsWith(path,'/content/')}">
					<c:set var="path"
						value="<%=PathResolver.getShortURLPath(pageContext.getAttribute("path").toString())%>" />
				</c:if>                                   
                                    <a href='http://www.facebook.com/share.php?u=https://www.hds.com/webtech/' target="_blank">
                                        <img alt='Facebook'src='${currentStyle.prstpfacebookiconpath}'/></a>
                                    <a href="http://twitter.com/share?url=https://www.hds.com/webtech/;text=myText;size=l&amp;count=none" target="_blank">

            <img alt='Twitter'src='${currentStyle.prstptwittericonpath}'/>

</a>


<a class="icon-linkedin" rel="nofollow"
    href="http://www.linkedin.com/"
    onclick="popUp=window.open(
        'http://www.linkedin.com/shareArticle?url=https://www.hds.com/',
        'popupwindow',
        'scrollbars=yes,width=800,height=400');
    popUp.focus();
    return false">
        <img alt='LinkedIn'src='${currentStyle.prstplinkediniconpath}'/>
</a>
<a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://www.hds.com/"
   title="Share by Email">
  <img src="${currentStyle.prstpemailiconpath}">
</a>
								</div>
                            </div>
                            <div class="press-contact">
                                <div class="heading">${currentStyle.prstppresscontactlabel}</div>
                                <div class="press-contact-detail">
                                    ${currentStyle.prstppresscontactdetails}
                                  <a href="mailto:${currentStyle.prstpresscontactmailid}" target="_blank">${currentStyle.prstpresscontactmailid}</a> 
                                </div>
                            </div>
                        </div>