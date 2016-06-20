/*
 * Copyright 1997-2009 Day Management AG
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
 * @class CQ.form.MultiField
 * @extends CQ.form.CompositeField
 * The MultiField is an editable list of form fields for editing
 * multi-value properties.
 * @constructor
 * Creates a new MultiField.
 * @param {Object} config The config object
 */
CarouselCustomType = {};
CarouselCustomType.PB = CQ.Ext.extend(CQ.form.MultiField, {

        /**
         * @cfg {Boolean} orderable
         * If the list of fields should be orderable and Up/Down buttons
         * are rendered (defaults to true).
         */

        /**
         * @cfg {CQ.Ext.form.Field/CQ.form.CompositeField} fieldConfig
         * The configuration options for the fields. Defaults to
         * <pre><code>
    {
        "xtype": "textfield"
        }      </code></pre>
         */
        fieldConfig : null,

        /**
         * @cfg {String} typeHint
         * The type of the single fields, such as "String" or "Boolean". If set to "String",
         * for example, the @TypeHint will automatically be set to "String[]" to ensure that
         * a multi-value property is created. Not set by default.
         * @since 5.4
         */

        // private
        path : "",

        // private
        bodyPadding : 5,

        // the width of the field
        // private
        fieldWidth : 0,

        constructor : function (config) {
            var list = this;

            if (typeof config.orderable === "undefined") {
                config.orderable = true;
            }

            if (!config.fieldConfig) {
                config.fieldConfig = {};
            }
            if (!config.fieldConfig.xtype) {
                config.fieldConfig.xtype = "textfield";
            }
            config.fieldConfig.name = config.name;
            config.fieldConfig.ownerCt = this;
            //        config.fieldConfig.style = "width:95%;";
            config.fieldConfig.orderable = config.orderable;
            config.fieldConfig.dragDropMode = config.dragDropMode;
            if (!config.addItemLabel) {
                config.addItemLabel = CQ.I18n.getMessage("Add Item");
            }

            var items = new Array();

            if (config.readOnly) {
                //if component is defined as readOnly, apply this to all items
                config.fieldConfig.readOnly = true;
            } else {
                items.push({
                    xtype : "toolbar",
                    cls : "cq-multifield-toolbar",
                    items : [
                        "->", {
                            xtype : "textbutton",
                            text : config.addItemLabel,
                            style : "padding-right:6px",
                            handler : function () {
                                list.addItem();
                            }
                        }, {
                            xtype : "button",
                            iconCls : "cq-multifield-add",
                            template : new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
                            handler : function () {
                                list.addItem();
                            }
                        }
                    ]
                });
            }

            this.hiddenDeleteField = new CQ.Ext.form.Hidden({
                    "name" : config.name + CQ.Sling.DELETE_SUFFIX
                });
            items.push(this.hiddenDeleteField);

            if (config.typeHint) {
                this.typeHintField = new CQ.Ext.form.Hidden({
                        name : config.name + CQ.Sling.TYPEHINT_SUFFIX,
                        value : config.typeHint + "[]"
                    });
                items.push(this.typeHintField);
            }

            config = CQ.Util.applyDefaults(config, {
                    "defaults" : {
                        "xtype" : "carouselcustommultifield_item",
                        "fieldConfig" : config.fieldConfig
                    },
                    "items" : [{
                            "xtype" : "panel",
                            "border" : false,
                            "bodyStyle" : "padding:" + this.bodyPadding + "px",
                            "items" : items
                        }
                    ]
                });
            CQ.form.MultiField.superclass.constructor.call(this, config);
            if (this.defaults.fieldConfig.regex) {
                // somehow regex get broken in this.defaults, so fix it
                this.defaults.fieldConfig.regex = config.fieldConfig.regex;
            }
            this.addEvents(
                /**
                 * @event change
                 * Fires when the value is changed.
                 * @param {CQ.form.MultiField} this
                 * @param {Mixed} newValue The new value
                 * @param {Mixed} oldValue The original value
                 */
                "change");
        },

        initComponent : function () {
            CQ.form.MultiField.superclass.initComponent.call(this);

            this.on("resize", function () {
                // resize fields
                var item = this.items.get(0);
                this.calculateFieldWidth(item);
                if (this.fieldWidth > 0) {
                    for (var i = 0; i < this.items.length; i++) {
                        try {
                            this.items.get(i).field.setWidth(this.fieldWidth);
                        } catch (e) {
                            CQ.Log.debug("CQ.form.MultiField#initComponent: " + e.message);
                        }
                    }
                }
            });

            this.on("disable", function () {
                this.hiddenDeleteField.disable();
                if (this.typeHintField)
                    this.typeHintField.disable();
                this.items.each(function (item /*, index, length*/
                    ) {
                    if (item instanceof CQ.form.MultiField.Item) {
                        item.field.disable();
                    }
                }, this);
            });

            this.on("enable", function () {
                this.hiddenDeleteField.enable();
                if (this.typeHintField)
                    this.typeHintField.enable();
                this.items.each(function (item /*, index, length*/
                    ) {
                    if (item instanceof CQ.form.MultiField.Item) {
                        item.field.enable();
                    }
                }, this);
            });
        },

        // private
        calculateFieldWidth : function (item) {
            try {
                this.fieldWidth = this.getSize().width - 2 * this.bodyPadding; // total row width
                for (var i = 1; i < item.items.length; i++) {
                    // subtract each button
                    var w = item.items.get(i).getSize().width;
                    if (w == 0) {
                        // button has no size, e.g. because MV is hidden >> reset fieldWidth to avoid setWidth
                        this.fieldWidth = 0;
                        return;
                    }

                    this.fieldWidth -= item.items.get(i).getSize().width;
                }
            } catch (e) {
                // initial resize fails if the MF is on the visible first tab
                // >> reset to 0 to avoid setWidth
                this.fieldWidth = 0;
            }
        },

        /**
         * Adds a new field with the specified value to the list.
         * @param {String} value The value of the field
         */
        addItem : function (value) {
            var item = this.insert(this.items.getCount() - 1, {});
            var form = this.findParentByType("form");
            if (form)
                form.getForm().add(item.field);
            this.doLayout();

            if (item.field.processPath)
                item.field.processPath(this.path);
            if (value) {
                item.setValue(value);
            }else{
            	item.setValue("SLIDE # "+(this.items.getCount() - 1)+"^^^^^^^^^^^^");
            }

            if (this.fieldWidth < 0) {
                // fieldWidth is < 0 when e.g. the MultiField is on a hidden tab page;
                // do not set width but wait for resize event triggered when the tab page is shown
                return;
            }
            if (!this.fieldWidth) {
                this.calculateFieldWidth(item);
            }
            try {
                item.field.setWidth(this.fieldWidth);
            } catch (e) {
                CQ.Log.debug("CQ.form.MultiField#addItem: " + e.message);
            }
        },

        processPath : function (path) {
            this.path = path;
        },

        // overriding CQ.form.CompositeField#getValue
        getValue : function () {
            var value = new Array();
            this.items.each(function (item, index, length) {
                if (item instanceof CQ.form.MultiField.Item) {
                    value[index] = item.getValue();
                    index++;
                }
            }, this);
            return value;
        },

        // overriding CQ.form.CompositeField#setValue
        setValue : function (value) {
            this.fireEvent("change", this, value, this.getValue());
            var oldItems = this.items;
            oldItems.each(function (item /*, index, length*/
                ) {
                if (item instanceof CQ.form.MultiField.Item) {
                    this.remove(item, true);
                    this.findParentByType("form").getForm().remove(item);
                }
            }, this);
            this.doLayout();
            if ((value != null) && (value != "")) {
              if (value instanceof Array || CQ.Ext.isArray(value)) {
              	var count = 1;
                 for (var i = 0; i < value.length;i=i+12) {
                  	   		this.addItem("SLIDE # "+(count++)+"^"+value[i] + "^" + value[i+1]+ "^" + value[i+2]+ "^" + value[i+3]+ "^" + value[i+4]+ "^" + value[i+5]+ "^" + value[i+6]+ "^" + value[i+7]+ "^" + value[i+8]+ "^"+ value[i+9]+ "^" + value[i+10]+ "^" + value[i+11]);
                  }
                 }else {
                  this.addItem(value);
              }
          }
        }

    });

