const bodyElem = $("body"),
containerElem = $(".container"),
documentElem = $(document);

const requestHtml = (type, data) => {
    switch(type) {
        case v.cardTitleList: {
            let itemTitle = data.itemTitle ?? '';
            let itemDesc = data.itemDesc ?? '';
            let itemId = data.itemId ?? '';

            return `<div class="card-item-content">
                <div class="card-item-title-content width-spaces">
                    <div class="desc">${itemDesc}</div>
                    <div class="title">${itemTitle}</div>
                </div>
                ${requestHtml(v.horizontalScrollerElem, 
                    {
                        class: itemId,
                        content: requestHtml(v.itemList, data) 
                    }
                )}
            </div>`;
        }
        case v.cardPosterFull: {
            randomColors();
            let marquee = isMarquee(getTextWidth([data.itemTitle, 'card-top-title']), 370);
            let posterBackground = data.itemPosterBackground ?? i.errorPoster;
            let itemType = data.itemType ?? '';
            let itemTitle = data.itemTitle ?? '';

            return `<div class="card-poster-full-content">
                <section>
                    <div class="card-poster width-spaces">
                        ${requestHtml(v.imgElem, {img: posterBackground, class: "lazy-poster", isLazy: true})}
                
                        <div class="card-info-content">
                            <div class="card-top-desc-content">
                                <div class="card-top-type darken-text">${itemType === "movie" ? t.movieTopType : t.serieTopType}</div>
                                <div class="card-top-title ${marquee ? 'is-marquee' : 'no-marquee'}">${requestHtml(v.marqueeElem, {value: itemTitle, isMarquee: marquee})}</div>
                                <div class="card-top-week">${itemType === "movie" ? t.movieTopWeek : t.serieTopWeek}</div>
                            </div>
        
        
                            <section class="card-btn-content">
                                <div class="card-opt-content">
                                    ${requestHtml(v.btnElem, {
                                        class: 'btn-flex img-left bg-white',
                                        text: requestHtml(v.imgElem, {img: i.play, class: "", isLazy: false}) + t.assistir
                                    })}
                                </div> 
                                <div class="card-opt-content">
                                    ${requestHtml(v.btnElem, {
                                        class: 'btn-flex bg-white-50 image',
                                        text: requestHtml(v.imgElem, {img: i.save, class: "large-img", isLazy: false})
                                    })}
                                </div>
                                <div class="card-opt-content">
                                    ${requestHtml(v.btnElem, {
                                        class: 'btn-flex bg-white-50 image',
                                        text: requestHtml(v.imgElem, {img: i.info, class: "large-img", isLazy: false})
                                    })}
                                </div>
                            </section>
                        </div>
                    </div>
                    ${requestHtml(v.horizontalScrollerElem, { content: requestHtml(v.btnList, d.fontList) })}
                </section>
            </div>`;
        }
        case v.cardPoster: {
            let poster = data.itemPoster ?? i.errorPoster;
            return `<div class="item-content" onclick="requestStorageData(${v.stClear});initPage('${v.tagPage}');">
                <div class="item">
                    ${requestHtml(v.imgContentElem, {
                        contentClass: 'item-poster',
                        contentStyles: '',
                        img: poster,
                        class: 'lazy-poster',
                        isLazy: true,
                        observer: true
                    })}
                </div>
            </div>`;
        }
        case v.cardPosterSeved: {
            let poster = data.itemPoster ?? i.errorPoster;
            return `<div class="item-content">
                <div class="item">
                    ${requestHtml(v.imgContentElem, {
                        contentClass: 'item-poster item-borded-options',
                        contentStyles: '',
                        img: poster,
                        class: 'lazy-poster',
                        isLazy: true,
                        observer: true
                    })}

                    <section class="item-options">
                        ${requestHtml(v.imgElem, {
                            img: i.infos,
                            class: '',
                            isLazy: false,
                            observer: false
                        })}
                        <div class="separate"></div>
                        ${requestHtml(v.imgElem, {
                            img: i.close,
                            class: '',
                            isLazy: false,
                            observer: false
                        })}
                    </section>
                </div>
            </div>`;
        }
        case v.cardPosterTopRated: {
            let poster = data.itemPoster ?? i.errorPoster;
            return `<div class="item-content">
                <section class="item item-rated">
                    <div class="count"></div>
                    ${requestHtml(v.imgContentElem, {
                        contentClass: 'item-poster top',
                        contentStyles: '',
                        img: poster,
                        class: 'lazy-poster',
                        isLazy: true,
                        observer: true
                    })}
                </section>
            </div>`;
        }
        case v.cardPosterUpdated: {
            let poster = data.itemPoster ?? i.errorPoster;
            return `<div class="item-content">
                <div class="item item-updated">
                    ${requestHtml(v.imgContentElem, {
                        contentClass: 'item-poster',
                        contentStyles: '',
                        img: poster,
                        class: 'lazy-poster',
                        isLazy: true,
                        observer: true
                    })}
                </div>
            </div>`;
        }
        case v.cardHomeContent: {
            if(valCheck(data[0])) {
                return `<div class="content">
                    <div class="view-flags"></div>
                    ${requestHtml(v.cardPosterFull, data[0])}
                    <div id="list">
                        ${requestHtml(v.titleList, data[1])}
                    </div>
                </div>`;
            }else {
                return 'null';
            }
        }
        case v.cardProgress: {
            return `<div class="progress-content">
                <div>
                    <div class="circle"></div>
                    <div class="line-large"></div>
                    <div class="line-small"></div>
                    <section class="circle-list">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </section>
                    <section class="retangle-list">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </section>
                    <section class="circle-list">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </section>
                    <section class="retangle-list">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </section>
                </div>
            </div>`;
        }
        case v.cardAlert: {
            return ``;
        }


        case v.imgElem: {
            let img = data.img ?? '';
            let className = data.class ?? '';
            let isObserver = (data.observer ?? false === true) ? `onload="lazyObserver(this)"` : `onload="lazyLoader(this)"`;
            let isLazy = (data.isLazy ?? false) ? `src="${i.blank}" data-src="${img}" ${isObserver}` : `src="${img}"`;

            return `<img class="lazy ${className}" ${isLazy} />`;
        }
        case v.imgContentElem: { 
            let contentClass = data.contentClass ?? '';
            let contentStyles = data.contentStyles ?? '';
            let img = data.img ?? '';
            let className = data.class ?? '';
            let isObserver = (data.observer ?? false === true) ? `onload="lazyObserver(this)"` : `onload="lazyLoader(this)"`;
            let isLazy = (data.isLazy ?? false) ? `src="${i.blank}" data-src="${img}" ${isObserver}` : `src="${img}"`;
            
            return `<div class="${contentClass}" ${contentStyles}>
                <img class="lazy ${className}" ${isLazy} />
            </div>`;
        }
        case v.marqueeElem: {
            return data.isMarquee ? `<div class="marquee-article">
                <div class="marquee-wrapper">
                    <ul class="marquee">
                        <li>${data.value}</li>
                    </ul>
                    <ul class="marquee2">
                        <li>${data.value}</li>
                    </ul>
                </div>
            </div>` : `<span>${data.value}</span>`;
        }
        case v.btnElem: {
            return `<button class="${data.class}">${data.text}</button>`;
        }
        case v.horizontalScrollerElem: {
            let className = data.class ?? '';
            let content = data.content ?? '';
            return `<div class="horizontal-scroller ${className}">
                <section class="width-spaces">
                    ${content}
                </section>
            </div>`;
        }


        case v.btnList: {
            let resultHtml = '';
            try {
                data.map(data => {
                    let text = data.text ?? '';
                    let isLeftIcon = valCheck(data.imgSettings) ? valCheck(data.imgSettings.leftImg) : false;
                    let isRightIcon = valCheck(data.imgSettings) ? valCheck(data.imgSettings.rightImg) : false;
                    let imgLeft = (isLeftIcon) ? requestHtml(v.imgElem, {class: 'left', img: data.imgSettings.leftImg ?? '', isLazy: false}) : '';
                    let imgRight = (isRightIcon) ? requestHtml(v.imgElem, {class: 'right', img: data.imgSettings.rightImg ?? '', isLazy: false}) : '';
                    resultHtml += requestHtml(v.btnElem, { 
                        class: (data.class ?? '') + (isLeftIcon ? ' icon-left' : '') + (isRightIcon ? ' icon-right' : ''),
                        text: imgLeft + text + imgRight
                    });
                });
            }
            catch(err) {}
            return resultHtml;
        }
        case v.itemList: {
            let resultHtml = '';
            let itemList = valCheck(data.itemList) ? data.itemList : null;
            let itemCardType = valCheck(data.itemCardType) ? parseInt(data.itemCardType) : v.cardPoster;
            try {
                itemList.map(data => {
                    let cardType = valCheck(data.itemCardType) ? parseInt(data.itemCardType) : itemCardType;
                    resultHtml += requestHtml(cardType, data);
                });
            }
            catch(err) {}
            return resultHtml;
        }
        case v.titleList: {
            let resultHtml = '';
            try {
                data.map(data => {
                    resultHtml += requestHtml(v.cardTitleList, data);
                });
            }
            catch(err) {}
            return resultHtml;
        }
    }
}
const requestStorageData = (type, data) => {
    if(!localStorage.getItem('storageData')) {
        localStorage.setItem('storageData', JSON.stringify({
            bunkerCacheList: {},
            bunkerViewedEpisodeList: {},
            bunkerMyList: [],
            bunkerSearchHistoryList: [],
            bunkerViewedHistoryList: [],
            bunkerTopRatedList: []
        }));
    }
    let storageData = JSON.parse(localStorage.getItem('storageData'));

    switch(type) {
        case v.stPut: {
            storageData = data;
            localStorage.setItem('storageData', JSON.stringify(data));
            break;
        }
        case v.stGet: {
            return storageData;
        }
        case v.stClear: {
            localStorage.removeItem('storageData');
            break;
        }
        case v.stPutCache: {
            try {
                storageData.bunkerCacheList[data.id] = { timeAdded: Date.now(), content: data.content};
                requestStorageData(v.stPut, storageData);
            } catch (err) {}
        }
        case v.stPutList: {
            try {
                storageData[data.id] = data.content;
                requestStorageData(v.stPut, storageData);
            } catch(err) {}
            break;
        }
        case v.stGetCacheContent: {
            try {  
                const bunkerCacheList = storageData.bunkerCacheList[data.id];
                if (valCheck(bunkerCacheList) && Date.now() - bunkerCacheList.timeAdded > data.timeExpire*60*1000) { 
                    delete storageData.bunkerCacheList[data.id];
                    requestStorageData(v.stPut, storageData);
                    return v.null;
                }
                return bunkerCacheList.content;
            } catch(err) {}
                return v.null;
        }
        case v.stGetList: {
            try {
                return storageData[data.id];
            } catch(err) {}
                return [];
        }
        case v.stAddItem: {

            break;
        }
        case v.stRemoveItem: {

            break;
        }
    }
}

