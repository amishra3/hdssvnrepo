package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

/**Sling model for Asset Gating component
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class AssetGettingModel {
	@Inject
	@Named("pdfformmessage")
	@Default(values = { "" })
	private String message;

	@Inject
	@Named("pdfviewallresourcelabel")
	@Default(values = { "" })
	private String resourceLabel;

	@Inject
	@Named("pdfviewallresourcelink")
	@Default(values = { "" })
	private String resourceLink;

	@Inject
	@Named("pdfurltargettype")
	@Default(values = { "" })
	private String urlTargetType;

	@Inject
	@Named("pdffilloutdownloadtext")
	@Default(values = { "" })
	private String downloadText;

	@Inject
	@Named("pdfthanksyoumsg")
	@Default(values = { "" })
	private String thanksyouMessage;

	public String getMessage() {
		return message;
	}

	public String getResourceLabel() {
		return resourceLabel;
	}

	public String getResourceLink() {
		return resourceLink;
	}

	public String getUrlTargetType() {
		return urlTargetType;
	}

	public String getDownloadText() {
		return downloadText;
	}

	public String getThanksyouMessage() {
		return thanksyouMessage;
	}

}
