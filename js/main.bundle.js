!function(o){function n(r){if(t[r])return t[r].exports;var e=t[r]={exports:{},id:r,loaded:!1};return o[r].call(e.exports,e,e.exports,n),e.loaded=!0,e.exports}var t={};return n.m=o,n.c=t,n.p="",n(0)}([function(o,n,t){o.exports=t(1)},function(o,n,t){"use strict";t(2);var r=window.jQuery,e=window.skrollr,i=void 0,c=r("#scrollbar");r(window).load(function(){e.init({beforerender:function(){clearTimeout(i),c.stop().css({opacity:1})},render:function(){i=setTimeout(function(){c.animate({opacity:0})},200)}})})},function(o,n){}]);