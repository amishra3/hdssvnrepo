package com.hdscorp.cms.slingmodels;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class)
public class TrainingSearchCoursesModel {
	@Inject
	@Named("trainingoverviewheadline")
	@Default(values = { "" })
	private String trainingoverviewheadline;

	@Inject
	@Named("trainingcertificationintroduction")
	@Default(values = { " " })
	private String trainingcertificationintroduction;

	@Inject
	@Named("traininglearnmorelabel")
	@Default(values = { " " })
	private String traininglearnmorelabel;

	@Inject
	@Named("traininglearnmorelink")
	@Default(values = { " " })
	private String traininglearnmorelink;

	@Inject
	@Named("searchforcourseslabel")
	@Default(values = { " " })
	private String searchforcourseslabel;

	@Inject
	@Named("searchkeyword")
	@Default(values = { " " })
	private String searchkeyword;

	@Inject
	@Named("tolabel")
	@Default(values = { "  " })
	private String tolabel;

	@Inject
	@Named("selectlocationlabel")
	@Default(values = { " " })
	private String selectlocationlabel;

	@Inject
	@Named("searchlabel")
	@Default(values = { " " })
	private String searchlabel;

	public String getTrainingoverviewheadline() {
		return trainingoverviewheadline;
	}

	public String getTrainingcertificationintroduction() {
		return trainingcertificationintroduction;
	}

	public String getTraininglearnmorelabel() {
		return traininglearnmorelabel;
	}

	public String getTraininglearnmorelink() {
		return traininglearnmorelink;
	}

	public String getSearchforcourseslabel() {
		return searchforcourseslabel;
	}

	public String getSearchkeyword() {
		return searchkeyword;
	}

	public String getTolabel() {
		return tolabel;
	}

	public String getSelectlocationlabel() {
		return selectlocationlabel;
	}

	public String getSearchlabel() {
		return searchlabel;
	}

}
