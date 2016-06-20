package com.hdscorp.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.json.JSONException;

import com.sun.jersey.api.client.ClientHandlerException;
import com.sun.jersey.api.client.UniformInterfaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * ****************************************************************************
 * Abstract servlet for validating forms.  If validation successful, concrete
 * class must process the request and provide URL of page to be forwarded to.
 * On failure, abstract servlet will redirect to invalid page.
 */
public abstract class
        AbstractServlet
        extends SlingAllMethodsServlet {

    protected static final long serialVersionUID = -3278802501804863984L;

    private static final Logger log = LoggerFactory.getLogger(AbstractServlet.class);


    /**
     * ****************************************************************************
     * Abstract method to be extended by child class to handle processing of request
     * and return url of desired page to forward to upon successful validation of
     * the form.
     *
     * @param a_request
     * @param a_response
     * @return
     * @throws IOException
     * @throws JSONException
     * @throws UniformInterfaceException
     * @throws ClientHandlerException
     */
    protected abstract void
    processRequest(SlingHttpServletRequest a_request,
                   SlingHttpServletResponse a_response)
            throws IOException, ClientHandlerException, UniformInterfaceException, JSONException;


    /**
     * ****************************************************************************
     * Inherited method that handles GET type requests.
     * Input arguments - Sling HTTP request and response
     * When a request comes in as a GET, we do not need to validate the CSRF, so we
     * skip the CSRF validation, and jump right to the servlet work.
     *
     * @param a_request
     * @param a_response
     * @throws ServletException, IOException
     * @throws IOException
     */
    @Override
    protected void
    doGet(final SlingHttpServletRequest a_request,
          final SlingHttpServletResponse a_response)
            throws ServletException,
            IOException {
        try {
            processRequest(a_request, a_response);
        } catch (Exception e) {
            log.error("Exception: ", e);
        }
    }

    /**
     * ****************************************************************************
     * Inherited method that handles POST type requests
     * Input arguments - Sling HTTP request and response
     *
     * @param a_request
     * @param a_response
     * @throws ServletException, IOException
     * @throws IOException
     */
    @Override
    protected void
    doPost(final SlingHttpServletRequest a_request,
           final SlingHttpServletResponse a_response)
            throws ServletException,
            IOException {

        try {
            processRequest(a_request, a_response);
        } catch (Exception e) {
            log.error("Exception: ", e);
        }

    }


}
