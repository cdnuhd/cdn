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
};
const injectChildRetrys = parseInt(sessionStorage.getItem("tests") ?? "0");
const injectChildOnResult = (link = "", isDownload = false) => {
    if(link !== "") {
        if(window.wv) {
            if(isDownload) {
                try {
                    const title = Object.assign([], titleStore.getList[0])[0];
                    window.wv.downloadFile(link, title);
                    window.wv.finishActivity();
                } catch (err) {
                    window.wv.downloadFile(link, "video");
                    window.wv.finishActivity();
                }
            }
            else {
                window.wv.openText(link);
                window.wv.finishActivity();
            }
        }
        else window.location.href = link;
    }
    else {
        if(window.wv) {
            window.wv.showToast("Vídeo deletado, escolha outra opção de player.");
            window.wv.finishActivity();
        }
        else alert("Vídeo deletado, escolha outra opção de player.");
    }
};
const injectChildTestLink = (link = "", isDownload = false) => {
    if(link !== "" && injectChildRetrys <= 10) {
        const video = document.createElement("video");
        video.setAttribute("src", link);
        video.addEventListener("canplay", () => {
            injectChildOnResult(link, isDownload);
            $(video).remove();
        });
        video.addEventListener("error", () => injectChildReload());
    }
    else injectChildOnResult();
}
const injectChildDomainServers = [
    {
        domain: ['file:', '192', 'vizer', '9max', 'marketplaceweb','overflix','pobreflix'],
        fun: () => {},
        videoFun: (url) => {}
    },
    {
        domain: ['livechat'],
        fun: () => {},
        videoFun: (url) => {}
    },
    {
        domain: ['youtube'],
        fun: () => {},
        videoFun: (url) => {}
    },
    {
        domain: ['kwai'],
        fun: () => {
            setInterval(() => $("video").prop('muted', true), 0);
        },
        videoFun: (url) => {}
    },
    {
        domain: ['google'],
        fun: () => {
            if($(`a[href^="https://play.google.com/store/apps/details?id=com.max9"]`)[0]) setTimeout(() => $(`a[href^="https://play.google.com/store/apps/details?id=com.max9"]`)[0].click(), 5000);
        },
        videoFun: (url) => {}
    },
    {
        domain: ['warezcdn'],
        fun: () => {
            $(window.location.href.includes("#1") ? "server-selector:first-of-type" : "server-selector:last-of-type").trigger('click');
            // if($("server-selector")[0]) {
            //     window.location.href = `/getPlay.php?id=${$("server-selector").attr("data-id")}&sv=${$("server-selector").attr("data-server")}`
            // }
            // injectChildValidater('server-selector', () => $("[data-server]")[0].click());
            // injectChildValidater('#player', () => eval($(".btn").attr("onclick")));
            setTimeout(() => window.location.reload(), 25000);
        },
        videoFun: (url) => {
            if(url.includes("basseqwevewcewcewecwcw.xyz/video/") || url.includes("mixdrop.ps/e/") || url.includes("mixdrop.ag/e/")) {
                window.location.href = url;
            }
            // const validVideo = videoCheck(url);

            // if(validVideo) {
            //     if(window.wv) {
            //         window.wv.openVideo(url);
            //         window.wv.finishActivity();
            //     }
            //     else window.open(url, '_blank');
            // }
        }
    },
    {
        domain: ['mixdrop'],
        fun: () => {
            if(window.location.href.includes("/e/")) window.location.href = window.location.href.replace("/e/", "/f/")+"?download";
            else {    
                if($(".download-btn")[0]) {
                    $(".download-btn").trigger('click');
                    $(".btn3")[0].click();
                    const rd = setInterval(() => {
                        const url = $(".btn3").attr("href") ?? "";
                        if(url !== "") {
                            clearInterval(rd);
                            injectChildTestLink(url, true);
                        }
                        else {
                            $(".download-btn").trigger('click');
                            $(".btn3")[0].click();
                        }
                    }, 0);
                }
                else injectChildOnResult();
            }
        },
        videoFun: (url) => {
            // const validVideo = videoCheck(url);

            // if(validVideo) {
            //     if(window.wv) {
            //         window.wv.openVideo(url);
            //         window.wv.finishActivity();
            //     }
            //     else window.open(url, '_blank');
            // }
        }
    },
    {
        domain: ['watchadsontape', 'streamtape'],
        fun: () => {
            const link = $("#ideoolink").text() ?? "";
            
            if(link !== "") {
                const params = {
                    id: injectChildGetParam("id", link),
                    expires: injectChildGetParam("expires", link),
                    ip: injectChildGetParam("ip", link),
                    token: injectChildGetParam("token", link)
                };

                injectChildTestLink(`https://${window.location.host}/get_video?id=${params.id}&expires=${params.expires}&ip=${params.ip}&token=${params.token}`);
            }
            else injectChildOnResult();
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
                    injectChildShower();
                }
                else injectChildTestLink($(".download2 a").attr("href") ?? "");
            }
            else window.location.href = window.location.href.replace("/e/", "/download/");
        },
        videoFun: (url) => {}
    },
    {
        domain: ['xn----------------g34l3fkp7msh1cj3acobj33ac2a7a8lufomma7cf2b1sh.xn---1l1--5o4dxb.xn---22--11--33--99--75---------b25zjf3lta6mwf6a47dza94e.xn--pck.xn--zck.xn--0ck.xn--pck.xn--yck.xn-----0b4asja7ccgu2b4b0gd0edbjm2jpa1b1e9zva7a0347s4da2797e8qri.xn--1ck2e1b'],
        fun: () => {
            const success = true;

            if(!window.location.href.includes("download")) {
                if(window.wv) {
                    window.wv.openLink(window.location.href);
                    window.wv.finishActivity();
                }
                else window.open(window.location.href, '_blank');
                // setInterval(() => {
                //     try { onSubmit(); } catch (err) {}
                // }, 1000);
                // $('body').on('DOMSubtreeModified', function(){
                //     if($("[baixar]")[0] && success){
                //         if(window.wv) {
                //             window.wv.openLink(`${window.location.origin + $("[baixar]").attr("baixar")}`);
                //             window.wv.finishActivity();
                //         }
                //         else window.open(downloadLink, '_blank');
                //         success = false;
                //     } 
                // });
            }
            else {
                setTimeout(() => $("body").html(`<textarea>${$("body").html()}</textarea>`), 2000);
                if($("body")[0]){
                    const html = $("body").html();
                    const downloadLink = `https:${html.split("const redirectUrl = '")[1].split("'")[0]}`;
                    if(window.wv) {
                        window.wv.openLink(downloadLink);
                        window.wv.finishActivity();
                    }
                    else window.open(downloadLink, '_blank');
                }
            }
            injectPendingProcess();
        },
        videoFun: (url) => {}
    },
    {
        domain: ['basseqwevewcewcewecwcw'],
        fun: () => {
            if(window.wv) {
                window.wv.openText(window.location.href);
                window.wv.finishActivity();
            }
            else window.open(window.location.href, '_blank');
        },
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

                fetch(url, { cache: "force-cache" })
                .then(async response => await response.text())
                .then(async response => {
                    const elem = $(`<body><div>${response?.split("<body>")[1]?.split("</body>")[0] ?? response}</div></body>`);
                    let url2 = elem.find("source, iframe").attr("src") ?? "";
                    url2 = (url2 === "") ? url : url2;
                    
                    injectChildTestLink(url2);
                })
                .catch(err => injectChildOnResult());
                
                setTimeout(() => injectChildOnResult(), 60000);
            })
            .catch(err => injectChildOnResult());
        },
        videoFun: (url) => {}
    },
    {
        domain: ['all'],
        fun: () => injectPendingProcess(),
        videoFun: (url) => {}
    }
];
let titleStore;

