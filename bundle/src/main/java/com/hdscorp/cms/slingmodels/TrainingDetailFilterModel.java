package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class TrainingDetailFilterModel {

	@Inject
	@Named("tdfshowingfromlabel")
	@Default(values = { "" })
	private String tdfShowingFromLabel;
	
	
	
	@Inject
	@Named("tdfshowingtolabel")
	@Default(values = { "" })
	private String tdfShowingToLabel;
	
	

	@Inject
	@Named("tdfkeywordsearchlabel")
	@Default(values = { "" })
	private String tdfKeywordSearchLabel;
	
	@Inject
	@Named("tdfsearchlabel")
	@Default(values = { "" })
	private String tdfSearchLabel;

	
	@Inject
	@Named("tdfseemorecourseslabel")
	@Default(values = { "" })
	private String tdfSeeMoreCoursesLabel;
	
	
	
	public String getTdfShowingFromLabel() {
		return tdfShowingFromLabel;
	}



	public String getTdfShowingToLabel() {
		return tdfShowingToLabel;
	}


	public String getTdfKeywordSearchLabel() {
		return tdfKeywordSearchLabel;
	}

	public String getTdfSearchLabel() {
		return tdfSearchLabel;
	}



	public String getTdfSeeMoreCoursesLabel() {
		return tdfSeeMoreCoursesLabel;
	}
	
	
}
