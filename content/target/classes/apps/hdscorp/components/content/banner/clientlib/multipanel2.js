var MyClientLib1 = MyClientLib1 || {};

MyClientLib1.MyMultiPanel1 = CQ.Ext.extend(CQ.Ext.Panel, {
    panelValue: '',

    constructor: function(config){
        config = config || {};
        MyClientLib1.MyMultiPanel1.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        MyClientLib1.MyMultiPanel1.superclass.initComponent.call(this);

        this.panelValue = new CQ.Ext.form.Hidden({
            name: this.name
        });

        this.add(this.panelValue);

        var dialog = this.findParentByType('dialog');


        dialog.on('beforesubmit', function(){
            var value = this.getValue();

            if(value){
                this.panelValue.setValue(value);
            }
        },this);
    },

    getValue: function () {
        var pData = {};

        this.items.each(function(i){
            if(i.xtype == "label" || i.xtype == "hidden" || !i.hasOwnProperty("dNameType2")){
                return;
            }

            pData[i.dNameType2] = i.getValue();
        });

        return $.isEmptyObject(pData) ? "" : JSON.stringify(pData);
    },

    setValue: function (value) {
        this.panelValue.setValue(value);
        var pData = JSON.parse(value);
        this.items.each(function(i){
            if(i.xtype == "label" || i.xtype == "hidden" || !i.hasOwnProperty("dNameType2")){
                return;
            }

            if(!pData[i.dNameType2]){
                return;
            }

            i.setValue(pData[i.dNameType2]);
        });
    },

    validate: function(){
        return true;
    },

    getName: function(){
        return this.name;
    }
});
//CQ.Ext.reg("mymultipanel1", MyClientLib1.MyMultiPanel1);