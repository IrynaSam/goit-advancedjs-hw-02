import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");t.setAttribute("disabled","true");const o=document.querySelector("body");let r=null;e.addEventListener("click",d);function d(){r=setInterval(()=>{o.style.backgroundColor=n()},1e3),e.setAttribute("disabled","true"),t.removeAttribute("disabled")}t.addEventListener("click",()=>{clearInterval(r),t.setAttribute("disabled","true"),e.removeAttribute("disabled")});function n(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}
//# sourceMappingURL=commonHelpers.js.map
