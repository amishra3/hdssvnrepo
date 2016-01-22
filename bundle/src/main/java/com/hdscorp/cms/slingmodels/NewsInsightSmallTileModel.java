package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables=Resource.class)
public class NewsInsightSmallTileModel {
	
	@Inject @Named("jcr:nisticonimagepath") @Default(values="/content/dam/geometrixx-outdoors/logo.png")
	private String iconImagePath;
	
	@Inject @Named("jcr:nisticonimagetitle") @Default(values="News and Insight Small Tile")
	private String iconImageTitle;
	
	@Inject @Named("jcr:nistcontent") @Default(values="Content")
	private String content;
	
	@Inject @Named("jcr:nistreadmorelabel") @Default(values="Read More")
	private String readMoreLabel;
	
	@Inject @Named("jcr:nistreadmorelink") @Default(values="http://www.hds.com")
	private String readMoreLink;
	
	@Inject @Named("jcr:nistopennewtab") @Default(values="false")
	private String openNewTab;

	public String getIconImagePath() {
		return iconImagePath;
	}

	public String getIconImageTitle() {
		return iconImageTitle;
	}

	public String getContent() {
		return content;
	}

	public String getReadMoreLabel() {
		return readMoreLabel;
	}

	public String getReadMoreLink() {
		return readMoreLink;
	}

	public String getOpenNewTab() {
		return openNewTab;
	}
	
	
	
	
	

}
