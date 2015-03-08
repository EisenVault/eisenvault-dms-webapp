define(["dojo/_base/declare","alfresco/menus/AlfMenuBarItem","alfresco/documentlibrary/_AlfDocumentListTopicMixin","dojo/dom-construct","dojo/dom-class","dojo/dom-attr","dojo/_base/lang","dojo/hash","dojo/io-query"],function(h,n,f,c,m,k,b,g,e){return h([n,f],{cssRequirements:[{cssFile:"./css/AlfMenuBarToggle.css"}],i18nRequirements:[{i18nFile:"./i18n/AlfMenuBarToggle.properties"}],checked:false,onConfig:null,offConfig:null,constructor:function j(p){this.alfLog("log","Create toggle",p);if(this.onConfig==null){this.onConfig={label:"default.on.label"}}if(this.offConfig==null){this.offConfig={label:"default.off.label"}}},subscriptionTopic:null,subscriptionAttribute:"value",checkedValue:"true",postMixInProperties:function l(){if(this.subscriptionTopic){this.alfSubscribe(this.subscriptionTopic,b.hitch(this,this.setState))}},hashName:null,postCreate:function a(){if(this.onConfig&&this.onConfig.iconClass){this.iconClass=this.onConfig.iconClass}else{if(this.offConfig&&this.offConfig.iconClass){this.iconClass=this.offConfig.iconClass}}if(this.hashName){var p=e.queryToObject(g());this.checked=(p[this.hashName]&&p[this.hashName]==="true");this.alfSubscribe(this.filterChangeTopic,b.hitch(this,"setState"))}this.inherited(arguments);if(this.checked){this.renderToggle(this.onConfig,this.offConfig)}else{this.renderToggle(this.offConfig,this.onConfig)}},renderToggle:function i(q,p){if(q&&q.label){this.label=q.label;this.set("label",this.message(q.label));this.title=q.title}if(q&&q.title){this.title=q.title;this.set("title",this.message(q.title))}if(q&&q.iconAltText){this.iconAltText=q.iconAltText;k.set(this.iconNode,"alt",q.iconAltText)}if(p&&p.iconClass){m.remove(this.iconNode,p.iconClass)}if(q&&q.iconClass){this.iconClass=q.iconClass;m.add(this.iconNode,q.iconClass)}m.remove(this.domNode,"dijitMenuItemSelected")},onClick:function d(){this.alfLog("log","Toggling!");this.checked=!this.checked;if(this.checked){this.renderToggle(this.onConfig,this.offConfig);if(this.onConfig.publishTopic){this.alfPublish(this.onConfig.publishTopic,this.onConfig.publishPayload)}}else{this.renderToggle(this.offConfig,this.onConfig);if(this.offConfig.publishTopic){this.alfPublish(this.offConfig.publishTopic,this.offConfig.publishPayload)}}},setState:function o(p){if(p&&p[this.subscriptionAttribute]!=null){this.alfLog("log","Setting toggle state",p,this);this.checked=(this.checkedValue==p[this.subscriptionAttribute]);if(this.checked){this.renderToggle(this.onConfig,this.offConfig)}else{this.renderToggle(this.offConfig,this.onConfig)}}}})});