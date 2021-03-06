/**
 * Copyright (C) 2005-2014 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This is a BETA quality widget and not guaranteed for production use. 
 *
 * @module alfresco/renderers/EditableComment
 * @extends dijit/_WidgetBase
 * @mixes dijit/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @mixes module:alfresco/core/CoreWidgetProcessing
 * @mixes module:alfresco/renderers/_PublishPayloadMixin
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "alfresco/core/Core",
        "alfresco/core/CoreWidgetProcessing",
        "alfresco/renderers/_PublishPayloadMixin",
        "dojo/text!./templates/EditableComment.html",
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/dom-construct",
        "dojo/dom-class",
        "service/constants/Default"], 
        function(declare, _WidgetBase, _TemplatedMixin, AlfCore, CoreWidgetProcessing, _PublishPayloadMixin, template, 
                 array, lang, domConstruct, domClass, AlfConstants) {

   return declare([_WidgetBase, _TemplatedMixin, AlfCore, CoreWidgetProcessing, _PublishPayloadMixin], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/EditableComment.css"}]
       */
      cssRequirements: [{cssFile:"./css/EditableComment.css"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {string}
       */
      templateString: template,
      
      /**
       * Indicates whether or not the widget is in read mode or not. Default is true.
       *
       * @instance
       * @type {boolean}
       * @default true
       */
      readMode: true,

      /**
       * This should be set to the name of the property to render (e.g. "cm:name"). The property is expected
       * to be in the properties map for the item being rendered. 
       * 
       * @instance
       * @type {string}
       * @default null
       */
      propertyToRender: null,
      
      /**
       * The topic that will be subscribed to that will toggle between edit and read modes.
       *
       * @instance
       * @type {string}
       * @default "ALF_EDIT_COMMENT"
       */
      subscriptionTopic: "ALF_EDIT_COMMENT",

      /**
       * Set up the attributes to be used when rendering the template.
       * 
       * @instance
       */
      postMixInProperties: function alfresco_renderers_EditableComment__postMixInProperties() {
         // Initialise the mode...
         if (this.readMode === true)
         {
            this._mode = "read";
         }
         else
         {
            this._mode = "edit";
         }

         // Get the comment value...
         this.renderedValue = lang.getObject(this.propertyToRender, false, this.currentItem);
         if (this.renderedValue == null)
         {
            this.renderedValue = "";
         }
      },
      
      /**
       * 
       * @instance
       */
      postCreate: function alfresco_renderers_EditableComment__postCreate() {
         this._formCreated = false;

         // Clone the configured payload to avoid collisions with other instances...
         this.publishPayload = lang.clone(this.publishPayload);

         // Setup subscriptions as necessary... (TODO: Overridable function?)
         this.alfSubscribe(this.subscriptionTopic, lang.hitch(this, this.onEditRequest));
         this.alfSubscribe("ALF_CANCEL_EDIT_COMMENT", lang.hitch(this, this.onCancelEdit));
         this.alfSubscribe("ALF_EDIT_COMMENT_SAVE", lang.hitch(this, this.onEditSave));
      },

      /**
       * This function switches the widget into edit mode. It will create the required editor as necessary
       * the first time the function is called.
       *
       * @instance
       * @param {object} payload
       */
      onEditRequest: function alfresco_renderers_EditableComment__onEditRequest(payload) {
         if (this._formCreated === false)
         {
            var widgetsConfig = lang.clone(this.widgetsForForm);
            this.processObject(["processInstanceTokens","processCurrentItemTokens","convertNodeRefToUrl"], widgetsConfig);
            this.processWidgets(widgetsConfig, this.formNode);
            this._formCreated = true;
         }

         // Toggle the CSS classes to reveal the edit form...
         domClass.remove(this.domNode, "read");
         domClass.add(this.domNode, "edit");
         this._mode = "edit";
      },

      /**
       * Handles requests to cancel editing
       *
       * @instance
       * @param {object} payload The payload published on the cancellation topic
       */
      onCancelEdit: function alfresco_renderers_EditableComment__onCancelEdit(payload) {
         domClass.remove(this.domNode, "edit");
         domClass.add(this.domNode, "read");
         this._mode = "read";
      },

      /**
       * The topic to publish whenever the internal form is posted. By default this is expected to 
       * work with the [CrudService]{@link module:alfresco/services/CrudService} and uses its update
       * topic but this can be easily overridden.
       * 
       * @instance
       * @type {string}
       * @default "ALF_CRUD_UPDATE"
       */
      publishTopic: "ALF_CRUD_UPDATE",

      /**
       * The payload to publish whenever a comment edit is saved.
       *
       * @instance
       * @type {object}
       */
      publishPayload: {
         url: "api/comment/node/{nodeRef}",
         pubSubScope: "{parentPubSubScope}"
      },

      /**
       * Defines the publish payload type. By default this is set to "PROCESS" as it is expected that we will
       * need to process currentItem data to set a nodeRef in the "url" attribute of the default publishPayload.
       *
       * @instance
       * @type {string}
       * @default "PROCESS"
       */
      publishPayloadType: "PROCESS",

      /**
       * The default modifiers to use when processing the configured publishPayload.
       *
       * @instance
       * @type {array}
       * @default ["processCurrentItemTokens", "convertNodeRefToUrl","processInstanceTokens"]
       */
      publishPayloadModifiers: ["processCurrentItemTokens", "convertNodeRefToUrl","processInstanceTokens"],

      /**
       * Indicates whether or not publications should be made globally. Default is true.
       *
       * @instance
       * @type {boolean}
       * @default true
       */
      publishGlobal: true,

      /**
       * Handles requests to save the updated comment.
       *
       * @instance
       * @param {object} payload The details of the comment update
       */
      onEditSave: function alfresco_renderers_EditableComment__onEditSave(payload) {
         this.onCancelEdit();
         var dataPayload = lang.clone(payload);

         // Build a new payload to publish based on the supplied configuration...
         var generatedPayload = this.getGeneratedPayload(true);

         // Mix the data into the configured payload and publish it!
         lang.mixin(generatedPayload, dataPayload);
         this.alfPublish(this.publishTopic, generatedPayload, this.publishGlobal);
      },

      /**
       * The parameter to post that contains the content.
       *
       * @instance
       * @type {string}
       * @default "content"
       */
      postParam: "content",

      /**
       * TODO: Localize!!!
       * 
       * @instance
       * @type {string}
       * @default "Save"
       */
      okButtonLabel: "Save",

      /**
       *
       * @instance
       */
      widgetsForForm: [
         {
            name: "alfresco/forms/Form",
            config: {
               okButtonPublishTopic: "ALF_EDIT_COMMENT_SAVE",
               okButtonLabel: "{okButtonLabel}",
               okButtonPublishPayload: {
                  url: "api/comment/node/{nodeRef}"
               },
               cancelButtonPublishTopic: "ALF_CANCEL_EDIT_COMMENT",
               widgets: [
                  {
                     name: "alfresco/forms/controls/TinyMCE",
                     config: {
                        name: "{postParam}",
                        value: "{renderedValue}"
                     }
                  }
               ]
            }
         }
      ]
   });
});