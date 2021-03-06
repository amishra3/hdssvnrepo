/*
 * Copyright 1997-2008 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @class CQ.dam.AssetEditor
 * @extends CQ.Ext.Panel
 * The Asset Editor used in DAM Admin.
 * @constructor
 * Creates a new Asset Editor.
 * @param {Object} config The config object
 */
CQ.dam.AssetEditor = CQ.Ext.extend(CQ.Ext.Panel, {

    /**
     * @cfg {String} contentPath
     * The path of the metadata content relative to the asset's path. The content of the metadata form
     * will be read from and submitted to the content path.
     * Defaults to "/jcr:content/metadata".
     */

    /**
     * @cfg {Object} infoPanel
     * The config for the panel wrapping the thumbnail and general information.
     * See {@link CQ.Ext.Panel} for config options.
     */

    /**
     * @cfg {Number} thumbnailWidth
     * The width of the thumbnail in {@link #infoPanel}. For a default CQ 5.x installation
     * the possible values are 48 (48), 140 (100) and 319 (319) - in brackets the
     * according values for {@link #thumbnailHeight}. Defaults to 319.
     */

    /**
     * @cfg {Number} thumbnailHeight
     * The height of the thumbnail in {@link #infoPanel}. For a default CQ 5.x installation
     * the possible values are 48 (48), 100 (140) and 319 (319) - in brackets the
     * according values for {@link #thumbnailWidth}. Defaults to 319.
     */

    /**
     * @cfg {String} thumbnailServlet
     * The name of the servlet used for the request selector. Defaults to "thumb".
     */

    /**
     * @cfg {String} thumbnailExtension
     * The extension of the thumbnail. Defaults to "png".
     */

    /**
     * @cfg {Number} renditionsMaxSize
     * The maximum file size to render thumbnails in the renditions tab. This is mainly for
     * the display of the original rendition. To avoid long loading times an icon is displayed instead
     * of the file if the limit is exceeded.
     * Defaults to "300000" (300 KB).
     */

    /**
     * @cfg {Object} tabPanel
     * The config for the tab panel that contains renditions, versions and references.
     * See {@link CQ.Ext.TabPanel} for config options.
     */

    /**
     * @cfg {Object} formPanel
     * The config for the form panel located in the center. See {@link CQ.Ext.form.FormPanel}
     * for config options.
     */

    /**
     * @cfg {Object/Array} formItems
     * The {@link CQ.Ext.form.FormPanel#items items} of the {@link #formPanel}.
     */

     /**
     * @cfg {Boolean} readOnly
     * If true the editor opens in read only mode. Defaults to false.
     */


    /**
     * @cfg {Object/Array} bbar
     * <p>The {@link CQ.Ext.Panel#bbar bottom toolbar} of the {@link #formPanel}.</p>
     * <p>String values may include {@link #AssetEditor.SAVE} and {@link #AssetEditor.RESET}.</p>
     * <p>The default bbar consists of {@link CQ.Ext.Toolbar.Fill}, {@link #AssetEditor.SAVE} and
     *  {@link #AssetEditor.RESET}.</p>
     * <pre><code>

bbar: [
    CQ.dam.AssetEditor.EDIT_IMAGE,
    "-",
    {
        text: "Custom Button",
        handler: ...
    },
    "->",
    CQ.dam.AssetEditor.SAVE,
    CQ.dam.AssetEditor.RESET,
]
       </code></pre>
     */

    /**
     * @cfg {Array} bbarWest
     * <p>The {@link CQ.Ext.Panel#bbar bottom toolbar} of the {@link #infoPanel}.</p>
     * <p>String values may include {@link #AssetEditor.EDIT_IMAGE} and {@link #AssetEditor.REFRESH_INFO}.</p>
     * <p>The default bbar consists of {@link #AssetEditor.REFRESH_INFO}, {@link CQ.Ext.Toolbar.Fill} and
     * {@link #AssetEditor.EDIT_IMAGE}.</p>
     * <pre><code>

bbarWest: [
     CQ.dam.AssetEditor.REFRESH_INFO
     "->",
     {
         text: "Custom Button",
         handler: ...
     },
     "-",
    CQ.dam.AssetEditor.EDIT_IMAGE
]
       </code></pre>
     */

    /**
     * @cfg {Array/String} tabs
     * An array of {@link CQ.Ext.Panel Panel} configs, an array of strings,
     * or a single string. Strings may be {@link #AssetEditor.SUBASSETS}, {@link #AssetEditor.RENDITIONS},
     * {@link #AssetEditor.VERSIONS} or {@link #AssetEditor.REFERENCES}.
     * <pre><code>
tabs: CQ.dam.AssetEditor.SUBASSETS

tabs: [
     CQ.dam.AssetEditor.RENDITIONS,
     {
         xtype: "panel",
         html: "Custom Panel"
     }
 ]
       </code></pre>
     */
    tabs: [],

    /**
     * @cfg {Number} renditionsInitialTimeout
     * The initial time in ms to wait to check if new renditions have been
     * created after e.g. an image has been edited. Defaults to 20000 (20 Sek.)
     * @since 5.4
     */
    renditionsInitialTimeout: 20000,

    /**
     * @cfg {Number} renditionsTimeout
     * The interval time in ms to check for new renditions after the initial
     * check. Defaults to 10000 (10 Sek.)
     * @since 5.4
     */
    renditionsTimeout: 10000,

    /**
     * @cfg {Boolean} denyRenditionModifications
     * True to hide the buttons "Upload Rendition" and "Delete Rendition" on
     * the renditions tab (defaults to false).
     * @since 5.4
     */
    denyRenditionModifications: false,

    /**
     * @cfg {Boolean} denyThumbnailUpload
     * True to hide the button "Overwrite Thumbnails" on the renditions tab (defaults to false).
     * @since 5.4
     */
    denyThumbnailUpload: false,

    /**
     * @cfg {Boolean} scene7
     * True to show the link Upload to Scene7 in the information panel (defaults to false).
     * @since 5.5
     */
    scene7: false,
    
    metadata:{},

    /**
     * @cfg {Function} compareRenditions
     * A compare function for renditions on the renditions tab. The default sort order
     * is as follows.
     * <ul>
     * <li>thumbnails ordered by size (smallest first)</li>
     * <li>web rendition</li>
     * <li>other (custom) renditions</li>
     * <li>original</li>
     * </ul>
     * The function is passed the following parameters:
     * <div class="mdetail-params"><ul>
     * <li><b>a</b> : Element a<div class="sub-desc">An array containing the rendition's
     * name, path, image path and extension for the link.</div></li>
     * <li><b>b</b> : Element b<div class="sub-desc">see above</div></li>
     * </ul></div>
     * @since 5.5
     */

    /**
     * @cfg {Object} renditionsLinkExtensions
     * A look up table to build the link to open a rendition. If an element of the name
     * of a rendition exists the extension will be added to the path of the rendition.
     * Default:
     * <pre><code>
{
    "page": ".html"
}
       </code></pre>
     * @since 5.5
     */

    /**
     * @property parentPath
     * The path of the parent of the asset (the folder).
     */

    /**
     * Loads the content from the specified path or {@link CQ.Ext.data.Store Store}.
     * @param {String/CQ.Ext.data.Store} content The path or the store
     * @private
     */
    loadContent: function(content) {
        var content_url =  CQ.HTTP.externalize(this.pathEncoded + '/jcr:content') + CQ.HTTP.EXTENSION_JSON;
        this.content = content;
        var store = new CQ.data.SlingStore({"url": content_url});
        if (store) {
            store.load({
                callback: this.getMetadataRecords,
                scope: this
            });
        }
        else {
            this.hideLoadMask();
        }
        window.addEventListener("beforeunload", function(e) {
            var dirty = false;
            for (var path in window.assetEditor) {
                if (dirty) break;
                var editor = window.assetEditor[path];
                var meta = editor.metadata;
                var contentRecs = editor.contentRecs[0].json;

                editor.form.items.each(function(field) {
                      var fieldName;
                      var metafieldValue;
                      if (field.name.indexOf("@TypeHint") > -1 || field.name.indexOf("@Patch") > -1) return true;
                      if (field.name.indexOf("../") == 0) {
                          fieldName = field.name.substring(3);
                          metafieldValue = contentRecs[fieldName];
                      }
                      else
                      if (field.name.indexOf("./") == 0) {
                           fieldName =  field.name.substring(2);
                           metafieldValue = meta[fieldName];
                      }
                      else return true;

                      
                      if (metafieldValue == undefined) {
                          if (field.getValue().toString() == "" || (fieldName == "cq:tags@Patch" && field.getValue().toString() == "true"))
                              return true;
                          else {
                              dirty = true;
                              return true;
                          }

                      }

                      if (field.getValue() instanceof Date) {
                            var date = new Date(metafieldValue);
                            var oldTime = parseInt(date.getTime()/60000);
                            var newTime = parseInt(field.getValue().getTime()/60000);
                            if (oldTime != newTime) {
                              dirty = true;
                              return false;
                            }
                      } else if (field.ownerCt.name == "./cq:tags") {
                          if (field.ownerCt.getValue().toString() != metafieldValue.toString()) {
                              dirty = true;
                              return false;
                             }
                      } else
                      if (field.getValue().toString() != metafieldValue.toString()) {
                          dirty = true;
                          return false;
                      }
            });
            }

            if (dirty)
            {  e.returnValue = "You have Unsaved Changes in one or more of the assets.";
               return "You have Unsaved Changes in one or more of the assets.";
            }
            
        });
    },
    
    /**
     * Process the content records & loads the metadata fields from the specified path or {@link CQ.Ext.data.Store Store}.
     * @param {CQ.Ext.data.Record[]} recs The records
     * @param {Object} opts (optional) The options, such as the scope
     * @param {Boolean} success True if retrieval of records was
     *        successful
     * @private
     */
    getMetadataRecords : function(recs, opts, success) {
        var content = this.content;
        var rec;
        if (success) {
            rec = recs[0];
        }

        var store;
        if (!content) content = this.pathEncoded + this.contentPath;
        if (typeof(content) == "string") {
            var url = CQ.HTTP.externalize(content);
            store = new CQ.data.SlingStore({"url": url + CQ.HTTP.EXTENSION_JSON});
            this.contentRecs = recs;
        } else if (content instanceof CQ.Ext.data.Store) {
            store = content;
        }
        if (store) {
            store.load({
                callback: this.processRecords,
                scope: this
            });
        }
        else {
            this.hideLoadMask();
        }
        
    },

    /**
     * Processes the specified records. This method should only be used as
     * a callback by the component's store when loading content.
     * @param {CQ.Ext.data.Record[]} recs The records
     * @param {Object} opts (optional) The options, such as the scope
     * @param {Boolean} success True if retrieval of records was
     *        successful
     * @private
     */
    processRecords: function(recs, opts, success) {
        var rec;
        if (success) {
            rec = recs[0];
        } else {
            CQ.Log.warn("CQ.dam.AssetEditor#processRecords: retrieval of records unsuccessful");
            rec = new CQ.data.SlingRecord();
            rec.data = {};
        }
        this.metadata = rec.json;
        CQ.Log.debug("CQ.dam.AssetEditor#processRecords: processing records for fields");
        var fields = CQ.Util.findFormFields(this.formPanel);
        for (var name in fields) {
            for (var i = 0; i < fields[name].length; i++) {
                try {
                    if (fields[name][i].processPath) {
                        CQ.Log.debug("CQ.dam.AssetEditor#processRecords: calling processPath of field '{0}'", [name]);
                        fields[name][i].processPath(this.path);
                    }
                    if (name.indexOf('../')==0){
                        if (!fields[name][i].initialConfig.ignoreData) {
                            CQ.Log.debug("CQ.dam.AssetEditor#processRecords: calling processRecord of field '{0}'", [name]);
                            fields[name][i].processParentRecord(this.contentRecs[0], this.path);
                        }
                    }
                    else {
                        if (!fields[name][i].initialConfig.ignoreData) {
                            CQ.Log.debug("CQ.dam.AssetEditor#processRecords: calling processRecord of field '{0}'", [name]);
                            fields[name][i].processRecord(rec, this.path);
                        }
                    }
                }
                catch (e) {
                    CQ.Log.debug("CQ.dam.AssetEditor#processRecords: {0}", e.message);
                }
            }
        }
        this.hideLoadMask();
        this.fireEvent("loadcontent", this, recs, opts, success);
    },

    /**
     * <p>Adds multiple name/value pairs as hidden fields to the {@link #formPanel}.</p>
     * Format of params:
     * <pre><code>
{
    "hidden1Name": "hidden1Value",
    "hidden2Name": "hidden2Value"
}
       </code></pre>
     * @param {Object} params The names and values for the hidden fields
     */
    addHidden: function(params) {
        for (var name in params) {
            var hidden = CQ.Util.build({
                "xtype": "hidden",
                "name": name,
                "value": params[name],
                "ignoreData": true
            });
            this.formPanel.add(hidden);
        }
        this.formPanel.doLayout();
    },

    /**
     * @private
     */
    ok: function() {
        
        var ae = this;
        var config = {
            "success": function() {
                // timeout required for modified date in info
                window.setTimeout(function() {
                    ae.refreshGrid();
                    delete ae.info;
                    ae.refreshInfo();
                    ae.loadContent();
                }, 600);
            },
            "failure": function(panel, action) {
                ae.hideLoadMask();
                ae.notify(action.result ? action.result.Message : "");
            }
        };

        if (this.form.isValid()) {
        	// preparesubmit is registered on beforeaction.
            if (this.form.fireEvent("beforeaction", this) === false){
                return false;
            }
            this.showSaveMask();
            this.form.items.each(function(field) {
                // clear fields with emptyText so emptyText is not submitted
                if (field.emptyText && field.el.dom.value == field.emptyText) {
                    field.setRawValue("");
                }
            });
            var action = new CQ.form.SlingSubmitAction(this.form, config);
            this.form.doAction(action);
        } else {
            CQ.Ext.Msg.show({
                title:CQ.I18n.getMessage('Validation Failed'),
                msg: CQ.I18n.getMessage('Verify the values of the marked fields.'),
                buttons: CQ.Ext.Msg.OK,
                icon: CQ.Ext.Msg.ERROR
            });
        }
    },

    /**
     * Returns an array of configs for the buttons
     * @type {Object[]}
     * @private
     */
    getButtonsConfig: function(buttons) {
        var b = [];
        if (typeof buttons == "string") {
            // buttons: CQ.dam.AssetEditor.SAVE  =>  buttons: [ CQ.dam.AssetEditor.SAVE ]
            buttons = [buttons];
        }
        for (var i=0; i < buttons.length; i++) {
            if (typeof buttons[i] == "string") {

                // save button
                if (buttons[i] == CQ.dam.AssetEditor.SAVE) {
                    var saveButton = new CQ.Ext.Button({
                        "text": CQ.I18n.getMessage("Save"),
                        "disabled": this.readOnly,
                        "cls": "cq-btn-save",
                        "scope": this,
                        "minWidth": CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,
                        "handler": function(button) {
                            var validForm = CQ.dam.AssetEditor.validateTags(this.form, this.pathEncoded);
                            if(validForm) {
                                this.ok();
                            } 
                        }
                    });
                    b.push(saveButton);
                }

                // reset button
                else if (buttons[i] == CQ.dam.AssetEditor.RESET) {
                    var resetButton = new CQ.Ext.Button({
                        "text": CQ.I18n.getMessage("Reset"),
                        "disabled": this.readOnly,
                        "cls": "cq-btn-reset",
                        "scope": this,
                        "minWidth": CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,
                        "handler": function(button) {
                            this.loadMask = new CQ.Ext.LoadMask(this.formPanel.body);
                            this.loadMask.show();
                            this.loadContent();
                        }
                    });
                    b.push(resetButton);
                }

                // refresh info panel button
                else if (buttons[i] == CQ.dam.AssetEditor.REFRESH_INFO) {
                    var refreshButton = new CQ.Ext.Button({
                        "tooltip": CQ.I18n.getMessage("Refresh"),
                        "tooltipType": "title",
                        "iconCls":"cq-siteadmin-refresh",
                        "scope": this,
                        "handler": function(button) {
                            var now = new Date().getTime();
                            var m = new CQ.Ext.LoadMask(this.infoPanel.body);
                            m.show();
                            delete this.info;
                            this.refreshInfo();
                            this.refreshThumbnail();
                            window.setTimeout(function(){m.hide();}, this.getTimeoutTime(now));
                        }
                    });
                    b.push(refreshButton);
              }

                // edit image button
                else if (buttons[i] == CQ.dam.AssetEditor.EDIT_IMAGE) {
                    if (this.isImage()) {
                        var editButton = new CQ.Ext.Button({
                            "text": CQ.I18n.getMessage("Edit..."),
                            "disabled": this.readOnly,
                            "cls": "cq-btn-edit",
                            "scope": this,
                            "minWidth": CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,
                            "handler": function() {
                                var config = CQ.WCM.getDialogConfig({
                                    "name": "./original",
                                    "xtype": "html5smartimage",
                                    "cropParameter": "./crop",
                                    "rotateParameter": "./rotate",
                                    "disableFlush": true
                                });

                                var ae = this;
                                config = CQ.Util.applyDefaults(config, {
                                    "title": CQ.I18n.getMessage("Image Editor"),
                                    "y": 50,
                                    "width": 480,
                                    "formUrl": this.pathEncoded + ".assetimage.html",
                                    "responseScope": this,
                                    "success": function() {
                                        this.refreshOriginal();
                                    },
                                    "failure": function(form, action) {
                                    	var msg = CQ.I18n.get("Error while creating new rendition for asset {0}",this.path);
                                        this.notify(msg);
                                    }
                                });
                                var dialog = CQ.Util.build(config, true);
                                dialog.on("beforesubmit", function() {
                                    ae.showSaveMask();
                                });
                                dialog.loadContent(this.pathEncoded + "/jcr:content/renditions");
                                dialog.show();
                            }
                        });
                        b.push(editButton);
                    }
                }
                else {
                    b.push(buttons[i]);
                }
            }
            else {
                if(buttons[i]) {
                    if (typeof buttons[i].handler == "string") {
                        buttons[i].handler = eval(buttons[i].handler);
                    }

                    b.push(CQ.Util.applyDefaults(buttons[i], {
                        "minWidth": CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,
                        "scope": this
                    }));
                }
            }
        }
        return b;
    },

    /**
     * Returns the HTML for the thumbnail
     * @param {Boolean} force true to force to request the image from the server
     * @param {Object} config The config object (optional)
     * @private
     */
    getThumbnailHtml: function(force, config) {
        var c = config ? config : this;
        var r = this.getInfo("renditions");
        var ck;
        try {
            ck = r["cq5dam.thumbnail." + c.thumbnailHeight + "." + c.thumbnailWidth + ".png"].ck;
        }
        catch(e) {
            ck = new Date().getTime();
        }
        var url = CQ.HTTP.externalize(this.pathEncoded) + "." + c.thumbnailServlet + "." +
                  c.thumbnailHeight + "." + c.thumbnailWidth + "." + ck + "." + c.thumbnailExtension;
        var xpath = CQ.HTTP.externalize(CQ.shared.XSS.getXSSValue(CQ.HTTP.encodePath(c.path)));
        return '<a href="' + xpath + '" target="_blank" title="' + xpath + '"><img src="' + CQ.shared.XSS.getXSSValue(url) + '"></a>';
    },

    /**
     * Returns if the asset is of a GIF, PNG or JPEG image.
     * @param {String} name
     * @private
     */
    isImage: function(name) {
        name = name ? name.toLowerCase() : this.fileName.toLowerCase();
        if (name.indexOf(".") == -1) return false; // no extension
        var is = false;
        var ext = ["jpg", "gif", "png", "jpeg"];
        for (var i = 0; i < ext.length; i++) {
            if (name.lastIndexOf("." + ext[i]) == name.length - ext[i].length - 1) {
                is = true;
                break;
            }
        }
        return is;
    },

    /**
     * Returns info of the specified name.
     * @param {String} name
     * @param {boolean} force True to request the info from the server
     * @private
     */
    getInfo: function(name, force) {
        if (force || !this.info) {
            var url = this.pathEncoded + ".4.json";
            url = CQ.HTTP.noCaching(url);
            var info = CQ.HTTP.eval(url);
            var renditions;
            if (info.length) {
                info = CQ.HTTP.eval(CQ.HTTP.noCaching(this.pathEncoded + ".2.json"));
                renditions = CQ.HTTP.eval(CQ.HTTP.noCaching(this.pathEncoded + "/jcr:content/renditions.2.json"));
            } else {
                renditions = info["jcr:content"]["renditions"];
            }

            // missing: file size: not available in info

            var meta = info["jcr:content"]["metadata"];

            var mod = "";
            try {
                mod = new Date(info["jcr:content"]["jcr:lastModified"]);
                mod = CQ.wcm.SiteAdmin.formatDate(mod);
            }
            catch (e) {}


            var dim = "";
            if (meta && meta["tiff:ImageWidth"] && meta["tiff:ImageLength"]) {
                dim = meta["tiff:ImageWidth"] + " &times; " + meta["tiff:ImageLength"];
            }

            for (var rName in renditions) {
                try {
                    // use mod date of the thumbnails as cache killer
                    var m = renditions[rName]["jcr:content"]["jcr:lastModified"];
                    renditions[rName].ck = new Date(m).getTime();
                }
                catch (e) {
                    renditions[rName].ck = new Date().getTime();
                }
            }

            this.info = {
                "title": ( meta && meta["dc:title"] ) ? meta["dc:title"] : "",
                "lastModified": mod,
                "dimensions": dim,
                "metadata": meta,
                "subassets": info.subassets,
                "renditions": renditions
            };
        }
        return this.info[name];
    },

    html5UploadFiles: function(files,path) {
           var uploader = {
            current:0,
            uploaded:0,
            totalSize: 0,
            records: [],

            // Bug #33540
            // Files provided via drag&drop can be folders although they are not
            // supported for uploads. Unfortunately there is no deterministic way
            // to detect whether a file object represents a folder or not. Thus we
            // use information from size (0 or very small), type (empty) and name
            // (no extension) in a heuristical approach.
            isFile: function(file) {
                // do not upload empty files or folders
                if (file.size == 0) {
                    return false;
                }
                // small files with no type and no extension are considered folders
                if (file.size < 512 && file.type == "" && file.name.indexOf(".") < 0) {
                    return false;
                }
                return true;
            },

            upload: function(files) {
                this.records = [];
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (this.isFile(file)) {
                        // ignore folders
                        this.totalSize+=file.fileSize;
                        this.records.push({file:file});
                    }
                    else {
                        CQ.Notification.notify(file.name,
                                CQ.I18n.getMessage("It is not possible to upload folders"));
                    }
                }
                if (this.records.length == 0) {
                    return;
                }
                for (var i = 0; i < this.records.length; i++) {
                var req = new XMLHttpRequest();
 
                this.xhr = req;
                var file = this.records[i]["file"];
                                // check for form data
                var renditionPath = path + "/jcr:content/renditions"
                if (window.FormData) {
                    var f = new FormData();
                    f.append(file.name, file);
                    
                    this.xhr.open("POST", renditionPath, true);
                    this.xhr.send(f);
                } else {
                    this.xhr.open("PUT", encodeURI(renditionPath), true);
                    this.xhr.send(file);
                }
               }
               
            }

        };
        return uploader.upload(files);
    },
    /**
     * Returns an array of configs for the tabs
     * @type {Object[]}
     * @private
     */
    getTabsConfig: function(tabs) {
        var t = [];
        if (typeof tabs == "string") {
            // tabs: CQ.dam.AssetEditor.SUBASSETS  =>  tabs: [ CQ.dam.AssetEditor.SUBASSETS ]
            tabs = [tabs];
        }

        for (var i=0; i < tabs.length; i++) {
            if (typeof tabs[i] == "string") {

                // sub assets
                if (tabs[i] == CQ.dam.AssetEditor.SUBASSETS) {
                    var panel = new CQ.Ext.Panel({
                        "autoScroll": true,
                        "title": CQ.I18n.getMessage("Sub Assets"),
                        "cls": "cq-asseteditor-subassets",
                        "footer": true,
                        "bbar": []
                    });

                    var info = this.getInfo("subassets");
                    if (!info) {
                        // no sub assets
                        continue;
                    }
                    // sort sub assets (sorting is not guaranteed)
                    // xy-1.pdf, xy-2.pdf ...
                    var subs = [];
                    for (var name in info) {
                        if (name.indexOf("jcr:") < 0) {
                            info[name].name = name;
                            subs.push(info[name]);
                        }
                    }
                    subs.sort(function(a, b) {
                        if (a.name.length == b.name.length) {
                            return a.name < b.name ? -1 : 1;
                        }
                        else {
                            return a.name.length - b.name.length;
                        }
                    });

                    for (var j = 0; j < subs.length; j++) {
                        var saPath = CQ.HTTP.externalize(this.path + "/subassets/" + subs[j].name);
                        panel.add({
                            "xtype": "static",
                            "html": '<div class="cq-asseteditor-substab-item" onclick="CQ.wcm.DamAdmin.openAsset(\'' + saPath + '\');">' +
                                        '<div class="cq-asseteditor-substab-thumbnail">' +
                                            '<img src="' + CQ.HTTP.encodePath(saPath) + '.thumb.100.140.png"><br>' +
                                         '</div>' +
                                         '&ndash; ' + (j + 1) + ' &ndash;' +
                                     '</div>'
                        });
                    }
                    t.push(panel);
                }

                // renditions
                else if (tabs[i] == CQ.dam.AssetEditor.RENDITIONS) {
                    this.renditionsStore = new CQ.Ext.data.SimpleStore({
                        autoLoad: false,
                        idProperty: "name",
                        fields: ["name", "jcrTitle", "path", "imgUrl", "extension"]
                    });
    
                    this.renditionsDataView = new CQ.Ext.DataView({
                        "multiSelect": false,
                        "singleSelect": true,
                        "enableDragDrop":true,
                        "emptyText": CQ.I18n.getMessage("No Renditions Available"),
                        "store": this.renditionsStore,
                        "overClass": "x-view-over",
                        "admin": this,
                        "itemSelector": ".cq-asseteditor-renditions-item",
                        "assetEditor": this,
                        "tpl":new CQ.Ext.XTemplate(
                            '<tpl for=".">' +
                                '<div class="cq-asseteditor-renditions-item">' +
                                     '<div class="cq-asseteditor-renditionstab-thumbnail" style="background-image:url({imgUrl});"></div>' +
                                     '{name}' +
									 '<tpl if="jcrTitle != undefined">' +
                                     '<div style="text-align: center;font-size: 12px;">{jcrTitle}</div>' +
                                     '</tpl>' +
                                 '</div>' +
                            '</tpl>'
                         ),
                        "listeners": {
                            "render": function(dataview) {
                            ////////////////////////////////////////////////////
                            // html5 drag drop from filesystem demohack

                            var view = document.getElementById(dataview.id);
                            var addEvent = view.addEventListener;
                            if (!addEvent) {
                                addEvent = view.attachEvent;
                            }
                                if (view.addEventListener) {
                                try {
                                    view.addEventListener("dragover", function(e) {
                                        // todo: filter out non dam files
                                        dataview.isDragOver = true;
                                        if (!dataview.hasDragMask) {
                                              dataview.el.mask(CQ.I18n.getMessage("Drop file(s) to add renditions"), "x-mask-loading cq-mask-drop-ok cq-asseteditor-renditions-drop");
                                              dataview.dropDenied = false;
                                              dataview.hasDragMask = true; // required to avoid flickering in Safari
                                              }
                                        
                                        if (e.stopPropagation) e.stopPropagation();
                                        if (e.preventDefault) e.preventDefault();
                                        return false;
                                    }, false);

                                    view.addEventListener("dragleave", function(e) {
                                        if (e.stopPropagation) e.stopPropagation();
                                        if (e.preventDefault) e.preventDefault();

                                        dataview.isDragOver = false;
                                        window.setTimeout(function() {
                                            // timeout is required - otherwise drop event is not triggered
                                            if (!dataview.isDragOver) {
                                                dataview.el.unmask();
                                                dataview.hasDragMask = false;
                                            }
                                        }, 1);
                                        return false;
                                    }, false);

                                    view.addEventListener("drop", function(e) {
                                        if (e.stopPropagation) e.stopPropagation();
                                        if (e.preventDefault) e.preventDefault();

                                        // required in Safari to unmask (FF does it in the timeout in dragleave)
                                        dataview.el.unmask();
                                        dataview.hasDragMask = false;

                                        if (dataview.dropDenied) return false;

                                        var dt = e.dataTransfer;
                                        if (dt) {
                                            var files = dt.files;
                                            try {
                                            
                                            var ae = dataview.assetEditor;
                                               ae.html5UploadFiles(files,ae.path);
                                               ae.refreshRenditions();
                                            } catch (f) {
                                                //console.log(f);
                                            }
                                        }
                                        return false;
                                    }, false);
                                } catch(e){
                                    if (console) console.log(e);
                                }
                            }
                            },
                            "dblclick": function(dv, index) {
                                var rData = dv.getStore().getAt(index).data;
                                CQ.shared.Util.open(rData.path + rData.extension);
                            },
                            "selectionchange": function() {
                                if (!this.readOnly && this.assetEditor.deleteRenditionButton) {
                                    var sel = this.getSelectedRecords();
                                    if (sel.length > 0) {
                                        this.assetEditor.deleteRenditionButton.enable();
                                        CQ.Ext.getCmp("renditions-edit-title-btn").enable();
                                    }
                                    else {
                                        this.assetEditor.deleteRenditionButton.disable();
                                        CQ.Ext.getCmp("renditions-edit-title-btn").disable();
                                    }
                                }
                            }
                        }
                    });

                    this.renditionsPanel = new CQ.Ext.Panel({
                        "autoScroll": true,
                        "title": CQ.I18n.getMessage("Renditions"),
                        "cls": "cq-asseteditor-renditions",
                        "bbar": [
                            {
                                "xtype": "button",
                                "tooltip": CQ.I18n.getMessage("Refresh Renditions"),
                                "tooltipType": "title",
                                "iconCls":"cq-siteadmin-refresh",
                                "scope": this,
                                "handler": function() {
                                    var now = new Date().getTime();
                                    var m = new CQ.Ext.LoadMask(this.renditionsPanel.body);
                                    m.show();
                                    delete this.info;
                                    this.refreshRenditions();
                                    window.setTimeout(function(){m.hide();}, this.getTimeoutTime(now));
                                }
                            },
                            "->",
                            {
                                "xtype": "button",
                                "text": CQ.I18n.getMessage("Title..."),
                                "id": "renditions-edit-title-btn",  
                                "disabled": true,
                                "tooltip": CQ.I18n.getMessage("Edit the title of the rendition"),
                                "tooltipType": "title",
                                "scope": this,
                                "handler": function() {
                                    var sel = this.renditionsDataView.getSelectedRecords();
                                    var ae = this;
                                    var renditionName;
                                    if (sel[0]) {
                                        var path = sel[0].get("path");
                                        var pathWithoutCache = path.substring(0,path.lastIndexOf("?cq_ck"));
                                        renditionName = pathWithoutCache.substring(pathWithoutCache.lastIndexOf("/") +1);
                                    }
                                    var config = CQ.WCM.getDialogConfig({
                                        "xtype": "panel",
                                        "items": [
                                            {
                                                "name": "jcr:title",
                                                "xtype": "textfield",
                                                "value": sel[0] ? sel[0].get("jcrTitle") : "",
                                                "fieldLabel": CQ.I18n.getMessage("Rendition Title")
                                            },
											                                            {
                                                "name": "jcr:mixinTypes",
                                                "xtype": "hidden",
                                                "value": "mix:title"
                                            }
                                        ]
                                    });
                                    config = CQ.Util.applyDefaults(config, {
                                        "title": CQ.I18n.getMessage("Edit Rendition Title"),
                                        "formUrl": this.pathEncoded + "/jcr:content/renditions/" + renditionName,
                                        "success": function(form) {
                                            ae.refreshRenditions();    
                                            ae.ok();
                                        },
                                        "failure": function(form, action) {
                                        },
                                        "height": 200
                                });
                                var dialog = CQ.Util.build(config, true);
                                dialog.show();
                                }
                            }
                        ],
                        "items": this.renditionsDataView
                    });

                    if (!this.denyThumbnailUpload) {
                        this.renditionsPanel.getBottomToolbar().add({
                            "xtype": "button",
                            "text": CQ.I18n.getMessage("Thumbnail..."),
                            "disabled": this.readOnly,
                            "tooltip": CQ.I18n.getMessage("Overwrite the existing thumbnails"),
                            "tooltipType": "title",
                            "scope": this,
                            "handler": function() {
                                var config = CQ.WCM.getDialogConfig({
                                    "xtype": "panel",
                                    "items": {
                                        "name": "image",
                                        "xtype": "fileuploadfield",
                                        "fieldLabel": CQ.I18n.getMessage("Image File"),
                                        "fieldDescription": CQ.I18n.getMessage("Upload an image file to create new thumbnails. Existing thumbnails will be overwritten.")
                                    }
                                });
                                var ae = this;
                                config = CQ.Util.applyDefaults(config, {
                                    "title": CQ.I18n.getMessage("Overwrite Thumbnails"),
                                    "formUrl": this.pathEncoded + ".assetthumbnails.html",
                                    "success": function() {
                                        ae.refresh();
                                        ae.hideLoadMask();
                                    },
                                    "failure": function(form, action) {
                                        ae.notifyFromAction(action);
                                    },
                                    "height": 200,
                                    "fileUpload": true,
                                    "params": {
                                        "dimensions": "140,100/48,48/319,319"
                                    }
                                });
                                var dialog = CQ.Util.build(config, true);
                                dialog.on("beforesubmit", function() {
                                    ae.showSaveMask();
                                });
                                dialog.show();
                            }
                        });
                    }

                    if (!this.denyRenditionModifications) {
                        this.renditionsPanel.getBottomToolbar().add({
                            "xtype": "button",
                            "text": CQ.I18n.getMessage("Upload..."),
                            "disabled": this.readOnly,
                            "tooltip": CQ.I18n.getMessage("Add or overwrite a rendition"),
                            "tooltipType": "title",
                            "scope": this,
                            "handler": function() {
                                var sel = this.renditionsDataView.getSelectedRecords();
                                var config = CQ.WCM.getDialogConfig({
                                    "xtype": "panel",
                                    "items": [
                                        {
                                            "name": "./*",
                                            "xtype": "fileuploadfield",
                                            "fieldLabel": CQ.I18n.getMessage("File")
                                        },{
                                            "name": "name",
                                            "xtype": "textfield",
                                            "value": sel[0] ? sel[0].get("name") : "", // overwrite selected rendition
                                            "fieldLabel": CQ.I18n.getMessage("Rendition Name"),
                                            "fieldDescription": CQ.I18n.getMessage("Leave emtpy to use the file name.")
                                        }
                                    ]
                                });
                                var ae = this;
                                config = CQ.Util.applyDefaults(config, {
                                    "title": CQ.I18n.getMessage("Add Or Overwrite a Rendition"),
                                    "formUrl": this.pathEncoded + "/jcr:content/renditions",
                                    "success": function(form) {
                                        var name = form.findField("name").getValue();
                                        if (name == "original") {
                                            ae.refreshOriginal();
                                        }
                                        else if (name == "cq5dam.thumbnail." + ae.thumbnailHeight + "." + ae.thumbnailWidth + ".png") {
                                            delete ae.info;
                                            ae.refreshThumbnail();
                                            ae.refreshRenditions();
                                            ae.hideLoadMask();
                                        }
                                        else {
                                            delete ae.info;
                                            ae.refreshRenditions();
                                            ae.hideLoadMask();
                                        }
                                        if (name == "cq5dam.thumbnail.48.48.png") {
                                            // self-contained condition: possilbe in any case where name!="original"
                                            ae.refreshGrid();
                                        }
                                        ae.ok();
                                    },
                                    "failure": function(form, action) {
                                        ae.notifyFromAction(action);
                                    },
                                    "height": 200,
                                    "fileUpload": true
                                });
                                var dialog = CQ.Util.build(config, true);
                                dialog.on("beforesubmit", function() {
                                    ae.showSaveMask();
                                    var nameField = dialog.getField("name");
                                    var name = nameField.getValue();
                                    if (name == "original") {
                                        // auto-create a version
                                        CQ.HTTP.post(ae.pathEncoded + ".version.html", null, {
                                            "cmd": "createVersion",
                                            "label": "Before overwriting original, " + new Date().format("d-M-Y H.i")
                                        });
                                    }
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

                                    if (name) {
                                        for (var j = 0; j < whitespaces.length; j++) {
                                            name = name.replace(whitespaces[j]," ");
                                        }
                                        dialog.getField("./*").setName("./" + name);

                                    }
                                    else {
                                        var containsdbchars = false;
                                        var filePath = dialog.getField("./*").value;
                                        if(filePath.lastIndexOf("\\") + 1 < filePath.length) {
                                            var filename = filePath.substring(filePath.lastIndexOf("\\") + 1);
                                            for (var j = 0; j < whitespaces.length; j++) {
                                                if(filename.indexOf(whitespaces[j]) != -1) {
                                                    filename = filename.replace(whitespaces[j]," ");
                                                    containsdbchars = true;
                                                }
                                            }
                                            if(containsdbchars) {
                                                dialog.getField("./*").setName("./" + filename);
                                            }
                                        }
                                    }
                                    nameField.disable();
                                });
                                dialog.show();
                            }
                        },
                        this.deleteRenditionButton = new CQ.Ext.Button({
                            "text": CQ.I18n.getMessage("Delete"),
                            "disabled": true,
                            "tooltip": CQ.I18n.getMessage("Delete the selected rendition"),
                            "tooltipType": "title",
                            "scope": this,
                            "handler": function() {
                                var sel = this.renditionsDataView.getSelectedRecords();
                                if (sel[0] && sel[0].get("name") == "original") {
                                    CQ.Ext.Msg.alert("", CQ.I18n.getMessage("It is not possible to delete the selected rendition."));
                                    return;
                                }
                                CQ.Ext.Msg.show({
                                    "title": CQ.I18n.getMessage("Delete Rendition"),
                                    "msg": CQ.I18n.getMessage("Are you sure to delete the selected rendition?"),
                                    "buttons": CQ.Ext.Msg.YESNO,
                                    "icon": CQ.Ext.MessageBox.QUESTION,
                                    "fn": function(btnId) {
                                        if (btnId == "yes") {
                                            var m = new CQ.Ext.LoadMask(this.renditionsPanel.body);
                                            window.setTimeout(function(){m.show();}, 1);
                                            var sel = this.renditionsDataView.getSelectedRecords();
                                            CQ.HTTP.post(sel[0].get("path"), null, {
                                                "_charset_":"utf-8",
                                                ":operation": "delete"
                                            });
                                            delete this.info;
                                            this.refreshRenditions();
                                            this.ok();
                                            window.setTimeout(function(){m.hide();}, 100);
                                        }
                                    },
                                    "scope":this
                                });

                            }
                        }));
                    }

                    this.refreshRenditions();
                    t.push(this.renditionsPanel);
                }

                // versions
                else if (tabs[i] == CQ.dam.AssetEditor.VERSIONS) {

                    this.versionsStore = new CQ.Ext.data.Store({
                        "isLoaded": false,
                        "proxy": new CQ.Ext.data.HttpProxy({ "url":this.pathEncoded + ".version.json", "method":"GET" }),
                        "reader": new CQ.Ext.data.JsonReader(
                            { "totalProperty": "results", "root":"versions", "id":"id" },
                            [ "version", "id", "label", "comment", "name", "title", "created", "deleted", "renditionsPath" ]
                        ),
                        "baseParams": { "_charset_":"utf-8" }
                    });

                    this.versionsDataView = new CQ.Ext.DataView({
                        "multiSelect": false,
                        "singleSelect": true,
                        "emptyText": CQ.I18n.getMessage("No Versions Available"),
                        "store": this.versionsStore,
                        "overClass": "x-view-over",
                        "itemSelector": ".cq-asseteditor-versions-item",
                        "assetEditor": this,
                        "tpl":new CQ.Ext.XTemplate(
                            '<tpl for=".">',
                                '<div class="cq-asseteditor-versions-item">',
                                    '<table><tr>',
                                    '<tpl if="renditionsPath">',
                                        '<td><img class="cq-asseteditor-versions-thumbnail" src="{thumbnail}"></td>',
                                    '</tpl>',
                                    '<td>',
                                    '<span class="cq-asseteditor-versions-label">{label}</span><br>',
                                    '{[CQ.I18n.getMessage("Version")]} {version}<br>',
                                    '{created}<br>',
                                    '</td></tr></table>',
                                    '<tpl if="comment">',
                                        '<div class="cq-asseteditor-versions-comment">{comment}</div>',
                                    '</tpl>',
                                '</div>',
                            '</tpl>'
                        ),
                        "prepareData": function(data) {
                            data.created = CQ.wcm.SiteAdmin.formatDate(data.created);
                            data.thumbnail = CQ.HTTP.externalize(data.renditionsPath) + "/cq5dam.thumbnail.48.48.png";
                            return data;
                        },
                        "scope": this,
                        "listeners": {
                            "selectionchange": function() {
                                if (!this.assetEditor.readOnly) {
                                    this.assetEditor.restoreVersionButton.enable();
                                }
                            }
                        }
                    });

                    this.restoreVersionButton = new CQ.Ext.Button({
                        "disabled": true,
                        "tooltip": CQ.I18n.getMessage("Restore the selected version"),
                        "tooltipType": "title",
                        "text": CQ.I18n.getMessage("Restore"),
                        "scope": this,
                        "handler": function() {
                            var id;
                            try {
                                id = this.versionsDataView.getSelectedRecords()[0].data.id;
                            }
                            catch (e) {
                                return;
                            }
                            var ae = this;
                            // Providing fields to store version label and version comment while restoring
                            var config = CQ.WCM.getDialogConfig({
                                "xtype": "panel",
                                "items": [
                                    {
                                    "name": "label",
                                    "xtype":"textfield",
                                    "vtype": "name",
                                    "fieldLabel":CQ.I18n.getMessage("Version Label")
                                    },
                                    {
                                    "name": "comment",
                                    "xtype":"textarea",
                                    "fieldLabel":CQ.I18n.getMessage("Comment")
                                    }
                                 ]
                            });
                            config = CQ.Util.applyDefaults(config, {
                                "title": CQ.I18n.getMessage("Restore Version"),
                                "height": 250,
                                "formUrl": this.pathEncoded + ".version.html",
                                "success": function() {
                                    ae.versionsStore.reload();
                                    ae.hideLoadMask();
                                },
                                "failure": function(form, action) {
                                    ae.notifyFromAction(action);
                                },
                                "params": {
                                    "cmd":"restoreVersion",
                                    "id": id
                                }
                            });
                            var dialog = CQ.Util.build(config, true);
                            dialog.on("beforesubmit", function() {
                                ae.showLoadMask(CQ.I18n.getMessage("Restoring version..."));
                            });
                            dialog.show();
                        }
                    });

                    this.versionsPanel = new CQ.Ext.Panel({
                        "title": CQ.I18n.getMessage("Versions"),
                        "cls": "cq-asseteditor-versions",
                        "autoScroll": true,
                        "items": [
                            this.versionsDataView
                        ],
                        "bbar": [
                            {
                                "xtype": "button",
                                "tooltip": CQ.I18n.getMessage("Refresh Versions"),
                                "tooltipType": "title",
                                "iconCls":"cq-siteadmin-refresh",
                                "scope": this,
                                "handler": function() {
                                    var now = new Date().getTime();
                                    var m = new CQ.Ext.LoadMask(this.versionsPanel.body);
                                    m.show();
                                    this.versionsStore.load();
                                    window.setTimeout(function(){m.hide();}, this.getTimeoutTime(now));
                                }
                            },
                            "->",
                            {
                                "xtype": "button",
                                "tooltip": CQ.I18n.getMessage("Create a new version"),
                                "tooltipType": "title",
                                "text": CQ.I18n.getMessage("Create..."),
                                "disabled": this.readOnly,
                                "scope": this,
                                "handler": function() {
                                    var config = CQ.WCM.getDialogConfig({
                                        "xtype": "panel",
                                        "items": [
                                            {
                                            "name": "label",
                                            "xtype":"textfield",
                                            "vtype": "name",
                                            "fieldLabel":CQ.I18n.getMessage("Version Label")
                                            },
                                            {
                                            "name": "comment",
                                            "xtype":"textarea",
                                            "fieldLabel":CQ.I18n.getMessage("Comment")
                                            }
                                         ]
                                    });
                                    var ae = this;
                                    config = CQ.Util.applyDefaults(config, {
                                        "title": CQ.I18n.getMessage("Create Version"),
                                        "height": 250,
                                        "formUrl": this.pathEncoded + ".version.html",
                                        "success": function() {
                                            ae.versionsStore.reload();
                                            ae.hideLoadMask();
                                        },
                                        "failure": function(form, action) {
                                            ae.notifyFromAction(action);
                                        },
                                        "params": {
                                            "cmd":"createVersion"
                                        }
                                    });
                                    var dialog = CQ.Util.build(config, true);
                                    dialog.on("beforesubmit", function() {
                                        ae.showLoadMask(CQ.I18n.getMessage("Creating version..."));
                                    });
                                    dialog.show();
                                }
                            },
                            this.restoreVersionButton
                        ]
                    });
                    t.push(this.versionsPanel);
                }

                // references
                else if (tabs[i] == CQ.dam.AssetEditor.REFERENCES) {

                        var url = "/bin/wcm/references.json";
                        url += "?path=" + encodeURIComponent(this.path);
                        url += "&predicate=wcmcontent";
                        url = CQ.HTTP.noCaching(url);
                        this.referencesStore = new CQ.Ext.data.Store({
                            "isLoaded": false,
                            "proxy": new CQ.Ext.data.HttpProxy({ "url": url, "method":"GET" }),
                            "reader": new CQ.Ext.data.JsonReader(
                                { "totalProperty": "results", "root": "pages", "id": "path" },
                                [ "path", "title", "references", "isPage" ]
                            ),
                            "baseParams": { "_charset_":"utf-8" }
                        });

                         this.referencesDataView = new CQ.Ext.DataView({
                            "multiSelect": false,
                            "singleSelect": true,
                            "emptyText": CQ.I18n.getMessage("No References"),
                            "store": this.referencesStore,
                            "itemSelector": ".cq-asseteditor-references-item",
                            "tpl":new CQ.Ext.XTemplate(
                                '<tpl for=".">',
                                    '<div class="cq-asseteditor-references-item" onclick="window.pageOrAsset(\'{isPage}\', \'{path}\');">',
                                        '<span class="cq-asseteditor-references-title">{title} </span>',
                                        '<span class="cq-asseteditor-references-quantity">({quantity})</span><br>',
                                        '<span class="cq-asseteditor-references-path">{path}</span>',
                                    '</div>',
                                '</tpl>'
                            ),
                            "prepareData": function(data) {
                                data.quantity = data.references.length;
                                return data;
                            }
                        });

                       window.pageOrAsset = function(isPage, path) {
                           if(isPage === "true") {
                                CQ.wcm.SiteAdmin.openPage(path);
                           } else {
                                CQ.wcm.DamAdmin.openAsset(path);
                           }
                       },


                        this.referencesPanel = new CQ.Ext.Panel({
                            "title": CQ.I18n.getMessage("References"),
                            "cls": "cq-asseteditor-references",
                            "items": [this.referencesDataView],
                            "autoScroll": true,
                            "bbar": [
                                {
                                    "xtype": "button",
                                    "tooltip": CQ.I18n.getMessage("Refresh References"),
                                    "tooltipType": "title",
                                    "iconCls":"cq-siteadmin-refresh",
                                    "scope": this,
                                    "handler": function() {
                                        var now = new Date().getTime();
                                        var m = new CQ.Ext.LoadMask(this.referencesPanel.body);
                                        m.show();
                                        this.referencesStore.load();
                                        window.setTimeout(function(){m.hide();}, this.getTimeoutTime(now));
                                    }
                                }
                            ]
                        });
                        t.push(this.referencesPanel);
                    }
                else if (tabs[i] == CQ.dam.AssetEditor.UPSTREAM_REFERENCES) {

                    var url = "/libs/wcm/core/content/reference.json";
                    url += "?path=" + encodeURIComponent(this.path);
                    url = CQ.HTTP.noCaching(url);
                    this.upstreamReferencesStore = new CQ.Ext.data.Store({
                        "isLoaded": false,
                        "proxy": new CQ.Ext.data.HttpProxy({ "url": url, "method":"GET" }),
                        "reader": new CQ.Ext.data.JsonReader(
                            { "totalProperty": "results", "root": "assets", "id": "path" },
                            [ "path", "name", "references", "isPage" ]
                        ),
                        "baseParams": { "_charset_":"utf-8" }
                    });

                     this.upstreamReferencesDataView = new CQ.Ext.DataView({
                        "multiSelect": false,
                        "singleSelect": true,
                        "emptyText": CQ.I18n.getMessage("No Referenced assets"),
                        "store": this.upstreamReferencesStore,
                        "itemSelector": ".cq-asseteditor-references-item",
                        "tpl":new CQ.Ext.XTemplate(
                            '<tpl for=".">',
                                '<div class="cq-asseteditor-references-item" onclick="window.pageOrAsset(\'{isPage}\', \'{path}\');">',
                                    '<span class="cq-asseteditor-references-title">{name} </span>',
                                    '<span class="cq-asseteditor-references-path">{path}</span>',
                                '</div>',
                            '</tpl>'
                        )
                    });

                    this.upstreamReferencesPanel = new CQ.Ext.Panel({
                        "title": CQ.I18n.getMessage("Referenced assets"),
                        "cls": "cq-asseteditor-references",
                        "items": [this.upstreamReferencesDataView],
                        "autoScroll": true,
                        "bbar": [
                            {
                                "xtype": "button",
                                "tooltip": CQ.I18n.getMessage("Refresh References"),
                                "tooltipType": "title",
                                "iconCls":"cq-siteadmin-refresh",
                                "scope": this,
                                "handler": function() {
                                    var now = new Date().getTime();
                                    var m = new CQ.Ext.LoadMask(this.upstreamReferencesPanel.body);
                                    m.show();
                                    this.upstreamReferencesStore.load();
                                    window.setTimeout(function(){m.hide();}, this.getTimeoutTime(now));
                                }
                            }
                        ]
                    });
                    t.push(this.upstreamReferencesPanel);
                }
            }
            else {
                if(tabs[i]) {
                    t.push(CQ.Util.applyDefaults(t[i], {
                    }));
                }
            }
        }
        return t;
    },

    /**
     * Refreshes the info, the thumbnail and the renditions panel as well as
     * the grid of the DAM Admin in background.
     * @private
     */
    refresh: function() {
        delete this.info;
        this.refreshInfo();
        this.refreshThumbnail();
        this.refreshRenditions();
        this.refreshGrid();
    },

    /**
     * Refreshes the info panel
     * @private
     */
    refreshInfo: function() {
        this.titleInfo.updateText(this.getInfo("title"));
        this.lastModifiedInfo.updateText(this.getInfo("lastModified"));
        if (this.dimensionsInfo) this.dimensionsInfo.updateHtml(this.getInfo("dimensions"));
    },

    /**
     * Refreshes the thumbnail
     * @private
     */
    refreshThumbnail: function() {
        this.thumbnail.updateHtml(this.getThumbnailHtml());
    },

    /**
     * Refreshes the grid in DAM Admin if its selected path is the parent of this asset.
     */
    refreshGrid: function() {
        var path = CQ.Ext.getCmp(window.CQ_SiteAdmin_id).getCurrentPath();
        if (path == this.parentPath) {
            CQ.Ext.getCmp(window.CQ_SiteAdmin_id + "-grid").getStore().reload();
        }
    },
    
    isProxyRendition: function(renditionProps) {
        var renditionHandler;
        
        renditionHandler = renditionProps["rendition.handler.id"];
        
        if (!renditionHandler || renditionHandler == "jcr.default" ) {
            return false;
        } else  {
            return true;
        }
    },

    /**
     * Renders the renditions
     * @private
     */
    refreshRenditions: function() {
        if (!this.renditionsPanel) return;
        var data = [];
        var info = this.getInfo("renditions",true);
        for (var name in info) {
            if (name.indexOf("jcr:") < 0) {
                if ( !this.isProxyRendition(info[name]["jcr:content"])) {
                    var imgUrl;
                    var path = CQ.HTTP.externalize(this.pathEncoded + "/jcr:content/renditions/" + CQ.HTTP.encodePath(name), true);
                    if (info[name]["jcr:content"][":jcr:data"] < this.renditionsMaxSize // image (file) size does not exceed max size
                            && (
                                (name == "original" && this.isImage() // original of a web image
                                || this.isImage(name) // thumbnail of any file type
                            ))) {
    
                        path = CQ.HTTP.setParameter(path, CQ.utils.HTTP.PARAM_NO_CACHE, info[name].ck);
                        imgUrl = path;
                    }
                    else {
                        if (name == "page") {
                            imgUrl = CQ.HTTP.externalize(path + ".thumb.png");
                        }
                        else {
                            // rendition is not a web image (e.g. original of a PDF) or a very big web image
                            imgUrl = CQ.HTTP.externalize("/libs/cq/ui/widgets/themes/default/icons/48x48/document.png.thumb.100.140.png");
                            if (this.isImage()) {
                                // very big web image: could be modified > add cache killer
                                path = CQ.HTTP.setParameter(path, CQ.utils.HTTP.PARAM_NO_CACHE, info[name].ck);
                            }
                        }
                    }
                    var jcrTitle = info[name]["jcr:title"];
                    name = CQ.shared.XSS.getXSSValue(name);
                    data.push([name, jcrTitle, path, CQ.shared.XSS.getXSSValue(imgUrl),
                        this.renditionsLinkExtensions[name] ? this.renditionsLinkExtensions[name] : ""]);
                }
            }

        }
        this.renditionsStore.loadData(data.sort(this.compareRenditions));
    },

    refreshOriginal: function() {
        var ae = this;
        // short time out required until correct width and height are
        // delivered correctly
        window.setTimeout(function() {
            var formerCk;
            try {
                // use mod date of the thumbnails as cache killer
                var m = ae.getInfo("renditions")["cq5dam.thumbnail.48.48.png"]["jcr:content"]["jcr:lastModified"];
                formerCk = new Date(m).getTime();
            }
            catch (e) {
                formerCk = new Date().getTime();
            }
            delete ae.info;

            // update width, height and file size in info, form and admin grid
            // update versions
            var meta = ae.getInfo("metadata");
            var fields = CQ.Util.findFormFields(ae.formPanel);
            if (meta && meta["tiff:ImageWidth"] && fields["./tiff:ImageWidth"]) fields["./tiff:ImageWidth"][0].setValue(meta["tiff:ImageWidth"]);
            if (meta && meta["tiff:ImageLength"] && fields["./tiff:ImageLength"]) fields["./tiff:ImageLength"][0].setValue(meta["tiff:ImageLength"]);
            ae.refreshInfo();
            ae.versionsStore.reload();
            ae.hideLoadMask();
            ae.refreshGrid();

            // wait for the new thumbnails
            ae.waitForRenditions(true, formerCk);

        }, 1000);
    },

    /**
     * wait until the new renditions are build
     * @private
     */
    waitForRenditions: function(initialCall, formerCk, loadMaskR, loadMaskT) {
        // thumbnails are created in a workflow: wait until mod date changes
        var ae = this;
        if (initialCall) {
            // first call

            // mask renditions tab
            loadMaskR = new CQ.Ext.LoadMask(this.renditionsPanel.body, {
                "msg": CQ.I18n.getMessage("Processing renditions..."),
                "removeMask": true
            });
            loadMaskR.show();

            // mask thumbnail
            loadMaskT = new CQ.Ext.LoadMask(this.thumbnail.getEl(), {
                "msg": "&nbsp;",
                "removeMask": true
            });
            loadMaskT.show();



            this.renditionsTimeoutId = window.setTimeout(function() {
                ae.waitForRenditions(false, formerCk, loadMaskR, loadMaskT);
            }, this.renditionsInitialTimeout);
        }
        else {
            var url = this.pathEncoded + "/jcr:content/renditions/cq5dam.thumbnail.48.48.png/jcr:content.json";
            url = CQ.HTTP.noCaching(url);
            var tInfo = CQ.HTTP.eval(url);

            var ck;
            try {
                var m = tInfo["jcr:lastModified"];
                ck = new Date(m).getTime();
            }
            catch (e) {
                ck = new Date().getTime();
            }

            if (ck == formerCk) {
                this.renditionsTimeoutId = window.setTimeout(function() {
                    ae.waitForRenditions(false, formerCk, loadMaskR, loadMaskT);
                }, this.renditionsTimeout);
            }
            else {
                // new renditions available
                delete this.info;
                this.refreshRenditions();
                loadMaskR.hide();
                loadMaskT.hide();
                this.refreshThumbnail();
                this.refreshGrid();
            }
        }
    },

    /**
     * Shows the loading mask with the given message or "Saving...".
     * @param {String} msg The message (optional)
     */
    showSaveMask: function(msg) {
        this.showLoadMask(msg || CQ.I18n.getMessage("Saving..."));
    },

    /**
     * Shows the loading mask with the given message or "Loading...".
     * @param {String} msg The message (optional)
     */
    showLoadMask: function(msg) {
        // apply mask to this.body in order to be able to close a tab in case
        // the mask is unexpected not hidden
        this.loadMask = new CQ.Ext.LoadMask(this.body, {
            "msg": msg || CQ.I18n.getMessage("Loading...")
        });
        this.loadMask.show();
    },

    /**
     * Hides the loading mask
     */
    hideLoadMask: function() {
        if (this.loadMask) this.loadMask.hide();
    },

    /**
     * Hides the loading mask
     * @deprecated
     */
    hideSaveMask: function() {
        this.hideLoadMask();
    },


    // to avoid flickering display loading messages at least 600 ms
    getTimeoutTime: function(time) {
        var delta = new Date().getTime() - time;
        var min = 600;
        if (delta > min) return 1;
        return min - delta;
    },

    /**
     * Displays the specified error message and hides the loading mask.
     * @param {String} msg The error message (optional)
     */
    notify: function(msg) {
        this.hideLoadMask();
        if (!msg) msg = CQ.I18n.getMessage("Unspecified error");
        CQ.Notification.notify(CQ.I18n.getMessage("Error"), msg);
    },

    /**
     * Displays the specified error message extractet from the HTML provided by
     * <code>action.response.responseText</code>.
     * @param {Object} action The HTML response
     */
    notifyFromAction: function(action) {
        var msg;
        try {
            var response = CQ.HTTP.buildPostResponseFromHTML(action.response.responseText);
            msg = response.headers[CQ.HTTP.HEADER_MESSAGE];
        } catch(e) {
            CQ.Log.warn("CQ.dam.AssetEditor#notifyFromAction: " + e.message);
        }
        this.notify(msg);
    },

    /**
     * Applies {@link CQ.Ext.form.Field#readOnly readOnly} recursively to the specified items.
     * @param {Array} items
     * @private
     */
    applyReadOnly: function(items) {
        for (var i = 0; i < items.length; i++) {
            try {
                if (items[i].items) {
                    // assuming is panel
                    this.applyReadOnly(items[i].item);
                }
                items[i].readOnly = true;
            }
            catch (e) {
                CQ.Log.warn("CQ.dam.AssetEditor#applyReadOnly: " + e.message);
            }
        }
    },
    
    editorClose:  function(e) {
        var dirty = false;
        var editor = this;
        var meta = editor.metadata;
        var contentRecs = editor.contentRecs[0].json;

        editor.form.items.each(function(field) {
              var fieldName;
              var metafieldValue;
              if (field.name.indexOf("@TypeHint") > -1 || field.name.indexOf("@Patch") > -1) return true;
              if (field.name.indexOf("../") == 0) {
                  fieldName = field.name.substring(3);
                  metafieldValue = contentRecs[fieldName];
              }
              else
              if (field.name.indexOf("./") == 0) {
                   fieldName =  field.name.substring(2);
                   metafieldValue = meta[fieldName];
              }
              else return true;

              
              if (metafieldValue == undefined) {
                  if (field.getValue().toString() ==  "") return true;
                  else {
                      dirty = true;
                      return true;
                  }

              }

              if (field.getValue() instanceof Date) {
                      var date = new Date(metafieldValue);
                      var oldTime = parseInt(date.getTime()/60000);
                      var newTime = parseInt(field.getValue().getTime()/60000);
                      if (oldTime != newTime) {
                           dirty = true;
                           return false;
                          
                      }
              } else if (field.ownerCt.name == "./cq:tags") {
                          if (field.ownerCt.getValue().toString() != metafieldValue.toString()) {
                              dirty = true;
                              return false;
                             }
              } else
              if (field.getValue().toString() != metafieldValue.toString()) {
                  dirty = true;
                  return false;
              }
    });

    if (dirty)
    {   return false; 
    	
    } else {
    	return true;
    }
    
},

    constructor: function(config) {
        var ae = this;
        this.path = config.path;
        this.pathEncoded = CQ.HTTP.encodePath(this.path);
        if (config.path) {
            this.fileName = config.path.substring(config.path.lastIndexOf("/") + 1);
            this.parentPath = config.path.substring(0, config.path.lastIndexOf("/"));
        }
        
        /*
         * Making changes for CQ5-20257 DAM modify/delete permission issue
         * When we remove the delete permission from a folder, the edit option in asset editor was getting disabled
         * for all the assets inside the folder. Internally the modify permission is dependent on delete permission
         * (Code introduced in CQ5-12415). Now readonly attribute for asset will be set only if the metadata of the
         * asset doesnot have modify permission.
         */
        this.readOnly = config.readOnly || !CQ.User.getCurrentUser().hasPermissionOn("modify", this.path + "/jcr:content/metadata");

        config = CQ.Util.applyDefaults(config, {
            "layout": "border",
            "closable": true,
            "header": false,
            "border": false,
            "cls": "cq-asseteditor",
            "contentPath": "/jcr:content/metadata",
            "title": CQ.shared.XSS.getXSSValue(CQ.shared.Util.ellipsis(this.fileName, 30)),
            "thumbnailWidth": 319,
            "thumbnailHeight": 319,
            "thumbnailServlet": "thumb",
            "thumbnailExtension": "png",
            "renditionsMaxSize": 300000,
            "compareRenditions": CQ.dam.AssetEditor.compareRenditions,
            "renditionsLinkExtensions": {
                "page": ".html"
            },
            "bbar": [
                "->",
                CQ.dam.AssetEditor.SAVE,
                CQ.dam.AssetEditor.RESET
            ],
            "bbarWest": [
                CQ.dam.AssetEditor.REFRESH_INFO,
                "->",
                CQ.dam.AssetEditor.EDIT_IMAGE
            ],
            "tabs": [
                CQ.dam.AssetEditor.SUBASSETS,
                CQ.dam.AssetEditor.RENDITIONS,
                CQ.dam.AssetEditor.VERSIONS,
                CQ.dam.AssetEditor.REFERENCES,
                CQ.dam.AssetEditor.UPSTREAM_REFERENCES
            ]
        });


        // ---------------------------------------------------------------------
        // info panel (west)
        // ---------------------------------------------------------------------

        var items = [];

        this.thumbnail = new CQ.Static({
            "cls": "cq-asseteditor-thumbnail",
            "html": this.getThumbnailHtml(false, config),
            "colspan": 2
        });
        items.push(this.thumbnail);

        this.titleInfo = new CQ.Static({
           "cls": "cq-asseteditor-title",
           "text": this.getInfo("title"),
           "colspan": 2
        });
        items.push(this.titleInfo);

        items.push(new CQ.Static({
            "cls": "infoLabel",
            "small": true,
            "text": CQ.I18n.getMessage("Name")
        }));
        items.push(new CQ.Static({
            "small": true,
            "right": true,
            "text": this.fileName
        }));

        if (config.assetInfo.size) {
            items.push(new CQ.Static({
                "cls": "infoLabel",
                "small": true,
                "text": CQ.I18n.getMessage("Size")
            }));
            this.sizeInfo = new CQ.Static({
                "small": true,
                "right": true,
                "text": CQ.Util.formatFileSize(config.assetInfo.size)
            });
            items.push(this.sizeInfo);
        }

        items.push(new CQ.Static({
            "cls": "infoLabel",
            "small": true,
            "text": CQ.I18n.getMessage("Modified")
        }));
        this.lastModifiedInfo = new CQ.Static({
            "small": true,
            "right": true,
            "text": config.assetInfo.lastModified ? CQ.wcm.SiteAdmin.formatDate(new Date(config.assetInfo.lastModified)) : ""
        });
        items.push(this.lastModifiedInfo);

        if (config.assetInfo.mime) {
            items.push(new CQ.Static({
                "cls": "infoLabel",
                "small": true,
                "text": CQ.I18n.getMessage("Type")
            }));
            this.typeInfo = new CQ.Static({
                "small": true,
                "right": true,
                "text": config.assetInfo.mime
            });
            items.push(this.typeInfo);
        }

        if (config.assetInfo.width && config.assetInfo.height) {
            items.push(new CQ.Static({
                "cls": "infoLabel",
                "small": true,
                "text": CQ.I18n.getMessage("Dimensions")
            }));
            this.dimensionsInfo = new CQ.Static({
                "small": true,
                "right": true,
                "html": config.assetInfo.width + ' &times; ' + config.assetInfo.height
            });
            items.push(this.dimensionsInfo);
        }

        items.push(new CQ.Static({
            "colspan": 2,
            "small": true,
            "right": true,
            "cls": "cq-asseteditor-download",
            "html": '<a href="' + CQ.HTTP.externalize(CQ.shared.XSS.getXSSValue(this.pathEncoded)) + "?logActivity=true" + '" target="_blank" title="' + CQ.shared.XSS.getXSSValue(this.path) + '">' + CQ.I18n.getMessage("Download") + '</a>'
        }));

        if(config.scene7) {
            var publishLinkHtml = '<a onclick="CQ.scene7.triggerWorkflow(\'' 
                    + config.id + '\', \'' 
                    + CQ.HTTP.externalize(CQ.shared.XSS.getXSSValue(this.pathEncoded))
                    + '\')">' 
                    + (this.info.metadata["dam:scene7ID"] ? CQ.I18n.getMessage("Re-publish to Scene7") : CQ.I18n.getMessage("Publish to Scene7"))
                    + '</a>';
            
            items.push(new CQ.Static({
                "colspan": 2,
                "id": config.id + "-publishLink",
                "small": true,
                "right": true,
                "cls": "cq-asseteditor-download",
                "html": publishLinkHtml
            }));
        }

        var w = config.thumbnailWidth + CQ.dam.themes.AssetEditor.WEST_PANEL_PADDING_WIDTH;
        var infoPanelConfig = CQ.Util.applyDefaults(config.infoPanel, {
            "xtype": "panel",
            "region": "west",
            "width": w < CQ.dam.themes.AssetEditor.WEST_PANEL_MIN_WIDTH ? CQ.dam.themes.AssetEditor.WEST_PANEL_MIN_WIDTH : w,
            "split": true,
            "collapsible":true,
            "collapseMode":"mini",
            "hideCollapseTool": true,
            "autoScroll": true,
            "margins":"5 0 5 5",
            "cls": "cq-asseteditor-west",
            "footer": true,
            "layout": "table",
            "layoutConfig": {
                columns: 2
            },
            "items": items,
            "bbar": this.getButtonsConfig(config.bbarWest)
        });
        this.infoPanel = CQ.Util.build(infoPanelConfig);

        // ---------------------------------------------------------------------
        // tab panel (east)
        // ---------------------------------------------------------------------

        this.renditionsMaxSize = config.renditionsMaxSize;
        this.denyThumbnailUpload = config.denyThumbnailUpload;
        this.denyRenditionModifications = config.denyRenditionModifications;
        this.compareRenditions = config.compareRenditions;
        this.renditionsLinkExtensions = config.renditionsLinkExtensions;

        var tabs = this.getTabsConfig(config.tabs);
        if (tabs.length > 0) {
            var tabPanelConfig = CQ.Util.applyDefaults(config.tabPanel, {
                "xtype": "tabpanel",
                "region": "east",
                "width": CQ.dam.themes.AssetEditor.EAST_PANEL_WIDTH,
                "split": true,
                "collapsible":true,
                "collapseMode":"mini",
                "hideCollapseTool": true,
                "margins":"5 5 5 0",
                "enableTabScroll": true,
                "cls": "cq-asseteditor-east",
                "activeTab": 0,
                "plain": true,
                "footer": false,
                "items": tabs,
                "listeners": {
                    "tabchange": function (tabpanel, panel) {
                        panel.doLayout();
                        if (panel == ae.versionsPanel) {
                            if (!ae.versionsStore.isLoaded) {
                                ae.versionsStore.reload();
                                ae.versionsStore.isLoaded = true;
                            }
                        }
                        else if (panel == ae.referencesPanel) {
                            if (!ae.referencesStore.isLoaded) {
                                ae.referencesStore.reload();
                                ae.referencesStore.isLoaded = true;
                            }
                        }
                        else if (panel == ae.upstreamReferencesPanel) {
                            if (!ae.upstreamReferencesStore.isLoaded) {
                                ae.upstreamReferencesStore.reload();
                                ae.upstreamReferencesStore.isLoaded = true;
                            }
                        }

                    }
                }
            });
            this.tabPanel = CQ.Util.build(tabPanelConfig);
        }


        // ---------------------------------------------------------------------
        // form panel (center)
        // ---------------------------------------------------------------------

        if (this.readOnly) this.applyReadOnly(config.formItems);

        var formConfig = CQ.Util.applyDefaults(config.formPanel, {
            "region": "center",
            "items": config.formItems,
            "buttonAlign": "right",
            "autoScroll": true,
            "cls": "cq-asseteditor-center",
            "margins": this.tabPanel ? "5 0 5 0" : "5 5 5 0",
            "labelWidth": CQ.dam.themes.AssetEditor.LABEL_WIDTH,
            "defaults": {
//                "msgTarget": CQ.themes.Dialog.MSG_TARGET,
                "anchor": CQ.Ext.isIE6 ? "92%" : CQ.Ext.isIE7 ? "96%" : "100%",
                "stateful": false
            },
            "bbar": this.getButtonsConfig(config.bbar),
            "cleanUp": function() {
                // used in TagInputField when default namespace is undefined and
                // a new label has been entered (bug 29859)
                ae.hideLoadMask();
            }
        });
        // delete the bbar cfg - otherwise would be used as buttons config for the main panel
        delete config.bbar;

        this.formPanel = new CQ.Ext.form.FormPanel(formConfig);
        this.form = this.formPanel.getForm();

        this.form.url = this.pathEncoded + config.contentPath + CQ.HTTP.EXTENSION_HTML;

        if (!config.params) {
            config.params = new Object();
        }
        if (config.params[CQ.Sling.CHARSET] == undefined) {
            config.params[CQ.Sling.CHARSET] = CQ.Dialog.DEFAULT_ENCODING;
        }
        if (config.params[CQ.Sling.STATUS] == undefined) {
            config.params[CQ.Sling.STATUS] = CQ.Sling.STATUS_BROWSER;
        }
        this.addHidden(config.params);
        if (window.assetEditor == undefined) {
            window.assetEditor = {};
          }
        window.assetEditor[this.pathEncoded] = this;

        config.items = [];
        config.items.push(this.infoPanel);
        if (this.tabPanel) config.items.push(this.tabPanel);
        config.items.push(this.formPanel);

        CQ.dam.AssetEditor.superclass.constructor.call(this, config);
    },

    initComponent: function(){
        CQ.dam.AssetEditor.superclass.initComponent.call(this);

        //todo: find out why some panels need an extra doLayout
        var ae = this;
        window.setTimeout(function() {
            ae.infoPanel.doLayout();
            ae.formPanel.doLayout(); // required for empty tag fields
            if (ae.tabPanel) ae.tabPanel.doLayout();
            try {
                //todo: does not work reliably in IE
                ae.loadMask = new CQ.Ext.LoadMask(ae.formPanel.body);
                ae.loadMask.show();
            }
            catch(e) {}
        }, 1);

        this.loadContent(); // call after building loadMask (loadContent will hide the mask)

        this.on("close", function() {
            // stop refreshing of renditions when closing the tab of this editor
            window.clearTimeout(this.renditionsTimeoutId);
        });
    }
});

