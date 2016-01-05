

try {
    if (typeof HDSCORP == 'undefined') {
        HDSCORP = {}; // creating namespace
    }
    HDSCORP.SitemapDatacollection = CQ.Ext.extend(CQ.form.CompositeField, {

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    hiddenField : null,
    /**
     * @private
     * @type CQ.Ext.form.PathField
     */
    rowHeadingLabel : null,
    /**
     * @private
     * @type CQ.Ext.form.PathField
     */
    columnCount : null,
    /**
     * @private
     * @type CQ.Ext.form.MultiField
     */
    replaceMulti : null,    
    /**
     * @private
     * @type CQ.Ext.form.CheckBox
     */
    lastMod : null,
    /**
     * @private
     * @type CQ.Ext.form.ComboBox
     */
    changeFreq : null,
    /**
     * @private
     * @type CQ.Ext.form.ComboBox
     */
    priority : null,
    /**
     * @private
     * @type CQ.Ext.form.MultiField
     */
    columnContent : null,    
    /**
     * @private
     * @type CQ.Ext.form.CheckBox
     */
    temporaryDisable : null,

    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "padding" : 10,
            "style" : "padding:10px 0 0 5px;",
            "layout" : "form",
            "labelWidth" : 200
        };
        config = CQ.Util.applyDefaults(config, defaults);
        HDSCORP.SitemapDatacollection.superclass.constructor
                .call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        HDSCORP.SitemapDatacollection.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name : this.name
        });
        this.add(this.hiddenField);


        this.rowHeadingLabel = new CQ.Ext.form.TextField({
            fieldLabel : "Row Heading",
            fieldDescription: "This the heading that appears at the begining of the ROW.<br/> <p style='color:red;font-weight: bold;'>Each ROW should have equal number of columns.</p>",
            allowBlank: false,
            width : 400,
            listeners : {
                change : {
                    scope : this,
                    fn : this.updateHidden
                },
                dialogclose : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.rowHeadingLabel);
        this.columnCount = new CQ.Ext.form.TextField({
            fieldLabel : "Ignore this field",
            fieldDescription: "Ignore this field",
            hidden:true,
            defaultValue :"0",
            allowBlank: true,
            width : 400,
            listeners : {
                change : {
                    scope : this,
                    fn : this.updateHidden
                },
                dialogclose : {
                    scope : this,
                    fn : this.updateHidden
                },
            }
        });
        this.add(this.columnCount);

        this.columnContent = new CQ.form.MultiField({
            fieldLabel : "Add Columns",
            fieldDescription : "Click '+' to add columns<br/><p style='color:blue;font-weight: bold;'>Add Cell Content in the following format - 'Cell heading ~! Cell Content'. Use &lt;br/&gt; for line breaks.</p> <br/>Example - <p style='color:blue;font-weight: bold;'>G200 ~! 264 SFF &lt;br/&gt; 252 LFF</p>",
            width : 400,
            fieldConfig: {
                "xtype" : "textfield",
                allowBlank: false,                
            },
            listeners: {
                change: {
                    scope:this,
                    fn:this.updateHidden
                }
            }
        });
        this.add(this.columnContent);
    },
    // overriding CQ.form.CompositeField#setValue
    setValue : function(value) {

        var readVal = '';
        var storeVal = '';
        var replaceMultiValues = '';
        var lastModVal = '';
        var changeFreqVal = '';
        var priorityVal = '';
        var temporaryDisableVal = '';
        var columnContentValues = '';        
        if (value) {
            var colValue = value.split('|');
            if (colValue.length > 0) {
                //temporaryDisableVal = colValue[0];
                readVal             = colValue[0];
                storeVal            = colValue[1];
                //replaceMultiValues  = colValue[3];
                //lastModVal          = colValue[4];
                ///changeFreqVal       = colValue[5];
                //priorityVal         = colValue[6];
                columnContentValues = colValue[2];
            }
        }
        this.rowHeadingLabel.setValue(readVal);
        this.columnCount.setValue(storeVal);
        //this.replaceMulti.setValue(replaceMultiValues.split(','));
        //this.lastMod.setValue(lastModVal);
        //this.changeFreq.setValue(changeFreqVal);
        //this.priority.setValue(priorityVal);
        //this.temporaryDisable.setValue(temporaryDisableVal);
        this.columnContent.setValue(columnContentValues.split(','));    
    },    
    // overriding CQ.form.CompositeField#getValue
    getValue : function() {
        return this.getRawValue();
    },
    getRawValue : function() {

        //var temporaryDisableVal = this.temporaryDisable.getValue() || "";
        var readVal             = this.rowHeadingLabel.getValue() || "";
        var storeVal            = this.columnCount.getValue() || "";
        //var replaceMultiValues  = this.replaceMulti.getValue() || "";
       // var lastModVal          = this.lastMod.getValue() || "";
        //var changeFreqVal       = this.changeFreq.getValue() || "";
        //var priorityVal         = this.priority.getValue() || "";
        var columnContentValues = this.columnContent.getValue() || "";
       // if (temporaryDisableVal == '')
       //     temporaryDisableVal = " ";
        var value = readVal + "|" + storeVal + "|" + columnContentValues;
        this.hiddenField.setValue(value);
        return value;
    },
    updateHidden : function() {
        this.hiddenField.setValue(this.getValue());
    },
        destroyRichText : function(){
    this.el.dom={};
}
});
    CQ.Ext.reg('techspecnestedmultifield', HDSCORP.SitemapDatacollection);
} catch (e) {
    // suppressing error.
    // error occurs for CQ.form.CompositeField in mobile devices.
}


