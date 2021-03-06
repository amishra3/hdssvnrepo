package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.jcr.Node;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.hdscorp.cms.constants.GlobalConstants;
import com.hdscorp.cms.dao.PDFNode;
import com.hdscorp.cms.util.HdsCorpCommonUtils;
import com.hdscorp.cms.util.PathResolver;
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
		if(pdfPath==null){
			pdfPath = (String)request.getAttribute("pdfPath");
		}
		
		if(pdfPath==null){
			pdfPath = request.getRequestURI();
		}
		
		log.info("Start Execution of getPdfNode() PdfPath::" + pdfPath);
		try {
			if (pdfPath != null && !pdfPath.isEmpty() && (pdfPath.toLowerCase().contains(".pdf") || pdfPath.contains("/ext/"))) {
				if(!pdfPath.startsWith("/content/")){
					pdfPath = HdsCorpCommonUtils.pdfJCRPath(pdfPath);	
				}
				
				pdfNode = new PDFNode();
				Resource resource = resourceResolver.resolve(pdfPath);
				
				if(resource==null || resource.getResourceType().equals("sling:nonexisting")){
					resource = PathResolver.getResourceFromShortURL(request, pdfPath);	
				}

				if (!resource.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {

					Asset asset = resource.adaptTo(Asset.class);

					if (asset != null) {
						pdfNode.setTitle(asset.getMetadataValue("dc:title") != null
								? asset.getMetadataValue("dc:title").toString() : "");
						pdfNode.setDescription(asset.getMetadataValue("pdf:summary") != null
								? asset.getMetadataValue("pdf:summary").toString() : "");
						pdfNode.setImagePath(asset.getMetadataValue("dc:imagePath") != null
								? asset.getMetadataValue("dc:imagePath").toString() : "");
						if (asset.getMetadataValue("dc:creationdate") != null
								&& !asset.getMetadataValue("dc:creationdate").trim().isEmpty()) {
							pdfNode.setCreatedDate(ServiceUtil.getDisplayDateFormat(
									asset.getMetadataValue("dc:creationdate").toString(), FROM_DATE, TO_DATE));
						} else {
							pdfNode.setCreatedDate("");
						}

					}else{
						Resource metaDataResource= resource.getChild("jcr:content/metadata");
						ValueMap resVMap = metaDataResource.adaptTo(ValueMap.class);

						pdfNode.setTitle(resVMap.get("dc:title",""));
						pdfNode.setDescription(resVMap.get("dc:description",""));
						pdfNode.setLongDescription(resVMap.get("dc:longdescription",""));
						pdfNode.setCreatedDate(resVMap.get("dc:creationdate",""));
						pdfNode.setExternalContentURL(resVMap.get("contentpath",""));
					}
				}

			}
		} catch (Exception e) {
			log.error("Error occurs while gettting data from PDF meta Data::" + e.getMessage());
		}
		return pdfNode;
	}

}
