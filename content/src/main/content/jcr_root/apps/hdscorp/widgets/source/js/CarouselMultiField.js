CarouselXType = {};

CarouselXType.Selection = CQ.Ext.extend(CQ.form.CompositeField, {

        text : "default text",
        constructor : function (config) {

            if (config!=null && config.text != null)
                this.text = config.text;
            var defaults = {
                height : "auto",
                border : true,
                layoutConfig : {
                    labelSeparator : CQ.themes.Dialog.LABEL_SEPARATOR
                },
                defaults : {
                    msgTarget : CQ.themes.Dialog.MSG_TARGET
                }
            };

            CQ.Util.applyDefaults(config, defaults);
            CarouselXType.Selection.superclass.constructor.call(this, config);

            
            this.panelLabel = new CQ.Ext.form.Label({
              name : this.name,
              width : 300,
              labelStyle : "padding:3px",
              readOnly : false,
              text :"SLIDE #"
              //fieldLabel : 'Tagline Text Color',
              //fieldDescription :'Enter the Hex Code for the color'
            });
            this.add(this.panelLabel);
            
            this.carouselType = new CQ.form.Selection({
            	type : 'select',
              name : this.name,
              width : 300,
              readOnly : false,
              allowBlank : false,
              labelStyle : "padding:3px",
              fieldLabel : 'Slide Type',
              defaultValue : 'Image',
              fieldDescription :'Select the slide type either Image or Video',
              value : 'Image',
              options: [
            	        {"text":"Image", "value":"Image"},
            	        {"text":"Video", "value":"Video"}
            	    ],
        	    listeners: {
	       					selectionchanged: {
			      						scope: this,
			       						fn: this.updateFields
	       							},
	   							afterlayout: {
			      						scope: this,
			       						fn: this.updateFields
	       							}
      					}
            });
            this.add(this.carouselType);
                                   
            
            this.carouselImage = new CQ.form.PathField({
                    name : this.name,
                    width : 300,
                    labelStyle : "padding:3px",
                    allowBlank : false,
                    fieldLabel : 'Image Path ',
                    rootPath: '/content/dam'
                });
            this.add(this.carouselImage);
            
            this.altImage = new CQ.Ext.form.TextField({
                name : this.name,
                width : 300,
                labelStyle : "padding:3px",
                //emptyText : 'Item Title',
                readOnly : false,
                maxLength : 50,
                maxLengthText : "Alternate Image Text cannot exceed 50 characters",
                fieldLabel : 'Alternate Image Text'
                //fieldDescription :'Enter the Hex Code for the color (Eg: #B22222)'
              });
              this.add(this.altImage);
                                               
            this.carouselVideo = new CQ.Ext.form.TextField({
              name : this.name,
              width : 300,
              labelStyle : "padding:3px",
              //emptyText : 'Item Title',
              readOnly : false,
              fieldLabel : 'Video ID',
              fieldDescription :'Please provide only youtube video id. (Eg : yaGF6fxqV44)'
            });
            this.add(this.carouselVideo);
            
            this.tagHeader = new CQ.Ext.form.TextArea({
              name : this.name,
              width : 300,
              height : 50,
              labelStyle : "padding:3px",
              maxLength : 60,
              maxLengthText : "Header limit cannot exceed 60 characters",
              //emptyText : 'Item Title',
              readOnly : false,
              fieldLabel : 'Tagline Header'
              //fieldDescription :'Enter the Hex Code for the color'
            });
            this.add(this.tagHeader);
            
            this.tagLine = new CQ.Ext.form.TextArea({
              name : this.name,
              width : 300,
              height : 50,
              labelStyle : "padding:3px",
              maxLength : 200,
              maxLengthText : "Tagline limit cannot exceed 200 characters",
              //emptyText : 'Item Title',
              readOnly : false,
              fieldLabel : 'Tagline Text '
              //fieldDescription :'Enter the Hex Code for the color'
            });
            this.add(this.tagLine);
            
            this.tagLineStyle = new CQ.form.Selection({
            	type : 'select',
              name : this.name,
              width : 110,
              labelStyle : "padding:3px",
              readOnly : false,              
              fieldLabel : 'Tagline Alignment ',
              fieldDescription :'Select alignment of tagline (Left or Right)',
              defaultValue : 'Text on Right',
              value : 'Text on Right',
              //activeItem : 0,
              options: [
            	        {"text":"Text on Right", "value":"Text on Right"},
            	        {"text":"Text on left", "value":"Text on left"}
            	    ]
            });
            this.add(this.tagLineStyle);
            
            this.fontColor = new CQ.Ext.form.TextField({
              name : this.name,
              width : 110,
              labelStyle : "padding:3px",
              //emptyText : 'Item Title',
              readOnly : false,
              maxLength : 7,
              maxLengthText : "Hex code cannot exceed 7 characters",
              fieldLabel : 'Tagline Text Color',
              fieldDescription :'Enter the Hex Code for the color (Eg: #B22222)'
            });
            this.add(this.fontColor);

            this.videoCaption = new CQ.Ext.form.TextField({
              name : this.name,
              width : 300,
              labelStyle : "padding:3px",
              //emptyText : 'Item Title',
              readOnly : false,
              maxLength : 55,
              maxLengthText : "Video caption cannot exceed 55 characters",
              fieldLabel : 'Video Caption'
              //fieldDescription :'Enter the Hex Code for the color (Eg: #B22222)'
            });
            this.add(this.videoCaption);
            
            this.videoDescription = new CQ.Ext.form.TextArea({
              name : this.name,
              width : 300,
              height : 50,
              labelStyle : "padding:3px",
              maxLength : 190,
              maxLengthText : "Video description limit cannot exceed 190 characters",
              //emptyText : 'Item Title',
              readOnly : false,
              fieldLabel : 'Video Description'
              //fieldDescription :'Enter the Hex Code for the color'
            });
            this.add(this.videoDescription);

            this.buttonCaption = new CQ.Ext.form.TextField({
              name : this.name,
              width : 300,
              labelStyle : "padding:3px",
              //emptyText : 'Item Title',
              readOnly : false,
              maxLength : 30,
              maxLengthText : "Button caption cannot exceed 30 characters",
              fieldLabel : 'Button Caption'
              //fieldDescription :'Enter the Hex Code for the color (Eg: #B22222)'
            });
            this.add(this.buttonCaption);
            
            this.buttonLink = new CQ.form.PathField({
              name : this.name,
              width : 300,
              labelStyle : "padding:3px",
              allowBlank : true,
              fieldLabel : 'Button Link'
              //rootPath: '/content/dam'
          });
      this.add(this.buttonLink);

        },
        processRecord : function (record, path) {
            if (record.get(this.name) != null && CQ.Ext.isArray(record.get(this.name))) {
            	this.carouselType.setValue(record.get(this.name)[0]);
            	this.carouselImage.setValue(record.get(this.name)[1]);
            	this.altImage.setValue(record.get(this.name)[2]);            	
            	this.carouselVideo.setValue(record.get(this.name)[3]);
            	this.tagHeader.setValue(record.get(this.name)[4]);
            	this.tagLine.setValue(record.get(this.name)[5]);
            	this.tagLineStyle.setValue(record.get(this.name)[6]);
            	this.fontColor.setValue(record.get(this.name)[7]);
            	this.videoCaption.setValue(record.get(this.name)[8]);
            	this.videoDescription.setValue(record.get(this.name)[9]);
            	
            	this.buttonCaption.setValue(record.get(this.name)[10]);
            	this.buttonLink.setValue(record.get(this.name)[11]);
            	
            }
        },
        setValue : function (v) {
        	if (v!=null) {
                var args = v.split("^");
                this.panelLabel.setText(args[0]);
                this.carouselType.setValue(args[1]);
                this.carouselImage.setValue(args[2]);
                this.altImage.setValue(args[3]);                
                this.carouselVideo.setValue(args[4]); 
                this.tagHeader.setValue(args[5]);
                this.tagLine.setValue(args[6]);
                this.tagLineStyle.setValue(args[7]);
                this.fontColor.setValue(args[8]);
                this.videoCaption.setValue(args[9]);
                this.videoDescription.setValue(args[10]);
                              
                this.buttonCaption.setValue(args[11]);
                this.buttonLink.setValue(args[12]);
                              
            }
            this.updateFields();
            return this;
        },
        updateFields: function () {           	
        	if(this.carouselType.getValue()=='Image'){
        	this.carouselType.show();
            this.carouselImage.show();
            this.altImage.show();
            this.tagLine.show();
            this.tagHeader.show();
            this.tagLineStyle.show();
            this.fontColor.show();
            this.carouselVideo.hide();     
            this.videoCaption.hide();
            this.videoDescription.hide();
            
            this.buttonCaption.show();
            this.buttonLink.show();
            
            this.carouselVideo.setValue("");
            this.videoDescription.setValue("");
            this.videoCaption.setValue("");
        	}else{
        	this.carouselType.show();
            this.carouselImage.show();
            this.altImage.show();
            this.tagLine.hide();
            this.tagHeader.hide();
            this.tagLineStyle.hide();
            this.fontColor.hide();
            this.carouselVideo.show();     
            this.videoCaption.show();
            this.videoDescription.show();
            
            this.buttonCaption.hide();
            this.buttonLink.hide();
            
            this.tagLine.setValue("");
            this.tagHeader.setValue("");
            this.fontColor.setValue("");
            this.buttonCaption.setValue("");
        	}
    		}
    });
CQ.Ext.reg("carouselitem", CarouselXType.Selection);