const v = {
    cardPosterFull: 7,
    cardPoster: 1,
    cardPosterSeved: 15,
    cardPosterTopRated: 16,
    cardPosterUpdated: 17,
    cardHomeContent: 6,
    cardTitleList: 12,
    cardProgress: 2,
    cardAlert: 3,

    imgElem: 4,
    imgContentElem: 8,
    marqueeElem: 5,
    btnElem: 11,
    horizontalScrollerElem: 10,

    errorPosterClass: "lazy-poster",

    btnList: 9,
    itemList: 13,
    titleList: 14,

    ACTION_CHANGE_BG_COLOR: 1,

    fontMyList: 0,
    fontVizerJs: 1,
    fontVizerSite: 2,
    fontMySite: 3,
    fontFlixeiSite: 5,
    fontCinemaoSite: 6,
    fontMfhd50Site: 7,

    methodGET: 0,
    methodPOST: 1,

    homePage: '0',
    searchPage: '1',
    moviesPage: '2',
    seriesPage: '3',
    tvPage: '4',

    developerMode: parent_getDeveloperMode(),
    baseUrl: parent_getBaseUrl(),
    tagPage: getParam('page') ?? '0',

    stPut: 0,
    stGet: 1,
    stClear: 2,
    stPutCache: 3,
    stGetCacheContent: 4,
    stGetList: 5,
    stPutList: 6,
    stAddItem: 7,
    stRemoveItem: 8,

    null: 'null'

};
const i = {
    blank: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D",
    save: "./img/save.png",
    saved: "./img/saved.png",
    more: "./img/more.png",
    logo: "./img/9.png",
    errorPoster: "./img/posterError.png",
    arrowDown: "./img/arrowDown.png",
    play: "./img/play.png",
    info: "./img/info.png",
    infos: "./img/infos.png",
    top: "./img/top.png",
    topRetangle: "./img/topRetangle.png",
    close: "./img/close.png"
};
const t = {
    assistir: "<span>Assistir</span>",
    more: "Saiba mais",
    save: "Salvar",
    saved: "Salvo",
    movieTopWeek: "<span></span> <span>Top 1 em filmes da semana</span>",
    serieTopWeek: "<span></span> <span>Top 1 em séries da semana</span>",
    movieTopType: `${requestHtml(v.imgElem, {img: i.logo, class: "small-img", isLazy: false})} <span>FILME</span>`,
    serieTopType: `${requestHtml(v.imgElem, {img: i.logo, class: "small-img", isLazy: false})} <span>SÉRIE</span>`

};
const d = {
    itemDetails: {
        itemId: '0',
        itemCardType: null,
        itemType: 'movie',
        itemTitle: 'No Limite do amanha',
        itemPoster: 'https://vizer.tv/content/series/posterPt/342/22454.webp',
        itemPosterBackground: 'https://vizer.tv/content/series/background/1280/22454.webp',
        itemDetails: {},
        itemYear: '2023',
        itemRate: '7,5'
    },
    homeMfhd50List: [
        {
            itemTitle: 'Minha lista',
            itemDesc: '',
            itemId: 'mylist',
            itemFont: v.fontMyList,
            itemCardType: v.cardPosterSeved,
            itemRequestSettings: {
                method: v.methodGET,
                url: '',
                params: '',
                validator: '',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Lançamentos',
            itemDesc: 'ESTREIAS NOS CINEMAS',
            itemId: 'movielist-1',
            itemFont: v.fontMfhd50Site,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodGET,
                url: 'https://megafilmeshd50.com/ano/2023/',
                params: '',
                validator: 'class="items full"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Brasil: top 10 da semana',
            itemDesc: '',
            itemId: 'toplist',
            itemFont: v.fontMySite,
            itemCardType: v.cardPosterTopRated,
            itemRequestSettings: {
                method: v.methodGET,
                url: v.baseUrl + '/gh/cdnuhd/cdn/toplist.html',
                params: '',
                validator: 'class="items"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Novos episódios',
            itemDesc: 'ÚLTIMAS SÉRIES ATUALIZADAS',
            itemId: 'serielist-1',
            itemFont: v.fontMfhd50Site,
            itemCardType: v.cardPosterUpdated,
            itemRequestSettings: {
                method: v.methodGET,
                url: 'https://megafilmeshd50.com/serie/',
                params: '',
                validator: 'id="archive-content"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Novos filmes',
            itemDesc: 'ÚLTIMOS FILMES ADICIONADOS',
            itemId: 'movielist-2',
            itemFont: v.fontMfhd50Site,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodGET,
                url: 'https://megafilmeshd50.com/filme/',
                params: '',
                validator: 'id="archive-content"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Novos filmes',
            itemDesc: 'ÚLTIMOS FILMES ADICIONADOS',
            itemId: 'movielist-2',
            itemFont: v.fontMfhd50Site,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodGET,
                url: 'https://megafilmeshd50.com/?s=kong',
                params: '',
                validator: 'class="result-item"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        }
    ],
    homeCinemaoList: [
        {
            itemTitle: 'Minha lista',
            itemDesc: '',
            itemId: 'mylist',
            itemFont: v.fontMyList,
            itemCardType: v.cardPosterSeved,
            itemRequestSettings: {
                method: v.methodGET,
                url: '',
                params: '',
                validator: '',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Lançamentos',
            itemDesc: 'ESTREIAS NOS CINEMAS',
            itemId: 'movielist-1',
            itemFont: v.fontCinemaoSite,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodGET,
                url: 'https://vfilmesonline.net/genero/lancamentos/',
                params: '',
                validator: 'class="items"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Brasil: top 10 da semana',
            itemDesc: '',
            itemId: 'toplist',
            itemFont: v.fontMySite,
            itemCardType: v.cardPosterTopRated,
            itemRequestSettings: {
                method: v.methodGET,
                url: v.baseUrl + '/gh/cdnuhd/cdn/toplist.html',
                params: '',
                validator: 'class="items"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Novos filmes',
            itemDesc: 'ÚLTIMOS FILMES ADICIONADOS',
            itemId: 'movielist-2',
            itemFont: v.fontCinemaoSite,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodGET,
                url: 'https://vfilmesonline.net/filme/',
                params: '',
                validator: 'id="archive-content"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Filmes populares',
            itemDesc: 'MAIS ACESSADOS DO MOMENTO',
            itemId: 'movielist-3',
            itemFont: v.fontCinemaoSite,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodGET,
                url: 'https://vfilmesonline.net/popular/',
                params: '',
                validator: 'class="items"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        }
    ],
    homeVizerList: [
        {
            itemTitle: 'Minha lista',
            itemDesc: '',
            itemId: 'mylist',
            itemFont: v.fontMyList,
            itemCardType: v.cardPosterSeved,
            itemRequestSettings: {
                method: v.methodGET,
                url: '',
                params: '',
                validator: '',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Lançamentos',
            itemDesc: 'ESTREIAS NOS CINEMAS',
            itemId: 'movielist-1',
            itemFont: v.fontVizerJs,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodPOST,
                url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                params: 'getHomeSliderMovies=1',
                validator: '"list":',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Brasil: top 10 da semana',
            itemDesc: '',
            itemId: 'toplist',
            itemFont: v.fontMySite,
            itemCardType: v.cardPosterTopRated,
            itemRequestSettings: {
                method: v.methodGET,
                url: v.baseUrl + '/gh/cdnuhd/cdn/toplist.html',
                params: '',
                validator: 'class="items"',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Novos episódios',
            itemDesc: 'ÚLTIMAS SÉRIES ATUALIZADAS',
            itemId: 'serielist-1',
            itemFont: v.fontVizerJs,
            itemCardType: v.cardPosterUpdated,
            itemRequestSettings: {
                method: v.methodPOST,
                url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                params: 'getHomeSliderSeries=1',
                validator: '"list":',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Novos filmes',
            itemDesc: 'ÚLTIMOS FILMES ADICIONADOS',
            itemId: 'movielist-2',
            itemFont: v.fontVizerJs,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodPOST,
                url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                params: 'getHomeSliderMovies=2',
                validator: '"list":',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        },
        {
            itemTitle: 'Novas séries',
            itemDesc: 'ÚLTIMAS SÉRIES ADICIONADAS',
            itemId: 'serielist-2',
            itemFont: v.fontVizerJs,
            itemCardType: v.cardPoster,
            itemRequestSettings: {
                method: v.methodPOST,
                url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                params: 'getHomeSliderSeries=2',
                validator: '"list":',
                timeExpire: 300 // 5 horas
            },
            itemList: []
        }
    ],
    fontList: [
        {
            text: 'Lista principal', 
            class:'btn mini bg-darken-btn active'
        },
        {
            text: 'Lista opcional 720p', 
            class:'btn mini bg-darken-btn'
        },
        {
            text: 'Lista opcional 1080p', 
            class:'btn mini bg-darken-btn'
        }
    ],
    colorAlpha: [
        "00","03","05","08","0A","0D","0F","12","14","17","1A","1C","1F","21","24","26","29","2B","2E","30","33","36","38","3B","3D","40","42","45","47","4A","4D","4F","52","54","57","59","5C","5E","61","63","66","69","6B","6E","70","73","75","78","7A","7D","80","82","85","87","8A","8C","8F","91","94","96","99","9C","9E","A1","A3","A6","A8","AB","AD","B0","B3","B5","B8","BA","BD","BF","C2","C4","C7","C9","CC","CF","D1","D4","D6","D9","DB","DE","E0","E3","E6","E8","EB","ED","F0","F2","F5","F","FA","FC","FF"
    ],
    itemType: [
        'movie',
        'serie'
    ]
};

const randomColors = () => {
        let color = shadeColor(randColor(), -60);
        document.documentElement.style.setProperty('--color-muted', `${color}`);
        document.documentElement.style.setProperty('--color-no-muted', `${color}`);
        document.documentElement.style.setProperty('--color-no-muted-10', `${color}10`);
        document.documentElement.style.setProperty('--color-no-muted-30', `${color}30`);
        document.documentElement.style.setProperty('--color-no-muted-50', `${color}50`);
        document.documentElement.style.setProperty('--color-no-muted-70', `${color}70`);
        document.documentElement.style.setProperty('--color-no-muted-90', `${color}90`);
}
const shadeColor = (color, percent) => {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;
const colorPercentage = (percentage) => {
    return d.colorAlpha[percentage];
};
const percentWithinViewport = (element) =>  {
    var windowHeight = $(window).height(),
        docScroll = $(document).scrollTop(),
        divPosition = element.offset().top,
        divHeight = element.height(),
        hiddenBefore = docScroll - divPosition,
        hiddenAfter = (divPosition + divHeight) - (docScroll + windowHeight);

    if ((docScroll > divPosition + divHeight) || (divPosition > docScroll + windowHeight)) {
        return 0;
    } else {
        var result = 100;

        if (hiddenBefore > 0) {
            result -= (hiddenBefore * 100) / divHeight;
        }

        if (hiddenAfter > 0) {
            result -= (hiddenAfter * 100) / divHeight;
        }

        return Math.floor(result);
    }
};


function init() { 
    changeAppToolBarColor('appbar_layout', '#00000000');
    initPage(v.tagPage);
    documentElem.on( "scroll", (event) => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight);
        let scrollPercentRounded = Math.round(scrollPercent * 100);

        let contentElem = $('.content');
        if(contentElem[0]) {
            let color = document.documentElement.style.getPropertyValue('--color-muted');
            let viewPercent = percentWithinViewport($('.view-flags')) ?? 0;
            let viewPercentAccelerate = (100 - viewPercent) * 2;
            viewPercentAccelerate = (viewPercentAccelerate > 90) ? 90 : viewPercentAccelerate;
            //let floatPercent = ((100 - viewPercent) / 100) * 2;
            //floatPercent = (floatPercent > 1.0) ? 1.0 : floatPercent;
            //let intPercent = (100 - viewPercent) * 2;
            //intPercent = (intPercent > 100) ? 100 : intPercent;

            let colorPercent = colorPercentage(viewPercent);
            let colorPercentAccelerate = colorPercentage(viewPercentAccelerate)

            contentElem.css('background-color', `${color + colorPercent}`);
            changeAppToolBarColor('appbar_layout', `#${colorPercentAccelerate}000000`);
        }
    });
}
function initPage(type) {
    if(!containerElem.html().includes('progress-content')) {
        containerElem.html(requestHtml(v.cardProgress)).ready(() => {
            changeAppToolBarColor('appbar_layout', '#00000000');
        });
    }
    switch(type) {
        case v.homePage: {
            Promise.all(d.homeVizerList.map(async data => {
                data.itemList = contentListToJsonList(data, (data.itemId === 'mylist') ? requestStorageData(v.stGetList, 'bunkerMyList') : await callAndroidAsync(data.itemRequestSettings));
                return data;
            })).then(data => {
                let topData = requestStorageData(v.stGetList, { id: 'bunkerTopRatedList' });
                topData = objCheck(topData) ? getDataInListByValue(topData, ['itemType', d.itemType[Math.floor(Math.random() * d.itemType.length)]])[0] : getDataInListByValue(data, ['itemCardType', v.cardPoster])[0].itemList[0];
                
                containerElem.html(requestHtml(v.cardHomeContent, [
                    topData,
                    data
                ]
                ));
            });
            break;
        }
        case v.searchPage: { 
            break; 
        }
        case v.moviesPage: { 
            break; 
        }
        case v.seriesPage: { 
            break; 
        }
        case v.tvPage: { 
            break; 
        }
    }
}
function lazyObserver(elem) {
    let lastIntersection = new IntersectionObserver(async (entries) => {
        let entry = entries[0];
        if (!entry.isIntersecting) return;
        let uri = await imgPromise(elem.getAttribute('data-src'), elem.getAttribute('class'));
        elem.removeAttribute('data-src');
        elem.removeAttribute('onload');
        elem.setAttribute('src', uri);
        lastIntersection.unobserve(elem);
    }, 
    {
        root: null,
        threshold: 0.1
    });
    
    lastIntersection.observe(elem);
}
async function lazyLoader(elem){
    let uri = await imgPromise(elem.getAttribute('data-src'), elem.getAttribute('class'));
    elem.removeAttribute('data-src');
    elem.removeAttribute('onload');
    elem.setAttribute('src', uri);
}
async function imgPromise(uri, className) {
    return await new Promise(resolve =>{
        try {
            var img = new Image();
            img.src = uri;
            img.onload = () => resolve(uri);
            img.onerror = () => resolve(imageErrorReturn(className));
        }catch(err) {
            resolve(imageErrorReturn(className));
        }
    });
    
}
async function callAndroidAsync(data) {
    let retry = 0;
    const rand = `asyncJava_${encodeString(data.url + data.params)}`;
    const cacheDataOrErr = requestStorageData(v.stGetCacheContent, { id: rand, timeExpire: data.timeExpire });
    window[rand] = {};
    window[rand].init = (result) => {
        const isValidData = valCheck(data.validator) && decodeHTMLEntities(result).includes(data.validator);
        const dataOrErr = (valCheck(data.validator)) ? (isValidData) ? result : v.null : result;
        if(isValidData) requestStorageData(v.stPutCache, { id: rand, content: dataOrErr });

        window[rand].resolve(dataOrErr);
    }
    window[rand].run = () => {
        try {
            window.wv.runAsync(rand, JSON.stringify(data));
        }catch (err) {
            let url = (data.url.includes("/gh/cdnuhd/cdn/")) ? data.url : 'https://nplazers.in/req.php?data=' + btoa(JSON.stringify(data));
            fetch(url)
            .then(response => response.text())
            .then((result) => {
                window[rand].init(result);
            })
            .catch(err => {
                window[rand].init(v.null);
            });
        }
        console.log(retry + data.url);
    }
    
    if(valCheck(cacheDataOrErr)) setTimeout(() => window[rand].resolve(cacheDataOrErr), 0); 
    else window[rand].run();
    
    return new Promise((resolve, reject) => {
        window[rand].resolve = (dataOrErr) => {
            if(!valCheck(dataOrErr) && retry <= 5) {
                window[rand].run();
                retry++;
            }else {
                resolve(dataOrErr);
                delete window[rand];
            }
        };
    });
}

function imageErrorReturn(value) {
    if(value.search(v.errorPosterClass) > -1) {
        return i.errorPoster;
    }
    return i.blank;
}
function valCheck(v) {
    return (v === '' || typeof v === 'undefined' || v === null || v === 'null') ? false : true;
}
function objCheck(obj) {
    return Object.keys(obj).length !== 0;
}
function valReturn(v) {
    try {
        return (v === '' || typeof v === 'undefined' || v === null || v === 'null') ? '' : v;
    } catch(err) {
        return '';
    }
}

function isMarquee(textWidth, maxWidth) {
    return textWidth[0] >= maxWidth || textWidth[1] ? true : false;
}
function getTextWidth(obj) {
    const id = Math.random().toString(16).slice(2);
    $('html').append(`<div id="${id}" class="${obj[1]} text-size"><span>${obj[0]}</span></div>`);
    const elem = $('html').find('#' + id);
    const width = elem.find('span').width();
    const isMarquee = elem.find('span').width() >= elem.width();
    elem.remove();
    return [width, isMarquee];
}
function getDataInListByValue(data, code) {
    try {
        if(valCheck(code[2])) {
            return data.filter((data) => { return (data[code[0]] == code[1]); })[0][code[2]];
        }
        return data.filter((data) => { return data[code[0]] == code[1]; });
    }catch (err) {}
    return null;
}
function getObjectByName(data, name) {
    try {
        return data[name];
    }catch (err) {}
    return null;
}
function randColor() {
    let r = ('0'+(Math.random()*256|0).toString(16)).slice(-2),
        g = ('0'+(Math.random()*256|0).toString(16)).slice(-2),
        b = ('0'+(Math.random()*256|0).toString(16)).slice(-2);
    return '#'+r+g+b;
}
function decodeHTMLEntities(text) {
    try {
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];
    
        for (var i = 0, max = entities.length; i < max; ++i)
            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
    
        return text;
    } catch(err) {
        return text;
    }
}
function encodeLetterToNumber(str) {
    const start = 96;
    const len = str.length;
    const out = [...str.toLowerCase()].reduce((out, char, pos) => {
        const val = char.charCodeAt(0) - start
        const pow = Math.pow(26, len - pos - 1);
        return out + val * pow
    }, 0)
    return out;
}
function encodeString(string, base) {
    var number = "0x";
    var length = string.length;
    for (var i = 0; i < length; i++)
        number += string.charCodeAt(i).toString(16);
    return number;
}
function getBodyContent(content) {
    content = content.split('<body')[1].split('</body')[0];
    return `<body${content}</body>`;
}
function getPathNameByPosition(str, pos) {
    try {
        return str.replace(/^.*\/\/[^\/]+/, '').split("/")[pos];
    } catch(err) {
        return '';
    }
}
function changeAppToolBarColor(id, color) {
    try {
        window.wv.sendBroadCast(v.tagPage, `{
            "action": ${v.ACTION_CHANGE_BG_COLOR},
            "viewId": "${id}",
            "bgColor": "${color}"
        }`);
    } catch(err) {}
}


function contentListToJsonList(data, value) {
    const list = [], content = decodeHTMLEntities(value);

    switch(data.itemFont) {
        case v.fontMySite: {
            try {
                let elem = $(content);
                elem.find('div').each(function() {
                    let el = $(this);
                    let item = {};

                    item.itemId = valReturn(el.attr('data-itemid'));
                    item.itemCardType = valReturn(el.attr('data-itemcardtype'));
                    item.itemType = valReturn(el.attr('data-itemtype'));
                    item.itemTitle = valReturn(el.attr('data-itemtitle'));
                    item.itemPoster = valReturn(el.attr('data-itemposter'));
                    item.itemPosterBackground = valReturn(el.attr('data-itemposterbackground'));
                    item.itemDetails = JSON.parse(atob(valReturn(el.attr('data-itemdetails') ?? 'e30=')));
                    item.itemYear = valReturn(el.attr('data-itemyear'));
                    item.itemRate = valReturn(el.attr('data-itemrate'));
                    
                    list.push(item);
                });

                if(data.itemId === 'toplist' && objCheck(list)) requestStorageData(v.stPutList, { id: 'bunkerTopRatedList', content: list });
            } catch(err) { console.log(err); }
            break;
        }
        case v.fontVizerJs: {
            try {
                let json = JSON.parse(content);
                $.each(json.list, function(i, d) {
                    let item = {};

                    let url = valReturn(d.url);
                    let id = valReturn(d.id);
                    let type = (!valCheck(d.status)) ? 'movie' : 'serie'
                    let title = valReturn(d.title);
                    let poster = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/posterPt/185/${id}.webp`);
                    let posterBackground = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/background/1280/${id}.jpg`);
                    let year = valReturn(d.year);
                    let rate = valReturn(d.rating);
                    

                    item.itemId = valReturn(`vizer-${url}`);
                    item.itemCardType = null;
                    item.itemType = type;
                    item.itemTitle = title;
                    item.itemPoster = poster;
                    item.itemPosterBackground = posterBackground;
                    item.itemDetails = {
                        itemType: valReturn(`vizer-${type}`),
                        itemId: valReturn(`${id}`),
                        itemName: valReturn(`${title}`),
                        itemYear: valReturn(`${year}`)
                    };
                    item.itemYear = valReturn(year);
                    item.itemRate = valReturn(rate);
                    
                    list.push(item);
                });
            } catch(err) { console.log(err); }
            break;
        }
        case v.fontVizerSite: {
            try {
                let elem = $(getBodyContent(content));
                elem.find('.listItems:last a').each(function() {
                    let el = $(this);
                    let item = {};

                    let url = valReturn(getPathNameByPosition(el.attr('href'), 2));
                    let id = valReturn(getPathNameByPosition(el.find('img').attr('src'), 5).split('.')[0]);
                    let type = valReturn(getPathNameByPosition(el.attr('href'), 0).replace('filme', 'movie').replace('series', 'serie'));
                    let title = valReturn(el.find('.infos span').text());
                    let poster = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/posterPt/185/${id}.webp`);
                    let posterBackground = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/background/1280/${id}.jpg`);
                    let year = valReturn(el.find(type === 'movie' ? '.y' : '.r').text());
                    let rate = valReturn(el.find(type === 'movie' ? '.r' : '.y').text());

                    item.itemId = `vizer-${url}`;
                    item.itemCardType = null;
                    item.itemType = type;
                    item.itemTitle = title;
                    item.itemPoster = poster;
                    item.itemPosterBackground = posterBackground;
                    item.itemDetails = {
                        itemType: `vizer${type}`,
                        itemId: `${id}`,
                        itemName: `${title}`,
                        itemYear: `${year}`
                    };
                    item.itemYear = year;
                    item.itemRate = rate;
                    
                    list.push(item);
                });
            } catch(err) { console.log(err); }
            break;
        }
        case v.fontFlixeiSite: {
            try {
                let elem = $(getBodyContent(content));
                elem.find('.generalMoviesList:last a').each(function() {
                    let el = $(this);
                    let item = {};

                    let url = valReturn(getPathNameByPosition(el.attr('href'), 2));
                    let id = valReturn(getPathNameByPosition(el.find('img').attr('src'), 5).split('.')[0]);
                    let type = valReturn(getPathNameByPosition(el.attr('href'), 1).replace('filme', 'movie').replace('series', 'serie'));
                    let title = valReturn(el.find('.i span').text());
                    let poster = valReturn(`https://flixei.com/content/${type === 'movie' ? 'movies' : 'series'}/posterPt/185/${id}.webp`);
                    let posterBackground = valReturn(`https://flixei.com/content/${type === 'movie' ? 'movies' : 'series'}/background/1280/${id}.jpg`);
                    let year = valReturn(el.find('.y').text());
                    let rate = valReturn(el.find('.r').text());

                    item.itemId = `vizer-${url}`;
                    item.itemCardType = null;
                    item.itemType = type;
                    item.itemTitle = title;
                    item.itemPoster = poster;
                    item.itemPosterBackground = posterBackground;
                    item.itemDetails = {
                        itemType: `vizer-${type}`,
                        itemId: `${id}`,
                        itemName: `${title}`,
                        itemYear: `${year}`
                    };
                    item.itemYear = year;
                    item.itemRate = rate;
                    
                    list.push(item);
                });
            } catch(err) { console.log(err); }
            break;
        }
        case v.fontCinemaoSite: {
            try {
                let elem = $(getBodyContent(content));
                elem.find('.items:last article, .result-item:last article').each(function() {
                    let el = $(this);
                    let item = {};

                    let url = valReturn(getPathNameByPosition(el.find('a').attr('href'), 2));
                    let type = valReturn(getPathNameByPosition(el.find('a').attr('href'), 1).replace('filme', 'movie').replace('series', 'serie'));
                    let title = valReturn(el.find('img').attr('alt').split(' (')[0]);
                    let poster = valReturn(el.find('img').attr('data-wpfc-original-src') ?? el.find('img').attr('src')).replace('-150x150','-185x278');
                    let posterBackground = valReturn(el.find('img').attr('data-wpfc-original-src') ?? el.find('img').attr('src')).replace('-185x278', '');
                    let year = valReturn(el.find('.year').text() !== '' ? el.find('.year').text() : el.find('.data span').text().split(', ')[1]);
                    let rate = valReturn(el.find('.rating').text().split(' ')[1] ?? el.find('.rating').text());

                    item.itemId = `cinemao-${url}`;
                    item.itemCardType = null;
                    item.itemType = type;
                    item.itemTitle = title;
                    item.itemPoster = poster;
                    item.itemPosterBackground = posterBackground;
                    item.itemDetails = {
                        itemType: `cinemao-${type}`,
                        itemName: `${title}`,
                        itemYear: `${year}`
                    };
                    item.itemYear = year;
                    item.itemRate = rate;

                    if(type === 'movie') {
                        list.push(item);
                    }
                });
            } catch(err) { console.log(err); }
            break;
        }
        case v.fontMfhd50Site: {
            try {
                let elem = $(getBodyContent(content));
                elem.find('#archive-content:last article, .csearch:last .result-item article, .items:last article').each(function() {
                    let el = $(this);
                    let item = {};

                    let url = valReturn(getPathNameByPosition(el.find('a').attr('href'), 2));
                    let type = valReturn(getPathNameByPosition(el.find('a').attr('href'), 1).replace('filme', 'movie').replace('series', 'serie'));
                    let title = valReturn(el.find('img').attr('alt').split(' (')[0]);
                    let poster = valReturn(el.find('img').attr('data-wpfc-original-src') ?? el.find('img').attr('src')).replace('-150x150','-185x278').replace('w92', 'w185');
                    let posterBackground = valReturn(el.find('img').attr('data-wpfc-original-src') ?? el.find('img').attr('src')).replace('-185x278', '').replace('w185', 'original').replace('w92', 'original');
                    let year = valReturn(el.find('.year').text() !== '' ? el.find('.year').text() : el.find('.data span').text().split(', ')[1]);
                    let rate = valReturn(el.find('.rating').text().split(' ')[1] ?? el.find('.rating').text());

                    item.itemId = `mfhd50-${url}`;
                    item.itemCardType = null;
                    item.itemType = type;
                    item.itemTitle = title;
                    item.itemPoster = poster;
                    item.itemPosterBackground = posterBackground;
                    item.itemDetails = {
                        itemType: `mfhd50-${type}`,
                        itemName: `${title}`,
                        itemYear: `${year}`
                    };
                    item.itemYear = year;
                    item.itemRate = rate;

                    if(!poster.includes('i.imgur.com')) {
                        list.push(item);
                    }
                });
            } catch(err) { console.log(err); }
            break;
        }
        default: {}
    }
    console.log(list);
    return list;
}

init();

parent_sucess_script = true;