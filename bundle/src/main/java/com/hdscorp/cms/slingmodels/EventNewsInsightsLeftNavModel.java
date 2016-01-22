package com.hdscorp.cms.slingmodels;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

import com.hdscorp.cms.util.MultifieldUtil;
@Model(adaptables = Resource.class)
public class EventNewsInsightsLeftNavModel extends MultifieldUtil{

	@Inject
	@Named("alleventslabel")
	@Default(values = { "alleventslabel" })
	private String alleventslabel;
	
	@Inject
	@Named("events")
	@Default(values = { "events" })
	private String[] events;
	
	public String getAlleventslabel() {
		return alleventslabel;
	}

	
	
	public List<Map<String, Object>> getEvents() {
		return super.getMultiFieldPanelValues(events);
	}
	
}
