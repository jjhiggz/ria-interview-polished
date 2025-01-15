import{e,M as t,i as n,Z as o,d as s,a as i,b as c,c as d,$ as l,D as u,f as p,p as f,z as h,u as y,j as m,g as w,h as v,H as x,k as g}from"../nitro/nitro.mjs";import"node:buffer";import"node:path";import"node:crypto";import"node:async_hooks";import"node:stream";const j=[];const F=async(e,t,n)=>e({...t,next:async(e={})=>{var o,s;return n({...t,...e,context:{...t.context,...e.context},sendContext:{...t.sendContext,...null!=(o=e.sendContext)?o:{}},headers:g(t.headers,e.headers),result:void 0!==e.result?e.result:t.result,error:null!=(s=e.error)?s:t.error})}});async function T(e,t,n){const o=function(e){const t=new Set,n=[],r=e=>{e.forEach((e=>{e.options.middleware&&r(e.options.middleware),t.has(e)||(t.add(e),n.push(e))}))};return r(e),n}([...j,...e]),a=async e=>{const n=o.shift();if(!n)return e;n.options.validator&&("client"!==t||n.options.validateClient)&&(e.data=await function(e,t){if(null==e)return{};if("~standard"in e){const n=e["~standard"].validate(t);if(n instanceof Promise)throw new Error("Async validation not supported");if(n.issues)throw new Error(JSON.stringify(n.issues,void 0,2));return n.value}if("parse"in e)return e.parse(t);if("function"==typeof e)return e(t);throw new Error("Invalid validator type!")}(n.options.validator,e.data));const s="client"===t?n.options.client:n.options.server;return s?F(s,e,(async e=>{const o=n.options.clientAfter;if("client"===t&&o){const t=await a(e);return F(o,{...e,...t},(e=>e))}return a(e).catch((t=>{if(c(t)||d(t))return{...e,error:t};throw t}))})):a(e)};return a({...n,headers:n.headers||{},sendContext:n.sendContext||{},context:n.context||{}})}function Y(e){return{_types:void 0,options:{validator:e.validator,validateClient:e.validateClient,client:async({next:t,sendContext:n,...o})=>{var s;return t(await(null==(s=e.extractedFn)?void 0:s.call(e,{...o,context:n})))},server:async({next:t,...n})=>{var o;const s=await(null==(o=e.serverFn)?void 0:o.call(e,n));return t({...n,result:s})}}}}function Q(e){var t;return"POST"===e.method?e.data instanceof FormData?(e.data.set("__TSR_CONTEXT",s.stringify(e.context)),{body:e.data}):{body:s.stringify({data:null!=(t=e.data)?t:null,context:e.context})}:{}}async function S(e){if(!e.ok){const t=e.headers.get("content-type");throw t&&t.includes("application/json")?s.decode(await e.json()):new Error(await e.text())}return e}async function N(e,t){var p,f;const h=e.method,y=new URL(e.url,"http://localhost:3000"),m=Object.fromEntries(y.searchParams.entries()),w=m._serverFnId,v=m._serverFnName;if(!w||!v)throw new Error("Invalid request");n("string"==typeof w);const x=null==(f=await(null==(p=o("server").chunks[w])?void 0:p.import()))?void 0:f[v],g=await(async()=>{try{const t=await(async()=>{var t;if(null!=(t=e.headers.get("Content-Type"))&&t.includes("multipart/form-data"))return n("get"!==h.toLowerCase(),"GET requests with FormData payloads are not supported"),await e.formData();if("get"===h.toLowerCase())return m.payload?s.parse(m.payload):void 0;const o=await e.text();return s.parse(o)})(),o=await x(t);return o instanceof Response?o:i(o)&&"result"in o&&o.result instanceof Response?o.result:c(o)||d(o)?E(o):new Response(void 0!==o?s.stringify(o):void 0,{status:l(u()),headers:{"Content-Type":"application/json"}})}catch(e){return e instanceof Response?e:i(e)&&"result"in e&&e.result instanceof Response?e.result:c(e)||d(e)?E(e):(console.error("Server Fn Error!"),console.error(e),console.info(),new Response(s.stringify(e),{status:500,headers:{"Content-Type":"application/json"}}))}})();if("application/json"===g.headers.get("Content-Type")){const e=await g.clone().text();e&&JSON.stringify(JSON.parse(e))}return g}function E(e){const{headers:t,...n}=e;return new Response(JSON.stringify(n),{status:200,headers:{"Content-Type":"application/json",...t||{}}})}e((async function(e){return N(t(e))}));const b="http://localhost:3000";p();const C=f.env.WEATHER_API_KEY,$=h.object({name:h.string(),lat:h.number(),lon:h.number(),country:h.string(),state:h.string()}),O="http://api.openweathermap.org",I=async e=>{const t=(await(e=>fetch(`${O}/geo/1.0/direct?q=${e}&limit=10&appid=${C}`).then((e=>e.json())).then(h.array($).parse))(e)).find((t=>t.name.toLowerCase()===e.toLowerCase()));if(!t)throw new Error("City not found");return fetch(`${O}/data/3.0/onecall?lat=${t.lat}&lon=${t.lon}&appid=${C}`).then((e=>e.json()))};I("Northglenn").then(console.log);const _=e=>(e=>9*(e-273.15)/5+32)(e).toPrecision(4),ie=()=>{const e=w({from:"/query/$query",select:e=>e.daily});return m.jsx("div",{className:"flex flex-col gap-5 bg-white shadow-md p-2 rounded w-10/12",children:e.slice(0,7).map((e=>m.jsxs("div",{className:"flex flex-col justify-around items-center border-1 bg-slate-200 border-black rounded-lg w-32",children:[m.jsxs("h3",{children:["Min: ",_(e.temp.min)]}),m.jsxs("h3",{children:["Max: ",_(e.temp.max)]})]})))})},ce=()=>{const e=w({from:"/query/$query",select:e=>e.hourly});return m.jsx("div",{className:"flex justify-evenly gap-5 bg-white shadow-md p-2 rounded w-10/12 h-40",children:e.slice(0,3).map((e=>m.jsxs("div",{className:"flex flex-col justify-around items-center border-1 bg-slate-200 border-black rounded-lg w-32",children:[m.jsx("h3",{children:_(e.temp)}),m.jsxs("h3",{children:[_(e.dew_point),"%"]})]})))})},q=function R(e,t){const o=t||e||{};return typeof o.method>"u"&&(o.method="GET"),{options:o,middleware:e=>R(void 0,Object.assign(o,{middleware:e})),validator:e=>R(void 0,Object.assign(o,{validator:e})),handler:(...e)=>{const[t,i]=e;Object.assign(o,{...t,extractedFn:t,serverFn:i}),n(t.url);const c=[...o.middleware||[],Y(o)];return Object.assign((async e=>T(c,"client",{...t,method:o.method,data:null==e?void 0:e.data,headers:null==e?void 0:e.headers,context:{}}).then((e=>{if(e.error)throw e.error;return e.result}))),{...t,__executeServer:async e=>{const n=e instanceof FormData?function(e){const t=e.get("__TSR_CONTEXT");if(e.delete("__TSR_CONTEXT"),"string"!=typeof t)return{context:{},data:e};try{return{context:s.parse(t),data:e}}catch{return{data:e}}}(e):e;return await T(c,"server",{...t,...n}).then((e=>({result:e.result,error:e.error,context:e.sendContext})))}})}}}().validator((e=>h.object({query:h.string()}).parse(e))).handler(function(e,t,o){const l=function(e,t,n){return`${e}/${"/_server".replace(/^\/|\/$/g,"")}/?_serverFnId=${encodeURI(t)}&_serverFnName=${encodeURI(n)}`}(b,t,o);return Object.assign(((...e)=>(n(1===e.length),async function(e,t,n){var o;const l=t[0];if(i(l)&&l.method){const t=l,i=t.data instanceof FormData?"formData":"payload",u=new Headers({..."payload"===i?{"content-type":"application/json",accept:"application/json"}:{},...t.headers instanceof Headers?Object.fromEntries(t.headers.entries()):t.headers||{}});if("GET"===t.method){const n=v({payload:s.stringify({data:t.data,context:t.context})});n&&(e+=`&${n}`)}const p=new Request(e,{method:t.method,headers:u,...Q(t)}),f=await n(p),h=await S(f);if(null!=(o=h.headers.get("content-type"))&&o.includes("application/json")){const e=s.decode(await h.json());if(c(e)||d(e)||e instanceof Error)throw e;return e}return h}const u=new Request(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}),p=await S(await n(u)),f=p.headers.get("content-type");return f&&f.includes("application/json")?s.decode(await p.json()):p.text()}(l,e,(async e=>{const t=u(),n=x(t);return Object.entries(n).forEach((([t,n])=>{e.headers.has(t)||e.headers.append(t,n)})),N(e)})))),{url:l.replace(b,""),filename:t,functionId:o})}(0,"c_l9nrw0","$$function0"),(async({data:e})=>await I(e.query))),Se=function(){const{query:e}=y({from:"/query/$query"});return m.jsxs("div",{className:"flex flex-col items-center gap-10 bg-blue-300 h-full",children:[m.jsx("h1",{children:e}),m.jsx(ce,{}),m.jsx(ie,{})]})},Ee=async({params:e})=>await q({data:{query:e.query}});function de(e){return q.__executeServer(e)}export{de as $$function0,Se as component,Ee as loader};
//# sourceMappingURL=query._query-k1ADdkxx.mjs.map
