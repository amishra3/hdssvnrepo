package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.hdscorp.cms.dao.PDFNode;
import com.hdscorp.cms.util.ServiceUtil;

/**This sling model is used for get all meta data of PDF nodes.
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
public class PDFMetaModel {

	private static final Logger log = LoggerFactory.getLogger(PDFMetaModel.class);

	private final String FROM_DATE = "yyyy-MM-dd'T'HH:mm:ss.SSSX";
	private final String TO_DATE = "MMMM yyyy";

	@Inject
	private SlingHttpServletRequest request;

	@Inject
	private ResourceResolver resourceResolver;

	private PDFNode pdfNode;

	public PDFNode getPdfNode() {
		String pdfPath = request.getParameter("pdfPath");
		log.info("Start Execution of getPdfNode() PdfPath::" + pdfPath);
		try {
			if (pdfPath != null && !pdfPath.isEmpty() && pdfPath.toLowerCase().contains(".pdf")) {
				pdfNode = new PDFNode();
				Resource resource = resourceResolver.resolve(pdfPath);

				if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

					Asset asset = resource.adaptTo(Asset.class);

					if (asset != null) {
						pdfNode.setTitle(asset.getMetadataValue("dc:title") != null
								? asset.getMetadataValue("dc:title").toString() : "");
						pdfNode.setDescription(asset.getMetadataValue("dc:description") != null
								? asset.getMetadataValue("dc:description").toString() : "");
						pdfNode.setImagePath(asset.getMetadataValue("dc:imagePath") != null
								? asset.getMetadataValue("dc:imagePath").toString() : "");
						if (asset.getMetadataValue("dc:creationdate") != null
								&& !asset.getMetadataValue("dc:creationdate").trim().isEmpty()) {
							pdfNode.setCreatedDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("dc:creationdate").toString(), FROM_DATE, TO_DATE));
						} else {
							pdfNode.setCreatedDate("");
						}

					}
				}

			}
		} catch (Exception e) {
			log.error("Error occurs while gettting data from PDF meta Data::" + e.getMessage());
		}
		return pdfNode;
	}

}
