define(["dojo/_base/declare","alfresco/navigation/Tree","alfresco/documentlibrary/_AlfDocumentListTopicMixin","dojo/_base/lang","service/constants/Default"],function(a,c,f,e,g){return a([c,f],{i18nRequirements:[{i18nFile:"./i18n/CategoryTree.properties"}],cssRequirements:[{cssFile:"./css/CategoryTree.css"}],customCssClasses:"categories",rootLabel:"categories.root.label",getTargetUrl:function b(){var h=g.PROXY_URI+"slingshot/doclib/categorynode/node/alfresco/category/root";return h},onClickTopic:"ALF_DOCUMENTLIST_CATEGORY_CHANGED",onClick:function d(j,i,h){this.alfLog("log","Tree Node clicked",j,i,h);this.alfPublish(this.onClickTopic,{path:j.path,description:this.message("filter.classified.label",{"0":j.path})})}})});