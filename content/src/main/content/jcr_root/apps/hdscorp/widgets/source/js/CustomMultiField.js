CQ.form.CustomMultiField = CQ.Ext.extend(CQ.form.CompositeField, {
		fieldConfig : null,
		numberOfItems : null,
		customMultiFieldName : null,
		storeIndexPos : false,
		storeOverlayPos: false,
		customOverlaysName: null,
		maxItems : 35,
		constructor : function (b) {
			var e = this;
			if (!b.customMultiFieldName) {
				b.customMultiFieldName = "./numberofitems"
			}
			if (!b.customOverlaysName) {
				b.customOverlaysName = "./overlays"
			}
			if (!b.value) {
				b.value = 0
			}
			if (!b.fieldConfig) {
				b.fieldConfig = {}
			}
			if (!b.fieldConfig.xtype) {
				b.fieldConfig.xtype = "customcompositefield"
			}
			b.fieldConfig.name = b.name;
			b.fieldConfig.style = "width:85%;";
			var a = new Array();
			this.numberOfItems = new CQ.Ext.form.Hidden({
					name : b.customMultiFieldName,
					value : b.value
				});
			a.push(this.numberOfItems);
			if (b.readOnly) {
				b.fieldConfig.readOnly = true
			} else {
				a.push({
					xtype : "button",
					cls : "cq-multifield-btn",
					text : "+",
					handler : function () {
						e.addItem()
					}
				})
			}
			this.customMultiFieldName = b.customMultiFieldName;
			this.fieldConfig = b.fieldConfig;
			for (var d = 0;
				d < this.fieldConfig.length;
				d++) {
				a.push({
					xtype : "hidden",
					name : this.fieldConfig[d].name + CQ.Sling.DELETE_SUFFIX
				})
			}
			a.push({
				xtype : "hidden",
				name : b.customMultiFieldName + CQ.Sling.DELETE_SUFFIX
			});
			b = CQ.Util.applyDefaults(b, {
					defaults : {
						xtype : "custommultifielditem",
						fieldConfig : b.fieldConfig,
						storeIndexPos : false,
						storeOverlayPos: false,
						maxItems : 35
					},
					items : [{
							xtype : "panel",
							border : false,
							bodyStyle : "padding:4px",
							items : a
						}
					]
				});
			if (b.storeIndexPos) {
				this.storeIndexPos = b.storeIndexPos
			}
			if(b.storeOverlayPos){
				this.storeOverlayPos = b.storeOverlayPos;
			}
			if (b.maxItems) {
				this.maxItems = b.maxItems
			}
			CQ.form.CustomMultiField.superclass.constructor.call(this, b);
			if (this.defaults.fieldConfig.regex) {
				this.defaults.fieldConfig.regex = b.fieldConfig.regex
			}
			this.addEvents("change");
			this.on("render", function () {
				this.parentDialog = this.findParentByType("dialog");
				if (this.parentDialog) {
					this.parentDialog.on("beforeSubmit", function (g, f) {
						if (e.storeIndexPos) {
							e.resetCustomValue()
						}
						if(e.storeOverlayPos){
							e.setOverlays();
						}
					}, this.parentDialog)
				}
			}, this)
		},
		validateValue : function (g) {
			var h = true;
			var b = this;
			var e = CQ.Util.findFormFields(b);
			for (var d in e) {
				for (var f = 0;
					f < e[d].length;
					f++) {
					if (e[d][f].xtype == "customcompositefield" || e[d][f].isXType("customcompositefield")) {
						var j = e[d][f];
						for (var a = 0;
							a < j.items.getCount();
							a++) {
							if (!j.items.get(a).allowBlank && j.items.get(a).getValue().length < 1) {
								j.items.get(a).markInvalid(j.items.get(a).blankText);
								h = false
							}
						}
					}
				}
			}
			return h
		},
		resetCustomValue : function () {
			var d = this;
			var e = CQ.Util.findFormFields(d);
			for (var b in e) {
				var a = 0;
				for (var f = 0;
					f < e[b].length;
					f++) {
					if (e[b][f].xtype == "customcompositefield" || e[b][f].isXType("customcompositefield")) {
						var h = e[b][f];
						for (var j = 0;
							j < h.items.getCount();
							j++) {
							var k = h.items.get(j).getValue();
							var g;
							if (h.items.get(j).name == "./secondLevelLinkText") {
								g = k;
								g = g.replace(/ /g, "-").toLowerCase()
							}
							if (h.items.get(j).name == "./secondLevelIndex" && (!k || k == null || k == "")) {
								h.items.get(j).setRawValue(a);
								h.items.get(j).setValue(a)
							}
							if (h.items.get(j).name == "./secondLevelHolderName" && (!k || k == null || k == "")) {
								h.items.get(j).setRawValue("node_holder_" + g);
								h.items.get(j).setValue("node_holder_" + g)
							}
						}
						a++
					}
				}
			}
		},
		addItem : function (b) {
			if (this.items.getCount() > this.maxItems) {
				var d = CQ.I18n.getMessage("You can only create a maximum of ") + this.maxItems + CQ.I18n.getMessage(" items.");
                CQ.Ext.Msg.show({
					title : CQ.I18n.getMessage("<center>Error</center>"),
					msg : d,
					buttons : CQ.Ext.Msg.OK
				})
			} else {
				var a = this.insert(this.items.getCount() - 1, {});
				this.findParentByType("form").getForm().add(a.field);
				this.doLayout();
				if (b) {
					a.setValue(b)
				}
				if (a.field.isXType("trigger")) {
					a.field.wrap.setWidth("85%")
				} else {
					a.field.setWidth("85%")
				}
				this.setNumberOfItems();
				if(this.storeOverlayPos){
					this.setOverlays();
				}
				return a;
			}
		},
		getValue : function () {
			var a = new Array();
			this.items.each(function (d, b) {
				if (d instanceof CQ.form.CustomMultiField.Item) {
					a[b] = d.getValue();
					b++
				}
			}, this);
			return a
		},
		setValue : function (b) {
			this.fireEvent("change", this, b, this.getValue());
			this.doLayout();
			this.setOverlays();
			if ((b != null) && (b != "")) {
				if (b instanceof Array || CQ.Ext.isArray(b)) {
					for (var a = 0;
						a < b.length;
						a++) {
						this.addItem(b[a])
					}
				} else {
					this.addItem(b)
				}
			}
		},
		getNumberOfItems : function () {
			return this.items.getCount() - 1
		},
		setNumberOfItems : function (a) {
			if (!a) {
				this.numberOfItems.setValue(this.getNumberOfItems())
			} else {
				this.numberOfItems.setValue(a)
			}
		},
		setOverlays: function(){
			var d = this;
			var e = CQ.Util.findFormFields(d);
			var o = {f:[], v:[]};
			for (var b in e) {
				var a = 0;
				for (var f = 0;	f < e[b].length; f++) {
					if(e[b][f].xtype == "customcompositefield"){
						var h = e[b][f];
						for (var j = 0;	j < h.items.getCount();	j++) {
							if (h.items.get(j).name == d.customOverlaysName) {
								o.f.push(h.items.get(j));
								if(h.items.get(j).getValue() != ''){
									o.v.push(h.items.get(j).getValue());
								}
							}
						}
					}
				}
			}
			var p = true, v = '';
			for(var i = 0, n = o.f.length; i < n; i++){
				if(o.f[i].getValue() == ''){
					p = true;
					for(var j = 1; p && j <= n; j++){
						v = 'overlay_' + j;
						if(o.v.indexOf(v) < 0){
							o.f[i].defaultValue = v;
							o.f[i].setValue(v);
							o.v.push(v);
							p = false;
						}
					}
				}
			}
		},
		processRecord : function (a, h) {
			var j = this.items;
			var d = new Array();
			j.each(function (i) {
				if (i instanceof CQ.form.CustomMultiField.Item) {
					this.remove(i, true);
					this.findParentByType("form").getForm().remove(i)
				}
			}, this);
			var f = a.get(this.customMultiFieldName);
			if (!f) {
				f = 0
			}
			if (f == 1) {
				var g = this.addItem();
				g.processRecord(a, h)
			} else {
				for (var e = 0;
					e < f;
					e++) {
					var b = a.copy();
					for (c in b.data) {
						if (CQ.Ext.isArray(b.data[c])) {
							b.data[c] = b.data[c][e]
						}
					}
					var g = this.addItem();
					g.processRecord(b, h)
				}
			}
		}
	});
