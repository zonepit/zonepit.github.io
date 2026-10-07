(function(){
  var root=document.documentElement;
  function apply(l){
    if(l!=="de"&&l!=="en") l="de";
    root.setAttribute("data-lang",l); root.setAttribute("lang",l);
    var t=root.getAttribute("data-title-"+l); if(t) document.title=t;
    var d=root.getAttribute("data-desc-"+l), m=document.querySelector('meta[name="description"]'); if(d&&m) m.setAttribute("content",d);
    var b=document.querySelectorAll("[data-set-lang]");
    for(var i=0;i<b.length;i++) b[i].setAttribute("aria-pressed",String(b[i].getAttribute("data-set-lang")===l));
  }
  var single=root.getAttribute("data-single");
  if(single){ try{localStorage.setItem("rc-lang",single)}catch(e){} }
  var p=null; try{p=new URLSearchParams(location.search).get("lang")}catch(e){}
  var s=null; try{s=localStorage.getItem("rc-lang")}catch(e){}
  var n=(navigator.language||"de").toLowerCase();
  if(!single) apply(p||s||(n.indexOf("de")===0?"de":"en"));
  var btns=document.querySelectorAll("[data-set-lang]");
  for(var i=0;i<btns.length;i++) btns[i].addEventListener("click",function(){
    var l=this.getAttribute("data-set-lang"); apply(l); try{localStorage.setItem("rc-lang",l)}catch(e){}
  });

  /* Kapitel: mitwanderndes Telefon */
  var sticky=document.querySelector(".sticky"), chaps=document.querySelectorAll(".chap[data-s]");
  if(sticky && chaps.length && "IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          for(var i=0;i<chaps.length;i++) chaps[i].classList.toggle("on",chaps[i]===e.target);
          sticky.setAttribute("data-active",e.target.getAttribute("data-s"));
        }
      });
    },{rootMargin:"-45% 0px -45% 0px",threshold:0});
    for(var j=0;j<chaps.length;j++) io.observe(chaps[j]);
  }
})();
