(function(){var c=YAHOO.util.Dom,a=YAHOO.util.Selector;Alfresco.component.TaskListToolbar=function e(f){Alfresco.component.TaskListToolbar.superclass.constructor.call(this,"Alfresco.component.TaskListToolbar",f,["button"]);return this};YAHOO.extend(Alfresco.component.TaskListToolbar,Alfresco.component.Base,{onReady:function b(){this.widgets.startWorkflowButton=Alfresco.util.createYUIButton(this,"startWorkflow-button",this.onStartWorkflowButtonClick,{});c.removeClass(a.query(".hidden",this.id+"-body",true),"hidden")},onStartWorkflowButtonClick:function d(f,g){document.location.href=Alfresco.util.siteURL("start-workflow?referrer=tasks&myTasksLinkBack=true")}})})();