CQ.Ext.reg("carouselmultifield", CarouselCustomType.PB);

/**
 * @private
 * @class CQ.form.MultiField.Item
 * @extends CQ.Ext.Panel
 * The MultiField.Item is an item in the {@link CQ.form.MultiField}.
 * This class is not intended for direct use.
 * @constructor
 * Creates a new MultiField.Item.
 * @param {Object} config The config object
 */
CarouselCustomType.PB.Item = CQ.Ext.extend(CQ.form.MultiField.Item, {

        constructor : function (config) {
            var item = this;
            var fieldConfig = CQ.Util.copyObject(config.fieldConfig);
            this.field = CQ.Util.build(fieldConfig, true);

            var items = new Array();
            items.push({
                "xtype" : "panel",
                "border" : false,
                "cellCls" : "cq-multifield-itemct",
                //            "width": 100,
                "items" : item.field
            });

            if (!fieldConfig.readOnly) {
                if (fieldConfig.orderable) {
                    items.push({
                        "xtype" : "panel",
                        "border" : false,
                        "items" : {
                            "xtype" : "button",
                            "iconCls" : "cq-multifield-up",
                            "template" : new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
                            "handler" : function () {
                                var parent = item.ownerCt;
                                var index = parent.items.indexOf(item);

                                if (index > 0) {
                                    item.reorder(parent.items.itemAt(index - 1));
                                }
                            }
                        }
                    });
                    items.push({
                        "xtype" : "panel",
                        "border" : false,
                        "items" : {
                            "xtype" : "button",
                            "iconCls" : "cq-multifield-down",
                            "template" : new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
                            "handler" : function () {
                                var parent = item.ownerCt;
                                var index = parent.items.indexOf(item);

                                if (index < parent.items.getCount() - 1) {
                                    item.reorder(parent.items.itemAt(index + 1));
                                }
                            }
                        }
                    });
                }
                items.push({
                    "xtype" : "panel",
                    "border" : false,
                    "items" : {
                        "xtype" : "button",
                        "iconCls" : "cq-multifield-remove",
                        "template" : new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
                        "handler" : function () {
                	
                            var parent = item.ownerCt;
                            parent.remove(item);                            
                            parent.fireEvent("removeditem", parent);
                            
                            /*
                             * Code to update the label number after delete 
                             */
                            for(var i=0;i<parent.items.length;i++){
                            	item.updateLabel(parent.items.itemAt(i),i+1);
                            }                            
                        }
                    }
                });
            }

            config = CQ.Util.applyDefaults(config, {
                    "layout" : "table",
                    "anchor" : "100%",
                    "border" : false,
                    "layoutConfig" : {
                        "columns" : 4
                    },
                    "defaults" : {
                        "bodyStyle" : "padding:7px"
                    },
                    "items" : items
                });
            CQ.form.MultiField.Item.superclass.constructor.call(this, config);

            if (config.value) {
                this.field.setValue(config.value);
            }
        },
        updateLabel: function (item,labelIndex) {
        	item.field.panelLabel.setText("SLIDE # "+labelIndex);        	
        },

        //    initComponent: function() {
        //        CQ.form.MultiField.Item.superclass.initComponent.call(this);
        ////        this.on("show", function() {console.log("show");});
        ////        this.on("render", function() {console.log("render");});
        ////        this.on("activate", function() {console.log("activate");});
        ////        this.on("add", function() {console.log("add");});
        //
        ////        this.on("resize", function(p,w) {console.log("resize::",w);});
        ////        this.on("bodyresize", function(p,w) {console.log("bodyresize::",w);});
        //
        //        this.on("resize", function() {
        //            var pfs = this.findByType(CQ.form.PathField);
        //            for (var i = 0; i < pfs.length; i++) {
        //                console.log("^^",pfs[i]);
        //                pfs[i].updateEditState();
        //            }
        //            //            console.log("resize::",w);
        //        });
        //
        //    },

        /**
         * Reorders the item above the specified item.
         * @param item {CQ.form.MultiField.Item} The item to reorder above
         * @member CQ.form.MultiField.Item
         */
        reorder : function (item) {
	        	var carouselType = item.field.carouselType.getValue();
	        	var carouselImage = item.field.carouselImage.getValue();
	        	var altImage = item.field.altImage.getValue();	        	
	        	var tagLine = item.field.tagLine.getValue();
	        	var tagHeader = item.field.tagHeader.getValue();
	        	var tagLineStyle = item.field.tagLineStyle.getValue();
	        	var fontColor = item.field.fontColor.getValue();
	        	var carouselVideo = item.field.carouselVideo.getValue();
	        	var videoCaption = item.field.videoCaption.getValue();
	        	var videoDescription = item.field.videoDescription.getValue();
	        	var buttonCaption = item.field.buttonCaption.getValue();
	        	var buttonLink = item.field.buttonLink.getValue();

	        	item.field.carouselType.setValue(this.field.carouselType.getValue());
	        	item.field.carouselImage.setValue(this.field.carouselImage.getValue());
	        	item.field.altImage.setValue(this.field.altImage.getValue());	        	
	        	item.field.tagLine.setValue(this.field.tagLine.getValue());
	        	item.field.tagHeader.setValue(this.field.tagHeader.getValue());
	        	item.field.tagLineStyle.setValue(this.field.tagLineStyle.getValue());
	        	item.field.fontColor.setValue(this.field.fontColor.getValue());
	        	item.field.carouselVideo.setValue(this.field.carouselVideo.getValue());
	        	item.field.videoCaption.setValue(this.field.videoCaption.getValue());
	        	item.field.videoDescription.setValue(this.field.videoDescription.getValue());
	        	item.field.buttonCaption.setValue(this.field.buttonCaption.getValue());
	        	item.field.buttonLink.setValue(this.field.buttonLink.getValue());

	        	this.field.carouselType.setValue(carouselType);
	        	this.field.carouselImage.setValue(carouselImage);
	        	this.field.altImage.setValue(altImage);	        	
	        	this.field.tagLine.setValue(tagLine);
	        	this.field.tagHeader.setValue(tagHeader);
	        	this.field.tagLineStyle.setValue(tagLineStyle);
	        	this.field.fontColor.setValue(fontColor);
	        	this.field.carouselVideo.setValue(carouselVideo);
	        	this.field.videoCaption.setValue(videoCaption);
	        	this.field.videoDescription.setValue(videoDescription);            
	        	this.field.buttonCaption.setValue(buttonCaption);
	        	this.field.buttonLink.setValue(buttonLink);
            
            this.field.updateFields();
            item.field.updateFields();
        },

        /**
         * Returns the data value.
         * @return {String} value The field value
         * @member CQ.form.MultiField.Item
         */
        getValue : function () {
            return this.field.getValue();
        },

        /**
         * Sets a data value into the field and validates it.
         * @param {String} value The value to set
         * @member CQ.form.MultiField.Item
         */
        setValue : function (value) {
            this.field.setValue(value);
        }
    });

CQ.Ext.reg("carouselcustommultifield_item", CarouselCustomType.PB.Item);
