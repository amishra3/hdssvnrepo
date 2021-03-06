/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * @class CQ.html5.UploadDialog
 * @extends CQ.Dialog
 * The UploadDialog lets the user upload files to the repository using HTML5
 * Creates a new UploadDialog.
 * @since 5.5, replaces {@link CQ.UploadDialog}
 * @param {Object} config The config object
 */

CQ.html5.UploadDialog = CQ.Ext.extend(CQ.Dialog, {

    destinationPath: null,

    /**
     * @cfg {String} useHTML5
     * True to use HTML5 upload. Defaults to true.
     */
    useHTML5: true,

    createVersion: false,
 
    canceled: false,

    constructor: function(config) {
        var dialog = this;

        this.useHTML5 = config.useHTML5 != undefined ? config.useHTML5 : true;
        if (!CQ.html5.Util.isUploadSupported()) {
            this.useHTML5 = false;
        }

        // Default configuration
        CQ.Util.applyDefaults(config, {
            closable: true,
            resizable: true,
            autoHeight: false,
            autoWidth: false,
            cls: "cq-uploaddialog",
            okText: CQ.I18n.getMessage("Upload"),
            buttons: CQ.Dialog.OKCANCEL,
            title: CQ.I18n.getMessage("Upload Assets"),
            formUrl: CQ.HTTP.externalize(CQ.shared.HTTP.encodePath(config.destinationPath)),
            fileUpload: true,
            height: 300,
            width: 400,
            useHTML5: this.useHTML5,
            items: {
                xtype: "panel",
                items: [
                    {
                        xtype: "static",
                        cls: "x-form-item-description",
                        html: CQ.I18n.getMessage("Upload to") + ": " + config.displayPath
                    },
                    dialog.makeFileUploadField(this.useHTML5)
                ],
                listeners: {
                    afterrender: function(e) {
                        CQ.Ext.select('.cq-uploaddialog .x-panel-body').setStyle("overflow","hidden")
                    }
                },
                bodyStyle: {
                    padding: '15px 0px 15px 15px'
				}
            },
            listeners: {
                beforesubmit: dialog.onBeforeSubmit,
                filenamechanged: dialog.onFileNameChanged,
                fileremoved: dialog.onFileRemoved,
                fileselected: dialog.onFileSelected,
                fileuploaderror: dialog.onFileUploadError,
                fileuploadok: dialog.onFileUploadOk,
                queuechanged: dialog.onQueueChanged,
                queueprocessed: dialog.onQueueProcessed
            },
            success: function() {
                window.setTimeout(function() {
                    dialog.hideAndReload();
                }, 1000);
            },
            failure: function() {
                if (dialog.canceled) {
                    // Upload has been canceled, "fail" silently
                    dialog.hideAndReload();
                    dialog.canceled = false;
                } else {
                    var title = CQ.I18n.getMessage("Error");
                    var msg = dialog.uploadFailed.length == 1 ?
                            CQ.I18n.getMessage("Failed to upload the following file:") :
                            CQ.I18n.getMessage("Failed to upload the following files:");
                    msg += "<br/><br/>";
                    for (var i = 0; i < dialog.uploadFailed.length; i++) {
                        msg += CQ.shared.XSS.getXSSValue(dialog.uploadFailed[i]) + "<br/>";
                    }
                    CQ.Ext.Msg.show({
                        title: title,
                        msg: msg,
                        icon: CQ.Ext.Msg.ERROR,
                        buttons: CQ.Ext.Msg.OK,
                        fn: function() {
                            dialog.hideAndReload();
                        }
                    });
                }
            }
        });

        CQ.html5.UploadDialog.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        this.queue = [];
        this.xhrList = [];

        this.addEvents(
            "fileuploadok",
            "fileuploaderror",
            "queuechanged",
            "queueprocessed"
        );

        CQ.html5.UploadDialog.superclass.initComponent.call(this);
    },

    // private
    hideAndReload: function() {
        if (this.mask) {
            this.mask.hide();
        }
        this.hide();
        var siteAdmin = CQ.Ext.getCmp(window.CQ_SiteAdmin_id);
        if (siteAdmin) siteAdmin.reloadPages();
    },

    /**
     * Adds a file to upload queue
     * @param {Object} file File to add to the upload queue
     */
    addFile: function(uploadField, file) {
        var fileName = file.name ? file.name : file;
        if (!this.getQueueItemByFileName(fileName)) {
            // Add an upload field for the file
            var newUploadField;
            var newItem;
            if (this.useHTML5) {
                newUploadField = uploadField.ownerCt.add(
                    this.makeFileUploadField(this.useHTML5, file)
                );
                newItem = {
                    file: file,
                    fileName: fileName,
                    fileSize: file.size,
                    // Newly created upload field contains file information
                    uploadField: newUploadField
                };
            } else {
                uploadField.ownerCt.add(
                    this.makeFileUploadField(this.useHTML5)
                );
                newItem = {
                    fileName: file,
                    // Current upload field contains file information
                    uploadField: uploadField
                };
            }

            // Add item to queue
            this.queue.push(newItem);
            this.fireEvent("queuechanged");
        } else {
            if (!this.useHTML5) {
                // Delete upload field and add a new one instead
                uploadField.ownerCt.add(
                    this.makeFileUploadField(this.useHTML5)
                );
                uploadField.clearFile();
            }
        }
    },

    /**
     * Gets the upload parent path
     * @return {String} Upload parent path
     */
    getParentPath: function() {
        // For DAM assets, remove the create selector. Otherwise, just use provided path
        return this.formUrl.replace(CQ.wcm.SiteAdmin.UPLOAD_URL_ASSET_REGEXP, "");
    },

    /**
     * Gets the URL to use for a POST request
     * @deprecated
     * @param {String} fileName Name of the file to upload
     * @return {String} POST request URL
     */
    getPostUrl: function(fileName) {
        return this.formUrl;
    },

    getQueueIndex: function(fileName) {
        var index = CQ.Ext.each(this.queue, function(item) {
            return !(item.fileName === fileName);
        });
        return CQ.Ext.isDefined(index) ? index : -1;
    },

    getQueueItem: function(index) {
        return index > -1 ? this.queue[index] : null;
    },

    getQueueItemByFileName: function(fileName) {
        return this.getQueueItem(this.getQueueIndex(fileName));
    },

    makeFileUploadField: function(html5Upload, file) {
        var dialog = this;

        return {
            xtype: "html5fileuploadfield",
            hideLabel: true,
            name: name,
            fileNameParameter: ":assetname", // start name with ":" simply to not save the property
            allowFileNameEditing: true,
            vtype: "name",
            invalidText: CQ.Ext.form.VTypes["nameText"],
            removable: true,
            html5Upload: html5Upload,
            fileNamePrefix: dialog.fileNamePrefix,
            targetEl: dialog,
            file: file
        };
    },

    onBeforeSubmit: function(dialog) {
        dialog.uploadFailed = [];

        var uploadfields = dialog.findByType("html5fileuploadfield");
        var parent = CQ.HTTP.eval(CQ.HTTP.noCaching(dialog.getParentPath() + ".1.json"));
        var conflicts = [];

        // to normalize double byte spaces in filename
        var whitespaces =
            ["\u00A0", // NO-BREAK SPACE
             "\u1680", // OGHAM SPACE MARK
             "\u180E", // MONGOLIAN VOWEL SEPARATOR
             "\u2000", // EN QUAD
             "\u2001", // EM QUAD
             "\u2002", // EN SPACE
             "\u2003", // EM SPACE
             "\u2004", // THREE-PER-EM SPACE
             "\u2005", // FOUR-PER-EM SPACE
             "\u2006", // SIX-PER-EM SPACE
             "\u2007", // FIGURE SPACE
             "\u2008", // PUNCTUATION SPACE
             "\u2009", // THIN SPACE
             "\u200A", // HAIR SPACE
             "\u2028", // LINE SEPARATOR
             "\u2029", // PARAGRAPH SEPARATOR
             "\u202F", // NARROW NO-BREAK SPACE
             "\u205F", // MEDIUM MATHEMATICAL SPACE
             "\u3000"]; // IDEOGRAPHIC SPACE

        for (var i = 0; i < this.queue.length; i++) {
            var name = this.queue[i].fileName;
            if(name) {
                for (var j = 0; j < whitespaces.length; j++) {
                    name = name.replace(whitespaces[j]," ");
                }
                this.queue[i].fileName = name;
            }
        }
        for (var i = 0; i < uploadfields.length; i++) {
            var name = uploadfields[i].getValue();
            if(name) {
                for (var j = 0; j < whitespaces.length; j++) {
                    name = name.replace(whitespaces[j]," ");
                }
            }
            if (parent[name]) {
                conflicts.push(name);
            }
            // performing setName always to fix CQ-35402
            // replace double quotes, see #34155
            uploadfields[i].setName(uploadfields[i].getValue().replace(/"/g, "%22"));
        }

        if (conflicts.length == 0) {
            var siteAdmin = CQ.Ext.getCmp(window.CQ_SiteAdmin_id);
            if (siteAdmin) {
                siteAdmin.mask();
            }
            return true;
        }

        if (this.createVersion == true) {
            return true;
        }

        var msg = conflicts.length == 1 ?
                CQ.I18n.getMessage("An asset of the same name already exists in this location:") :
                CQ.I18n.getMessage("Assets of the same name already exist in this location:");
        msg += "<br/><br/>";
        for (i = 0; i < conflicts.length; i++) {
            msg += CQ.shared.XSS.getXSSValue(conflicts[i]) + "<br/>";
        }

        msg += "<br/><br/>";
        msg += conflicts.length == 1 ?
                CQ.I18n.getMessage("Click 'Create Version' to create the verison of the asset or <br/><br/> 'Replace' to replace the asset or 'Cancel' to adjust the name.") :
                CQ.I18n.getMessage("Click 'Create Version' to create the verison of the assets or <br/><br/> 'Replace' to replace the assets or 'Cancel' to adjust the names.");
        CQ.Ext.Msg.show({
            "title":CQ.I18n.get("Name Conflict"),
            "msg":msg,
            "buttons":{
                yes:CQ.I18n.get("Create Version"),
                handler:function () {


                },
                no:CQ.I18n.get("Replace"),
                handler:function () {

                },
                cancel:CQ.I18n.get("Cancel"),
                handler:function () {

                }
            },
            "icon":CQ.Ext.MessageBox.QUESTION,
            "fn":function (btnId) {
                if (btnId == "yes") {
                    this.createVersion = true;
                    dialog.ok();
                } else if (btnId == "no") {
                    for (var i = 0; i < conflicts.length; i++) {
						getMetadataProperties(dialog.getParentPath() + "/" + CQ.shared.HTTP.encodePath(conflicts[i]));					
                        CQ.HTTP.post(dialog.getParentPath() + "/" + CQ.shared.HTTP.encodePath(conflicts[i]), null, {
                            ":operation":"delete"
                        });
                    }
                    dialog.ok();
                } else {
                    // mark conflicting fields invalid
                    for (var u = 0; u < uploadfields.length; u++) {
                        if (conflicts.indexOf(uploadfields[u].getValue()) != -1) {
                            uploadfields[u].markInvalid(CQ.I18n.getMessage("An asset of the same name already exists in this location."));
                        }
                    }
                }
            },
            "scope":this
        });
        // Abort submission and trigger it by the ok button
        return false;
    },

    onFileNameChanged: function(uploadField, newFileName, oldFileName) {
        var itemIndex = this.getQueueIndex(oldFileName);
        if (itemIndex > -1) {
            this.queue[itemIndex].fileName = newFileName;
        }
    },

    onFileRemoved: function(fileName) {
        var itemIndex = this.getQueueIndex(fileName);
        if (itemIndex > -1) {
            this.queue.splice(itemIndex, 1);
            this.fireEvent("queuechanged");
        }
    },

    onFileSelected: function(uploadField, files) {
        if (this.useHTML5) {
            // HTML5 upload: FileList is provided
            for (var i = 0; i < files.length; i++) {
                this.addFile(uploadField, files[i]);
            }
        } else {
            // Regular upload: only a file name is provided
            this.addFile(uploadField, files);
        }
        this.doLayout();
    },

    /**
     * Upload specific file from the queue
     * @param {Object} item Queue item
     */
    html5UploadFile: function(item) {

        // Replace upload field by a progress bar
        item.uploadField.initProgressBar();

        // Do upload
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = this.onFileUploadLoad.createDelegate(this, [item, xhr], 0);

        xhr.upload.addEventListener("progress", this.onFileUploadProgress.createDelegate(this, [item], 0), false);
        xhr.upload.addEventListener("error", this.onFileUploadError.createDelegate(this, [item], 0), false);

        var file = item.file;
        var fileName = item.fileName;

        if (window.FormData) {
            var f = new FormData();
            if (this.formUrl.match(CQ.wcm.SiteAdmin.UPLOAD_URL_ASSET_REGEXP)) {
                // Upload asset
                f.append("file", file);
                f.append("fileName", fileName);
            } else {
                // Upload file
                f.append(fileName, file);
            }
            f.append(CQ.Sling.CHARSET, "utf-8");

            xhr.open("POST", this.formUrl, true);
            xhr.send(f);
        } else {
            xhr.open("PUT", this.getParentPath() + "/" + CQ.shared.HTTP.encodePath(fileName), true);
            xhr.send(file);
        }
        
        this.xhrList.push(xhr);
    },

    /**
     * Uploads queued files
     */
    html5UploadFiles: function() {
        // Disable upload button
        var button = CQ.Ext.getCmp(this.okButtonConfig.id);
        if (button) {
            button.setDisabled(true);
        }

        // Disable first upload field to prevent from selecting files
        var uploadFields = this.findByType("html5fileuploadfield");
        uploadFields[0].setDisabled(true);

        // Perform file upload
        for (var i = 0; i < this.queue.length; i++) {
            this.html5UploadFile(this.queue[i]);
        }
    },

    /**
     * Executes when file upload failed
     * @param {Object} item Queue item
     * @param {String} message Failure message
     */
    onFileUploadError: function(item, message) {
        item.uploadField.handleUploadProgress(item.file, 0, item.fileSize, message);

        if (this.uploadFailed) {
            this.uploadFailed.push(item.fileName);
        }
    },

    /**
     * Executes on file upload load
     * @param {Object} item Queue item
     * @param {Object} request XHR request
     * @param {Event} e Event
     */
    onFileUploadLoad: function(item, request, e) {
        if (request.readyState === 4) {
            if (CQ.HTTP.isOkStatus(request.status)) {
                this.fireEvent("fileuploadok", item);
            } else {
                this.fireEvent("fileuploaderror", item, request.responseText);
            }

            // Remove queue item
            this.queue.splice(this.getQueueIndex(item.fileName), 1);

            // Check queue length
            if (this.queue.length == 0) {
                this.fireEvent("queueprocessed");
            }
        }
    },
    
    /**
     * Executes when file was successfully uploaded
     * @param {Object} item Queue item
     */
    onFileUploadOk: function(item) {
        // Fill progress bar
        item.uploadField.handleUploadComplete();

        // Remove it
        window.setTimeout(function() {
            var el = item.uploadField.progressBar.getEl().parent("div[class*=x-form-item]");
            el.fadeOut({
                easing: "easeOut",
                endOpacity: 0,
                duration: 0,
                concurrent: false,
                remove: true
            });
        }, 100);
    },

    /**
     * Executes when more bytes have been uploaded for provided file
     * @param {Object} item Queue item
     * @param {Object} e Progress information
     */
    onFileUploadProgress: function(item, e) {
        // Update progress bar
        item.uploadField.handleUploadProgress(item.file, e.loaded, e.total);
    },

    onQueueChanged: function() {
        CQ.Ext.getCmp(this.okButtonConfig.id).setDisabled(this.queue.length == 0);
    },

    onQueueProcessed: function() {
        if (this.uploadFailed.length > 0) {
            this.failure();
        } else {
            this.success();
        }
    },

    ok: function(button) {
        var config = {};

        if (this.responseScope) {
            config.scope = this.responseScope;
            config.success = this.success ? this.success : this.responseScope.success;
            config.failure = this.failure ? this.failure : this.responseScope.failure;
        } else {
            config.scope = this;
            if (this.success) {
                config.success = this.success;
            }
            if (this.failure) {
                config.failure = this.failure;
            }
        }

        if (this.form.isValid()) {
            if (this.fireEvent("beforesubmit", this) === false) {
                return false;
            }

            var siteAdmin = CQ.Ext.getCmp(window.CQ_SiteAdmin_id);
            if (siteAdmin) {
                siteAdmin.mask();
            }

            if (this.useHTML5) {
                this.html5UploadFiles();

            } else {
                this.form.items.each(function(field) {
                    // Clear fields with emptyText so emptyText is not submitted
                    if (field.emptyText && field.el.dom.value == field.emptyText) {
                        field.setRawValue("");
                    }
                });

                var action = new CQ.form.UploadSubmitAction(this.form, config);
                this.form.doAction(action);

                var uploadFields = this.findByType("html5fileuploadfield");
                var maskMsg = (uploadFields.length == 2) ?
                    CQ.I18n.getMessage("Uploading file...") :
                    CQ.I18n.getMessage("Uploading files...");
                this.mask = new CQ.Ext.LoadMask(this.body, {
                    msg: maskMsg
                });
                this.mask.show();
            }

        } else {
            var invalids = [];
            this.form.items.each(function(f) {
                if (!f.validate()) {
                    invalids.push(f);
                }
            });
            var title = invalids.length == 1 ?
                CQ.I18n.getMessage('Invalid Name') :
                CQ.I18n.getMessage('Invalid Names');
            var msg = invalids.length == 1 ?
                CQ.I18n.getMessage("There is a file with an invalid name. Please verify the marked field.") :
                CQ.I18n.getMessage("There are files with invalid names. Please verify the marked fields.");
            CQ.Ext.Msg.show({
                title: title,
                msg: msg,
                buttons: CQ.Ext.Msg.OK,
                icon: CQ.Ext.Msg.ERROR
            });
        }
    },

    /**
     * Returns the config for the default OK button.
     * overrides CQ.Dialog#getOkConfig
     * @private
     * @return {Object} The config for the default OK button
     */
    getOkConfig: function() {
        if (!this.okButtonConfig) {
            this.okButtonConfig = {
                id: CQ.Ext.id(),
                text: this.okText,
                cls: "cq-btn-ok",
                disabled: true,
                handler: this.ok
            };
        }
        return this.okButtonConfig;
    },

    // overrides CQ.Dialog#getCancelConfig
    getCancelConfig: function() {
        return {
            text: this.cancelText,
            cls: "cq-btn-cancel",
            handler: function(button) {
                // scope: "this" is a dialog instance
                if (this.mask) {
                    this.mask.hide();
                }
                this.hide();
                this.canceled = true;
                for (var i = 0; i < this.xhrList.length; i++) {
                    this.xhrList[i].abort();
                }                
            }
        };
    }

});

function getMetadataProperties(path) {
	var title = null;
	var description = null;
	$.getJSON(path + "/jcr:content/metadata.json", function (data) {
		$.each( data, function( key, val ) {
			if (key == "dc:title") {
				title = val;
			}
			if (key == "dc:description") {
				description = val;
			}
		});
		createMetadataNode(path, title, description);
	});
}

function createMetadataNode(path, title, description) {
	CQ.HTTP.post(path + '_temp', 
	function(options, success, response) {
		if (!success) {
			console.log('Could not save old metadata for the asset');
		}
	},
	{
		"jcr:primaryType" : "nt:unstructured",
		"dc:title" : title, 
		"dc:description" : description
	});
}

CQ.Ext.reg('html5uploaddialog', CQ.html5.UploadDialog);
