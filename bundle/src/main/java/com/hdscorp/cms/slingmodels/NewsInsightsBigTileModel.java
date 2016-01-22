package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
/** Sling model for event component
 * 
 * @author ramana
 *
 */
@Model(adaptables = Resource.class)
public class NewsInsightsBigTileModel {

	@Inject
	@Named("jcr:nibtlabel")
	@Default(values = { "Label" })
	private String nibtLabel;

	@Inject
	@Named("jcr:nibtlabellink")
	@Default(values = { "Label Link" })
	private String nibtLabelLink;

	@Inject
	@Named("jcr:nibtbgimagepath")
	@Default(values = { "BackGround Image Path" })
	private String nibtBGImagePath;

	@Inject
	@Named("jcr:nibticonimagepath")
	@Default(values = { "Icon Image Path" })
	private String nibtIconImagePath;

	@Inject
	@Named("jcr:nibticonimagetitle")
	@Default(values = { "Icon Image Title" })
	private String nibtIconImageTitle;

	@Inject
	@Named("jcr:nibtdescription")
	@Default(values = { "Description" })
	private String nibtDescription;

	@Inject
	@Named("jcr:nibtopeninnewwindow")
	@Default(values = { "Open In New Window" })
	private String nibtOpenInNewWindow;

	public String getNibtLabel() {
		return nibtLabel;
	}

	public String getNibtLabelLink() {
		return nibtLabelLink;
	}

	public String getNibtBGImagePath() {
		return nibtBGImagePath;
	}

	public String getNibtIconImagePath() {
		return nibtIconImagePath;
	}

	public String getNibtIconImageTitle() {
		return nibtIconImageTitle;
	}

	public String getNibtDescription() {
		return nibtDescription;
	}

	public String getNibtOpenInNewWindow() {
		return nibtOpenInNewWindow;
	}

}
