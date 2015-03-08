define(["alfresco/core/ProcessWidgets","dojo/_base/declare","dojo/text!./templates/HorizontalWidgets.html","alfresco/core/ResizeMixin","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-style","dojo/dom-geometry","dojo/on","alfresco/core/ObjectTypeUtils"],function(k,f,p,n,a,j,c,g,m,i,o){return f([k,n],{cssRequirements:[{cssFile:"./css/HorizontalWidgets.css"}],templateString:p,baseClass:"horizontal-widgets",widgetWidth:null,widgetMarginLeft:null,widgetMarginRight:null,postCreate:function b(){this.doWidthProcessing(this.widgets);this.inherited(arguments);this.alfSetupResizeSubscriptions(this.onResize,this)},doWidthProcessing:function l(y){if(y!=null&&this.domNode!=null){var x=g.getComputedStyle(this.domNode);var u=m.getMarginBox(this.domNode,x);var w=u.w;w-=y.length;w-=30;var z=0,A=0;if(this.widgetMarginLeft!=null&&!isNaN(this.widgetMarginLeft)){z=y.length*parseInt(this.widgetMarginLeft)}else{this.widgetMarginLeft=0}if(this.widgetMarginRight!=null&&!isNaN(this.widgetMarginRight)){A=y.length*parseInt(this.widgetMarginRight)}else{this.widgetMarginRight=0}var r=w-z-A;var q=0;var t=0;j.forEach(y,function(D,C){if(D.widthPx!=null&&!isNaN(D.widthPx)){q+=parseInt(D.widthPx);D.widthCalc=D.widthPx}else{if(D.widthPc!=null&&!isNaN(D.widthPc)){}else{t++}}});r=r-q;if(r<0){this.alfLog("warn","There is no horizontal space left for widgets requesting a percentage of available space",this)}var s=0;j.forEach(y,function(E,D){if(E.widthPc!=null&&!isNaN(E.widthPc)){var C=parseInt(E.widthPc);s+=C;if(C>100){this.alfLog("warn","A widget has requested more than 100% of available horizontal space",E,this)}E.widthCalc=r*(C/100)}},this);var B=0;if(s>100){this.alfLog("warn","Widgets have requested more than 100% of the available horizontal space",this)}else{B=100-s}var B=B/t,v=r*(B/100);j.forEach(y,function(D,C){if((D.widthPc!=null&&!isNaN(D.widthPc))||(D.widthPx!=null&&!isNaN(D.widthPx))){}else{D.widthCalc=v}})}},onResize:function d(){this.doWidthProcessing(this._processedWidgets);j.forEach(this._processedWidgets,function(r,q){if(r!=null&&r.domNode!=null&&r.widthCalc!=null&&r.widthCalc!=0){g.set(r.domNode.parentNode,"width",r.widthCalc+"px")}})},createWidgetDomNode:function e(v,r,q){var u=c.create("div",{className:"horizontal-widget"},this.containerNode);var t={marginLeft:this.widgetMarginLeft+"px",marginRight:this.widgetMarginRight+"px"};if(v.widthCalc!=0){t.width=v.widthCalc+"px"}g.set(u,t);var s=c.create("div",{},u);return s},createWidget:function h(s,t,v,q,r){var u=this.inherited(arguments);if(u!=null){if(s.widthPx!=null&&!isNaN(s.widthPx)){u.widthPx=s.widthPx}else{if(s.widthPc!=null&&!isNaN(s.widthPc)){u.widthPc=s.widthPc}else{}}}return u}})});