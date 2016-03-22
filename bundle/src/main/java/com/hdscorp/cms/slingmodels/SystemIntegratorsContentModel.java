package com.hdscorp.cms.slingmodels;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.dao.PartnerDescription;

import com.hdscorp.cms.dao.SystemIntegratorsNode;
import com.hdscorp.cms.search.SearchServiceHelper;
import com.hdscorp.cms.util.JcrUtilService;
import com.hdscorp.cms.util.PageUtils;
import com.hdscorp.cms.util.PathResolver;
import com.hdscorp.cms.util.ViewHelperUtil;

@Model(adaptables = Resource.class)
public class SystemIntegratorsContentModel {
	private static final Logger log = LoggerFactory.getLogger(SystemIntegratorsContentModel.class);

	@Inject
	private ResourceResolver resourceResolver;

	@Inject
	@Default(values = { "/content/hdscorp/en_us/lookup/partners" })
	private String sisearchlookuppath;

	public String getSisearchlookuppath() {
		return sisearchlookuppath;
	}

	@Inject
	@Default(values = { "" })
	private String[] sitags;

	@Inject
	@Default(values = { "" })
	private String[] sidesctags;

	private List<SystemIntegratorsNode> systemIntegrators;

	public String[] getSitags() {

		return sitags;
	}

	public String[] getSidesctags() {
		return sidesctags;
	}

	public List<SystemIntegratorsNode> getSystemIntegrators()
			throws RepositoryException, JsonParseException, JsonMappingException, IOException {

		try {
			log.debug("-------------INSIDE getSystemIntegrators method  Making the Search Service call");

			SearchServiceHelper searchServiceHelper = (SearchServiceHelper) ViewHelperUtil
					.getService(com.hdscorp.cms.search.SearchServiceHelper.class);

			String paths[] = { sisearchlookuppath };
			String tags[] = sitags;
			String template = "/apps/hdscorp/templates/partnerdetail";
			String type[] = { "cq:Page" };
			boolean doPagination = false;

			SearchResult result = searchServiceHelper.getFullTextBasedResuts(paths, tags, template, type, null,
					doPagination, null, null, resourceResolver, "@jcr:content/jcr:title", "asc");

			log.debug("-------------SEARCH CALL COMPLETED-----" + result.getTotalMatches());
			List<Hit> hits = result.getHits();
			systemIntegrators = new ArrayList<SystemIntegratorsNode>();

			for (Hit hit : hits) {

				SystemIntegratorsNode systemIntegratorNode = new SystemIntegratorsNode();
				Page reourcePage = hit.getResource().adaptTo(Page.class);

				String pageTitle = reourcePage.getTitle();
				String pagePath = reourcePage.getPath();
				Resource metadataResource = hit.getResource().getChild("jcr:content");
				if (metadataResource != null) {

					ValueMap properties = ResourceUtil.getValueMap(metadataResource);
					TagManager tagManager = JcrUtilService.getResourceResolver().adaptTo(TagManager.class);

					if (properties.containsKey("cq:tags")) {
						String[] assetTags = (String[]) properties.get("cq:tags");

						List<String> industryTadIds = new ArrayList<>();

						for (String item : assetTags) {
							Tag tag = tagManager.resolve(item);
							if (tag != null) {
								industryTadIds.add(tag.getTagID());
							}
						}

						systemIntegratorNode.setIndustryTadIds(industryTadIds);
					}

				}

				ValueMap properties = reourcePage.getProperties();
				String[] partnerTags = properties.get("cq:tags", String[].class);

				Resource parResource = reourcePage.getContentResource("par");
				Resource partnerMetaDeta = parResource.getChild("systemintegrationcon");
				ValueMap partnerMetaDetaMap = partnerMetaDeta.adaptTo(ValueMap.class);
				systemIntegratorNode.setSystemIntegratorBackgroundImagePath(
						(String) partnerMetaDetaMap.get("sibackgroundimagepath", ""));
				systemIntegratorNode
						.setSystemIntegratorIconImagePath((String) partnerMetaDetaMap.get("siiconimagepath", ""));
				systemIntegratorNode
						.setSystemIntegratorIconImageAltText((String) partnerMetaDetaMap.get("siiconimagealttext", ""));
				systemIntegratorNode.setSystemIntegratorName((String) partnerMetaDetaMap.get("siname", ""));
				systemIntegratorNode.setSystemIntegratorHeadLine((String) partnerMetaDetaMap.get("siheadline", ""));
				systemIntegratorNode
						.setSystemIntegratorIntroduction((String) partnerMetaDetaMap.get("siintroduction", ""));

				systemIntegratorNode.setSystemIntegratorTags(partnerTags);

				systemIntegratorNode.setContentCell(PageUtils.convertMultiWidgetToList(partnerMetaDetaMap,
						"seemorelabel-seemoretargeturl-seemorenewwin-thirdparty"));

				Resource descriptionListResource = null;
				if (partnerMetaDeta != null) {
					descriptionListResource = partnerMetaDeta.getChild("productdescriptions");
				}

				String[] partnerMultiDescriptionList = new String[0];
				List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();

				ObjectMapper mapper = new ObjectMapper();
				if (descriptionListResource != null) {
					ValueMap descriptioNodeProps = descriptionListResource.adaptTo(ValueMap.class);
					if (descriptioNodeProps.containsKey("productDefaultDescription")) {
						systemIntegratorNode.setSystemIntegratorDescription(
								descriptioNodeProps.get("productDefaultDescription").toString());

						String descriptionlist[] = descriptioNodeProps.get("descriptionlist", String[].class);
						if (descriptionlist != null && descriptionlist.length > 0) {
							for (int index = 0; index < descriptionlist.length; index++) {
								JSONObject jsonObect = new JSONObject(descriptionlist[index]);

								Map<String, Object> mapObject = PageUtils.jsontoMap(jsonObect);
								listMap.add(mapObject);
							}

						}

					}
					if (sidesctags.length > 0 && !sidesctags[0].isEmpty()) {
						partnerMultiDescriptionList = descriptioNodeProps.get("descriptionlist", new String[0]);

						for (String desc : partnerMultiDescriptionList) {
							PartnerDescription prodDescObj = mapper.readValue(desc, PartnerDescription.class);

							if (Arrays.asList(prodDescObj.getCategoryTag()).contains(sidesctags[0])) {
								systemIntegratorNode.setSystemIntegratorDescription(prodDescObj.getDescription());
								break;
							}
						}
					}
				}

				if (pagePath.startsWith("/content")) {
					pagePath = PathResolver.getShortURLPath(pagePath);
				}
				systemIntegratorNode.setSystemIntegratorTitle(pageTitle);
				systemIntegratorNode.setSystemIntegratorPath(pagePath);

				systemIntegrators.add(systemIntegratorNode);

			}
		} catch (Exception e) {
			StringWriter stack = new StringWriter();
			e.printStackTrace(new PrintWriter(stack));
			log.error("Error while reading pages:: " + stack.toString());
		}
		return systemIntegrators;
	}

}
