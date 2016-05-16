package com.hdscorp.cms.workflow;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import javax.imageio.IIOException;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.commons.mime.MimeTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.OrientationUtil;
import com.day.image.Layer;

/**
 * 
 * This Class will be Used to Rename image names for desktop and ipad.
 * 
 * @author abhinav
 * 
 */
public class WebEnabledImageCreator {
	private static final Logger log = LoggerFactory
			.getLogger(WebEnabledImageCreator.class);
	private static final String WEB_SPECIFIER = "web";
	private final Asset asset;
	private final MimeTypeService mimeTypeService;

	public WebEnabledImageCreator(final Asset asset, final MimeTypeService mimeTypeService) {
		this.asset = asset;
		this.mimeTypeService = mimeTypeService;
	}

	public void create(final BufferedImage image, final String defaultMimetype,
			final String dimensions, final String keepFormat, final String qualityStr,
			final boolean force, final Map<String, String> renditionNames)
			throws RepositoryException, IOException, ValueFormatException, PathNotFoundException {
		final int maxWidth = getDimension(dimensions)[0].intValue();
		final int maxHeight = getDimension(dimensions)[1].intValue();
		final String oriMimeType = getMimeType(this.asset);

		final String mimetype = ((StringUtils.isNotBlank(oriMimeType))
                && (keepFormat.contains(oriMimeType))) ? oriMimeType : defaultMimetype;

		final double quality = "image/gif".equals(mimetype) ? getQuality(255.0D,
				qualityStr) : getQuality(1.0D, qualityStr);

		final Layer layer = createImage(image, maxWidth, maxHeight);

		if (OrientationUtil.hasOrientationMetadata(this.asset)) {
			OrientationUtil.adjustOrientation(this.asset, layer);
		} // end if

		// String renditionName = "cq5dam.web." + maxWidth + "." + maxHeight +
		// "." + getExtension(mimetype);
			
		// ADDING CUSTOM RENDITION IMAGE NAME.
		
		String renditionName = "cq5dam.web." + maxWidth + "." + maxHeight;

		
		final StringBuilder stringBuffer = new StringBuilder(32);
		final int index = this.asset.getName().lastIndexOf('.');
		final String assetName = this.asset.getName().substring(0, index);
		if (StringUtils.isNotBlank(renditionNames.get(renditionName))) {

			stringBuffer.setLength(0);

			renditionName = stringBuffer.append(assetName).append('.')
					.append(renditionNames.get(renditionName)).append('.')
					.append(getExtension(mimetype)).toString();
		} // end if
		// CHANGED THE NAME.
	
		if (StringUtils.contains(keepFormat, oriMimeType)) {
			if ((image.getHeight() == layer.getHeight())
					&& (image.getWidth() == layer.getWidth()) && (!force)) {
				InputStream oriIs = null;
				try {
					oriIs = ((Node) this.asset.getOriginal()
							.adaptTo(Node.class))
							.getProperty("jcr:content/jcr:data").getBinary()
							.getStream();

					this.asset.addRendition(renditionName, oriIs, mimetype);
				} finally {
					IOUtils.closeQuietly(oriIs);
				}
			} else {
				saveImage(this.asset, layer, mimetype, quality, renditionName);
			} // end if
		} else {
            saveImage(this.asset, layer, mimetype, quality, renditionName);
        } // end if
	}

	protected void saveImage(final Asset asset, final Layer layer, final String mimetype,
			final double quality, final String renditionName) throws IOException, IIOException {
		final File tmpFile = File.createTempFile("web", "." + getExtension(mimetype));
		final OutputStream out = FileUtils.openOutputStream(tmpFile);
		InputStream is = null;
		try {
			layer.write(mimetype, quality, out);
			is = FileUtils.openInputStream(tmpFile);
			asset.addRendition(renditionName, is, mimetype);
		} finally {
			IOUtils.closeQuietly(out);
			IOUtils.closeQuietly(is);
			FileUtils.deleteQuietly(tmpFile);
		}
	}

	protected Layer createImage(final BufferedImage image, final int maxWidth, final int maxHeight) {
		final long startTime = System.currentTimeMillis();
		final Layer layer = new Layer(image);

		final int height = layer.getHeight();
		final int width = layer.getWidth();

		if ((height > maxHeight) || (width > maxWidth)) {
			int newWidth;
			int newHeight;
			if (height > width) {
				newHeight = maxHeight;
				newWidth = width * maxHeight / height;
				if (newWidth > maxWidth) {
					newWidth = maxWidth;
					newHeight = height * maxWidth / width;
				} // end if
			} else {
				newWidth = maxWidth;
				newHeight = height * maxWidth / width;
				if (newHeight > maxHeight) {
					newHeight = maxHeight;
					newWidth = width * maxHeight / height;
				}
			} // end if
			layer.resize(newWidth, newHeight);
		} // end if

		if (this.asset.getName().endsWith(".gif")) {
			layer.setTransparency(new Color(-991024));
		}
        log.debug("createImage took "
                + (System.currentTimeMillis() - startTime) + "ms");
		return layer;
	}

	protected String getExtension(final String mimetype) {
		return this.mimeTypeService.getExtension(mimetype);
	}

	protected String getMimeType(final Asset asset) {
		final String name = asset.getName().toLowerCase();
		return this.mimeTypeService.getMimeType(name);
	}

	protected Integer[] getDimension(final String dimensions) {
		if (null != dimensions) {
			final String[] splits = dimensions.split(":");
			final Integer[] d = new Integer[2];
			d[0] = Integer.valueOf(splits[0]);
			d[1] = Integer.valueOf(splits[1]);
			return d;
		}

		return new Integer[] {1000, 1000};
	}

	protected double getQuality(final double base, final String qualityStr) {
		final int q = Integer.valueOf(qualityStr).intValue();
		final double res = (base * q) / 100.0D;
		return res;
	}
}