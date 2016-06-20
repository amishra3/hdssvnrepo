package com.hdscorp.cms.dao;

import java.util.List;

/** This is useful for getting legal categories
 * 
 * @author gokula.nand
 *
 */
public class LegalCategory {
	
	private String legalURL;
	
	private String label;
	
	private String subCatId;
	
	private List<LegalCategory> listSubCat;

	public String getLegalURL() {
		return legalURL;
	}

	public String getLabel() {
		return label;
	}

	public String getSubCatId() {
		return subCatId;
	}

	public void setLegalURL(String legalURL) {
		this.legalURL = legalURL;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public void setSubCatId(String subCatId) {
		this.subCatId = subCatId;
	}
	
	
	

	public List<LegalCategory> getListSubCat() {
		return listSubCat;
	}

	public void setListSubCat(List<LegalCategory> listSubCat) {
		this.listSubCat = listSubCat;
	}
	
	
	
	

}
