package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Sling model for AboutHDSVerticalExplorer Component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class AboutHDSVerticalExplorerModel {
	private static final Logger log = LoggerFactory.getLogger(AboutHDSVerticalExplorerModel.class);

	@Inject
	@Named("ahebgimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String backgroundImagePath;

	@Inject
	@Named("aheiconbimagepath")
	@Default(values = { "/content/dam/geometrixx-outdoors/logo.png" })
	private String iconImagePath;

	@Inject
	@Named("aheiconbimagelabel")
	@Default(values = { "Label" })
	private String iconImageLabel;

	@Inject
	@Named("aheiconbimagedate")
	@Default(values = { "Date" })
	private String iconImageDate;

	@Inject
	@Named("aheiconbimagedesc")
	@Default(values = { "Description" })
	private String iconImageDesc;

	public String getBackgroundImagePath() {
		return backgroundImagePath;
	}

	public String getIconImagePath() {
		return iconImagePath;
	}

	public String getIconImageLabel() {
		return iconImageLabel;
	}

	public String getIconImageDate() {
		return iconImageDate;
	}

	public String getIconImageDesc() {
		return iconImageDesc;
	}
	
	
	

}
