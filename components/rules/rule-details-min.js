(function(){var g=YAHOO.util.Dom,n=YAHOO.util.Event;var e=Alfresco.util.encodeHTML,f=Alfresco.util.siteURL;Alfresco.RuleDetails=function i(o){Alfresco.RuleDetails.superclass.constructor.call(this,"Alfresco.RuleDetails",o,[]);this.folderDetails=null;this.ruleDetails=null;this.rule=null;this.ruleConfigsAreReady=false;YAHOO.Bubbling.on("ruleSelected",this.onRuleSelected,this);return this};YAHOO.extend(Alfresco.RuleDetails,Alfresco.component.Base);YAHOO.lang.augmentProto(Alfresco.RuleDetails,Alfresco.RuleConfigUtil);YAHOO.lang.augmentObject(Alfresco.RuleDetails.prototype,{options:{nodeRef:null,siteId:""},folderDetails:null,ruleDetails:null,rule:null,ruleConfigsAreReady:false,onReady:function j(){this.loadRuleConfigs();this.widgets.displayEl=g.get(this.id+"-display");this.widgets.editButton=Alfresco.util.createYUIButton(this,"edit-button",this.onEditButtonClick);this.widgets.deleteButton=Alfresco.util.createYUIButton(this,"delete-button",this.onDeleteButtonClick)},onRuleConfigsLoaded:function h(){g.addClass(this.id+"-configsMessage","hidden");g.removeClass(this.id+"-configsContainer","hidden")},onRuleConfigsReady:function b(){this.ruleConfigsAreReady=true;this._displayRule()},onRuleSelected:function d(p,o){this.folderDetails=o[1].folderDetails;this.ruleDetails=o[1].ruleDetails;this._loadRule()},_loadRule:function a(){g.setStyle(this.widgets.displayEl,"display","none");var o=new Alfresco.util.NodeRef(this.folderDetails.nodeRef);Alfresco.util.Ajax.jsonGet({url:Alfresco.constants.PROXY_URI_RELATIVE+"api/node/"+o.uri+"/ruleset/rules/"+this.ruleDetails.id,successCallback:{fn:function(p){if(p.json){this.rule=p.json;this._displayRule()}},scope:this},failureCallback:{fn:function(p){Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.getRuleFailure",this.name)})},scope:this}})},_displayRule:function m(){if(this.ruleConfigsAreReady&&this.rule){if(this.rule.url.indexOf(Alfresco.util.NodeRef(this.options.nodeRef).uri)==-1){g.addClass(this.id+"-actions","hidden")}else{g.removeClass(this.id+"-actions","hidden")}if(!this.rule.action.conditions||this.rule.action.conditions.length==0){g.addClass(this.id+"-conditionSeparator","hidden")}else{g.removeClass(this.id+"-conditionSeparator","hidden")}g.get(this.id+"-title").innerHTML=e(this.rule.title);g.get(this.id+"-description").innerHTML=e(this.rule.description);g.removeClass(this.id+"-disabled","enabled");g.removeClass(this.id+"-disabled","disabled");g.addClass(this.id+"-disabled",this.rule.disabled==true?"disabled":"enabled");g.removeClass(this.id+"-executeAsynchronously","enabled");g.removeClass(this.id+"-executeAsynchronously","disabled");g.addClass(this.id+"-executeAsynchronously",this.rule.executeAsynchronously==true?"enabled":"disabled");g.removeClass(this.id+"-applyToChildren","enabled");g.removeClass(this.id+"-applyToChildren","disabled");g.addClass(this.id+"-applyToChildren",this.rule.applyToChildren==true?"enabled":"disabled");var o=this.displayRuleConfigs(this.rule,Alfresco.RuleConfig.MODE_TEXT,null);g.removeClass(this.id+"-body","both-conditions");if(o[1]>0&&o[2]>0){g.addClass(this.id+"-body","both-conditions")}Alfresco.util.Anim.fadeIn(this.widgets.displayEl)}},onEditButtonClick:function l(o){this.widgets.editButton.set("disabled",true);window.location.href=f("rule-edit?nodeRef={nodeRef}&ruleId={ruleId}",{nodeRef:Alfresco.util.NodeRef(this.options.nodeRef).toString(),ruleId:this.ruleDetails.id.toString()})},onDeleteButtonClick:function c(q){this.widgets.deleteButton.set("disabled",true);var p=this;Alfresco.util.PopupManager.displayPrompt({title:this.msg("message.confirm.delete.title"),text:this.msg("message.confirm.delete"),buttons:[{text:this.msg("button.delete"),handler:function r(){this.destroy();p._onDeleteRuleConfirmed.call(p)}},{text:this.msg("button.cancel"),handler:function o(){this.destroy();p.widgets.deleteButton.set("disabled",false)},isDefault:true}]})},_onDeleteRuleConfirmed:function k(){if(!this.widgets.deleteFeedbackMessage){this.widgets.deleteFeedbackMessage=Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.deletingRule",this.name),spanClass:"wait",displayTime:0})}else{this.widgets.deleteFeedbackMessage.show()}Alfresco.util.Ajax.request({method:Alfresco.util.Ajax.DELETE,url:Alfresco.constants.PROXY_URI_RELATIVE+"api/node/"+Alfresco.util.NodeRef(this.options.nodeRef).uri+"/ruleset/rules/"+this.ruleDetails.id,successCallback:{fn:function(o){this.widgets.deleteFeedbackMessage.hide();this.widgets.deleteButton.set("disabled",false);g.setStyle(this.widgets.displayEl,"display","none");YAHOO.Bubbling.fire("folderRulesDetailsChanged",{nodeRef:Alfresco.util.NodeRef(this.options.nodeRef)})},scope:this},failureCallback:{fn:function(o){this.widgets.feedbackMessage.destroy();Alfresco.util.PopupManager.displayMessage({text:Alfresco.util.message("message.deletingRule-failure",this.name)})},scope:this}})}},true)})();