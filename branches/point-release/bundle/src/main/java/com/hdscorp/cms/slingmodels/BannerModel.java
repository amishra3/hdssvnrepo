package com.hdscorp.cms.slingmodels;

import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

@Model(adaptables = { Resource.class })
public class BannerModel {
	@Inject
	@Named("jcr:title")
	@Default(values = { "default title" })
	private String title;
	@Inject
	@Named("jcr:imagePath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String banner;
	@Inject
	@Named("jcr:altText")
	@Default(values = { "default altText" })
	private String altText;
	@Inject
	@Named("jcr:subText")
	@Default(values = { "default subText" })
	private String bannerSubText;
	@Inject
	@Named("jcr:viewalltext")
	@Default(values = { "default view all link text" })
	private String viewAllLinkText;
	@Inject
	@Named("jcr:viewalllink")
	@Default(values = { "http://www.google.com" })
	private String viewAllLink;
	@Inject
	@Named("jcr:title1")
	@Default(values = { "default title" })
	private String title1;
	@Inject
	@Named("jcr:imagePath1")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String banner1;
	@Inject
	@Named("jcr:altText1")
	@Default(values = { "default altText" })
	private String altText1;
	@Inject
	@Named("jcr:subText1")
	@Default(values = { "default subText" })
	private String bannerSubText1;
	@Inject
	@Named("jcr:ctaLabel1")
	@Default(values = { "default view all link text" })
	private String ctaLabel1;
	@Inject
	@Named("jcr:ctaUrl1")
	@Default(values = { "http://www.google.com" })
	private String ctaUrl1;
	@Inject
	@Named("jcr:title2")
	@Default(values = { "default title" })
	private String title2;
	@Inject
	@Named("jcr:imagePath2")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String banner2;
	@Inject
	@Named("jcr:altText2")
	@Default(values = { "default altText" })
	private String altText2;
	@Inject
	@Named("jcr:subText2")
	@Default(values = { "default subText" })
	private String bannerSubText2;
	@Inject
	@Named("jcr:ctaLabel2")
	@Default(values = { "default view all link text" })
	private String ctaLabel2;
	@Inject
	@Named("jcr:ctaUrl2")
	@Default(values = { "http://www.google.com" })
	private String ctaUrl2;
	@Inject
	@Named("jcr:title3")
	@Default(values = { "default title" })
	private String title3;
	@Inject
	@Named("jcr:imagePath3")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String banner3;
	@Inject
	@Named("jcr:altText3")
	@Default(values = { "default altText" })
	private String altText3;
	@Inject
	@Named("jcr:subText3")
	@Default(values = { "default subText" })
	private String bannerSubText3;
	@Inject
	@Named("jcr:ctaLabel3")
	@Default(values = { "default view all link text" })
	private String ctaLabel3;
	@Inject
	@Named("jcr:ctaUrl3")
	@Default(values = { "http://www.google.com" })
	private String ctaUrl3;
	@Inject
	@Named("jcr:title4")
	@Default(values = { "default title" })
	private String title4;
	@Inject
	@Named("jcr:imagePath5")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String banner4;
	@Inject
	@Named("jcr:altText4")
	@Default(values = { "default altText" })
	private String altText4;
	@Inject
	@Named("jcr:subText4")
	@Default(values = { "default subText" })
	private String bannerSubText4;
	@Inject
	@Named("jcr:ctaLabel4")
	@Default(values = { "default view all link text" })
	private String ctaLabel4;
	@Inject
	@Named("jcr:ctaUrl4")
	@Default(values = { "http://www.google.com" })
	private String ctaUrl4;
	@Inject
	@Named("jcr:title5")
	@Default(values = { "default title" })
	private String title5;
	@Inject
	@Named("jcr:imagePath5")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String banner5;
	@Inject
	@Named("jcr:altText5")
	@Default(values = { "default altText" })
	private String altText5;
	@Inject
	@Named("jcr:subText5")
	@Default(values = { "default subText" })
	private String bannerSubText5;
	@Inject
	@Named("jcr:targetUrl5")
	@Default(values = { "http://www.google.com" })
	private String targetUrl5;
	@Inject
	@Named("jcr:title6")
	@Default(values = { "default title" })
	private String title6;
	@Inject
	@Named("jcr:imagePath6")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String banner6;
	@Inject
	@Named("jcr:altText6")
	@Default(values = { "default altText" })
	private String altText6;
	@Inject
	@Named("jcr:subText6")
	@Default(values = { "default subText" })
	private String bannerSubText6;
	@Inject
	@Named("jcr:ctaLabel6")
	@Default(values = { "default view all link text" })
	private String ctaLabel6;
	@Inject
	@Named("jcr:ctaUrl6")
	@Default(values = { "http://www.google.com" })
	private String ctaUrl6;
	@Inject
	@Named("jcr:displaylabel")
	@Default(values = { "displayLabel" })
	private List<String> displaylabel;
	@Inject
	@Named("jcr:iconimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private List<String> iconimagepath;
	@Inject
	@Named("jcr:targeturl")
	@Default(values = { "http://www.google.com" })
	private List<String> targeturl;
	@Inject
	@Named("jcr:iconimage")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private List<String> iconimage;
	@Inject
	@Optional
	private List<IndustryTab> industryTab;

	public List<IndustryTab> getIndustryTab() {
		return this.industryTab;
	}

	public String getTitle() {
		return this.title;
	}

	public String getBanner() {
		return this.banner;
	}

	public String getAltText() {
		return this.altText;
	}

	public String getBannerSubText() {
		return this.bannerSubText;
	}

	public String getViewAllLinkText() {
		return this.viewAllLinkText;
	}

	public String getViewAllLink() {
		return this.viewAllLink;
	}

	public String getTitle1() {
		return this.title1;
	}

	public String getBanner1() {
		return this.banner1;
	}

	public String getAltText1() {
		return this.altText1;
	}

	public String getBannerSubText1() {
		return this.bannerSubText1;
	}

	public String getCtaLabel1() {
		return this.ctaLabel1;
	}

	public String getCtaUrl1() {
		return this.ctaUrl1;
	}

	public String getTitle2() {
		return this.title2;
	}

	public String getBanner2() {
		return this.banner2;
	}

	public String getAltText2() {
		return this.altText2;
	}

	public String getBannerSubText2() {
		return this.bannerSubText2;
	}

	public String getCtaLabel2() {
		return this.ctaLabel2;
	}

	public String getCtaUrl2() {
		return this.ctaUrl2;
	}

	public String getTitle3() {
		return this.title3;
	}

	public String getBanner3() {
		return this.banner3;
	}

	public String getAltText3() {
		return this.altText3;
	}

	public String getBannerSubText3() {
		return this.bannerSubText3;
	}

	public String getCtaLabel3() {
		return this.ctaLabel3;
	}

	public String getCtaUrl3() {
		return this.ctaUrl3;
	}

	public String getTitle4() {
		return this.title4;
	}

	public String getBanner4() {
		return this.banner4;
	}

	public String getAltText4() {
		return this.altText4;
	}

	public String getBannerSubText4() {
		return this.bannerSubText4;
	}

	public String getCtaLabel4() {
		return this.ctaLabel4;
	}

	public String getCtaUrl4() {
		return this.ctaUrl4;
	}

	public String getTitle5() {
		return this.title5;
	}

	public String getBanner5() {
		return this.banner5;
	}

	public String getAltText5() {
		return this.altText5;
	}

	public String getBannerSubText5() {
		return this.bannerSubText5;
	}

	public String getTargetUrl5() {
		return this.targetUrl5;
	}

	public String getTitle6() {
		return this.title6;
	}

	public String getBanner6() {
		return this.banner6;
	}

	public String getAltText6() {
		return this.altText6;
	}

	public String getBannerSubText6() {
		return this.bannerSubText6;
	}

	public String getCtaLabel6() {
		return this.ctaLabel6;
	}

	public String getCtaUrl6() {
		return this.ctaUrl6;
	}

	public List<String> getDisplaylabel() {
		return this.displaylabel;
	}

	public List<String> getIconimagepath() {
		return this.iconimagepath;
	}

	public List<String> getTargeturl() {
		return this.targeturl;
	}

	public List<String> getIconimage() {
		return this.iconimage;
	}
}
