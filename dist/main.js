(()=>{"use strict";let e=[{title:"test",detail:"detail test",priority:"priority test",date:"date test"}];function t(){const t=document.querySelector("#inputTitle"),c=document.querySelector("#inputDetails"),d=document.querySelectorAll(".priorityBtn"),l=document.querySelector("#dateInput");let o=new n(t.value,c.value,d,l.value);return e.push(o),e[e.length-1]}class n{constructor(e,t,n,c){this.title=e,this.details=t,this.priority=n,this.date=c}}const c=document.querySelector("#allTasks");document.querySelector("#allTaskPage"),document.querySelector("#todayTaskPage");const d=document.querySelector("#addItemBtn"),l=document.querySelector("#cancel"),o=document.querySelector("#formInput");d.addEventListener("click",(function(){document.getElementById("addItemForm").style.display="flex"})),l.addEventListener("click",(function(){document.getElementById("addItemForm").style.display="none"})),o.addEventListener("submit",(()=>{!function(e,t,n){const d=document.createElement("div");d.className="cardDiv",c.appendChild(d);const l=document.createElement("input");l.setAttribute("type","checkbox"),d.appendChild(l);const o=document.createElement("span");o.textContent=e,d.appendChild(o)}(t().title,t().detail,t().date),document.getElementById("formInput").reset()}))})();