injectSuccess = true;
let injectCurrentZoom = 1.0;
let injectChildinterval;
let injectChildUrl = "";
const injectChildScript = document.createElement('script');
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
            return `<div class="cast-buttons">
                <section>
                    <button onclick="zoomIn();"><img src="https://i.ibb.co/svqy7V4/positive.png" border="0"></button>
                    <button onclick="zoomOut();"><img src="https://i.ibb.co/QHN4tNP/negative.png" border="0"></button>
                    <button onclick="window.location.reload();"><img src="https://i.ibb.co/f2zD2y0/reload.png" border="0"></button>
                    <button onclick="closeOptions();"><img src="https://i.ibb.co/f2n3T2f/close-White.png" border="0"></button>
                </section>
            </div>`;
        }
        case injectChildV.cardSelector: {
            return `<select class="selector">
                ${data.map(data => {
                    return `<option data-index="${data.index}" data-classname="${data.className}" ${(data.title.includes("SD DUB")) ? "selected" : ""}>${data.title}</option>`
                }).join("")}
            </select>`;
        }
    };
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
            if($(".main-error")[0]) {
                $("body").html(`
                <style> 
                    a, iframe {
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
                </style>
                <div class="alerter"><center>O vídeo que você esta tentando assistir foi deletado,<br>volte e escolha outra opção de player.</center></div>
                `);
            }
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
            }
            injectChildShower();
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
        domain: ['multicanais', 'multicanais2'],
        fun: () => {
            const run = (elem) => {
                var iframeSrc = jQuery(elem).attr('data-id');
                var urlIframe = 'https://futeonline.com/player.php?canal='+iframeSrc;
                if(jQuery(elem).attr('data-tipo') == "iframe"){
                    var urlIframe = iframeSrc;
                }
                if(jQuery(elem).attr('data-tipo') == "hls"){
                    var urlIframe = 'https://futeonline.com/hls.php?canal='+iframeSrc;
                }
                var nome = "iframe";
                jQuery('.Player').html('<'+nome+' src="'+urlIframe+'" width="100%" height="360" frameborder="0" scrolling="no" id="myFrame" allowfullscreen="true" allow="encrypted-media" style="border-radius:5px;"></iframe>');
                jQuery(".links a").css("background-color","#572e57");
                jQuery(elem).css("background-color", "rgb(201, 0, 126)");
                jQuery(".indica").css("display","none");
                jQuery('html, body').animate({
                    scrollTop: (jQuery('#content').offset().top)
                },500);
            }
            injectChildValidater('.Player', () => {
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
                    injectChildShower();
                    run($('.links a:eq(1)')[0]);
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
            // if($("server-selector")[0]) {
            //     window.location.href = `https://vizertv.in/embed/getPlay.php?id=${$("server-selector").attr("data-id")}&sv=${$("server-selector").attr("data-server")}`
            // }
            // if($(".hostList")[0]) $("[data-load-embed]")[0].click();
            // else if($("#player")[0]) {
            //     $("body").append(`<style>
            //         video {
            //             tobject-fit: cover;
            //         }
            //         a, iframe {
            //             pointer-events: none !important;
            //             display: none !important;
            //         }
            //     </style>`);
            //     $(".btn").trigger('click');
            //     injectChildShower();
            // }
            // setTimeout(() => injectChildShower(), 20000);
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
                </style>`).ready(function() {
                    //$(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.mixdrop)));
                });
                playerElem.trigger('click');
            }
            else {
                $("body").html(`
                <style> 
                    a, iframe {
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
                <div class="alerter"><center>O vídeo que você esta tentando assistir foi deletado,<br>volte e escolha outra opção de player.</center></div>
                `).ready(function() {
                    //$(".cast-buttons section").prepend(injectChildRequestHtml(injectChildV.cardSelector, injectPlayerList(injectChildV.mixdrop)));
                });
            }
            injectChildShower();
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
        domain: ['all'],
        fun: () => injectChildShower(window.location.href.includes("crazy")),
        videoFun: (url) => {}
    }
];

injectChildScript.src = window.location.protocol.replace('file:', 'https:') + '//code.jquery.com/jquery-3.7.1.min.js';
injectChildScript.addEventListener('load', injectChildInit);
document.head.appendChild(injectChildScript);

function injectChildInit() {
    try {
        const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];
        
        if(injectChildObjCheck(data)) data.fun();
        else injectChildDomainServers[injectChildDomainServers.length-1].fun();
        $(document).on('change','.selector',function(){
            const index = $(this).find("option:selected").attr("data-index");
            const className = $(this).find("option:selected").attr("data-classname");

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
            else {
                $(className)[index].click();
            }
        });
        console.log('success');
    } catch (err) {
        if(window.wv) window.wv.loadErrorLink(window.location.href); 
        console.log('failed');
    }
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
    } else {
        console.log('failed');
        if(window.wv) window.wv.loadErrorLink(window.location.href); 
    }
}
function injectChildShower(isGame = false) {
    if(window.wv) window.wv.show();
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
            </style>`);
            $("body").append(injectChildRequestHtml(injectChildV.cardButtons)).ready(function() {
                setTimeout(() => $(".cast-buttons").addClass("active"), 500);
            });
        }
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
    }
}
function select(button){
    $.ajax({
        url:'https://playerhd.org/video/geradorteste.php',
        type: 'POST',
        data:{button:button,id:injectChildGetParam('id'),season:"none",episode:"none"},
        success: function(data){
            $('.Player').html('<iframe src="'+data+'" oncontextmenu="return false;" width="100%" height="100%" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>');
           
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|wepApp|Opera Mini/i.test(navigator.userAgent) ) {
                $(".escolha>.a:contains('NT')").hide();
                $(".escolha>.a:contains('NT DUB')").hide();
            }
        },
    });
}
function putFile(url) {
    const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];
    if(injectChildObjCheck(data)) data.videoFun(url);
}
function videoCheck(url) {
    return url.includes('.mp4') || url.includes('.m3u8') || url.includes('.mkv') || url.includes('workerproxy');
}
function closeOptions() {
    $(".cast-buttons").css("display", "none !important");
    $(".cast-buttons").removeClass("active");
    $(".card-alert-buttons").removeClass('active');
}
function getIframe(url){
    url = url.includes("=warezcdn") ? "https://warezcdn.net/player/player.php?id=" + injectChildGetParam("id", url) : url.replace("getEmbed", "getPlay").replace("warezcdn.com", "warezcdn.net");
    
    window.location.href = url;
}
function injectFileName(filepath) {
    const fileName = filepath.match(/^.*?([^\\/.]*)[^\\/]*$/)[1];

    return (fileName.includes(".")) ? fileName : (fileName + ".mp4");
}
function zoomIn (event) {
    if($('iframe, video').css("scale") === "none") $('iframe, video').css("scale", "1");
    $('iframe, video').animate({ 'scale': injectCurrentZoom += .1 }, 'slow');
}
function zoomOut (event) {
    if($('iframe, video').css("scale") === "none") $('iframe, video').css("scale", "1");
    $('iframe, video').animate({ 'scale': injectCurrentZoom -= .1 }, 'slow');
}
