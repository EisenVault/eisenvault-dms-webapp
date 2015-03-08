(function(b,g){var d={};function c(m,n){var l,j=[];for(var k=0;k<m.length;++k){l=d[m[k]]||e(m[k]);if(!l){throw"module definition dependecy not found: "+m[k]}j.push(l)}n.apply(null,j)}function h(k,j,i){if(typeof k!=="string"){throw"invalid module definition, module id must be defined and be a string"}if(j===g){throw"invalid module definition, dependencies must be specified"}if(i===g){throw"invalid module definition, definition function must be specified"}c(j,function(){d[k]=i.apply(null,arguments)})}function f(i){return !!d[i]}function e(l){var j=b;var i=l.split(/[.\/]/);for(var k=0;k<i.length;++k){if(!j[i[k]]){return}j=j[i[k]]}return j}function a(l){for(var k=0;k<l.length;k++){var m=b;var o=l[k];var j=o.split(/[.\/]/);for(var n=0;n<j.length-1;++n){if(m[j[n]]===g){m[j[n]]={}}m=m[j[n]]}m[j[j.length-1]]=d[o]}}h("tinymce/spellcheckerplugin/DomTextMatcher",[],function(){return function(C,n){var B,k=[],s,G=n.dom;var y,t,E;y=n.schema.getBlockElements();t=n.schema.getWhiteSpaceElements();E=n.schema.getShortEndedElements();function F(K,L){if(!K[0]){throw"findAndReplaceDOMText cannot handle zero-length matches"}return{start:K.index,end:K.index+K[0].length,text:K[0],data:L}}function i(K){var m;if(K.nodeType===3){return K.data}if(t[K.nodeName]&&!y[K.nodeName]){return""}m="";if(y[K.nodeName]||E[K.nodeName]){m+="\n"}if((K=K.firstChild)){do{m+=i(K)}while((K=K.nextSibling))}return m}function H(M,O,S){var K,R,P,L,T=[],Q=0,N=M,m,U=0;O=O.slice(0);O.sort(function(W,V){return W.start-V.start});m=O.shift();out:while(true){if(y[N.nodeName]||E[N.nodeName]){Q++}if(N.nodeType===3){if(!R&&N.length+Q>=m.end){R=N;L=m.end-Q}else{if(K){T.push(N)}}if(!K&&N.length+Q>m.start){K=N;P=m.start-Q}Q+=N.length}if(K&&R){N=S({startNode:K,startNodeIndex:P,endNode:R,endNodeIndex:L,innerNodes:T,match:m.text,matchIndex:U});Q-=(R.length-L);K=null;R=null;T=[];m=O.shift();U++;if(!m){break}}else{if((!t[N.nodeName]||y[N.nodeName])&&N.firstChild){N=N.firstChild;continue}else{if(N.nextSibling){N=N.nextSibling;continue}}}while(true){if(N.nextSibling){N=N.nextSibling;break}else{if(N.parentNode!==M){N=N.parentNode}else{break out}}}}}function v(K){function m(N,L){var M=k[L];if(!M.stencil){M.stencil=K(M)}var O=M.stencil.cloneNode(false);O.setAttribute("data-mce-index",L);if(N){O.appendChild(G.doc.createTextNode(N))}return O}return function(R){var Y,L,S,N=R.startNode,U=R.endNode,Z=R.matchIndex,aa=G.doc;if(N===U){var O=N;S=O.parentNode;if(R.startNodeIndex>0){Y=aa.createTextNode(O.data.substring(0,R.startNodeIndex));S.insertBefore(Y,O)}var M=m(R.match,Z);S.insertBefore(M,O);if(R.endNodeIndex<O.length){L=aa.createTextNode(O.data.substring(R.endNodeIndex));S.insertBefore(L,O)}O.parentNode.removeChild(O);return M}else{Y=aa.createTextNode(N.data.substring(0,R.startNodeIndex));L=aa.createTextNode(U.data.substring(R.endNodeIndex));var W=m(N.data.substring(R.startNodeIndex),Z);var V=[];for(var Q=0,P=R.innerNodes.length;Q<P;++Q){var ab=R.innerNodes[Q];var X=m(ab.data,Z);ab.parentNode.replaceChild(X,ab);V.push(X)}var T=m(U.data.substring(0,R.endNodeIndex),Z);S=N.parentNode;S.insertBefore(Y,N);S.insertBefore(W,N);S.removeChild(N);S=U.parentNode;S.insertBefore(T,U);S.insertBefore(L,U);S.removeChild(U);return T}}}function o(K){var m=K.parentNode;m.insertBefore(K.firstChild,K);K.parentNode.removeChild(K)}function D(m){var O=C.getElementsByTagName("*"),N=[];m=typeof(m)=="number"?""+m:null;for(var M=0;M<O.length;M++){var L=O[M],K=L.getAttribute("data-mce-index");if(K!==null&&K.length){if(K===m||m===null){N.push(L)}}}return N}function j(m){var K=k.length;while(K--){if(k[K]===m){return K}}return -1}function r(K){var m=[];l(function(L,M){if(K(L,M)){m.push(L)}});k=m;return this}function l(L){for(var K=0,m=k.length;K<m;K++){if(L(k[K],K)===false){break}}return this}function q(m){if(k.length){H(C,k,v(m))}return this}function x(m,K){if(s&&m.global){while((B=m.exec(s))){k.push(F(B,K))}}return this}function A(m){var K,L=D(m?j(m):null);K=L.length;while(K--){o(L[K])}return this}function z(m){return k[m.getAttribute("data-mce-index")]}function u(m){return D(j(m))[0]}function w(L,m,K){k.push({start:L,end:L+m,text:s.substr(L,m),data:K});return this}function p(K){var L=D(j(K));var m=n.dom.createRng();m.setStartBefore(L[0]);m.setEndAfter(L[L.length-1]);return m}function I(K,L){var m=p(K);m.deleteContents();if(L.length>0){m.insertNode(n.dom.doc.createTextNode(L))}return m}function J(){k.splice(0,k.length);A();return this}s=i(C);return{text:s,matches:k,each:l,filter:r,reset:J,matchFromElement:z,elementFromMatch:u,find:x,add:w,wrap:q,unwrap:A,replace:I,rangeFromMatch:p,indexOf:j}}});h("tinymce/spellcheckerplugin/Plugin",["tinymce/spellcheckerplugin/DomTextMatcher","tinymce/PluginManager","tinymce/util/Tools","tinymce/ui/Menu","tinymce/dom/DOMUtils","tinymce/util/JSONRequest","tinymce/util/URI"],function(o,l,k,m,n,j,i){l.add("spellchecker",function(q,s){var u,v=this,H,p,A,E=q.settings;function G(){if(!v.textMatcher){v.textMatcher=new o(q.getBody(),q)}return v.textMatcher}function B(K,I){var J=[];k.each(I,function(L){J.push({selectable:true,text:L.name,data:L.value})});return J}var C=E.spellchecker_languages||"English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr_FR,German=de,Italian=it,Polish=pl,Portuguese=pt_BR,Spanish=es,Swedish=sv";u=B("Language",k.map(C.split(","),function(I){var J=I.split("=");return{name:J[0],value:J[1]}}));function t(J){for(var I in J){return false}return true}function r(L){var K=[],I=H[L.text];k.each(I,function(P){K.push({text:P,onclick:function(){var Q=G().replace(L,P);Q.collapse(false);q.selection.setRng(Q);D()}})});K.push.apply(K,[{text:"-"},{text:"Ignore",onclick:function(){w(L)}},{text:"Ignore all",onclick:function(){w(L,true)}},{text:"Finish",onclick:z}]);A=new m({items:K,context:"contextmenu",onautohide:function(P){if(P.target.className.indexOf("spellchecker")!=-1){P.preventDefault()}},onhide:function(){A.remove();A=null}});A.renderTo(document.body);var O=G().elementFromMatch(L);var N=n.DOM.getPos(q.getContentAreaContainer());var M=q.dom.getPos(O);var J=q.dom.getRoot();if(J.nodeName=="BODY"){M.x-=J.ownerDocument.documentElement.scrollLeft||J.scrollLeft;M.y-=J.ownerDocument.documentElement.scrollTop||J.scrollTop}else{M.x-=J.scrollLeft;M.y-=J.scrollTop}N.x+=M.x;N.y+=M.y;A.moveTo(N.x,N.y+O.offsetHeight)}function F(){var N=[],L={};if(p){z();return}else{z()}p=true;function I(O){q.setProgressState(false);if(t(O)){q.windowManager.alert("No misspellings found");p=false;return}H=O;G().filter(function(P){return !!O[P.text]}).wrap(function(){return q.dom.create("span",{"class":"mce-spellchecker-word","data-mce-bogus":1})});q.fire("SpellcheckStart")}var M=q.getParam("spellchecker_wordchar_pattern")||new RegExp('[^\\s!"#$%&()*+,-./:;<=>?@[\\]^_{|}`\u00a7\u00a9\u00ab\u00ae\u00b1\u00b6\u00b7\u00b8\u00bb\u00bc\u00bd\u00be\u00bf\u00d7\u00f7\u00a4\u201d\u201c\u201e]+',"g");G().find(M).each(function(O){var P=O.text;if(!L[P]){if(/^\d+$/.test(P)||P.length==1){return}N.push(P);L[P]=true}});function K(Q,P,O){j.sendRPC({url:new i(s).toAbsolute(E.spellchecker_rpc_url),method:Q,params:{lang:E.spellchecker_language||"en",words:P},success:function(R){O(R)},error:function(R,S){if(R=="JSON Parse error."){R="Non JSON response:"+S.responseText}else{R="Error: "+R}q.windowManager.alert(R);q.setProgressState(false);z()}})}q.setProgressState(true);var J=E.spellchecker_callback||K;J("spellcheck",N,I);q.focus()}function D(){if(!q.dom.select("span.mce-spellchecker-word").length){z()}}function w(I,J){q.selection.collapse();if(J){G().each(function(K){if(K.text==I.text){G().unwrap(K)}})}else{G().unwrap(I)}D()}function z(){G().reset();v.textMatcher=null;if(p){p=false;q.fire("SpellcheckEnd")}}q.on("click",function(J){if(J.target.className=="mce-spellchecker-word"){J.preventDefault();var I=G().matchFromElement(J.target);q.selection.setRng(G().rangeFromMatch(I));r(I)}});q.addMenuItem("spellchecker",{text:"Spellcheck",context:"tools",onclick:F,selectable:true,onPostRender:function(){var I=this;q.on("SpellcheckStart SpellcheckEnd",function(){I.active(p)})}});function y(J){var I=E.spellchecker_language;J.control.items().each(function(K){K.active(K.settings.data===I)})}var x={tooltip:"Spellcheck",onclick:F,onPostRender:function(){var I=this;q.on("SpellcheckStart SpellcheckEnd",function(){I.active(p)})}};if(u.length>1){x.type="splitbutton";x.menu=u;x.onshow=y;x.onselect=function(I){E.spellchecker_language=I.control.settings.data}}q.addButton("spellchecker",x);q.addCommand("mceSpellCheck",F);q.on("remove",function(){if(A){A.remove();A=null}});this.getTextMatcher=G;E.spellchecker_language=E.spellchecker_language||E.language||"en"})});a(["tinymce/spellcheckerplugin/DomTextMatcher","tinymce/spellcheckerplugin/Plugin"])})(this);