(function(){var d=YAHOO.util.Dom,a=YAHOO.util.Event;Alfresco.CloudObjectFinder=function g(i,j){Alfresco.CloudObjectFinder.superclass.constructor.call(this,i,j);this.name="Alfresco.CloudObjectFinder";Alfresco.util.ComponentManager.reregister(this);if(i!="null"){YAHOO.Bubbling.on("hybridWorklfowDestinationSelected",this._onNetworkSelected,this);YAHOO.Bubbling.on("multipleSelectModeChanged",this._onMultipleSelectModeChanged,this)}return this};YAHOO.extend(Alfresco.CloudObjectFinder,Alfresco.ObjectFinder,{_onNetworkSelected:function h(k,j){var i=j[1];if(i!=null&&i.network!=null){var l="network="+i.network;if(this.options.params!=l){this.options.params=l;if(this.options.objectRenderer){this.options.objectRenderer.options.params=l}if(this.widgets.addButton!=null){Alfresco.util.enableYUIButton(this.widgets.addButton)}this.selectedItems={};this.singleSelectedItem=null;YAHOO.Bubbling.fire("renderCurrentValue",{eventGroup:this})}}},_onMultipleSelectModeChanged:function c(k,i){var n=i[1];if(n!=null){if(this.options.multipleSelectMode!=n){this.selectedItems={};this.singleSelectedItem=null;YAHOO.Bubbling.fire("renderCurrentValue",{eventGroup:this});if(this.options.params==null||this.options.params.indexOf("network")==-1){if(this.widgets.addButton!=null){Alfresco.util.disableYUIButton(this.widgets.addButton)}}this.options.multipleSelectMode=(n==true);if(this.options.singleItemLabel&&this.options.multipleItemsLabel){var j=null;if(n==true){j=this.options.multipleItemsLabel}else{j=this.options.singleItemLabel}var l=d.getAncestorByTagName(this.id,"div");var m=d.getChildrenBy(l,function(p){return p.tagName.toLowerCase()=="label"});if(m[0]!=null){var o=d.getChildrenBy(m[0],function(p){return p.tagName.toLowerCase()=="span"});m[0].innerHTML=this.msg(j)+":";if(o[0]!=null){m[0].appendChild(o[0])}}}}}},onReady:function e(){Alfresco.CloudObjectFinder.superclass.onReady.call(this);if(this.widgets.addButton!=null){Alfresco.util.disableYUIButton(this.widgets.addButton)}},destroy:function f(){try{YAHOO.Bubbling.unsubscribe("hybridWorklfowDestinationSelected",this._onNetworkSelected,this);YAHOO.Bubbling.unsubscribe("multipleSelectModeChanged",this._onMultipleSelectModeChanged,this)}catch(i){}Alfresco.CloudObjectFinder.superclass.destroy.call(this)},_labelFilter:function b(i){alert("Filterng label: "+i);return i.tagName=="label"},_spanFilter:function b(i){alert("Filterng span: "+i);return i.tagName=="span"}})})();