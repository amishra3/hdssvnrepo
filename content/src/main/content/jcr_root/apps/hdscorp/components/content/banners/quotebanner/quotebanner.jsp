<%@page session="false"%>

<%@include file="/apps/foundation/global.jsp"%>


<div class="specific-quote" style="background-image: url(${properties.quoteheroimage});">
	<div class="content-container">
		<p>
			<span class="sprite icon-quote open-quote"></span>${properties.quotecontent}<span
				class="sprite icon-quote close-quote"></span>
		</p>
		<cite>${properties.quoteauthor}</cite>
	</div>
</div>
