"use strict";(self.webpackChunkreact_monkey_blogging_boilerplate=self.webpackChunkreact_monkey_blogging_boilerplate||[]).push([[297],{8322:function(e,t,n){n(2791);var s=n(184);t.Z=function(e){var t=e.title,n=void 0===t?"":t,a=e.desc,i=void 0===a?"":a,r=e.children;return(0,s.jsxs)("div",{className:"mb-4 flex items-start justify-between",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h1",{className:"dashboard-heading",children:n}),(0,s.jsx)("p",{className:"dashboard-short-desc",children:i})]}),r]})}},297:function(e,t,n){n.r(t);var s=n(1413),a=n(5861),i=n(9439),r=n(7757),l=n.n(r),o=n(2791),c=n(8322),u=n(6356),d=n(3453),h=n(9248),m=n(6024),f=n(5727),p=n(4170),g=n(5421),x=n(4961),v=n(8119),b=n(460),Z=n(1134),j=n(3585),y=n(3504),w=n(6871),k=n(9062),N=n(1199),E=n(333),P=n.n(E),q=n(577),A=n(3031),D=n(4490),S=n(6770),I=n.n(S),C=(n(6009),n(5179)),T=n(9808),U=n(184);S.Quill.register("modules/imageUploader",C.Z);t.default=function(){var e=(0,Z.cI)({mode:"onChange",defaultValues:{}}),t=e.control,n=e.handleSubmit,r=e.watch,E=e.reset,S=e.setValue,C=e.getValues,F=e.formState,L=(F.isSubmitting,F.isValid),B=(0,y.lr)(),H=(0,i.Z)(B,1)[0],R=r("status"),J=r("hot"),V=H.get("id"),_=(0,o.useState)([]),M=(0,i.Z)(_,2),O=M[0],Q=M[1],G=(0,o.useState)(""),X=(0,i.Z)(G,2),Y=(X[0],X[1]),$=(0,o.useState)(""),z=(0,i.Z)($,2),K=z[0],W=z[1],ee=(0,o.useState)(!1),te=(0,i.Z)(ee,2),ne=te[0],se=te[1],ae=(0,o.useState)(""),ie=(0,i.Z)(ae,2),re=ie[0],le=ie[1],oe=(0,w.s0)(),ce=C("image"),ue=function(){var e=(0,a.Z)(l().mark((function e(){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,k.JU)(N.db,"posts",V),e.next=3,(0,k.r7)(t,{image:"",imageName:""});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),de=(0,D.Z)(S,C,ue),he=de.handleSelectImage,me=de.setImage,fe=de.setProgress,pe=de.handleDeleteImage,ge=de.progress,xe=de.image,ve=de.imageName;(0,o.useEffect)((function(){me(ce)}),[ce,me]),(0,o.useEffect)((function(){function e(){return(e=(0,a.Z)(l().mark((function e(){var t,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,k.JU)(N.db,"posts",V),e.next=3,(0,k.QT)(t);case 3:n=e.sent,E(n.data());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[V,E]),(0,o.useEffect)((function(){function e(){return(e=(0,a.Z)(l().mark((function e(){var t,n,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,k.hJ)(N.db,"categories"),e.next=3,(0,k.PL)(t);case 3:n=e.sent,a=[],n.forEach((function(e){a.push((0,s.Z)({id:e.id},e.data()))})),Q(a);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()})),(0,o.useEffect)((function(){function e(){return(e=(0,a.Z)(l().mark((function e(){var t,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,k.JU)(N.db,"posts",V),e.next=3,(0,k.QT)(t);case 3:n=e.sent,W(n.data().category.name),le(n.data().content||"");case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[V]);var be=function(){var e=(0,a.Z)(l().mark((function e(t){var n,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,k.JU)(N.db,"categories",t.id),e.next=3,(0,k.QT)(n);case 3:a=e.sent,S("category",(0,s.Z)({id:t.id},a.data())),W(a.data().name);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ze=(0,o.useMemo)((function(){return{toolbar:[["bold","italic","underline","strike"],["blockquote"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{header:[1,2,3,4,5,6,!1]}],["link","image"]]}}),[]);if((0,T.a)().userInfo.role!==j.xZ.ADMIN)return(0,U.jsx)("div",{className:"text-[30px] font-semibold text-green-500 ",children:"This page is for admins only"});if(!V||V.title)return null;var je=function(){var e=(0,a.Z)(l().mark((function e(t){var n,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(L){e.next=2;break}return e.abrupt("return");case 2:return se(!0),e.prev=3,(n=(0,s.Z)({},t)).slug=P()(t.slug||t.title,{lower:!0}),n.status=Number(t.status),a=(0,k.JU)(N.db,"posts",V),e.next=10,(0,k.r7)(a,(0,s.Z)((0,s.Z)({},n),{},{image:xe,imageName:ve,content:re,createdAt:(0,k.Bt)()}));case 10:oe("/manage/posts"),q.Am.success("Create new Posts successfully!!"),E({title:"",slug:"",status:2,category:{},user:{},hot:!1,image:""}),me(""),fe(0),Y({}),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(3),se(!1);case 21:return e.prev=21,se(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[3,18,21,24]])})));return function(t){return e.apply(this,arguments)}}();return(0,U.jsxs)("div",{children:[(0,U.jsx)(c.Z,{title:"Update Posts",desc:"Manage all posts"}),(0,U.jsxs)("form",{action:"",onSubmit:n(je),children:[(0,U.jsxs)("div",{className:"grid grid-cols-1 gap-x-10 mb-10 items-start md:grid-cols-2 md:gap-x-10 md:mb-10 md:items-start",children:[(0,U.jsxs)(u.Z,{children:[(0,U.jsx)(d.Z,{children:"Title"}),(0,U.jsx)(h.Z,{control:t,placeholder:"Enter your title",name:"title",required:!0})]}),(0,U.jsxs)(u.Z,{children:[(0,U.jsx)(d.Z,{children:"Slug"}),(0,U.jsx)(h.Z,{control:t,placeholder:"Enter your slug",name:"slug"})]})]}),(0,U.jsxs)("div",{className:"grid grid-cols-1 gap-x-10 mb-10 items-start md:grid-cols-2 md:gap-x-10 md:mb-10 md:items-start",children:[(0,U.jsxs)(u.Z,{children:[(0,U.jsx)(d.Z,{children:"Image"}),(0,U.jsx)(A.Z,{onChange:he,className:"h-[250px]",handleDeleteImage:pe,progress:ge,image:xe})]}),(0,U.jsxs)(u.Z,{children:[(0,U.jsx)(d.Z,{children:"Category"}),(0,U.jsxs)(m.Z,{children:[(0,U.jsx)(f.Z,{placeholder:K||"Select the category"}),(0,U.jsx)(p.Z,{children:O.length>0&&O.map((function(e){return(0,U.jsx)(g.Z,{onClick:function(){return be(e)},children:e.name},e.name)}))})]})]})]}),(0,U.jsxs)("div",{className:"mb-10 entry-content",children:[(0,U.jsx)(d.Z,{children:"Content"}),(0,U.jsx)("div",{className:"mt-4",children:(0,U.jsx)(I(),{modules:Ze,theme:"snow",value:re,onChange:le,className:"w-full max-w-[350px] md:max-w-[760px] lg:max-w-full "})})]}),(0,U.jsxs)("div",{className:"grid grid-cols-1 gap-x-10 mb-10 items-start md:grid-cols-2 md:gap-x-10 md:mb-10 md:items-start",children:[(0,U.jsxs)(u.Z,{children:[(0,U.jsx)(d.Z,{children:"Feature Post"}),(0,U.jsx)(x.Z,{on:!0===J,onClick:function(){return S("hot",!J)}})]}),(0,U.jsxs)(u.Z,{children:[(0,U.jsx)(d.Z,{children:"Status"}),(0,U.jsxs)("div",{className:"flex items-center gap-x-5",children:[(0,U.jsx)(v.Z,{name:"status",control:t,checked:Number(R)===j.cf.APPROVED,value:j.cf.APPROVED,children:"Approved"}),(0,U.jsx)(v.Z,{name:"status",control:t,checked:Number(R)===j.cf.PENDING,value:j.cf.PENDING,children:"Pending"}),(0,U.jsx)(v.Z,{name:"status",control:t,checked:Number(R)===j.cf.REJECTED,value:j.cf.REJECTED,children:"Reject"})]})]})]}),(0,U.jsxs)("div",{className:"gap-x-5 flex justify-center",children:[(0,U.jsx)("div",{children:(0,U.jsx)(b.Z,{type:"submit",className:"mx-auto w-[200px]",isLoading:ne,disable:ne,children:"Update new post"})}),(0,U.jsx)("div",{children:(0,U.jsx)(b.Z,{to:"/manage/posts",className:"mx-auto w-[100px] sm:w-[200px] md:w-[200px] lg:w-[200px]  ",kind:"ghost",type:"submit",children:"Back"})})]})]})]})}},5179:function(e,t,n){n.d(t,{Z:function(){return f}});var s=n(5671),a=n(3144),i=n(1752),r=n(1120),l=n(136),o=n(3668),c=n(6921),u=n.n(c),d=function(e){(0,l.Z)(n,e);var t=(0,o.Z)(n);function n(){return(0,s.Z)(this,n),t.apply(this,arguments)}return(0,a.Z)(n,[{key:"deleteAt",value:function(e,t){(0,i.Z)((0,r.Z)(n.prototype),"deleteAt",this).call(this,e,t),this.cache={}}}],[{key:"create",value:function(e){var t=(0,i.Z)((0,r.Z)(n),"create",this).call(this,e);if(!0===e)return t;var s=document.createElement("img");return s.setAttribute("src",e),t.appendChild(s),t}},{key:"value",value:function(e){var t=e.dataset;return{src:t.src,custom:t.custom}}}]),n}(u().import("blots/block"));d.blotName="imageBlot",d.className="image-uploading",d.tagName="span",u().register({"formats/imageBlot":d});var h=d,m=function(){function e(t,n){(0,s.Z)(this,e),this.quill=t,this.options=n,this.range=null,this.placeholderDelta=null,"function"!==typeof this.options.upload&&console.warn("[Missing config] upload function that returns a promise is required");var a=this.quill.getModule("toolbar");a&&a.addHandler("image",this.selectLocalImage.bind(this)),this.handleDrop=this.handleDrop.bind(this),this.handlePaste=this.handlePaste.bind(this),this.quill.root.addEventListener("drop",this.handleDrop,!1),this.quill.root.addEventListener("paste",this.handlePaste,!1)}return(0,a.Z)(e,[{key:"selectLocalImage",value:function(){var e=this;this.quill.focus(),this.range=this.quill.getSelection(),this.fileHolder=document.createElement("input"),this.fileHolder.setAttribute("type","file"),this.fileHolder.setAttribute("accept","image/*"),this.fileHolder.setAttribute("style","visibility:hidden"),this.fileHolder.onchange=this.fileChanged.bind(this),document.body.appendChild(this.fileHolder),this.fileHolder.click(),window.requestAnimationFrame((function(){document.body.removeChild(e.fileHolder)}))}},{key:"handleDrop",value:function(e){var t=this;if(e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files.length){if(e.stopPropagation(),e.preventDefault(),document.caretRangeFromPoint){var n=document.getSelection(),s=document.caretRangeFromPoint(e.clientX,e.clientY);n&&s&&n.setBaseAndExtent(s.startContainer,s.startOffset,s.startContainer,s.startOffset)}else{var a=document.getSelection(),i=document.caretPositionFromPoint(e.clientX,e.clientY);a&&i&&a.setBaseAndExtent(i.offsetNode,i.offset,i.offsetNode,i.offset)}this.quill.focus(),this.range=this.quill.getSelection();var r=e.dataTransfer.files[0];setTimeout((function(){t.quill.focus(),t.range=t.quill.getSelection(),t.readAndUploadFile(r)}),0)}}},{key:"handlePaste",value:function(e){var t=this,n=e.clipboardData||window.clipboardData;if(n&&(n.items||n.files))for(var s=n.items||n.files,a=/^image\/(jpe?g|gif|png|svg|webp)$/i,i=0;i<s.length;i++)a.test(s[i].type)&&function(){var n=s[i].getAsFile?s[i].getAsFile():s[i];n&&(t.quill.focus(),t.range=t.quill.getSelection(),e.preventDefault(),setTimeout((function(){t.quill.focus(),t.range=t.quill.getSelection(),t.readAndUploadFile(n)}),0))}()}},{key:"readAndUploadFile",value:function(e){var t=this,n=!1,s=new FileReader;s.addEventListener("load",(function(){if(!n){var e=s.result;t.insertBase64Image(e)}}),!1),e&&s.readAsDataURL(e),this.options.upload(e).then((function(e){t.insertToEditor(e)}),(function(e){n=!0,t.removeBase64Image(),console.warn(e)}))}},{key:"fileChanged",value:function(){var e=this.fileHolder.files[0];this.readAndUploadFile(e)}},{key:"insertBase64Image",value:function(e){var t=this.range;this.placeholderDelta=this.quill.insertEmbed(t.index,h.blotName,"".concat(e),"user")}},{key:"insertToEditor",value:function(e){var t=this.range,n=this.calculatePlaceholderInsertLength();this.quill.deleteText(t.index,n,"user"),this.quill.insertEmbed(t.index,"image","".concat(e),"user"),t.index++,this.quill.setSelection(t,"user")}},{key:"calculatePlaceholderInsertLength",value:function(){return this.placeholderDelta.ops.reduce((function(e,t){return t.hasOwnProperty("insert")&&e++,e}),0)}},{key:"removeBase64Image",value:function(){var e=this.range,t=this.calculatePlaceholderInsertLength();this.quill.deleteText(e.index,t,"user")}}]),e}();window.ImageUploader=m;var f=m}}]);
//# sourceMappingURL=297.d2e3bdd3.chunk.js.map