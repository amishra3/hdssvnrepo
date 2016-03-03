package com.hdscorp.cms.slingmodels;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.dao.LegalCategory;
import com.hdscorp.cms.util.MultifieldUtil;

/**
 * Sling model for Legal Sub Category Filter
 * 
 * @author gokula.nand
 *
 */
@Model(adaptables = Resource.class)
public class LegalSubCategoryModel extends MultifieldUtil {
	private static final Logger log = LoggerFactory.getLogger(LegalSubCategoryModel.class);
	@Inject
	@Named("legalcategories")
	@Default(values = { "legalcategories" })
	private String[] legalcategories;

	public List<LegalCategory> getLegalcategories() {
		log.info("start execution of getLegalcategories ()");
		List<LegalCategory> listCatObject = new ArrayList<LegalCategory>();

		try {
			for (int index = 0; index < legalcategories.length; index++) {
				JSONObject jsonObject = new JSONObject(legalcategories[index]);
				LegalCategory legalCat = null;
				if (jsonObject != null) {
					legalCat = new LegalCategory();
					legalCat.setLegalURL(jsonObject.getString("subcatcontenturl"));
					legalCat.setLabel(jsonObject.getString("subcatdisplaylabel"));
					legalCat.setSubCatId(jsonObject.getString("subcatid"));
					JSONArray jsonArrayObject = new JSONArray(jsonObject.getString("legalsubcategories"));
					if (jsonArrayObject.length() > 0) {
						List<LegalCategory> listSubCat = new ArrayList<LegalCategory>();
						for (int subCount = 0; subCount < jsonArrayObject.length(); subCount++) {
							JSONObject jsonSubObject = new JSONObject(jsonArrayObject.get(subCount).toString());
							LegalCategory legalSubCat = new LegalCategory();
							legalSubCat.setLegalURL(jsonSubObject.getString("legalsubcatcontenturl"));
							legalSubCat.setLabel(jsonSubObject.getString("legalsubcatdisplaylabel"));
							legalSubCat.setSubCatId(jsonSubObject.getString("legalsubcatid"));
							listSubCat.add(legalSubCat);
						}
						legalCat.setListSubCat(listSubCat);
					}

				}
				listCatObject.add(legalCat);
			}
		} catch (Exception e) {
			log.error("Error while fetching data from  legal category: " + e);

		}
		return listCatObject;

	}

}
