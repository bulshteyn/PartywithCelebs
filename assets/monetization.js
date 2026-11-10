/* PartyWithCelebs referral analytics. No affiliate partnerships are active by default.
   To activate a partner, add an approved destination to assets/partners.json and
   explicitly link to /go.html?partner=ID&placement=... from the site.
   Client-side analytics are directional; financial attribution requires partner reporting. */
(function(){
  "use strict";
  function event(name,params){if(typeof window.gtag==="function")window.gtag("event",name,params);}
  document.addEventListener("click",function(e){
    var a=e.target.closest("a[href]");if(!a)return;
    var url;try{url=new URL(a.href,location.href);}catch(_){return;}
    var placement=a.getAttribute("data-placement")||"unspecified";
    if(a.hasAttribute("data-vip-inquiry")){
      event("vip_inquiry_click",{placement:placement,city:a.getAttribute("data-city")||"",venue:a.getAttribute("data-venue")||""});
    }
    if(url.protocol==="https:"&&url.hostname!==location.hostname){
      event("outbound_booking_click",{placement:placement,link_domain:url.hostname,venue:a.getAttribute("data-venue")||"",event_name:a.getAttribute("data-event")||"",link_type:a.hasAttribute("data-affiliate")?"affiliate":"official"});
    }
  },true);
})();