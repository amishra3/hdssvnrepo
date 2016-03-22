package com.hdscorp.cms.restservice;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Dictionary;

import org.apache.commons.httpclient.protocol.Protocol;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hdscorp.cms.constants.ServiceConstants;

/**
 * This GenericRestfulServiceInvokers have common methods which is used in
 * Services.
 * 
 * @author gokula.nand
 *
 */
@Component
public abstract class GenericRestfulServiceInvokers {

	@Reference
	ConfigurationAdmin configurationAdmin;
	final String propProxyHost = "proxy.host";
	
	final String propProxyEnabled = "proxy.enabled";
	private static final String HTTPCLIENT_PID = "com.day.commons.httpclient";

	private static final Logger log = LoggerFactory
			.getLogger(GenericRestfulServiceInvokers.class);

	/**
	 * Useful for get response of feed based on parameter.
	 * 
	 * @param feedUrl
	 * @param methodType
	 * @param parameter
	 * @return
	 */
	public String getWSResponse(String feedUrl, String methodType,
			String parameter) {
		log.info("Execution start for getURLContents() " + feedUrl);
		StringBuilder sb = new StringBuilder();
		JSONObject jsonObject = new JSONObject();

		try {

			HttpClient httpClient = new DefaultHttpClient();

			HttpResponse reponse = invokeWS(methodType, parameter, feedUrl,
					httpClient);
			
			log.info("response received from service call" + reponse);
			if (reponse.getStatusLine().getStatusCode() != 200) {
				jsonObject.put(ServiceConstants.JSON_STATUS_CODE, reponse
						.getStatusLine().getStatusCode());
				jsonObject.put(ServiceConstants.JSON_STATUS_REASON, reponse
						.getStatusLine().getReasonPhrase());
				return jsonObject.toString();
			}
			BufferedReader br = new BufferedReader(new InputStreamReader(
					(reponse.getEntity().getContent()), ServiceConstants.UTF_8));
			String output;
			while ((output = br.readLine()) != null) {
				sb.append(output);
			}
			httpClient.getConnectionManager().shutdown();
		} catch (java.net.UnknownHostException e) {
			log.error("Feed is not found:" + e.getMessage());
			try {
				jsonObject.put(ServiceConstants.JSON_STATUS_CODE,
						ServiceConstants.NOT_FOUND_STATUS_CODE);
				jsonObject.put(ServiceConstants.JSON_STATUS_REASON,
						ServiceConstants.NOT_FOUND_STATUS_REASON);
			} catch (JSONException e1) {
				log.error("Error while parsing in json" + e.getMessage());
			}
			return jsonObject.toString();

		} catch (Exception e) {
			log.error("Error while reading data from feed:" + e);
		}

		return sb.toString();

	}

	/**
	 * Useful for get status availability
	 * 
	 * @param content
	 * @return
	 */
	public boolean getWSInvokeStatus(String content) {
		if (content.indexOf("statusCode") != -1)
			return true;
		else
			return false;
	}

	/**
	 * Useful for get instance of HttpResponse
	 * 
	 * @param type
	 * @param parameter
	 * @param feedURL
	 * @param httpClient
	 * @return
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	private HttpResponse invokeWS(String type, String parameter,
			String feedURL, HttpClient httpClient)
			throws ClientProtocolException, IOException {

		log.info("Execution start for getInvokeMethodType() and method type is "
				+ type);
		if (type.equalsIgnoreCase(ServiceConstants.POST_METHOD_TYPE)) {
			HttpPost postReq = new HttpPost(feedURL);
			StringEntity input = new StringEntity(parameter,
					ServiceConstants.UTF_8);
			input.setContentType(ServiceConstants.CONTENT_TYPE);
			postReq.setEntity(input);
			return httpClient.execute(postReq);
		} else {
			HttpGet request = new HttpGet(feedURL);
			getProxy(httpClient,request);
			if(request.getConfig()!=null && request.getConfig().getProxy()!=null){
			log.info("Http proxy details are: host name:** :" +request.getConfig().getProxy().getHostName()+" port number:"+request.getConfig().getProxy().getPort());
			}
			return httpClient.execute(request);
		}

	}

	private CloseableHttpClient getProxy(HttpClient httpClient, HttpGet request ) {
   
		CloseableHttpClient httpclient = null;
		    
		Configuration config;
		try {
			config = configurationAdmin.getConfiguration(HTTPCLIENT_PID);

			Dictionary props = config.getProperties();
			if ((Boolean) props.get(propProxyEnabled)) {

				final String proxyHost = config.getProperties()
                        .get(propProxyHost).toString();
                final String[] proxyValue = proxyHost.split(":");
                
                /*CredentialsProvider credsProvider = new BasicCredentialsProvider();
                credsProvider.setCredentials(
                        new AuthScope(proxyValue[0],  Integer.parseInt(proxyValue[1])),
                        new UsernamePasswordCredentials("Infra", "wwwadmin"));
                */
                     
               
                 /*httpclient = HttpClients.custom()
                .setDefaultCredentialsProvider(credsProvider).build();*/
                Scheme scheme = new Scheme("https", 443, SSLSocketFactory.getSystemSocketFactory());
    		    log.info("scheme added*********");
    		    httpClient.getConnectionManager().getSchemeRegistry().register(scheme);
                
                httpClient.getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, 
    		            new HttpHost(proxyValue[0], Integer.parseInt(proxyValue[1]), "http"));
				//HttpHost proxy = new HttpHost(proxyValue[0], Integer.parseInt(proxyValue[1]), "https");
                //HttpHost proxy = new HttpHost(proxyValue[0], Integer.parseInt(proxyValue[1]),"http");

				/*RequestConfig reqConfig = RequestConfig.custom()
						.setProxy(proxy).build();
				
				
				request.setConfig(reqConfig);*/
				
				 log.info("end of get proxy method");
				
			}
		} catch (IOException e) {

			e.printStackTrace();
		}
		return httpclient;

	}

	/**
	 * Useful for get feed date
	 * 
	 * @param dateString
	 * @return
	 * @throws ParseException
	 */
	public String formatDate(String dateString) throws ParseException {
		SimpleDateFormat sdfSource = new SimpleDateFormat(
				ServiceConstants.DATE_FORMAT_FROM);
		String dateFrom = dateString.substring(0,
				dateString.indexOf(ServiceConstants.DATE_SEPERATOR));
		Date dateTo = sdfSource.parse(dateFrom.trim());
		SimpleDateFormat sdfDestination = new SimpleDateFormat(
				ServiceConstants.DATE_FORMAT_TO);
		return sdfDestination.format(dateTo);
	}

}
