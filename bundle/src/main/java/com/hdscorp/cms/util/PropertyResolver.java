package com.hdscorp.cms.util;

import java.text.CharacterIterator;
import java.text.StringCharacterIterator;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.mailer.MailService;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.hdscorp.cms.constants.GlobalConstants;
import com.hdscorp.cms.util.PathResolver;
/**
 * {@link PropertyResolver} class used to resolve the JCR Properties
 * @author abhinav
 *
 */
public final class PropertyResolver {
	
	private static final Logger LOG = LoggerFactory.getLogger(PropertyResolver.class);
	private static final String MINUTES="mins";
	private static final String HOURS="hrs";
	private static final String HOUR="hr";
	private static String COMMA = ",";
	private static String EMPTY_STRING = "";

    private PropertyResolver() {
    }

    /**
	 * 
	 * @param property
	 * @return list of values as String Array Object
	 */
	public static String[] getStringArrayProperty(final Property property){
		String [] listItems=new String[1];
		final Value[] values;
		try{
			if(null != property){
				if(!property.isMultiple()){
					listItems[0]=new String(property.getValue().getString().getBytes(),"UTF-8");
				}else{
					values=property.getValues();
					listItems=new String[values.length];
					for(int i=0;i<values.length;i++){
	        	    	   listItems[i]=new String(values[i].getString().getBytes(),"UTF-8");
	        	       } // end for
				} // end if
				return listItems;
			 } // end if
		 } catch (RepositoryException e) {
            LOG.error("Repository exception: ", e);
        } catch(Exception e){
            LOG.error("Error while getting String Array Property Values :", e);
		 }
		 return null;
	 }
	
	/**
	 * Used to get the Title of the tag from fully qualified tag paths
	 * @param values
	 * @return array of strings
	 */
	public static String[] getTagResolvedTitles(final String[] values, final TagManager tagManager){
		if((null != values) && (null != tagManager)){
			final String[] tagNames=new String[values.length];
			int j=0;
			for(int i=0;i<values.length;i++){
				final Tag tag=tagManager.resolve(values[i]);
				if(null != tag){
					tagNames[j]=tag.getTitle();
					j++;
				} // end if
			} // end for
			return tagNames;
		}else{
			return values;
		} // end if
	}
	/**
	 * Used to get the Title of the tag from fully qualified tag path
	 * @param value
	 * @param tagManager
	 * @return
	 */
	public static String getResolvedTagTitle(final String value, final TagManager tagManager){
		if((null != value) && (null != tagManager)){
				final Tag tag=tagManager.resolve(value);
				if(null != tag){
					return tag.getTitle();
				} // end if
 		} // end if
		return null;
	}
	/**
	 * Used to process the Time Attribute values
	 * @param value
	 * @return
	 */
	public static String processTimeAttributeValue(final String value) {
		String timeString = null;
		Integer timeValue = -1;
		Integer minutes= 0;
		Integer hours= 0;
		try {
			if(StringUtils.isNotBlank(value)){
				timeValue = Integer.parseInt(value);
				if(null == timeValue) {
                    timeValue = -1;
                } // end if
				if(60 > timeValue) {
                    timeString = timeValue.toString() + " " + MINUTES;
                } else{
					minutes = timeValue % 60;
					hours = timeValue / 60;
					if(0 == minutes) {
                        timeString = hours.toString() + " " + HOUR;
                    } else if((1 == hours) && (0 != minutes)) {
                        timeString = hours.toString() + " " + HOUR + " " + minutes.toString() + " " + MINUTES;
                    } else {
                        timeString = hours.toString() + " " + HOURS + " " + minutes.toString() + " " + MINUTES;
                    } // end if
				} // end if
			} // end if
		} catch (NumberFormatException e) {
            LOG.error("Number format exception: ", e);
        } catch (Exception e) {
            LOG.error("Error while conerting String to Time attribute value : Property Resolver :: processTimeAttributeValue...", e);
		}
        LOG.info("Property Resolver :: processTimeAttributeValue...", timeString);
		return timeString;
	}
	