try {
    if (typeof HDSCORP == 'undefined') {
        HDSCORP = {}; // creating namespace
    }
    HDSCORP.SitemapDatacollectionReplaceMulti = CQ.Ext.extend(CQ.form.CompositeField, {

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    hiddenReplaceMultiField : null,
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    replaceWhat : null,    
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    replaceWith : null,

    constructor : function(config) {
        config = config || {};
        var defaults = {
            "border" : true,
            "padding" : 10,
            "style" : "padding:10px 0 0 5px;",
            "layout" : "form",
        };
        config = CQ.Util.applyDefaults(config, defaults);
        HDSCORP.SitemapDatacollectionReplaceMulti.superclass.constructor
                .call(this, config);
    },

    // overriding CQ.Ext.Component#initComponent
    initComponent : function() {
        HDSCORP.SitemapDatacollectionReplaceMulti.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenReplaceMultiField = new CQ.Ext.form.Hidden({
            name : this.name
        });
        this.add(this.hiddenReplaceMultiField);
        this.replaceWhat = new CQ.Ext.form.TextField({
            fieldLabel : "Skill",
            fieldDescription: "text that we want to be replaced in site map",
            width : 400,
            regex: /^[A-Za-z0-9-_\/\.]+$/,
            regexText: "Only alphanumeric with -, _ and / allowed.",
            listeners : {
                change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
       });
        this.add(this.replaceWhat);        
        this.replaceWith = new CQ.Ext.form.TextField({
            fieldLabel : "Replace with",
            fieldDescription: "text that we want to be replaced with in site map",
            width : 400,
            regex: /^[A-Za-z0-9-_\/:\.]+$/,
            regexText: "Only alphanumeric with -, _ and / allowed.",
            listeners : {
                change : {
                    scope : this,
                    fn : this.updateHidden
                }
            }
        });
        this.add(this.replaceWith);
    },
    // overriding CQ.form.CompositeField#setValue
    setValue : function(value) {
        var replaceWhatVal = '';
        var replaceWithVal = '';
        if (value) {
            var colValue = value.split('~');
            if (colValue.length > 0) {
                replaceWhatVal      = colValue[0];
                replaceWithVal      = colValue[1];
            }
        }
        this.replaceWhat.setValue(replaceWhatVal);
        this.replaceWith.setValue(replaceWithVal);
    },    
    // overriding CQ.form.CompositeField#getValue
    getValue : function() {
        return this.getRawValue();
    },
    getRawValue : function() {
        var replaceWhatVal      = this.replaceWhat.getValue() || "";
        var replaceWithVal      = this.replaceWith.getValue() || "";
        var value = replaceWhatVal + "~"  + replaceWithVal;
        this.hiddenReplaceMultiField.setValue(value);
        return value;
    },
    updateHidden : function() {
        this.hiddenReplaceMultiField.setValue(this.getValue());
    }
});
    CQ.Ext.reg('projectSet', HDSCORP.SitemapDatacollectionReplaceMulti);
} catch (e) {
    // suppressing error.
    // error occurs for CQ.form.CompositeField in mobile devices.
}



