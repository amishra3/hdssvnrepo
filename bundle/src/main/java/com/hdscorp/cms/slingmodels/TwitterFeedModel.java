
package com.hdscorp.cms.slingmodels;

import com.hdscorp.cms.util.MultifieldUtil;
import javax.inject.Inject;
import javax.inject.Named;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = { Resource.class })
public class TwitterFeedModel extends MultifieldUtil {
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

}
