define(["dojo/_base/declare","alfresco/core/Core","alfresco/services/_PreferenceServiceTopicMixin","dojo/_base/lang","dojo/dom-class","dojo/_base/window","dojo/sniff","dijit/registry","alfresco/dialogs/AlfDialog","alfresco/buttons/AlfButton","alfresco/logging/SubscriptionLog","alfresco/debug/CoreDataDebugger"],function(t,p,f,w,n,g,v,l,k,q,h,o){return t([p,f],{i18nRequirements:[{i18nFile:"./i18n/LoggingService.properties"}],loggingPreferencesId:"org.alfresco.share.logging",logSubscriptionHandle:null,constructor:function s(x){w.mixin(this,x);this.alfSubscribe("ALF_LOGGING_STATUS_CHANGE",w.hitch(this,"onLoggingStatusChange"));this.alfSubscribe("ALF_UPDATE_LOGGING_PREFERENCES",w.hitch(this,"onDetailsDialog"));this.alfSubscribe("ALF_SHOW_PUBSUB_LOG",w.hitch(this,"showPubSubLog"));this.alfSubscribe("ALF_SHOW_DATA_MODEL",w.hitch(this,"showDataModel"));this.alfSubscribe("ALF_TOGGLE_DEVELOPER_MODE",w.hitch(this,this.toggleDeveloperMode));if(this.loggingPreferences!=null){this.handleSubscription()}this.alfPublish(this.getPreferenceTopic,{preference:this.loggingPreferencesId,callback:this.setLoggingStatus,callbackScope:this})},toggleDeveloperMode:function u(){n.toggle(g.body(),"alfresco-developer-mode-Enabled")},showPubSubLog:function i(x){if(this.pubSubLog==null){this.pubSubLog=new k({title:this.message("logging.pubSubLog.title"),fixedWidth:true,handleOverflow:true,widgetsContent:[{name:"alfresco/logging/SubscriptionLog"}]})}this.pubSubLog.show()},showDataModel:function d(y){var x=new k({pubSubScope:this.pubSubScope,title:this.message("logging.dataModel.title"),widgetsContent:[{name:"alfresco/debug/CoreDataDebugger"}]});x.show()},onLoggingStatusChange:function b(x){if(w.exists("selected",x)&&w.exists("value",x)){this.alfPublish(this.setPreferenceTopic,{preference:this.loggingPreferencesId+"."+x.value,value:(x.selected===true)});this.loggingPreferences[x.value]=(x.selected===true);this.handleSubscription()}},setLoggingStatus:function m(x){if(x==null){x={}}this.loggingPreferences=x;this.handleSubscription()},handleSubscription:function r(){if(this.loggingPreferences.enabled&&this.logSubscriptionHandle==null){this.logSubscriptionHandle=this.alfSubscribe(this.alfLoggingTopic,w.hitch(this,"onLogRequest"))}else{if(!this.loggingPreferences.enabled&&this.logSubscriptionHandle!=null){this.alfUnsubscribe(this.logSubscriptionHandle);this.logSubscriptionHandle=null}}},detailsDialog:null,saveLoggingPrefsUpdateTopic:"ALF_SAVE_LOGGING_PREFERNCES_UPDATE",cancelLoggingPrefsUpdateTopic:"ALF_CANCEL_LOGGING_PREFERNCES_UPDATE",onDetailsDialog:function j(x){if(this.detailsDialog==null){this.alfSubscribe(this.saveLoggingPrefsUpdateTopic,w.hitch(this,"onPrefsUpdateSave"));this.alfSubscribe(this.cancelLoggingPrefsUpdateTopic,w.hitch(this,"onPrefsUpdateCancel"));this.detailsDialog=new k({title:this.message("logging.preferences.title"),widgetsContent:[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{id:this.id+"_LOGGING_FILTER",name:"filter",label:this.message("filter.label"),description:this.message("filter.description"),value:(this.loggingPreferences.filter!=null)?this.loggingPreferences.filter:""}}],widgetsButtons:[{name:"alfresco/buttons/AlfButton",config:{label:this.message("button.save-logging-prefs"),publishTopic:this.saveLoggingPrefsUpdateTopic,publishPayload:x}},{name:"alfresco/buttons/AlfButton",config:{label:this.message("button.cancel-logging-prefs-update"),publishTopic:this.cancelLoggingPrefsUpdateTopic,publishPayload:x}}]})}this.detailsDialog.show()},onPrefsUpdateSave:function a(y){var x=l.byId(this.id+"_LOGGING_FILTER");if(x!=null){var z=x.getValue();this.alfPublish(this.setPreferenceTopic,{preference:this.loggingPreferencesId+".filter",value:z});this.loggingPreferences.filter=z}},onPrefsUpdateCancel:function e(y){var x=l.byId(this.id+"_LOGGING_FILTER");if(x!=null){x.setValue((this.loggingPreferences.filter!=null)?this.loggingPreferences.filter:"")}},loggingPreferences:null,onLogRequest:function c(D){if(D&&D.severity&&D.messageArgs&&(this.loggingPreferences.all===true||this.loggingPreferences[D.severity]===true)){if(typeof console[D.severity]!="function"&&(v("ie")<=9)){console.error("The supplied severity is not a function of console",D.severity)}else{var A=D.callerName;if(A&&A!==""){var C=A.lastIndexOf("__"),y=/([^_])(_){1}/g;if(C!=-1){var z=A.substring(0,C);var B=A.substring(C+2);A=z.replace(y,"$1/")+"["+B+"] >> "}else{A=A+" >> "}}else{A=""}var x=true;if(this.loggingPreferences.filter!=null){var E=new RegExp(this.loggingPreferences.filter);x=E.test(A)}if(x||v("ie")){D.messageArgs[0]=A+D.messageArgs[0];if(v("ie")<=8){console.log(D.messageArgs)}else{if(v("ie")<=10){if(D.severity=="error"){console.error.apply(this,D.messageArgs)}else{console.log.apply(this,D.messageArgs)}}else{console[D.severity].apply(console,D.messageArgs)}}}}}}})});