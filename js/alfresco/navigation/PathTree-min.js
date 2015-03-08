define(["dojo/_base/declare","alfresco/navigation/Tree","alfresco/documentlibrary/_AlfDocumentListTopicMixin","dojo/_base/lang","dojo/_base/array","dojo/when"],function(d,b,c,a,f,g){return d([b,c],{postMixInProperties:function h(){this.inherited(arguments);this.alfSubscribe(this.hashChangeTopic,a.hitch(this,"onFilterChange"))},onFilterChange:function e(l){if(l!=null&&l.path!=null){this.alfLog("log","Filter updated",l);var k=l.path.split("/");if(this.tree!=null&&k.length>0){var j=this.tree.getChildren()[0];k.shift();this.expandPathElement(j,k)}}},expandPathElement:function i(l,j){this.alfLog("log","Expanding path nodes: ",l,j);if(l!=null&&!l.isExpanded){this.alfLog("log","Node load deferred",l._loadDeferred);l._loadDeferred.then(a.hitch(this,"expandPathElement",l,j))}else{if(l!=null&&j!=null&&j.length>0){var o=l.getChildren(),k=j.shift(),m=f.filter(o,function(p){return p.item.name==k});if(m.length==1){var n=m[0];this.tree._expandNode(n);this.expandPathElement(n,j)}}}}})});