CQ.Ext.reg("custommultifield", CQ.form.CustomMultiField);
CQ.form.CustomMultiField.Item = CQ.Ext.extend(CQ.Ext.Panel, {
		constructor : function (b) {
			var d = this;
			this.field = CQ.Util.build(b.fieldConfig, true);
			var a = new Array();
			a.push({
				xtype : "panel",
				border : false,
				cellCls : "cq-multifield-itemct",
				items : d.field
			});
			if (!b.fieldConfig.readOnly) {
				a.push({
					xtype : "panel",
					border : false,
					items : {
						xtype : "button",
						iconCls : "cq-multifield-up",
                        template : new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
						handler : function () {
							var f = d.ownerCt;
							var e = f.items.indexOf(d);
							if (e > 0) {
								d.reorder(f.items.itemAt(e - 1))
							}
						}
					}
				});
				a.push({
					xtype : "panel",
					border : false,
					items : {
						xtype : "button",
						iconCls : "cq-multifield-down",
                        template : new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
						handler : function () {
							var f = d.ownerCt;
							var e = f.items.indexOf(d);
							if (e < f.items.getCount() - 1) {
								d.reorder(f.items.itemAt(e + 1))
							}
						}
					}
				});
				a.push({
					xtype : "panel",
					border : false,
					items : {
						xtype : "button",
						iconCls : "cq-multifield-remove",
                        template : new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
						handler : function () {
							var g = d.ownerCt;
							var f = g.items.getCount() - 1;
							for (var e = 0;
								e < d.field.items.getCount();
								e++) {
								d.ownerCt.remove(d.field.items.get(e));                               
							}
							d.ownerCt.remove(d);   
							//enableDynamicLoad(g); // Added for Tab Builder
                            g.setNumberOfItems(g.items.getCount() - 1)

						}
					}
				})
			}
			b = CQ.Util.applyDefaults(b, {
					layout : "table",
					anchor : "100%",
					border : false,
					layoutConfig : {
						columns : 4
					},
					defaults : {
						bodyStyle : "padding:3px"
					},
					items : a
				});
			CQ.form.CustomMultiField.Item.superclass.constructor.call(this, b);
			if (b.value) {
				this.field.setValue(b.value)
			}
		},
		reorder : function (b) {
			for (var a = 0;
				a < b.field.items.getCount();
				a++) {
				var d = b.field.items.get(a).getValue();
				b.field.items.get(a).setValue(this.field.items.get(a).getValue());
				this.field.items.get(a).setValue(d)
			}
		},
		getValue : function () {
			return this.field.getValue()
		},
		setValue : function (a) {
			this.field.setValue(a)
		},
		processRecord : function (a, b) {
			this.field.processRecord(a, b)
		}
	});
CQ.Ext.reg("custommultifielditem", CQ.form.CustomMultiField.Item);
