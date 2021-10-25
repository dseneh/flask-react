(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{163:function(e,t,n){"use strict";var a=n(36);t.a=a.instance},164:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var a=n(43),c=n(0),r=n.n(c),o=n(134),i=Object(o.a)()?r.a.useLayoutEffect:r.a.useEffect,s=/\s+/;var l=new Map,d=function(e,t){var n=function(e){var t=[];return e?(e.forEach((function(e){"string"===typeof e.current&&e.current.split(s).forEach((function(e){t.push(e)}))})),t.filter((function(e,t,n){return e.length>0&&n.indexOf(e)===t}))):[]}(t),a=function(e,t){return[t.filter((function(t){return-1===e.indexOf(t)})),e.filter((function(e){return-1===t.indexOf(e)}))]}(l.get(e)||[],n),c=a[0],r=a[1];e&&(c.forEach((function(t){return e.classList.add(t)})),r.forEach((function(t){return e.classList.remove(t)}))),l.set(e,n)},u=new function(){var e=this;this.add=function(t,n){if(e.nodes.has(t)){e.nodes.get(t).add(n)}else{var a=new Set;a.add(n),e.nodes.set(t,a)}},this.del=function(t,n){if(e.nodes.has(t)){var a=e.nodes.get(t);1!==a.size?a.delete(n):e.nodes.delete(t)}},this.emit=function(t,n){n(t,e.nodes.get(t))},this.nodes=new Map};function b(e,t){var n=r.a.useRef(),c=r.a.useRef(!1);i((function(){if(n.current=t,c.current){var r=Object(a.b)(e)?e.current:e;u.emit(r,d)}c.current=!0}),[t]),i((function(){var t=Object(a.b)(e)?e.current:e;return u.add(t,n),u.emit(t,d),function(){u.del(t,n),u.emit(t,d)}}),[e])}},237:function(e,t,n){},276:function(e,t,n){"use strict";var a=n(1),c=n(8),r=n(138),o=n(135),i=n(35),s=n(137),l=n(67),d=n(4),u=n(233),b=n(6),j=(n(3),n(0)),m=n.n(j),h=n(92),p=n.n(h),f=n(134),O=n(155),v=n(163),g=n(23),x=n(130),N=n(7),y=n(129),C=n(157),k=n(85),D=n(234),w=n(45),P=n(154),E=n(232),S=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(t=e.call.apply(e,[this].concat(a))||this).handleButtonOverrides=function(e){return{onClick:function(n,a){Object(d.a)(e,"onClick",n,a),Object(d.a)(t.props,"onActionClick",n,a)}}},t}return Object(c.a)(t,e),t.prototype.render=function(){var e=this,n=this.props,c=n.actions,r=n.children,o=n.className,i=n.content,s=Object(b.a)("actions",o),l=Object(y.a)(t,this.props),d=Object(x.a)(t,this.props);return N.a.isNil(r)?N.a.isNil(i)?m.a.createElement(d,Object(a.a)({},l,{className:s}),Object(w.a)(c,(function(t){return E.a.create(t,{overrideProps:e.handleButtonOverrides})}))):m.a.createElement(d,Object(a.a)({},l,{className:s}),i):m.a.createElement(d,Object(a.a)({},l,{className:s}),r)},t}(j.Component);function A(e){var t=e.children,n=e.className,c=e.content,r=e.image,o=e.scrolling,i=Object(b.a)(n,Object(g.a)(r,"image"),Object(g.a)(o,"scrolling"),"content"),s=Object(y.a)(A,e),l=Object(x.a)(A,e);return m.a.createElement(l,Object(a.a)({},s,{className:i}),N.a.isNil(t)?c:t)}S.handledProps=["actions","as","children","className","content","onActionClick"],S.propTypes={},S.create=Object(P.e)(S,(function(e){return{actions:e}})),A.handledProps=["as","children","className","content","image","scrolling"],A.propTypes={},A.create=Object(P.e)(A,(function(e){return{content:e}}));var _=A;function I(e){var t=e.children,n=e.className,c=e.content,r=Object(b.a)("description",n),o=Object(y.a)(I,e),i=Object(x.a)(I,e);return m.a.createElement(i,Object(a.a)({},o,{className:r}),N.a.isNil(t)?c:t)}I.handledProps=["as","children","className","content"],I.propTypes={};var z=I,R=n(164);function M(e){var t=e.blurring,n=e.children,c=e.className,r=e.centered,o=e.content,i=e.inverted,s=e.mountNode,l=e.scrolling,d=m.a.useRef(),j=Object(b.a)("ui",Object(g.a)(i,"inverted"),Object(g.a)(!r,"top aligned"),"page modals dimmer transition visible active",c),h=Object(b.a)("dimmable dimmed",Object(g.a)(t,"blurring"),Object(g.a)(l,"scrolling")),p=Object(y.a)(M,e),f=Object(x.a)(M,e);return Object(R.a)(s,h),m.a.useEffect((function(){d.current&&d.current.style&&d.current.style.setProperty("display","flex","important")}),[]),m.a.createElement(u.a,{innerRef:d},m.a.createElement(f,Object(a.a)({},p,{className:j}),N.a.isNil(n)?o:n))}M.handledProps=["as","blurring","centered","children","className","content","inverted","mountNode","scrolling"],M.propTypes={},M.create=Object(P.e)(M,(function(e){return{content:e}}));var T=M;function L(e){var t=e.children,n=e.className,c=e.content,r=Object(b.a)("header",n),o=Object(y.a)(L,e),i=Object(x.a)(L,e);return m.a.createElement(i,Object(a.a)({},o,{className:r}),N.a.isNil(t)?c:t)}L.handledProps=["as","children","className","content"],L.propTypes={},L.create=Object(P.e)(L,(function(e){return{content:e}}));var U=L,Y=function(e){var t=e.height+0,n=e.height+0,a=window.innerHeight;return a/2+-n/2+t+50<a},K=function(e,t,n){var a=t&&e?-n.height/2:0;return{marginLeft:-n.width/2,marginTop:a}},B=function(){return!window.ActiveXObject&&"ActiveXObject"in window},F=function(e){function t(){for(var n,c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(n=e.call.apply(e,[this].concat(r))||this).legacy=Object(f.a)()&&B(),n.ref=Object(j.createRef)(),n.dimmerRef=Object(j.createRef)(),n.latestDocumentMouseDownEvent=null,n.getMountNode=function(){return Object(f.a)()?n.props.mountNode||document.body:null},n.handleActionsOverrides=function(e){return{onActionClick:function(t,a){Object(d.a)(e,"onActionClick",t,a),Object(d.a)(n.props,"onActionClick",t,n.props),n.handleClose(t)}}},n.handleClose=function(e){Object(d.a)(n.props,"onClose",e,Object(a.a)({},n.props,{open:!1})),n.setState({open:!1})},n.handleDocumentMouseDown=function(e){n.latestDocumentMouseDownEvent=e},n.handleDocumentClick=function(e){var t=n.props.closeOnDimmerClick,c=n.latestDocumentMouseDownEvent;n.latestDocumentMouseDownEvent=null,!t||Object(O.a)(n.ref.current,c)||Object(O.a)(n.ref.current,e)||(Object(d.a)(n.props,"onClose",e,Object(a.a)({},n.props,{open:!1})),n.setState({open:!1}))},n.handleIconOverrides=function(e){return{onClick:function(t){Object(d.a)(e,"onClick",t),n.handleClose(t)}}},n.handleOpen=function(e){Object(d.a)(n.props,"onOpen",e,Object(a.a)({},n.props,{open:!0})),n.setState({open:!0})},n.handlePortalMount=function(e){var t=n.props.eventPool;n.setState({scrolling:!1}),n.setPositionAndClassNames(),v.a.sub("mousedown",n.handleDocumentMouseDown,{pool:t,target:n.dimmerRef.current}),v.a.sub("click",n.handleDocumentClick,{pool:t,target:n.dimmerRef.current}),Object(d.a)(n.props,"onMount",e,n.props)},n.handlePortalUnmount=function(e){var t=n.props.eventPool;cancelAnimationFrame(n.animationRequestId),v.a.unsub("mousedown",n.handleDocumentMouseDown,{pool:t,target:n.dimmerRef.current}),v.a.unsub("click",n.handleDocumentClick,{pool:t,target:n.dimmerRef.current}),Object(d.a)(n.props,"onUnmount",e,n.props)},n.setPositionAndClassNames=function(){var e,t=n.props.centered,a={};if(n.ref.current){var c=n.ref.current.getBoundingClientRect(),r=Y(c);e=!r;var o=n.legacy?K(r,t,c):{};p()(n.state.legacyStyles,o)||(a.legacyStyles=o),n.state.scrolling!==e&&(a.scrolling=e)}Object(l.a)(a)||n.setState(a),n.animationRequestId=requestAnimationFrame(n.setPositionAndClassNames)},n.renderContent=function(e){var c=n.props,r=c.actions,o=c.basic,i=c.children,s=c.className,l=c.closeIcon,d=c.content,j=c.header,h=c.size,p=c.style,f=n.state,O=f.legacyStyles,v=f.scrolling,y=Object(b.a)("ui",h,Object(g.a)(o,"basic"),Object(g.a)(n.legacy,"legacy"),Object(g.a)(v,"scrolling"),"modal transition visible active",s),C=Object(x.a)(t,n.props),D=!0===l?"close":l,w=k.a.create(D,{overrideProps:n.handleIconOverrides});return m.a.createElement(u.a,{innerRef:n.ref},m.a.createElement(C,Object(a.a)({},e,{className:y,style:Object(a.a)({},O,p)}),w,N.a.isNil(i)?m.a.createElement(m.a.Fragment,null,U.create(j,{autoGenerateKey:!1}),_.create(d,{autoGenerateKey:!1}),S.create(r,{overrideProps:n.handleActionsOverrides})):i))},n}Object(c.a)(t,e);var n=t.prototype;return n.componentWillUnmount=function(){this.handlePortalUnmount()},n.render=function(){var e=this.props,n=e.centered,c=e.closeOnDocumentClick,l=e.dimmer,d=e.eventPool,b=e.trigger,h=this.state,p=h.open,O=h.scrolling,v=this.getMountNode();if(!Object(f.a)())return Object(j.isValidElement)(b)?b:null;var g=Object(y.a)(t,this.props),x=D.a.handledProps,N=Object(s.a)(g,(function(e,t,n){return Object(i.a)(x,n)||(e[n]=t),e}),{}),C=Object(o.a)(g,x);return m.a.createElement(D.a,Object(a.a)({closeOnDocumentClick:c},C,{trigger:b,eventPool:d,mountNode:v,open:p,onClose:this.handleClose,onMount:this.handlePortalMount,onOpen:this.handleOpen,onUnmount:this.handlePortalUnmount}),m.a.createElement(u.a,{innerRef:this.dimmerRef},T.create(Object(r.a)(l)?l:{},{autoGenerateKey:!1,defaultProps:{blurring:"blurring"===l,inverted:"inverted"===l},overrideProps:{children:this.renderContent(N),centered:n,mountNode:v,scrolling:O}})))},t}(C.a);F.handledProps=["actions","as","basic","centered","children","className","closeIcon","closeOnDimmerClick","closeOnDocumentClick","content","defaultOpen","dimmer","eventPool","header","mountNode","onActionClick","onClose","onMount","onOpen","onUnmount","open","size","style","trigger"],F.propTypes={},F.defaultProps={centered:!0,dimmer:!0,closeOnDimmerClick:!0,closeOnDocumentClick:!1,eventPool:"Modal"},F.autoControlledProps=["open"],F.Actions=S,F.Content=_,F.Description=z,F.Dimmer=T,F.Header=U;t.a=F},343:function(e,t,n){"use strict";n.r(t);var a=n(15),c=n.n(a),r=n(38),o=n(5),i=n(0),s=n.n(i),l=n(277),d=n(85),u=n(250),b=n(230),j=n(232),m=n(44),h=n.n(m),p=n(61),f=n(10),O=n(231),v=n(244),g=n(245),x=n.n(g),N=n(22),y=n(13),C=n(276),k=(n(237),n(2)),D=function(e){var t=Object(i.useState)(!1),n=Object(o.a)(t,2),a=n[0],s=n[1],l=Object(y.c)(N.a),b=Object(o.a)(l,2),m=b[0],p=b[1],f=Object(i.useState)(!1),v=Object(o.a)(f,2),g=v[0],x=v[1],D=Object(k.jsxs)(u.a,{className:"text-center mt-3",children:[Object(k.jsx)(d.a,{name:"check circle",color:"green",style:{fontSize:"3rem"},size:"large"}),Object(k.jsxs)("div",{className:"py-4",children:[m.profile.active?Object(k.jsx)("h5",{children:"Your account is now active!"}):Object(k.jsx)("h5",{children:"Your account has been deactivated!"}),Object(k.jsx)(j.a,{color:"red",size:"large",onClick:e.handleSendEmail,children:"Close"})]})]}),w=function(){var e=Object(r.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=localStorage.getItem("TKID"))){e.next=6;break}return s(!0),n={headers:{Authorization:"Bearer ".concat(t)}},e.next=6,h.a.put("".concat("","/api/profile/toggle_status"),n).then((function(){h.a.get("".concat("","/api/profilelist")).then((function(e){p(e.data),s(!1),x(!0)}))})).catch((function(e){console.log(e),x(!1),s(!1)}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(k.jsxs)(C.a,{closeIcon:!0,open:e.open,onClose:function(){e.handleDeactivate(),x(!1)},children:[Object(k.jsxs)(C.a.Header,{children:[m.profile.active?"Deactivate":"Activate"," Your Account"]}),Object(k.jsx)(C.a.Content,{className:"mb-2",children:g?D:Object(k.jsx)(O.a,{className:" mb-3",loading:a,onSubmit:w,children:m.profile.active?Object(k.jsxs)("div",{children:[Object(k.jsx)("p",{children:"You can temporarily deactivate your profile. This means that your profile will NOT be visible to anyone trying to view your page."}),Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{className:"mt-5",fluid:!0,color:"red",size:"large",children:"Deactivate"}),Object(k.jsx)(j.a,{className:"mt-2",fluid:!0,color:"default",size:"large",onClick:e.handleDeactivate,children:"Cancel"})]})]}):Object(k.jsxs)("div",{children:[Object(k.jsx)("p",{children:"You can re-activate your profile. This means that your profile will now be visible to anyone trying to view your page."}),Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{className:"mt-5",fluid:!0,color:"green",size:"large",children:"Activate"}),Object(k.jsx)(j.a,{className:"mt-2",fluid:!0,color:"default",size:"large",onClick:e.handleDeactivate,children:"Cancel"})]})]})})})]})},w=n(60),P=function(e){var t=Object(i.useState)(!1),n=Object(o.a)(t,2),a=n[0],l=n[1],d=Object(i.useState)(!1),u=Object(o.a)(d,2),b=u[0],m=u[1],g=Object(y.d)(N.a),C=Object(i.useState)({first_name:"",last_name:"",email:"",linkedin:"",image:"",about:""}),P=Object(o.a)(C,2),E=P[0],S=P[1],A=Object(i.useState)({first_name:!1,last_name:!1}),_=Object(o.a)(A,2),I=_[0],z=_[1];s.a.useEffect((function(){S(e.data)}),[]);var R=function(){m(!b)},M=function(){var t=Object(r.a)(c.a.mark((function t(){var n,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(new Date(E.last_modified.$date).toUTCString()),E.first_name&&E.last_name){t.next=5;break}z({first_name:!0,last_name:!0}),t.next=18;break;case 5:if(E._id&&"undefined"!==E._id){t.next=15;break}if(l(!0),!(n=localStorage.getItem("TKID"))){t.next=13;break}return l(!0),a={headers:{Authorization:"Bearer ".concat(n)}},t.next=13,h.a.post("".concat("","/api/profile"),E,a).then((function(t){e.handleUpdate(t.data.profile),l(!1),e.hide()})).catch((function(e){e.response?console.log(e.response.data):console.log(e),z(!0),l(!1)}));case 13:t.next=18;break;case 15:return t.next=17,L();case 17:e.hide();case 18:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),T=function(e,t){var n=t.name,a=t.value;z(Object(f.a)(Object(f.a)({},I),{},Object(p.a)({},n,!1))),S(Object(f.a)(Object(f.a)({},E),{},Object(p.a)({},n,a)))},L=function(){var t=Object(r.a)(c.a.mark((function t(){var n,a,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.data._id,E.first_name&&E.last_name){t.next=5;break}z({first_name:!0,last_name:!0}),t.next=12;break;case 5:if(l(!0),!(a=localStorage.getItem("TKID"))){t.next=12;break}return l(!0),r={headers:{Authorization:"Bearer ".concat(a)}},t.next=12,h.a.put("".concat("","/api/profile/").concat(n),E,r).then((function(t){e.handleUpdate(t.data.profile),l(!1),e.hide()})).catch((function(e){z(!0),e.response?console.log(e.response.data):console.log(e),l(!1)}));case 12:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();e.data.about;return Object(k.jsx)("div",{className:"container p-4 pt-5",children:Object(k.jsxs)(w.Fade,{children:[Object(k.jsxs)(O.a,{className:" mb-3",loading:a,onSubmit:M,disabled:!e.handleDisabled,children:[Object(k.jsxs)(O.a.Group,{widths:"equal",children:[Object(k.jsx)(O.a.Input,{name:"first_name",error:I.first_name,placeholder:"First Name",onChange:T,label:"First Name",value:E.first_name,readOnly:!e.handleDisabled}),Object(k.jsx)(O.a.Input,{widths:4,name:"last_name",error:I.last_name,placeholder:"Last name",onChange:T,label:"Last Name",value:E.last_name,readOnly:!e.handleDisabled})]}),Object(k.jsxs)(O.a.Group,{widths:"equal",children:[Object(k.jsx)(O.a.Input,{name:"email",label:"Email Address",placeholder:"Email address",onChange:T,value:E.email,readOnly:!e.handleDisabled}),Object(k.jsx)(O.a.Input,{name:"phone",label:"Phone Number",placeholder:"Phone number",onChange:T,value:E.phone,readOnly:!e.handleDisabled})]}),Object(k.jsx)(O.a.Input,{label:"Occupation",name:"occupation",placeholder:"Occupation",onChange:T,value:E.occupation,readOnly:!e.handleDisabled}),Object(k.jsx)(O.a.Input,{label:"LinkedIn Profile",name:"linkedin",placeholder:"Your LinkedIn Profile",onChange:T,value:E.linkedin,readOnly:!e.handleDisabled}),Object(k.jsx)(O.a.Input,{label:"Your Photo Link",name:"image",value:E.image,placeholder:"Your profile image",onChange:T,readOnly:!e.handleDisabled}),Object(k.jsx)("h6",{className:"font-weight-bold mb-3",children:"Summary about yourself:"}),Object(k.jsx)(v.CKEditor,{editor:x.a,onChange:function(e,t){var n=t.getData();S(Object(f.a)(Object(f.a)({},E),{},{about:n}))},data:e.data.about,config:{toolbar:["bold","italic","numberedList","bulletedList"]},disabled:!e.handleDisabled}),Object(k.jsx)("div",{className:" mt-4 ",children:Object(k.jsxs)("div",{className:"row",children:[Object(k.jsx)("div",{className:"col"}),Object(k.jsx)("div",{className:"col",children:Object(k.jsx)("div",{className:" text-right",children:Object(k.jsx)(j.a,{disabled:!e.handleDisabled,className:"",color:"blue",size:"large",children:"Save"})})})]})})]}),Object(k.jsx)("div",{className:"border-bottom mb-3",children:Object(k.jsx)("h4",{children:"Your Account"})}),Object(k.jsxs)("div",{className:" row",children:[Object(k.jsx)("div",{className:"col",children:g.profile.active?Object(k.jsx)(j.a,{className:"",color:"red",size:"large",onClick:R,children:"Deactivate"}):Object(k.jsx)("div",{className:" text-left",children:Object(k.jsx)(j.a,{className:"",color:"green",size:"large",onClick:R,children:"Activate"})})}),Object(k.jsx)("div",{className:"col text-right",children:Object(k.jsxs)("p",{children:["Account status:",g.profile.active?Object(k.jsx)("strong",{className:"text-success",children:" ACTIVE"}):Object(k.jsx)("strong",{className:"text-danger",children:" DISABLED"})]})})]}),Object(k.jsx)(D,{handleDeactivate:R,open:b})]})})};t.default=function(){var e=Object(i.useState)(!1),t=Object(o.a)(e,2),n=t[0],a=t[1],s=Object(i.useState)(!1),m=Object(o.a)(s,2),p=m[0],f=m[1],O=Object(i.useState)(!1),v=Object(o.a)(O,2),g=v[0],x=v[1],N=Object(i.useState)({first_name:"",last_name:"",email:"",linkedin:"",image:"",about:"",last_modified:{}}),y=Object(o.a)(N,2),C=y[0],D=y[1];Object(i.useEffect)((function(){(function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("TKID")){e.next=5;break}return f(!0),e.next=5,h.a.get("".concat("","/api/profile")).then((function(e){D(e.data.profile),f(!1)})).catch((function(e){f(!1),x(!0),e.response?console.log(e.response.data):console.log(e)}));case 5:f(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);return g?Object(k.jsxs)("div",{style:{fontSize:"1.6rem"},children:[Object(k.jsx)(d.a,{name:"warning sign",size:"large",color:"red"}),Object(k.jsx)("p",{children:"Oops! There was an error loading data."})]}):Object(k.jsx)(k.Fragment,{children:p?Object(k.jsx)(u.a,{style:{minHeight:300},children:Object(k.jsx)(b.a,{size:"large",active:p,children:"Loading"})}):Object(k.jsxs)(l.a,{bordered:!0,hover:!0,responsive:!0,className:"bg-white",children:[Object(k.jsx)("thead",{children:Object(k.jsx)("tr",{children:Object(k.jsx)("th",{colSpan:"5",children:n?Object(k.jsx)(j.a,{floated:"right",color:"red",size:"small",content:"Cancel",onClick:function(){a(!1)}}):Object(k.jsx)(j.a,{floated:"right",icon:"pencil",labelPosition:"left",primary:!0,size:"small",content:"Edit",onClick:function(){a(!0)}})})})}),Object(k.jsx)("tbody",{children:Object(k.jsx)(P,{handleDisabled:n,hide:function(){return a(!1)},data:C,handleReset:function(){D({first_name:"",last_name:"",email:"",linkedin:"",image:"",about:"",last_modified:""})},handleUpdate:function(e){D(e)}})})]})})}}}]);
//# sourceMappingURL=7.8679609b.chunk.js.map