define("tinymce/tableplugin/Quirks",["tinymce/util/VK","tinymce/Env","tinymce/util/Tools"],function(e,b,c){var d=c.each;function a(g,f){return parseInt(g.getAttribute(f)||1,10)}return function(j){function k(){function l(u){var A=u.keyCode;function s(J,F){var E=J?"previousSibling":"nextSibling";var K=j.dom.getParent(F,"tr");var I=K[E];if(I){w(j,F,I,J);u.preventDefault();return true}else{var L=j.dom.getParent(K,"table");var H=K.parentNode;var D=H.nodeName.toLowerCase();if(D==="tbody"||D===(J?"tfoot":"thead")){var G=n(J,L,H,"tbody");if(G!==null){return p(J,G,F)}}return z(J,K,E,L)}}function n(H,F,G,J){var E=j.dom.select(">"+J,F);var D=E.indexOf(G);if(H&&D===0||!H&&D===E.length-1){return q(H,F)}else{if(D===-1){var I=G.tagName.toLowerCase()==="thead"?0:E.length-1;return E[I]}else{return E[D+(H?-1:1)]}}}function q(G,F){var E=G?"thead":"tfoot";var D=j.dom.select(">"+E,F);return D.length!==0?D[0]:null}function p(G,F,E){var D=m(F,G);if(D){w(j,E,D,G)}u.preventDefault();return true}function z(J,G,D,I){var E=I[D];if(E){y(E);return true}else{var H=j.dom.getParent(I,"td,th");if(H){return s(J,H,u)}else{var F=m(G,!J);y(F);u.preventDefault();return false}}}function m(E,D){var F=E&&E[D?"lastChild":"firstChild"];return F&&F.nodeName==="BR"?j.dom.getParent(F,"td,th"):F}function y(D){j.selection.setCursorLocation(D,0)}function v(){return A==e.UP||A==e.DOWN}function x(E){var F=E.selection.getNode();var D=E.dom.getParent(F,"tr");return D!==null}function t(E){var D=0;var F=E;while(F.previousSibling){F=F.previousSibling;D=D+a(F,"colspan")}return D}function o(F,D){var G=0,E=0;d(F.children,function(H,I){G=G+a(H,"colspan");E=I;if(G>D){return false}});return E}function w(F,I,K,H){var J=t(j.dom.getParent(I,"td,th"));var E=o(K,J);var D=K.childNodes[E];var G=m(D,H);y(G||D)}function C(D){var F=j.selection.getNode();var G=j.dom.getParent(F,"td,th");var E=j.dom.getParent(D,"td,th");return G&&G!==E&&r(G,E)}function r(E,D){return j.dom.getParent(E,"TABLE")===j.dom.getParent(D,"TABLE")}if(v()&&x(j)){var B=j.selection.getNode();setTimeout(function(){if(C(B)){s(!u.shiftKey&&A===e.UP,B,u)}},0)}}j.on("KeyDown",function(m){l(m)})}function f(){function l(n,o){var p=o.ownerDocument,m=p.createRange(),q;m.setStartBefore(o);m.setEnd(n.endContainer,n.endOffset);q=p.createElement("body");q.appendChild(m.cloneContents());return q.innerHTML.replace(/<(br|img|object|embed|input|textarea)[^>]*>/gi,"-").replace(/<[^>]+>/g,"").length===0}j.on("KeyDown",function(o){var m,n,p=j.dom;if(o.keyCode==37||o.keyCode==38){m=j.selection.getRng();n=p.getParent(m.startContainer,"table");if(n&&j.getBody().firstChild==n){if(l(m,n)){m=p.createRng();m.setStartBefore(n);m.setEndBefore(n);j.selection.setRng(m);o.preventDefault()}}}})}function h(){j.on("KeyDown SetContent VisualAid",function(){var l;for(l=j.getBody().lastChild;l;l=l.previousSibling){if(l.nodeType==3){if(l.nodeValue.length>0){break}}else{if(l.nodeType==1&&!l.getAttribute("data-mce-bogus")){break}}}if(l&&l.nodeName=="TABLE"){if(j.settings.forced_root_block){j.dom.add(j.getBody(),j.settings.forced_root_block,j.settings.forced_root_block_attrs,b.ie&&b.ie<11?"&nbsp;":'<br data-mce-bogus="1" />')}else{j.dom.add(j.getBody(),"br",{"data-mce-bogus":"1"})}}});j.on("PreProcess",function(m){var l=m.node.lastChild;if(l&&(l.nodeName=="BR"||(l.childNodes.length==1&&(l.firstChild.nodeName=="BR"||l.firstChild.nodeValue=="\u00a0")))&&l.previousSibling&&l.previousSibling.nodeName=="TABLE"){j.dom.remove(l)}})}function g(){function l(t,p,q,v){var r=3,w=t.dom.getParent(p.startContainer,"TABLE");var s,o,u;if(w){s=w.parentNode}o=p.startContainer.nodeType==r&&p.startOffset===0&&p.endOffset===0&&v&&(q.nodeName=="TR"||q==s);u=(q.nodeName=="TD"||q.nodeName=="TH")&&!v;return o||u}function m(){var p=j.selection.getRng();var r=j.selection.getNode();var q=j.dom.getParent(p.startContainer,"TD,TH");if(!l(j,p,r,q)){return}if(!q){q=r}var o=q.lastChild;while(o.lastChild){o=o.lastChild}p.setEnd(o,o.nodeValue.length);j.selection.setRng(p)}j.on("KeyDown",function(){m()});j.on("MouseDown",function(n){if(n.button!=2){m()}})}function i(){j.on("keydown",function(o){if((o.keyCode==e.DELETE||o.keyCode==e.BACKSPACE)&&!o.isDefaultPrevented()){var n=j.dom.getParent(j.selection.getStart(),"table");if(n){var l=j.dom.select("td,th",n),m=l.length;while(m--){if(!j.dom.hasClass(l[m],"mce-item-selected")){return}}o.preventDefault();j.execCommand("mceTableDelete")}}})}i();if(b.webkit){k();g()}if(b.gecko){f();h()}if(b.ie>10){f();h()}}});