injectChildScript.src = window.location.protocol.replace('file:', 'https:') + ((injectBaseUrl.includes("zbigz.m") || window.location.href.includes("file:")) ? '//code.jquery.com/jquery-3.7.1.min.js' : '//cdn.jsdelivr.net/gh/cdnuhd/cdn/jquery.js');
injectChildScript.addEventListener('load', injectChildInit);
if(!window.location.protocol.includes("file:")) document.head.appendChild(injectChildScript);

function injectChildInit() {
    injectChildChannelList().then(() => {
        try {
            const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];
    
            if(injectChildObjCheck(data)) data.fun();
            else injectChildDomainServers[injectChildDomainServers.length-1].fun();
            console.log('success');
        } catch (err) { injectChildOnResult(); }
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
        if(window.wv && !window.location.protocol.includes("file:")) window.onbeforeunload = function(){
            return 'Are you sure you want to leave?';
        };
    }
    else {
        console.log('failed');
    }
}
function injectChildShower() {
    if(window.wv) window.wv.show();
}
function injectPendingProcess(){
    setTimeout(() => {
        if(window.wv) {
            window.wv.openText(window.location.href);
            window.wv.finishActivity();
        }
        else window.open(window.location.href, '_blank');
    }, 25000);
}
async function injectChildChannelList() {
    return new Promise(async(resolve, reject) => {
        try { titleStore = await new StorageData("storeTitle_0", false, 1); }
        catch (err) {}
        resolve();
    });
}
function injectChildPutFile(url) {
    const data = injectChildDomainServers.filter(({ domain }) => domain.some(el => (window.location.origin ?? window.location.href).includes(el)))[0];
    if(injectChildObjCheck(data)) data.videoFun(url);
}
function injectChildVideoCheck(url) {
    return url.includes('.mp4') || url.includes('.m3u8') || url.includes('.mkv') || url.includes('workerproxy');
}
function injectChildReload() {
    const link = window.location.href;

    if(link.includes("/js/")) {
        window.location.href = `https://${window.location.host}/e/${window.location.href.split("?")[1]}`;
    }
    else window.location.reload();
    sessionStorage.setItem("tests", `${injectChildRetrys+1}`);
}
function injectIframe() {
    var scriptTag = "<script>alert('b')</script>";
    $("#iframe").contents().find("body").append(scriptTag);
}
