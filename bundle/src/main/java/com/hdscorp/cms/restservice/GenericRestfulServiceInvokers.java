package com.hdscorp.cms.restservice;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class GenericRestfulServiceInvokers {

	private static final Logger log = LoggerFactory.getLogger(GenericRestfulServiceInvokers.class);

	public String getWSResponse(String feedUrl, String methodType, String parameter) {
		log.info("Execution start for getURLContents() " + feedUrl);
		StringBuilder sb = new StringBuilder();
		JSONObject jsonObject = new JSONObject();
		try {

			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse reponse = getWSMethodType(methodType,parameter, feedUrl, httpClient);
			if (reponse.getStatusLine().getStatusCode() != 200) {
				jsonObject.put(FeedConstant.JSON_STATUS_CODE, reponse.getStatusLine().getStatusCode());
				jsonObject.put(FeedConstant.JSON_STATUS_REASON, reponse.getStatusLine().getReasonPhrase());
				return jsonObject.toString();
			}
			BufferedReader br = new BufferedReader(
					new InputStreamReader((reponse.getEntity().getContent()), FeedConstant.UTF_8));
			String output;
			while ((output = br.readLine()) != null) {
				sb.append(output);
			}
			httpClient.getConnectionManager().shutdown();
		} catch (java.net.UnknownHostException e) {
			log.error("Feed is not found:" + e.getMessage());
			try {
				jsonObject.put(FeedConstant.JSON_STATUS_CODE, FeedConstant.NOT_FOUND_STATUS_CODE);
				jsonObject.put(FeedConstant.JSON_STATUS_REASON, FeedConstant.NOT_FOUND_STATUS_REASON);
			} catch (JSONException e1) {
				log.error("Error while parsing in json" + e.getMessage());
			}
			return jsonObject.toString();

		} catch (Exception e) {
			log.error("Error while reading data from feed:" + e);
		}

		return sb.toString();

	}

	public boolean getWSInvokeStatus(String content) {
		if (content.indexOf("statusCode") != -1)
			return true;
		else
			return false;
	}

	public HttpResponse getWSMethodType(String type, String parameter,String feedURL, HttpClient httpClient)
			throws ClientProtocolException, IOException {
		log.info("Execution start for getInvokeMethodType() and method type is " + type);
		if (type.equalsIgnoreCase(FeedConstant.POST_METHOD_TYPE)) {
			HttpPost postReq = new HttpPost(feedURL);
			StringEntity input = new StringEntity(parameter, FeedConstant.UTF_8);
			input.setContentType(FeedConstant.CONTENT_TYPE);
			postReq.setEntity(input);
			return httpClient.execute(postReq);
		} else {
			HttpGet getReq = new HttpGet(feedURL);
			return httpClient.execute(getReq);
		}

	}

	public String formatDate(String dateString) throws ParseException {
		SimpleDateFormat sdfSource = new SimpleDateFormat(FeedConstant.DATE_FORMAT_FROM);
		String dateFrom = dateString.substring(0, dateString.indexOf(FeedConstant.DATE_SEPERATOR));
		Date dateTo = sdfSource.parse(dateFrom.trim());
		SimpleDateFormat sdfDestination = new SimpleDateFormat(FeedConstant.DATE_FORMAT_TO);
		return sdfDestination.format(dateTo);
	}

}