	/**
	 * Used to convert the resource path to value Map Object
	 * @param resourcePath
	 * @param resourceResolver
	 * @return {@link ValueMap}
	 */
	public static ValueMap getValueMapObject(final String resourcePath, final ResourceResolver resourceResolver){
        LOG.info(" In Property Resolver :: getValueMapObject ::");
		try{
			if(null != resourceResolver){
				final Resource resource=resourceResolver.getResource(resourcePath);
				if(null != resource){
					final ValueMap properties=resource.adaptTo(ValueMap.class);
					return properties;
				} // end if
			} // end if
		}catch(Exception e){
            LOG.error("Error while getting configuration properties object", e);
		}
		return null;
	}
	

    public static String buildSubList(Page pagenode, String domain)
    {
        String sbuilder = "",loc="",lastmod="",changefreq="",priority="",pageTemplate="";
        
        Iterator<Page> children = pagenode.listChildren(null);
        while(children.hasNext())
        {
            Page child = children.next();
            String displayDescendants = child.getProperties().get("displaydescendants", "yes");
            String navpath = child.getProperties().get("navpath", "");
            Boolean hideInSitemap = false;
            if(child.getProperties().containsKey("hideinsitemap")) {
            	hideInSitemap =Boolean.valueOf(child.getProperties().get("hideinsitemap").toString());
            }
            
            long level = child.getDepth();
            if(!hideInSitemap && level>2 && navpath=="")
            {
            	try{
            	 pageTemplate=(String)child.getProperties().get("cq:template");
            	 loc = PathResolver.getShortURLPath(child.getPath());//resourceResolver.map(child.getPath()+".html");
                 changefreq = child.getProperties().get("pagechangefreq","weekly");
                 priority = child.getProperties().get("pagepriority","1.0");
                 if(child.getLastModified()!=null){
                	 lastmod = child.getLastModified().getTime().toString();
                 }
                 else{
                	 lastmod= ((java.util.GregorianCalendar)child.getProperties().get("jcr:created")).getTime().toString();
                 }
            	}
            	catch(Exception e){
            		LOG.error("Exception in buildSubList::"+e);
            	}
            	if(null != pageTemplate){
                sbuilder += ("<url>\n");
                sbuilder += ("<loc>http://"+domain+loc+"</loc>\n");
                sbuilder += ("<lastmod>"+lastmod+"</lastmod>\n");
                sbuilder += ("<changefreq>"+changefreq+"</changefreq>\n");
                sbuilder += ("<priority>"+priority+"</priority>\n");
                sbuilder += ("</url>\n");
            	}
            }
            if(child.listChildren(null).hasNext() && displayDescendants.equals("yes"))
            {
                sbuilder += (buildSubList(child, domain));
            }
        }
        LOG.info("sbuilder::"+sbuilder);
        return sbuilder;
    }
    public static void sendEmail(String toEmail, String fromEmail, String subject,
			String content) {

		HtmlEmail userEmail = new HtmlEmail();
		try {
            Bundle bndl = FrameworkUtil.getBundle(com.day.cq.mailer.MailService.class);
            BundleContext bundleContext = bndl.getBundleContext();
            ServiceReference ref = bundleContext.getServiceReference(MailService.class.getName());
            MailService mailService = (MailService) bundleContext.getService(ref);
            if (LOG.isDebugEnabled()) {
                LOG.debug("mailService:::" + mailService);
            }
			if (null != fromEmail && null != toEmail && !fromEmail.isEmpty()
					&& !toEmail.isEmpty()) {
				List<InternetAddress> emailReceipent = new ArrayList<InternetAddress>();
				String[] toAddressArray = toEmail.split(COMMA);
				for (String emailid : toAddressArray) {
					emailReceipent.add(new InternetAddress(emailid.trim()));
				}
				userEmail.setFrom(fromEmail);
				userEmail.setTo(emailReceipent);
				userEmail.setSubject(subject);

				userEmail.setHtmlMsg(content.toString());
				LOG.info("***Mail Sent***" + content.toString());
				mailService.send(userEmail);

				LOG.info("***Mail Sent***" + content.toString());

			}
		} catch (AddressException e) {
			LOG.error("Address Exception occured while setting the receiver's email"
					+ e);
		} catch (EmailException e) {
			LOG.error("An Exception occured while sending the mail" + e);
		} catch (Exception e) {
			LOG.error("An Exception occurred while Processing the form" + e);
		}
	}
	

