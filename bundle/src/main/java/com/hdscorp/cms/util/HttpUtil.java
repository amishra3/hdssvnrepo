package com.hdscorp.cms.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * {@link HttpUtil} is a Util class which will handle the Http GET and POST Requests using {@link HttpURLConnection}
 * 
 * @author abhinav
 * 
 */
public class HttpUtil {
    private static final Logger LOG = LoggerFactory.getLogger(HttpUtil.class);
    private static final String CONTENT_TYPE = "Content-Type";
    private static final String APPLICATION_JSON = "application/json";
    private HttpURLConnection urlConnection;
    private static HttpUtil SHARED_INSTANCE;

    private HttpUtil() {
        // Private Constructor
    }

    /**
     * Singleton Instance
     * 
     * @return {@link HttpUtil} Instance
     */
    public static HttpUtil getInstance() {
        if (null == SHARED_INSTANCE) {
            synchronized (HttpUtil.class) {
                if (null == SHARED_INSTANCE) {
                    SHARED_INSTANCE = new HttpUtil();
                }
            }
        }
        return SHARED_INSTANCE;
    }

    /**
     * Used to getting HttpUrlConnection for the given Service URL
     * 
     * @param serviceUrl
     * @return {@link HttpURLConnection}
     */
    public HttpURLConnection getHttpUrlConnection(final String serviceUrl) {
        LOG.info("HttpUtil :: getHttpUrlConnection method: service Url- " + serviceUrl);
        try {
            final URL url = new URL(serviceUrl);
            this.urlConnection = (HttpURLConnection) url.openConnection();
            LOG.info("urlConnection :" + this.urlConnection);
            return this.urlConnection;
        } catch (IOException e) {
            LOG.error("IO Exception: ", e);
        } catch (Exception e) {
            LOG.error("Error while getting Http Url Connection", e);
        }
        return this.urlConnection;
    }

    /**
     * Used for getting response from HttpConnection Object
     * 
     * @param urlConnection
     * @return rawString Object
     * @throws IOException
     */
    public String getGetResponseFromHttpConnection(final HttpURLConnection urlConnection) throws IOException {
        LOG.info("HttpUtil :: getGetResponseFromHttpConnection");
        String responseObject = "";
        BufferedReader inputStream = null;
        try {
            urlConnection.setRequestProperty(CONTENT_TYPE, APPLICATION_JSON);
            urlConnection.setDoInput(true);
            urlConnection.setDoOutput(true);
            urlConnection.setRequestMethod("GET");
            inputStream = new BufferedReader(new InputStreamReader((InputStream) urlConnection.getContent()));
            String tempContent;
            while (null != (tempContent = inputStream.readLine())) {
                responseObject += tempContent;
            }
            inputStream.close();
            return responseObject;
        } catch (ProtocolException e) {
            LOG.error("Protocol exception: ", e);
        } catch (IOException ioe) {
            LOG.error("Error while getting response from http GET Request :: IOException" + ioe);
        } catch (Exception e) {
            LOG.error("Error while getting response from http GET Request ", e);
        } finally {
            if (null != inputStream) {
                inputStream.close();
            }
            urlConnection.disconnect();
        }
        return responseObject;
    }

    /**
     * Used to handle the post requests
     * 
     * @param urlConnection
     * @param urlParameters
     * @return rawString Object
     */
    public String getPostResponseFromHttpConnection(final HttpURLConnection urlConnection, final String urlParameters, final String method) {
        LOG.info("HttpUtil :: getPostResponseFromHttpConnection:: URL Parameters::" + urlParameters);
        try {
            urlConnection.setRequestMethod(method);
            urlConnection.setRequestProperty(CONTENT_TYPE, APPLICATION_JSON);
            urlConnection.setUseCaches(false);
            urlConnection.setDoInput(true);
            urlConnection.setDoOutput(true);

            LOG.info("Input Object Parameters :" + urlParameters);
            // Send request
            final DataOutputStream wr = new DataOutputStream(urlConnection.getOutputStream());
            wr.writeBytes(urlParameters);
            wr.flush();
            wr.close();

            // Get Response
            final InputStream inputStream = urlConnection.getInputStream();
            final BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String responseContent = "";
            String tempContent;
            while (null != (tempContent = bufferedReader.readLine())) {
                responseContent += tempContent;
            }
            bufferedReader.close();
            LOG.info("Response Content from Service :" + responseContent);
            return responseContent;
        } catch (ProtocolException pe) {
            LOG.error("Error while processing  Request :: ProtocolException ::" + pe);
            return null;
        } catch (IOException ioe) {
            LOG.error("Error while processing  Request :: IO Exception ::" + ioe);
            return null;
        } catch (Exception e) {
            LOG.error("Error while processing  Request ::", e);
            return null;
        } finally {
            if (null != urlConnection) {
                urlConnection.disconnect();
                LOG.info("URL Connection closed successfully..");
            }
        }
    }

}
