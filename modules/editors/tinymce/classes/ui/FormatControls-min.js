define("tinymce/ui/FormatControls",["tinymce/ui/Control","tinymce/ui/Widget","tinymce/ui/FloatPanel","tinymce/util/Tools","tinymce/EditorManager","tinymce/Env"],function(f,e,h,b,d,a){var g=b.each;d.on("AddEditor",function(i){if(i.editor.rtl){f.rtl=true}c(i.editor)});f.translate=function(i){return d.translate(i)};e.tooltips=!a.iOS;function c(m){var p;function j(t,u){return function(){var v=this;m.on("nodeChange",function(y){var w=m.formatter;var x=null;g(y.parents,function(z){g(t,function(A){if(u){if(w.matchNode(z,u,{value:A.value})){x=A.value}}else{if(w.matchNode(z,A.value)){x=A.value}}if(x){return false}});if(x){return false}});v.value(x)})}}function n(t){t=t.split(";");var u=t.length;while(u--){t[u]=t[u].split("=")}return t}function k(){var x=0,w=[];var v=[{title:"Headings",items:[{title:"Heading 1",format:"h1"},{title:"Heading 2",format:"h2"},{title:"Heading 3",format:"h3"},{title:"Heading 4",format:"h4"},{title:"Heading 5",format:"h5"},{title:"Heading 6",format:"h6"}]},{title:"Inline",items:[{title:"Bold",icon:"bold",format:"bold"},{title:"Italic",icon:"italic",format:"italic"},{title:"Underline",icon:"underline",format:"underline"},{title:"Strikethrough",icon:"strikethrough",format:"strikethrough"},{title:"Superscript",icon:"superscript",format:"superscript"},{title:"Subscript",icon:"subscript",format:"subscript"},{title:"Code",icon:"code",format:"code"}]},{title:"Blocks",items:[{title:"Paragraph",format:"p"},{title:"Blockquote",format:"blockquote"},{title:"Div",format:"div"},{title:"Pre",format:"pre"}]},{title:"Alignment",items:[{title:"Left",icon:"alignleft",format:"alignleft"},{title:"Center",icon:"aligncenter",format:"aligncenter"},{title:"Right",icon:"alignright",format:"alignright"},{title:"Justify",icon:"alignjustify",format:"alignjustify"}]}];function t(y){var z=[];if(!y){return}g(y,function(C){var B={text:C.title,icon:C.icon};if(C.items){B.menu=t(C.items)}else{var A=C.format||"custom"+x++;if(!C.format){C.name=A;w.push(C)}B.format=A}z.push(B)});return z}function u(){var y;if(m.settings.style_formats_merge){if(m.settings.style_formats){y=t(v.concat(m.settings.style_formats))}else{y=t(v)}}else{y=t(m.settings.style_formats||v)}return y}m.on("init",function(){g(w,function(y){m.formatter.register(y.name,y)})});return{type:"menu",items:u(),onPostRender:function(y){m.fire("renderFormatsMenu",{control:y.control})},itemDefaults:{preview:true,textStyle:function(){if(this.settings.format){return m.formatter.getCssText(this.settings.format)}},onPostRender:function(){var y=this,z=this.settings.format;if(z){y.parent().on("show",function(){y.disabled(!m.formatter.canApply(z));y.active(m.formatter.match(z))})}},onclick:function(){if(this.settings.format){q(this.settings.format)}}}}}p=k();g({bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",subscript:"Subscript",superscript:"Superscript"},function(u,t){m.addButton(t,{tooltip:u,onPostRender:function(){var v=this;if(m.formatter){m.formatter.formatChanged(t,function(w){v.active(w)})}else{m.on("init",function(){m.formatter.formatChanged(t,function(w){v.active(w)})})}},onclick:function(){q(t)}})});g({outdent:["Decrease indent","Outdent"],indent:["Increase indent","Indent"],cut:["Cut","Cut"],copy:["Copy","Copy"],paste:["Paste","Paste"],help:["Help","mceHelp"],selectall:["Select all","SelectAll"],hr:["Insert horizontal rule","InsertHorizontalRule"],removeformat:["Clear formatting","RemoveFormat"],visualaid:["Visual aids","mceToggleVisualAid"],newdocument:["New document","mceNewDocument"]},function(u,t){m.addButton(t,{tooltip:u[0],cmd:u[1]})});g({blockquote:["Blockquote","mceBlockQuote"],numlist:["Numbered list","InsertOrderedList"],bullist:["Bullet list","InsertUnorderedList"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],alignleft:["Align left","JustifyLeft"],aligncenter:["Align center","JustifyCenter"],alignright:["Align right","JustifyRight"],alignjustify:["Justify","JustifyFull"]},function(u,t){m.addButton(t,{tooltip:u[0],cmd:u[1],onPostRender:function(){var v=this;if(m.formatter){m.formatter.formatChanged(t,function(w){v.active(w)})}else{m.on("init",function(){m.formatter.formatChanged(t,function(w){v.active(w)})})}}})});function l(){return m.undoManager?m.undoManager.hasUndo():false}function i(){return m.undoManager?m.undoManager.hasRedo():false}function o(){var t=this;t.disabled(!l());m.on("Undo Redo AddUndo TypingUndo",function(){t.disabled(!l())})}function s(){var t=this;t.disabled(!i());m.on("Undo Redo AddUndo TypingUndo",function(){t.disabled(!i())})}function r(){var t=this;m.on("VisualAid",function(u){t.active(u.hasVisual)});t.active(m.hasVisual)}m.addButton("undo",{tooltip:"Undo",onPostRender:o,cmd:"undo"});m.addButton("redo",{tooltip:"Redo",onPostRender:s,cmd:"redo"});m.addMenuItem("newdocument",{text:"New document",shortcut:"Ctrl+N",icon:"newdocument",cmd:"mceNewDocument"});m.addMenuItem("undo",{text:"Undo",icon:"undo",shortcut:"Ctrl+Z",onPostRender:o,cmd:"undo"});m.addMenuItem("redo",{text:"Redo",icon:"redo",shortcut:"Ctrl+Y",onPostRender:s,cmd:"redo"});m.addMenuItem("visualaid",{text:"Visual aids",selectable:true,onPostRender:r,cmd:"mceToggleVisualAid"});g({cut:["Cut","Cut","Ctrl+X"],copy:["Copy","Copy","Ctrl+C"],paste:["Paste","Paste","Ctrl+V"],selectall:["Select all","SelectAll","Ctrl+A"],bold:["Bold","Bold","Ctrl+B"],italic:["Italic","Italic","Ctrl+I"],underline:["Underline","Underline"],strikethrough:["Strikethrough","Strikethrough"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],removeformat:["Clear formatting","RemoveFormat"]},function(u,t){m.addMenuItem(t,{text:u[0],icon:t,shortcut:u[2],cmd:u[1]})});m.on("mousedown",function(){h.hideAll()});function q(t){if(t.control){t=t.control.value()}if(t){m.execCommand("mceToggleFormat",false,t)}}m.addButton("styleselect",{type:"menubutton",text:"Formats",menu:p});m.addButton("formatselect",function(){var t=[],u=n(m.settings.block_formats||"Paragraph=p;Address=address;Pre=pre;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6");g(u,function(v){t.push({text:v[0],value:v[1],textStyle:function(){return m.formatter.getCssText(v[1])}})});return{type:"listbox",text:u[0][0],values:t,fixedWidth:true,onselect:q,onPostRender:j(t)}});m.addButton("fontselect",function(){var u="Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats";var t=[],v=n(m.settings.font_formats||u);g(v,function(w){t.push({text:{raw:w[0]},value:w[1],textStyle:w[1].indexOf("dings")==-1?"font-family:"+w[1]:""})});return{type:"listbox",text:"Font Family",tooltip:"Font Family",values:t,fixedWidth:true,onPostRender:j(t,"fontname"),onselect:function(w){if(w.control.settings.value){m.execCommand("FontName",false,w.control.settings.value)}}}});m.addButton("fontsizeselect",function(){var t=[],v="8pt 10pt 12pt 14pt 18pt 24pt 36pt";var u=m.settings.fontsize_formats||v;g(u.split(" "),function(w){t.push({text:w,value:w})});return{type:"listbox",text:"Font Sizes",tooltip:"Font Sizes",values:t,fixedWidth:true,onPostRender:j(t,"fontsize"),onclick:function(w){if(w.control.settings.value){m.execCommand("FontSize",false,w.control.settings.value)}}}});m.addMenuItem("formats",{text:"Formats",menu:p})}});