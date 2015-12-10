CQ.form.CustomCompositeField=CQ.Ext.extend(CQ.form.CompositeField,{constructor:function(a){this.config=a||{};
this.componentItems=new Array();
var b={border:false,layout:"form",layoutConfig:{columns:"1"}};
this.config=CQ.Util.applyDefaults(a,b);
CQ.form.CustomGenericList.superclass.constructor.call(this,a)
},initComponent:function(){CQ.form.CustomCompositeField.superclass.initComponent.call(this);
for(var b=0;
b<this.config.length;
b++){var a=this.config[b].name.replace("./","");
this.componentItems[a]=this.add(this.config[b]);
this.componentItems[a].width="85%";
if(CQ.Ext.isSafari){this.componentItems[a].width="85%"
}if(this.componentItems[a].isXType("trigger")&&!this.componentItems[a].style){this.componentItems[a].style="width:83%";
if(CQ.Ext.isSafari){this.componentItems[a].style="width:85%"
}}if(this.componentItems[a].isXType("selection")){this.componentItems[a].width="70%";
this.componentItems[a].style="width:70%"
}}},processRecord:function(a,b){for(var d in this.componentItems){if(typeof(this.componentItems[d])==="function"){continue
}if(this.componentItems[d].processInit){this.componentItems[d].processInit(b,a)
}if(!this.componentItems[d].initialConfig.ignoreData){this.componentItems[d].processRecord(a,b)
}}},setValue:function(b){for(var a=0;
a<this.config.length;
a++){this.componentItems[a].setValue(b.items.get(a).getValue())
}},getValue:function(){var b=new Array();
for(var a=0;
a<this.componentItems.length;
a++){b[a]=this.componentItems[a].getValue()
}return b
}});
CQ.Ext.reg("customcompositefield",CQ.form.CustomCompositeField);