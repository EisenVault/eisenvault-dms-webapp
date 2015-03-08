(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../lib/codemirror"),require("../addon/search/searchcursor"),require("../addon/edit/matchbrackets"))}else{if(typeof define=="function"&&define.amd){define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],a)}else{a(CodeMirror)}}})(function(l){var q=l.keyMap.sublime={fallthrough:"default"};var j=l.commands;var i=l.Pos;var c=l.keyMap["default"]==l.keyMap.macDefault;var f=c?"Cmd-":"Ctrl-";function d(B,t,u){if(u<0&&t.ch==0){return B.clipPos(i(t.line-1))}var C=B.getLine(t.line);if(u>0&&t.ch>=C.length){return B.clipPos(i(t.line+1,0))}var s="start",y;for(var A=t.ch,x=u<0?0:C.length,v=0;A!=x;A+=u,v++){var w=C.charAt(u<0?A-1:A);var z=w!="_"&&l.isWordChar(w)?"w":"o";if(z=="w"&&w.toUpperCase()==w){z="W"}if(s=="start"){if(z!="o"){s="in";y=z}}else{if(s=="in"){if(y!=z){if(y=="w"&&z=="W"&&u<0){A--}if(y=="W"&&z=="w"&&u>0){y="w";continue}break}}}}return i(t.line,A)}function o(s,t){s.extendSelectionsBy(function(u){if(s.display.shift||s.doc.extend||u.empty()){return d(s.doc,u.head,t)}else{return t<0?u.from():u.to()}})}j[q["Alt-Left"]="goSubwordLeft"]=function(s){o(s,-1)};j[q["Alt-Right"]="goSubwordRight"]=function(s){o(s,1)};j[q[f+"Up"]="scrollLineUp"]=function(s){var u=s.getScrollInfo();if(!s.somethingSelected()){var t=s.lineAtHeight(u.top+u.clientHeight,"local");if(s.getCursor().line>=t){s.execCommand("goLineUp")}}s.scrollTo(null,u.top-s.defaultTextHeight())};j[q[f+"Down"]="scrollLineDown"]=function(s){var u=s.getScrollInfo();if(!s.somethingSelected()){var t=s.lineAtHeight(u.top,"local")+1;if(s.getCursor().line<=t){s.execCommand("goLineDown")}}s.scrollTo(null,u.top+s.defaultTextHeight())};j[q["Shift-"+f+"L"]="splitSelectionByLine"]=function(s){var u=s.listSelections(),w=[];for(var v=0;v<u.length;v++){var y=u[v].from(),x=u[v].to();for(var t=y.line;t<=x.line;++t){if(!(x.line>y.line&&t==x.line&&x.ch==0)){w.push({anchor:t==y.line?y:i(t,0),head:t==x.line?x:i(t)})}}}s.setSelections(w,0)};q["Shift-Tab"]="indentLess";j[q.Esc="singleSelectionTop"]=function(s){var t=s.listSelections()[0];s.setSelection(t.anchor,t.head,{scroll:false})};j[q[f+"L"]="selectLine"]=function(t){var u=t.listSelections(),s=[];for(var w=0;w<u.length;w++){var v=u[w];s.push({anchor:i(v.from().line,0),head:i(v.to().line+1,0)})}t.setSelections(s)};q["Shift-"+f+"K"]="deleteLine";function a(t,s){t.operation(function(){var w=t.listSelections().length,v=[],z=-1;for(var y=0;y<w;y++){var x=t.listSelections()[y].head;if(x.line<=z){continue}var u=i(x.line+(s?0:1),0);t.replaceRange("\n",u,null,"+insertLine");t.indentLine(u.line,null,true);v.push({head:u,anchor:u});z=x.line+1}t.setSelections(v)})}j[q[f+"Enter"]="insertLineAfter"]=function(s){a(s,false)};j[q["Shift-"+f+"Enter"]="insertLineBefore"]=function(s){a(s,true)};function b(s,w){var v=w.ch,u=v,t=s.getLine(w.line);while(v&&l.isWordChar(t.charAt(v-1))){--v}while(u<t.length&&l.isWordChar(t.charAt(u))){++u}return{from:i(w.line,v),to:i(w.line,u),word:t.slice(v,u)}}j[q[f+"D"]="selectNextOccurrence"]=function(s){var z=s.getCursor("from"),y=s.getCursor("to");var t=s.state.sublimeFindFullWord==s.doc.sel;if(l.cmpPos(z,y)==0){var v=b(s,z);if(!v.word){return}s.setSelection(v.from,v.to);t=true}else{var x=s.getRange(z,y);var u=t?new RegExp("\\b"+x+"\\b"):x;var w=s.getSearchCursor(u,y);if(w.findNext()){s.addSelection(w.from(),w.to())}else{w=s.getSearchCursor(u,i(s.firstLine(),0));if(w.findNext()){s.addSelection(w.from(),w.to())}}}if(t){s.state.sublimeFindFullWord=s.doc.sel}};var h="(){}[]";function n(t){var v=t.getCursor(),s=t.scanForBracket(v,-1);if(!s){return}for(;;){var u=t.scanForBracket(v,1);if(!u){return}if(u.ch==h.charAt(h.indexOf(s.ch)+1)){t.setSelection(i(s.pos.line,s.pos.ch+1),u.pos,false);return true}v=i(u.pos.line,u.pos.ch+1)}}j[q["Shift-"+f+"Space"]="selectScope"]=function(s){n(s)||s.execCommand("selectAll")};j[q["Shift-"+f+"M"]="selectBetweenBrackets"]=function(s){if(!n(s)){return l.Pass}};j[q[f+"M"]="goToBracket"]=function(s){s.extendSelectionsBy(function(t){var u=s.scanForBracket(t.head,1);if(u&&l.cmpPos(u.pos,t.head)!=0){return u.pos}var v=s.scanForBracket(t.head,-1);return v&&i(v.pos.line,v.pos.ch+1)||t.head})};var m=c?"Cmd-Ctrl-":"Shift-Ctrl-";j[q[m+"Up"]="swapLineUp"]=function(z){var s=z.listSelections(),w=[],t=z.firstLine()-1,A=[];for(var u=0;u<s.length;u++){var v=s[u],y=v.from().line-1,x=v.to().line;A.push({anchor:i(v.anchor.line-1,v.anchor.ch),head:i(v.head.line-1,v.head.ch)});if(v.to().ch==0&&!v.empty()){--x}if(y>t){w.push(y,x)}else{if(w.length){w[w.length-1]=x}}t=x}z.operation(function(){for(var C=0;C<w.length;C+=2){var E=w[C],D=w[C+1];var B=z.getLine(E);z.replaceRange("",i(E,0),i(E+1,0),"+swapLine");if(D>z.lastLine()){z.replaceRange("\n"+B,i(z.lastLine()),null,"+swapLine")}else{z.replaceRange(B+"\n",i(D,0),null,"+swapLine")}}z.setSelections(A);z.scrollIntoView()})};j[q[m+"Down"]="swapLineDown"]=function(t){var u=t.listSelections(),x=[],s=t.lastLine()+1;for(var w=u.length-1;w>=0;w--){var v=u[w],z=v.to().line+1,y=v.from().line;if(v.to().ch==0&&!v.empty()){z--}if(z<s){x.push(z,y)}else{if(x.length){x[x.length-1]=y}}s=y}t.operation(function(){for(var B=x.length-2;B>=0;B-=2){var D=x[B],C=x[B+1];var A=t.getLine(D);if(D==t.lastLine()){t.replaceRange("",i(D-1),i(D),"+swapLine")}else{t.replaceRange("",i(D,0),i(D+1,0),"+swapLine")}t.replaceRange(A+"\n",i(C,0),null,"+swapLine")}t.scrollIntoView()})};q[f+"/"]="toggleComment";j[q[f+"J"]="joinLines"]=function(s){var u=s.listSelections(),x=[];for(var w=0;w<u.length;w++){var v=u[w],z=v.from();var y=z.line,t=v.to().line;while(w<u.length-1&&u[w+1].from().line==t){t=u[++w].to().line}x.push({start:y,end:t,anchor:!v.empty()&&z})}s.operation(function(){var G=0,B=[];for(var E=0;E<x.length;E++){var F=x[E];var C=F.anchor&&i(F.anchor.line-G,F.anchor.ch),D;for(var A=F.start;A<=F.end;A++){var H=A-G;if(A==F.end){D=i(H,s.getLine(H).length+1)}if(H<s.lastLine()){s.replaceRange(" ",i(H),i(H+1,/^\s*/.exec(s.getLine(H+1))[0].length));++G}}B.push({anchor:C||D,head:D})}s.setSelections(B,0)})};j[q["Shift-"+f+"D"]="duplicateLine"]=function(s){s.operation(function(){var u=s.listSelections().length;for(var v=0;v<u;v++){var t=s.listSelections()[v];if(t.empty()){s.replaceRange(s.getLine(t.head.line)+"\n",i(t.head.line,0))}else{s.replaceRange(s.getRange(t.from(),t.to()),t.from())}}s.scrollIntoView()})};q[f+"T"]="transposeChars";function r(A,x){var s=A.listSelections(),w=[],t;for(var u=0;u<s.length;u++){var v=s[u];if(v.empty()){continue}var z=v.from().line,y=v.to().line;while(u<s.length-1&&s[u+1].from().line==y){y=v[++u].to().line}w.push(z,y)}if(w.length){t=true}else{w.push(A.firstLine(),A.lastLine())}A.operation(function(){var D=[];for(var E=0;E<w.length;E+=2){var H=w[E],G=w[E+1];var F=i(H,0),C=i(G);var B=A.getRange(F,C,false);if(x){B.sort()}else{B.sort(function(K,I){var L=K.toUpperCase(),J=I.toUpperCase();if(L!=J){K=L;I=J}return K<I?-1:K==I?0:1})}A.replaceRange(B,F,C);if(t){D.push({anchor:F,head:C})}}if(t){A.setSelections(D,0)}})}j[q.F9="sortLines"]=function(s){r(s,true)};j[q[f+"F9"]="sortLinesInsensitive"]=function(s){r(s,false)};j[q.F2="nextBookmark"]=function(s){var t=s.state.sublimeBookmarks;if(t){while(t.length){var v=t.shift();var u=v.find();if(u){t.push(v);return s.setSelection(u.from,u.to)}}}};j[q["Shift-F2"]="prevBookmark"]=function(s){var t=s.state.sublimeBookmarks;if(t){while(t.length){t.unshift(t.pop());var u=t[t.length-1].find();if(!u){t.pop()}else{return s.setSelection(u.from,u.to)}}}};j[q[f+"F2"]="toggleBookmark"]=function(z){var s=z.listSelections();var w=z.state.sublimeBookmarks||(z.state.sublimeBookmarks=[]);for(var v=0;v<s.length;v++){var x=s[v].from(),y=s[v].to();var A=z.findMarks(x,y);for(var u=0;u<A.length;u++){if(A[u].sublimeBookmark){A[u].clear();for(var t=0;t<w.length;t++){if(w[t]==A[u]){w.splice(t--,1)}}break}}if(u==A.length){w.push(z.markText(x,y,{sublimeBookmark:true,clearWhenEmpty:false}))}}};j[q["Shift-"+f+"F2"]="clearBookmarks"]=function(s){var u=s.state.sublimeBookmarks;if(u){for(var t=0;t<u.length;t++){u[t].clear()}}u.length=0};j[q["Alt-F2"]="selectBookmarks"]=function(s){var v=s.state.sublimeBookmarks,t=[];if(v){for(var u=0;u<v.length;u++){var w=v[u].find();if(!w){v.splice(u--,0)}else{t.push({anchor:w.from,head:w.to})}}}if(t.length){s.setSelections(t,0)}};q["Alt-Q"]="wrapLines";var e=l.keyMap["sublime-Ctrl-K"]={auto:"sublime",nofallthrough:true};q[f+"K"]=function(s){s.setOption("keyMap","sublime-Ctrl-K")};function g(s,t){s.operation(function(){var v=s.listSelections(),A=[],y=[];for(var x=0;x<v.length;x++){var w=v[x];if(w.empty()){A.push(x);y.push("")}else{y.push(t(s.getRange(w.from(),w.to())))}}s.replaceSelections(y,"around","case");for(var x=A.length-1,u;x>=0;x--){var w=v[A[x]];if(u&&l.cmpPos(w.head,u)>0){continue}var z=b(s,w.head);u=z.from;s.replaceRange(t(z.word),z.from,z.to)}})}e[f+"Backspace"]="delLineLeft";j[e[f+"K"]="delLineRight"]=function(s){s.operation(function(){var t=s.listSelections();for(var u=t.length-1;u>=0;u--){s.replaceRange("",t[u].anchor,i(t[u].to().line),"+delete")}s.scrollIntoView()})};j[e[f+"U"]="upcaseAtCursor"]=function(s){g(s,function(t){return t.toUpperCase()})};j[e[f+"L"]="downcaseAtCursor"]=function(s){g(s,function(t){return t.toLowerCase()})};j[e[f+"Space"]="setSublimeMark"]=function(s){if(s.state.sublimeMark){s.state.sublimeMark.clear()}s.state.sublimeMark=s.setBookmark(s.getCursor())};j[e[f+"A"]="selectToSublimeMark"]=function(s){var t=s.state.sublimeMark&&s.state.sublimeMark.find();if(t){s.setSelection(s.getCursor(),t)}};j[e[f+"W"]="deleteToSublimeMark"]=function(s){var u=s.state.sublimeMark&&s.state.sublimeMark.find();if(u){var w=s.getCursor(),v=u;if(l.cmpPos(w,v)>0){var t=v;v=w;w=t}s.state.sublimeKilled=s.getRange(w,v);s.replaceRange("",w,v)}};j[e[f+"X"]="swapWithSublimeMark"]=function(s){var t=s.state.sublimeMark&&s.state.sublimeMark.find();if(t){s.state.sublimeMark.clear();s.state.sublimeMark=s.setBookmark(s.getCursor());s.setCursor(t)}};j[e[f+"Y"]="sublimeYank"]=function(s){if(s.state.sublimeKilled!=null){s.replaceSelection(s.state.sublimeKilled,null,"paste")}};e[f+"G"]="clearBookmarks";j[e[f+"C"]="showInCenter"]=function(s){var t=s.cursorCoords(null,"local");s.scrollTo(null,(t.top+t.bottom)/2-s.getScrollInfo().clientHeight/2)};j[q["Shift-Alt-Up"]="selectLinesUpward"]=function(s){s.operation(function(){var t=s.listSelections();for(var v=0;v<t.length;v++){var u=t[v];if(u.head.line>s.firstLine()){s.addSelection(i(u.head.line-1,u.head.ch))}}})};j[q["Shift-Alt-Down"]="selectLinesDownward"]=function(s){s.operation(function(){var t=s.listSelections();for(var v=0;v<t.length;v++){var u=t[v];if(u.head.line<s.lastLine()){s.addSelection(i(u.head.line+1,u.head.ch))}}})};function p(s){var v=s.getCursor("from"),u=s.getCursor("to");if(l.cmpPos(v,u)==0){var t=b(s,v);if(!t.word){return}v=t.from;u=t.to}return{from:v,to:u,query:s.getRange(v,u),word:t}}function k(s,t){var v=p(s);if(!v){return}var u=v.query;var w=s.getSearchCursor(u,t?v.to:v.from);if(t?w.findNext():w.findPrevious()){s.setSelection(w.from(),w.to())}else{w=s.getSearchCursor(u,t?i(s.firstLine(),0):s.clipPos(i(s.lastLine())));if(t?w.findNext():w.findPrevious()){s.setSelection(w.from(),w.to())}else{if(v.word){s.setSelection(v.from,v.to)}}}}j[q[f+"F3"]="findUnder"]=function(s){k(s,true)};j[q["Shift-"+f+"F3"]="findUnderPrevious"]=function(s){k(s,false)};j[q["Alt-F3"]="findAllUnder"]=function(s){var v=p(s);if(!v){return}var w=s.getSearchCursor(v.query);var u=[];var t=-1;while(w.findNext()){u.push({anchor:w.from(),head:w.to()});if(w.from().line<=v.from.line&&w.from().ch<=v.from.ch){t++}}s.setSelections(u,t)};q["Shift-"+f+"["]="fold";q["Shift-"+f+"]"]="unfold";e[f+"0"]=e[f+"j"]="unfoldAll";q[f+"I"]="findIncremental";q["Shift-"+f+"I"]="findIncrementalReverse";q[f+"H"]="replace";q.F3="findNext";q["Shift-F3"]="findPrev"});