package com.hdscorp.cms.workflow;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.IIOException;
import javax.imageio.ImageIO;
import javax.jcr.Item;
import javax.jcr.Node;
import javax.jcr.Session;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.day.cq.dam.api.handler.AssetHandler;
import com.day.cq.dam.commons.process.AbstractAssetWorkflowProcess;
import com.day.cq.dam.commons.util.MemoryUtil;
import com.day.cq.workflow.WorkflowException;
import com.day.cq.workflow.WorkflowSession;
import com.day.cq.workflow.exec.WorkItem;
import com.day.cq.workflow.exec.WorkflowData;
import com.day.cq.workflow.exec.WorkflowProcess;
import com.day.cq.workflow.metadata.MetaDataMap;
import com.hdscorp.cms.config.HdsCorpGlobalConfiguration;

/**
 * This class will be Used to Generate Dekstop and Tablet Images.
 * 
 * @param item
 *            - Workflow item holding workflow data
 * @param wfSession
 *            - Workflow session object
 * @param args
 *            - Arguments metadata map
 * @throws WorkflowException
 *             - exception in workflow lifecycle
 **/
/**
 * @author abhinav
 * 
 */

@Component
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "HdsCorpImageRenditions"),
		@Property(name = Constants.SERVICE_VENDOR, value = "Adobe"),
		@Property(name = "process.label", value = "Panera Image Renditions") })
