angular.module("rhIcon").config(["$stateProvider","$urlRouterProvider","cfpLoadingBarProvider",function(e,t,l){e.state("home",{url:"/home",templateUrl:"views/home/index.html",controller:"HomeCtrl"}).state("home.ad",{templateUrl:"views/home/ad.html"}).state("icon",{url:"/icon/:id",views:{"":{templateUrl:"views/icon/index.html",controller:"IconCtrl"},"ad@icon":{templateUrl:function(){return window.showAd?"views/icon/ad.html":null}}}}).state("icon.detail",{url:"/:type",views:{"detail@icon":{templateUrl:function(e){return e.type?"views/icon/detail."+_.toLower(e.type)+".html":void 0}}}}).state("guide",{url:"/guide/:platform",views:{"":{templateUrl:"views/guide/index.html",controller:"GuideCtrl"},"ad@guide":{templateUrl:function(){return window.showAd?"views/guide/ad.html":null}}}}).state("admin",{url:"/admin",templateUrl:"views/admin/index.html",controller:"AdminCtrl"}).state("about",{url:"/about",templateUrl:"views/about/index.html",controller:"AboutCtrl"}),t.otherwise("/home"),l.lightTheme=!0}]);
!function(){"use strict";angular.module("rhIcon").controller("HomeCtrl",["$scope","CoreService","$state","$http","$timeout",function(e,t,n,a,o){$.material.ripples(),e.slogan=$("meta[name=slogan]").attr("content"),e.init=function(){e.status=!1,e.progress=0,e.id=null,e.ready=!1,e.sizes=[],e.presets=[{length:28,icon:"wechat",selected:!1},{length:108,icon:"wechat",selected:!1}],$("#jumbotron_img").attr("src","/img/launcher.png")},e.init(),window.showAd&&n.go("home.ad"),$("#platform").select2({minimumResultsForSearch:1/0});var r=$("#if_form"),i=r.get(0);i.addEventListener("dragover",function(t){t.stopPropagation(),t.preventDefault(),e.status||r.addClass("dropping")},!1),i.addEventListener("dragleave",function(t){t.stopPropagation(),t.preventDefault(),e.status||r.removeClass("dropping")},!1),i.addEventListener("drop",function(t){t.stopPropagation(),t.preventDefault(),e.status||(r.removeClass("dropping"),t.dataTransfer&&t.dataTransfer.files&&t.dataTransfer.files.length&&e.$apply(function(){e.startUploading(t.dataTransfer.files[0])}))},!1),e.uploadFromBtn=function(){$("#if").click()},e.selectedFile=function(t){t.files&&t.files.length&&e.$apply(function(){e.startUploading(t.files[0])})},e.checkFile=function(e){if(!e||!e.type)return!1;var t=["image/jpeg","image/jpg","image/png","image/gif","image/vnd.adobe.photoshop"];return $.inArray(e.type,t)>=0?!0:(swal({title:"不支持的文件格式.",type:"error",confirmButtonText:"确定"}),!1)},e.startUploading=function(n){if(e.checkFile(n)){e.init(),e.status="setting";var a=new FileReader;a.readAsDataURL(n),a.onload=function(e){""!=n.type&&"image/vnd.adobe.photoshop"!=n.type&&($("#jumbotron_img").get(0).src=e.target.result)};var o=new FormData;o.append("file",n);var r=new XMLHttpRequest;r.open("POST","/icon/upload",!0),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.onreadystatechange=function(){4==r.readyState&&200==r.status&&t.resCallback(r.responseText,function(t){e.$apply(function(){e.id=t,e.ready&&e.doGenerate()})},function(){e.$apply(function(){e.init()}),$("#jumbotron_img").get(0).src="img/launcher.png"})},r.upload.onprogress=function(t){e.$apply(function(){e.progress=Math.round(t.loaded/t.total*100)})},r.send(o)}},e.progressStyle=function(){return{width:e.progress+"%"}},e.progressTipStyle=function(){return{left:e.progress-1+"%"}},e.generate=function(){e.id?e.doGenerate():e.ready=!0},e.doGenerate=function(){e.status="generating";var t=e.sizes;angular.forEach(e.presets,function(e,n){e.selected&&t.push({length:e.length})}),a.post("/icon/generate",{id:e.id,platforms:$("#platform").val(),sizes:t}).success(function(){n.go("icon",{id:e.id})})},e.addCustomSize=function(){e.sizes.push({length:0})}}])}();
!function(){"use strict";angular.module("rhIcon").controller("IconCtrl",["$scope","$stateParams","CoreService","$state","$http","$platforms","$timeout","ngDialog",function(i,t,a,e,n,o,s,r){i.init=function(){i.$platforms=o,i.url=window.location.origin,n.get("/icon/detail/"+t.id+"/api").success(function(t){i.design=t.design,i.platforms=t.platforms,i.sizes=t.sizes,s(function(){$.material.ripples()});var a=e.params.type;a&&_.indexOf(t.platforms,a)>=0||i.platforms.length&&(a=i.platforms[0],i.switchDetail(a)),a&&i.updateBasePath(a)})},i.init(),i.switchDetail=function(i){t.type=i,e.go("icon.detail",t)},i.$on("$stateChangeSuccess",function(t,a,e){"icon.detail"==a.name&&i.design&&i.updateBasePath(e.type)}),i.updateBasePath=function(t){var a=o[t];i.basePath=["","files",i.design.folder,i.design.id,a.folder,""].join("/")},i.tabCls=function(i){return i==e.params.type?"active":""},i.downloadLink=function(){return"/icon/download/"+e.params.id},i.showDownloadPopup=function(){r.open({template:"/views/icon/download.html",scope:i})},i.subscribe=function(){var a=$.trim(i.email),e=/^[a-z0-9-_]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;return a&&e.test(a)?(i.subscribed=!0,void $.post("/icon/subscribe",{design_id:t.id,mail:a})):void $("input[ng-model=email]").focus()}}])}();
!function(){"use strict";angular.module("rhIcon").controller("AdminCtrl",["$scope","$http","CoreService",function(o,n,t){o.validated=!1,o.login=function(){o.validated&&(o.validated.password=o.password,n.post("/admin/login",o.validated).success(function(o){t.resCallback(o,function(o){console.log(o)})}))}}])}();