(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(b){b.defineOption("placeholder","",function(g,j,h){var i=h&&h!=b.Init;if(j&&!i){g.on("blur",e);g.on("change",a);a(g)}else{if(!j&&i){g.off("blur",e);g.off("change",a);c(g);var k=g.getWrapperElement();k.className=k.className.replace(" CodeMirror-empty","")}}if(j&&!g.hasFocus()){e(g)}});function c(g){if(g.state.placeholder){g.state.placeholder.parentNode.removeChild(g.state.placeholder);g.state.placeholder=null}}function d(g){c(g);var h=g.state.placeholder=document.createElement("pre");h.style.cssText="height: 0; overflow: visible";h.className="CodeMirror-placeholder";h.appendChild(document.createTextNode(g.getOption("placeholder")));g.display.lineSpace.insertBefore(h,g.display.lineSpace.firstChild)}function e(g){if(f(g)){d(g)}}function a(g){var i=g.getWrapperElement(),h=f(g);i.className=i.className.replace(" CodeMirror-empty","")+(h?" CodeMirror-empty":"");if(h){d(g)}else{c(g)}}function f(g){return(g.lineCount()===1)&&(g.getLine(0)==="")}});