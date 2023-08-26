"use strict";(self.webpackChunkreact_monkey_blogging_boilerplate=self.webpackChunkreact_monkey_blogging_boilerplate||[]).push([[945,791],{460:function(n,e,t){var i,r,o,a,s=t(1413),l=t(4925),d=t(168),c=(t(2791),t(6031)),p=t(3504),x=t(184),h=["type","onClick","children","kind"],m=c.ZP.button(i||(i=(0,d.Z)(["\n  cursor: pointer;\n\n  /* padding: 10px 0; */\n  height: ",";\n  line-height: 1;\n\n  ",";\n  ",";\n  ",";\n  border-radius: 8px;\n  font-weight: 600;\n  &:disabled {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n  .loadingsvg {\n    width: 40px;\n    height: 40px;\n    margin: 0 auto;\n  }\n"])),(function(n){return n.height||"50px"}),(function(n){return"secondary"===n.kind&&(0,c.iv)(r||(r=(0,d.Z)(["\n      color: ",";\n      background-color: white;\n    "])),(function(n){return n.theme.primary}))}),(function(n){return"primary"===n.kind&&(0,c.iv)(o||(o=(0,d.Z)(["\n      color: white;\n      background-image: linear-gradient(\n        to right bottom,\n        ",",\n        ","\n      );\n    "])),(function(n){return n.theme.primary}),(function(n){return n.theme.secondary}))}),(function(n){return"ghost"===n.kind&&(0,c.iv)(a||(a=(0,d.Z)(["\n      color: ",";\n      background-color: rgba(29, 192, 113, 0.1);\n      padding: 10px;\n    "])),(function(n){return n.theme.primary}))}));e.Z=function(n){var e=n.type,t=void 0===e?"button":e,i=n.onClick,r=void 0===i?function(){}:i,o=n.children,a=n.kind,d=void 0===a?"primary":a,c=(0,l.Z)(n,h),u=c.isLoading,g=c.to,f=u?(0,x.jsx)("img",{src:"/Spin-1s-200px.svg",className:"loadingsvg",alt:""}):o;return""!==g&&"string"===typeof g?(0,x.jsx)(p.OL,{to:g,children:(0,x.jsx)(m,(0,s.Z)((0,s.Z)({type:t,kind:d},c),{},{children:f}))}):(0,x.jsx)(m,(0,s.Z)((0,s.Z)({type:t,kind:d,onClick:r},c),{},{children:f}))}},1103:function(n,e,t){var i,r=t(168),o=(t(2791),t(6031)),a=t(460),s=t(3504),l=t(9808),d=t(3585),c=(t(3655),t(184)),p=o.ZP.div(i||(i=(0,r.Z)(["\n  background-color: white;\n  padding: 20px;\n  border-bottom: 1px solid #eee;\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  .header-avatar {\n    width: 52px;\n    height: 52px;\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: 100rem;\n    }\n  }\n  /* PC styles (>=1024px) */\n  @media (min-width: 1024px) {\n    /* PC styles */\n    .barsdetails {\n      display: none;\n    }\n  }\n\n  /* Tablet styles (>=768px and <1024px) */\n  @media (min-width: 640px) and (max-width: 1023px) {\n    /* Tablet styles */\n    .logodashboard {\n      display: none;\n    }\n  }\n\n  /* Mobile styles (<640px) */\n  @media (max-width: 640px) {\n    /* Mobile styles */\n    .logodashboard {\n      display: none;\n    }\n  }\n"])));e.Z=function(n){var e=n.onToggleSidebar,t=(0,l.a)().userInfo;return(0,c.jsxs)(p,{children:[(0,c.jsx)("div",{className:"logodashboard w-[50px] ml-10",children:(0,c.jsx)(s.OL,{to:"/",children:(0,c.jsx)("img",{srcSet:"/logo.png 2x",alt:""})})}),(0,c.jsx)("div",{onClick:e,className:"relative",children:(0,c.jsx)("span",{className:"barsdetails block p-5 cursor-pointer",children:(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-8 h-8",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"})})})}),(0,c.jsxs)("div",{className:"flex gap-x-3",children:[t.role===d.xZ.ADMIN?(0,c.jsx)(a.Z,{to:"/manage/add-post",className:"header-button p-4",height:"52px",children:"Write new post Admin"}):(0,c.jsx)(a.Z,{to:"/user-add-post",className:"header-button p-4",height:"52px",children:"Write new post User"}),(0,c.jsx)(s.rU,{to:"/profile",children:(0,c.jsx)("div",{className:"header-avatar",children:(0,c.jsx)("img",{src:null===t||void 0===t?void 0:t.avatar,alt:""})})})]})]})}},6945:function(n,e,t){t.r(e);var i,r=t(9439),o=t(168),a=t(2791),s=t(6871),l=t(6031),d=t(1103),c=t(3655),p=t(9808),x=t(6791),h=t(184),m=l.ZP.div(i||(i=(0,o.Z)(["\n  max-width: 1600px;\n  margin: 0 auto;\n  .dashboard {\n    &-heading {\n      font-weight: bold;\n      font-size: 36px;\n      margin-bottom: 40px;\n      color: ",";\n      letter-spacing: 1px;\n    }\n    &-main {\n      display: grid;\n      grid-template-columns: 300px minmax(0, 1fr);\n      padding: 40px 20px;\n      gap: 0 40px;\n      align-items: start;\n    }\n  }\n  /* PC styles (>=1024px) */\n  @media (min-width: 1024px) {\n    /* PC styles */\n  }\n\n  /* Tablet styles (>=768px and <1024px) */\n  @media (min-width: 768px) and (max-width: 1023px) {\n    /* Tablet styles */\n    .dashboard-main {\n      display: grid;\n      grid-template-columns: 1fr;\n      gap: 10px;\n    }\n  }\n\n  /* Mobile styles (<640px) */\n  @media (max-width: 640px) {\n    /* Mobile styles */\n    .dashboard-main {\n      display: grid;\n      grid-template-columns: 1fr;\n      gap: 10px;\n    }\n  }\n"])),(function(n){return n.theme.primary}));e.default=function(n){n.children;var e=(0,p.a)().userInfo,t=(0,a.useState)(!1),i=(0,r.Z)(t,2),o=i[0],l=i[1];if(!e)return(0,h.jsx)(x.default,{});return(0,h.jsxs)(m,{children:[(0,h.jsx)(d.Z,{onToggleSidebar:function(){l(!o)}}),(0,h.jsxs)("div",{className:"dashboard-main",children:[(0,h.jsx)(c.Z,{showSidebar:o}),(0,h.jsx)("div",{className:"dashboard-children",children:(0,h.jsx)(s.j3,{})})]})]})}},3655:function(n,e,t){var i,r=t(168),o=(t(289),t(2791),t(3504)),a=t(6031),s=(t(1199),t(184)),l=a.ZP.div(i||(i=(0,r.Z)(["\n  width: 300px;\n  background: #ffffff;\n  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);\n  border-radius: 12px;\n  .sidebar-logo {\n    display: flex;\n    align-items: center;\n    font-weight: 600;\n    gap: 0 20px;\n    img {\n      max-width: 40px;\n    }\n    margin-bottom: 20px;\n    padding: 20px 20px 0;\n  }\n  .menu-item {\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    padding: 14px 20px;\n    font-weight: 500;\n    color: ",";\n    margin-bottom: 20px;\n    cursor: pointer;\n    &.active,\n    &:hover {\n      background: #f1fbf7;\n      color: ",";\n    }\n  }\n\n  /* PC styles (>=1024px) */\n  @media (min-width: 1024px) {\n    /* PC styles */\n  }\n\n  /* Tablet styles (>=768px and <1024px) */\n  @media (min-width: 640px) and (max-width: 1023px) {\n    /* Tablet styles */\n    position: absolute;\n    top: -40px;\n    left: -20px;\n    .sidebar-logo {\n      /* display: none; */\n    }\n  }\n\n  /* Mobile styles (<640px) */\n  @media (max-width: 640px) {\n    /* Mobile styles */\n    /* width: 100px; */\n\n    /* transform: translateX(-50%); */\n    /* background-color: red; */\n    position: absolute;\n    top: -40px;\n    left: -20px;\n    .sidebar-logo {\n      /* display: none; */\n    }\n    .menu-item {\n    }\n    .menu-text {\n      /* display: none; */\n    }\n    .tranX-full {\n      transform: translate(-100%);\n    }\n  }\n"])),(function(n){return n.theme.gray80}),(function(n){return n.theme.primary})),d=[{title:"Dashboard",url:"/dashboard",icon:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"})})},{title:"My Post",url:"/my-post",icon:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})})},{title:"Post",url:"/manage/posts",icon:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})})},{title:"Category",url:"/manage/category",icon:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"})})},{title:"User",url:"/manage/user",icon:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"})})},{title:"Back to Home",url:"/",icon:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})})}];e.Z=function(n){var e=n.showSidebar;return(0,s.jsx)("div",{className:"z-50  transition-all ".concat(e?"translate-x-[0px] ":"-translate-x-full"," lg:translate-x-[0px]"),children:(0,s.jsxs)(l,{children:[(0,s.jsxs)("div",{className:"sidebar-logo",children:[(0,s.jsx)(o.OL,{to:"/",children:(0,s.jsx)("img",{srcSet:"/logo.png 2x",alt:""})}),(0,s.jsx)("span",{children:"Monkey Blogging"})]}),(0,s.jsx)("div",{children:d.map((function(n){return n.onClick?(0,s.jsxs)("div",{onClick:n.onClick,className:"menu-item",children:[(0,s.jsx)("span",{className:"menu-icon",children:n.icon}),(0,s.jsx)("span",{className:"menu-text",children:n.title})]},n.title):(0,s.jsxs)(o.OL,{to:n.url,className:"menu-item",children:[(0,s.jsx)("span",{className:"menu-icon",children:n.icon}),(0,s.jsx)("span",{className:"menu-text",children:n.title})]},n.title)}))})]})})}},6791:function(n,e,t){t.r(e);var i,r=t(168),o=(t(2791),t(6871)),a=t(6031),s=t(184),l=a.ZP.div(i||(i=(0,r.Z)(["\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  background-color: ",";\n  color: white;\n  .page-content {\n    max-width: 1000px;\n    margin: 0 auto;\n    text-align: center;\n  }\n  .logo {\n    display: inline-block;\n    margin-bottom: 40px;\n  }\n  .heading {\n    font-size: 60px;\n    font-weight: bold;\n    margin-bottom: 20px;\n  }\n  .description {\n    max-width: 800px;\n    margin: 0 auto 40px;\n  }\n  .back {\n    display: inline-block;\n    padding: 15px 30px;\n    color: white;\n    background-image: linear-gradient(\n      to right top,\n      ",",\n      ","\n    );\n    border-radius: 8px;\n    font-weight: 500;\n    cursor: pointer;\n  }\n  .image {\n    max-width: 250px;\n    margin: 0 auto 40px;\n  }\n"])),(function(n){return n.theme.black}),(function(n){return n.theme.primary}),(function(n){return n.theme.secondary}));e.default=function(){var n=(0,o.s0)();return(0,s.jsx)(l,{children:(0,s.jsxs)("div",{className:"page-content",children:[(0,s.jsx)("img",{src:"/404.png",alt:"notfound",className:"image"}),(0,s.jsx)("h1",{className:"heading",children:"404 - Looks like you're lost."}),(0,s.jsx)("p",{className:"description",children:"Maybe this page used to exist or you just spelled something wrong. Chances are your spelled something wrong, so can you double check the URL?"}),(0,s.jsx)("button",{onClick:function(){return n("/")},className:"back",children:"Go back"})]})})}},4925:function(n,e,t){function i(n,e){if(null==n)return{};var t,i,r=function(n,e){if(null==n)return{};var t,i,r={},o=Object.keys(n);for(i=0;i<o.length;i++)t=o[i],e.indexOf(t)>=0||(r[t]=n[t]);return r}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(i=0;i<o.length;i++)t=o[i],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(r[t]=n[t])}return r}t.d(e,{Z:function(){return i}})}}]);
//# sourceMappingURL=945.4b825da4.chunk.js.map