CQ.Ext.reg("asseteditor", CQ.dam.AssetEditor);

/**
 * The value for {@link #bbar} to create the Save button.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.SAVE = "SAVE";

/**
 * The value for {@link #bbar} to create the Reset button.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.RESET = "RESET";

/**
 * The value for {@link #bbarWest} to create the Edit Image button. The button
 * is available for GIF, PNG and JPEG images only.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.EDIT_IMAGE = "EDIT_IMAGE";

/**
 * The value for {@link #bbarWest} to create the refresh button.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.REFRESH_INFO = "REFRESH_INFO";

/**
 * The value for {@link #tabs} to create the Sub Assets tab.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.SUBASSETS = "SUBASSETS";

/**
 * The value for {@link #tabs} to create the Renditions tab.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.RENDITIONS = "RENDITIONS";

/**
 * The value for {@link #tabs} to create the Versions tab.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.VERSIONS = "VERSIONS";

/**
 * The value for {@link #tabs} to create the References tab.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.REFERENCES = "REFERENCES";

/**
 * The value for {@link #tabs} to create the upstream references tab.
 * @static
 * @final
 * @type String
 */
CQ.dam.AssetEditor.UPSTREAM_REFERENCES = "UPSTREAM_REFERENCES";

/**
 * Default sorting method for the renditions tab.
 * Sort order:
 * - thumbnails ordered by size (smallest first)
 * - web rendition
 * - other (custom) renditions
 * - original
 * @private
 * @param {Array} a
 * @param {Array} b
 */
