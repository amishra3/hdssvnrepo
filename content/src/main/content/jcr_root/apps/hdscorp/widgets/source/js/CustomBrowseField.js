CQ.form.CustomBrowseField=CQ.Ext.extend(CQ.Ext.form.CustomTriggerField,{content:null,browseDialog:null,onTriggerClick:function(){if(this.disabled){return
}if(this.browseDialog==null){var a={"jcr:primaryType":"cq:BrowseDialog",ok:function(){if(this.browseField){if(this.browseField.formatHtmlLink){var b=this.browseField.getParagraphAnchor();
b=b==""?b:"#"+b;
this.browseField.setValue(this.getSelectedPath()+".html"+b)
}else{this.browseField.setValue(this.getSelectedPath())
}this.browseField.fireEvent("dialogSelect",this)
}this.hide()
},parBrowse:this.parBrowse,treeRoot:this.treeRoot,treeLoader:this.treeLoader,listeners:{hide:function(){if(this.browseField){this.browseField.fireEvent("browsedialog.closed")
}}}};
this.browseDialog=new CQ.Util.build(a);
this.browseDialog.browseField=this;
this.browseDialog.loadContent(this.content)
}this.browseDialog.show();
this.fireEvent("browsedialog.opened")
},constructor:function(a){CQ.form.CustomBrowseField.superclass.constructor.call(this,a);
this.addEvents("browsedialog.opened","browssedialog.closed")
},initComponent:function(){CQ.form.CustomBrowseField.superclass.initComponent.call(this);
this.addEvents("dialogSelect")
},getParagraphAnchor:function(){return this.browseDialog.getSelectedAnchor()
}});
CQ.Ext.reg("custombrowsefield",CQ.form.CustomBrowseField);