	public static String getParameter(String paramenter,
			SlingHttpServletRequest request) {
		String parameter = request.getParameter(paramenter) != null ? request
				.getParameter(paramenter) : EMPTY_STRING;
		return parameter;
	}
	
	public static String getCanadaStatesMap(Node currentNode){
		String returnString="";
		Map<String,String> canadaStatesMap=new HashMap<String,String>();
		try{
		String[] cityNames=getStringArrayProperty(currentNode.getProperty("cafecity"));
		String[] cafeContacts=getStringArrayProperty(currentNode.getProperty("cafecontact"));
		String[] cafeNames=getStringArrayProperty(currentNode.getProperty("cafename"));
		int cafe=Integer.parseInt(currentNode.getProperty("canandastatesmultifield").getString());
		for(int i=0;i<cafe;i++){
			if(canadaStatesMap.get(cityNames[i])!=null){
				canadaStatesMap.put(cityNames[i], cafeContacts[i]+"="+cafeNames[i]+"+"+canadaStatesMap.get(cityNames[i]));
			}
			else{
				canadaStatesMap.put(cityNames[i], cafeContacts[i]+"="+cafeNames[i]);
			}
		}
		//forming html
		String[] values=null,emailAndNames=null;
		for (Map.Entry<String, String> entry : canadaStatesMap.entrySet()) {
			values= entry.getValue().split("\\+");
			returnString=returnString+"<optgroup label='"+entry.getKey()+"'>";
			for(int j=0;j<values.length;j++){
				emailAndNames=values[j].split("=");
				returnString=returnString+"<option value='"+emailAndNames[0]+"'>";
				returnString=returnString+emailAndNames[1]+"</option>";
			}
			
			returnString=returnString+"</optgroup>";
			
		}
		
		}
		catch(Exception e){
			LOG.error("Exception::"+e);
		}
		LOG.debug("returnString::"+returnString);
		return returnString;
	}
   
