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
const injectChildRequestHtml = (type, data) => {
    switch(type) {
        case injectChildV.cardButtons: {
            const host = window.location.href;
            const userSettings = userSettingsStore.getList[0] ?? {};
            const userNextEpisodeSettings = userSettings?.userNextEpisodeSettings ?? {};
            const episodeNextEnable = userNextEpisodeSettings?.enableNext ?? false;
            const episodeNextTitle = userNextEpisodeSettings?.title ?? "";
            injectChildIsLive = userNextEpisodeSettings?.isLive ?? false;
            const episodeNextServers = (parseJSON(userNextEpisodeSettings?.servers ?? "W10=") ?? []).filter(url => !url.includes("/player3/")).filter(url => !url.includes("mixdrop")).filter(url => !(injectChildIsLive && url.includes("filemoon")));
            const selectorHtml = (injectChildIsArray(episodeNextServers) && episodeNextServers.length > 1) ? `<select class="selector">
                ${episodeNextServers.map((url, index) => {
                    const h = injectChildGetRootUrl(url.replace(/^.*\/\/[^\/]+/, '')?.split("/").pop()?.split("?")[0]);

                    return `<option data-index="${index}" data-url="${url}" ${(host.includes(h)) ? `selected="selected"` : ``}>${injectChildCapitalize(`Opção ${index+1}`.toLowerCase())}</option>`;
                }).join("")}
            </select>` : ``;

            return `<div class="cast-buttons">
                <section>
                    ${selectorHtml}
                    <button onclick="injectChildZoomIn();"><img src="https://i.ibb.co/svqy7V4/positive.png" border="0"></button>
                    <button onclick="injectChildZoomOut();"><img src="https://i.ibb.co/QHN4tNP/negative.png" border="0"></button>
                    <button onclick="injectChildReload();"><img src="https://i.ibb.co/f2zD2y0/reload.png" border="0"></button>
                    <button onclick="injectChildCloseOptions();"><img src="https://i.ibb.co/f2n3T2f/close-White.png" border="0"></button>
                    ${episodeNextEnable ? `<button class="text" onclick="injectChildNextEpisode();"><span>${injectChildIsLive ? "Proximo" : episodeNextTitle}</span><img src="https://i.ibb.co/6B9rg4K/next.png" border="0"></button>` : ``}
                </section>
            </div>`;
        }
        case injectChildV.cardSelector: {
            return `<select class="selector">
                ${data.map(data => {
                    return `<option data-index="${data.index}" data-classname="${data.className}">${injectChildCapitalize(data.title.toLowerCase())}</option>`;
                }).join("")}
            </select>`;
        }
    };
};
const injectChildOnError = () => {
    const onError = () => {
        const userSettings = userSettingsStore.getList[0] ?? {};
        const userNextEpisodeSettings = userSettings?.userNextEpisodeSettings ?? {};
        injectChildIsLive = userNextEpisodeSettings?.isLive ?? false;

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

                if(selectedNextElem[0]) {
                    if(window.wv) window.wv.loadLink(selectedNextElem.attr('data-url'));
                    else window.location.href = selectedNextElem.attr('data-url');
                }
                else onError();
            }
            else onError();
        }
    }, 0);
    injectChildShower(false, true);
};
const injectChildOnVideo = (link = "") => {
    if(link !== "") {
        $("body").html(`<style>body { background: #000000; } video { position: fixed; width: 100%; height: 100%; background: #000000; }</style><video src="${link}" autoplay controls></video>`).ready(function() { 
            injectChildShower();
            injectChildVideoFlag();
        });
    }
    else injectChildOnError();
};
const injectChildTestLink = (link = "") => {
    if(link !== "" && injectChildRetrys <= 5) {
        const video = document.createElement("video");
        video.setAttribute("src", link);
        video.addEventListener("canplay", () => {
            injectChildOnVideo(link);
            $(video).remove();
        });
        video.addEventListener("error", () => injectChildReload());
    }
    else {
        injectChildOnError();
        sessionStorage.removeItem("tests");
    }
}
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
        domain: ['192', 'vizer', '9max', 'marketplaceweb','overflix','pobreflix'],
        fun: () => {},
        videoFun: (url) => {}
    },
    {
        domain: ['embedplayer'],
        fun: () => {
            if($(".main-error")[0]) injectChildOnError();
            else {
                injectChildValidater('.player_screen', () => {
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
                        .xchangeOptions {
                            opacity: 0 !important;
                            display: none !important;
                        }
                    </style>`);
                });
                if(!$(".infra iframe")[0]) $(".player_select_item").first().trigger('click');
                injectChildShower();
            }
        },
        videoFun: (url) => {}
    },
    {
        domain: ['supertvaovivo'],
        fun: () => {
            injectChildValidater('#iframe-player, #player', () => {
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

                    injectChildShower();
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
                    if(!$("#player")[0]) $(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.supertvaovivo)));
                    $(document).on('click', 'a', false);
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['reidoscanais'],
        fun: () => {
            injectChildValidater('iframe', () => injectChildShower());
        },
        videoFun: (url) => {}
    },
    {
        domain: ['embedcanaistv'],
        fun: () => {
            injectChildValidater('#player', () => injectChildShower());
        },
        videoFun: (url) => {}
    },
    {
        domain: ['embehub'],
        fun: () => {
            injectChildValidater('#live-player', () => injectChildShower());
        },
        videoFun: (url) => {}
    },
    {
        domain: ['futemax'],
        fun: () => {
            injectChildValidater('#player', () => {
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
                    injectChildShower();
                    $(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.futemax)));
                });
            });
            injectChildinterval = setInterval(() => {
                if(injectChildUrl.includes(".m3u8")) clearInterval(injectChildinterval);
                else $('#player-s').attr('src', function(i, val) { return val; });
            }, 5000);
        },
        videoFun: (url) => {
            if(url.includes(".m3u8")) injectChildUrl = url;
        }
    },
    {
        domain: ['futemais'],
        fun: () => {
            injectChildValidater('#player', () => {
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
                    injectChildShower();
                    $(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.futemais)));
                    $("iframe").attr("src", $(".canais.wf a").eq(0).attr("href"));
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['canaisplay'],
        fun: () => {
            injectChildValidater('#player', () => {
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
                    injectChildShower();
                    $(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.futemais)));
                    $("iframe").attr("src", $(".canais.wf a").eq(0).attr("href"));
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['multicanais', 'multicanais2'],
        fun: () => {
            injectChildValidater('.Player', () => {
                injectChildShower();
                $('.article-content').children().not('.Player, .links').remove();
                $('body').append(`<style>
                    a {
                        pointer-events: none !important;
                        display: none !important;
                    }
                    iframe {
                        display: none !important;
                    }
                    body > #page, body > .selector {
                        display: block !important;
                    }
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
                    div {
                        pointer-events: none !important;
                        opacity: 0 !important;
                    }   
                    body *, .Player, .Player *, .cast-buttons, .cast-buttons * {
                        pointer-events: all !important; 
                        opacity: 1 !important;
                    }
                </style>`).ready(function() {
                    const u = $('body').prop('outerHTML') ?? "";

                    if(u.includes("canais.php")) {
                        $(".links a").each(function() {
                            const el = $(this);
                            const url = el.attr("data-id");
    
                            if(!url.includes("canais.php")) $('.links').append(el);
                        });
                    } 
                    $(".links a")[0].click();
                    $(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.multicanais)));
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['warezcdn'],
        fun: () => {
            $(window.location.href.includes("#1") ? "server-selector:first-of-type" : "server-selector:last-of-type").trigger('click');
            setTimeout(() => injectChildShower(), 20000);
        },
        videoFun: (url) => {
            if(url.includes("basseqwevewcewcewecwcw.xyz/video/") || url.includes("mixdrop.ps/e/") || url.includes("mixdrop.ag/e/")) {
                window.location.href = url;
            }
        }
    },
    {
        domain: ['mixdrop'],
        fun: () => {
            const playerElem = $('.vjs-big-play-button');

            if(playerElem[0]) {
                setInterval(() => $("a").remove(), 0);
                $("body").append(`<style>
                    video {
                        tobject-fit: cover;
                    }
                    a, iframe {
                        pointer-events: none !important;
                        display: none !important;
                        opacity: 0 !important;
                    }
                    div {
                        pointer-events: none !important; 
                    }   
                    .player, .player *, .cast-buttons, .cast-buttons * {
                        pointer-events: all !important; 
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
                </style>`).ready(function() { injectChildVideoFlag(); });
                playerElem.trigger('click');
                injectChildShower();
            }
            else injectChildOnError();
        },
        videoFun: (url) => {}
    },
    {
        domain: ['watchadsontape', 'streamtape'],
        fun: () => {
            const link = window.location.href;

            if(link.includes("/js/")) injectChildTestLink(localStorage.getItem("video") ?? "");
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

                    localStorage.setItem("video", `/get_video?id=${params.id}&expires=${params.expires}&ip=${params.ip}&token=${params.token}`);
                    if(window.wv) window.wv.loadLink("https://watchadsontape.com/js/?" + params.id);
                    else window.location.href = "https://watchadsontape.com/js/?" + params.id;
                }
                else injectChildOnError();
            }
        },
        videoFun: (url) => {}
    },
    {
        domain: ['filemoon'],
        fun: () => {
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
            else window.location.href = window.location.href.replace("/e/", "/download/");
        },
        videoFun: (url) => {}
    },
    {
        domain: ['playerhd'],
        fun: () => {
            injectChildValidater('.geral', () => {
                $('.geral').prepend(`<style>
                    a {
                        pointer-events: none !important;
                        display: none !important;
                    }
                    iframe {
                        display: none !important;
                    }
                    .Player * {
                        display: block !important;
                    }
                    .geral {
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
                    .itens {
                        display: none !important;
                        text-align: left !important;
                        margin: 10px 10px !important;
                    }
                    .itens * {
                        position: relative !important;
                        min-width: max-content !important;
                        margin-bottom: 0px !important;
                    }
                    .icon .symbol {
                        position: absolute !important;
                    }
                    .speech {
                        font-size: 12px;
                        color: #fff;
                        background: #333333;
                        padding: 10px 15px;
                        border-radius: 10px;
                        max-width: 600px;
                        transition: all 0.3s ease;
                        opacity: 0;
                        z-index: -1000000000000;
                    }
                    .speech.active {
                        opacity: 1;
                        z-index: 1000000000000;
                    }
                    .speech::after {
                        display: block; width: 0; content: "";
                        border: 10px solid transparent;
                    }
                    .speech.up::after, .speech.right::after {
                        border-bottom-color: #333333;
                        border-top: 0;
                    }
                    .speech.center {
                        margin: auto;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 120px;
                    }
                    .speech.top-right {
                        margin: auto;
                        right: 20px;
                        top: 90px;
                    }
                    .speech {
                        position: fixed;
                        width: max-content;
                        height: max-content;
                    }
                    .speech::after { position: absolute; }
                    .speech.up::after {
                        top: -10px; left: calc(50% - 10px);
                    }
                    .speech.right::after {
                        top: -10px; left: calc(82% - 10px);
                    }
                    *:focus {
                        outline: none;
                    }
                </style>
                <div class="Player"></div>`).ready(function() {
                    eval($('[onclick="select(7)"]').attr('onclick') ?? $('[onclick="select(8)"]').attr('onclick'));
                    $('.down, .footer, .title').remove();
                    injectChildShower();
                    $(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.cinemao)));
                });
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['tvondemand'],
        fun: () => {
            injectChildValidater('.aa', () => {
                setInterval(() => {
                    const frame = $(".dd");
                    if(frame[0] && frame.attr("src").includes("warezid")) frame.attr("onload", "injectChildShower();").attr("src", frame.attr("src").replace("warezid", "embed.warezcdn.link/video/"));
                }, 0);
            });
        },
        videoFun: (url) => {}
    },
    {
        domain: ['superflixapi'],
        fun: () => {
            alert("aa")
            //$("body").replaceWith(`<textarea>${$("body").html()}</textarea>`);
            setInterval(() => $(".embedder_especial, .sflix_space, a").remove(), 0);
            injectChildShower();
        },
        videoFun: (url) => {}
    },
    {
        domain: ['basseqwevewcewcewecwcw'],
        fun: () => {
            // const isPlaying = setInterval(() => $(".jw-reset").trigger("click"), 0);
            
            // $('video').one('play', function () {
            //     clearInterval(isPlaying);
            // });
            setInterval(() => {
                $(".pppx").trigger("click");
                $("iframe, a").remove();
                $('a').click(function(event){
                    event.preventDefault();
                });
            }, 0);
            $("body").append("<style>a, iframe { pointer-events: none !important; }</style>");
            injectChildShower();
        },
        videoFun: (url) => {}
    },
    {
        domain: ['youtube'],
        fun: () => {
            injectChildValidater('.yt-icon-shape', () => {
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
            injectChildValidater('video', () => {
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

                injectChildValidater('body', () => {
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
                                if(response.includes("<iframe")) window.location.href = $(`<iframe${response.split('<iframe')[1].split("</iframe>")[0]}</iframe>`).attr("src");
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
            injectChildValidater('#live-player', () => {
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
            injectChildValidater('.make-iframe-responsive', () => {
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
let userSettingsStore, injectChildIsLive = false;
injectChildScript.src = window.location.protocol.replace('file:', 'https:') + ((injectBaseUrl.includes("zbigz.m") || window.location.href.includes("file:")) ? '//code.jquery.com/jquery-3.7.1.min.js' : '//cdn.jsdelivr.net/gh/cdnuhd/cdn/jquery.js');
injectChildScript.addEventListener('load', injectChildInit);
if(!window.location.protocol.includes("file:")) document.head.appendChild(injectChildScript);

function injectChildInit() {
    injectChildStore().then(() => {
        try {
            const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];
            
            if(injectChildObjCheck(data)) data.fun();
            else injectChildDomainServers[injectChildDomainServers.length-1].fun();
            $(document).on('change','.selector',function(){
                const index = $(this).find("option:selected").attr("data-index");
                const className = $(this).find("option:selected").attr("data-classname");
                const isUrl = ($(this).find("option:selected").attr("data-url") ?? "") !== "";
    
                if(isUrl) window.location.href = $(this).find("option:selected").attr("data-url");
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
function injectChildValidater(attr, onReturn) {
    if($(attr)[0]) {
        console.log('success');
        onReturn();
        // if(window.wv && !window.location.protocol.includes("file:")) window.onbeforeunload = function(){
        //     return 'Are you sure you want to leave?';
        // };
    } else window.wv.loadErrorLink(window.location.href);
}
function injectChildShower(isGame = false, isHide = false) {
    if(window.wv && !isHide) window.wv.show();
    if(!isGame) {
        if(!$(".cast-buttons")[0]) {
            $("body").append(`<meta name="viewport" 
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            <style>
                .cast-buttons {
                    position: fixed;
                    z-index: 1000000000000;
                    margin: 10px 20px;
                    transition: all 0.3s ease;
                    right: -100%;
                    top: 0;
                }
                .cast-buttons.active {
                    right: 0;
                }
                .cast-buttons section {
                    display: flex;
                    background: #333333;
                    padding: 8px;
                    border-radius: 100px;
                    gap: 10px;
                }
                .cast-buttons button.text {
                    color: #ffffff;
                    width: auto;
                    font-weight: bold;
                    padding-left: 15px;
                    padding-right: 15px;
                }
                .cast-buttons button.text img  {
                    width: 15px;
                    height: 15px;
                    margin-left: 5px;
                }
                .cast-buttons button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    background: #595959;
                    border: 0px;
                    border-radius: 100px;
                    padding: 10px;
                }
                .cast-buttons button img {
                    width: 100%;
                    height: auto;
                }
                body, html {
                    overflow: hidden !important;
                }
                .selector {
                    width: max-content;
                    height: 40px;
                    background-image: url(https://img.icons8.com/ios-filled/20/ffffff/expand-arrow--v1.png);
                    background-repeat: no-repeat;
                    background-position: center right;
                    background-position-x: 85%;
                    background-size: 15px;
                    position: relative;
                    z-index: 10000000001;
                    top: 0;
                    margin: 0px;
                    background-color: #595959;
                    border: 0px #cccccc solid;
                    border-radius: 50px;
                    color: #ffffff;
                    font-weight: bold;
                    font-size: 15px;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    text-indent: 1px;
                    text-overflow: '';
                    padding: 10px 45px 10px 25px;
                    max-width: 150px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                *:focus {
                    outline: none;
                }
            </style>`);
            $("body").append(injectChildRequestHtml(injectChildV.cardButtons)).ready(function() {
                setTimeout(() => $(".cast-buttons").addClass("active"), 500);
            });
        }
        $(document).on('click', 'a', false);
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
function injectChildCloseOptions() {
    $(".cast-buttons").css("display", "none !important");
    $(".cast-buttons").removeClass("active");
    $(".card-alert-buttons").removeClass('active');
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
    const link = window.location.href;

    if(link.includes("/js/")) {
        window.location.href = `https://${window.location.host}/e/${window.location.href.split("?")[1]}`;
    }
    else window.location.reload();
    sessionStorage.setItem("tests", `${injectChildRetrys+1}`);
}
function injectChildCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function injectChildNextEpisode() {
    window.wv.hide();
    window.wv.loadLink("file:///android_asset/pageDialog.html?dialogType=19");
}
async function injectChildStore() {
    return new Promise(async(resolve, reject) => {
        try { 
            userSettingsStore = await new StorageData("storeUserSettings_0", false, 1); 
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
    const currentTime = parseInt(localStorage.getItem(`time-${window.location.href}`) ?? "0");
    const videoElem = $('video');
    const userSettings = userSettingsStore.getList[0] ?? {};
    const userNextEpisodeSettings = userSettings?.userNextEpisodeSettings ?? {};
    const episodeNextEnable = userNextEpisodeSettings?.enableNext ?? false;
    let isReturned = false;

    if(episodeNextEnable) {
        videoElem.on('ended',function(){
            if(episodeNextEnable) injectChildNextEpisode();
        });
    }
    videoElem.bind("timeupdate", function(e){
        const castButtonsElem = $(".cast-buttons");
        const videoProgress = Math.round(videoElem[0].currentTime / videoElem[0].duration * 100);

        if(videoProgress > 90 && !castButtonsElem.hasClass("active") && episodeNextEnable && !isReturned) {
            castButtonsElem.addClass("active");
            isReturned = true;
        }
        if(!injectChildIsLive) localStorage.setItem(`time-${window.location.href}`, `${videoElem[0].currentTime}`);
    });
    if(!injectChildIsLive && currentTime > 0) {
        videoElem.attr('currentTime', currentTime);
        videoElem[0].currentTime = currentTime;
    }
}
function injectChildIsArray(value) {
    try {
        if (value instanceof Array) return true;
    }catch(err) {logs(err);}
    return false;
}
function injectChildGetRootUrl(url) {
    return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
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
