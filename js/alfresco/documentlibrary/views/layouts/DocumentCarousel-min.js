define(["dojo/_base/declare","alfresco/documentlibrary/views/layouts/Carousel","dojo/_base/lang","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/dom-geometry","dojo/query","dojo/NodeList-dom"],function(g,k,c,n,e,i,o,l,h){return g([k],{cssRequirements:[{cssFile:"./css/DocumentCarousel.css"}],postMixInProperties:function b(){this.contentNavNextArrowImgSrc=require.toUrl("alfresco/documentlibrary/views/layouts")+"/css/images/filmstrip-main-nav-next.png";this.contentNavPrevArrowImgSrc=require.toUrl("alfresco/documentlibrary/views/layouts")+"/css/images/filmstrip-main-nav-prev.png"},postCreate:function j(){n.add(this.domNode,"alfresco-documentlibrary-views-layouts-DocumentCarousel");this.inherited(arguments)},resize:function a(){this.inherited(arguments);this.resizeContainer();l(".items li",this.domNode).style({width:this.itemsNodeWidth+"px"})},calculateSizes:function m(){this.inherited(arguments);this.numberOfItemsShown=1},onPrevClick:function d(p){this.inherited(arguments);this.alfPublish("ALF_FILMSTRIP_ITEM_CHANGED",{index:this.firstDisplayedIndex})},onNextClick:function f(p){this.inherited(arguments);this.alfPublish("ALF_FILMSTRIP_ITEM_CHANGED",{index:this.firstDisplayedIndex})}})});