hcalendar={name:"hcalendar",root:"vevent",fields:["class","description","dtend","dtstamp","dtstart","duration","location","status","summary","uid","last-modified","url","category"],parsers:{dtstart:Alfresco.util.fromISO8601,dtend:Alfresco.util.fromISO8601,duration:function(){var a={W:/P.*?([0-9]+)W/,D:/P.*?([0-9]+)D/,H:/P.*?T([0-9]+)H/,M:/P.*?T.*?([0-9]+)M/,S:/P.*?T.*?([0-9]+)S/};return function(e){if(!e){return}var b={};for(var c in a){var d=e.match(a[c]);if(d){b[c]=d[1]}}return b}}(),category:function(a){return a.split(",")}},renderers:{dtstart:function(a,b){if(a!==null&&b!=null){a.innerHTML=Alfresco.util.formatDate(b,"HH:MM")}},dtend:function(a,b){if(a!==null&&b!=null){a.innerHTML=Alfresco.util.formatDate(b,"HH:MM")}},duration:function(b,d){var e=[];var c={H:["hour","hours"],M:["minute","minutes"],D:["day","days"],W:["week","weeks"],S:["second","seconds"]};for(var a in d){e.push(d[a]+" "+((d[a]>1)?c[a][1]:c[a][0]))}if(b){b.innerHTML=e.join(", ")}return e.join(", ")},category:function(a,b){if(a&&b){a.innerHTML=b.join(" ");return b.join(" ")}}}};