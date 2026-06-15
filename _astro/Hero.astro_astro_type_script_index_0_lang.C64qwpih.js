import{z as Qe,I as Ze,ay as Wt,s as $,V as Z,az as Ke,aA as $e,aB as tn,aC as fe,af as en,aD as Jt,b as De,aE as Nt,d as We,i as Ge,h as Te,v as nn,U as He,M as Lt,Y as sn,O as on,aF as rn,aG as an,aH as ye,ar as Ht,aI as cn,B as we,S as _e,aJ as Ve,aK as ie,aL as Fe,aM as re,aN as Qt,a as ln,X as fn,t as vt,G as Ie,e as un,W as dn,A as hn,aO as pn,aP as mn,D as Le,aQ as yn,aR as ze,C as gn,u as xn,P as wn,aS as bn,aT as vn,aU as ue,J as Ce,E as Sn}from"./three.module.BmUHh-Ok.js";import{gsap as Mn}from"./index.tUWw1UFN.js";import{S as An}from"./ScrollTrigger.Cv03IO65.js";const En=De;class _t extends Qe{constructor(s){super(s),this.defaultDPI=90,this.defaultUnit="px"}load(s,c,d,a){const f=this,E=new Ze(f.manager);E.setPath(f.path),E.setRequestHeader(f.requestHeader),E.setWithCredentials(f.withCredentials),E.load(s,function(p){try{c(f.parse(p))}catch(T){a?a(T):console.error(T),f.manager.itemError(s)}},d,a)}parse(s){const c=this;function d(r,o){if(r.nodeType!==1)return;const e=L(r);let t=!1,h=null;switch(r.nodeName){case"svg":o=Q(r,o);break;case"style":f(r);break;case"g":o=Q(r,o);break;case"path":o=Q(r,o),r.hasAttribute("d")&&(h=a(r));break;case"rect":o=Q(r,o),h=T(r);break;case"polygon":o=Q(r,o),h=w(r);break;case"polyline":o=Q(r,o),h=_(r);break;case"circle":o=Q(r,o),h=z(r);break;case"ellipse":o=Q(r,o),h=D(r);break;case"line":o=Q(r,o),h=J(r);break;case"defs":t=!0;break;case"use":o=Q(r,o);const v=(r.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),A=r.viewportElement.getElementById(v);A?d(A,o):console.warn("SVGLoader: 'use node' references non-existent node id: "+v);break}h&&(o.fill!==void 0&&o.fill!=="none"&&h.color.setStyle(o.fill,En),V(h,yt),R.push(h),h.userData={node:r,style:o});const b=r.childNodes;for(let l=0;l<b.length;l++){const v=b[l];t&&v.nodeName!=="style"&&v.nodeName!=="defs"||d(v,o)}e&&(tt.pop(),tt.length>0?yt.copy(tt[tt.length-1]):yt.identity())}function a(r){const o=new Nt,e=new $,t=new $,h=new $;let b=!0,l=!1;const v=r.getAttribute("d");if(v===""||v==="none")return null;const A=v.match(/[a-df-z][^a-df-z]*/ig);for(let I=0,u=A.length;I<u;I++){const g=A[I],O=g.charAt(0),B=g.slice(1).trim();b===!0&&(l=!0,b=!1);let i;switch(O){case"M":i=M(B);for(let n=0,N=i.length;n<N;n+=2)e.x=i[n+0],e.y=i[n+1],t.x=e.x,t.y=e.y,n===0?o.moveTo(e.x,e.y):o.lineTo(e.x,e.y),n===0&&h.copy(e);break;case"H":i=M(B);for(let n=0,N=i.length;n<N;n++)e.x=i[n],t.x=e.x,t.y=e.y,o.lineTo(e.x,e.y),n===0&&l===!0&&h.copy(e);break;case"V":i=M(B);for(let n=0,N=i.length;n<N;n++)e.y=i[n],t.x=e.x,t.y=e.y,o.lineTo(e.x,e.y),n===0&&l===!0&&h.copy(e);break;case"L":i=M(B);for(let n=0,N=i.length;n<N;n+=2)e.x=i[n+0],e.y=i[n+1],t.x=e.x,t.y=e.y,o.lineTo(e.x,e.y),n===0&&l===!0&&h.copy(e);break;case"C":i=M(B);for(let n=0,N=i.length;n<N;n+=6)o.bezierCurveTo(i[n+0],i[n+1],i[n+2],i[n+3],i[n+4],i[n+5]),t.x=i[n+2],t.y=i[n+3],e.x=i[n+4],e.y=i[n+5],n===0&&l===!0&&h.copy(e);break;case"S":i=M(B);for(let n=0,N=i.length;n<N;n+=4)o.bezierCurveTo(x(e.x,t.x),x(e.y,t.y),i[n+0],i[n+1],i[n+2],i[n+3]),t.x=i[n+0],t.y=i[n+1],e.x=i[n+2],e.y=i[n+3],n===0&&l===!0&&h.copy(e);break;case"Q":i=M(B);for(let n=0,N=i.length;n<N;n+=4)o.quadraticCurveTo(i[n+0],i[n+1],i[n+2],i[n+3]),t.x=i[n+0],t.y=i[n+1],e.x=i[n+2],e.y=i[n+3],n===0&&l===!0&&h.copy(e);break;case"T":i=M(B);for(let n=0,N=i.length;n<N;n+=2){const Y=x(e.x,t.x),mt=x(e.y,t.y);o.quadraticCurveTo(Y,mt,i[n+0],i[n+1]),t.x=Y,t.y=mt,e.x=i[n+0],e.y=i[n+1],n===0&&l===!0&&h.copy(e)}break;case"A":i=M(B,[3,4],7);for(let n=0,N=i.length;n<N;n+=7){if(i[n+5]==e.x&&i[n+6]==e.y)continue;const Y=e.clone();e.x=i[n+5],e.y=i[n+6],t.x=e.x,t.y=e.y,E(o,i[n],i[n+1],i[n+2],i[n+3],i[n+4],Y,e),n===0&&l===!0&&h.copy(e)}break;case"m":i=M(B);for(let n=0,N=i.length;n<N;n+=2)e.x+=i[n+0],e.y+=i[n+1],t.x=e.x,t.y=e.y,n===0?o.moveTo(e.x,e.y):o.lineTo(e.x,e.y),n===0&&h.copy(e);break;case"h":i=M(B);for(let n=0,N=i.length;n<N;n++)e.x+=i[n],t.x=e.x,t.y=e.y,o.lineTo(e.x,e.y),n===0&&l===!0&&h.copy(e);break;case"v":i=M(B);for(let n=0,N=i.length;n<N;n++)e.y+=i[n],t.x=e.x,t.y=e.y,o.lineTo(e.x,e.y),n===0&&l===!0&&h.copy(e);break;case"l":i=M(B);for(let n=0,N=i.length;n<N;n+=2)e.x+=i[n+0],e.y+=i[n+1],t.x=e.x,t.y=e.y,o.lineTo(e.x,e.y),n===0&&l===!0&&h.copy(e);break;case"c":i=M(B);for(let n=0,N=i.length;n<N;n+=6)o.bezierCurveTo(e.x+i[n+0],e.y+i[n+1],e.x+i[n+2],e.y+i[n+3],e.x+i[n+4],e.y+i[n+5]),t.x=e.x+i[n+2],t.y=e.y+i[n+3],e.x+=i[n+4],e.y+=i[n+5],n===0&&l===!0&&h.copy(e);break;case"s":i=M(B);for(let n=0,N=i.length;n<N;n+=4)o.bezierCurveTo(x(e.x,t.x),x(e.y,t.y),e.x+i[n+0],e.y+i[n+1],e.x+i[n+2],e.y+i[n+3]),t.x=e.x+i[n+0],t.y=e.y+i[n+1],e.x+=i[n+2],e.y+=i[n+3],n===0&&l===!0&&h.copy(e);break;case"q":i=M(B);for(let n=0,N=i.length;n<N;n+=4)o.quadraticCurveTo(e.x+i[n+0],e.y+i[n+1],e.x+i[n+2],e.y+i[n+3]),t.x=e.x+i[n+0],t.y=e.y+i[n+1],e.x+=i[n+2],e.y+=i[n+3],n===0&&l===!0&&h.copy(e);break;case"t":i=M(B);for(let n=0,N=i.length;n<N;n+=2){const Y=x(e.x,t.x),mt=x(e.y,t.y);o.quadraticCurveTo(Y,mt,e.x+i[n+0],e.y+i[n+1]),t.x=Y,t.y=mt,e.x=e.x+i[n+0],e.y=e.y+i[n+1],n===0&&l===!0&&h.copy(e)}break;case"a":i=M(B,[3,4],7);for(let n=0,N=i.length;n<N;n+=7){if(i[n+5]==0&&i[n+6]==0)continue;const Y=e.clone();e.x+=i[n+5],e.y+=i[n+6],t.x=e.x,t.y=e.y,E(o,i[n],i[n+1],i[n+2],i[n+3],i[n+4],Y,e),n===0&&l===!0&&h.copy(e)}break;case"Z":case"z":o.currentPath.autoClose=!0,o.currentPath.curves.length>0&&(e.copy(h),o.currentPath.currentPoint.copy(e),b=!0);break;default:console.warn(g)}l=!1}return o}function f(r){if(!(!r.sheet||!r.sheet.cssRules||!r.sheet.cssRules.length))for(let o=0;o<r.sheet.cssRules.length;o++){const e=r.sheet.cssRules[o];if(e.type!==1)continue;const t=e.selectorText.split(/,/gm).filter(Boolean).map(h=>h.trim());for(let h=0;h<t.length;h++){const b=Object.fromEntries(Object.entries(e.style).filter(([,l])=>l!==""));st[t[h]]=Object.assign(st[t[h]]||{},b)}}}function E(r,o,e,t,h,b,l,v){if(o==0||e==0){r.lineTo(v.x,v.y);return}t=t*Math.PI/180,o=Math.abs(o),e=Math.abs(e);const A=(l.x-v.x)/2,I=(l.y-v.y)/2,u=Math.cos(t)*A+Math.sin(t)*I,g=-Math.sin(t)*A+Math.cos(t)*I;let O=o*o,B=e*e;const i=u*u,n=g*g,N=i/O+n/B;if(N>1){const bt=Math.sqrt(N);o=bt*o,e=bt*e,O=o*o,B=e*e}const Y=O*n+B*i,mt=(O*B-Y)/Y;let xt=Math.sqrt(Math.max(0,mt));h===b&&(xt=-xt);const at=xt*o*g/e,wt=-xt*e*u/o,Et=Math.cos(t)*at-Math.sin(t)*wt+(l.x+v.x)/2,Rt=Math.sin(t)*at+Math.cos(t)*wt+(l.y+v.y)/2,Pt=p(1,0,(u-at)/o,(g-wt)/e),Ot=p((u-at)/o,(g-wt)/e,(-u-at)/o,(-g-wt)/e)%(Math.PI*2);r.currentPath.absellipse(Et,Rt,o,e,Pt,Pt+Ot,b===0,t)}function p(r,o,e,t){const h=r*e+o*t,b=Math.sqrt(r*r+o*o)*Math.sqrt(e*e+t*t);let l=Math.acos(Math.max(-1,Math.min(1,h/b)));return r*t-o*e<0&&(l=-l),l}function T(r){const o=y(r.getAttribute("x")||0),e=y(r.getAttribute("y")||0),t=y(r.getAttribute("rx")||r.getAttribute("ry")||0),h=y(r.getAttribute("ry")||r.getAttribute("rx")||0),b=y(r.getAttribute("width")),l=y(r.getAttribute("height")),v=1-.551915024494,A=new Nt;return A.moveTo(o+t,e),A.lineTo(o+b-t,e),(t!==0||h!==0)&&A.bezierCurveTo(o+b-t*v,e,o+b,e+h*v,o+b,e+h),A.lineTo(o+b,e+l-h),(t!==0||h!==0)&&A.bezierCurveTo(o+b,e+l-h*v,o+b-t*v,e+l,o+b-t,e+l),A.lineTo(o+t,e+l),(t!==0||h!==0)&&A.bezierCurveTo(o+t*v,e+l,o,e+l-h*v,o,e+l-h),A.lineTo(o,e+h),(t!==0||h!==0)&&A.bezierCurveTo(o,e+h*v,o+t*v,e,o+t,e),A}function w(r){function o(b,l,v){const A=y(l),I=y(v);h===0?t.moveTo(A,I):t.lineTo(A,I),h++}const e=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,t=new Nt;let h=0;return r.getAttribute("points").replace(e,o),t.currentPath.autoClose=!0,t}function _(r){function o(b,l,v){const A=y(l),I=y(v);h===0?t.moveTo(A,I):t.lineTo(A,I),h++}const e=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,t=new Nt;let h=0;return r.getAttribute("points").replace(e,o),t.currentPath.autoClose=!1,t}function z(r){const o=y(r.getAttribute("cx")||0),e=y(r.getAttribute("cy")||0),t=y(r.getAttribute("r")||0),h=new fe;h.absarc(o,e,t,0,Math.PI*2);const b=new Nt;return b.subPaths.push(h),b}function D(r){const o=y(r.getAttribute("cx")||0),e=y(r.getAttribute("cy")||0),t=y(r.getAttribute("rx")||0),h=y(r.getAttribute("ry")||0),b=new fe;b.absellipse(o,e,t,h,0,Math.PI*2);const l=new Nt;return l.subPaths.push(b),l}function J(r){const o=y(r.getAttribute("x1")||0),e=y(r.getAttribute("y1")||0),t=y(r.getAttribute("x2")||0),h=y(r.getAttribute("y2")||0),b=new Nt;return b.moveTo(o,e),b.lineTo(t,h),b.currentPath.autoClose=!1,b}function Q(r,o){o=Object.assign({},o);let e={};if(r.hasAttribute("class")){const l=r.getAttribute("class").split(/\s/).filter(Boolean).map(v=>v.trim());for(let v=0;v<l.length;v++)e=Object.assign(e,st["."+l[v]])}r.hasAttribute("id")&&(e=Object.assign(e,st["#"+r.getAttribute("id")]));function t(l,v,A){A===void 0&&(A=function(u){return u.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),u}),r.hasAttribute(l)&&(o[v]=A(r.getAttribute(l))),e[v]&&(o[v]=A(e[v])),r.style&&r.style[l]!==""&&(o[v]=A(r.style[l]))}function h(l){return Math.max(0,Math.min(1,y(l)))}function b(l){return Math.max(0,y(l))}return t("fill","fill"),t("fill-opacity","fillOpacity",h),t("fill-rule","fillRule"),t("opacity","opacity",h),t("stroke","stroke"),t("stroke-opacity","strokeOpacity",h),t("stroke-width","strokeWidth",b),t("stroke-linejoin","strokeLineJoin"),t("stroke-linecap","strokeLineCap"),t("stroke-miterlimit","strokeMiterLimit",b),t("visibility","visibility"),o}function x(r,o){return r-(o-r)}function M(r,o,e){if(typeof r!="string")throw new TypeError("Invalid input: "+typeof r);const t={WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},h=0,b=1,l=2,v=3;let A=h,I=!0,u="",g="";const O=[];function B(Y,mt,xt){const at=new SyntaxError('Unexpected character "'+Y+'" at index '+mt+".");throw at.partial=xt,at}function i(){u!==""&&(g===""?O.push(Number(u)):O.push(Number(u)*Math.pow(10,Number(g)))),u="",g=""}let n;const N=r.length;for(let Y=0;Y<N;Y++){if(n=r[Y],Array.isArray(o)&&o.includes(O.length%e)&&t.FLAGS.test(n)){A=b,u=n,i();continue}if(A===h){if(t.WHITESPACE.test(n))continue;if(t.DIGIT.test(n)||t.SIGN.test(n)){A=b,u=n;continue}if(t.POINT.test(n)){A=l,u=n;continue}t.COMMA.test(n)&&(I&&B(n,Y,O),I=!0)}if(A===b){if(t.DIGIT.test(n)){u+=n;continue}if(t.POINT.test(n)){u+=n,A=l;continue}if(t.EXP.test(n)){A=v;continue}t.SIGN.test(n)&&u.length===1&&t.SIGN.test(u[0])&&B(n,Y,O)}if(A===l){if(t.DIGIT.test(n)){u+=n;continue}if(t.EXP.test(n)){A=v;continue}t.POINT.test(n)&&u[u.length-1]==="."&&B(n,Y,O)}if(A===v){if(t.DIGIT.test(n)){g+=n;continue}if(t.SIGN.test(n)){if(g===""){g+=n;continue}g.length===1&&t.SIGN.test(g)&&B(n,Y,O)}}t.WHITESPACE.test(n)?(i(),A=h,I=!1):t.COMMA.test(n)?(i(),A=h,I=!0):t.SIGN.test(n)?(i(),A=b,u=n):t.POINT.test(n)?(i(),A=l,u=n):B(n,Y,O)}return i(),O}const C=["mm","cm","in","pt","pc","px"],W={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function y(r){let o="px";if(typeof r=="string"||r instanceof String)for(let t=0,h=C.length;t<h;t++){const b=C[t];if(r.endsWith(b)){o=b,r=r.substring(0,r.length-b.length);break}}let e;return o==="px"&&c.defaultUnit!=="px"?e=W.in[c.defaultUnit]/c.defaultDPI:(e=W[o][c.defaultUnit],e<0&&(e=W[o].in*c.defaultDPI)),e*parseFloat(r)}function L(r){if(!(r.hasAttribute("transform")||r.nodeName==="use"&&(r.hasAttribute("x")||r.hasAttribute("y"))))return null;const o=G(r);return tt.length>0&&o.premultiply(tt[tt.length-1]),yt.copy(o),tt.push(o),o}function G(r){const o=new Wt,e=rt;if(r.nodeName==="use"&&(r.hasAttribute("x")||r.hasAttribute("y"))){const t=y(r.getAttribute("x")||0),h=y(r.getAttribute("y")||0);o.translate(t,h)}if(r.hasAttribute("transform")){const t=r.getAttribute("transform").split(")");for(let h=t.length-1;h>=0;h--){const b=t[h].trim();if(b==="")continue;const l=b.indexOf("("),v=b.length;if(l>0&&l<v){const A=b.slice(0,l),I=M(b.slice(l+1));switch(e.identity(),A){case"translate":if(I.length>=1){const u=I[0];let g=0;I.length>=2&&(g=I[1]),e.translate(u,g)}break;case"rotate":if(I.length>=1){let u=0,g=0,O=0;u=I[0]*Math.PI/180,I.length>=3&&(g=I[1],O=I[2]),ot.makeTranslation(-g,-O),F.makeRotation(u),m.multiplyMatrices(F,ot),ot.makeTranslation(g,O),e.multiplyMatrices(ot,m)}break;case"scale":if(I.length>=1){const u=I[0];let g=u;I.length>=2&&(g=I[1]),e.scale(u,g)}break;case"skewX":I.length===1&&e.set(1,Math.tan(I[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":I.length===1&&e.set(1,0,0,Math.tan(I[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":I.length===6&&e.set(I[0],I[2],I[4],I[1],I[3],I[5],0,0,1);break}}o.premultiply(e)}}return o}function V(r,o){function e(l){it.set(l.x,l.y,1).applyMatrix3(o),l.set(it.x,it.y)}function t(l){const v=l.xRadius,A=l.yRadius,I=Math.cos(l.aRotation),u=Math.sin(l.aRotation),g=new Z(v*I,v*u,0),O=new Z(-A*u,A*I,0),B=g.applyMatrix3(o),i=O.applyMatrix3(o),n=rt.set(B.x,i.x,0,B.y,i.y,0,0,0,1),N=ot.copy(n).invert(),xt=F.copy(N).transpose().multiply(N).elements,at=ft(xt[0],xt[1],xt[4]),wt=Math.sqrt(at.rt1),Et=Math.sqrt(at.rt2);if(l.xRadius=1/wt,l.yRadius=1/Et,l.aRotation=Math.atan2(at.sn,at.cs),!((l.aEndAngle-l.aStartAngle)%(2*Math.PI)<Number.EPSILON)){const Pt=ot.set(wt,0,0,0,Et,0,0,0,1),Ot=F.set(at.cs,at.sn,0,-at.sn,at.cs,0,0,0,1),bt=Pt.multiply(Ot).multiply(n),kt=Zt=>{const{x:Kt,y:$t}=new Z(Math.cos(Zt),Math.sin(Zt),0).applyMatrix3(bt);return Math.atan2($t,Kt)};l.aStartAngle=kt(l.aStartAngle),l.aEndAngle=kt(l.aEndAngle),X(o)&&(l.aClockwise=!l.aClockwise)}}function h(l){const v=q(o),A=K(o);l.xRadius*=v,l.yRadius*=A;const I=v>Number.EPSILON?Math.atan2(o.elements[1],o.elements[0]):Math.atan2(-o.elements[3],o.elements[4]);l.aRotation+=I,X(o)&&(l.aStartAngle*=-1,l.aEndAngle*=-1,l.aClockwise=!l.aClockwise)}const b=r.subPaths;for(let l=0,v=b.length;l<v;l++){const I=b[l].curves;for(let u=0;u<I.length;u++){const g=I[u];g.isLineCurve?(e(g.v1),e(g.v2)):g.isCubicBezierCurve?(e(g.v0),e(g.v1),e(g.v2),e(g.v3)):g.isQuadraticBezierCurve?(e(g.v0),e(g.v1),e(g.v2)):g.isEllipseCurve&&(ct.set(g.aX,g.aY),e(ct),g.aX=ct.x,g.aY=ct.y,j(o)?t(g):h(g))}}}function X(r){const o=r.elements;return o[0]*o[4]-o[1]*o[3]<0}function j(r){const o=r.elements,e=o[0]*o[3]+o[1]*o[4];if(e===0)return!1;const t=q(r),h=K(r);return Math.abs(e/(t*h))>Number.EPSILON}function q(r){const o=r.elements;return Math.sqrt(o[0]*o[0]+o[1]*o[1])}function K(r){const o=r.elements;return Math.sqrt(o[3]*o[3]+o[4]*o[4])}function ft(r,o,e){let t,h,b,l,v;const A=r+e,I=r-e,u=Math.sqrt(I*I+4*o*o);return A>0?(t=.5*(A+u),v=1/t,h=r*v*e-o*v*o):A<0?h=.5*(A-u):(t=.5*u,h=-.5*u),I>0?b=I+u:b=I-u,Math.abs(b)>2*Math.abs(o)?(v=-2*o/b,l=1/Math.sqrt(1+v*v),b=v*l):Math.abs(o)===0?(b=1,l=0):(v=-.5*b/o,b=1/Math.sqrt(1+v*v),l=v*b),I>0&&(v=b,b=-l,l=v),{rt1:t,rt2:h,cs:b,sn:l}}const R=[],st={},tt=[],rt=new Wt,ot=new Wt,F=new Wt,m=new Wt,ct=new $,it=new Z,yt=new Wt,gt=new DOMParser().parseFromString(s,"image/svg+xml");return d(gt.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:R,xml:gt.documentElement}}static createShapes(s){const d={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},a={loc:d.ORIGIN,t:0};function f(x,M,C,W){const y=x.x,L=M.x,G=C.x,V=W.x,X=x.y,j=M.y,q=C.y,K=W.y,ft=(V-G)*(X-q)-(K-q)*(y-G),R=(L-y)*(X-q)-(j-X)*(y-G),st=(K-q)*(L-y)-(V-G)*(j-X),tt=ft/st,rt=R/st;if(st===0&&ft!==0||tt<=0||tt>=1||rt<0||rt>1)return null;if(ft===0&&st===0){for(let ot=0;ot<2;ot++)if(E(ot===0?C:W,x,M),a.loc==d.ORIGIN){const F=ot===0?C:W;return{x:F.x,y:F.y,t:a.t}}else if(a.loc==d.BETWEEN){const F=+(y+a.t*(L-y)).toPrecision(10),m=+(X+a.t*(j-X)).toPrecision(10);return{x:F,y:m,t:a.t}}return null}else{for(let m=0;m<2;m++)if(E(m===0?C:W,x,M),a.loc==d.ORIGIN){const ct=m===0?C:W;return{x:ct.x,y:ct.y,t:a.t}}const ot=+(y+tt*(L-y)).toPrecision(10),F=+(X+tt*(j-X)).toPrecision(10);return{x:ot,y:F,t:tt}}}function E(x,M,C){const W=C.x-M.x,y=C.y-M.y,L=x.x-M.x,G=x.y-M.y,V=W*G-L*y;if(x.x===M.x&&x.y===M.y){a.loc=d.ORIGIN,a.t=0;return}if(x.x===C.x&&x.y===C.y){a.loc=d.DESTINATION,a.t=1;return}if(V<-Number.EPSILON){a.loc=d.LEFT;return}if(V>Number.EPSILON){a.loc=d.RIGHT;return}if(W*L<0||y*G<0){a.loc=d.BEHIND;return}if(Math.sqrt(W*W+y*y)<Math.sqrt(L*L+G*G)){a.loc=d.BEYOND;return}let X;W!==0?X=L/W:X=G/y,a.loc=d.BETWEEN,a.t=X}function p(x,M){const C=[],W=[];for(let y=1;y<x.length;y++){const L=x[y-1],G=x[y];for(let V=1;V<M.length;V++){const X=M[V-1],j=M[V],q=f(L,G,X,j);q!==null&&C.find(K=>K.t<=q.t+Number.EPSILON&&K.t>=q.t-Number.EPSILON)===void 0&&(C.push(q),W.push(new $(q.x,q.y)))}}return W}function T(x,M,C){const W=new $;M.getCenter(W);const y=[];return C.forEach(L=>{L.boundingBox.containsPoint(W)&&p(x,L.points).forEach(V=>{y.push({identifier:L.identifier,isCW:L.isCW,point:V})})}),y.sort((L,G)=>L.point.x-G.point.x),y}function w(x,M,C,W,y){(y==null||y==="")&&(y="nonzero");const L=new $;x.boundingBox.getCenter(L);const G=[new $(C,L.y),new $(W,L.y)],V=T(G,x.boundingBox,M);V.sort((R,st)=>R.point.x-st.point.x);const X=[],j=[];V.forEach(R=>{R.identifier===x.identifier?X.push(R):j.push(R)});const q=X[0].point.x,K=[];let ft=0;for(;ft<j.length&&j[ft].point.x<q;)K.length>0&&K[K.length-1]===j[ft].identifier?K.pop():K.push(j[ft].identifier),ft++;if(K.push(x.identifier),y==="evenodd"){const R=K.length%2===0,st=K[K.length-2];return{identifier:x.identifier,isHole:R,for:st}}else if(y==="nonzero"){let R=!0,st=null,tt=null;for(let rt=0;rt<K.length;rt++){const ot=K[rt];R?(tt=M[ot].isCW,R=!1,st=ot):tt!==M[ot].isCW&&(tt=M[ot].isCW,R=!0)}return{identifier:x.identifier,isHole:R,for:st}}else console.warn('fill-rule: "'+y+'" is currently not implemented.')}let _=999999999,z=-999999999,D=s.subPaths.map(x=>{const M=x.getPoints();let C=-999999999,W=999999999,y=-999999999,L=999999999;for(let G=0;G<M.length;G++){const V=M[G];V.y>C&&(C=V.y),V.y<W&&(W=V.y),V.x>y&&(y=V.x),V.x<L&&(L=V.x)}return z<=y&&(z=y+1),_>=L&&(_=L-1),{curves:x.curves,points:M,isCW:$e.isClockWise(M),identifier:-1,boundingBox:new Ke(new $(L,W),new $(y,C))}});D=D.filter(x=>x.points.length>1);for(let x=0;x<D.length;x++)D[x].identifier=x;const J=D.map(x=>w(x,D,_,z,s.userData?s.userData.style.fillRule:void 0)),Q=[];return D.forEach(x=>{if(!J[x.identifier].isHole){const C=new tn;C.curves=x.curves,J.filter(y=>y.isHole&&y.for===x.identifier).forEach(y=>{const L=D[y.identifier],G=new fe;G.curves=L.curves,C.holes.push(G)}),Q.push(C)}}),Q}static getStrokeStyle(s,c,d,a,f){return s=s!==void 0?s:1,c=c!==void 0?c:"#000",d=d!==void 0?d:"miter",a=a!==void 0?a:"butt",f=f!==void 0?f:4,{strokeColor:c,strokeWidth:s,strokeLineJoin:d,strokeLineCap:a,strokeMiterLimit:f}}static pointsToStroke(s,c,d,a){const f=[],E=[],p=[];if(_t.pointsToStrokeWithBuffers(s,c,d,a,f,E,p)===0)return null;const T=new en;return T.setAttribute("position",new Jt(f,3)),T.setAttribute("normal",new Jt(E,3)),T.setAttribute("uv",new Jt(p,2)),T}static pointsToStrokeWithBuffers(s,c,d,a,f,E,p,T){const w=new $,_=new $,z=new $,D=new $,J=new $,Q=new $,x=new $,M=new $,C=new $,W=new $,y=new $,L=new $,G=new $,V=new $,X=new $,j=new $,q=new $;d=d!==void 0?d:12,a=a!==void 0?a:.001,T=T!==void 0?T:0,s=I(s);const K=s.length;if(K<2)return 0;const ft=s[0].equals(s[K-1]);let R,st=s[0],tt;const rt=c.strokeWidth/2,ot=1/(K-1);let F=0,m,ct,it,yt,gt=!1,Mt=0,r=T*3,o=T*2;e(s[0],s[1],w).multiplyScalar(rt),M.copy(s[0]).sub(w),C.copy(s[0]).add(w),W.copy(M),y.copy(C);for(let u=1;u<K;u++){R=s[u],u===K-1?ft?tt=s[1]:tt=void 0:tt=s[u+1];const g=w;if(e(st,R,g),z.copy(g).multiplyScalar(rt),L.copy(R).sub(z),G.copy(R).add(z),m=F+ot,ct=!1,tt!==void 0){e(R,tt,_),z.copy(_).multiplyScalar(rt),V.copy(R).sub(z),X.copy(R).add(z),it=!0,z.subVectors(tt,st),g.dot(z)<0&&(it=!1),u===1&&(gt=it),z.subVectors(tt,R),z.normalize();const O=Math.abs(g.dot(z));if(O>Number.EPSILON){const B=rt/O;z.multiplyScalar(-B),D.subVectors(R,st),J.copy(D).setLength(B).add(z),j.copy(J).negate();const i=J.length(),n=D.length();D.divideScalar(n),Q.subVectors(tt,R);const N=Q.length();switch(Q.divideScalar(N),D.dot(j)<n&&Q.dot(j)<N&&(ct=!0),q.copy(J).add(R),j.add(R),yt=!1,ct?it?(X.copy(j),G.copy(j)):(V.copy(j),L.copy(j)):b(),c.strokeLineJoin){case"bevel":l(it,ct,m);break;case"round":v(it,ct),it?h(R,L,V,m,0):h(R,X,G,m,1);break;case"miter":case"miter-clip":default:const Y=rt*c.strokeMiterLimit/i;if(Y<1)if(c.strokeLineJoin!=="miter-clip"){l(it,ct,m);break}else v(it,ct),it?(Q.subVectors(q,L).multiplyScalar(Y).add(L),x.subVectors(q,V).multiplyScalar(Y).add(V),t(L,m,0),t(Q,m,0),t(R,m,.5),t(R,m,.5),t(Q,m,0),t(x,m,0),t(R,m,.5),t(x,m,0),t(V,m,0)):(Q.subVectors(q,G).multiplyScalar(Y).add(G),x.subVectors(q,X).multiplyScalar(Y).add(X),t(G,m,1),t(Q,m,1),t(R,m,.5),t(R,m,.5),t(Q,m,1),t(x,m,1),t(R,m,.5),t(x,m,1),t(X,m,1));else ct?(it?(t(C,F,1),t(M,F,0),t(q,m,0),t(C,F,1),t(q,m,0),t(j,m,1)):(t(C,F,1),t(M,F,0),t(q,m,1),t(M,F,0),t(j,m,0),t(q,m,1)),it?V.copy(q):X.copy(q)):it?(t(L,m,0),t(q,m,0),t(R,m,.5),t(R,m,.5),t(q,m,0),t(V,m,0)):(t(G,m,1),t(q,m,1),t(R,m,.5),t(R,m,.5),t(q,m,1),t(X,m,1)),yt=!0;break}}else b()}else b();!ft&&u===K-1&&A(s[0],W,y,it,!0,F),F=m,st=R,M.copy(V),C.copy(X)}if(!ft)A(R,L,G,it,!1,m);else if(ct&&f){let u=q,g=j;gt!==it&&(u=j,g=q),it?(yt||gt)&&(g.toArray(f,0),g.toArray(f,9),yt&&u.toArray(f,3)):(yt||!gt)&&(g.toArray(f,3),g.toArray(f,9),yt&&u.toArray(f,0))}return Mt;function e(u,g,O){return O.subVectors(g,u),O.set(-O.y,O.x).normalize()}function t(u,g,O){f&&(f[r]=u.x,f[r+1]=u.y,f[r+2]=0,E&&(E[r]=0,E[r+1]=0,E[r+2]=1),r+=3,p&&(p[o]=g,p[o+1]=O,o+=2)),Mt+=3}function h(u,g,O,B,i){w.copy(g).sub(u).normalize(),_.copy(O).sub(u).normalize();let n=Math.PI;const N=w.dot(_);Math.abs(N)<1&&(n=Math.abs(Math.acos(N))),n/=d,z.copy(g);for(let Y=0,mt=d-1;Y<mt;Y++)D.copy(z).rotateAround(u,n),t(z,B,i),t(D,B,i),t(u,B,.5),z.copy(D);t(D,B,i),t(O,B,i),t(u,B,.5)}function b(){t(C,F,1),t(M,F,0),t(L,m,0),t(C,F,1),t(L,m,0),t(G,m,1)}function l(u,g,O){g?u?(t(C,F,1),t(M,F,0),t(L,m,0),t(C,F,1),t(L,m,0),t(j,m,1),t(L,O,0),t(V,O,0),t(j,O,.5)):(t(C,F,1),t(M,F,0),t(G,m,1),t(M,F,0),t(j,m,0),t(G,m,1),t(G,O,1),t(j,O,0),t(X,O,1)):u?(t(L,O,0),t(V,O,0),t(R,O,.5)):(t(G,O,1),t(X,O,0),t(R,O,.5))}function v(u,g){g&&(u?(t(C,F,1),t(M,F,0),t(L,m,0),t(C,F,1),t(L,m,0),t(j,m,1),t(L,F,0),t(R,m,.5),t(j,m,1),t(R,m,.5),t(V,F,0),t(j,m,1)):(t(C,F,1),t(M,F,0),t(G,m,1),t(M,F,0),t(j,m,0),t(G,m,1),t(G,F,1),t(j,m,0),t(R,m,.5),t(R,m,.5),t(j,m,0),t(X,F,1)))}function A(u,g,O,B,i,n){switch(c.strokeLineCap){case"round":i?h(u,O,g,n,.5):h(u,g,O,n,.5);break;case"square":if(i)w.subVectors(g,u),_.set(w.y,-w.x),z.addVectors(w,_).add(u),D.subVectors(_,w).add(u),B?(z.toArray(f,3),D.toArray(f,0),D.toArray(f,9)):(z.toArray(f,3),p[7]===1?D.toArray(f,9):z.toArray(f,9),D.toArray(f,0));else{w.subVectors(O,u),_.set(w.y,-w.x),z.addVectors(w,_).add(u),D.subVectors(_,w).add(u);const N=f.length;B?(z.toArray(f,N-3),D.toArray(f,N-6),D.toArray(f,N-12)):(D.toArray(f,N-6),z.toArray(f,N-3),D.toArray(f,N-12))}break}}function I(u){let g=!1;for(let B=1,i=u.length-1;B<i;B++)if(u[B].distanceTo(u[B+1])<a){g=!0;break}if(!g)return u;const O=[];O.push(u[0]);for(let B=1,i=u.length-1;B<i;B++)u[B].distanceTo(u[B+1])>=a&&O.push(u[B]);return O.push(u[u.length-1]),O}}}class Pn extends We{constructor(){super(),this.name="RoomEnvironment";const s=new Ge;s.deleteAttribute("uv");const c=new Te({side:nn}),d=new Te,a=new He(16777215,900,28,2);a.position.set(.418,16.199,.3),this.add(a);const f=new Lt(s,c);f.position.set(-.757,13.219,.717),f.scale.set(31.713,28.305,28.591),this.add(f);const E=new sn(s,d,6),p=new on;p.position.set(-10.906,2.009,1.846),p.rotation.set(0,-.195,0),p.scale.set(2.328,7.905,4.651),p.updateMatrix(),E.setMatrixAt(0,p.matrix),p.position.set(-5.607,-.754,-.758),p.rotation.set(0,.994,0),p.scale.set(1.97,1.534,3.955),p.updateMatrix(),E.setMatrixAt(1,p.matrix),p.position.set(6.167,.857,7.803),p.rotation.set(0,.561,0),p.scale.set(3.927,6.285,3.687),p.updateMatrix(),E.setMatrixAt(2,p.matrix),p.position.set(-2.017,.018,6.124),p.rotation.set(0,.333,0),p.scale.set(2.002,4.566,2.064),p.updateMatrix(),E.setMatrixAt(3,p.matrix),p.position.set(2.291,-.756,-2.621),p.rotation.set(0,-.286,0),p.scale.set(1.546,1.552,1.496),p.updateMatrix(),E.setMatrixAt(4,p.matrix),p.position.set(-2.193,-.369,-5.547),p.rotation.set(0,.516,0),p.scale.set(3.875,3.487,2.986),p.updateMatrix(),E.setMatrixAt(5,p.matrix),this.add(E);const T=new Lt(s,Gt(50));T.position.set(-16.116,14.37,8.208),T.scale.set(.1,2.428,2.739),this.add(T);const w=new Lt(s,Gt(50));w.position.set(-16.109,18.021,-8.207),w.scale.set(.1,2.425,2.751),this.add(w);const _=new Lt(s,Gt(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const z=new Lt(s,Gt(43));z.position.set(-.462,8.89,14.52),z.scale.set(4.38,5.441,.088),this.add(z);const D=new Lt(s,Gt(20));D.position.set(3.235,11.486,-12.541),D.scale.set(2.5,2,.1),this.add(D);const J=new Lt(s,Gt(100));J.position.set(0,20,0),J.scale.set(1,.1,1),this.add(J)}dispose(){const s=new Set;this.traverse(c=>{c.isMesh&&(s.add(c.geometry),s.add(c.material))});for(const c of s)c.dispose()}}function Gt(U){return new rn({color:0,emissive:16777215,emissiveIntensity:U})}const Xt=new Z;function St(U,s,c,d,a,f){const E=2*Math.PI*a/4,p=Math.max(f-2*a,0),T=Math.PI/4;Xt.copy(s),Xt[d]=0,Xt.normalize();const w=.5*E/(E+p),_=1-Xt.angleTo(U)/T;return Math.sign(Xt[c])===1?_*w:p/(E+p)+w+w*(1-_)}class be extends Ge{constructor(s=1,c=1,d=1,a=2,f=.1){const E=a*2+1;if(f=Math.min(s/2,c/2,d/2,f),super(1,1,1,E,E,E),this.type="RoundedBoxGeometry",this.parameters={width:s,height:c,depth:d,segments:a,radius:f},E===1)return;const p=this.toNonIndexed();this.index=null,this.attributes.position=p.attributes.position,this.attributes.normal=p.attributes.normal,this.attributes.uv=p.attributes.uv;const T=new Z,w=new Z,_=new Z(s,c,d).divideScalar(2).subScalar(f),z=this.attributes.position.array,D=this.attributes.normal.array,J=this.attributes.uv.array,Q=z.length/6,x=new Z,M=.5/E;for(let C=0,W=0;C<z.length;C+=3,W+=2)switch(T.fromArray(z,C),w.copy(T),w.x-=Math.sign(w.x)*M,w.y-=Math.sign(w.y)*M,w.z-=Math.sign(w.z)*M,w.normalize(),z[C+0]=_.x*Math.sign(T.x)+w.x*f,z[C+1]=_.y*Math.sign(T.y)+w.y*f,z[C+2]=_.z*Math.sign(T.z)+w.z*f,D[C+0]=w.x,D[C+1]=w.y,D[C+2]=w.z,Math.floor(C/Q)){case 0:x.set(1,0,0),J[W+0]=St(x,w,"z","y",f,d),J[W+1]=1-St(x,w,"y","z",f,c);break;case 1:x.set(-1,0,0),J[W+0]=1-St(x,w,"z","y",f,d),J[W+1]=1-St(x,w,"y","z",f,c);break;case 2:x.set(0,1,0),J[W+0]=1-St(x,w,"x","z",f,s),J[W+1]=St(x,w,"z","x",f,d);break;case 3:x.set(0,-1,0),J[W+0]=1-St(x,w,"x","z",f,s),J[W+1]=1-St(x,w,"z","x",f,d);break;case 4:x.set(0,0,1),J[W+0]=1-St(x,w,"x","y",f,s),J[W+1]=1-St(x,w,"y","x",f,c);break;case 5:x.set(0,0,-1),J[W+0]=St(x,w,"x","y",f,s),J[W+1]=1-St(x,w,"y","x",f,c);break}}static fromJSON(s){return new be(s.width,s.height,s.depth,s.segments,s.radius)}}const Oe=new we,ne=new Z;class je extends an{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const s=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],c=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],d=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(d),this.setAttribute("position",new Jt(s,3)),this.setAttribute("uv",new Jt(c,2))}applyMatrix4(s){const c=this.attributes.instanceStart,d=this.attributes.instanceEnd;return c!==void 0&&(c.applyMatrix4(s),d.applyMatrix4(s),c.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(s){let c;s instanceof Float32Array?c=s:Array.isArray(s)&&(c=new Float32Array(s));const d=new ye(c,6,1);return this.setAttribute("instanceStart",new Ht(d,3,0)),this.setAttribute("instanceEnd",new Ht(d,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(s){let c;s instanceof Float32Array?c=s:Array.isArray(s)&&(c=new Float32Array(s));const d=new ye(c,6,1);return this.setAttribute("instanceColorStart",new Ht(d,3,0)),this.setAttribute("instanceColorEnd",new Ht(d,3,3)),this}fromWireframeGeometry(s){return this.setPositions(s.attributes.position.array),this}fromEdgesGeometry(s){return this.setPositions(s.attributes.position.array),this}fromMesh(s){return this.fromWireframeGeometry(new cn(s.geometry)),this}fromLineSegments(s){const c=s.geometry;return this.setPositions(c.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new we);const s=this.attributes.instanceStart,c=this.attributes.instanceEnd;s!==void 0&&c!==void 0&&(this.boundingBox.setFromBufferAttribute(s),Oe.setFromBufferAttribute(c),this.boundingBox.union(Oe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _e),this.boundingBox===null&&this.computeBoundingBox();const s=this.attributes.instanceStart,c=this.attributes.instanceEnd;if(s!==void 0&&c!==void 0){const d=this.boundingSphere.center;this.boundingBox.getCenter(d);let a=0;for(let f=0,E=s.count;f<E;f++)ne.fromBufferAttribute(s,f),a=Math.max(a,d.distanceToSquared(ne)),ne.fromBufferAttribute(c,f),a=Math.max(a,d.distanceToSquared(ne));this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new $(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ie.line={uniforms:Fe.merge([re.common,re.fog,re.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class ve extends Ve{constructor(s){super({type:"LineMaterial",uniforms:Fe.clone(ie.line.uniforms),vertexShader:ie.line.vertexShader,fragmentShader:ie.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(s)}get color(){return this.uniforms.diffuse.value}set color(s){this.uniforms.diffuse.value=s}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(s){s===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(s){this.uniforms.linewidth&&(this.uniforms.linewidth.value=s)}get dashed(){return"USE_DASH"in this.defines}set dashed(s){s===!0!==this.dashed&&(this.needsUpdate=!0),s===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(s){this.uniforms.dashScale.value=s}get dashSize(){return this.uniforms.dashSize.value}set dashSize(s){this.uniforms.dashSize.value=s}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(s){this.uniforms.dashOffset.value=s}get gapSize(){return this.uniforms.gapSize.value}set gapSize(s){this.uniforms.gapSize.value=s}get opacity(){return this.uniforms.opacity.value}set opacity(s){this.uniforms&&(this.uniforms.opacity.value=s)}get resolution(){return this.uniforms.resolution.value}set resolution(s){this.uniforms.resolution.value.copy(s)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(s){this.defines&&(s===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),s===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const de=new Qt,ke=new Z,Be=new Z,dt=new Qt,ht=new Qt,Tt=new Qt,he=new Z,pe=new fn,pt=new ln,Ne=new Z,se=new we,oe=new _e,It=new Qt;let zt,Ut;function Ue(U,s,c){return It.set(0,0,-s,1).applyMatrix4(U.projectionMatrix),It.multiplyScalar(1/It.w),It.x=Ut/c.width,It.y=Ut/c.height,It.applyMatrix4(U.projectionMatrixInverse),It.multiplyScalar(1/It.w),Math.abs(Math.max(It.x,It.y))}function Tn(U,s){const c=U.matrixWorld,d=U.geometry,a=d.attributes.instanceStart,f=d.attributes.instanceEnd,E=Math.min(d.instanceCount,a.count);for(let p=0,T=E;p<T;p++){pt.start.fromBufferAttribute(a,p),pt.end.fromBufferAttribute(f,p),pt.applyMatrix4(c);const w=new Z,_=new Z;zt.distanceSqToSegment(pt.start,pt.end,_,w),_.distanceTo(w)<Ut*.5&&s.push({point:_,pointOnLine:w,distance:zt.origin.distanceTo(_),object:U,face:null,faceIndex:p,uv:null,uv1:null})}}function In(U,s,c){const d=s.projectionMatrix,f=U.material.resolution,E=U.matrixWorld,p=U.geometry,T=p.attributes.instanceStart,w=p.attributes.instanceEnd,_=Math.min(p.instanceCount,T.count),z=-s.near;zt.at(1,Tt),Tt.w=1,Tt.applyMatrix4(s.matrixWorldInverse),Tt.applyMatrix4(d),Tt.multiplyScalar(1/Tt.w),Tt.x*=f.x/2,Tt.y*=f.y/2,Tt.z=0,he.copy(Tt),pe.multiplyMatrices(s.matrixWorldInverse,E);for(let D=0,J=_;D<J;D++){if(dt.fromBufferAttribute(T,D),ht.fromBufferAttribute(w,D),dt.w=1,ht.w=1,dt.applyMatrix4(pe),ht.applyMatrix4(pe),dt.z>z&&ht.z>z)continue;if(dt.z>z){const y=dt.z-ht.z,L=(dt.z-z)/y;dt.lerp(ht,L)}else if(ht.z>z){const y=ht.z-dt.z,L=(ht.z-z)/y;ht.lerp(dt,L)}dt.applyMatrix4(d),ht.applyMatrix4(d),dt.multiplyScalar(1/dt.w),ht.multiplyScalar(1/ht.w),dt.x*=f.x/2,dt.y*=f.y/2,ht.x*=f.x/2,ht.y*=f.y/2,pt.start.copy(dt),pt.start.z=0,pt.end.copy(ht),pt.end.z=0;const x=pt.closestPointToPointParameter(he,!0);pt.at(x,Ne);const M=vt.lerp(dt.z,ht.z,x),C=M>=-1&&M<=1,W=he.distanceTo(Ne)<Ut*.5;if(C&&W){pt.start.fromBufferAttribute(T,D),pt.end.fromBufferAttribute(w,D),pt.start.applyMatrix4(E),pt.end.applyMatrix4(E);const y=new Z,L=new Z;zt.distanceSqToSegment(pt.start,pt.end,L,y),c.push({point:L,pointOnLine:y,distance:zt.origin.distanceTo(L),object:U,face:null,faceIndex:D,uv:null,uv1:null})}}}class Ln extends Lt{constructor(s=new je,c=new ve({color:Math.random()*16777215})){super(s,c),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const s=this.geometry,c=s.attributes.instanceStart,d=s.attributes.instanceEnd,a=new Float32Array(2*c.count);for(let E=0,p=0,T=c.count;E<T;E++,p+=2)ke.fromBufferAttribute(c,E),Be.fromBufferAttribute(d,E),a[p]=p===0?0:a[p-1],a[p+1]=a[p]+ke.distanceTo(Be);const f=new ye(a,2,1);return s.setAttribute("instanceDistanceStart",new Ht(f,1,0)),s.setAttribute("instanceDistanceEnd",new Ht(f,1,1)),this}raycast(s,c){const d=this.material.worldUnits,a=s.camera;a===null&&!d&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const f=s.params.Line2!==void 0&&s.params.Line2.threshold||0;zt=s.ray;const E=this.matrixWorld,p=this.geometry,T=this.material;Ut=T.linewidth+f,p.boundingSphere===null&&p.computeBoundingSphere(),oe.copy(p.boundingSphere).applyMatrix4(E);let w;if(d)w=Ut*.5;else{const z=Math.max(a.near,oe.distanceToPoint(zt.origin));w=Ue(a,z,T.resolution)}if(oe.radius+=w,zt.intersectsSphere(oe)===!1)return;p.boundingBox===null&&p.computeBoundingBox(),se.copy(p.boundingBox).applyMatrix4(E);let _;if(d)_=Ut*.5;else{const z=Math.max(a.near,se.distanceToPoint(zt.origin));_=Ue(a,z,T.resolution)}se.expandByScalar(_),zt.intersectsBox(se)!==!1&&(d?Tn(this,c):In(this,a,c))}onBeforeRender(s){const c=this.material.uniforms;c&&c.resolution&&(s.getViewport(de),this.material.uniforms.resolution.value.set(de.z,de.w))}}class qe extends je{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(s){const c=s.length-3,d=new Float32Array(2*c);for(let a=0;a<c;a+=3)d[2*a]=s[a],d[2*a+1]=s[a+1],d[2*a+2]=s[a+2],d[2*a+3]=s[a+3],d[2*a+4]=s[a+4],d[2*a+5]=s[a+5];return super.setPositions(d),this}setColors(s){const c=s.length-3,d=new Float32Array(2*c);for(let a=0;a<c;a+=3)d[2*a]=s[a],d[2*a+1]=s[a+1],d[2*a+2]=s[a+2],d[2*a+3]=s[a+3],d[2*a+4]=s[a+4],d[2*a+5]=s[a+5];return super.setColors(d),this}setFromPoints(s){const c=s.length-1,d=new Float32Array(6*c);for(let a=0;a<c;a++)d[6*a]=s[a].x,d[6*a+1]=s[a].y,d[6*a+2]=s[a].z||0,d[6*a+3]=s[a+1].x,d[6*a+4]=s[a+1].y,d[6*a+5]=s[a+1].z||0;return super.setPositions(d),this}fromLine(s){const c=s.geometry;return this.setPositions(c.attributes.position.array),this}}class zn extends Ln{constructor(s=new qe,c=new ve({color:Math.random()*16777215})){super(s,c),this.isLine2=!0,this.type="Line2"}}const Cn=20260328,me=Math.PI*(3-Math.sqrt(5)),On={orb:.82,facet:1,ring:.92,decor:1.08},kn=(U=Cn)=>{let s=U;return()=>(s=s*1664525+1013904223>>>0,s/4294967296)},Bn=U=>({centerX:U?28:30,centerZ:U?-76:-74,bottomY:U?-34:-40,height:U?90:98,baseRadius:U?10:16,topRadius:U?26:46,turns:U?1.54:1.82}),Yt=(U,s,c,d=0,a=1,f=0,E=0,p=new Z)=>{const T=vt.euclideanModulo(c,1),w=Math.sin(T*Math.PI*2.4+E*.42)*(s?2.4:4.5),_=Math.pow(T,.72),z=vt.lerp(U.baseRadius,U.topRadius,_)*a,D=T*Math.PI*2*U.turns+d+E;return p.set(U.centerX+w+z*Math.cos(D),U.bottomY+T*U.height+f,U.centerZ+z*Math.sin(D)*.68)},Re=(U,s)=>{const c=vt.clamp((s-(U.centerZ-U.topRadius*.85))/(U.topRadius*1.35),.32,1),d=vt.clamp((U.centerZ+U.topRadius*.88-s)/(U.topRadius*.9),.58,1);return c*d},Nn=(U,s,c,d)=>{const[a,f]=s?[.52,1.08]:[.72,1.58],E=1+Math.sin(c*Math.PI)*.06;return vt.lerp(a,f,d())*On[U]*E};Mn.registerPlugin(An);const Un=()=>{const U=document.getElementById("bg-canvas"),s=document.querySelector(".hero-container");if(!U||!s)return()=>{};if(s.dataset.heroInit==="true")return()=>{};s.dataset.heroInit="true";const c=window.innerWidth<700,d=window.matchMedia("(prefers-reduced-motion: reduce)");let a=d.matches;const f=kn(),E=new We,p=new Ie;E.add(p);const T=new un(75,window.innerWidth/window.innerHeight,.1,1e3);T.position.set(0,0,0);const w=new dn({canvas:U,alpha:!0,antialias:!0});w.setSize(window.innerWidth,window.innerHeight),w.setPixelRatio(Math.min(window.devicePixelRatio,2)),w.outputColorSpace=De,w.toneMapping=hn,w.toneMappingExposure=1.08;const _=new pn(w),z=new Pn,D=_.fromScene(z,.04);E.environment=D.texture;const J=new Z,Q=new Z,x=new Z,M=new Z,C=new mn(16773842,1774598,1);E.add(C);const W=new Le(16769956,3.2);W.position.set(-8,9,-8),E.add(W);const y=new Le(14214655,2.4);y.position.set(10,-4,-14),E.add(y);const L=new He(16774879,32,150,2);L.position.set(0,14,-22),E.add(L);const G=Bn(c),V=new Ie,X=c?13:24,j=[],q=c?20:28,K=new yn(.012,.135,q,10);K.translate(0,q/2,0),K.rotateX(-Math.PI/2);const ft=new Ve({uniforms:{color:{value:new gn(16772541)},opacity:{value:.44}},vertexShader:`
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,fragmentShader:`
				varying vec2 vUv;
				uniform vec3 color;
				uniform float opacity;
				void main() {
					// vUv.y is from 0 (head) to 1 (tail)
					// Smooth head, long fading tail
					float taper = pow(1.0 - vUv.y, 1.65);
					float headGlow = smoothstep(0.0, 0.16, 1.0 - vUv.y);
					float tailFeather = smoothstep(0.0, 0.08, vUv.y);
					float alpha = taper * headGlow * tailFeather;
					gl_FragColor = vec4(color, alpha * opacity);
				}
			`,transparent:!0,blending:ze,depthWrite:!1});for(let S=0;S<X;S++){const P=new Lt(K,ft.clone());V.add(P),j.push({mesh:P,speed:(c?45e-5:36e-5)+f()*2e-4,progress:(S+.5)/X+(f()-.5)*.012,offset:S*me+f()*.22,radiusBias:.92+f()*.26,verticalOffset:(f()-.5)*(c?7:9)})}p.add(V);const R=120,st=[],tt=(S,P,k,et)=>{const nt=new qe,lt=new Float32Array(R*3);nt.setPositions(lt);const At=new ve({color:16771245,linewidth:c?2.2:2.8,transparent:!0,opacity:et,blending:ze,depthWrite:!1,resolution:new $(window.innerWidth,window.innerHeight)}),ut=new zn(nt,At);ut.computeLineDistances(),p.add(ut),st.push({line:ut,geometry:nt,material:At,offset:S,radiusBias:P,verticalOffset:k,positions:lt,opacity:et})};for(let S=0;S<(c?2:3);S++)tt(S*me+f()*.2,.8+S*.15,(S-1)*(c?3.5:4.5),c?.32:.42);const rt=[],ot=c?1:2;let F=0;const m=new Z,ct=c?[.17,.29,.41,.53,.65,.77,.87]:[.12,.21,.3,.39,.49,.59,.69,.79,.88],it=S=>{const P=F++,k=ct[P%ct.length]??.5,et=vt.clamp(k+(f()-.5)*(c?.035:.045),.08,.94),nt=S==="orb"?0:S==="ring"?.74:S==="facet"?1.28:1.78,lt=S==="orb"?.82:S==="ring"?1.03:S==="facet"?.9:1.08;return{level:et,thetaOffset:(et*Math.PI*-1.15+P*me+nt+f()*.2)%(Math.PI*2),radiusBias:lt+f()*(S==="orb"?.28:.22),verticalOffset:(f()-.5)*(c?5.2:7.5)}},yt=S=>{p.localToWorld(m.copy(S)),m.project(T);const P=(m.x+1)/2,k=(1-m.y)/2;if(m.z<-1||m.z>1)return 1;if(window.innerWidth<700){const ut=P<.64&&k>.12&&k<.5,Ct=P<.9&&k>.68&&k<.86,le=k>.82,H=k<.12;return ut||Ct||le||H?.08:1}const et=P<.34&&k>.12&&k<.46,nt=P>.52&&k>.82,lt=P<.24&&k>.72&&k<.88,At=k<.12&&P>.36;return et||nt||lt||At?.08:1},gt=(S,P,k,et,nt="decor")=>{for(let lt=0;lt<k;lt++){const At=new Lt(S,P.clone()),ut=it(nt),Ct=Nn(nt,c,ut.level,f);At.scale.setScalar(Ct),Yt(G,c,ut.level,ut.thetaOffset,ut.radiusBias,ut.verticalOffset,0,At.position),p.add(At),rt.push({mesh:At,pathOffset:ut.thetaOffset,speed:et[0]+f()*(et[1]-et[0]),isDragging:!1,targetPos:new Z,rotationSpeed:new Sn((f()-.5)*.005,(f()-.5)*.005,(f()-.5)*.005),baseScale:Ct,vortexLevel:ut.level,radiusBias:ut.radiusBias,verticalOffset:ut.verticalOffset}),a&&w.render(E,T)}},Mt=new xn,r=new $,o=new wn,e=new Z,t=new Z,h=new Z,b=new Z;let l=null;const v=S=>{let P=S;for(;P;){const k=rt.find(et=>et.mesh===P);if(k)return k;P=P.parent}return null},A=(S,P=.32,k=1.75)=>new Ce({color:S,metalness:1,roughness:P,reflectivity:.65,clearcoat:.22,clearcoatRoughness:.34,envMapIntensity:k}),I=new _t,u=(S,P=2.4)=>{S.computeBoundingBox();const k=S.boundingBox?.getSize(new Z)??new Z(1,1,1),et=Math.max(k.x,k.y,k.z);if(et>0){const nt=P/et;S.scale(nt,nt,nt)}return S.computeBoundingSphere(),S},g=u(new be(2,2,2,5,.1)),O=u(new bn(1.2,4)),B=u(new vn(1,.4,32,48)),i=A(13738824,.28,2),n=A(13224123,.34,1.8),N=A(11100976,.36,1.6);gt(O,n,c?10:16,[3e-4,52e-5],"orb"),gt(g,i,c?3:5,[26e-5,48e-5],"facet"),gt(B,N,c?2:4,[26e-5,46e-5],"ring"),I.load("/2026/img/Hero/round-metal.svg",S=>{const P=[];S.paths.forEach(lt=>P.push(..._t.createShapes(lt)));const k=new ue(P,{depth:15,bevelEnabled:!0});k.center(),k.rotateX(Math.PI),u(k);const et=S.paths[0]?.color||14329120,nt=A(et,.3,1.9);gt(k,nt,ot,[24e-5,42e-5],"decor")}),I.load("/2026/img/Hero/stone-metal.svg",S=>{const P=[];S.paths.forEach(lt=>P.push(..._t.createShapes(lt)));const k=new ue(P,{depth:18,bevelEnabled:!0});k.center(),k.rotateX(Math.PI),u(k);const et=S.paths[0]?.color||14671839,nt=A(et,.34,1.75);gt(k,nt,ot,[24e-5,42e-5],"decor")}),I.load("/2026/img/Hero/star-metal.svg",S=>{const P=[];S.paths.forEach(lt=>P.push(..._t.createShapes(lt)));const k=new ue(P,{depth:12,bevelEnabled:!0});k.center(),k.rotateX(Math.PI),u(k);const et=S.paths[0]?.color||16777215,nt=A(et,.32,1.8);gt(k,nt,ot,[24e-5,42e-5],"decor")});const Y=S=>{r.x=S.clientX/window.innerWidth*2-1,r.y=-(S.clientY/window.innerHeight)*2+1,Mt.setFromCamera(r,T);const P=Mt.intersectObjects(rt.map(k=>k.mesh),!0);P.length>0&&(l=v(P[0].object),l&&(l.isDragging=!0,U.style.cursor="grabbing",o.setFromNormalAndCoplanarPoint(T.getWorldDirection(new Z).negate(),P[0].point),Mt.ray.intersectPlane(o,e)&&(l.mesh.getWorldPosition(h),t.copy(e).sub(h))))},mt=S=>{if(r.x=S.clientX/window.innerWidth*2-1,r.y=-(S.clientY/window.innerHeight)*2+1,l&&l.isDragging)Mt.setFromCamera(r,T),Mt.ray.intersectPlane(o,e)&&(b.copy(e).sub(t),p.worldToLocal(b),l.mesh.position.copy(b));else{Mt.setFromCamera(r,T);const P=Mt.intersectObjects(rt.filter(k=>k.mesh.visible).map(k=>k.mesh),!0);U.style.cursor=P.length>0?"grab":"auto"}},xt=()=>{l&&(l.isDragging=!1,l=null,U.style.cursor="auto")};window.addEventListener("pointerdown",Y),window.addEventListener("pointermove",mt),window.addEventListener("pointerup",xt);let at=0,wt=0,Et=0,Rt=0,Pt=0,Ot=0;const bt={x:0,y:0},kt={x:0,y:0},Zt=c?1.32:1.42,Kt=S=>1-Math.pow(1-S,3),$t=S=>{kt.x=(S.clientX/window.innerWidth-.5)*5,kt.y=(S.clientY/window.innerHeight-.5)*5};window.addEventListener("pointermove",$t);const Xe=()=>{const S=Math.max(s.offsetHeight,window.innerHeight),P=Math.max(S-window.innerHeight,window.innerHeight);return vt.clamp(-s.getBoundingClientRect().top/P,0,1)};let Vt=null,Dt=!1;const Se=()=>{const S=s.getBoundingClientRect();return S.bottom>0&&S.top<window.innerHeight},ae=()=>{Dt||!Se()||(Dt=!0,Ae())},ce=()=>{Dt&&(Dt=!1,Vt!==null&&(cancelAnimationFrame(Vt),Vt=null))},Me=S=>{a=S.matches,a&&ce(),Rt=window.scrollY,ae()},Ye=S=>{st.forEach(P=>{for(let k=0;k<R;k++){const et=k/(R-1);Yt(G,c,et,P.offset,P.radiusBias,P.verticalOffset,S,Q);const nt=k*3;P.positions[nt]=Q.x,P.positions[nt+1]=Q.y,P.positions[nt+2]=Q.z}P.geometry.setPositions(P.positions),P.line.computeLineDistances(),P.material.opacity=P.opacity})},Ae=()=>{if(!Dt)return;Et+=a?0:7e-4;const S=a?0:window.scrollY-Rt,P=Math.abs(S);Rt=window.scrollY;const k=1+Math.min(P*.01,2);a||(Ot+=vt.clamp(S*.0018,-.22,.22),Ot*=.88,Pt+=Ot,at+=(window.scrollY/8e3-at)*.05,wt+=(Xe()-wt)*.08,bt.x+=(kt.x-bt.x)*.05,bt.y+=(kt.y-bt.y)*.05),T.position.x=bt.x*.8,T.position.y=-bt.y*.8,T.rotation.y=-bt.x*.02,T.rotation.x=-bt.y*.02;const et=a?0:Kt(vt.clamp(wt/.36,0,1)),nt=a?0:Kt(vt.clamp(wt/.82,0,1)),lt=a?1:vt.lerp(1,Zt,nt);T.zoom+=(lt-T.zoom)*.08,Math.abs(T.zoom-lt)>5e-4&&T.updateProjectionMatrix();const At=a?0:-G.centerX*(c?.84:.92)*et,ut=a?0:(c?-2.2:-3.2)*et,Ct=a?1:vt.lerp(1,c?1.22:1.3,nt);p.position.x+=(At-p.position.x)*.13,p.position.y+=(ut-p.position.y)*.13,J.set(Ct,Ct,Ct),p.scale.lerp(J,.1);const le=Pt+Et*(c?.52:.62);if(Ye(le),j.forEach(H=>{a||(H.progress=(H.progress+H.speed*k)%1);const Ft=Yt(G,c,H.progress+at*.04,H.offset,H.radiusBias,H.verticalOffset,Pt+Et*.88,x);H.mesh.position.copy(Ft);const jt=Yt(G,c,(H.progress+.018)%1,H.offset+.02,H.radiusBias,H.verticalOffset,Pt+Et*.88+.025,M);H.mesh.lookAt(jt);const Bt=Re(G,Ft.z)*yt(Ft),qt=Bt>.02;H.mesh.visible=qt,qt&&(H.mesh.material.uniforms.opacity.value=.42*Bt)}),rt.forEach(H=>{const Ft=Pt+Et*(c?.78:.95)*(.78+H.speed*850),jt=Yt(G,c,H.vortexLevel,H.pathOffset,H.radiusBias,H.verticalOffset,Ft,H.targetPos);if(!H.isDragging)H.mesh.position.distanceTo(jt)>80?H.mesh.position.copy(jt):H.mesh.position.lerp(jt,.05),a||(H.mesh.rotation.x+=H.rotationSpeed.x*k,H.mesh.rotation.y+=H.rotationSpeed.y*k,H.mesh.rotation.z+=H.rotationSpeed.z*k),J.set(H.baseScale,H.baseScale,H.baseScale),H.mesh.scale.lerp(J,.1);else{const ee=H.baseScale*.7;J.set(ee,ee,ee),H.mesh.scale.lerp(J,.1)}const Bt=Re(G,H.mesh.position.z)*yt(H.mesh.position),qt=Bt>.02;H.mesh.visible=qt;const te=H.mesh;qt&&te.material instanceof Ce&&(te.material.opacity=Bt,te.material.transparent=Bt<.98,te.material.depthWrite=Bt>=.98)}),w.render(E,T),a){Dt=!1,Vt=null;return}Vt=requestAnimationFrame(Ae)},Ee=()=>{T.aspect=window.innerWidth/window.innerHeight,T.updateProjectionMatrix(),w.setSize(window.innerWidth,window.innerHeight),st.forEach(S=>{S.material.resolution.set(window.innerWidth,window.innerHeight)})};window.addEventListener("resize",Ee),d.addEventListener("change",Me),ae();const Pe=new IntersectionObserver(S=>{const P=S[0];P&&(P.isIntersecting&&Se()?ae():ce())},{threshold:0});Pe.observe(s);const Je=()=>{E.traverse(S=>{const P=S;P.geometry&&P.geometry.dispose(),P.material&&(Array.isArray(P.material)?P.material:[P.material]).forEach(et=>{et.dispose()})})};return()=>{ce(),window.removeEventListener("pointerdown",Y),window.removeEventListener("pointermove",mt),window.removeEventListener("pointerup",xt),window.removeEventListener("pointermove",$t),window.removeEventListener("resize",Ee),d.removeEventListener("change",Me),Pe.disconnect(),Je(),D.dispose(),z.clear(),_.dispose(),w.dispose(),s.dataset.heroInit="false"}};let ge=null;const xe=()=>{ge?.(),ge=Un()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xe,{once:!0}):xe();const Rn=()=>xe(),Dn=()=>{ge?.()};document.addEventListener("astro:page-load",Rn);document.addEventListener("astro:before-swap",Dn);
