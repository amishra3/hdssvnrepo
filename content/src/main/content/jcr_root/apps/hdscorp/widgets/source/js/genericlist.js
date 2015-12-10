CQ.form.CustomGenericList=CQ.Ext.extend(CQ.form.CompositeField,{constructor:function(a){this.config=a||{};
this.componentItems=new Array();
var b={border:false,layout:"form",layoutConfig:{columns:"1"}};
this.config=CQ.Util.applyDefaults(a,b);
CQ.form.CustomGenericList.superclass.constructor.call(this,a)
},initComponent:function(){for(var b=0;
b<this.config.length;
b++){var a=this.config[b].name.replace("./","");
this.componentItems[a]=this.add(this.config[b])
}},processRecord:function(a,b){for(var d in this.componentItems){if(typeof(this.componentItems[d])==="function"){continue
}if(this.componentItems[d].processInit){this.componentItems[d].processInit(b,a)
}if(!this.componentItems[d].initialConfig.ignoreData){this.componentItems[d].processRecord(a,b)
}}},setValue:function(a){for(var b in a){this.componentItems[b].setValue(a[b])
}},getValue:function(){var b=new Array();
for(var a=0;
a<this.componentItems.length;
a++){b[a]=this.componentItems[a].getValue()
}return b
},setParName:function(a){}});
CQ.Ext.reg("customgenericlist",CQ.form.CustomGenericList);