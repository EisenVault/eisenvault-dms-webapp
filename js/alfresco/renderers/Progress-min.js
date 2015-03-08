define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","alfresco/core/Core","dojo/text!./templates/Progress.html","dojo/_base/lang","dojo/dom-style"],function(o,b,j,g,q,r,i){return o([b,g,j],{i18nRequirements:[{i18nFile:"./i18n/Progress.properties"}],cssRequirements:[{cssFile:"./css/Progress.css"}],templateString:q,renderProgressUITopic:"ALF_PROGRESS_RENDER",postCreate:function f(){this.labelNode.innerHTML=this.message("renderer.progress.creating");this.alfSubscribe("ALF_CLOSE_DIALOG",r.hitch(this,this.cleanUp));this.alfSubscribe(this.renderProgressUITopic,r.hitch(this,this.onRenderUI));this.onRequestProgress()},onRequestProgress:function e(){this.alfLog("info","Requesting progress");if(!this.requestProgressTopic){this.alfLog("error","I don't know where to request progress from: requestProgressTopic not set!"+this);return}if(!this.nodes){this.alfLog("error","No nodes to request progress for. Please check you're setting 'nodes' in widget Config."+this.config);return}var u=this.generateUuid(),y=u+"_update",t=u+"_complete",w=u+"_cancelled",v=u+"_error",s=[this.alfSubscribe(y,r.hitch(this,this.onProgressUpdate)),this.alfSubscribe(t,r.hitch(this,this.onProgressComplete)),this.alfSubscribe(w,r.hitch(this,this.onProgressCancelled)),this.alfSubscribe(v,r.hitch(this,this.onProgressError))],x={progressUpdateTopic:y,progressCompleteTopic:t,progressCancelledTopic:w,progressErrorTopic:v,subscriptionListeners:s,nodes:this.nodes};this.alfPublish(this.requestProgressTopic,x)},onProgressUpdate:function p(s){this.alfLog("debug","Progress Dialog Update received: "+s);this.alfPublish(this.renderProgressUITopic,s)},onProgressComplete:function c(s){this.alfLog("debug","Progress Dialog Complete: "+s);this.displayUIMessage(this.message("renderer.progress.complete"));this.updateProgressBar(0);if(this.progressFinishedTopic){this.alfPublish(this.progressFinishedTopic,s)}this.alfPublish("ALF_CLOSE_DIALOG",s,true)},onProgressCancelled:function a(s){this.alfLog("debug","Progress Dialog Cancelled: "+s);this.alfPublish("ALF_CLOSE_DIALOG",s,true)},onProgressError:function m(s){this.alfLog("debug","Progress Dialog Error: "+s);this.displayUIMessage(this.message("renderer.progress.error"))},onRenderUI:function h(y){var u=parseInt(y.response.done,10),w=parseInt(y.response.total,10),t=parseInt(y.response.filesAdded,10),s=parseInt(y.response.totalFiles,10);if(!w||!u||!t||!s){this.alfLog("error","Missing required data")}var z=(w>0)?Math.round(u/w*100):0,v=100-z;this.alfLog("info","progress: "+z);if(!this.labelNode||!this.progressNode){this.alfLog("error","")}var x={0:t,1:s};this.displayUIMessage(this.message("renderer.progress.status",x));this.updateProgressBar(v)},displayUIMessage:function d(s){this.alfLog("debug","Progress message: "+s);if(this.labelNode){this.labelNode.innerHTML=s}},updateProgressBar:function k(s){i.set(this.progressNode,"left","-"+s+"%")},cleanUp:function n(s){this.cleanProgressListeners(s)},cleanProgressListeners:function l(s){if(!s.subscriptionListeners){this.alfLog("error","No subscription listeners to unsubscribe from");return}this.alfUnsubscribe(s.subscriptionListeners)}})});