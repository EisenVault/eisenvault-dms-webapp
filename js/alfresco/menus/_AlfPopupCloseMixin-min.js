define(["dojo/_base/declare","alfresco/core/Core","dojo/on","dojo/_base/lang","dijit/popup","dijit/focus"],function(e,c,g,b,a,f){return e([c],{closeOnClick:true,emitClosePopupEvent:function h(){if(this.closeOnClick===true){g.emit(this.domNode,"ALF_CLOSE_MENU",{bubbles:true,cancelable:true})}},registerPopupCloseEvent:function i(){if(this.popup&&this.popup.domNode){g(this.popup.domNode,"ALF_CLOSE_MENU",b.hitch(this,"closePopupMenu"))}},closePopupMenu:function d(){if(this.popup){var j=this.getParent().focusedChild;if(typeof this.getParent()._closeChild==="function"&&j!=null){this.getParent()._closeChild(j)}else{if(typeof this.getParent()._onChildDeselect==="function"&&j!=null){this.getParent()._onChildDeselect(j)}else{a.close(this.popup)}}g.emit(this.domNode,"ALF_CLOSE_MENU",{bubbles:true,cancelable:true})}}})});