(function(){var h=YAHOO.util.Dom,c=YAHOO.util.Element;Alfresco.module.EditSite=function(o){this.name="Alfresco.module.EditSite";this.id=o;var n=Alfresco.util.ComponentManager.get(this.id);if(n!==null){throw new Error("An instance of Alfresco.module.EditSite already exists.")}this.editPanelActive=false;Alfresco.util.ComponentManager.register(this);Alfresco.util.YUILoaderHelper.require(["button","container","connection","selector","json","event"],this.onComponentsLoaded,this);return this};Alfresco.module.EditSite.prototype={editPanelActive:false,widgets:{},setMessages:function m(n){Alfresco.util.addMessages(n,this.name);return this},onComponentsLoaded:function j(){if(this.id===null){return}},defaultShowConfig:{},showConfig:{},show:function f(n){if(!this.editPanelActive){this.editPanelActive=true;this.showConfig=YAHOO.lang.merge(this.defaultShowConfig,n);if(this.showConfig.shortName===undefined){this.editPanelActive=false;throw new Error("A shortName must be provided")}if(this.widgets.panel){this.widgets.panel.destroy();this.widgets={}}Alfresco.util.Ajax.request({url:Alfresco.constants.URL_SERVICECONTEXT+"modules/edit-site",dataObj:{htmlid:this.id,shortName:this.showConfig.shortName},successCallback:{fn:this.onTemplateLoaded,scope:this},execScripts:true,failureMessage:"Could not load edit site template"})}},onTemplateLoaded:function g(n){var q=document.createElement("div");q.innerHTML=n.serverResponse.responseText;var o=YAHOO.util.Dom.getFirstChild(q);this.widgets.panel=Alfresco.util.createYUIPanel(o,{close:false});this.widgets.cancelButton=Alfresco.util.createYUIButton(this,"cancel-button",this.onCancelButtonClick);this.widgets.okButton=Alfresco.util.createYUIButton(this,"ok-button",null,{type:"submit"});var p=new Alfresco.forms.Form(this.id+"-form");p.addValidation(this.id+"-title",Alfresco.forms.validation.mandatory,null,"keyup");p.addValidation(this.id+"-title",Alfresco.forms.validation.length,{max:256,crop:true},"keyup");p.addValidation(this.id+"-description",Alfresco.forms.validation.length,{max:512,crop:true},"keyup");p.setSubmitElements(this.widgets.okButton);p.doBeforeFormSubmit={fn:this.doBeforeFormSubmit,obj:null,scope:this};p.setAJAXSubmit(true,{successCallback:{fn:this.onEditSiteSuccess,scope:this},failureCallback:{fn:this.onEditSiteFailure,scope:this}});p.setSubmitAsJSON(true);p.setAjaxSubmitMethod("PUT");p.applyTabFix();p.doBeforeAjaxRequest={fn:this.doBeforeAjaxRequest,scope:this};p.init();this.widgets.siteVisibility=h.get(this.id+"-visibility");this.widgets.isPublic=h.get(this.id+"-isPublic");this.widgets.isModerated=h.get(this.id+"-isModerated");this.widgets.isPrivate=h.get(this.id+"-isPrivate");YAHOO.util.Event.addListener(this.widgets.isPublic,"change",this.onVisibilityChange,this,true);YAHOO.util.Event.addListener(this.widgets.isPrivate,"change",this.onVisibilityChange,this,true);this._showPanel()},doBeforeFormSubmit:function(){var o=YAHOO.util.Dom.get(this.id+"-form");o.attributes.action.nodeValue=Alfresco.constants.PROXY_URI+"api/sites/"+this.showConfig.shortName;var n="PUBLIC";if(this.widgets.isPublic.checked){if(this.widgets.isModerated.checked){n="MODERATED"}}else{n="PRIVATE"}this.widgets.siteVisibility.value=n;this.widgets.cancelButton.set("disabled",true);this.widgets.panel.hide();this.widgets.feedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.saving",this.name),spanClass:"wait",displayTime:0})},doBeforeAjaxRequest:function i(n){return true},onVisibilityChange:function b(p,n){var o=new c(this.widgets.isModerated);o.set("disabled",!new c(this.widgets.isPublic).get("checked"));o.set("checked",false)},onCancelButtonClick:function e(o,n){this.widgets.panel.hide();this.editPanelActive=false},onEditSiteSuccess:function k(n){if(n.json!==undefined&&n.json.shortName){document.location.href=Alfresco.constants.URL_PAGECONTEXT+"site/"+n.json.shortName+"/dashboard"}else{this._adjustGUIAfterFailure(n)}},onEditSiteFailure:function a(n){this._adjustGUIAfterFailure(n)},_adjustGUIAfterFailure:function d(n){this.widgets.feedbackMessage.destroy();this.widgets.cancelButton.set("disabled",false);this.widgets.panel.show();var p=Alfresco.util.message("message.failure",this.name);if(n.json.message){var o=Alfresco.util.message(n.json.message,this.name);p=o?o:p}Alfresco.util.PopupManager.displayPrompt({text:p})},_showPanel:function l(){this.widgets.panel.show();Alfresco.util.caretFix(this.id+"-form");var n=new YAHOO.util.KeyListener(document,{keys:YAHOO.util.KeyListener.KEY.ESCAPE},{fn:function(p,o){this.onCancelButtonClick()},scope:this,correctScope:true});n.enable();YAHOO.util.Dom.get(this.id+"-title").focus()}}})();Alfresco.module.getEditSiteInstance=function(){var a="alfresco-editSite-instance";return Alfresco.util.ComponentManager.get(a)||new Alfresco.module.EditSite(a)};