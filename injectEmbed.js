injectSuccess = true;
const injectChildScript = document.createElement('script');
const injectChildGetParam = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const injectChildDomainServers = [
    {
        domain: ['file:', '192', 'vizer'],
        fun: () => {}
    },
    {
        domain: ['futemax'],
        fun: () => {
            injectChildValidater('#player', () => {
                $('body').append(`<style>
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
                </style>`).ready(function() {
                    injectChildShower();
                });;
            });
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
                    .article-content {
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
                        padding: 0px !important;
                        width: 100% !important;
                        height: 100% !important;
                    }
                </style>`).ready(function() {
                    injectChildShower();
                    run($('.links a:first-of-type')[0]);
                    ;
                });
            });
        }
    },
    {
        domain: ['warezcdn'],
        fun: () => {
            injectChildValidater('.hostList', () => {
                $('.hostList').removeClass('hostList').addClass('hostLister');
                $('[data-load-embed]').each(function() {
                    $(this).attr('data-load-embeds', $(this).attr('data-load-embed'));
                    $(this).removeAttr('data-load-embed');
                });
                $('.hostListSelector').prepend(`<style>
                    .hostListSelector {
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
                    .hostLister {
                        position: relative !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: fit-content !important;
                        overflow-y: auto !important;
                        display: flex !important;
                        gap: 10px !important;
                        padding: 10px 10px;
                    }
                    .itens .a {
                        position: relative;
                        min-width: max-content;
                    }
                    #selectPlayer .buttonLoadHost .t, #selectPlayer .buttonLoadHost .s  {
                        position: relative;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        padding: 10px 25px;
                    }
                    #selectPlayer .buttonLoadHost {
                        height: auto;
                    }
                    #selectPlayer .buttonLoadHost i, #selectPlayer .buttonLoadHost .s {
                        display: none;
                    }
                    #selectPlayer .buttonLoadHost {
                        margin: 0px;
                    }
                    .Player * {
                        padding: 0px !important;
                        width: 100% !important;
                        height: 100% !important;
                    }
                </style>
                <div class="Player"></div>`).ready(function() {
                    $(document).on("click", "[data-load-embeds]", function(){
                        var id =$(this).attr("data-load-embeds");
                        var sv = $(this).attr("data-load-embed-host");
            
                        $("[data-load-embeds]").removeClass("active");
                        $(this).addClass("active");
            
                        var url = "https://warezcdn.com/embed/getEmbed.php?id="+id+"&sv="+sv;
                        $(".Player").html(getIframe(url));
                    });
                    $('[data-load-embeds]:first-of-type').trigger('click');
                    injectChildShower();
                });
            });
        }
    },
    {
        domain: ['playerhd'],
        fun: () => {
            injectChildValidater('.geral', () => {
                $('.geral').prepend(`<style>
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
                </style>
                <div class="Player"></div>`).ready(function() {
                    eval($('[onclick="select(7)"]').attr('onclick') ?? $('[onclick="select(8)"]').attr('onclick'));
                    $('.down, .footer, .title').remove();
                    injectChildShower();
                });
            });
        }
    },
    {
        domain: ['all'],
        fun: () => injectChildShower()
    }
];
injectChildScript.src = window.location.protocol.replace('file:', 'https:') + '//code.jquery.com/jquery-3.7.1.min.js';
injectChildScript.addEventListener('load', init);
document.head.appendChild(injectChildScript);

function injectChildInit() {
    try {
        const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];

        if(injectChildObjCheck(data)) data.fun();
        else injectChildDomainServers[injectChildDomainServers.length-1].fun();
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
function injectChildShower() {
    if(window.wv) window.wv.show();
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