public class HdsCorpImageRenditions extends AbstractAssetWorkflowProcess
		implements WorkflowProcess {

	/**
	 * <p>
	 * Holds the string literal for process argument separator.
	 * </p>
	 */
	private static final String ARGUMENT_SEPARATOR = ",";

	private static final Logger log = LoggerFactory
			.getLogger(HdsCorpImageRenditions.class);

	/**
	 * <p>
	 * Holds the string literal for file name separator.
	 * </p>
	 */
	private static final String FILENAME_SEPARATOR = ".";

	/**
	 * <p>
	 * Holds the error string literal for error during renaming.
	 * </p>
	 */
	private static final String ERROR_STRING = "Error while renaming renditions for asset: ";

	@Reference
	private ResourceResolverFactory resolverFactory;

	@Override
    public void execute(final WorkItem workItem,
			final WorkflowSession workflowSession, final MetaDataMap args)
			throws WorkflowException {

		try {

			final Session jcrSession = workflowSession.getSession();
			final WorkflowData workflowData = workItem.getWorkflowData();
			final String[] percentages = buildArguments(args);
			String payloadPath = "";
			if (workflowData.getPayloadType().equals("JCR_PATH")) {
				payloadPath = workflowData.getPayload().toString();
			} // end if

			final Asset asset = getAssetFromPayload(workItem,
					workflowSession.getSession());

			final Node renditionNode = jcrSession.getNode(payloadPath);

			final Node jcrNode = getImageNode(renditionNode).getNode(
					"jcr:content/metadata");

			final long width = Long.parseLong(jcrNode.getProperty("tiff:ImageWidth")
					.getValue().getString());
			final long length = Long.parseLong(jcrNode
					.getProperty("tiff:ImageLength").getValue().getString());

			String originalSizes[];
			long percent, oriwidth, oriheight;

			final Map<String, String> renditionNames = new HashMap<String,String>(32, 0.75f);
			final Collection<String> rendtionList = new ArrayList<String>();
			String rendition = "";

			for (final String singlePercentage : percentages) {

				originalSizes = singlePercentage.split("=");

				if ("desktop".equals(originalSizes[0].toString())) {

					if ((width <= 110) && (length <= 200)) {
                        log.info("Not able to create image rendition with the width="
                                + width + "length=" + length + "sizes");

					} else {

						percent = Integer.parseInt(originalSizes[1]);
						oriwidth = percent * width / 100;
						oriheight = percent * length / 100;
						rendition = oriwidth + ":" + oriheight;
						rendtionList.add(rendition);
						renditionNames.put("cq5dam.web." + oriwidth + "."
								+ oriheight, originalSizes[0].toString());

					} // end if

				}
	
			}
			String[] rends = new String[rendtionList.size()];
			rends = (String[]) rendtionList.toArray(rends);
			createImages(rends, workItem, workflowSession, renditionNames);

		} catch (Exception e) {
			log.error("generic exception: ", e);

		}

	}

	private Node getImageNode(final Item originalNode) {

		Node imageNode = null;
		try {
			imageNode = originalNode.getParent().getParent().getParent();

		} catch (Exception e) {
			log.error("Generic exception: ", e);
		}

		return imageNode;

	}

	public void createImages(final String[] args, final WorkItem workItem,
			final WorkflowSession workflowSession,
			final Map<String, String> renditionNames) {

		BufferedImage image = null;

		try {
			final Asset asset = getAssetFromPayload(workItem,
					workflowSession.getSession());

			if ((null != asset) && (!doIgnore(args, asset))) {
				asset.setBatchMode(true);

				final String mimetype = asset.getMimeType();

				final String keepFormat = !getValuesFromArgs("keepFormatList", args).isEmpty() ? (String) getValuesFromArgs(
                        "keepFormatList", args).get(0) : "image/pjpeg,image/jpeg,image/jpg,image/gif,image/png,image/x-png";

				final String qualityStr = !getValuesFromArgs("quality", args).isEmpty() ? (String) getValuesFromArgs(
                        "quality", args).get(0) : "80";

				if (MemoryUtil.hasEnoughSystemMemory(asset)) {
					final AssetHandler handler = getAssetHandler(asset.getMimeType());
					final WebEnabledImageCreator creator = new WebEnabledImageCreator(
							asset, this.mimeTypeService);
					final Rendition original = asset.getOriginal();

					long trials = 100L;
					try {
						while ((image == null) && (trials > 0L)) {
							trials -= 1L;
							try {
								image = ImageIO.read(asset.getOriginal()
										.getStream());

								// image = this.imageCache.getImage(original,
								// handler);

							} catch (IOException e) {
								if (((e instanceof IIOException))
										&& (e.getMessage()
												.contains("Not enough memory"))) {
                                    log.debug(
                                            "execute: insufficient memory, reloading image. Free mem [{}]. Asset [{}].",
                                            Runtime.getRuntime()
                                                    .freeMemory(), asset
                                            .getPath());

									Thread.sleep((long) (5000.0D * (Math
											.random() + 2.0D)));
									continue;
								}
                                log.debug(
                                        "execute: error while loading image for [{}]: ",
                                        asset.getPath(), e);
								throw new IOException(e.getMessage());
							}

							if (image != null) {
								try {

                                    log.debug("Creating Images.");

									if (args != null) {

										String dimensions = "";

                                        for (String arg : args) {

                                            dimensions = arg;

                                            creator.create(image, mimetype,
                                                    dimensions, keepFormat,
                                                    qualityStr, true,
                                                    renditionNames);
                                        }

									}

								} catch (IOException e) {
									if (((e instanceof IIOException))
											&& (e.getMessage()
													.contains("Not enough memory"))) {
										if (log.isDebugEnabled()) {
                                            log.debug(
                                                    "execute: insufficient memory, reloading image. Free mem [{}]. Asset [{}].",
                                                    Runtime
                                                            .getRuntime()
                                                            .freeMemory(),
                                                    asset.getPath());
										}

										image = null;

										Thread.sleep((long) (5000.0D * (Math
												.random() + 2.0D)));
									} else {
                                        log.debug(
                                                "execute: error while loading web enabled image for [{}]: ",
                                                asset.getPath(), e);

										throw new IOException(e.getMessage());
									}
								}
							} else {
                                log.warn(
                                        "execute: cannot extract image from [{}].",
                                        asset.getPath());
                            }
						}
					} finally {
						if (image != null) {
							// image.release();
						}
					}
					if (trials == 0L) {
                        log.warn(
                                "execute: failed creating web enabled image, insufficient memory even after [{}] trials for [{}].",
                                100, asset.getPath());
					}
				} else {
                    log.warn(
                            "execute: failed loading image,  insufficient memory. Increase heap size up to [{}bytes] for asset [{}].",
                            MemoryUtil.suggestMaxHeapSize(asset),
                            asset.getPath());
				}

			} else {
				if (asset == null) {
					final String wfPayload = workItem.getWorkflowData().getPayload()
							.toString();
					final String message = "execute: cannot create web enabled image, asset [{"
							+ wfPayload
							+ "}] in payload doesn't exist for workflow [{"
							+ workItem.getId() + "}].";
					throw new WorkflowException(message);
				}
                log.debug(
                        "execute: asset [{}] exists, but configured to ignore.",
                        asset.getPath());
			}
		} catch (Exception e) {
			try {
				throw new WorkflowException(e);
			} catch (WorkflowException e1) {
				log.error("Workflow exception: ", e1);
			}
		}

	}

	private boolean doIgnore(final String[] args, final Asset asset) {
		final String mimeType = asset.getMimeType();
		if (mimeType == null) {
            log.debug("doIgnore: no mimetype available for asset [{}].",
                    asset.getPath());
			return true;
		}
		final List<String> values = getValuesFromArgs("skip", args);
		for (final String val : values) {
			if (mimeType.matches(val)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * <p>
	 * The responsibility of this method is to read the process arguments.
	 * </p>
	 * 
	 * @param metaData
	 *            - arguments of this process
	 * @return - String array of process arguments split on ARGUMENT_SEPARATOR
	 */
	private String[] buildArguments(final MetaDataMap metaData) {
		final String processArgs = (String) metaData.get(
				HdsCorpImageRenditions.Arguments.PROCESS_ARGS.name(), String.class);
		if (StringUtils.isNotBlank(processArgs)) {
			return processArgs.split(ARGUMENT_SEPARATOR);
		}

		final String[] configs = (String[]) metaData.get(HdsCorpImageRenditions.Arguments.CONFIGS.name(),
				String[].class);
		if (configs != null) {
			return configs;
		}
		return new String[0];
	}

	/**
	 * Enum for workflow process argument type.
	 * 
	 * 
	 */

	public static enum Arguments {
		PROCESS_ARGS, CONFIGS;
	}

}
