define("tinymce/html/Node",[],function(){var c=/^[ \t\r\n]*$/,d={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11};function a(j,k,i){var h,g,e=i?"lastChild":"firstChild",f=i?"prev":"next";if(j[e]){return j[e]}if(j!==k){h=j[f];if(h){return h}for(g=j.parent;g&&g!==k;g=g.parent){h=g[f];if(h){return h}}}}function b(e,f){this.name=e;this.type=f;if(f===1){this.attributes=[];this.attributes.map={}}}b.prototype={replace:function(f){var e=this;if(f.parent){f.remove()}e.insert(f,e);e.remove();return e},attr:function(g,k){var e=this,f,h,j;if(typeof g!=="string"){for(h in g){e.attr(h,g[h])}return e}if((f=e.attributes)){if(k!==j){if(k===null){if(g in f.map){delete f.map[g];h=f.length;while(h--){if(f[h].name===g){f=f.splice(h,1);return e}}}return e}if(g in f.map){h=f.length;while(h--){if(f[h].name===g){f[h].value=k;break}}}else{f.push({name:g,value:k})}f.map[g]=k;return e}else{return f.map[g]}}},clone:function(){var f=this,m=new b(f.name,f.type),g,e,k,h,j;if((k=f.attributes)){j=[];j.map={};for(g=0,e=k.length;g<e;g++){h=k[g];if(h.name!=="id"){j[j.length]={name:h.name,value:h.value};j.map[h.name]=h.value}}m.attributes=j}m.value=f.value;m.shortEnded=f.shortEnded;return m},wrap:function(f){var e=this;e.parent.insert(f,e);f.append(e);return e},unwrap:function(){var e=this,g,f;for(g=e.firstChild;g;){f=g.next;e.insert(g,e,true);g=f}e.remove()},remove:function(){var e=this,g=e.parent,f=e.next,h=e.prev;if(g){if(g.firstChild===e){g.firstChild=f;if(f){f.prev=null}}else{h.next=f}if(g.lastChild===e){g.lastChild=h;if(h){h.next=null}}else{f.prev=h}e.parent=e.next=e.prev=null}return e},append:function(g){var e=this,f;if(g.parent){g.remove()}f=e.lastChild;if(f){f.next=g;g.prev=f;e.lastChild=g}else{e.lastChild=e.firstChild=g}g.parent=e;return g},insert:function(g,e,h){var f;if(g.parent){g.remove()}f=e.parent||this;if(h){if(e===f.firstChild){f.firstChild=g}else{e.prev.next=g}g.prev=e.prev;g.next=e;e.prev=g}else{if(e===f.lastChild){f.lastChild=g}else{e.next.prev=g}g.next=e.next;g.prev=e;e.next=g}g.parent=f;return g},getAll:function(f){var e=this,g,h=[];for(g=e.firstChild;g;g=a(g,e)){if(g.name===f){h.push(g)}}return h},empty:function(){var f=this,e,g,h;if(f.firstChild){e=[];for(h=f.firstChild;h;h=a(h,f)){e.push(h)}g=e.length;while(g--){h=e[g];h.parent=h.firstChild=h.lastChild=h.next=h.prev=null}}f.firstChild=f.lastChild=null;return f},isEmpty:function(j){var e=this,h=e.firstChild,g,f;if(h){do{if(h.type===1){if(h.attributes.map["data-mce-bogus"]){continue}if(j[h.name]){return false}g=h.attributes.length;while(g--){f=h.attributes[g].name;if(f==="name"||f.indexOf("data-mce-")===0){return false}}}if(h.type===8){return false}if((h.type===3&&!c.test(h.value))){return false}}while((h=a(h,e)))}return true},walk:function(e){return a(this,null,e)}};b.create=function(f,e){var h,g;h=new b(f,d[f]||1);if(e){for(g in e){h.attr(g,e[g])}}return h};return b});