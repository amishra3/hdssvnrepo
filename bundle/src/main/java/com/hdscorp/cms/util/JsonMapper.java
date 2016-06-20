package com.hdscorp.cms.util;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class JsonMapper {
    private static final Logger log = LoggerFactory.getLogger(JsonMapper.class);

    private JsonMapper() {
    }

    public static String getStringJsonFromJavaBean(final Object object){
		try{
			return getJsonMapper().writeValueAsString(object);
		}catch(JsonMappingException jme){
    log.error("JSON mapping exception: ", jme);
			//LOG.error("Error while getting String from Json Object :: JsonMappingException:: " +jme);
		} catch (JsonGenerationException e) {
            log.error("JSON Generate exception: ", e);
        } catch(Exception e){
			log.error("Generic exception: ", e);
		}
		return null;
	}
	/**
	 * Used to get the Object from given Json Object
	 * @param object
	 * @param jsonString
	 * @return {@link Object}
	 */
	public static Object getObjectFromJson(final Object object, final String jsonString){
		try{
			return getJsonMapper().readValue(jsonString, object.getClass());
		}catch(JsonMappingException jme){
			log.error("JSON mapping exception: ", jme);
		} catch (JsonParseException e) {
            log.error("JSON parse exception: ", e);
        } catch(Exception e){
			log.error("Generic exception: ", e);
		}
		return null;
	}
	/**
	 * Used to get the ObjectMapper Instance
	 * @return {@link ObjectMapper}
	 */
	private static ObjectMapper getJsonMapper(){
		ObjectMapper objectMapper=null;
		try{
			objectMapper=new ObjectMapper();
			return objectMapper;
		}catch(Exception e){
			log.error("Error while getting JsonObjectMapper:", e);
		}
		return objectMapper;
	}
}
