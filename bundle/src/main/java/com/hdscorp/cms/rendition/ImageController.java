package com.hdscorp.cms.rendition;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.hdscorp.cms.util.PathResolver;
import com.day.cq.dam.core.process.CreateThumbnailProcess;

public class ImageController {
	
	public static final String RENDITION_CQ_DAM = "/jcr:content/renditions/";
	public static final String JPEG_EXTENSION = ".jpeg";
	public static final String PNG_EXTENSION = ".png";
	public static final String GIF_EXTENSION = ".gif";
	public static final String DESKTOP_RENDITION = ".desktop";
	public static final String NEWS_HAPPENING_RENDITION = ".articledetail";
	public static final String SEARCHITEM_RENDITION = ".searchmenuitem";
	public static final String SEARCHARTICLE_RENDITION = ".searcharticle";
	public static final String TABLET_RENDITION = ".retina";
	public static final String MOBILE_LANDSCAPE = "landscape";
	public static final String MOBILE_PORTRAIT = "portrait";
	public static final String LAZY_IMAGE_SRC = "/etc/designs/hdscorp/clientLibs/css/images/blank-placard-placeholder.gif";

	private static final Logger LOG = LoggerFactory.getLogger(ImageController.class);

	private String imagePath;
	private String defaultImagePath;
	private ResourceResolver resourceResolver;

	public final ResourceResolver getResourceResolver() {
		return this.resourceResolver;
	}

	public final void setResourceResolver(final ResourceResolver resourceResolver) {
		this.resourceResolver = resourceResolver;
	}

	public final String getDefaultImagePath() {
		return this.defaultImagePath;
	}

	public final void setDefaultImagePath(final String defaultImagePath) {
		this.defaultImagePath = defaultImagePath;
	}

	public final String getImagePath() {
		return this.imagePath;
	}

	public final void setImagePath(final String imagePath) {
		this.imagePath = imagePath;
	}

	private boolean isRenditionAvailable(final String imgPath, final String renditionPath){
		if(null != this.resourceResolver){
			try{
				final Asset asset = this.resourceResolver.getResource(imgPath).adaptTo(Asset.class);
				if(null != asset){
					 final List<Rendition> renditions = asset.getRenditions();
				        for(final Rendition rendition:renditions){
				        	if(rendition.getPath().equals(renditionPath)){
				        		return true;
				        	} // end if
				        }
				} // end if		       
			}catch(Exception e){
                LOG.error("Error while getting the asset object" , e.getMessage());
				return false;
			}
			
		} // end if		
		return false;
	}

	private String getFilenameFromPath(final String path){
		return StringUtils.substringBefore(StringUtils.substringAfterLast(path, "/"),".");
	}

	private String getExtentionFromPath(final String path){
		final String ext = StringUtils.substringAfter(StringUtils.substringAfterLast(path, "/"),".");
		if("jpg".equalsIgnoreCase(ext) || "jpeg".equalsIgnoreCase(ext)){
			return JPEG_EXTENSION;
		}else if("png".equalsIgnoreCase(ext)){
			return PNG_EXTENSION;
		}else if("gif".equalsIgnoreCase(ext)){
			return GIF_EXTENSION;
		}else{
			return "";
		} // end if
	}

	public String getDesktopImage(){
		if(null != this.defaultImagePath){
			return this.defaultImagePath;
		}else if((null != this.imagePath) && imagePath.length() != 0){
			final String rendition = this.imagePath + RENDITION_CQ_DAM + getFilenameFromPath(this.imagePath) + DESKTOP_RENDITION + getExtentionFromPath(this.imagePath);
			if(isRenditionAvailable(this.imagePath,rendition)){
				try {
					return PathResolver.getShortURLPath(rendition);
				} catch (Exception e) {
                    LOG.error("Error while getting short url " , e);
				return rendition;
				}
			}else{
				return this.imagePath;
			} // end if
		}else{
			return "";
		} // end if
	}
	
	
	public String getNewsHappeningImage(){
		if(null != this.defaultImagePath){
			return this.defaultImagePath;
		}else if((null != this.imagePath) && this.imagePath.length() != 0){
			final String rendition = this.imagePath + RENDITION_CQ_DAM + getFilenameFromPath(this.imagePath) + NEWS_HAPPENING_RENDITION + getExtentionFromPath(this.imagePath);
			if(isRenditionAvailable(this.imagePath,rendition)){
				try {
					return PathResolver.getShortURLPath(rendition);
				} catch (Exception e) {
                    LOG.error("Error while getting short url ", e);
				return rendition;
				}
			}else{
				return this.imagePath;
			} // end if
		}else{
			return "";
		} // end if
	}


	public String getDefaultImage(){
		if(null != this.defaultImagePath){
			return this.defaultImagePath;
		}else if(null != this.imagePath){
			return this.imagePath;
		}else{
			return "";
		} // end if
	}
	
	public String getMobileLandscapeImage(){
		final String rendition = this.imagePath + RENDITION_CQ_DAM  + MOBILE_LANDSCAPE + getExtentionFromPath(this.imagePath);
		if(isRenditionAvailable(this.imagePath,rendition)){
			try {
				return PathResolver.getShortURLPath(rendition);
			} catch (Exception e) {
                LOG.error("Error while getting short url ", e);
			}	
			}
		if(rendition!=null)return rendition;
		else return "";
		}
	
	public String getMobilePortraitImage(){
		final String rendition = this.imagePath + RENDITION_CQ_DAM +  MOBILE_PORTRAIT + getExtentionFromPath(this.imagePath);
		if(isRenditionAvailable(this.imagePath,rendition)){
			try {
				return PathResolver.getShortURLPath(rendition);
			} catch (Exception e) {
                LOG.error("Error while getting short url ", e);
			}	
			}
		if(rendition!=null)return rendition;
		else return "";
	}
	public final String getLazyImage(){
		return LAZY_IMAGE_SRC;

	}

}
