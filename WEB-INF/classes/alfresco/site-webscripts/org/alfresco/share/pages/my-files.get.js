<import resource="classpath:/alfresco/site-webscripts/org/alfresco/share/imports/document-library.lib.js">

// Get the initial header widgets...
var widgets = getHeaderModel(msg.get("location.path.myfiles"));

// Get the DocLib specific services and widgets...
var docLibServices = getDocumentLibraryServices();
var docLibWidgets = getDocumentLibraryModel(null, null, user.properties['userHome'], msg.get("location.path.myfiles"));

// Add the DocLib services and widgets...
widgets.push(docLibWidgets);

// Push services and widgets into the getFooterModel to return with a sticky footer wrapper
model.jsonModel = getFooterModel(docLibServices, widgets);
model.jsonModel.groupMemberships = user.properties["alfUserGroups"];
