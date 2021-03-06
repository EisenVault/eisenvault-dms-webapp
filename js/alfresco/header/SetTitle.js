/**
 * Copyright (C) 2005-2013 Alfresco Software Limited.
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
 * @module alfresco/header/SetTitle
 * @extends dijit/_WidgetBase
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "alfresco/core/Core"], 
        function(declare, _WidgetBase, AlfCore) {
   
   /**
    * The purpose of this widget is to allow the page title (controlled by "alfresco/header/Title" to be
    * set after the title has been initially rendered. This is particularly important for pages that are
    * being rendered in "hybrid" mode (where the default header and footer are automatically displayed).
    * Normally a page title is taken from the Surf Page object - however, since both the "hybrid" and "full"
    * page types re-use a generic Page and Template it is not possible set a specific title. Using this
    * widget allows the page title to be easily set.
    */
   return declare([_WidgetBase, AlfCore], {

      /**
       * The title to set.
       * 
       * @instance
       * @type {string}
       * @default ""
       */
      title: "",
      
      /**
       * @instance
       */
      postCreate: function alfresco_header_SetTitle__postCreate() {
         this.alfPublish("ALF_UPDATE_PAGE_TITLE", {
            title: this.title
         });
      }
   });
});