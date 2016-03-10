
package com.hdscorp.cms.slingmodels;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.constants.ServiceConstants;
import com.hdscorp.cms.util.MultifieldUtil;
import com.hdscorp.cms.util.PageUtils;

@Model(adaptables = { Resource.class })
public class TwitterFeedModel extends MultifieldUtil {
	private static final Logger log = LoggerFactory.getLogger(TwitterFeedModel.class);
	@Inject
	private ResourceResolver resourceResolver;

	@Inject
	@Named(value = "jcr:twtitle")
	@Default(values = { "Twitter Title" })
	private String title;
	@Inject
	@Named(value = "jcr:imagePath3")
	@Default(values = { "Background image path" })
	private String bGImagePath;

	@Inject
	@Named(value = "jcr:twtwittericonpath")
	@Default(values = { "Twitter Icon Path" })
	private String iconPath;

	@Inject
	@Named(value = "twfeedlookuppath")
	@Default(values = { "/content/hdscorp/en_us/lookup/twitterfeeddata" })
	private String feedLookUpPath;

	@Inject
	@Named(value = "jcr:twyearsmessage")
	@Default(values = { "Years" })
	private String twYearsMessage;

	@Inject
	@Named(value = "jcr:twmonthsmessage")
	@Default(values = { "Months" })
	private String twMonthsMessage;

	@Inject
	@Named(value = "jcr:twweeksmessage")
	@Default(values = { "Weeks" })
	private String twWeeksMessage;

	@Inject
	@Named(value = "jcr:twdaysmessage")
	@Default(values = { "Days" })
	private String twDaysMessage;

	@Inject
	@Named(value = "jcr:twhoursmessage")
	@Default(values = { "Hours" })
	private String twHoursMessage;

	@Inject
	@Named(value = "jcr:twminsmessage")
	@Default(values = { "Minitues" })
	private String twMinsMessage;

	@Inject
	@Named(value = "jcr:twagomessage")
	@Default(values = { "Ago" })
	private String twAgoMessage;

	private String twitterFeedData;

	public String getTitle() {
		return this.title;
	}

	public String getbGImagePath() {
		return this.bGImagePath;
	}

	public String getIconPath() {
		return this.iconPath;
	}

	public String getTwYearsMessage() {
		return twYearsMessage;
	}

	public String getTwMonthsMessage() {
		return twMonthsMessage;
	}

	public String getTwWeeksMessage() {
		return twWeeksMessage;
	}

	public String getTwDaysMessage() {
		return twDaysMessage;
	}

	public String getTwHoursMessage() {
		return twHoursMessage;
	}

	public String getTwMinsMessage() {
		return twMinsMessage;
	}

	public String getTwAgoMessage() {
		return twAgoMessage;
	}

	public String getFeedLookUpPath() {
		return feedLookUpPath;
	}

	public List<Object> getTwitterFeedData() {

		List<Object> feedData = null;
		if (!feedLookUpPath.trim().equals("")) {
			try {
				Resource resource = resourceResolver.resolve(feedLookUpPath);
				if (resource != null) {
					Page page = resource.adaptTo(Page.class);
					if (page != null) {
						ValueMap properties = page.getProperties();
						String feed = properties.get(ServiceConstants.TWITTER_SAVE_FEED_DATA_PROPERTY_NAME).toString();

						if (feed!=null && !feed.isEmpty() && !feed.equals("null")) {
							JSONArray jsonArray= new JSONArray(feed);							
							feedData = PageUtils.jsonArraytoList(jsonArray);

						}

					}
				}

			} catch (Exception e) {				
				log.error("Exception  occured while readind twitterfeed Data" + e);
			}

		}

		return feedData;
	}
}