	/**
    Escape characters for text appearing in HTML markup.
    
    <P>This method exists as a defence against Cross Site Scripting (XSS) hacks.
    The idea is to neutralize control characters commonly used by scripts, such that
    they will not be executed by the browser. This is done by replacing the control
    characters with their escaped equivalents.  
    See {@link hirondelle.web4j.security.SafeText} as well.
    
    <P>The following characters are replaced with corresponding 
    HTML character entities :
    <table border='1' cellpadding='3' cellspacing='0'>
    <tr><th> Character </th><th>Replacement</th></tr>
    <tr><td> & </td><td> &amp; </td></tr>
    <tr><td> " </td><td> &quot;</td></tr>
    <tr><td> \t </td><td> &#009;</td></tr>
    <tr><td> ! </td><td> &#033;</td></tr>
    <tr><td> # </td><td> &#035;</td></tr>
    <tr><td> $ </td><td> &#036;</td></tr>
    <tr><td> % </td><td> &#037;</td></tr>
    <tr><td> ' </td><td> &#039;</td></tr>
    <tr><td> ( </td><td> &#040;</td></tr> 
    <tr><td> ) </td><td> &#041;</td></tr>
    <tr><td> * </td><td> &#042;</td></tr>
    <tr><td> + </td><td> &#043; </td></tr>
    <tr><td> , </td><td> &#044; </td></tr>
    <tr><td> - </td><td> &#045; </td></tr>
    <tr><td> . </td><td> &#046; </td></tr>
    <tr><td> / </td><td> &#047; </td></tr>
    <tr><td> : </td><td> &#058;</td></tr>
    <tr><td> ; </td><td> &#059;</td></tr>
    <tr><td> = </td><td> &#061;</td></tr>
    <tr><td> ? </td><td> &#063;</td></tr>
    <tr><td> @ </td><td> &#064;</td></tr>
    <tr><td> [ </td><td> &#091;</td></tr>
    <tr><td> \ </td><td> &#092;</td></tr>
    <tr><td> ] </td><td> &#093;</td></tr>
    <tr><td> ^ </td><td> &#094;</td></tr>
    <tr><td> _ </td><td> &#095;</td></tr>
    <tr><td> ` </td><td> &#096;</td></tr>
    <tr><td> { </td><td> &#123;</td></tr>
    <tr><td> | </td><td> &#124;</td></tr>
    <tr><td> } </td><td> &#125;</td></tr>
	<tr><td> ~ </td><td> &#126;</td></tr>
    <tr><td> � </td><td> &#174;</td></tr>
    <tr><td> ? </td><td> &#126;</td></tr>
    <tr><td> � </td><td> &#153;</td></tr>
    <tr><td> � </td><td> &#169;</td></tr>
    <tr><td> � </td><td> &#176;</td></tr>
    <tr><td> � </td><td> &#133;</td></tr>
    <tr><td> � </td><td> &#150;</td></tr>
    <tr><td> � </td><td> &#151;</td></tr>
    <tr><td> ? </td><td> &#63;</td></tr>
    </table>
    
    <P>Note that JSTL's {@code <c:out>} escapes <em>only the first 
    five</em> of the above characters.
   */
	 public static String escapeHtml(String text){
		 if(StringUtils.isEmpty(text)){
			 return text;
		 }
	     final StringBuilder result = new StringBuilder();
	     final StringCharacterIterator iterator = new StringCharacterIterator(text);
	     char character =  iterator.current();
	     while (character != CharacterIterator.DONE ){
		       if(character == '&'){
		         result.append("&amp;");
		       }else if (character == '\"'){
		         result.append("&quot;");
		       }else if (character == '\t'){
		         addCharEntity(9, result);
		       }else if (character == '!'){
		         addCharEntity(33, result);
		       }else if (character == '#'){
		         addCharEntity(35, result);
		       }else if (character == '$'){
		         addCharEntity(36, result);
		       }else if (character == '%'){
		         addCharEntity(37, result);
		       }else if (character == '\''){
		         addCharEntity(39, result);
		       }else if (character == '('){
		         addCharEntity(40, result);
		       }else if (character == ')'){
		         addCharEntity(41, result);
		       }else if (character == '*'){
		         addCharEntity(42, result);
		       }else if (character == '+'){
		         addCharEntity(43, result);
		       }else if (character == ','){
		         addCharEntity(44, result);
		       }else if (character == '-'){
		         addCharEntity(45, result);
		       }else if (character == '.'){
		         addCharEntity(46, result);
		         /*}else if (character == '/'){
		         addCharEntity(47, result);*/
		       }else if (character == ':'){
		         addCharEntity(58, result);
		       }else if (character == ';'){
		         addCharEntity(59, result);
		       }else if (character == '='){
		         addCharEntity(61, result);
		       }else if (character == '?'){
		         addCharEntity(63, result);
		       }else if (character == '@'){
		         addCharEntity(64, result);
		       }else if (character == '['){
		         addCharEntity(91, result);
		       }else if (character == '\\'){
		         addCharEntity(92, result);
		       }else if (character == ']'){
		         addCharEntity(93, result);
		       }else if (character == '^'){
		         addCharEntity(94, result);
		       }else if (character == '_'){
		         addCharEntity(95, result);
		       }else if (character == '`'){
		         addCharEntity(96, result);
		       }else if (character == '{'){
		         addCharEntity(123, result);
		       }else if (character == '|'){
		         addCharEntity(124, result);
		       }else if (character == '}'){
		         addCharEntity(125, result);
		       }else if (character == '~'){
		         addCharEntity(126, result);
		       }else if (character == '?'){
			     addCharEntity(63, result);
			   }else{
		         //the char is not a special one
		         //add it to the result as is
		         result.append(character);
		       }
		       character = iterator.next();
	     }
	     	return result.toString();
	  }
	 private static void addCharEntity(Integer aIdx, StringBuilder aBuilder){
		    String padding = "";
		    if(aIdx <= 9 ){
		       padding = "00";
		    }else if( aIdx <= 99 ){
		      padding = "0";
		    }else{
		      //no prefix
		    }
		    String number = padding + aIdx.toString();
		    aBuilder.append("&#" + number + ";");
	 }

}
