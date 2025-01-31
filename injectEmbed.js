injectSuccess = true;
let injectCurrentZoom = 1.0;
let injectChildinterval;
let injectChildUrl = "";
const injectChildScript = document.createElement('script');
const injectChildRetrys = parseInt(sessionStorage.getItem("tests") ?? "0");
const injectChildGetParam = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
const injectChildExternal = (url) => {
    if(window.wv) { 
        $("body").html(`
            <style></style>
            <div class="container">
                <div class="alert">
                    <div class="alert-area">
                        <section class="remove-margins">    
                            <img class="lazy medium" src="https://i.ibb.co/GFptDjH/player-White.png">
                            <div class="title">Player external</div>
                            <div class="message">Esse player está bloqueado no aplicativo. Para assistir a esse vídeo, abra o player no navegador do seu celular.</div>
                            <section class="section-horizontal-list">
                                <button class="btn medium bg-white-btn ripple bold retangle icon-left" style="height: 45px;" onclick="injectChildOpenExternal('${url}');" data-url=""><img class="lazy large-img-left" src="https://i.ibb.co/rfwD55J/play-Black.png"><span>Abrir no navegador</span> </button>
                            </section>
                        </section>
                    </div>
                </div> 
            </div>
            <style>body,button,li,ul{padding:0;margin:0}button,input{color:var(--color-text-white);background-color:var(--color-trans);border:0}.progress-content .circle,.progress-content .circle-list>div,.progress-content .line-large,.progress-content .line-small,.progress-content .retangle-list>div{background-color:var(--color-bg-darken)}.card-top-content::after,.card-top-content:not(.card-blur)::before{background-repeat:no-repeat;z-index:1;content:"";position:absolute}.item-liked .count-area .count,.item-rated .count-area::before{-webkit-text-stroke:1.5px var(--color-text-white);text-shadow:-10px -3px 20px var(--color-bg-darken)}.card-top-title,.text-size{text-transform:uppercase;white-space:nowrap}.enabled :nth-child(n+2),.inactive .channel-list-guide>section:nth-child(n+2),.invisible,.view-flags{visibility:hidden}@font-face{font-family:Special;font-style:normal;font-weight:400;src:url('../fonts/special.woff2') format('woff2')}@font-face{font-family:Title;font-style:normal;font-weight:400;src:url('../fonts/title.ttf') format('woff2')}:root{--color-trans:transparent;--color-bg:#000000;--color-bg-50:#55000000;--color-bg-darken:#2a2a2a;--color-bg-darken-50:#252525a2;--color-bg-light:#5f5f5f;--color-bg-light-50:#7f7f7fa2;--color-text-white:#ffffff;--color-text-darken:#a1a1a1;--color-text-light:#cccccc;--color-text-black:#000000;--color-white-50:#ffffff20;--color-muted:#000000;--color-no-muted-10:#000000;--color-no-muted-30:#000000;--color-no-muted-50:#000000;--color-no-muted-70:#000000;--color-no-muted-90:#000000;--color-00-10:#00000010;--color-ff-10:#ffffff10;--color-ff-20:#ffffff20;--color-ff-25:#ffffff25;--color-ff-30:#ffffff30;--color-ff-60:#ffffff60;--color-ff-70:#ffffff70;--color-ff-75:#ffffff75;--color-ff-80:#ffffff80;--color-ff-99:#ffffff90;--color-15:#151515;--color-a1-50:#a1a1a199;--color-42-50:rgba(42, 42, 42, 50%);--color-cc:#cccccc;--color-55:#555555}body{color:var(--color-text-white);line-height:1.2;overflow-x:hidden;font-family:Arial,Helvetica,sans-serif;-webkit-user-select:none;-ms-user-select:none;user-select:none;overflow-wrap:break-word}body:has(.content.progress,.search-results.active,.item-bottomsheet){overflow:hidden}a{color:var(--color-text-light);text-decoration:none}.search-box .area input,[data-action] *,button *{pointer-events:none}.search-box.active .area input,[data-action]{pointer-events:all}img.medium{width:135px;height:135px;object-fit:contain}input{text-overflow:ellipsis;font-size:15px;width:-webkit-fill-available;height:-webkit-fill-available;-webkit-user-select:auto;-ms-user-select:auto;user-select:auto}::placeholder-shown{text-overflow:ellipsis}::placeholder{color:var(--color-bg-light);opacity:1}input:focus,textarea:focus{outline:0}.ripple{transition:scale .15s ease-in-out}.ripple:active{scale:0.99}.progress-content{background-color:var(--color-bg);position:absolute;width:100%;height:auto;min-height:100vh;overflow:hidden}.card-top-content,.progress-content>div{position:relative;height:auto;overflow:hidden}.progress-content>div{top:calc(100vh / 3);width:calc(100% - 30px);max-width:720px;padding:0 15px;margin:auto}.progress-content>div>*{margin-top:15px;animation-name:fadeReverse;animation-duration:.5s;animation-iteration-count:infinite;animation-timing-function:ease-out;animation-direction:alternate}.progress-content>div>div{margin-left:auto;margin-right:auto}.progress-content .circle{width:90px;height:90px;border-radius:100px}.progress-content .line-large{border-radius:5px;width:calc(100% / 1.5);height:70px}.progress-content .line-small{border-radius:5px;width:90%;height:30px}.progress-content .circle-list,.progress-content .retangle-list,.search-box.active .area .back-btn,.search-container.active [data-list-id=historySearch] .section-vertical-list>*,[data-list-id=historySearch].show-all .section-vertical-list>:nth-child(n+6){display:flex}.progress-content .circle-list>div{width:30px;height:30px;border-radius:100px;flex:0 0 auto}.progress-content .retangle-list>div{width:120px;height:175px;border-radius:5px;flex:0 0 auto}.progress-content .circle-list>div:not(:first-child),.progress-content .retangle-list>div:not(:first-child){margin:0 0 0 15px}.content{background-color:var(--color-muted)}.card-top-content{width:100%}.card-top-content>img{position:absolute;width:100%;height:100%;opacity:.8;object-fit:cover}.card-top-content::after{width:100%;height:100%;left:0;bottom:0;background-image:url(../img/shadowBottomToTop.png);background-size:100% calc(100% / .5);background-position:bottom;box-shadow:inset 0 -100px 100px var(--color-bg)}.card-top-content:not(.card-blur)::before{width:100%;height:15%;left:0;top:0;background-image:url(../img/shadowBottomToTop.png);background-size:100% calc(100% / 1.1);background-position:0 30px;transform:rotate(180deg)}.card-top-title{font-family:Special;overflow:hidden;display:flex;justify-content:center;font-size:40px;font-weight:700;margin:0;text-overflow:ellipsis}.card-top-title.no-marquee{display:block;padding:0 15px}.card-top-content.card-blur .poster{position:relative;overflow:hidden;min-width:125px;min-height:180px;width:30vh;height:45vh;border-radius:5px;background:var(--color-bg-darken)}.card-top-content.card-blur .poster img{position:relative;width:100%;height:100%}.desk-section{display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;bottom:0;z-index:2;right:0;left:0;margin:auto}.desk-section>*{flex:0 0 auto;margin-bottom:15px}.card-top-week{color:var(--color-text-light);display:flex;justify-content:center;align-items:center}.card-top-week>span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-left:10px}.card-top-week>span:first-of-type{min-width:20px;width:20px;height:8px;padding:7px 0;font-size:6px;font-weight:700;background-color:var(--color-text-white);background-image:url(../img/topRetangle.png?aa);background-repeat:no-repeat;background-size:contain;background-position:center}.card-info-content{max-width:500px;text-align:center;margin:auto}.alert-area>section>*,.card-info-content>*{margin-top:10px}.anim-changes button,.container,.episodes,.lazy,.search-container{transition:.2s ease-in-out}.search-container{background-color:var(--color-bg);min-height:calc(100vh - 60px)}.item-details .item-trailer-content.active .frame,.item-details .item-trailer-content.active .trailer-progress,.lazy-poster{opacity:1}.lazy-poster[data-src]{opacity:0!important}.card-top-type{font-size:12px;font-weight:700;display:inline-flex;justify-content:center;align-items:center;margin:auto;letter-spacing:3px}.card-top-type img{width:13px;height:auto;margin:auto 4px;position:relative}.card-top-type span{height:13px;margin-top:3px}.card-desc-content,.margin-center{margin:auto}.card-poster-full-content{position:relative;width:100%;padding-top:20vh}.view-flags{position:absolute;width:100%;height:70vh;z-index:-1}.card-poster-full-content>*{position:relative;width:100%;height:auto;z-index:2;bottom:0;justify-content:center;display:flex;flex-wrap:wrap}.card-poster-full-content .card-poster{position:relative;overflow:hidden;background-color:var(--color-no-muted);width:100%;height:100%;max-width:400px;min-height:500px;border-radius:5px;margin-bottom:15px;-webkit-box-shadow:2px 0 30px 5px rgba(0,0,0,.3);-moz-box-shadow:2px 0 30px 5px rgba(0,0,0,.3);box-shadow:2px 0 30px 5px rgba(0,0,0,.3)}.card-poster-full-content .card-poster::before{content:'';position:absolute;width:-webkit-fill-available;height:-webkit-fill-available;bottom:0;border:1.2px var(--color-white-50) solid;border-radius:5px;z-index:1}.item-options,.item-options::after{border-bottom-left-radius:5px;border-bottom-right-radius:5px}.card-poster-full-content .card-poster::after{content:'';background-color:var(--color-no-muted);box-shadow:2px 0 100px 144px var(--color-no-muted);position:absolute;width:100%;height:15%;bottom:0}.card-poster-full-content .card-poster>.card-info-content{position:absolute;width:-webkit-fill-available;height:auto;bottom:0;padding:10px;z-index:3}.card-poster-full-content .card-poster>.card-info-content .marquee-article::after,.card-poster-full-content .card-poster>.card-info-content .marquee-article::before{box-shadow:0 0 15px 30px var(--color-no-muted)}.card-poster-full-content .card-poster>img{position:absolute;width:100%;height:100%;object-fit:cover;opacity:.7}.card-poster-full-content .card-opt-content:first-of-type{flex:1 0 0;max-width:100%}.card-poster-full-content .card-opt-content:first-of-type button{width:100%;max-width:100%}.card-item-title-content{padding-top:10px}.card-item-title-content .title{font-family:Special;font-size:26px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:1.3}.alert-area .message,.card-item-title-content .desc{font-size:15px;color:var(--color-text-light)}.card-item-title-content .desc:empty,.hide,.item-bottomsheet .card-item-title-content,.search-box .area .back-btn,.search-box .area .clear-btn,.search-box.active .area .search-btn,.tv-results #list>*,.view-flags:empty+.voice-btn,[data-list-id=historySearch] .section-vertical-list>:nth-child(n+6){display:none}.item-content-full{position:relative!important}.item-options,.item-poster{position:relative;background-color:var(--color-bg-darken)}.item-content-full-flex{flex:1;width:-webkit-fill-available;min-width:-webkit-fill-available;overflow:hidden}.item-poster{width:115px;height:165px;border-radius:5px;overflow:hidden;box-shadow:0 0 20px -10px var(--color-text-black)}.item-poster.large{width:100%!important;height:200px!important}.item-colletion>:first-child::after,.item-options,.item-options::after{width:-webkit-fill-available;height:-webkit-fill-available}.item-poster img{width:100%;height:100%;object-fit:cover}.item-options{padding:0 10px 10px;display:flex;justify-content:center;align-items:center;box-shadow:0 0 20px 25px var(--color-bg-darken)}.item-options::after{content:"";position:absolute;margin:auto;left:0;top:0;bottom:0;right:0;border-left:1px var(--color-white-50) solid;border-right:1px var(--color-white-50) solid;border-bottom:1px var(--color-white-50) solid;z-index:12;pointer-events:none}.item-options .separate{flex:1 0 0}.item-options img{width:15px;height:15px}#list{min-height:600px;transition:none}.item-rated{counter-increment:pos;display:flex;align-items:end}.item-liked{display:flex;align-items:start}.item-liked .content-area{overflow:hidden;position:relative;flex:1}.item-liked .content-area .item-poster{border-bottom-right-radius:25px!important}.item-liked .content-area .section-horizontal-list{position:absolute;top:calc(135px - 45px);right:0;padding:0;border:3px var(--color-bg) solid;border-radius:100px}.item-liked .content-area>.item-title{padding:10px 1px 15px;font-size:20px;font-weight:700}.item-liked .count-area{min-width:73px;font-family:Special;margin:2px 10px 0 0}.item-liked .count-area .count{color:var(--color-bg-darken);font-size:30px;line-height:1}.darken-text,.item-liked .count-area .title{color:var(--color-text-darken)}.item-rated .count-area{margin-right:-2px;margin-bottom:-3px}.toplist .item-content:not(:nth-child(-n + 9))>.item-rated .count-area{margin-right:-30px;margin-bottom:-3px}.item-rated .item-poster{position:relative;z-index:1}.item-rated .count-area::before{content:counter(pos);font-family:Special;font-size:140px;letter-spacing:-19px;line-height:0;color:var(--color-bg-darken)}.item-colletion{width:133px;height:125px;position:relative;overflow:hidden}.item-colletion>*{width:124px;height:124px;background-color:var(--color-bg-darken);border-radius:5px;position:relative;overflow:hidden;border:1px var(--color-bg) solid;z-index:2}.item-colletion>:first-child::after{content:'';position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;z-index:1;border:1px var(--color-white-50) solid;border-radius:5px}.item-colletion>:nth-child(2){position:absolute;left:4px;top:0;bottom:0;margin:auto;z-index:1;height:calc(100% - 20px)}.item-colletion>:nth-child(3){position:absolute;left:8px;top:0;bottom:0;margin:auto;z-index:0;height:calc(100% - 35px)}.channel-guide .guide,.item-colletion>*>span{top:0;margin:auto;width:max-content;height:max-content;position:absolute;right:0;bottom:0}.item-colletion>*>span{left:0;color:var(--color-text-white);text-shadow:2px 0 20px var(--color-00-10)}.item-colletion>*>img{position:absolute;width:100%;height:100%;object-fit:cover}.item-colletion>*>span>span:first-of-type{font-size:10px}.item-colletion>*>span>span:last-of-type{font-family:Special;font-weight:700;font-size:40px}.item-channel{width:100%;border-bottom:1px var(--color-bg-darken) solid}.channel-infos{display:flex;justify-content:left;width:100%;height:40px;padding:10px 0}.channel-guide{position:relative;flex:1;opacity:0}.channel-guide .guide{font-size:12px;color:var(--color-a1-50);padding:10px 15px;border:1px var(--color-a1-50) solid;border-radius:100px;min-width:120px;max-width:120px;min-height:15px}.channel-logo img{width:auto;max-width:100px;height:100%;object-fit:contain}.channel-list-guide .guide-title-area,.channel-logo,.message-alert .section-horizontal-list>*,.player-info,.section-horizontal-list.expand-all>*,.section-horizontal-list.expand-first>:first-of-type{flex:1}.channel-btn,.player-options{display:flex;gap:10px}.channel-list-guide{margin:0 0 10px;max-height:500px;transition:.5s ease-in-out;overflow:hidden}.channel-list-guide section{position:relative;display:flex;gap:20px;align-items:center;padding-top:30px;transition:.2s ease-in-out}.inactive .channel-list-guide button,.show-search-history{display:flex!important}.btn span,.channel-list-guide .desc,.channel-list-guide .guide-title-area,.channel-list-guide .title,.text-ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.inactive .channel-list-guide{overflow:hidden;max-height:55px}.channel-list-guide section:first-of-type{padding-top:15px}.channel-list-guide section:first-of-type .guide-time{background-color:red;color:#fff}.channel-list-guide section::before{content:'';position:absolute;left:18px;top:-10px;width:1px;height:100%;background-color:var(--color-bg-darken);z-index:-2}.channel-list-guide .guide-time{position:relative;padding:5px;background-color:var(--color-text-white);color:var(--color-bg);font-size:11px;border-radius:5px;text-align:center}.channel-list-guide .guide-time::before{content:'';position:absolute;width:45px;height:35px;top:-5px;left:0;background-color:var(--color-bg);z-index:-1}.channel-list-guide .guide-title-area .title{color:var(--color-text-white);font-weight:700}.channel-list-guide .guide-title-area .desc{color:var(--color-text-light);margin-top:2px;font-size:12px;max-width:150px}.item-details .item-trailer-content,.item-updated,.poster{position:relative;overflow:hidden}.item-updated::after{content:'NOVOS EPISÓDIOS';background:var(--color-text-white);color:var(--color-text-black);width:80%;position:absolute;left:0;right:0;bottom:0;margin:auto;font-size:9px;font-weight:700;text-align:center;padding:3px;border-top-left-radius:5px;border-top-right-radius:5px;box-shadow:0 0 55px 10px var(--color-text-black)}.poster.top::before,.top::before{background-image:url(../img/top.png)}.btn.img,.poster.top::before,.top::before{background-repeat:no-repeat}.item-bottomsheet{overflow:hidden;background:var(--color-15);position:absolute;width:-webkit-fill-available;height:auto;bottom:0;border-top-left-radius:10px;border-top-right-radius:10px;translate:0 10%;opacity:0;transition:.15s cubic-bezier(.4,0,.2,1)}.item-bottomsheet.active{translate:0 0;opacity:1}.item-bottomsheet #list{width:100%;height:auto;overflow-y:auto;overflow-x:hidden;position:relative;max-height:80vh;min-height:0}.item-bottomsheet .title-content{position:relative;display:flex;align-items:center;width:-webkit-fill-available;padding:5px 1px 0;border-bottom:1px var(--color-bg-darken) solid;z-index:2;box-shadow:0 1px 10px 0 var(--color-15)}.item-bottomsheet .title-content .title{font-size:18px;font-weight:700;height:-webkit-fill-available;width:-webkit-fill-available;margin:auto;text-align:start}.item-bottomsheet .content{background-color:transparent}.item-player{display:flex;padding:10px 0;gap:10px}.player-info *{margin-top:5px}.alert-area,.btn.image img{margin:auto;left:0;right:0;top:0;bottom:0}.player-info .title{font-weight:bolder;font-size:17px}.player-info .desc{font-size:12px;color:var(--color-text-darken)}.poster img{z-index:9;transition:none;background-repeat:no-repeat!important;background-position:center!important;background-size:cover!important}.poster.top::before{content:"";position:absolute;right:0;width:22px;height:35px;background-size:22px;background-position:top;z-index:1}.poster.top::after{content:"";position:absolute;left:0;width:100%;height:100%;z-index:8;background:var(--color-bg-50);backdrop-filter:blur(50px)}.mini-text{font-size:12px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mini-img{border-radius:100px;width:24px;height:24px}.btn{position:relative;overflow:hidden;min-width:45px;height:45px;font-size:16px;border:0;border-radius:5px;padding:15px;font-weight:700;max-width:150px}.btn.medium,.btn.mini{color:var(--color-text-white);position:relative;font-size:15px;border-radius:100px;padding:10px 25px;font-weight:400;max-width:300px;display:flex;justify-content:center}.btn.mini{min-width:35px;height:35px;align-items:center}.btn.medium{min-width:40px;height:40px;align-items:center}.btn.big,.btn.larger{justify-content:center;position:relative;font-size:17px;padding:10px 25px;font-weight:400;max-width:300px;border-radius:100px;display:flex;color:var(--color-text-white)}.btn.larger{min-width:45px;height:45px;align-items:center}.btn.big{min-width:50px;height:50px;align-items:center}.btn.extra{color:var(--color-text-white);position:relative;min-width:75px;height:75px;font-size:17px;border-radius:100px;padding:10px 25px;font-weight:400;max-width:300px;display:flex;justify-content:center;align-items:center}.btn.expanded{flex:1;width:auto;min-width:unset;max-width:unset}.btn.big.empty,.btn.extra.empty,.btn.larger.empty,.btn.medium.empty,.btn.mini.empty{padding:10px}.btn.mini img{width:10px;height:auto}.btn.medium img{width:15px;height:auto}.btn.larger img{width:20px;height:auto}.btn.big img{width:25px;height:auto}.btn.extra img{width:65px;height:auto}.btn.icon-left img.left{margin-right:10px}.btn.icon-right img.right{margin-left:10px}.btn.round{border-radius:100px}.btn.image img{position:absolute;padding:0;object-fit:contain}.btn.img{padding:12px 20px 12px 40px;background-size:20px;background-position:12px center}.btn.no-padding{padding:0!important;max-width:100%!important}.alert-area,.alert-intro .button,.alert-update .button,.message-alert{padding:10px 0}.i-play{background-image:url(../img/play.png)}.bg-transparent{background-color:var(--color-trans);color:var(--color-text-white)!important}.bg-white,.bg-white-btn{background-color:var(--color-text-white);color:var(--color-text-black)!important}.bg-white-50{background-color:var(--color-white-50)}.bg-black{background-color:var(--color-bg)}.bg-darken-solid,.item-details .item-trailer-content .trailer-content{background-color:var(--color-bg-darken)}.bg-darken-50-solid,.episodes button.active{background-color:var(--color-bg-darken-50)}.bg-55{background-color:var(--color-55)}.bg-black-borded-light{background-color:var(--color-bg);border:1px var(--color-bg-light) solid}.bg-darken-borded{background-color:var(--color-bg-darken);border:1px var(--color-bg-light) solid}.bg-trans-borded-darken{background-color:var(--color-trans);border:1px var(--color-bg-darken) solid}.bg-darken-btn{background-color:var(--color-ff-25)}.bg-borded-white-btn{background-color:var(--color-trans);border:1px var(--color-text-white) solid}.bg-borded-white-20-btn{background-color:var(--color-trans);border:1px var(--color-ff-20) solid}.bg-borded-white-50-btn{background-color:var(--color-ff-10);border:0 var(--color-bg-light) solid}.bg-darken-btn.activated,.bg-darken-btn.active{background-color:var(--color-ff-60)}.progress .card-top-title,.progress .card-top-week,.progress .title{background-color:var(--color-bg-darken);border-radius:5px}.horizontal-scroller,.vertical-scroller{counter-reset:pos;width:-webkit-fill-available;overflow:auto hidden;padding:10px 0}.horizontal-scroller.error,.progress,.progress.mini,.search-results .progress #list .vertical-scroller{overflow:hidden}.horizontal-scroller>section{width:max-content}.horizontal-scroller.error>section{width:100%;background-color:var(--color-ff-10);border-top:1px var(--color-ff-20) solid;border-bottom:1px var(--color-ff-20) solid}.vertical-scroller>section .item-content{width:calc(100% / 3 - 7px)}.vertical-scroller>section .item-content.large{width:100%}.vertical-scroller>section .item-content .item-poster{width:100%;height:175px}.vertical-scroller>section .item-content.large .item-poster{width:-webkit-fill-available;height:135px;border-radius:5px}.vertical-scroller>section .item-content.large .item-poster>img{opacity:.5}.progress{position:absolute;width:100%;height:100%}.alert,.alert-area,.progress.mini{position:relative}.progress .card-top-title{width:calc(100% / 1.5);height:65px;margin:5px auto 0}.progress .card-top-week{width:calc(100% / 1.1);height:15px;margin:10px auto 0}.progress .title{width:35%;height:30px}.progress .bg-white,.progress button{background-color:var(--color-bg-darken)!important}.progress .horizontal-scroller,.progress .item-details .scroller{overflow:hidden!important}.progress .horizontal-scroller button{min-width:150px!important}.progress #list,.progress .card-info-content,.progress .font-list,.progress .item-content-full-flex,.progress .item-details,.progress .options,.progress.guide{animation-name:fadeReverse;animation-duration:.5s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;animation-direction:alternate}.progress .count-area{height:73px;border-radius:100px;background-color:var(--color-bg-darken)}.progress .save{border:0}.poster-img-left,.retangle{border-radius:5px!important}.progress .btn.expanded{height:15px}.progress .guide-time{width:30px;height:10px;background-color:var(--color-bg-darken)!important}.progress .guide-title-area .title{background-color:var(--color-bg-darken);width:50%;height:20px;border-radius:5px}.progress .guide-title-area .desc,.progress .item-details .details{border-radius:3px;height:10px;background-color:var(--color-bg-darken)}.progress .guide-title-area .desc{width:35%;margin-top:5px}.progress .btn.medium{padding:0}.progress .channel-logo *{width:100px;max-width:100px;height:100%;background-color:var(--color-bg-darken);border-radius:5px}.progress .item-details .section-horizontal-list .empty{max-width:45px;min-width:45px!important;width:45px;height:45px}.progress .item-details .details{margin-top:10px;width:50%}.alert,.alert-area,.item-borded-options::after{width:-webkit-fill-available}.progress .item-details .sinopse{background-color:var(--color-bg-darken);width:-webkit-fill-available;height:120px;border-radius:5px}.progress .item-details .title.width-spaces{width:80%}.no-anim *{animation:none!important}#list .alert{height:100%;min-height:600px}.item-bottomsheet #list .alert{height:100%;min-height:200px}#list .alert .alert-area>section,.error-results .alert-area>section{margin-top:0}#list .horizontal-scroller .alert{height:100%;min-height:165px}.alert{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh}.alert .section-horizontal-list,.alert .section-vertical-list{justify-content:center}.alert-area{max-width:500px;height:auto}.alert-area.disable-space>section{text-align:center;margin-top:0}.alert-area>section{text-align:center;margin-top:40%}.alert-area>section>section{margin-top:20px}.alert-area .title{font-family:Title;font-size:35px;font-weight:700}.bold{font-weight:700!important}.large-img-left{width:20px!important;height:20px!important;margin-right:5px!important}.poster-img-left{width:100px!important;height:50px!important;background-color:var(--color-bg-darken)}#frame,.cat-close-img,.search-box,.search-results{background-color:var(--color-bg)}.medium-img-left{width:15px!important;height:15px!important;margin-right:5px!important}.progress-img,.text-size{width:100%;overflow:hidden}.text-size{position:fixed;clear:both;display:inline-block}.blur{filter:blur(50px)}.item-borded-options{border-bottom-left-radius:0;border-bottom-right-radius:0}.item-borded-options::after{content:'';position:absolute;height:-webkit-fill-available;left:0;z-index:11;margin:auto;border-radius:5px 5px 0 0;border-left:1px var(--color-white-50) solid;border-right:1px var(--color-white-50) solid;border-top:1px var(--color-white-50) solid;pointer-events:none}.top::before{content:"";position:absolute;right:0;width:22px;height:35px;background-size:22px;background-position:top;z-index:10;pointer-events:none}div[data-list-id=myList] .item{position:relative;overflow:auto;border-radius:5px}div[data-list-id=myList] .item-poster img{opacity:.8}.width-spaces,.width-spaces-pd,.width-spaces-scroll,.width-spaces-scroll-pd{transition:margin .2s ease-in-out}.section-vertical-list{display:flex;flex-wrap:wrap;gap:10px;justify-content:left}.section-horizontal-list{display:flex;gap:10px;justify-content:left}.big .progress-img svg,.guide-area .guide-icon-right,.progress-img.medium svg{width:25px}.progress-img.big svg{width:30px}.progress-img.larger svg{width:40px}.progress-img{position:absolute;height:100%;bottom:0;top:0}.progress-img svg{animation:2s linear infinite rotate;width:20px;position:absolute;bottom:0;left:0;right:0;top:0;margin:auto}.progress-img svg circle{stroke-linecap:round;-webkit-animation:1.5s ease-in-out infinite dash;animation:1.5s ease-in-out infinite dash}.progress-img.wrap{width:-webkit-fill-available;height:auto;margin:auto;padding:20px}.cat-content::after,.cat-contentx::before{position:fixed;width:100%;height:0;content:'';z-index:1}#dialog{position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;z-index:900000}#dialog iframe{width:100%;height:100%;padding:0;margin:0;border:0}.cat-content{position:absolute;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;transition:.2s linear}.item-details,.item-season,.search-results #list>*{transition:.2s ease-in-out}.cat-content button{font-size:22px!important;margin:15px 0;color:var(--color-text-light)!important}.cat-content button.active{font-size:26px!important;color:var(--color-text-white)!important;font-weight:700!important}.cat-content::after{bottom:0;box-shadow:0 0 150px 80px var(--color-bg)}.cat-contentx::before{top:0;box-shadow:0 0 100px 50px var(--color-bg)}.cat-content>section{padding:100px 0}.cat-close-img{width:60px;position:absolute;bottom:0;left:0;right:0;margin:10px auto;z-index:2;border-radius:100px}.search-box,.search-input{width:-webkit-fill-available;overflow:hidden}.share,.utils{margin-top:10px!important;margin-bottom:0!important}#frame,.search-input{position:fixed;z-index:1000}.search-box{height:60px;border-bottom:1px var(--color-trans) solid}.search-box .area,.search-box .area>section,.search-box .area>section form,.search-results{width:-webkit-fill-available;height:-webkit-fill-available}.search-box .area{position:absolute;border:1px var(--color-bg-light) solid;border-radius:10px;margin:5px 10px;left:0;right:0;bottom:0;transition:.2s linear}.search-box .area>section{display:flex;gap:10px;padding:0 10px;align-items:center;justify-content:center}.search-box .area>section form{flex:1}.search-box.active .area{border:1px var(--color-trans) solid;border-bottom:1px var(--color-bg-light) solid;border-radius:0;margin:0 -8px}.search-container.active .show-search-history,.show-all .show-search-history,.show-search-history.inactive{display:none!important}.search-container{padding-top:60px}.search-results{display:none;position:fixed;top:60px;z-index:10;opacity:0}.search-results [data-list-id=resultsSearch]{background-color:var(--color-bg);position:absolute;width:100%;height:100%;display:none}.search-results #list>.active,.search-results [data-list-id=resultsSearch].active,.search-results.active,.tv-results #list>.active{display:block}.search-results [data-list-id=historySearch]{position:absolute;overflow-y:auto;width:100%;height:100%}.item-details,.tv-results .scroller{width:-webkit-fill-available;height:-webkit-fill-available;position:absolute}.item-details .item-details-content .scroller,.search-results #list .vertical-scroller{position:absolute;overflow:auto;width:-webkit-fill-available;height:-webkit-fill-available}.search-results #list>*{display:none}.tv-results #list .vertical-scroller{padding:5px 0}.tv-results .scroller:has(.scroller.progress){overflow:hidden}.tv-results .scroller{overflow:auto;padding-bottom:5px}.guide-area{display:flex;justify-content:center;align-items:center}.guide-area .guide-icon-left{width:15px}.guide-area .guide-icon-left img{top:0;bottom:0;left:15px;position:absolute;width:5px;height:5px;margin:auto;object-fit:contain}.guide-area .guide-icon-right img{top:0;bottom:0;right:15px;position:absolute;width:15px;height:15px;margin:auto}.guide-area .guide-program{flex:1;overflow:hidden}.guide-area .marquee-article::after,.guide-area .marquee-article::before{box-shadow:0 0 15px 10px var(--color-bg)}.item-details{display:flex}.item-details .item-trailer-content .bg{position:absolute;width:100%;height:100%;opacity:.7;object-fit:cover}.item-details .item-trailer-content .preview{background-color:var(--color-42-50);color:var(--color-text-white);width:auto;height:auto;position:absolute;padding:5px 10px;font-size:12px;font-weight:700;border-radius:5px;margin:10px;bottom:0}#frame,.item-season span{top:0;bottom:0;left:0;right:0;margin:auto}.item-details .item-trailer-content .frame,.item-details .item-trailer-content .trailer-progress{opacity:0}.item-details .item-trailer-content .frame{position:absolute;width:100%;height:100%;z-index:1;pointer-events:none;overflow:hidden;transition:.2s ease-in-out}.item-details .item-trailer-content .trailer-btn>*{position:absolute;bottom:0;top:0;left:0;right:0;margin:auto}.item-details .item-trailer-content .trailer-progress span{position:absolute;bottom:0;width:0;height:2px;background-color:var(--color-text-white);border-top-right-radius:5px;border-bottom-right-radius:5px;z-index:3}.item-details .item-trailer-content .trailer-progress::after{content:'';position:absolute;width:100%;height:2px;bottom:0;z-index:2;background-color:var(--color-ff-30)}.item-details .item-details-content .poster{margin-bottom:10px;margin-top:10px}.item-details .item-details-content .title{font-weight:700;font-size:25px}.item-details .item-details-content .details{padding:7px 0;color:var(--color-text-darken);font-size:12px}.item-details .item-details-content .details .percentage{font-weight:700}.item-details .item-details-content .details .rate{background-image:url(../img/imdb.png);background-repeat:no-repeat;background-size:30px;background-position:0 center;color:#ff0;background-color:var(--color-bg-darken-50);border:1px solid #ff0;padding:4px 10px 4px 38px;margin:5px;border-radius:5px}.item-details .item-details-content .sinopse{color:var(--color-text-darken);text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:5;line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;font-size:15px}.item-details .item-details-content .geners{color:var(--color-text-darken);margin-top:10px;margin-bottom:10px;font-size:15px}.item-details .item-details-content .suggestionsOrSeasons .title{font-family:sans-serif;font-size:20px}.utils{border:1px var(--color-55) solid;border-radius:10px;padding:10px}.utils .title{color:var(--color-55);font-size:15px;font-weight:700;margin-bottom:10px}.share{border-top:1px var(--color-55) solid;padding:10px}.share .title{color:var(--color-55);font-size:15px;font-weight:700;margin-bottom:5px}.alert-season .title,.episodes button span .title{font-size:15px!important}.item-season{background-color:var(--color-bg-darken);border-radius:100px;width:50px;height:50px;position:relative;overflow:hidden}.item-season.active{background-color:var(--color-text-white);color:var(--color-text-black)}.item-season span{position:absolute;width:max-content;height:max-content;font-size:22px;font-weight:700}.alert-season{width:100%;display:flex;padding:10px;gap:10px;justify-content:center;align-items:center}.alert-season .title{flex:1!important;font-weight:400!important}.episodes button{width:-webkit-fill-available!important;height:auto!important;max-width:100%!important;padding-top:15px!important;padding-bottom:15px!important;gap:15px!important;border-bottom:1px var(--color-bg-darken) solid;border-radius:0!important}.episodes button span{flex:1;text-align:left}.episodes button span .subtitle{font-size:13px!important;color:var(--color-text-darken)}.alert-intro,.alert-update{display:flex;flex-direction:column;height:100vh}.alert-intro .title-area .logo,.alert-update .title-area .logo{padding:20px 0;width:auto;height:30px}.alert-intro .title-area .logo img,.alert-update .title-area .logo img{width:auto;height:100%}.alert-intro .title-area .title,.alert-update .title-area .title{padding-top:20px;padding-bottom:10px;font-size:35px;font-weight:700;font-family:Title}.alert-intro .title-area .desc,.alert-update .title-area .desc{padding-bottom:20px;font-size:15px;color:var(--color-text-darken)}.alert-intro .terms,.alert-update .terms{flex:1;overflow:auto}.alert-intro .terms .section-vertical-list,.alert-update .terms .section-vertical-list{flex-direction:column}.alert-intro .terms .section-vertical-list .btn{padding:10px;width:100%;height:auto;flex:1;justify-content:left;align-items:start;border-radius:0;gap:10px;max-width:100%}.alert-intro .terms .section-vertical-list .btn img,[data-list-id=resultsSearch] #list .horizontal-scroller,[data-list-id=resultsSearch] #list .vertical-scroller{padding-top:5px}.alert-intro .terms .section-vertical-list .btn span{color:var(--color-text-darken);overflow:auto;white-space:normal;text-overflow:unset;text-align:left}.alert-intro .button .btn,.alert-update .button .btn{max-width:100%;width:100%}.alert-update .terms .section-vertical-list .btn span{flex:1;text-align:left;color:var(--color-text-darken)}.alert-update .terms .section-vertical-list .btn{padding:10px;width:100%;height:auto;flex:1;justify-content:center;align-items:center;border-radius:0;gap:10px;max-width:100%}[data-action="17"]{transition:.3s ease-in-out;transform:rotate(45deg)}.enabled,.enabled :nth-child(n+2){transition:none!important}.inactive [data-action="17"]{transform:rotate(0)}[data-list-id=resultsSearch] .font-list{padding-bottom:10px}.vertical-scroll-enabled{position:absolute;width:100%;height:100%;overflow:auto}.marquee-article,.marquee-wrapper{position:relative}.no-results{color:var(--color-text-darken);padding-top:10px}.section-line{width:-webkit-fill-available;height:-webkit-fill-available;display:flex;gap:10px;align-items:center;justify-content:center}.section-line .expand{flex:1;padding:10px 0}.text-normal{font-weight:400;text-align:left}.no-right-space{padding-right:2px!important;justify-content:right!important}.no-left-space{padding-left:2px!important;justify-content:left!important}.progress-img.black svg circle{stroke:var(--color-bg)}.progress-img.white svg circle{stroke:var(--color-text-white)}.img-darken img{filter:invert(35%) sepia(36%) saturate(7%) hue-rotate(60deg) brightness(89%) contrast(79%)}.marquee-article{overflow:hidden;white-space:nowrap;width:auto;display:flex}.marquee-article::after{content:'';position:absolute;width:0;height:100%;right:0;z-index:1}.marquee-article::before{content:'';position:absolute;width:0;height:100%;left:0;z-index:1}.marquee{animation:25s linear infinite marquee}.marquee2{animation:25s linear infinite marquee2;position:absolute;top:0}.marquee-article ul{display:flex;list-style:none;padding-left:15px}#frame{width:100%;height:100%;border:0}.item-content-game .item-poster{width:280px}.margin-minus-10{margin-left:-10px}@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-100%)}}@keyframes marquee2{from{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes fadeReverse{0%{opacity:1}100%{opacity:.8}}@media (pointer:fine),(pointer:none){body{background-color:var(--color-bg)}}@media all and (min-width:721px){.card-top-content>img{opacity:0}.card-top-content>section{margin-top:25vh}.desk-section{align-items:start;justify-content:left}.desk{display:block}.mobile{display:none}.width-spaces{margin:0 60px}.width-spaces-scroll>:first-of-type{margin-left:60px}.width-spaces-scroll>:last-of-type{margin-right:60px}.width-spaces-pd{padding:0 60px!important}.card-poster-full-content .card-poster.width-spaces{margin:15px 75px}.card-top-content .desk-section>:first-of-type{width:100%}.card-top-content .desk-section>:first-of-type>div{width:100%;text-align:center}.card-top-content .desk-section>:first-of-type>div>img{position:relative;overflow:hidden;min-width:125px;min-height:180px;width:30vh;height:45vh;background:var(--color-bg-darken)}.item-details .item-trailer-content .frame iframe{scale:3}.item-details .item-trailer-content{width:100%;height:100%}.item-details .item-trailer-content .trailer-content{position:relative;width:70%;height:100%}.item-details .item-trailer-content .trailer-content::after{content:'';pointer-events:none;position:absolute;top:0;width:100%;height:100%;-webkit-box-shadow:inset -200px 0 120px -20px #000;-moz-box-shadow:inset -200px 0 120px -20px #000;box-shadow:inset -200px 0 120px -20px #000;z-index:2}.item-details .item-trailer-content .trailer-btn svg,.item-details .item-trailer-content .trailer-btn>*{right:20%}.item-details .item-details-content{position:absolute;right:0;width:40%;height:100%;z-index:2}.item-details .item-details-content .scroller{padding:20px 0}}@media all and (max-width:720px){.card-top-content>section{margin-top:20vh}.desk,.item-details .item-details-content .poster{display:none}.mobile{display:block}.width-spaces{margin:0 15px}.width-spaces-scroll>:first-of-type{margin-left:15px}.width-spaces-scroll>:last-of-type{margin-right:15px}.width-spaces-pd{padding:0 15px!important}.card-poster-full-content .card-poster.width-spaces{margin:15px 30px}.item-details{flex-direction:column}.item-details .item-trailer-content{width:100%;height:250px}.item-details .item-trailer-content .trailer-content{position:relative;width:100%;height:100%}.item-details .item-details-content .scroller{padding:10px 0}}@media screen and (min-width:450px){.vertical-scroller>section .item-content{width:calc(100% / 4 - 7.5px)}.vertical-scroller>section .item-content.large{width:100%}.vertical-scroller>section .item-content .item-poster{height:145px}}@media screen and (min-width:550px){.vertical-scroller>section .item-content{width:calc(100% / 5 - 8px)}}@media screen and (min-width:750px){.vertical-scroller>section .item-content{width:calc(100% / 6 - 8.4px)}.vertical-scroller>section .item-content.large{width:calc(100% / 2 - 5px)}}@media screen and (min-width:850px){.vertical-scroller>section .item-content{width:calc(100% / 7 - 8.6px)}}@media screen and (min-width:1050px){.vertical-scroller>section .item-content{width:calc(100% / 8 - 8.8px)}.vertical-scroller>section .item-content.large{width:calc(100% / 3 - 7px)}}@media screen and (min-width:1250px){.vertical-scroller>section .item-content{width:calc(100% / 8 - 8.8px)}.vertical-scroller>section .item-content .item-poster{width:115px;height:165px;margin:auto}}.item-person {background: var(--color-bg-darken);width: 120px;height: 120px;overflow: hidden;border-radius: 100px;position: relative;} .item-person img {width: 100%;height: 100%;object-fit: cover;}.item-person div {position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: -webkit-fill-available;height: -webkit-fill-available;z-index: 1;border: 2px var(--color-bg-darken-50) solid;border-radius: 100px;} .item-bottomsheet .title-content {border-bottom: 1px var(--color-55) solid;}.item-bottomsheet #list {max-height: 80vh;} .container-viewed {border-radius: 10px;padding: 15px;margin-top: 10px;margin-bottom: 10px;} .container-viewed > section  {display: flex;gap: 10px;flex-direction: column;} .container-viewed .title-area > section {display: flex;gap: 20px;align-items: center;} .container-viewed .title-area .img {border-radius: 10px;padding: 30px;width: 35px;height: 35px;} .container-viewed .title-area .img img { width: 100%; height: auto;} .container-viewed .title-area .title {font-family: 'Special'; font-size: 30px; line-height: 1;} .container-viewed .title-area .desc {font-size: 13px; margin-top: 2px;}.container-viewed .desc-long {font-size: 15px; margin: 10px 0px;} .container-viewed .item section {display: flex;gap: 20px;align-items: center;} .container-viewed .item section img {width: 120px;height: 60px;object-fit: cover;} .container-viewed .item section .title {font-size: 18px; margin-bottom: 3px;}.container-viewed .item section .desc {font-size: 15px;}.container-viewed .contenter {display: flex;flex-direction: column;gap: 20px;}.container-viewed .item .lazyer {border-radius: 5px;overflow: hidden;height: 60px;}.input-box {position: relative;min-width: 200px;margin: 10px 0px;}.input-box.active .uid {background-color: transparent;color: #5d5d5d;border: 1px #5d5d5d solid;width: -webkit-fill-available;border-radius: 5px;padding: 15px 25px;-webkit-touch-callout: all;-webkit-user-select: all;-khtml-user-select: all;-moz-user-select: all;-ms-user-select: all;user-select: all;outline: all;}.input-box.active .input-label {font-size: 13px;position: relative;top: 10px;left: 15px;padding: 0px 10px;background: var(--color-bg);color: #5d5d5d;}.espacer {margin-top: 5px;}.snackBar {width: -webkit-fill-available;height: auto;position: fixed;padding: 20px;background-color: var(--color-bg-darken);color: var(--color-text-light);bottom: -100%;z-index: 10;transition: all 0.5s ease-in-out;font-size: 15px;}.snackBar.active {bottom: 0;} video { width: 100%; height: 70vh; background: #000000; }.item-live { overflow: hidden; position: relative; width: 300px; }.item-live .item-poster { width: 300px; height: 110px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; } .title-live { position: relative; bottom: 0; width: -webkit-fill-available; height: auto; padding: 10px; background: #333333; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .title-live span:first-of-type { font-size: 15px; font-weight: bold; } .title-live span:last-of-type { font-size: 12px; color: #cccccc; } .tv-results #list >[data-list-id="futebolLiveList"], .tv-results #list >[data-list-id="channelsMyList"] { display: block; } .hide { display: none !important; } .card-item-title-content .title { display: flex; gap: 10px; align-items: center; } .green-circle { color: #32fc32 !important; font-size: 20px; line-height: 1.3; } .title-live .green-circle { margin-left: 5px; animation: blinker 1.5s linear infinite; } @keyframes blinker {50% { opacity: 0; } } .margin-minus-10 { margin-left: -10px; } .item-content-channel { width: 200px; background: #2a2a2a; border-radius: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column; } .item-content-channel .item-poster { box-shadow: none; height: 100px; display: flex; justify-content: center; align-items: center; } .item-content-channel .item-poster img { height: 50px; object-fit: contain; } .item-content-game .item-poster { width: 280px; } .fake-btn { font-size: 13px; background-color: #ffffff; color: #000000; padding: 10px 15px; font-weight: bold; border-radius: 5px; width: max-content; } .section-horizontal-list.center { align-items: center; } .section-horizontal-list .expand { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .item-player { padding: 15px 15px; margin-top: 10px; background: #5F6267; border-radius: 10px; } .player-info .desc { color: #dddddd; } .player-info .title { margin-top: 0px; } .card-poster-full-content .card-poster { border-radius: 10px; } .card-poster-full-content .card-poster::before { border-radius: 10px; border-width: 1.8px; } .ads-banner-content { display: none !important; position: relative; display: flex; justify-content: center; z-index: 1; } .ads-banner { position: relative; background: #1d1d1d; width: -webkit-fill-available; height: 230px; overflow: hidden; border-top-left-radius: 10px; border-top-right-radius: 10px; display: none; flex-direction: column; } .ads-banner .img { width: -webkit-fill-available; height: -webkit-fill-available; overflow: hidden; } .ads-banner .img img { width: -webkit-fill-available; height: -webkit-fill-available; object-fit: cover; } .ads-banner .more { position: relative; display: flex; align-items: center; gap: 10px; padding: 13px 13px 13px 13px; font-size: 15px; } .ads-banner .more span, .ads-banner .title span { flex: 1; } .ads-banner .more img, .ads-banner .title img { width: 20px; }.input-box.count { margin-bottom: 0px; } input[type=checkbox] { height: 0; width: 0; visibility: hidden; display: none; } .label { cursor: pointer; width: 35px; height: 20px; background: grey; display: block; border-radius: 100px; position: absolute; bottom: 0;top: 0; margin: auto; right: 0; } .label:after { content: ''; position: absolute; top: 0px; bottom: 0px; left: 5px; width: 12px; height: 12px; background: #fff; border-radius: 90px; transition: 0.3s; margin: auto; } input:checked + .label { background: #ffffff; } input:checked + .label:after { background: #000000; left: calc(100% - 5px); transform: translateX(-100%); } .label:active:after { width: 130px; } .btn.expander { min-width: 100%; } .btn .checkbox { min-width: 45px; flex: 1; position: relative; } .op-0 { display: none; } .btn.center { justify-content: center !important; align-items: center !important; } .btn.disable { opacity: 0.5 !important; pointer-events: none !important; } [data-action="31"] { transition: all 0.2s; } .exp .btn { min-width: 100%; } .exp2 [data-action="58"] { justify-content: center; align-items: center; display: flex; padding: 10px; max-width: none; width: auto; min-width: 70px; height: 35px; font-size: 15px; } .exp2 { justify-content: center; align-items: center; overflow: hidden; } .exp2 .btn:first-of-type { flex: 1; max-width: -webkit-fill-available; text-align: left; justify-content: left !important; align-items: start !important; }  [data-action="25"] .pr { width: 20px; height: 20px; margin: auto; right: 20px; } .float { position: fixed !important; z-index: 100; bottom: 15px; right: 15px; } .float.big img { position: absolute; width: 35px; } .float.big { width: 50px !important; height: 50px !important; -webkit-box-shadow: 0px 0px 79px 31px rgba(0,0,0,0.75); -moz-box-shadow: 0px 0px 79px 31px rgba(0,0,0,0.75); box-shadow: 0px 0px 79px 31px rgba(0,0,0,0.75); }  .remove-margins, .remove-margins .alert-area > section { margin-top: 0px !important; } .bg-borded-darken { border: 1px solid #555555; transition: all 0.2s ease-in-out; } .bg-borded-darken.active { background: #ffffff; color: #000000; border: 1px solid #ffffff; }</style>
        `);
    }
    injectChildShower();
};
const injectChildRequestHtml = (type, data) => {
    switch(type) {
        case injectChildV.cardButtons: {
            const playlist = playlistStore?.getList[0] ?? {};
            const episodeNextEnable = playlist?.enableNext ?? false;
            const episodeNextTitle = playlist?.title ?? "";
            injectChildIsLive = playlist?.isLive ?? false;
            const episodeNextServers = (parseJSON(playlist?.servers ?? "W10=") ?? []).filter(url => !(url.includes("embed.warez") || (injectChildIsLive && (url.includes("filemoon") || url.includes("morgan")))));
            const optionsSelectorHtml = data ?? "";
            const playerSelectorHtml = (injectChildIsArray(episodeNextServers) && episodeNextServers.length > 1) ? `<select class="selector">
                ${episodeNextServers.map((url, index) => `<option data-index="${index}" data-url="${url}" ${injectChildUrlCompare(url) ? `selected="selected"` : ``}>${injectChildCapitalize(`Opção ${index+1}`.toLowerCase())}</option>`).join("")}
            </select>` : ``;

            return `<div class="cast-buttons">
                <div>
                    <section>
                        ${optionsSelectorHtml !== "" ? optionsSelectorHtml : playerSelectorHtml !== "" ? playerSelectorHtml : ""}
                        <button onclick="injectChildZoomIn();"><img src="https://i.ibb.co/svqy7V4/positive.png" border="0"></button>
                        <button onclick="injectChildZoomOut();"><img src="https://i.ibb.co/QHN4tNP/negative.png" border="0"></button>
                        <button onclick="injectChildReload();"><img src="https://i.ibb.co/f2zD2y0/reload.png" border="0"></button>
                        ${episodeNextEnable ? `<button class="text" onclick="injectChildNextEpisode();"><span>${injectChildIsLive ? "Proximo" : episodeNextTitle}</span><img src="https://i.ibb.co/6B9rg4K/next.png" border="0"></button>` : ``}
                        <button onclick="injectChildToggleOptions();" class="closer"><img src="https://i.ibb.co/f2n3T2f/close-White.png" border="0"></button>
                    </section>
                </div>
            </div>`;
        }
        case injectChildV.cardSelector: {
            const optionsSelectorHtml = (injectChildIsArray(data) && data.length > 1) ? data.map(data => {
                return `<option data-index="${data.index}" data-classname="${data.className}">${injectChildCapitalize(data.title.toLowerCase())}</option>`;
            }).join("") : ``;

            return optionsSelectorHtml !== "" ? `<select class="selector">
                ${optionsSelectorHtml}
            </select>` : ``;
        }
    };
};
const injectChildOnError = () => {
    const onError = () => {
        const playlist = playlistStore?.getList[0] ?? {};
        injectChildIsLive = playlist?.isLive ?? false;

        if(injectChildIsLive) injectChildNextEpisode();
        else {
            $("body").html(`
                <style> 
                    a, iframe, *:not(.alerter, .cast-buttons), {
                        pointer-events: none !important;
                        display: none !important;
                        opacity: 0 !important;
                    }
                    .alerter {
                        color: #ffffff;
                        background: #000000;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        height: 100%;
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }  
                    .container-options {
                        width: auto !important;
                    }
                    *:focus {
                        outline: none;
                    } 
                    .frameEmbed  {
                        display: block !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 1000000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                        pointer-events: all !important;
                        opacity: 1 !important;
                    }
                    
                </style>
                ${injectChildDecodeURIFormat(`<div class="alerter"><center>O vídeo que você esta tentando assistir foi deletado,<br>volte e escolha outra opção de player.</center></div>`)}
            `).ready(function() { injectChildShower(); });
        }
    };

    const i = setInterval(() => {
        if($(".cast-buttons")[0]) {
            clearInterval(i);

            if($(".selector")[0]) {
                const selectedPos = $('.selector').find(":selected").index();
                const selectedNextElem = $('.selector option').eq(selectedPos+1);

                if(selectedNextElem[0]) injectChildLoadLink(selectedNextElem.attr('data-url'));
                else onError();
            }
            else onError();
        }
    }, 0);
    injectChildShower(false, true);
    
};
const injectChildOnVideo = (link = "", subs = "") => {
    if(link !== "") {
        if(subs !== "") {
            $("body").html(`<style>
                    body { 
                        background: #000000; 
                    } 
                    html *, body * {
                        pointer-events: none !important;
                        visibility: hidden !important;
                    }
                    #vv, #vv *, .cast-buttons, .cast-buttons * {
                        pointer-events: all !important;
                        visibility: visible !important;
                    }
                    #vv { 
                        position: fixed; 
                        width: 100%;
                        height: 100%; 
                        background: #000000;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                    }
                </style>
                <video id="vv" autoplay controls preload="metadata" crossorigin="anonymous" controlsList="nodownload noremoteplayback">
                    <source src="${link}" type="video/mp4" crossorigin="anonymous" />
                    <track src="${subs.replace(".srt", ".vtt")}" kind="subtitles" crossorigin="anonymous" srclang="pt" label="Português" default />
                </video>`).ready(function() { 
                injectChildShower();
                injectChildVideoFlag();
            });
        }
        else {
            $("body").html(`<style>
                    body { 
                        background: #000000;
                    }  
                    html *, body * {
                        pointer-events: none !important;
                        visibility: hidden !important;
                    }
                    #vv, #vv *, .cast-buttons, .cast-buttons * {
                        pointer-events: all !important;
                        visibility: visible !important;
                    }
                    video { 
                        position: fixed; 
                        width: 100%; 
                        height: 100%; 
                        background: #000000; 
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                    }
                </style>
                <video id="vv" src="${link}" autoplay controls controlsList="nodownload noremoteplayback"></video>`).ready(function() { 
                injectChildShower();
                injectChildVideoFlag();
            });
        }
    }
    else injectChildOnError();
};
const injectChildTestLink = (link = "") => {
    if(link !== "" && injectChildRetrys <= 5) {
        const video = document.createElement("video");
        video.setAttribute("src", link);
        video.addEventListener("canplay", () => {
            sessionStorage.setItem("down-"+window.location.href, link);
            injectChildOnVideo(link);
            $(video).remove();
        });
        video.addEventListener("error", () => {
            sessionStorage.removeItem("down-"+window.location.href);
            injectChildReload();
        });
    }
    else {
        injectChildOnError();
        sessionStorage.removeItem("tests");
    }
};
const injectChildV = {
    cardAlertPlay: 0,
    cardButtons: 2,
    cardSelector: 3,

    vizer: 0,
    multicanais: 1,
    futemax: 2,
    cinemao: 3,
    mixdrop: 4,
    supertvaovivo: 5,
    futemais: 6,
    canaisplay: 7
};
const injectChildDomainServers = [
    {
        domain: ['192', 'vizer'],
        fun: () => {},
        videoFun: (url) => {}
    },
    {
        domain: ['embedplayer'],
        fun: () => {
            injectChildValidater(['player_screen', 'loader', 'video'], () => {
                $('body').prepend(`<style>
                    a {
                        pointer-events: none !important;
                        display: none !important;
                    }
                    .changeOptions, iframe {
                        display: none !important;
                    }
                    .player_container * {
                        display: block !important;
                    }
                    .changeOptions {
                        opacity: 0 !important;
                        display: none !important;
                    }
                </style>`);
                if($(".player_screen")[0]) {
                    let limit = 0;
                    const i = setInterval(() => {
                        if(limit > 100) {
                            injectChildOnError();
                            clearInterval(i);
                        }
                        else if(!$(".infra iframe")[0]) $(".player_select_item").first().trigger('click');
                        else {
                            const link = $(".infra iframe").attr("src") ?? "";

                            if(link !== "") {
                                if(injectChildUrlCompare(link)) injectChildLoadLink($(".infra iframe").attr("src"));
                                else injectChildShower();
                            }
                            else injectChildOnError(); 
                            clearInterval(i);
                        }
                        limit = limit+1;
                    }, 1000);
                }
                else injectChildShower();
            }, true);
        },
        videoFun: (url) => {}
    },
    {
        domain: ['redecanais'],
        fun: () => {
            injectChildShower();
            injectChildValidater(['crossorigin'], () => {
                const onError = () => {
                    $("body").show();
                    injectChildOnError();
                };
                const isChannel = window.location.href.includes("canal");
                const isDownload = window.location.href.includes("download");
                const i = setInterval(() => {
                    if(isDownload) {
                        const url = $("body")?.prop("outerHTML")?.split('window.open("//')[1]?.split('"')[0] ?? "";

                        if(url !== "") {
                            injectChildTestLink(`https://${url}`);
                            clearInterval(i);
                            isDone = true;
                        }
                    }
                    else if(!isChannel) {
                        const downloadButtonElem = $(".downloadButton");

                        if(downloadButtonElem[0]) {
                            window.location.href = downloadButtonElem.find("a").attr("href");
                            clearInterval(i);
                            isDone = true;
                        }
                    }
                    else {
                        injectChildShower();
                        clearInterval(i);
                        isDone = true;
                        // const videoElem = $("video");
                        // const url = videoElem.attr("src") ?? "";

                        // videoElem.allowFullscreen = false;
                        // videoElem.attr("controlsList", "nofullscreen");
                        // if(videoElem[0]) {
                        //     if(!isChannel && url !== "") {
                        //         videoElem[0].pause();
                        //         videoElem[0].removeAttribute('src');
                        //         videoElem[0].load();
                                
                        //         injectChildTestLink(`https://${window.location.hostname}${url}`);
                        //         clearInterval(i);
                        //         isDone = true;
                        //     }
                        //     else if(isChannel) {
                        //         injectChildShower();
                        //         clearInterval(i);
                        //         isDone = true;
                        //     }
                        // }
                    }
                }, 0);
                let isDone = false;

                //$("body").hide();
                onSubmit();
                //setTimeout(() => { if(!isDone) onError(); }, 30000);
            }, true);
        },
        videoFun: (url) => {}
    },
    {
        domain: ['supertvaovivo'],
        fun: () => {
            injectChildValidater(['iframe-player', 'player'], () => {
                $('body').append(`<style>
                    a {
                        pointer-events: none !important;
                        display: none !important;
                    }
                    iframe {
                        display: none !important;
                    }
                    #iframe-player iframe, #fr {
                        display: block !important;
                    }
                    #iframe-player, #iframe-player iframe, #player, #player > div {
                        display: flex !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 10000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                        border: 0;
                    }
                    #fp {
                        width: 100% !important;
                        height: 100% !important;
                        flex: 1 !important;
                        padding: 0px !important;
                        margin: 0px !important;
                    }
                    #options{
                        width: 100% !important;
                        display: none !important;
                    }
                    #aside-player {
                        display: none !important;
                    }
                    .container-player {
                        padding: 0px !important;
                        height: 100% !important;
                    }
                    .container-options {
                        width: auto !important;
                    }
                    *:focus {
                        outline: none;
                    }
                </style>`).ready(function() {
                    let json = "", isDone = false;

                    $('#opcoes-players button').click(function(elem){
                        setTimeout(() => {
                            const el = $(elem.target);
                            const url = $("#iframe-player iframe").attr("src");
                            let position = parseInt(el.index());
                            
                            if(url.includes("/player3/")) $(`#opcoes-players button:eq(${position+1})`).trigger('click');
                        }, 0);
                    });
                    
                    try {
                        json = JSON.parse(`[${($('body').prop('outerHTML')?.split("playersCanais([")[1]?.split("])")[0]).trim().replace(/(\r\n|\n|\r)/gm, "").replace(/[^\x20-\x7E]/gmi, "").replace(/\s/g,'').replace(/'/g,'"')}]`);

                        json.map((url, index) => {
                            if(url.includes("reidoscanais") || url.includes("/player3/")) {}
                            else if(!isDone) {
                                $(`#opcoes-players button:eq(${index})`).trigger('click');
                                isDone = true;
                            }
                        });
                        setTimeout(() => { if(!$("#iframe-player iframe")[0]) $("#opcoes-players button:eq(0)").trigger('click'); }, 0);
                    }
                    catch(err) {$("#opcoes-players button:eq(0)").trigger('click');}
                    injectChildShower(false, false, injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.supertvaovivo)));
                    window.onbeforeunload = function() {
                        return 'Are you sure you want to leave?';
                    };
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['reidoscanais'],
        fun: () => {
            injectChildValidater(['iframe'], () => injectChildShower());
        },
        videoFun: (url) => {}
    },
    {
        domain: ['embedcanaistv'],
        fun: () => {
            injectChildValidater(['player'], () => injectChildShower());
        },
        videoFun: (url) => {}
    },
    {
        domain: ['futemax'],
        fun: () => {
            injectChildValidater(['player'], () => {
                $('body').append(`<style>
                    a {
                        pointer-events: none !important;
                        display: none !important;
                    }
                    iframe {
                        display: none !important;
                    }
                    #player iframe, #fr {
                        display: block !important;
                    }
                    #player {
                        display: flex !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 10000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                    }
                    #fp {
                        width: 100% !important;
                        height: 100% !important;
                        flex: 1 !important;
                        padding: 0px !important;
                        margin: 0px !important;
                    }
                    #options{
                        width: 100% !important;
                        display: none !important;
                    }
                    #aside-player {
                        display: none !important;
                    }
                    .container-player {
                        padding: 0px !important;
                        height: 100% !important;
                    }
                    .container-options {
                        width: auto !important;
                    }
                    *:focus {
                        outline: none;
                    }
                </style>`).ready(function() {
                    injectChildShower(false, false, injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.futemax)));
                    // injectChildinterval = setInterval(() => {
                    //     if(injectChildUrl.includes(".m3u8")) clearInterval(injectChildinterval);
                    //     else $('#player-s').attr('src', function(i, val) { return val; });
                    // }, 5000);
                });
            });
        },
        videoFun: (url) => {
            if(url.includes(".m3u8")) injectChildUrl = url;
        }
    },
    {
        domain: ['futemais'],
        fun: () => {
            injectChildValidater(['player'], () => {
                $('body').append(`<style>
                    a {
                        pointer-events: none !important;
                        display: none !important;
                    }
                    iframe {
                        display: none !important;
                    }
                    #player iframe, #fr {
                        display: block !important;
                    }
                    #player {
                        display: flex !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 10000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                    }
                    #fp {
                        width: 100% !important;
                        height: 100% !important;
                        flex: 1 !important;
                        padding: 0px !important;
                        margin: 0px !important;
                    }
                    #options{
                        width: 100% !important;
                        display: none !important;
                    }
                    #aside-player {
                        display: none !important;
                    }
                    .container-player {
                        padding: 0px !important;
                        height: 100% !important;
                    }
                    .container-options {
                        width: auto !important;
                    }
                    *:focus {
                        outline: none;
                    }
                </style>`).ready(function() {
                    injectChildShower(false, false, injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.futemais)));
                    $("iframe").attr("src", $(".canais.wf a").eq(0).attr("href"));
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['canaisplay'],
        fun: () => {
            injectChildValidater(['player'], () => {
                $('body').append(`<style>
                    a {
                        pointer-events: none !important;
                        display: none !important;
                    }
                    iframe {
                        display: none !important;
                    }
                    #player iframe, #fr {
                        display: block !important;
                    }
                    #player {
                        display: flex !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 10000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                    }
                    #fp {
                        width: 100% !important;
                        height: 100% !important;
                        flex: 1 !important;
                        padding: 0px !important;
                        margin: 0px !important;
                    }
                    #options{
                        width: 100% !important;
                        display: none !important;
                    }
                    #aside-player {
                        display: none !important;
                    }
                    .container-player {
                        padding: 0px !important;
                        height: 100% !important;
                    }
                    .container-options {
                        width: auto !important;
                    }
                    *:focus {
                        outline: none;
                    }
                </style>`).ready(function() {
                    injectChildShower(false, false, injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.futemais)));
                    $("iframe").attr("src", $(".canais.wf a").eq(0).attr("href"));
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['multicanais'],
        fun: () => {
            injectChildValidater(['Player'], () => {
                $('.article-content').children().not('.Player, .links').remove();
                $('body').append(`<style>
                    .Player {
                        display: flex !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 10000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                    }
                    .Player {
                        width: 100% !important;
                        height: 100% !important;
                        flex: 1 !important;
                        padding: 0px !important;
                        margin: 0px !important;
                    }
                    .links {
                        width: 100% !important;
                        display: flex;
                        overflow: auto;

                    }
                    .links > * {
                        min-width: max-content;
                        height: max-content;
                    }
                    figure {
                        display: none !important;
                    }
                    .Player * {
                        display: block !important;
                        padding: 0px !important;
                        width: 100% !important;
                        height: 100% !important;
                    }
                    .wp-block-button {
                        display: none !important;
                    }
                    *:focus {
                        outline: none;
                    } 
                    html > *:not(body), body > * {
                        pointer-events: none !important;
                        visibility: hidden !important;
                        opacity: 0px !important;
                    }
                    body > *:not(.Player), body > *:not(.cast-buttons) {
                        pointer-events: all !important;
                        visibility: visible !important;
                        opacity: 1px !important;
                    }
                </style>`).ready(function() {
                    const u = $('body').prop('outerHTML') ?? "";

                    if(u.includes("canais.php")) {
                        $(".links a").each(function() {
                            const el = $(this);
                            const url = el.attr("data-id");
    
                            if(!url.includes("canais.php")) $('.links').append(el);
                        }).ready(function() {
                            const i = setInterval(() => {
                                if($(".Player iframe")[0]) clearInterval(i);
                                $(".links a")[0].click();
                            }, 0);
                        });
                    }
                    else {
                        const i = setInterval(() => {
                            if($(".Player iframe")[0]) clearInterval(i);
                            $(".links a")[0].click();
                        }, 0);
                    }
                    injectChildShower(false, false, injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.multicanais)));
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['embed.warezcdn'],
        fun: () => {
            injectChildExternal(window.location.href);
            // $(window.location.href.includes("#1") ? "server-selector:first-of-type" : "server-selector:last-of-type").trigger('click');
            // setTimeout(() => injectChildShower(), 20000);
        },
        videoFun: (url) => {
            //if(url.includes("basseqwevewcewcewecwcw.xyz/video/") || url.includes("mixdrop.ps/e/") || url.includes("mixdrop.ag/e/")) injectChildLoadLink(url);
        }
    },
    {
        domain: ['mixdrop'],
        fun: () => {
            const playerElem = $('.vjs-big-play-button');

            if(playerElem[0]) {
                const i = setInterval(() => {
                    const videoElem = $("video");
                    const link = videoElem.attr("src") ?? "";
                    const subs = injectChildGetParam("sub1") ?? "";

                    if(link !== "") {
                        videoElem[0].pause();
                        videoElem[0].removeAttribute('src');
                        videoElem[0].load();

                        setTimeout(() => injectChildOnVideo(link, subs), 1000);
                        clearInterval(i);
                    }
                    else playerElem.trigger('click');
                }, 0);
            }
            else injectChildOnError();
        },
        videoFun: (url) => {}
    },
    {
        domain: ['watchadsontape', 'streamtape'],
        fun: () => {
            const link = sessionStorage.getItem("down-"+window.location.href) ?? "";

            if(link !== "") injectChildTestLink(link);
            else {
                setInterval(() => $("a, iframe").remove(), 0);
                const link = $("#ideoolink").text() ?? "";
    
                if(link !== "") {
                    const params = {
                        id: injectChildGetParam("id", link),
                        expires: injectChildGetParam("expires", link),
                        ip: injectChildGetParam("ip", link),
                        token: injectChildGetParam("token", link)
                    };
    
                    injectChildTestLink(`/get_video?id=${params.id}&expires=${params.expires}&ip=${params.ip}&token=${params.token}`);
                }
                else injectChildOnError();
            }
        },
        videoFun: (url) => {}
    },
    {
        domain: ['filemoon', 'morgan'],
        fun: () => {
            let u = window.location.href.replace("https://", "");
            u = u?.substring(u?.indexOf("/"))?.replace("/e/", "/download/")?.replace("/d/", "/download/") ?? "";
            const link = sessionStorage.getItem("down-"+window.location.href) ?? "";

            if(link !== "") injectChildTestLink(link);
            else {
                if(window.location.href.includes("/download/")) {
                    if($("form")[0]) {
                        $(".download-heading").html(`Para continuar verifique se voce e um robo abaixo.`);
                        $(".download-image").remove();
                        $(".download, body").css("background", "#000000");
                        injectChildShower(true);
                    }
                    else if($(".download2 a")[0]) injectChildTestLink($(".download2 a").attr("href") ?? "");
                    else injectChildOnError();
                }
                else injectChildLoadLink((u !== "") ? `https://filemoon.sx${u}` : window.location.href.replace("/e/", "/download/"));
            }
        },
        videoFun: (url) => {}
    },
    {
        domain: ['superflixapi'],
        fun: () => {
            injectChildValidater(['player_screen'], () => {
                let limit = 0;
                const run = () => {
                    const i = setInterval(() => {
                        const warezcdnLink = $("iframe").attr("src") ?? "";
    
                        if(warezcdnLink !== "" && warezcdnLink.includes("embed.warez")) {
                            injectChildExternal(warezcdnLink);
                            clearInterval(i);
                        }
                        if($("#movie_iframe")[0]) {
                            injectChildShower();
                            clearInterval(i);
                        }
                        else if(limit > 100) {
                            injectChildOnError();
                            clearInterval(i);
                        }
                        else if(!$(".infra iframe")[0]) $(".player_select_item").first().trigger('click');
                        else {
                            injectChildShower();
                            clearInterval(i);
                        }
                        limit = limit+1;
                    }, 1000);
                };

                if($("season-list-selector")[0]) {
                    try {
                        const url = window.location.href.split('/');
                        const season = parseInt(url[5])-1;
                        const episode = parseInt(url[6])-1;
                        const seElem = $(`.episodes-of-season`).eq(season).find(`episode-item`).eq(episode);
                        const frameElem = $('.players_select_container');
                        const observer = new MutationObserver(entries => {
                            if($(".select_languages")[0]) {
                                run();
                                observer.disconnect();
                            }
                        });
                        observer.observe(frameElem[0], { attributes: true, childList: true, characterData: true });
    
                        if($(".select_languages")[0]) run();
                        else seElem[0].click();
                    } catch (err) { run(); }
                }
                else run();
                
                setInterval(() => $(".embedder_especial, .sflix_space, a, .changeOptions, .embedder_info, playeroptions-show-button").hide(), 0);
            }, true);
        },
        videoFun: (url) => {}
    },
    {
        domain: ['embedder'],
        fun: () => {
            injectChildValidater(['servers'], () => {
                setInterval(() => $(".title, .dropdown, .toggle-top-bar").remove(), 0);
                $(".play-btn")[0].click();
                injectChildShower();
            }, true);
        },
        videoFun: (url) => {}
    },
    {
        domain: ['youtube'],
        fun: () => {
            injectChildValidater(['yt-icon-shape'], () => {
                if(window.location.href.includes("/streams")) {
                    $('body').append(`<style>
                        #primary, ytm-tab-renderer {
                            position: fixed;
                            width: -webkit-fill-available;
                            height: -webkit-fill-available;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            z-index: 11111;
                            overflow: auto;
                            background: #0f0f0f;
                            padding: 20px;
                        }
                        ytm-bottom-sheet-renderer, #header-bar, ytm-single-column-watch-next-results-renderer {
                            display: none;
                        }
                        ytm-rich-item-renderer  {
                            width: calc(100% / 2 - 16px) !important;
                        }
                        body {
                            overflow: hidden;
                        }
                        video {
                            position: fixed !important;
                            width: -webkit-fill-available !important;
                            height: -webkit-fill-available !important;
                            top: 0 !important;
                            bottom: 0 !important;
                            left: 0 !important;
                            right: 0 !important;
                        }
                        #player {
                            background: #0f0f0f;
                            position: fixed !important;
                            width: -webkit-fill-available;
                            height: -webkit-fill-available;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            z-index: 11111;
                        }
                        .player-size {
                            position: fixed !important;
                            width: -webkit-fill-available !important;
                            height: -webkit-fill-available !important;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: black;
                        }
                    </style>`).ready(function() {
                        injectChildShower(true);
                    });
                }
                else {
                    $('body').append(`<style>
                        video {
                            position: fixed !important;
                            width: -webkit-fill-available !important;
                            height: -webkit-fill-available !important;
                        }
                        #player {
                            background: #0f0f0f;
                            position: fixed !important;
                            width: -webkit-fill-available;
                            height: -webkit-fill-available;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            z-index: 11111;
                        }
                        body {
                            overflow: hidden;
                        }
                    </style>`).ready(function() {
                        injectChildShower();
                    });
                }
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['crazygames', 'games'],
        fun: () => {
            $('body').append(`<style>
                #gfMainContainer {
                    display: block !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                }
                .css-fv8xxn {
                    display: none !important;
                }
            </style>`).ready(function() {
                const i = setInterval(() => {
                    if($(`button:contains("Continue offline")`)[0]) {
                        $(`button:contains("Continue offline")`).trigger("click");
                        clearInterval(i);
                    }
                }, 0);
                injectChildShower(true);
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['cxtv'],
        fun: () => {
            injectChildValidater(['video'], () => {
                $('body').append(`<style>
                    .video {
                        display: flex !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 10000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                        border: 0;
                    } 
                    .video video {
                        position: fixed !important;
                        display: flex !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                        border: 0;
                    }
                    *:focus {
                        outline: none;
                    }
                </style>`).ready(function() {
                    injectChildShower();
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['file'],
        fun: () => {},
        videoFun: (url) => {}
    },
    {
        domain: ['netcine'],
        fun: () => {
            const u = window.location.origin + "/" + window.location.href.split("/wp-json/")[1];

            fetch(u, { cache: "force-cache" })
            .then(async response => await response.text())
            .then(async response => {
                const elem = $(response);
                let url = elem.find(".btn").first().attr("href") ?? elem.find("#content a").first().attr("href") ?? elem.find(".itens a").first().attr("onclick") ?? "";
                url = ((url === "") ? u : url).replace("location.href='", "").replace("';", "");

                injectChildValidater(['body'], () => {
                    $('body').append(`<style>
                        a {
                            pointer-events: none !important;
                            display: none !important;
                        }
                        iframe, video {
                            display: block !important;
                        }
                        iframe, video {
                            display: flex !important;
                            flex-direction: column !important;
                            position: fixed !important;
                            width: -webkit-fill-available !important;
                            height: -webkit-fill-available !important;
                            top: 0 !important;
                            bottom: 0 !important;
                            left: 0 !important;
                            right: 0 !important;
                            z-index: 10000000000 !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            background: #000000;
                            border: 0;
                        }
                        #fp {
                            width: 100% !important;
                            height: 100% !important;
                            flex: 1 !important;
                            padding: 0px !important;
                            margin: 0px !important;
                        }
                        #options{
                            width: 100% !important;
                            display: none !important;
                        }
                        #aside-player {
                            display: none !important;
                        }
                        .container-player {
                            padding: 0px !important;
                            height: 100% !important;
                        }
                        .container-options {
                            width: auto !important;
                        }
                        *:focus {
                            outline: none;
                        }
                    </style>`).ready(function() {
                        fetch(url, { cache: "force-cache" })
                        .then(async response => await response.text())
                        .then(async response => {
                            try {
                                if(response.includes("<iframe")) injectChildLoadLink($(`<iframe${response.split('<iframe')[1].split("</iframe>")[0]}</iframe>`).attr("src"));
                                else if(response.includes("<video")) injectChildTestLink($(`<video autoplay${response.split('<video')[1].split("</video>")[0]}</video>`).find("source").attr("src") ?? "");
                                else injectChildOnError();
                            } catch (err) { injectChildOnError(); }
                        })
                        .catch(err => injectChildOnError());
                    });
                });
            })
            .catch(err => injectChildOnError());
        },
        videoFun: (url) => {}
    },
    {
        domain: ['embehub'],
        fun: () => {
            injectChildValidater(['live-player'], () => {
                let isDone = false;
                const checkVideo = setInterval(() => {
                    if($("[playsinline]")[0]) {
                        $("[data-volume]").trigger('click');
                        $("[playsinline]").volume = 1.0;
                        $("[playsinline]").prop('muted', false);
                        $("[playsinline]").attr("muted", "false");
                        $("[playsinline]").on('play', function () {
                            if(!isDone) {
                                $("[data-volume]").trigger('click');
                                $("[playsinline]").volume = 1.0;
                                $("[playsinline]").prop('muted', false);
                                isDone = true;
                            }
                        });
                        clearInterval(checkVideo);
                    }
                }, 0);
                injectChildShower();
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['adult-tv-channels'],
        fun: () => {
            injectChildValidater(['make-iframe-responsive'], () => {
                $('body').append(`<style>
                    iframe {
                        display: flex !important;
                        flex-direction: column !important;
                        position: fixed !important;
                        width: -webkit-fill-available !important;
                        height: -webkit-fill-available !important;
                        top: 0 !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        z-index: 10000000000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #000000;
                        border: 0;
                    }
                    *:focus {
                        outline: none;
                    }
                </style>`).ready(function() {
                    injectChildShower();
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['all'],
        fun: () => injectChildShower(),
        videoFun: (url) => {}
    }
];
let playlistStore = null, lastViewedSeriesStore = null, lastViewedMoviesStore = null, injectChildIsLive = false, limitRetrys = 0;

if(!(window.location.protocol.includes("file:") || window.location.href.includes("marketplaceweb"))) {
    injectChildScript.src = window.location.protocol.replace('file:', 'https:') + ((injectBaseUrl.includes("zbigz") || window.location.href.includes("file:")) ? ('//zbigz.in/gh/cdnuhd/cdn/jquery.js?'+(Math.random() + 1).toString(36).substring(7)) : '//cdn.jsdelivr.net/gh/cdnuhd/cdn/jquery.js');
    injectChildScript.addEventListener('load', injectChildInit);
    document.head.appendChild(injectChildScript);
}
function injectChildInit() {
    injectChildStore().then(() => {
        try {
            const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];
            
            if(window.wv && (window.location.href.includes("embed.warez"))) injectChildExternal(window.location.href);
            else {
                if(injectChildObjCheck(data)) data.fun();
                else injectChildDomainServers[injectChildDomainServers.length-1].fun();
            }
            $(document).on('change','.selector',function(){
                const index = $(this).find("option:selected").attr("data-index");
                const className = $(this).find("option:selected").attr("data-classname");
                const isUrl = ($(this).find("option:selected").attr("data-url") ?? "") !== "";
    
                if(isUrl) {
                    if(window.wv) {
                        window.wv.finishActivity();
                        window.wv.openEmbed($(this).find("option:selected").attr("data-url"), false);
                    }
                    else injectChildLoadLink($(this).find("option:selected").attr("data-url"));
                }
                else {
                    if(window.location.href.includes("mixdrop")) {
                        const frameElem = $(".frameEmbed");
        
                        $(".player").remove();
                        if(frameElem[0]) {
                            frameElem.replaceWith(`<iframe src="${index === "0" ? window.location.href : ("https://embed.warezcdn.link/video/" + injectChildGetParam("id"))}" class="frameEmbed" oncontextmenu="return false;" width="100%" height="100%" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>`);
                        } 
                        else {
                            $("body").prepend(`<iframe src="${index === "0" ? window.location.href : ("https://embed.warezcdn.link/video/" + injectChildGetParam("id"))}" class="frameEmbed" oncontextmenu="return false;" width="100%" height="100%" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>`);
                        }
                    }
                    if(window.location.href.includes("futemais")) $("iframe").attr("src", $(className).eq(index).attr("href"));
                    else $(className)[index].click();
                }
            });
            console.log('success');
        } catch (err) {
            if(window.wv) window.wv.loadErrorLink(window.location.href); 
            console.log(err);
        }
    });
}
function injectChildObjCheck(obj) {
    try {
        return Object.keys(obj).length !== 0;
    }catch (err) {}
    return false;
}
function injectChildValidater(list, onReturn, isVideo = false) {
    const html = $("html").prop("outerHTML") ?? "";
    const attr = list?.filter(attr => html.includes(attr))[0] ?? list[0] ?? "";
    const onError = () => {
        if(isVideo) injectChildOnError();
        else {
            if(window.wv) window.wv.loadErrorLink(window.location.href);
            else console.log("error");
        }
    };

    if(attr !== "") {
        console.log('success');
        onReturn();
    }
    else if(window.wv && limitRetrys <= 1) {
        const term = attr ?? "";
        const playlist = playlistStore?.getList[0] ?? {};
        let link = (parseJSON(playlist?.servers ?? "W10=") ?? []).filter(url => !(url.includes("embed.warez"))).filter(url => injectChildUrlCompare(url))[0] ?? "";

        if(link !== "") {
            link = `https://${window.location.hostname}${link.replace("https://", "").substring(link.replace("https://", "").indexOf("/"))}`;
            const itemRequestSettings = {
                method: 0,
                url: link,
                params: '',
                validator: term
            };
            const url = `https://marketplaceweb.online/req.php?data=${btoa(encodeURIComponent(JSON.stringify(itemRequestSettings)))}`;
            fetch(url, { cache: "force-cache" })
            .then(async response => await response.text())
            .then(async response => {
                const isDone = response.includes(term) ?? false;
                    
                if(isDone) { 
                    document.querySelector('html').innerHTML = `${response}`;
                    injectChildInit();
                }
                else onError();
                limitRetrys++;
            })
            .catch(err => onError());
        }
        else onError();
    }
    else onError();
}
function injectChildShower(isGame = false, isHide = false, html = "") {
    $("body").show();
    if(window.wv && !isHide) window.wv.show();
    if(!isGame) {
        if(!$(".cast-buttons")[0]) {
            $("body").append(`<meta name="viewport" 
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            <style>
                .cast-buttons {
                    position: fixed !important;
                    z-index: 1000000000000 !important;
                    margin: 10px 20px !important;
                    transition: all cubic-bezier(.4,0,.2,1) 0.15s !important;
                    right: -100% !important;
                    top: 0 !important;
                }
                .cast-buttons > div {
                    overflow: hidden !important;
                    background: #333333 !important;
                    border-radius: 100px !important;
                    position: relative !important;
                    transition: all cubic-bezier(.4,0,.2,1) 0.25s !important;
                }
                .cast-buttons.active {
                    right: 0 !important;
                }
                .cast-buttons section {
                    positon: relative !important;
                    overflow: hidden !important;
                    display: flex !important;
                    padding: 8px !important;
                    gap: 10px !important;
                }
                .cast-buttons button.text {
                    color: #ffffff !important;
                    width: auto !important;
                    font-weight: bold !important;
                    padding-left: 15px !important;
                    padding-right: 15px !important;
                }
                .cast-buttons button.text img  {
                    width: 15px !important;
                    height: 15px !important;
                    margin-left: 5px !important;
                }
                .cast-buttons button {
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    width: 40px !important;
                    height: 40px !important;
                    background: #595959 !important;
                    border: 0px !important;
                    border-radius: 100px !important;
                    padding: 10px !important;
                }
                .cast-buttons button img {
                    width: 100% !important;
                    height: auto !important;
                }
                .cast-buttons {
                    max-width: 500px !important;
                }
                .cast-buttons.hideControls > div {
                    opacity: 0.2 !important;
                    max-width: 56px !important;
                }
                .cast-buttons.hideControls .closer {
                    transform: rotate(45deg) !important;
                }
                .cast-buttons > div > section > *:not(.closer) {
                    transition: all ease-in-out 0.05s !important;
                }
                .cast-buttons > div > section {
                    position: absolute !important;
                    right: 0 !important;
                }
                body, html {
                    overflow: hidden !important;
                }
                .selector {
                    width: max-content !important;
                    height: 40px !important;
                    background-image: url(https://i.ibb.co/bbn7P9r/expand-arrow.png) !important;
                    background-repeat: no-repeat !important;
                    background-position: center right !important;
                    background-position-x: 85% !important;
                    background-size: 15px !important;
                    position: relative !important;
                    z-index: 10000000001 !important;
                    top: 0 !important;
                    margin: 0px !important;
                    background-color: #595959 !important;
                    border: 0px #cccccc solid !important;
                    border-radius: 50px !important;
                    color: #ffffff !important;
                    font-weight: bold !important;
                    font-size: 15px !important;
                    -webkit-appearance: none !important;
                    -moz-appearance: none !important;
                    text-indent: 1px !important;
                    text-overflow: '' !important;
                    padding: 10px 45px 10px 25px !important;
                    max-width: 150px !important;
                    overflow: hidden !important;
                    white-space: nowrap !important;
                    text-overflow: ellipsis !important;
                }
                *:focus {
                    cursor: default !important;
                    -webkit-touch-callout: none !important;
                    -webkit-user-select: none !important;
                    -khtml-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                    user-select: none !important;
                    outline: none !important;
                }
                * {
                    cursor: default !important;
                    -webkit-touch-callout: none !important;
                    -webkit-user-select: none !important;
                    -khtml-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                    user-select: none !important;
                    outline: none !important;
                    
                }
                .hideControls > div > section > *:not(.closer) {
                    visibility: hidden !important;
                }
                .closer { 
                    transition: all ease-in-out 0.3s !important;
                }
            </style>`);
            $("body").append(injectChildRequestHtml(injectChildV.cardButtons, html)).ready(function() {
                const buttonsElem = $(".cast-buttons");
                const i = setTimeout(() => { if(!buttonsElem.hasClass("hideControls")) injectChildToggleOptions(); }, 10000);

                buttonsElem.find("div").first().css({ maxWidth: buttonsElem.find("section").first().outerWidth(), width: buttonsElem.find("section").first().outerWidth(), height: buttonsElem.find("section").first().outerHeight() });
                setTimeout(() => buttonsElem.addClass("active"), 0);
                $(".cast-buttons *").click(function(e) { clearTimeout(i); });
            });
        }
        $(document).on('click', 'a', false);
        setInterval(() => $("a").css({pointerEvents: "none", display: "none"}), 0);
    }
}
function injectPlayerList(type) {
    switch(type) {
        case injectChildV.vizer: {
            const array = [];
            $(".hostLister .buttonLoadHost").each(function(index, elem) {
                const item = {};
                elem = $(elem);

                item.title = elem.find(".t").text() ?? `Opção ${index}`;
                item.index = index;
                item.className= ".hostLister .buttonLoadHost";
                array.push(item);
            });
            return array;
        }
        case injectChildV.multicanais: {
            const array = [];
            $(".wp-block-button a").each(function(index, elem) {
                const item = {};
                elem = $(elem);

                item.title = elem.text() ?? `Opção ${index}`;
                item.index = index;
                item.className= ".wp-block-button a";
                array.push(item);
            });
            return array;
        }
        case injectChildV.futemax: {
            const array = [];
            $(".container-options button").each(function(index, elem) {
                const item = {};
                elem = $(elem);

                item.title = elem.text() ?? `Opção ${index}`;
                item.index = index;
                item.className= ".container-options button";
                array.push(item);
            });
            return array;
        }
        case injectChildV.cinemao: {
            const array = [];
            $(".dublado button, .legendado button").each(function(index, elem) {
                const item = {};
                elem = $(elem);

                item.title = elem.text() ?? `Opção ${index}`;
                item.index = index;
                item.className= ".dublado button, .legendado button";
                if(elem.attr("onclick") !== "voltar()") array.push(item);
            });
            array.reverse();
            return array;
        }
        case injectChildV.mixdrop: {
            const array = [];

            array.push({
                title: "Opção principal",
                index: 0,
                className: ".warezcdn .op1"
            });
            array.push({
                title: "Opção opcional",
                index: 1,
                className: ".warezcdn .op2"
            });
            return array;
        }
        case injectChildV.supertvaovivo: {
            const array = [];
            $("#opcoes-players button").each(function(index, elem) {
                const item = {};
                elem = $(elem);

                item.title = elem.text() ?? `Opção ${index}`;
                item.index = index;
                item.className= "#opcoes-players button";
                array.push(item);
            });
            return array;
        }
        case injectChildV.futemais: {
            const array = [];
            $(".canais.wf a").each(function(index, elem) {
                const item = {};
                elem = $(elem);

                item.title = `Opção ${index+1}`;
                item.index = index;
                item.className= ".canais.wf a";
                array.push(item);
            });
            return array;
        }
    }
}
function injectChildToggleOptions() {
    $(".cast-buttons").toggleClass("hideControls");
}
function injectChildZoomIn (event) {
    if($('iframe, video').css("scale") === "none") $('iframe, video').css("scale", "1");
    $('iframe, video').animate({ 'scale': injectCurrentZoom += .1 }, 'slow');
}
function injectChildZoomOut (event) {
    if($('iframe, video').css("scale") === "none") $('iframe, video').css("scale", "1");
    $('iframe, video').animate({ 'scale': injectCurrentZoom -= .1 }, 'slow');
}
function injectChildReload() {
    if(window.wv) {
        const playlist = playlistStore?.getList[0] ?? {};
        let link = (parseJSON(playlist?.servers ?? "W10=") ?? []).filter(url => !(url.includes("embed.warez"))).filter(url => injectChildUrlCompare(url))[0] ?? window.location.href;

        injectChildLoadLink(link);
    }
    else injectChildLoadLink(window.location.href);
    sessionStorage.setItem("tests", `${injectChildRetrys+1}`);
}
function injectChildCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function injectChildNextEpisode() {
    const run = () => {
        const playlist = playlistStore?.getList[0] ?? {};
        const itemId = injectChildParseJSON(playlist?.info ?? "e30=")?.itemId ?? "";
        const isValidId = !(itemId === "" || itemId === "tv");  
        const videoElem = $('#vv');
    
        if(videoElem[0]) videoElem.addClass("stoped").trigger('pause');
        if(!injectChildIsLive && isValidId) {
            const lastViewedItem = lastViewedSeriesStore?.getList?.filter(item => item.itemId === itemId)[0] ?? {};
            const title = playlist?.title ?? "";
    
            if(injectChildIsObject(lastViewedItem) && !injectChildIsObjectEmpty(lastViewedItem) && title !== "") {
                const titleActive = lastViewedItem?.lastViewed ?? "";
                const itemType = lastViewedItem.itemType ?? "";
                lastViewedItem.itemProgress = injectChildIsObject(lastViewedItem.itemProgress) ? lastViewedItem.itemProgress : {};
                
                if(videoElem[0]) {
                    const videoTime = videoElem[0].currentTime;
                    const videoDuration = videoElem[0].duration;

                    if(videoTime > 0 && videoDuration > 0) {
                        const videoProgress = Math.round(videoTime / videoDuration * 100);
                        if(itemType === "movie") lastViewedItem.itemProgress.movie = (videoProgress <= 0) ? 1 : videoProgress;
                        else if(titleActive !== "") lastViewedItem.itemProgress[titleActive] = (videoProgress <= 0) ? 1 : videoProgress;
                    }
                }
                lastViewedItem.lastViewed = title;
                
                lastViewedSeriesStore?.replaceItemData(lastViewedItem);
            }
        }
        injectChildLoadLink("file:///android_asset/pageDialog.html?dialogType=19");
    };
    const nextElem = $(`[onclick="injectChildNextEpisode();"]`);

    if((nextElem[0] && !nextElem.hasClass("active")) || !nextElem[0]) run();
}
async function injectChildStore() {
    return new Promise(async(resolve, reject) => {
        try { 
            playlistStore = await new StorageData("grM4ItkYFsGUgWWjKvm56HQSR4PNbZR3", true, 1); 
            lastViewedSeriesStore = await new StorageData("ry8aSaIVAMVmAM5mBvZo57cXxzrnXNHv", true);
            lastViewedMoviesStore = await new StorageData("v4RgPaO7t2y21oeznVqrlGIucUzDrXZU", true);
        }
        catch (err) {}
        resolve();
    });
}
function injectChildDecodeURIFormat(text) {
    try {
        return decodeURIComponent(escape(text ?? ''));
    } catch(err) {}
    return text;
}
function injectChildVideoFlag() {
    const onUpdate = (videoProgress = 0) => {
        const lastViewedItem = (itemStoreType === "movie" ? lastViewedMoviesStore : lastViewedSeriesStore)?.getList?.filter(item => item.itemId === itemId)[0] ?? {};
        const itemType = lastViewedItem?.itemType ?? "";

        if(injectChildIsObject(lastViewedItem) && !injectChildIsObjectEmpty(lastViewedItem)) run(itemType, lastViewedItem, videoProgress);
    };
    const run = (itemType, lastViewedItem, videoProgress) => {
        lastViewedItem.itemProgress = injectChildIsObject(lastViewedItem.itemProgress) ? lastViewedItem.itemProgress : {};
        const titleActive = lastViewedItem?.lastViewed ?? "";

        if((itemType === "serie" && titleActive !== "")) {
            lastViewedItem.itemProgress[titleActive] = (videoProgress <= 0) ? 1 : videoProgress;

            lastViewedSeriesStore?.replaceItemData(lastViewedItem);
        }
        else if(itemType === "movie") {
            lastViewedItem.itemProgress.movie = (videoProgress <= 0) ? 1 : videoProgress;

            lastViewedMoviesStore?.replaceItemData(lastViewedItem);
        }
    };
    const playlist = playlistStore?.getList[0] ?? {};
    const itemId = injectChildParseJSON(playlist?.info ?? "e30=")?.itemId ?? "";
    const itemStoreType = injectChildParseJSON(playlist?.info ?? "e30=")?.itemType ?? "";
    const isValidId = !(itemId === "" || itemId === "tv");
    const episodeNextEnable = playlist?.enableNext ?? false;    
    const videoElem = $('#vv');
    let isReturned = false;
    const update = setInterval(() => {
        const castButtonsElem = $(".cast-buttons");
        const videoTime = videoElem[0].currentTime;
        const videoDuration = videoElem[0].duration;

        if($("#vv").hasClass("stoped")) clearInterval(update);
        else if(videoTime > 0 && videoDuration > 0) {
            const videoProgress = Math.round(videoTime / videoDuration * 100);
    
            if(videoProgress > 90 && castButtonsElem.hasClass("hideControls") && episodeNextEnable && !isReturned) {
                injectChildToggleOptions();
                isReturned = true;
            }
            if(!injectChildIsLive && isValidId) onUpdate(videoProgress);
        }
    }, 1000);

    videoElem.on('ended', function(){
        clearInterval(update);
        if(episodeNextEnable) injectChildNextEpisode(true);
    });
    if(!injectChildIsLive && isValidId) {
        const up = setInterval(() => {
            const videoTime = videoElem[0].currentTime;
            const videoDuration = videoElem[0].duration;

            if(videoTime > 0 && videoDuration > 0) {
                const lastViewedItem = (itemStoreType === "movie" ? lastViewedMoviesStore : lastViewedSeriesStore)?.getList?.filter(item => item.itemId === itemId)[0] ?? {};
                const itemProgress = (injectChildIsObject(lastViewedItem?.itemProgress) && !injectChildIsObjectEmpty(lastViewedItem?.itemProgress)) ? lastViewedItem.itemProgress : {};
                const titleActive = lastViewedItem?.lastViewed ?? "movie";
                const videoProgress = itemProgress[titleActive] ?? 0;
                const videoCurrentTime = (videoProgress !== 0) ? Math.round((videoDuration/100*videoProgress)) : 0;

                videoElem.attr('currentTime', (videoProgress >= 99) ? 0 : videoCurrentTime);
                videoElem[0].currentTime = (videoProgress >= 99) ? 0 : videoCurrentTime;
                clearInterval(up);
            }
        }, 0);
    }
}
function injectChildIsArray(value) {
    try {
        if (value instanceof Array) return true;
    }catch(err) {logs(err);}
    return false;
}
function injectChildIsObject(value) {
    try {
        return value.constructor.name === "Object";
    }catch(err) {}
    return false;
}
function injectChildIsObjectEmpty(objectName) {
    try {
        return Object.keys(objectName).length === 0;
    } catch (err) {}
    return true;
}
function injectChildIsBase64(str) {
    try {
        if (str ==='' || str.trim() ===''){ return false; }
        return btoa(atob(str)) == str;
    } catch (err) {}
    return false;
}
function injectChildGetDomainName(hostName) {
    return (hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1).split(".")[0]).replace("https://", "");
}
function injectChildLoadLink(url) {
    if(window.wv) {
        window.wv.hide();
        window.wv.loadLink(url);
    }
    else window.location.href = url;
}
function injectChildUrlCompare(url) {
    try {
        if(url.includes("superflixapi") || url.includes("embedder") || url.includes("embedplayer")) return url.includes(injectChildGetDomainName(window.location.href));
        else {
            const u = [
                url?.replace("https://", "")?.substring(url?.replace("https://", "")?.indexOf("/")) ?? "",
                injectChildLastPath(window.location.href)
            ];
    
            if(u[0] !== "" && u[1] !== "") return u[0].includes(u[1]);
            return url.includes(injectChildGetDomainName(window.location.href));
        }
    } catch (err) {}
    return false;
}
function injectChildShowHtml() {
    $("body").prepend(`<textarea style="position: fixed; z-index: 1000000;">${$('body, html').prop('outerHTML')}</textarea>`);
}
function injectChildOpenExternal(url) {
    if(window.wv) window.wv.openLink(url);
}
function injectChildParseJSON(str) {
    try {
        if(injectChildIsArray(str) || injectChildIsObject(str)) return str;
        else if(injectChildIsBase64(str)) return JSON.parse(decodeURIComponent(atob(str))); 
        return JSON.parse(decodeURIComponent(str));
    } catch (err) {}
    return null;
}
function injectChildIsBoolean(variable) {
    try {
        return (typeof variable == "boolean") 
    } catch (err) {}
    return false;
}
function injectChildToArray(arr) {
    try {
        return Object.keys(arr).map((key) => arr[key]);
    }
    catch(err) {}
    return [];
}
function injectChildGetDomain(url) {
    const host = new URL(url).host;
    const dots = host.split('.');
    return dots.at(-2).replace(/\d/g, '');
}
function injectChildLastPath(str) {
    try {
        const segments = new URL(str).pathname.split('/');
        
        return segments.pop() || segments.pop();
        
    } catch (err) {}
    return str;
}
function injectChildExitFullScreen() {
    const document = window.document;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
}
function putFile(url) {
    const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];
    if(injectChildObjCheck(data)) data.videoFun(url);
}