CQ.dam.AssetEditor.compareRenditions = function(a, b) {
    if (a[0] == "original") return 1;
    if (b[0] == "original") return -1;
    return CQ.dam.AssetEditor.getRenditionCompareSize(a[0]) - CQ.dam.AssetEditor.getRenditionCompareSize(b[0]);
};

/**
 * Returns the size of renditions for the sorting. Thumbails and web rendition
 * return their width others a static integer.
 * @private
 * @param {String} name
 */
CQ.dam.AssetEditor.getRenditionCompareSize = function(name) {
    var s;
    if (name.indexOf("cq5dam.thumbnail") == 0) {
        // width in pixel
        s = parseInt(name.split(".")[2]);
    }
    if (name.indexOf("cq5dam.web") == 0) {
        // width in pixel plus 10000 to sort after thumbnails
        s = 10000 + parseInt(name.split(".")[2]);
    }
    if (!isNaN(s)) return s;
    // others: move to the end
    return 1000000;
};

/**
 *
 *Customization for HDS 
 * Checking if the tags field has content type tag. If yes, it allows the metadata to save, if not, it shows n error
 */
CQ.dam.AssetEditor.CONTENTTYPE = "common:content-type";

CQ.dam.AssetEditor.validateTags = function(formObject, assetPathURL) {
	var isValid = false;
   //console.log("asset path URL " + assetPathURL);
	var fieldValue = formObject.findField("./cq:tags").getValue().toString();
	if(fieldValue.indexOf(CQ.dam.AssetEditor.CONTENTTYPE) != -1) {
    		isValid = true;
    } else {
        CQ.Ext.Msg.show({
            title:CQ.I18n.getMessage('Validation Failed'),
            msg: CQ.I18n.getMessage('Content Type tag is mandatory in the Tags Field'),
            buttons: CQ.Ext.Msg.OK,
            icon: CQ.Ext.Msg.ERROR
        });
    }
	return isValid;
};