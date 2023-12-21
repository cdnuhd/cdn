const bodyElem = $("body"),
htmlElem = $("html"),
containerElem = $(".container"),
documentElem = $(document),
searchAreaElem =  $('.search-box'),
searchInputElem = $('.search-box input'),
searchFormElem = $('.search-box form'),
searchVoiceBtnElem = $('.voice-btn'),
searchClearBtnElem = $('.clear-btn'),
searchContainerElem = $('.search-container'),
searchResultsContainerElem = $('.search-results'),
callback = {
    abortAllPromises: () => {
        callback.fetchPendingPromises
        .filter(key => window[key] ? true : false)
        .map(key => window[key].reject());
    },
    fetchPendingPromises: []
};
let ytPlayer;
const requestHtml = (type = -1, data) => {
    switch(type) {
        case v.cardTitleList: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(omit(data, 'itemList'))));
            const itemTitle = decodeURIFormat(data.itemTitle ?? '')
            const itemDesc = data.itemDesc ?? '';
            const itemId = data.itemId ?? '';
            const itemScrollType = data.itemScrollType ?? v.horizontalScrollerElem;
            const itemScrollAlert = data.itemScrollAlert ?? v.errorInEmpty;
            
            const itemMylistHide = (itemScrollAlert === v.errorInEmpty && !injectObjCheck(data.itemList ?? [])) ? ' hide' : '';
            const itemTitleAreaHide = (itemTitle === '' && itemDesc === '') ? 'hide' : '';
            
            return `<div class="card-item-content${itemMylistHide}" data-list-id="${itemId}" data-list-details="${itemEncodedData}">
                <div class="card-item-title-content width-spaces ${itemTitleAreaHide}">
                    <div class="desc">${itemDesc}</div>
                    <div class="title">${itemTitle}</div>
                </div>
                ${requestHtml(itemScrollType,
                    {
                        itemScrollAlert: itemScrollAlert,
                        content: requestHtml(v.itemList, data)
                    }
                )}
            </div>`;
        }
        case v.cardPosterFull: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const itemPosterBackground = data.itemPosterBackground ?? i.errorPoster;
            const itemType = data.itemType ?? '';
            const itemTitle = decodeURIFormat(data.itemTitle ?? '');
            const itemId = data.itemId ?? '';

            const imgSave = d.userDB.myListStore.checkItemData(itemId) ? i.saved : i.save;
            const itemIsMarquee = isMarquee(getTextWidth([itemTitle, 'card-top-title']), 300);
            generateSystemColors(randColor(itemPosterBackground));
            
            return `<div class="card-poster-full-content">
                <section>
                    <div class="card-poster width-spaces" data-id="${itemId}" data-details="${itemEncodedData}">
                        ${requestHtml(v.imgElem, {img: itemPosterBackground, class: "lazy-poster", isLazy: true})}
                
                        <div class="card-info-content">
                            <div class="card-top-desc-content">
                                <div class="card-top-type darken-text">${itemType === "movie" ? t.movieTopType : t.serieTopType}</div>
                                <div class="card-top-title ${itemIsMarquee ? 'is-marquee' : 'no-marquee'}">${requestHtml(v.marqueeElem, {value: itemTitle, isMarquee: itemIsMarquee})}</div>
                                <div class="card-top-week">${itemType === "movie" ? t.movieTopWeek : t.serieTopWeek}</div>
                            </div>
        
        
                            <section class="section-horizontal-list expand-first">
                                ${requestHtml(v.btnList, [
                                    {
                                        text: t.assistir,
                                        class: 'btn larger bg-white ripple bold retangle',
                                        attrs: `data-action="${v.actionOpenDetails}"`,
                                        imgSettings: {
                                            leftImg: i.playBlack,
                                            leftClass: 'large-img-left'
                                        }
                                    },
                                    {
                                        class: 'btn larger bg-darken-btn ripple retangle save',
                                        attrs: `data-action="${v.actionToggleSaveItem}"`,
                                        imgSettings: {
                                            leftImg: imgSave,
                                            leftClass: 'large-img'
                                        }
                                    },
                                    {
                                        class: 'btn larger bg-darken-btn retangle ripple',
                                        attrs: `data-action="${v.actionOpenDetails}"`,
                                        imgSettings: {
                                            leftImg: i.info,
                                            leftClass: 'large-img'
                                        }
                                    }
                                ])}
                            </section>
                        </div>
                    </div>
                    ${requestHtml(v.horizontalScrollerElem, { class: 'anim-changes font-list', content: requestHtml(v.btnList, d.fontButtonList) })}
                </section>
            </div>`;
        }
        case v.cardPoster: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const itemPoster = data.itemPoster ?? i.errorPoster;
            const itemId = data.itemId ?? '';
            const itemTitle = decodeURIFormat(data.itemTitle ?? '')

            const itemTopRated = topRatedCheck(d.userDB.topRatedList(), itemTitle);

            return `<div class="item-content" data-id="${itemId}" data-details="${itemEncodedData}">
                <div class="item" data-action="${v.actionOpenDetails}">
                    ${requestHtml(v.imgContentElem, {
                        contentClass: itemTopRated ? 'item-poster top' : 'item-poster',
                        img: itemPoster,
                        class: 'lazy-poster',
                        isLazy: true,
                        isObserver: true
                    })}
                </div>
            </div>`;
        }
        case v.cardPosterSeved: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const itemPoster = data.itemPoster ?? i.errorPoster;
            const itemId = data.itemId ?? '';
            const itemTitle = decodeURIFormat(data.itemTitle ?? '')
            
            const itemTopRated = topRatedCheck(d.userDB.topRatedList(), itemTitle);

            return `<div class="item-content" data-id="${itemId}" data-details="${itemEncodedData}">
                <div class="item" data-action="${v.actionOpenDetails}">
                    ${requestHtml(v.imgContentElem, {
                        contentClass:  itemTopRated ? 'item-poster item-borded-options top' : 'item-poster item-borded-options',
                        img: itemPoster,
                        class: 'lazy-poster',
                        isLazy: true,
                        isObserver: true
                    })}

                    <div class="item-options">
                        ${requestHtml(v.btnList, [{
                            class: 'btn mini bg-borded-white-btn ripple',
                            attrs: `data-action="${v.actionRemoveSaved}"`,
                            imgSettings: {
                                leftImg: i.closeWhite,
                                leftClass: ''
                            }
                        }])}
                    </div>
                </div>
            </div>`;
        }
        case v.cardPosterTopRated: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const itemPoster = data.itemPoster ?? i.errorPoster;
            const itemId = data.itemId ?? '';
            const itemTitle = decodeURIFormat(data.itemTitle ?? '')

            const itemTopRated = topRatedCheck(d.userDB.topRatedList(), itemTitle);
            
            return `<div class="item-content" data-id="${itemId}" data-details="${itemEncodedData}">
                <section class="item item-rated" data-action="${v.actionOpenDetails}">
                    <div class="count-area"></div>
                    ${requestHtml(v.imgContentElem, {
                        contentClass: itemTopRated ? 'item-poster top' : 'item-poster',
                        img: itemPoster,
                        class: 'lazy-poster',
                        isLazy: true,
                        isObserver: true
                    })}
                </section>
            </div>`;
        }
        case v.cardPosterLiked: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const itemPosterBackground = data.itemPosterBackground ?? i.errorPoster;
            const itemId = data.itemId ?? '';
            const itemTitle = decodeURIFormat(data.itemTitle ?? '');
            const itemRate = data.itemRate ?? '5.0';

            const imgSave = d.userDB.myListStore.checkItemData(itemId) ? i.saved : i.save;
            
            return `<div class="item-content large" data-id="${itemId}" data-details="${itemEncodedData}">
                <section class="item item-liked" data-action="${v.actionOpenDetails}">
                    <div class="count-area">
                        <span class="count">${ratePercentage(itemRate)}</span>
                        <br>
                        <span class="title">${t.liked}</span>
                    </div>
                    <div class="content-area">
                        ${requestHtml(v.imgContentElem, {
                            contentClass: 'item-poster',
                            img: itemPosterBackground,
                            class: 'lazy-poster',
                            isLazy: true,
                            isObserver: true
                        })}
                        <section class="section-horizontal-list">
                            ${requestHtml(v.btnList, [
                                {
                                    class: 'btn medium bg-black-borded-light ripple img-darken round save',
                                    attrs: `data-action="${v.actionToggleSaveItem}"`,
                                    imgSettings: {
                                        leftImg: imgSave,
                                        leftClass: 'large-img'
                                    }
                                }
                            ])}
                        </section>
                        <div class="item-title">${itemTitle}</div>
                    </div>
                </section>
            </div>`;
        }
        case v.cardPosterUpdated: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const itemPoster = data.itemPoster ?? i.errorPoster;
            const itemId = data.itemId ?? '';
            const itemTitle = decodeURIFormat(data.itemTitle ?? '')

            const itemTopRated = topRatedCheck(d.userDB.topRatedList(), itemTitle);

            return `<div class="item-content" data-id="${itemId}" data-details="${itemEncodedData}">
                <div class="item item-updated" data-action="${v.actionOpenDetails}">
                    ${requestHtml(v.imgContentElem, {
                        contentClass: itemTopRated ? 'item-poster top' : 'item-poster',
                        img: itemPoster,
                        class: 'lazy-poster',
                        isLazy: true,
                        isObserver: true
                    })}
                </div>
            </div>`;
        }
        case v.cardColletion: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const itemTitle = decodeURIFormat(data.itemTitle ?? '')
            let color = randColor();
            color = shadeColor(color, (colorModeCheck(color) === 'light' ? -70 : 0));

            return `<div class="item-content" data-id="${itemTitle}" data-details="${itemEncodedData}">
                <div data-action="${v.actionOpenColletion}" class="item item-colletion">
                    <div style="background-color: ${color}">
                        <img src="${i.postersBg}" style="filter: drop-shadow(0px 1000px 0 ${shadeColor(color, 70)}55); transform: translateY(-1000px);" />
                        <span>
                            <span>${t.colletion}</span>
                            <br/>
                            <span>${itemTitle}</span>
                        </span>
                    </div>
                    <div style="background-color: ${shadeColor(color, 10)}"></div>
                    <div style="background-color: ${shadeColor(color, 20)}"></div>
                </div>
            </div>`;
        }
        case v.cardChannel: {
            const itemEncodedData = btoa(encodeURIComponent(JSON.stringify(data)));
            const channelTitle = data.channelTitle ?? '';
            const channelLogo = data.channelLogo ?? '';
            const channelGuide = data.channelGuide ?? '';
            
            return `<div class="item-content-full-flex disabled inactive" data-id="${channelTitle}" data-details="${itemEncodedData}"  data-action="${v.actionOpenTvPlayerOptions}">
                <div class="item item-channel">
                    <section class="channel-infos">
                        ${requestHtml(v.imgContentElem, {
                            contentClass: 'channel-logo',
                            img: channelLogo,
                            class: '',
                            isLazy: false,
                            isObserver: false
                        })}
                    </section>
                    <div class="channel-list-guide" data-guide-id="${channelGuide}">
                            ${requestHtml(v.cardProgress, v.progressGuide)}
                    </div>
                </div>
            </div>`;
        }
        case v.cardGuide: {
            try {
                let currentDateTime = new Date();
                let formattedTime = String(currentDateTime.getHours()).padStart(2, '0') + ":" + String(currentDateTime.getMinutes()).padStart(2, '0');
                let resultHtml = (injectObjCheck(data)) ? "" : `<section>
                    <div class="guide-time">${formattedTime}</div>
                    <div class="guide-title-area">
                        <div class="title">${t.titleNoProgams}</div>
                        <div class="desc">${t.messageNoProgams}</div>
                    </div>
                </section>`;
    
                try {
                    if(!valCheck(resultHtml)) {
                        data.map((data, index) => {
                            const guideTitle = data.guideTitle ?? '';
                            const guideDesc = valReturn(data.guideDesc ?? '', t.entretenimento);
                            const guideTime = data.guideTime ?? '';
        
                            resultHtml += `<section>
                                <div class="guide-time">${guideTime}</div>
                                <div class="guide-title-area">
                                    <div class="title">${guideTitle}</div>
                                    <div class="desc">${guideDesc}</div>
                                </div>
                                ${(index === 0) ? requestHtml(v.btnList, d.guideButtonList) : '<button class="btn medium round empty invisible"></button>'}
                            </section>`;
                        });
                    }
                    return resultHtml;
                } catch (err) {}
                return resultHtml;
            }
            catch(err) {}
            return '';
        }
        case v.cardPlayer: {
            const playerType = data.playerType ?? v.playerTv;
            const playerServers = data.playerServers ?? [];
            let resultHtml = (injectObjCheck(playerServers)) ? '' : requestHtml(v.cardAlert, { type: v.errorInPlayerOptions });

            if(resultHtml === '') {
                switch(playerType) {
                    case v.playerVizerSerie:
                    case v.playerVizer: {
                        resultHtml += `<div class="content alert width-spaces">
                            <div class="alert-area">
                                <center>
                                    <div class="title">Escolha o idioma desse video</div>
                                    <br>
                                    <br>
                                    <section class="section-horizontal-list">
                                    ${requestHtml(v.btnList, playerServers.map(data => {
                                        const lang = data.lang ?? '';
                                        const id = data.id ?? '';
                                        
                                        return {
                                            class:'btn big bg-white ripple bold',
                                            attrs: `data-action="${v.actionLoadLangServers}" data-id="${id}"`,
                                            text: lang
                                        }
                                    }))}
                                    </section>
                                </center>
                            </div>
                        </div>`;
                        break;
                    }
                    default: {
                        playerServers.map(data => {
                            const playerTitle = data.title ?? t.titlePlayerPrincipal;
                            const playerDesc = data.desc ?? t.descPlayerRecomended;
                            const playerEmbed = data.embed ?? false;
                            const playerUrl = playerEmbed ? data.url : data.url;
            
                            resultHtml += `<section class="item-player width-spaces" data-url="${playerUrl}" data-embed="${playerEmbed}" data-type="${playerType}">
                                <div class="player-info">
                                    <div class="title">${playerTitle}</div>
                                    <div class="desc">${playerDesc}</div>
                                </div>
                                <div class="player-options">
                                    ${requestHtml(v.btnList, d.playerButtonList)}
                                </div>
                            </section>`;
                        });
                        resultHtml += `
                        
                        <div class="share">
                            <div class="title width-spaces">${t.titleShare}</div>
                            <div class="horizontal-scroller">
                                <section class="section-horizontal-list width-spaces-scroll">
                                    ${requestHtml(v.btnList, d.shareButtonList)}
                                </section>
                            </div>
                            <div class="utils width-spaces">
                                <div class="title">${t.titleUtils}</div>
                                ${requestHtml(v.btnList, d.utilsButtonList)}
                            </div>
                        </div>`;
                        break;
                    }
                }
            }
            return resultHtml;
        }
        case v.cardSeason: {
            const season = data.season ?? '';
            const seasonId = data.seasonId ?? '';

            return `<div class="item-season" data-season-id="${seasonId}" data-season="${season}" data-action="${v.actionLoadEpisodes}"><span>${season}</span></div>`;
        }
        case v.cardHistoryText: {
            const itemId = data.itemId ?? '';

            return `<section class="section-line" data-search-val="${itemId}">
                <button class="btn medium empty no-left-space"><img src="${i.historyDarken}"></button>
                <button class="btn expanded text-normal text-ellipsis submit" data-action="${v.actionOpenSearchBox}">${itemId}</button>
                <button class="btn medium empty no-right-space" data-action="${v.actionOpenSearchBox}"><img src="${i.arrowUpDarken}"></button>
            </section>`;
        }
        case v.cardDetailsContent: {
            try {
                const itemEncodedData = getParam('data') ?? 'e30=';
                const itemPoster = data.itemPoster ?? i.errorPoster;
                const itemPosterBackground = data.itemPosterBackground ?? i.errorPoster;
                const itemType = data.itemType ?? '';
                const itemTitle = decodeURIFormat(data.itemTitle ?? '');
                const itemId = data.itemId ?? '';
                const itemSinopse = data.itemSinopse ?? '';
                const itemTmdbTrailer = data.itemTmdbTrailer ?? '';
                const itemYear = data.itemYear ?? '';
                const itemRate = valCheck(data.itemRate) ? (data.itemRate ?? '5.7') : '5.7';
                const itemGeners = data.itemGeners ?? [];
                const itemTopRated = topRatedCheck(d.userDB.topRatedList(), itemTitle);
                const itemSuggestionsOrSeasonsData = data.itemSuggestionsData ?? data.itemSeasonsData ?? [];
                const itemPlayerType = (data.itemDetails.itemType ?? 'vizer')?.split('-')[0];
                const itemPlayerServers = btoa(encodeURIComponent(JSON.stringify(data.playerServers ?? []))) ?? 'W10=';
                ytPlayer = new YTPlayer(itemTmdbTrailer);
                ytPlayer.ytCallback = {
                    onReady: (event) => {
                        const ytPlayerBtnElem = $('.trailer-btn');
                        ytPlayerBtnElem.changeHtml(v.btnList, [{
                            class:'btn extra ripple bold',
                            attrs: `data-action="${v.actionPlayTrailer}"`,
                            imgSettings: {
                                leftImg: i.playerWhite,
                                leftClass: 'large-img'
                            }
                        }]);
                        ytPlayer.ytPlayer.setPlaybackRate('highres');
                        
                    },
                    onChange: (event) => {
                        const ytPlayerContentElem = $('.item-trailer-content');
                        if (event.data == YT.PlayerState.PLAYING) {
                            ytPlayer.ytTimer = setInterval(() => ytPlayer.ytCallback.onProgress(), 0);
                            ytPlayerContentElem.addClass('active');
                        } 
                        else ytPlayerContentElem.removeClass('active');
                        if(event.data === 0 || event.data == YT.PlayerState.PAUSED) {
                            ytPlayerContentElem.find('.trailer-progress span').css('width', '0px');
                            clearInterval(ytPlayer.ytTimer);
                            ytPlayer.ytPlayer.pauseVideo();
                            ytPlayer.ytPlayer.seekTo(0);
                        }
                    },
                    onError: () => ytPlayer.isError = true,
                    onPlay: () => {
                        if(ytPlayer.isError) {
                            if(window.wv) window.wv.showActionSnackBar(t.messageErrorTrailer);
                            else console.log(t.messageErrorTrailer);
                        } else ytPlayer.ytPlayer.playVideo();
                    },
                    onProgress: () => {
                        ytPlayer.progress = $('.item-trailer-content').width() * (ytPlayer.ytPlayer.getCurrentTime() / ytPlayer.ytPlayer.getDuration());
                        ytPlayer.percentage  = parseInt((100 * parseInt(ytPlayer.progress)) / parseInt($('.item-trailer-content').width()));
                        $('.trailer-progress span').css('width', ytPlayer.progress + (ytPlayer.percentage / 3));
                    }
                };

                return `<div class="content">
                    <section class="item-details" data-id="${itemId}" data-details="${itemEncodedData}">
                        <div class="item-trailer-content">
                            <div class="trailer-content">
                                ${requestHtml(v.imgElem, {
                                    img: itemPosterBackground,
                                    class: 'bg',
                                    isLazy: true,
                                    isObserver: true
                                })}
                                <div class="trailer-btn">
                                    ${(valCheck(itemTmdbTrailer)) ? requestHtml(v.progressBarElem, { class: 'pr progress-img white larger' }) : ''}
                                </div>
                                <div class="preview">
                                    ${(valCheck(itemTmdbTrailer)) ? t.preview : t.noPreview}
                                </div>
                                <div class="frame">
                                    <div id="player"></div>
                                </div>
                            </div>

                            <div class="trailer-progress">
                                <span></span>
                            </div>
                        </div>
                        <div class="item-details-content">
                            <div class="scroller">
                                <div class="poster width-spaces">
                                    ${requestHtml(v.imgContentElem, {
                                        contentClass: itemTopRated ? 'item-poster top' : 'item-poster',
                                        img: itemPoster,
                                        class: 'lazy-poster',
                                        isLazy: true,
                                        isObserver: true
                                    })}
                                </div>
                                <div class="title width-spaces">
                                    ${itemTitle}
                                </div>
                                <div class="details width-spaces">
                                    <span class="percentage">${ratePercentage(itemRate)} gostaram.</span>
                                    <span class="rate">${itemRate} / 10</span>
                                    <span class="year">${itemYear}</span>
                                </div>
                                ${requestHtml(v.horizontalScrollerElem, { class: 'anim-changes buttons', content: requestHtml(v.btnList, d.optionsButtonList(itemId, itemType, itemPlayerType, itemPlayerServers)) })}
                                <div class="sinopse width-spaces">
                                    ${itemSinopse}
                                </div>
                                <div class="geners width-spaces">
                                    ${itemGeners.join(' | ')}
                                </div>
                                <div class="suggestionsOrSeasons">
                                    ${requestHtml(v.titleList, itemSuggestionsOrSeasonsData)}
                                </div>
                                <div class="episodes"></div>
                            </div>
                        </div>
                    </section>
                </div>`;
            } catch (err) {}
            return requestHtml(v.cardAlert, { type: v.errorInContainer });
        }
        case v.cardHomeContent: {
            try {
                const topRatedData = data.map(({ itemId, itemList, itemCardType }) => {
                    if(itemId === 'siteTopRated') d.userDB.topRatedStore.replaceList(itemList);
                    const realTopRatedList = d.userDB.topRatedList().filter((({ itemType }) => itemType === d.itemType[Math.floor(Math.random() * d.itemType.length)])) ?? [];
                    return (injectObjCheck(realTopRatedList) ? realTopRatedList : itemList) ?? [];
                })[data.length-1] ?? [];
               
                if(injectObjCheck(topRatedData)) {
                    return `<div class="content">
                        <div class="view-flags"></div>
                        ${requestHtml(v.cardPosterFull, topRatedData[Math.floor(Math.random() * topRatedData.length)])}
                        <div id="list">
                            ${requestHtml(v.titleList, data)}
                        </div>
                    </div>`;
                }else {
                    return requestHtml(v.cardAlert, { type: v.errorInContainer });
                }
            }catch(err) {}
            return requestHtml(v.cardAlert, { type: v.errorInContainer });
        }
        case v.cardSearchContent: {
            try {
                const resultHtml = $(`<div class="content"><div id="list">${requestHtml(v.titleList, data)}</div></div>`);
                
                resultHtml.find('[data-list-id=historySearch]').appendHtml(v.btnList, [
                    {
                        class: `show-search-history btn larger margin-center ripple round ${(d.userDB.searchList().length <= 5) ? 'inactive' : ''}`,
                        attrs: `onclick="$('[data-list-id=historySearch]').addClass('show-all');"`,
                        imgSettings: {
                            leftImg: i.arrowDownDarken,
                            leftClass: 'large-img'
                        }
                    }
                ]);
                return resultHtml[0];
            }catch(err) { console.log(err); }
            return requestHtml(v.cardAlert, { type: v.errorInContainer });
        }
        case v.cardSearchResultsContent: {
            try {
                const resultHtml = $(`<div>${requestHtml(v.titleList, data.filter(({itemList}) => injectObjCheck(itemList)).map(({ itemTitle, ...rest}) => rest))}</div>`);
                const fontButtonList = data
                .filter(({ itemList }) => injectObjCheck(itemList))
                .map((data, index) => {
                    const activeClass = index === 0 ? ' active': '';
                    const itemTitle = decodeURIFormat(data.itemTitle ?? '')
                    const itemId = data.itemId ?? '';

                    return {
                        text: itemTitle,
                        class: `btn mini bg-darken-btn${activeClass}`,
                        attrs: `data-action="${v.actionChangeVisibleList}" data-cat-id="${itemId}"`
                    }
                });

                resultHtml.find('.card-item-content:first-of-type').addClass('active');
                return injectObjCheck(fontButtonList) ?
                `${requestHtml(v.horizontalScrollerElem, { class: 'anim-changes font-list', content: requestHtml(v.btnList, fontButtonList) })}
                <div id="list">${resultHtml.html()}</div>`
                :
                requestHtml(v.cardAlert, { type: v.errorInSearchResult });
            }catch(err) {}
            return requestHtml(v.cardAlert, { type: v.errorInSearchResult });
        }
        case v.cardTvContent: {
            try {
                const resultHtml = $(`<div>${requestHtml(v.titleList, data.filter(({itemList}) => injectObjCheck(itemList)).map(({ itemTitle, ...rest}) => rest))}</div>`);
                const fontButtonList = [{
                    text: t.titleAll,
                    class: `btn mini bg-darken-btn active`,
                    attrs: `data-action="${v.actionChangeVisibleList}" data-cat-id="all"`
                }, ...data
                .filter(({ itemList }) => injectObjCheck(itemList))
                .map((data) => {
                    const itemTitle = decodeURIFormat(data.itemTitle ?? '')
                    const itemId = data.itemId ?? '';

                    return {
                        text: itemTitle,
                        class: `btn mini bg-darken-btn`,
                        attrs: `data-action="${v.actionChangeVisibleList}" data-cat-id="${itemId}"`
                    }
                })];

                resultHtml.find('.card-item-content').addClass('active');
                return injectObjCheck(fontButtonList) ?
                `${requestHtml(v.horizontalScrollerElem, { class: 'anim-changes font-list', content: requestHtml(v.btnList, fontButtonList) })}
                
                <div class="scroller">
                    <div id="list">
                        ${resultHtml.html()}
                    </div>
                </div>`
                :
                requestHtml(v.cardAlert, { type: v.errorInContainer });
            }catch(err) {}
            return requestHtml(v.cardAlert, { type: v.errorInContainer });
        }
        case v.cardCategoriesContent: {
            const catType = data.catType ?? '';
            const catActive = data.catActive ?? '';
            const itemList = d.categoriesButtonList[catType] ?? [];

            return `<div class="cat">
                <div class="cat-content" style="visibility: hidden">
                    <section>
                        <center>
                            ${requestHtml(v.btnList, itemList)}
                        </center>
                    </section>
                </div>
                ${requestHtml(v.imgElem, {
                    img: i.closeBgWhite,
                    attrs: `data-action="${v.actionCloseCategories}"`,
                    class: 'cat-close-img'
                })}
            </div>
            <script>
                $('.cat-content *:contains("${catActive}")').addClass('active').ready(function(){   
                    $('.cat-content button.active')[0].scrollIntoView({
                        behavior: 'instant',
                        block: 'center',
                        inline: 'center'
                    });
                    $('.cat-content').removeAttr('style');
                });
            </script>`;
        }
        case v.cardBottomSheetContent: {
            const itemTitle = decodeURIFormat(data.itemTitle ?? '')

            return `<div class="item-bottomsheet">
                <section class="title-content width-spaces">
                    <div class="title expanded text-ellipsis">${itemTitle}</div>
                    <button class="btn big empty no-right-space ripple" data-action="${v.actionCloseBottomSheet}"><img src="${i.closeBgWhite}"></button>
                </section>
                <div id="list">
                    ${data.content ?? ''}
                </div>
            </div>`;
        }
        case v.cardProgress: {
            switch(data) {
                case v.progressPage: {
                    generateSystemColors('#000000');
                    switch(v.tagPage) {
                        case v.homePage:
                        case v.moviesPage:
                        case v.seriesPage: {
                            return `<div class="content progress">
                                <div class="view-flags"></div>
                                <div class="card-poster-full-content">
                                    <section>
                                        <div class="card-poster width-spaces">
                                            <div class="card-info-content">
                                                <div class="card-top-desc-content">
                                                    <div class="card-top-type darken-text"></div>
                                                    <div class="card-top-title no-marquee"></div>
                                                    <div class="card-top-week"></div>
                                                </div>
                                                <section class="section-horizontal-list expand-first">
                                                    <button class="btn larger bg-white ripple bold retangle icon-left"></button>
                                                    <button class="btn larger bg-darken-btn ripple retangle save icon-left empty"></button>
                                                    <button class="btn larger bg-darken-btn retangle ripple icon-left empty"></button>
                                                </section>
                                            </div>
                                        </div>
                                        <div class="horizontal-scroller options">
                                            <section class="section-horizontal-list width-spaces">
                                                <button class="btn mini bg-darken-btn active"></button>
                                                <button class="btn mini bg-darken-btn"></button>
                                                <button class="btn mini bg-darken-btn"></button>
                                            </section>
                                        </div>
                                    </section>
                                </div>
                                <div id="list">
                                    <div class="card-item-content">
                                        <div class="card-item-title-content width-spaces">
                                            <div class="desc"></div>
                                            <div class="title"></div>
                                        </div>
                                        <div class="horizontal-scroller">
                                            <section class="section-vertical-list width-spaces">
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="card-item-content">
                                        <div class="card-item-title-content width-spaces">
                                            <div class="desc"></div>
                                            <div class="title"></div>
                                        </div>
                                        <div class="horizontal-scroller">
                                            <section class="section-vertical-list width-spaces">
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="card-item-content">
                                        <div class="card-item-title-content width-spaces">
                                            <div class="desc"></div>
                                            <div class="title"></div>
                                        </div>
                                        <div class="horizontal-scroller">
                                            <section class="section-vertical-list width-spaces">
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="card-item-content">
                                        <div class="card-item-title-content width-spaces">
                                            <div class="desc"></div>
                                            <div class="title"></div>
                                        </div>
                                        <div class="horizontal-scroller">
                                            <section class="section-vertical-list width-spaces">
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        }
                        case v.searchPage: {
                            return `<div class="content progress no-anim">
                                <div id="list">
                                    <div class="card-item-content" data-list-id="historySearch">
                                        <div class="vertical-scroller">
                                            <section class="section-vertical-list width-spaces">
                                                <section class="section-line">
                                                    <button class="btn medium empty no-left-space"></button>
                                                    <button class="btn expanded text-normal text-ellipsis"></button>
                                                    <button class="btn medium empty no-right-space"></button>
                                                </section>
                                                <section class="section-line">
                                                    <button class="btn medium empty no-left-space"></button>
                                                    <button class="btn expanded text-normal text-ellipsis"></button>
                                                    <button class="btn medium empty no-right-space"></button>
                                                </section>
                                                <section class="section-line">
                                                    <button class="btn medium empty no-left-space"></button>
                                                    <button class="btn expanded text-normal text-ellipsis"></button>
                                                    <button class="btn medium empty no-right-space"></button>
                                                </section>
                                                <section class="section-line">
                                                    <button class="btn medium empty no-left-space"></button>
                                                    <button class="btn expanded text-normal text-ellipsis"></button>
                                                    <button class="btn medium empty no-right-space"></button>
                                                </section>
                                                <section class="section-line">
                                                    <button class="btn medium empty no-left-space"></button>
                                                    <button class="btn expanded text-normal text-ellipsis"></button>
                                                    <button class="btn medium empty no-right-space"></button>
                                                </section>
                                            </section>
                                        </div>
                                        <button class="show-search-history btn larger margin-center ripple round  icon-left empty"></button>
                                    </div>
                                    <div class="card-item-content">
                                        <div class="card-item-title-content width-spaces">
                                            <div class="desc"></div>
                                            <div class="title"></div>
                                        </div>
                                        <div class="horizontal-scroller">
                                            <section class="section-vertical-list width-spaces">
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                                <div class="item-content">
                                                    <div class="item">
                                                        <div class="item-poster"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="card-item-content">
                                        <div class="card-item-title-content width-spaces">
                                            <div class="desc"></div>
                                            <div class="title"></div>
                                        </div>
                                        <div class="vertical-scroller">
                                            <section class="section-vertical-list width-spaces">
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <div class="item-content large">
                                                    <section class="item item-liked">
                                                        <div class="count-area">
                                                        </div>
                                                        <div class="content-area">
                                                            <div class="item-poster">
                                                            </div>
                                                            <section class="section-horizontal-list">
                                                                <button class="btn medium bg-black-borded-light ripple img-darken round icon-left empty"></button>
                                                            </section>
                                                            <div class="item-title"></div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        }
                        case v.tvPage: {
                            return `<div class="content progress no-anim">
                                <div class="horizontal-scroller options">
                                    <section class="section-horizontal-list width-spaces">
                                        <button class="btn mini bg-darken-btn active"></button>
                                        <button class="btn mini bg-darken-btn"></button>
                                        <button class="btn mini bg-darken-btn"></button>
                                    </section>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-content-full-flex width-spaces">
                                    <div class="item item-channel">
                                        <section class="channel-infos">
                                            <div class="channel-logo">
                                                <div></div>
                                            </div>
                                        </section>
                                        <div class="channel-list-guide">
                                            <section class="guide">
                                                <div class="guide-time"></div>
                                                <div class="guide-title-area">
                                                    <div class="title"></div>
                                                    <div class="desc"></div>
                                                </div>
                                                <button class="btn medium round"></button>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                        </div>`;
                        }
                        case v.dialogPage: {
                            return `<div class="progress alert">
                                <div class="alert-area">
                                    <div class="progress-img larger wrap white">
                                        <svg viewBox="0 0 50 50">
                                            <circle cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>`;
                        }
                        case v.errorPage: {
                            return `<div class="progress alert">
                                <div class="alert-area">
                                    <div class="progress-img larger wrap white">
                                        <svg viewBox="0 0 50 50">
                                            <circle cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>`;
                        }
                        case v.detailsPage: {
                            return `<div class="content progress">
                                <section class="item-details">
                                    <div class="item-trailer-content">
                                        <div class="trailer-content">
                                            <div class="lazy bg"></div>
                                            <div class="trailer-btn">
                                                <button class="btn extra ripple bold icon-left empty"></button>
                                            </div>
                                            <div class="preview"></div>
                                            <div class="frame"></div>
                                        </div>
                                        <div class="trailer-progress"><span></span></div>
                                    </div>
                                    <div class="item-details-content">
                                        <div class="scroller">
                                            <div class="poster width-spaces">
                                                <div class="item-poster"></div>
                                            </div>
                                            <div class="title width-spaces"></div>
                                            <div class="details width-spaces"></div>
                                            <div class="horizontal-scroller anim-changes buttons">
                                                <section class="section-horizontal-list width-spaces-scroll">
                                                    <button class="btn larger bg-white ripple bold retangle icon-left"></button>
                                                    <button class="btn larger bg-darken-btn round ripple icon-left empty"></button>
                                                    <button class="btn larger bg-darken-btn ripple round icon-left empty"></button>
                                                    <button class="btn larger bg-darken-btn ripple round save icon-left empty"></button>
                                                    <button class="btn larger bg-darken-btn round ripple icon-left empty"></button>
                                                </section>
                                            </div>
                                            <div class="sinopse width-spaces"></div>
                                            <div class="geners width-spaces"></div>
                                            <div class="suggestions">
                                                <div class="card-item-content">
                                                    <div class="card-item-title-content width-spaces ">
                                                        <div class="desc"></div>
                                                        <div class="title"></div>
                                                    </div>
                                                    <div class="horizontal-scroller ">
                                                        <section class="section-horizontal-list width-spaces-scroll">
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                            <div class="item-content">
                                                                <div class="item">
                                                                    <div class="item-poster"></div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>
                            </div>`;
                        }
                    }
                }
                case v.progressSearchResult: {
                    return `<div class="progress">
                        <div class="horizontal-scroller anim-changes font-list">
                            <section class="section-horizontal-list width-spaces-scroll">
                                <button class="btn mini bg-darken-btn"></button>
                                <button class="btn mini bg-darken-btn"></button>
                                <button class="btn mini bg-darken-btn"></button>
                            </section>
                        </div>
                        <div id="list">
                            <div class="vertical-scroller active">
                                <section class="section-vertical-list width-spaces">
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                    <div class="item-content">
                                        <div class="item">
                                            <div class="item-poster"></div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>`;
                }
                case v.progressTitledHorizontal: {
                    return `<div class="progress mini">
                        <div class="card-item-content">
                            <div class="card-item-title-content width-spaces">
                                <div class="desc"></div>
                                <div class="title"></div>
                            </div>
                            <div class="horizontal-scroller">
                            <section class="section-horizontal-list width-spaces">
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                            </section>
                            </div>
                        </div>
                        <div class="card-item-content">
                            <div class="card-item-title-content width-spaces">
                                <div class="desc"></div>
                                <div class="title"></div>
                            </div>
                            <div class="horizontal-scroller">
                            <section class="section-horizontal-list width-spaces">
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                            </section>
                            </div>
                        </div>
                    </div>`;
                }
                case v.progressNoTitledVertical: {
                    return `<div class="progress mini">
                        <div class="card-item-content">
                            <div class="vertical-scroller">
                            <section class="section-vertical-list width-spaces">
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <div class="item">
                                        <div class="item-poster"></div>
                                    </div>
                                </div>
                            </section>
                            </div>
                        </div>
                    </div>`;
                }
                case v.progressBar: {
                    return `<div class="progress alert">
                        <div class="alert-area">
                            <div class="progress-img larger wrap white">
                                <svg viewBox="0 0 50 50">
                                    <circle cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>`;
                }
                case v.progressGuide: 
                {
                    return `<section class="progress guide">
                        <div class="guide-time"></div>
                        <div class="guide-title-area">
                            <div class="title"></div>
                            <div class="desc"></div>
                        </div>
                        <button class="btn medium bg-darken-50-solid round empty"></button>
                    </section>`;
                }
                default: {
                    return ``;
                }
            }
        }
        case v.cardAlert: {
            const status = (navigator.onLine) ? v.errorOfflineServer : v.errorOffline;
            switch(data.type) {
                case v.errorInContainer: {
                    return `<div class="content alert width-spaces">
                        <div class="alert-area">
                            <section>    
                                ${requestHtml(v.imgElem, {
                                    img: i.logoAlert,
                                    class: 'medium',
                                    isObserver: false,
                                    isLazy: false
                                })}
                                <div class="title">${d.errorTextList.errorInContainer.titles[status]}</div>
                                <div class="message">${d.errorTextList.errorInContainer.messages[status]}</div>
                                <section class="section-horizontal-list">
                                    ${requestHtml(v.btnList, d.errorButtonList.errorInContainer)}
                                </section>
                            </section>
                        </div>
                    </div>`;
                }
                case v.errorInList: {
                    return `<div class="alert">
                        <div class="alert-area">
                            <section>    
                                ${requestHtml(v.imgElem, {
                                    img: i.logoAlert,
                                    class: 'medium',
                                    isObserver: false,
                                    isLazy: false
                                })}
                                <div class="title">${d.errorTextList.errorInList.titles[status]}</div>
                                <div class="message">${d.errorTextList.errorInList.messages[status]}</div>
                                <section class="section-horizontal-list">
                                    ${requestHtml(v.btnList, d.errorButtonList.errorInList)}
                                </section>
                            </section>
                        </div>
                    </div>`;
                }
                case v.errorInScroller: {
                    return `<div class="alert">
                        <div class="alert-area">
                            <section>    
                                <div class="message">${d.errorTextList.errorInScroller.messages[1]}</div>
                                <section class="section-horizontal-list">
                                    ${requestHtml(v.btnList, d.errorButtonList.errorInScroller)}
                                </section>
                            </section>
                        </div>
                    </div>`;
                }
                case v.errorInSearchResult: {
                    return status === v.errorOfflineServer ? 
                    `<div class="vertical-scroll-enabled">
                        <div class="no-results width-spaces">
                            <div class="message">${t.messageNoResult.replace('$', `<b>${$('[data-list-id=resultsSearch]').attr('data-val') ?? ''}</b>`)}</div>
                        </div>
                        <br>
                        <br>
                        ${$('[data-list-id=topRated]').prop('outerHTML') ?? ''}
                    </div>` : 
                    `<div class="alert width-spaces">
                        <div class="alert-area disable-space">
                            <section>    
                                ${requestHtml(v.imgElem, {
                                    img: i.logoAlert,
                                    class: 'medium',
                                    isObserver: false,
                                    isLazy: false
                                })}
                                <div class="title">${d.errorTextList.errorInSearchResult.titles[status]}</div>
                                <div class="message">${d.errorTextList.errorInSearchResult.messages[status]}</div>
                                 <section class="section-horizontal-list">
                                    ${requestHtml(v.btnList, d.errorButtonList.errorInSearchResult)}
                                </section>
                            </section>
                        </div>
                    </div>`;
                }
                case v.errorInEmbed: {
                    return `<div class="alert">
                        <div class="alert-area">
                            <section>    
                                ${requestHtml(v.imgElem, {
                                    img: i.sad,
                                    class: 'medium',
                                    isObserver: false,
                                    isLazy: false
                                })}
                                <div class="title">${t.titleOfflinePlayer}</div>
                                <div class="message">${t.messageOfflinePlayer}</div>
                                <section class="section-horizontal-list">
                                    ${requestHtml(v.btnList, d.errorButtonList.errorInEmbed)}
                                </section>
                            </section>
                        </div>
                    </div>`;
                }
                case v.errorInPlayerOptions: {
                    return  `<div class="alert width-spaces">
                        <div class="alert-area">
                            <section>    
                                ${requestHtml(v.imgElem, {
                                    img: i.sad,
                                    class: 'medium',
                                    isObserver: false,
                                    isLazy: false
                                })}
                                <div class="title">${t.titleOfflinePlayer}</div>
                                <div class="message">${t.messageOfflinePlayerOptions}</div>
                            </section>
                        </div>
                    </div>`;
                }
                case v.errorInDns: {
                    return `<div class="message-alert width-spaces">
                        ${t.messageResolveDns}
                        <section class="section-horizontal-list">
                            ${requestHtml(v.btnList, d.errorButtonList.errorInDns)}
                        </section>
                    </div>`;
                }
                case v.errorInSeason: {
                    return `<div class="alert-season">
                        <div class="title">${t.messageErrorSeasons}</div>
                        <button class="btn larger bg-darken-btn ripple round save icon-left empty" data-action="${v.actionRetryScrollerList}"><img class="lazy large-img" src="${i.retryWhite}"></button>
                    </div>`;
                }
                case v.errorInUserRegister: {
                    return `<div class="alert-intro width-spaces">
                        <div class="title-area">
                            <div class="logo">
                                ${requestHtml(v.imgElem, {
                                    img: i.logoMark,
                                    class: 'lazy-poster',
                                    isLazy: false,
                                    isObserver: false
                                })}
                            </div>
                            <div class="title">${t.titleWelcome}</div>
                            <div class="desc">${t.messageTerms}</div>
                        </div>
                        <div class="terms vertical-scroller">
                            <section class="section-vertical-list">
                                ${requestHtml(v.btnList, d.termsButtonList)}
                            </section>
                        </div>
                        <div class="button">
                            ${requestHtml(v.btnList, [{
                                class: 'btn medium bg-white round ripple bold',
                                attrs: `data-action="${v.actionRegisterUser}"`,
                                text: t.termsAgre
                            }])}
                        </div>
                    </div>`;
                }
                case v.errorInUpdate: {
                    return `<div class="alert-update width-spaces">
                        <div class="title-area">
                            <div class="logo">
                                ${requestHtml(v.imgElem, {
                                    img: i.logoMark,
                                    class: 'lazy-poster',
                                    isLazy: false,
                                    isObserver: false
                                })}
                            </div>
                            <br><br>
                            <div class="title">${t.titleUpdate}</div>
                            <div class="desc">${t.messageUpdate}</div>
                        </div>
                        <div class="terms vertical-scroller">
                            <section class="section-vertical-list">
                                ${requestHtml(v.btnList, d.updateButtonList)}
                            </section>
                        </div>
                        <div class="button">
                            ${requestHtml(v.btnList, [{
                                class: 'btn medium bg-white round ripple bold',
                                attrs: `onclick="if(window.wv) window.wv.openLink('https://9max.wap.sh'); else window.open('https://9max.wap.sh', '_blank');"`,
                                text: t.updateAgre
                            }])}
                        </div>
                    </div>`;
                }
                default: return '';
            }
        }

        case v.progressBarElem: {
            const attrs = data.attrs ?? '';
            const className = data.class ?? '';
            return `<div class="${className}"${attrs}><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle></svg></div>`;
        }
        case v.imgElem: {
            const atts = data.attrs ?? '';
            const img = data.img ?? '';
            const className = data.class ?? '';
            const isObserver = (data.isObserver ?? false === true) ? `onload="lazyObserver(this)"` : `onload="lazyLoader(this)"`;
            const isLazy = (data.isLazy ?? false) ? `src="${i.blank}" data-src="${img}" ${isObserver}` : `src="${img}"`;

            return `<img class="lazy ${className}" ${atts} ${isLazy} />`;
        }
        case v.imgContentElem: { 
            const atts = data.attrs ?? '';
            const contentClass = data.contentClass ?? '';
            const img = data.img ?? '';
            const className = data.class ?? '';
            const isObserver = (data.isObserver ?? false === true) ? `onload="lazyObserver(this)"` : `onload="lazyLoader(this)"`;
            const isLazy = (data.isLazy ?? false) ? `src="${i.blank}" data-src="${img}" ${isObserver}` : `src="${img}"`;
            
            return `<div class="${contentClass}" ${atts}>
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
            const className = data.class ?? '';
            const attrs = data.attrs ?? '';
            const text = data.text ?? '';

            return `<button class="${className}" ${attrs}>${text}</button>`;
        }
        case v.horizontalScrollerElem: {
            const className = data.class ?? '';
            const content = data.content ?? '';
            const itemScrollAlert = data.itemScrollAlert ?? v.errorInScroller;
            const itemIsContent = valCheck(content) || itemScrollAlert === v.errorInEmpty;

            return `<div class="horizontal-scroller${itemIsContent ? '' : ' error'} ${className}">
                <section class="section-horizontal-list width-spaces-scroll">
                    ${(itemIsContent) ? content : requestHtml(v.cardAlert, { type: itemScrollAlert })}
                </section>
            </div>`;
        }
        case v.verticalScrollerElem: {
            const className = data.class ?? '';
            const content = data.content ?? '';
            const itemScrollAlert = data.itemScrollAlert ?? v.errorInList;
            const itemIsContent = valCheck(content) || itemScrollAlert === v.errorInEmpty;

            return `<div class="vertical-scroller ${className}">
                <section class="section-vertical-list width-spaces">
                    ${itemIsContent ? content : requestHtml(v.cardAlert, { type: itemScrollAlert })}
                </section>
            </div>`;
        }

        case v.btnList: {
            let resultHtml = '';
            try {
                data.map(data => {
                    const text = (valCheck(data.text)) ? `<span>${data.text}</span>` : '';
                    const className = data.class ?? '';
                    const attrs = data.attrs ?? '';

                    const isLeftIcon = valCheck(data.imgSettings) ? valCheck(data.imgSettings.leftImg) : false;
                    const isRightIcon = valCheck(data.imgSettings) ? valCheck(data.imgSettings.rightImg) : false;
                    const isRightLazy = valCheck(data.imgSettings) ? valCheck(data.imgSettings.rightLazy) : false;
                    const isLefttLazy = valCheck(data.imgSettings) ? valCheck(data.imgSettings.leftLazy) : false;
                    const imgLeft = (isLeftIcon) ? requestHtml(v.imgElem, {class: data.imgSettings.leftClass ?? '' + ' left', img: data.imgSettings.leftImg ?? '', isLazy: isLefttLazy, isObserver: isLefttLazy}) : '';
                    const imgRight = (isRightIcon) ? requestHtml(v.imgElem, {class: data.imgSettings.rightClass ?? '' + ' right', img: data.imgSettings.rightImg ?? '', isLazy: isRightLazy, isObserver: isRightLazy}) : '';

                    resultHtml += requestHtml(v.btnElem, {
                        class: (className) + (isLeftIcon ? ' icon-left' : '') + (isRightIcon ? ' icon-right' : '') + (!valCheck(text) ? ' empty' : ''),
                        attrs: attrs,
                        text: imgLeft + text + imgRight
                    });
                });
            }
            catch(err) {}
            return resultHtml;
        }
        case v.itemList: {
            let resultHtml = '';
            const itemList = injectObjCheck(data.itemList) ? data.itemList : null;
            const itemCardType = valCheck(data.itemCardType) ? parseInt(data.itemCardType) : v.cardPoster;
            const itemRandomize = data.itemRandomize ?? true;
            const itemEndless = data.itemEndless ?? false;

            try {
                (itemRandomize ? shuffle(itemList) : itemList).map(data => {
                    const cardType = valCheck(data.itemCardType) ? parseInt(data.itemCardType) : itemCardType;
                    resultHtml += requestHtml(cardType, data);
                });
                resultHtml += (itemEndless) ? requestHtml(v.progressBarElem, {
                    class: 'item-content-full progress-img big wrap white',
                    attrs: ' data-endless-id="endless" data-loading="false" data-page="0"'
                }) : '';
            }
            catch(err) {}
            
            return resultHtml;
        }
        case v.titleList: {
            let resultHtml = '';
            try {
                data.map(data => resultHtml += requestHtml(v.cardTitleList, data));
            }catch(err) {}
            
            return resultHtml;
        }
    }
}
const requestLoadList = (type) => {
    switch(type) {
        case v.moviesPage: {
            return {
                vizer: [
                    {
                        itemTitle: '',
                        itemDesc: '',
                        itemId: 'vizerMovie',
                        itemScrollType: v.verticalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: true,
                        itemScrollAlert: v.errorInList,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                            params: '',
                            validator: '"list":',
                            timeExpire: v.timeExpire,
                            font: v.fontVizerJs
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = await promiseFetch(d.pageList.vizer[index]);
                            return d.pageList.vizer[index];
                        }
                    }
                ],
                cinemao: [
                    {
                        itemTitle: '',
                        itemDesc: '',
                        itemId: 'cinemaoMovie',
                        itemScrollType: v.verticalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: true,
                        itemScrollAlert: v.errorInList,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: 'https://vfilmesonline.net/filme/',
                            params: '',
                            validator: 'id="archive-content"',
                            timeExpire: v.timeExpire,
                            font: v.fontCinemaoSite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.cinemao[index].itemList = await promiseFetch(d.pageList.cinemao[index]);
                            return d.pageList.cinemao[index];
                        }
                    }
                ]
            };
        }
        case v.seriesPage: {
            return {
                vizer: [
                    {
                        itemTitle: '',
                        itemDesc: '',
                        itemId: 'vizerSerie',
                        itemScrollType: v.verticalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: true,
                        itemScrollAlert: v.errorInList,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=all&anime=0&search=&saga=0&categoryFilterYearMin=1950&categoryFilterYearMax=2100&categoryFilterOrderBy=vzViews&categoryFilterOrderWay=desc&page=0',
                            params: '',
                            validator: '"list":',
                            timeExpire: v.timeExpire,
                            font: v.fontVizerJs
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = await promiseFetch(d.pageList.vizer[index]);
                            return d.pageList.vizer[index];
                        }
                    }
                ]
            };
        }
        case v.searchPage: {
            return [
                {
                    itemTitle: '',
                    itemDesc: '',
                    itemId: 'historySearch',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardHistoryText,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.userDB.getList(v.storeSearch);
                        return d.pageList[index];
                    }
                },
                {
                    itemTitle: t.titleLastViewed,
                    itemDesc: '',
                    itemId: 'historyViewed',
                    itemScrollType: v.horizontalScrollerElem,
                    itemCardType: v.cardPoster,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.userDB.getList(v.storeItem);
                        return d.pageList[index];
                    }
                },
                {
                    itemTitle: t.titleLiked,
                    itemDesc: t.descLikedPopuar,
                    itemId: 'topRated',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardPosterLiked,
                    itemRandomize: true,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.userDB.getList(v.storeTopRated);
                        return d.pageList[index];
                    }
                }
            ]
        }
        case v.tvPage: {
            return [
                {
                    itemTitle: t.titlePopularChannel,
                    itemDesc: '',
                    itemId: 'popularChannels',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardChannel,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.channelList.popular;
                        return d.pageList[index];
                    }
                },
                {
                    itemTitle: t.titleNewsChannel,
                    itemDesc: '',
                    itemId: 'newsChannels',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardChannel,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.channelList.news;
                        return d.pageList[index];
                    }
                },
                {
                    itemTitle: t.titleMoviesAndSeriesChannel,
                    itemDesc: '',
                    itemId: 'moviesAndSeriesChannels',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardChannel,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.channelList.moviesAndSeries;
                        return d.pageList[index];
                    }
                },
                {
                    itemTitle: t.titleSportsChannel,
                    itemDesc: '',
                    itemId: 'sportsChannels',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardChannel,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.channelList.sports;
                        return d.pageList[index];
                    }
                },
                {
                    itemTitle: t.titleKidsChannel,
                    itemDesc: '',
                    itemId: 'kidsChannels',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardChannel,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.channelList.kids;
                        return d.pageList[index];
                    }
                },
                {
                    itemTitle: t.titleDocumentarieChannel,
                    itemDesc: '',
                    itemId: 'documentariesChannels',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardChannel,
                    itemRandomize: false,
                    itemEndless: false,
                    itemScrollAlert: v.errorInEmpty,
                    itemList: [],
                    setItemList: async(index) => {
                        d.pageList[index].itemList = d.channelList.documentaries;
                        return d.pageList[index];
                    }
                }
            ];
        }
        case v.detailsPage: {
            const itemDecodeData = (parseJSON(getParam('data') ?? 'e30=') ?? {});
            const itemRouter = itemDecodeData?.itemId ?? '';
            const itemQuery = encodeURIComponent(itemDecodeData?.itemDetails?.itemName ?? '');
            const itemYear = itemDecodeData?.itemDetails?.itemYear ?? '';
            const itemType = itemDecodeData?.itemDetails?.itemType ?? '';

            switch(itemType) {
                case 'vizer-movie': {
                    return {
                        itemRequest: [
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: 'https://vizer.tv/filme/online/' + itemRouter,
                                    params: '',
                                    validator: '"list":',
                                    timeExpire: v.timeExpire,
                                    font: v.fontVizerSite
                                }
                            },
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: `https://api.themoviedb.org/3/search/movie?api_key=fcc1be0c88f74c3478f6d09f36bb9a37&language=pt-BR&page=1&include_adult=false&query=${itemQuery}&year=${itemYear}`,
                                    params: '',
                                    validator: '"results":',
                                    timeExpire: v.timeExpire,
                                    font: v.fontTmdbJs
                                }
                            },
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: `https://api.themoviedb.org/3/movie/$/videos?api_key=fcc1be0c88f74c3478f6d09f36bb9a37&language=pt-BR`,
                                    params: '',
                                    validator: '"results":',
                                    timeExpire: v.timeExpire,
                                    font: v.fontTmdbTrailerJs
                                }
                            },
                            {
                                itemTitle: t.titleLiked,
                                itemDesc: '',
                                itemId: 'topRated',
                                itemScrollType: v.horizontalScrollerElem,
                                itemCardType: v.cardPoster,
                                itemRandomize: true,
                                itemEndless: false,
                                itemScrollAlert: v.errorInEmpty,
                                itemList: [],
                                setItemList: async() => {
                                    d.pageList.itemRequest[3].itemList = d.userDB.getList(v.storeTopRated);
                                    return d.pageList.itemRequest[3];
                                }
                            }
                        ],
                        init: async() => {
                            const data = {...itemDecodeData, ...await promiseFetch(d.pageList.itemRequest[0]), ...await promiseFetch(d.pageList.itemRequest[1])};
                            
                            if((data.itemTmdbId ?? 0) !== 0) {
                                d.pageList.itemRequest[2].itemRequestSettings.url = d.pageList.itemRequest[2].itemRequestSettings.url.replace('$', data.itemTmdbId);
    
                                return {...data, ...await promiseFetch(d.pageList.itemRequest[2]), itemSuggestionsData: await promiseAllList([d.pageList.itemRequest[3]])};
                            } else return {...data, itemTmdbTrailer: '', itemSuggestionsData: await promiseAllList([d.pageList.itemRequest[3]])};
                        }
                    }
                }
                case 'vizer-serie': {
                    return {
                        itemRequest: [
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: `https://api.themoviedb.org/3/search/tv?api_key=fcc1be0c88f74c3478f6d09f36bb9a37&language=pt-BR&page=1&include_adult=false&query=${itemQuery}&year=${itemYear}`,
                                    params: '',
                                    validator: '"results":',
                                    timeExpire: v.timeExpire,
                                    font: v.fontTmdbJs
                                }
                            },
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: `https://api.themoviedb.org/3/tv/$/videos?api_key=fcc1be0c88f74c3478f6d09f36bb9a37&language=pt-BR`,
                                    params: '',
                                    validator: '"results":',
                                    timeExpire: v.timeExpire,
                                    font: v.fontTmdbTrailerJs
                                }
                            },
                            {
                                itemTitle: 'Escolha uma temporada',
                                itemDesc: '',
                                itemId: 'seasons',
                                itemScrollType: v.horizontalScrollerElem,
                                itemCardType: v.cardSeason,
                                itemRandomize: false,
                                itemEndless: false,
                                itemScrollAlert: v.errorInSeason,
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: 'https://vizer.tv/serie/online/' + itemRouter,
                                    params: '',
                                    validator: 'class="list bslider"',
                                    timeExpire: v.timeExpire,
                                    font: v.fontVizerSite
                                },
                                itemList: [],
                                setItemList: async() => {
                                    d.pageList.itemRequest[2].itemList = await promiseFetch(d.pageList.itemRequest[2]);
                                    return d.pageList.itemRequest[2];
                                }
                            }
                        ],
                        init: async() => {
                            const data = {...itemDecodeData, ...await promiseFetch(d.pageList.itemRequest[0])};
                            
                            if((data.itemTmdbId ?? 0) !== 0) {
                                d.pageList.itemRequest[1].itemRequestSettings.url = d.pageList.itemRequest[1].itemRequestSettings.url.replace('$', data.itemTmdbId);
    
                                return {...data, ...await promiseFetch(d.pageList.itemRequest[1]), itemSeasonsData: await promiseAllList([d.pageList.itemRequest[2]])};
                            } else return {...data, itemTmdbTrailer: '', itemSeasonsData: await promiseAllList([d.pageList.itemRequest[2]])};
                        }
                    }
                }
                case 'cinemao-movie': {
                    return {
                        itemRequest: [
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: 'https://vfilmesonline.net/filme/' + itemRouter + '/',
                                    params: '',
                                    validator: 'class="metaframe',
                                    timeExpire: v.timeExpire,
                                    font: v.fontCinemaoSite
                                }
                            },
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: `https://api.themoviedb.org/3/search/movie?api_key=fcc1be0c88f74c3478f6d09f36bb9a37&language=pt-BR&page=1&include_adult=false&query=${itemQuery}&year=${itemYear}`,
                                    params: '',
                                    validator: '"results":',
                                    timeExpire: v.timeExpire,
                                    font: v.fontTmdbJs
                                }
                            },
                            {
                                itemRequestSettings: {
                                    convertType: v.convertDetails,
                                    method: v.methodGET,
                                    url: `https://api.themoviedb.org/3/movie/$/videos?api_key=fcc1be0c88f74c3478f6d09f36bb9a37&language=pt-BR`,
                                    params: '',
                                    validator: '"results":',
                                    timeExpire: v.timeExpire,
                                    font: v.fontTmdbTrailerJs
                                }
                            },
                            {
                                itemTitle: t.titleLiked,
                                itemDesc: '',
                                itemId: 'topRated',
                                itemScrollType: v.horizontalScrollerElem,
                                itemCardType: v.cardPoster,
                                itemRandomize: true,
                                itemEndless: false,
                                itemScrollAlert: v.errorInEmpty,
                                itemList: [],
                                setItemList: async() => {
                                    d.pageList.itemRequest[3].itemList = d.userDB.getList(v.storeTopRated);
                                    return d.pageList.itemRequest[3];
                                }
                            }
                        ],
                        init: async() => {
                            const data = {...itemDecodeData, ...await promiseFetch(d.pageList.itemRequest[0]), ...await promiseFetch(d.pageList.itemRequest[1])};
                            
                            if((data.itemTmdbId ?? 0) !== 0) {
                                d.pageList.itemRequest[2].itemRequestSettings.url = d.pageList.itemRequest[2].itemRequestSettings.url.replace('$', data.itemTmdbId);
    
                                return {...data, ...await promiseFetch(d.pageList.itemRequest[2]), itemSuggestionsData: await promiseAllList([d.pageList.itemRequest[3]])};
                            } else return {...data, itemTmdbTrailer: '', itemSuggestionsData: await promiseAllList([d.pageList.itemRequest[3]])};
                        }
                    }
                }
                default: return {}
            }
        }
        default: {
            return {
                vizer: [
                    {
                        itemTitle: t.titleMyList,
                        itemDesc: '',
                        itemId: 'myList',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPosterSeved,
                        itemRandomize: false,
                        itemEndless: false,
                        itemScrollAlert: v.errorInEmpty,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: '',
                            params: '',
                            validator: '',
                            timeExpire: v.timeExpire,
                            font: v.fontMySite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                           d.pageList.vizer[index].itemList = d.userDB.getList(v.storeMyList);
                           return d.pageList.vizer[index];
                        }
                    },
                    {
                        itemTitle: t.titleLatestMovies,
                        itemDesc: t.descLatestMovies,
                        itemId: 'vizerMovie',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodPOST,
                            url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                            params: 'getHomeSliderMovies=1',
                            validator: '"list":',
                            timeExpire: v.timeExpire,
                            font: v.fontVizerJs
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = await promiseFetch(d.pageList.vizer[index]);
                            return d.pageList.vizer[index];
                        }
                    },
                    {
                        itemTitle: t.titleTopTen,
                        itemDesc: '',
                        itemId: 'siteTopRated',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPosterTopRated,
                        itemRandomize: false,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: v.baseUrl + '/gh/cdnuhd/cdn/toplist.php',
                            params: '',
                            validator: 'class="items"',
                            timeExpire: v.timeExpire,
                            font: v.fontMySite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = await promiseFetch(d.pageList.vizer[index]);
                            return d.pageList.vizer[index];
                        }
                    },
                    {
                        itemTitle: t.titleNewEpisodes,
                        itemDesc: t.descNewEpisodes,
                        itemId: 'vizerSerie',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPosterUpdated,
                        itemRandomize: false,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodPOST,
                            url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                            params: 'getHomeSliderSeries=1',
                            validator: '"list":',
                            timeExpire: v.timeExpire,
                            font: v.fontVizerJs
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = await promiseFetch(d.pageList.vizer[index]);
                            return d.pageList.vizer[index];
                        }
                    },
                    {
                        itemTitle: t.titleNewMovies,
                        itemDesc: t.descNewMovies,
                        itemId: 'vizerMovie',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodPOST,
                            url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                            params: 'getHomeSliderMovies=2',
                            validator: '"list":',
                            timeExpire: v.timeExpire,
                            font: v.fontVizerJs
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = await promiseFetch(d.pageList.vizer[index]);
                            return d.pageList.vizer[index];
                        }
                    },
                    {
                        itemTitle: t.titleColletion,
                        itemDesc: '',
                        itemId: 'vizerColletion',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardColletion,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = d.colletionList.vizer;
                            return d.pageList.vizer[index];
                        }
                    },
                    {
                        itemTitle: t.titleNewSeries,
                        itemDesc: t.descNewSeries,
                        itemId: 'vizerSerie',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodPOST,
                            url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                            params: 'getHomeSliderSeries=2',
                            validator: '"list":',
                            timeExpire: v.timeExpire,
                            font: v.fontVizerJs
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.vizer[index].itemList = await promiseFetch(d.pageList.vizer[index]);
                            return d.pageList.vizer[index];
                        }
                    }
                ],
                cinemao: [
                    {
                        itemTitle: t.titleMyList,
                        itemDesc: '',
                        itemId: 'myList',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPosterSeved,
                        itemRandomize: false,
                        itemEndless: false,
                        itemScrollAlert: v.errorInEmpty,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: '',
                            params: '',
                            validator: '',
                            timeExpire: v.timeExpire,
                            font: v.fontMySite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                           d.pageList.cinemao[index].itemList = d.userDB.getList(v.storeMyList);
                           return d.pageList.cinemao[index];
                        }
                    },
                    {
                        itemTitle: t.titleLatestMovies,
                        itemDesc: t.descLatestMovies,
                        itemId: 'cinemaoMovie',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: 'https://vfilmesonline.net/genero/lancamentos/',
                            params: '',
                            validator: 'class="items"',
                            timeExpire: v.timeExpire,
                            font: v.fontCinemaoSite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.cinemao[index].itemList = await promiseFetch(d.pageList.cinemao[index]);
                            return d.pageList.cinemao[index];
                        }
                    },
                    {
                        itemTitle: t.titleTopTen,
                        itemDesc: '',
                        itemId: 'siteTopRated',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPosterTopRated,
                        itemRandomize: false,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: v.baseUrl + '/gh/cdnuhd/cdn/toplist.php',
                            params: '',
                            validator: 'class="items"',
                            timeExpire: v.timeExpire,
                            font: v.fontMySite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.cinemao[index].itemList = await promiseFetch(d.pageList.cinemao[index]);
                            return d.pageList.cinemao[index];
                        }
                    },
                    {
                        itemTitle: t.titleNewMovies,
                        itemDesc: t.descNewMovies,
                        itemId: 'cinemaoMovie',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: 'https://vfilmesonline.net/filme/',
                            params: '',
                            validator: 'id="archive-content"',
                            timeExpire: v.timeExpire,
                            font: v.fontCinemaoSite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.cinemao[index].itemList = await promiseFetch(d.pageList.cinemao[index]);
                            return d.pageList.cinemao[index];
                        }
                    },
                    {
                        itemTitle: t.titleColletion,
                        itemDesc: '',
                        itemId: 'vizerColletion',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardColletion,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.cinemao[index].itemList = d.colletionList.cinemao;
                            return d.pageList.cinemao[index];
                        }
                    },
                    {
                        itemTitle: t.titlePopularMovies,
                        itemDesc: t.descPopularMovies,
                        itemId: 'cinemaoMovie',
                        itemScrollType: v.horizontalScrollerElem,
                        itemCardType: v.cardPoster,
                        itemRandomize: true,
                        itemEndless: false,
                        itemScrollAlert: v.errorInScroller,
                        itemRequestSettings: {
                            convertType: v.convertList,
                            method: v.methodGET,
                            url: 'https://vfilmesonline.net/popular/',
                            params: '',
                            validator: 'class="items"',
                            timeExpire: v.timeExpire,
                            font: v.fontCinemaoSite
                        },
                        itemList: [],
                        setItemList: async(index) => {
                            d.pageList.cinemao[index].itemList = await promiseFetch(d.pageList.cinemao[index]);
                            return d.pageList.cinemao[index];
                        }
                    }
                ]
            };
        }
    }
}
const requestFontList = (type) => {
    switch(type) {
        case v.moviesPage: {
            return [
                {
                    text: t.catAll, 
                    class:'btn mini bg-darken-btn activated',
                    attrs: `data-action="${v.actionOpenCategories}"`,
                    imgSettings: {
                        rightImg: i.arrowDown
                    }
                },
                {
                    text: t.listVizer, 
                    class:`btn mini bg-darken-btn active`,
                    attrs: `data-action="${v.actionLoadDefaultCat}" data-cat-id="vizer" data-cats="vizerMovie"`
                },
                {
                    text: t.listCinemao, 
                    class: `btn mini bg-darken-btn`,
                    attrs: `data-action="${v.actionLoadDefaultCat}" data-cat-id="cinemao" data-cats="cinemaoMovie"`
                }
            ];
        }
        case v.seriesPage: {
            return [
                {
                    text: t.catAll, 
                    class:'btn mini bg-darken-btn activated',
                    attrs: `data-action="${v.actionOpenCategories}"`,
                    imgSettings: {
                        rightImg: i.arrowDown
                    }
                },
                {
                    text: t.listVizer, 
                    class: `btn mini bg-darken-btn active`,
                    attrs: `data-action="${v.actionLoadDefaultCat}" data-cat-id="vizer" data-cats="vizerSerie"`
                }
            ];
        }
        default: {
            return [
                {
                    text: t.listVizer, 
                    class: `btn mini bg-darken-btn active`,
                    attrs: `data-action="${v.actionLoadDefaultCat}" data-cat-id="vizer"`
                },
                {
                    text: t.listCinemao, 
                    class: `btn mini bg-darken-btn`,
                    attrs: `data-action="${v.actionLoadDefaultCat}" data-cat-id="cinemao"`
                }
            ];
        }
    }
}
const requestAction = (type = -1, data = {}) => {
    switch(type) {
        case v.requestActionVoiceRecover: {
            val = data.val ?? '';
            
            if(valCheck(val)) bodyElem.append(`<div data-search-val="${val}" id="autoSubmit"><button class="submit" data-action="${v.actionOpenSearchBox}">${val}</button></div>`).ready(function() { 
                bodyElem.find('#autoSubmit .submit').trigger('click').parent(0).remove(); 
            });
            break;
        }
        case v.requestActionStartSearch: {
            const val = data.val ?? '';

            searchResultsContainerElem.addClass('active').find('[data-list-id=resultsSearch]').changeHtml(v.cardProgress, v.progressSearchResult, () => {
                setTimeout(() => {
                    promiseAllList(d.searchList, val)
                    .then(data => searchResultsContainerElem.find('[data-list-id=resultsSearch]').attr('data-val', val).attr('data-list-details', `${btoa(encodeURIComponent(JSON.stringify(data.map(({ itemList, ...rest }) => rest))))}`).changeHtml(v.cardSearchResultsContent, data))
                    .catch(err => console.log('aborted'));
                    d.userDB.searchStore.replaceItemData({ itemId: val });
                    searchResultsContainerElem.find('[data-list-id=historySearch]').animScrollTo([v.scrollVertical, 0, 300]);
                }, 300);
            });
            break;
        }
    }
}

const v = {
    defaultId: "vizer",

    cardPosterFull: 7,
    cardPoster: 1,
    cardPosterSeved: 15,
    cardPosterTopRated: 16,
    cardPosterLiked: 22,
    cardHistoryText: 23,
    cardPosterUpdated: 17,
    cardHomeContent: 6,
    cardSearchContent: 21,
    cardSearchResultsContent: 24,
    cardCategoriesContent: 27,
    cardBottomSheetContent: 25,
    cardTvContent: 28,
    cardTitleList: 12,
    cardProgress: 2,
    cardAlert: 3,
    cardColletion: 26,
    cardChannel: 29,
    cardGuide: 30,
    cardPlayer: 31,
    cardDetailsContent: 32,
    cardSeason: 33,

    imgElem: 4,
    imgContentElem: 8,
    marqueeElem: 5,
    btnElem: 11,
    horizontalScrollerElem: 10,
    verticalScrollerElem: 18,
    progressBarElem: 19,

    errorPosterClass: "lazy-poster",

    btnList: 9,
    itemList: 13,
    titleList: 14,

    ACTION_CHANGE_BG_COLOR: 1,
    ACTION_ClOSE_DIALOG: 3,
    ACTION_AUDIO_RECOGNIZER_START: 4,
    ACTION_AUDIO_RECOGNIZER_RECIVED: 5,

    fontList: 0,
    fontVizerJs: 1,
    fontVizerSite: 2,
    fontMySite: 3,
    fontFlixeiSite: 5,
    fontCinemaoSite: 6,
    fontMeuGuia: 8,
    fontTmdbJs: 9,
    fontTmdbTrailerJs: 10,

    methodGET: 0,
    methodPOST: 1,

    homePage: '0',
    searchPage: '1',
    moviesPage: '2',
    seriesPage: '3',
    tvPage: '4',
    dialogPage: '5',
    embedPage: '6',
    errorPage: '7',
    detailsPage: '8',

    developerMode: parentDeveloperMode,
    baseUrl: parentBaseUrl,
    tagPage: parentPageTag,
    lang: parentLang,

    null: 'null',

    progressPage: 0,
    progressSearchResult: 1,
    progressHomeTv: 2,
    progressPoster: (parentPageTag === '5') ? 5 : (parentPageTag === '0') ? 3 : 4,
    progressTitledHorizontal: 3,
    progressNoTitledVertical: 4,
    progressBar: 5,
    progressGuide: 6,

    timeExpire: 300, // 5 horas

    scrollVertical: 1,
    scrollHorizontal: 0,

    bunkerMyList: 'bunkerMyList',
    bunkerTopRatedList: 'bunkerTopRatedList',

    add: 0,
    remove: 1,

    errorInScroller: 0,
    errorInList: 1,
    errorInContainer: 2,
    errorInEmpty: 3,
    errorInSearchResult: 4,
    errorInEmbed: 5,
    errorInDns: 6,
    errorInPlayerOptions: 7,
    errorInSeason: 8,
    errorInUserRegister: 9,
    errorInUpdate: 10,

    requestActionVoiceRecover: 0,
    requestActionStartSearch: 1,

    errorOffline: 0,
    errorOfflineServer: 1,

    broadcastLoadCat: 0,
    broadcastCloseDialog: 1,
    broadcastOpenDialog: 2,

    storeCache: 'storeCache_0',
    storeLastViewed: 'storeLastViewed_0',
    storeMyList: 'storeMyList_0',
    storeSearch: 'storeSearch_0',
    storeItem: 'storeItem_0',
    storeTopRated: 'storeTopRated_0',
    storeUserSettings: 'storeUserSettings_0',

    actionToggleSaveItem: 0,
    actionLoadCat: 1,
    actionOpenCategories: 2,
    actionCloseCategories: 3,
    actionLoadDefaultCat: 4,
    actionRetryList: 5,
    actionRetryAllList: 6,
    actionRetryScrollerList: 7,
    actionRetryContent: 8,
    actionContact: 9,
    actionChangeVisibleList: 10,
    actionOpenSearchBox: 11,
    actionCloseSearchBox: 12,
    actionClearSearchBox: 13,
    actionAudioRecognizerSearchBox: 14,
    actionOpenColletion: 15,
    actionCloseBottomSheet: 16,
    actionShowGuideList: 17,
    actionOpenCastPlayer: 18,
    actionOpenEmbedPlayer: 19,
    actionOpenTvPlayerOptions: 20,
    actionReloadPage: 21,
    actionOpenDnsAlert: 22,
    actionOpenDetails: 23,
    actionPlayTrailer: 24,
    actionOpenPlayerOptions: 25,
    actionShare: 26,
    actionShowLastViewed: 27,
    actionLoadLangServers: 28,
    actionLoadEpisodes: 29,
    actionRemoveSaved: 30,
    actionRegisterUser: 31,

    dialogEmpty: -1,
    dialogShowCategories: 0,
    dialogShowColletion: 1,
    dialogShowPlayerOptions: 2,
    dialogShowAlert: 3,
    dialogShowIntro: 4,
    dialogShowUpdate: 5,

    playerTv: 'tv',
    playerVizerLang: 'vizerLang',
    playerVizer: 'vizer',
    playerVizerSerie: 'vizerSerie',
    playerCinemao: 'cinemao',

    convertList: 0,
    convertDetails: 1,
    convertPlayer: 2,
    convertEpisodes: 3,

    isIframe: window.frameElement
}
const i = {
    blank: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D",
    save: "./img/save.png",
    saved: "./img/saved.png",
    more: "./img/more.png",
    logo: "./img/logo.png",
    logoMark: "./img/logoMark.png",
    logoAlert: "./img/logoAlert.png",
    whats: "./img/whats.png",
    sad: "./img/sad.png",
    errorPoster: "./img/posterError.png",
    arrowDown: "./img/arrowDown.png",
    arrowUpDarken: "./img/arrowUpDarken.png",
    arrowDownDarken: "./img/arrowDownDarken.png",
    historyDarken: "./img/historyDarken.png",
    closeDarken: "./img/closeDarken.png",
    playBlack: "./img/playBlack.png",
    play: "./img/play.png",
    playerWhite: "./img/playerWhite.png",
    cast: "./img/cast.png",
    share: "./img/share.png",
    down: "./img/down.png",
    info: "./img/info.png",
    info2: "./img/info2.png",
    infos: "./img/infos.png",
    top: "./img/top.png",
    topRetangle: "./img/topRetangle.png",
    closeWhite: "./img/closeWhite.png",
    closeBgWhite: "./img/closeBgWhite.png",
    closeBlack: "./img/closeBlack.png",
    retryBlack: "./img/retryBlack.png",
    retryWhite20: "./img/retryWhite20.png",
    retryWhite: "./img/retryWhite.png",
    emailWhite: "./img/emailWhite.png",
    progressBlack: "./img/progressBlack.gif",
    postersBg: "./img/postersBg.png",
    positive: "./img/positive.png",
    live: "./img/live.png",
    timeBlack: "./img/timeBlack.png",
    youtube: "./img/youtube.png",
    checkBox: "./img/checked.png",

    ch_sbt: "./img/sbt.png",
    ch_globo: "./img/globo.png",
    ch_record: "./img/record.png",
    ch_band: "./img/band.png",
    ch_viva: "./img/viva.png",
    ch_gnt: "./img/gnt.png",
    ch_multishow: "./img/multishow.png",
    ch_mtv: "./img/mtv.png",
    ch_bis: "./img/bis.png",
    ch_off: "./img/off.png",
    ch_jovempan: "./img/jovempan.png",
    ch_globonews: "./img/globonews.png",
    ch_recordnews: "./img/recordnews.png",
    ch_bandnews: "./img/bandnews.png",
    ch_starchannel: "./img/starchannel.png",
    ch_warner: "./img/warner.png",
    ch_fx: "./img/fx.png",
    ch_telecinepremium: "./img/telecinepremium.png",
    ch_telecineaction: "./img/telecineaction.png",
    ch_telecinepipoca: "./img/telecinepipoca.png",
    ch_telecinetouch: "./img/telecinetouch.png",
    ch_telecinefun: "./img/telecinefun.png",
    ch_telecinecult: "./img/telecinecult.png",
    ch_hbo: "./img/hbo.png",
    ch_hbo2: "./img/hbo2.png",
    ch_hboplus: "./img/hboplus.png",
    ch_hbofamily: "./img/hbofamily.png",
    ch_hbosignature: "./img/hbosignature.png",
    ch_megapix: "./img/megapix.png",
    ch_tnt: "./img/tnt.png",
    ch_tntseries: "./img/tntseries.png",
    ch_tlc: "./img/tlc.png",
    ch_studiouniversal: "./img/studiouniversal.png",
    ch_universal: "./img/universal.png",
    ch_tcm: "./img/tcm.png",
    ch_sony: "./img/sony.png",
    ch_space: "./img/space.png",
    ch_maxprime: "./img/maxprime.png",
    ch_cinemax: "./img/cinemax.png",
    ch_axn: "./img/axn.png",
    ch_syfy: "./img/syfy.png",
    ch_comedycentral: "./img/comedycentral.png",
    ch_sportv: "./img/sportv.png",
    ch_sportv2: "./img/sportv2.png",
    ch_sportv3: "./img/sportv3.png",
    ch_combate: "./img/combate.png",
    ch_premiereclubes: "./img/premiereclubes.png",
    ch_premiere2: "./img/premiere2.png",
    ch_premiere3: "./img/premiere3.png",
    ch_premiere4: "./img/premiere4.png",
    ch_premiere5: "./img/premiere5.png",
    ch_premiere6: "./img/premiere6.png",
    ch_premiere7: "./img/premiere7.png",
    ch_foxsports: "./img/foxsports.png",
    ch_foxsports2: "./img/foxsports2.png",
    ch_espn: "./img/espn.png",
    ch_espnbrasil: "./img/espnbrasil.png",
    ch_espnextra: "./img/espnextra.png",
    ch_bandsports: "./img/bandsports.png",
    ch_cartoonnetwork: "./img/cartoonnetwork.png",
    ch_disney: "./img/disney.png",
    ch_disneyxd: "./img/disneyxd.webp",
    ch_disneyjunior: "./img/disneyjunior.png",
    ch_discoverykids: "./img/discoverykids.png",
    ch_gloob: "./img/gloob.png",
    ch_nickelodeon: "./img/nickelodeon.png",
    ch_nickjr: "./img/nickjr.png",
    ch_tooncast: "./img/tooncast.png",
    ch_boomerang: "./img/boomerang.png",
    ch_history: "./img/history.png",
    ch_history2: "./img/history2.png",
    ch_natgeo: "./img/natgeo.png",
    ch_natgeowild: "./img/natgeowild.png",
    ch_discovery: "./img/discovery.png",
    ch_discoveryscience: "./img/discoveryscience.png",
    ch_discoverycivilization: "./img/discoverycivilization.png",
    ch_discoveryturbo: "./img/discoveryturbo.png",
    ch_discoveryworld: "./img/discoveryworld.png",
    ch_discoveryid: "./img/discoveryid.png",
    ch_animalplanet: "./img/animalplanet.png"
}
const t = {
    whatsCast: 'Como transmitir os vídeos para a smartv?',
    preview: 'Prévia',
    episode: 'Episódio ',
    noLastViewed: 'Aguardando seleção',
    lastViewed: 'Ùltimo visto ',
    noPreview: 'Prévia indisponível',
    legendado: 'Legendado',
    dublado: 'Dublado',
    oneLang: 'Disponível apenas ',
    dnsChange: 'Instalar DNS Changer',
    resolve: 'Como resolver?',
    reload: 'Recarregar',
    entretenimento: 'Entretenimento',
    options: 'Opções para',
    colletion: 'Coleção',
    liked: 'GOSTAM',
    assistir: 'Assistir',
    more: 'Saiba mais',
    save: 'Salvar',
    saved: 'Salvo',
    movieTopWeek: '<span></span> <span>Top 1 em filmes da semana</span>',
    serieTopWeek: '<span></span> <span>Top 1 em séries da semana</span>',
    movieTopType: `${requestHtml(v.imgElem, {img: i.logo, class: "small-img", isLazy: false})} <span>FILME</span>`,
    serieTopType: `${requestHtml(v.imgElem, {img: i.logo, class: "small-img", isLazy: false})} <span>SÉRIE</span>`,
    catAll: 'Todas as categorias',
    catLatest: 'Laçamentos',
    catComedy: 'Comédia',
    catDramy: 'Drama',
    catAventure: 'Aventura',
    catSuspense: 'Suspense',
    catAction: 'Ação',
    catCrime: 'Crime',
    catWar: 'Guerra',
    catWest: 'Faroeste',
    catFamily: 'Família',
    catAnimation: 'Animação',
    catLove: 'Romance',
    catHorror: 'Terror',
    catMistery: 'Mistério',
    catDocumenty: 'Documentário',
    catMusic: 'Músical',
    catFantasy: 'Fantasia',
    catLGBTQ: 'LGBTQ',
    catClassic: 'Clássicos',
    catNational: 'Nacional',
    catFiccao: 'Ficção científica',
    catNovela: 'Novelas',
    catReality: 'Reality',
    catTopRated: 'Melhores Avaliados',
    catViews: 'Mais acessados',
    termsAgre: 'Concordar e continuar',
    updateAgre: 'Acessar site e atualizar agora',
    
    listVizer: 'Lista principal',
    listCinemao: 'Lista opcional 720p',
    
    retry: 'Repetir',
    contact: 'Contate-nos',

    titleWelcome: 'Seja bem-vindo ao 9max',
    titleUpdate: 'Uma nova atualização está disponível',
    titleUtils: 'Dicas úteis',
    titleShare: 'Compartilhe esse projeto',
    titleErro: 'Erros no aplicativo',
    titleAll: 'Todos',
    titlePopularChannel: 'Populares',
    titleNewsChannel: 'Notícias',
    titleMoviesAndSeriesChannel: 'Filmes & séries',
    titleSportsChannel: 'Esportes',
    titleKidsChannel: 'Infantil',
    titleDocumentarieChannel: 'Documentários',
    titlePlayerPrincipal: 'Player principal',
    titlePlayerBrowser: 'Player de navegador',
    titlePlayerInternal: 'Player interno',
    titlePlayerOpcional: 'Player opcional',
    titlePlayerPrincipalHD: 'Player principal 1080p',
    titlePlayerOpcionalHD: 'Player opcional 1080p',
    titleOffline: 'Ops, você está offline',
    titleOfflineServer: 'Ops, ocorreu um erro',
    titleOfflinePlayer: 'Ops, algo deu errado',
    titleNoResult: 'Ops, nada foi encontrado',
    titleMyList: 'Minha lista',
    titleColletion: 'Coleções',
    titleNewMovies: 'Novos filmes',
    titleNewEpisodes: 'Novos episódios',
    titleTopTen: 'Brasil: top 10 da semana',
    titleLatestMovies: 'Lançamentos',
    titlePopularMovies: 'Filmes populares',
    titleNewSeries: 'Novas séries',
    titleLastViewed: 'Você viu recentemente',
    titleLiked: 'Você vai gostar de assistir',
    titleNoProgams: 'Progamação indisponível',

    descPlayerRecomended: 'Opção recomendada',
    descPlayerNoRecomended: 'Essa opção pode conter erros',
    descLikedPopuar: 'MELHORES DO MOMENTO',
    descLatestMovies: 'ESTREIAS NOS CINEMAS',
    descNewEpisodes: 'ÚLTIMAS SÉRIES ATUALIZADAS',
    descNewMovies: 'ÚLTIMOS FILMES ADICIONADOS',
    descPopularMovies: 'MAIS ACESSADOS DO MOMENTO',
    descNewSeries: 'ÚLTIMAS SÉRIES ADICIONADAS',

    messageOffline: 'Parece que você está sem internet, verifique sua conexão e tente novamente.',
    messageOfflineServer: 'Parece que nossos servidores estão offline no momento, tente novamente em alguns minutos.',
    messageNoResult: 'Nenhum resultado para $ foi encontrado, verifique se o título digitado está correto e tente novamente.',
    messageOfflineServerInList: 'Parece que o servidor dessa lista está temporariamente offline, tente novamente em alguns minutos.',
    messageOfflineServerInScroller: 'Ocorreu um erro interno no servidor dessa lista, tente novamente.',
    messageOfflinePlayer: 'Parece que o ocorreu um erro inesperado durante essa solicitação, tente novamente mais tarde.',
    messageOfflinePlayerOptions: 'Parece que o vídeo que você esta tentando assistir ainda não foi adicionado ou ocorreu um error com o servidor, tente novamente em alguns minutos.',
    messageNoProgams: 'Temporariamente offline',
    messageResolveDns: `Erros no aplicativo são incomuns, então provavelmente se isso está acontecendo constantemente esssas são uma das provaveis causas:<br><br> 1 - <b>Sua operadora de internet está bloqueando o acesso ao conteudo do aplicativo.</b><br><br> 2 - <b>Os sites que ofereçem os conteudos estão temporariamente offline.</b><br><br><br>Os erros de bloqueio de operadora são os mais comuns, para resolver esse tipo de erro recomendamos o uso do app <b>DNS Changer</b>, esse é um aplicativo que permite a alteração do dns da sua operadora possibilitando assim o desbloqueio de todo o conteudo do 9MAX.<br>Veja vídeos de como configurar e usar o DNS changer <a href="javascript: if(window.wv) window.wv.openLink('https://youtube.com/results?search_query=dns+changer'); else window.open('https://youtube.com/results?search_query=dns+changer', '_blank');">Clicando aqui</a>.<br><br>`,
    messageErrorTrailer: 'Trailer indisponível para assistir no momento.',
    messageErrorLang: 'Ocorreu um erro inesperado, tente novamente.',
    messageErrorEpisodes: 'Ocorreu um erro ao carregar os episódios dessa temporada, tente novamente.',
    messageErrorSeasons: 'Ocorreu um erro ao carregar as temporadas dessa série, tente novamente.',
    messageUpdate: 'Baixe e instale nossa nova versão do <b>9max</b> para ter acesso aos benefícios',
    messageTerms: 'Antes de continuar leia com atenção abaixo nossos termos e condições para o uso do aplicativo.',
    messageTermsOne: '<span>Ao <b>Continuar</b> você concorda que todo o conteúdo encontrado nesse aplicativo vem de sites terceiros espalhados pela internet como megafilmeshd, cinemao, topflix e outros.</span>',
    messageTermsTwo: '<span>Ao <b>Continuar</b> você concorda que nos não somos responsáveis ​​nem administramos nada encontrado aqui e nem garantimos a funcionalidade dos conteúdos encontrados aqui.</span>',
    messageTermsTree: `<span>Ao <b>Continuar</b> você confirma que leu e está de acordo com nossa <a href="javascript:if(window.wv) window.wv.openLink('https://9max.wap.sh/policy.html'); else window.open('https://9max.wap.sh/policy.html', '_blank');" style="pointer-events: all;">Política de privacidade</a> e nossos <a href="javascript:if(window.wv) window.wv.openLink('https://9max.wap.sh/terms.html'); else window.open('https://9max.wap.sh/terms.html', '_blank');" style="pointer-events: all;">Termos de uso</a>.</span>`
}
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
    searchList: [
        {
            itemTitle: t.listVizer,
            itemDesc: '',
            itemId: 'vizerSearch',
            itemScrollType: v.verticalScrollerElem,
            itemCardType: v.cardPoster,
            itemRandomize: true,
            itemEndless: false,
            itemScrollAlert: v.errorInSearchResult,
            itemRequestSettings: {
                convertType: v.convertList,
                method: v.methodGET,
                url: 'https://vizer.tv/pesquisar/',
                params: '',
                validator: 'class="stupidAssSearchBar"',
                timeExpire: v.timeExpire,
                font: v.fontVizerSite
            },
            itemList: [],
            setItemList: async(index, val) => {
                d.searchList[index].itemRequestSettings.url = 'https://vizer.tv/pesquisar/';
                d.searchList[index].itemList = await promiseFetchSearch(d.searchList[index], val);
                return d.searchList[index];
            }
        },
        {
            itemTitle: t.listCinemao,
            itemDesc: '',
            itemId: 'cinemaoSearch',
            itemScrollType: v.verticalScrollerElem,
            itemCardType: v.cardPoster,
            itemRandomize: true,
            itemEndless: false,
            itemScrollAlert: v.errorInSearchResult,
            itemRequestSettings: {
                convertType: v.convertList,
                method: v.methodGET,
                url: 'https://vfilmesonline.net/?s=',
                params: '',
                validator: 'class="search-page"',
                timeExpire: v.timeExpire,
                font: v.fontCinemaoSite
            },
            itemList: [],
            setItemList: async(index, val) => {
                d.searchList[index].itemRequestSettings.url = 'https://vfilmesonline.net/?s=';
                d.searchList[index].itemList = await promiseFetchSearch(d.searchList[index], val);
                return d.searchList[index];
            }
        }
    ],
    pageList: requestLoadList(v.tagPage),
    fontButtonList: requestFontList(v.tagPage),
    channelList: {
        popular: [
            {
                channelGuide: 'SBT',
                channelLogo: i.ch_sbt,
                channelTitle: 'Sbt',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-sbt-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-sbt-ao-vivo-em-hd-online-24-horas/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=sbt',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=sbt',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'GRD',
                channelLogo: i.ch_globo,
                channelTitle: 'Globo',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/globo-ao-vivo-online-gratis-24-horas-hd/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-globo-ao-vivo-tv-globo-online-24-horas-hd/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=globosp-tvdiario',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=boborj',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'REC',
                channelLogo: i.ch_record,
                channelTitle: 'Record',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-record-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-record-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=recordsp',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=record',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'BAN',
                channelLogo: i.ch_band,
                channelTitle: 'Band',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-band-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-band-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=band',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=band',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'VIV',
                channelLogo: i.ch_viva,
                channelTitle: 'Viva',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-viva-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-viva-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=viva',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=viva',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'GNT',
                channelLogo: i.ch_gnt,
                channelTitle: 'Gnt',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-gnt-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=gnt',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=gnt',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'MSW',
                channelLogo: i.ch_multishow,
                channelTitle: 'Multishow',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-multishow-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-multishow-ao-vivo-hd-24-horas-gratis-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=multishow',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=multishow',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'MTV',
                channelLogo: i.ch_mtv,
                channelTitle: 'Mtv',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-mtv-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-mtv-ao-vivo-24-horas-online-hd/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=mtv',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=mtv',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'MSH',
                channelLogo: i.ch_bis,
                channelTitle: 'Bis',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=bis',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=bis',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'OFF',
                channelLogo: i.ch_off,
                channelTitle: 'Off',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=off',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=off',
                        embed: true
                    }
                ]
            }
        ],
        news: [
            {
                channelGuide: '',
                channelLogo: i.ch_jovempan,
                channelTitle: 'Jovempan',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=jpnews',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'GLN',
                channelLogo: i.ch_globonews,
                channelTitle: 'Globo news',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-globonews-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=globonews',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=globonews',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'RCN',
                channelLogo: i.ch_recordnews,
                channelTitle: 'Record news',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=recordnews',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=recordnews',
                        embed: true
                    }
                ]
            },
            {
                
                
            
                channelGuide: 'NEW',
                channelLogo: i.ch_bandnews,
                channelTitle: ' Band news',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-bandnews-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=bandnews',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=bandnews',
                        embed: true
                    }
                ]
            }
        ],
        moviesAndSeries: [
            {
                channelGuide: '',
                channelLogo: i.ch_starchannel,
                channelTitle: 'Star channel',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-star-channel-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-fox-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=starchannel',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=starchannel',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'WBT',
                channelLogo: i.ch_warner,
                channelTitle: 'Warner',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-warner-channel-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=warner',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=warner',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'CFX',
                channelLogo: i.ch_fx,
                channelTitle: 'Fx',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-fx-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-canal-fx-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=fx',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=fx',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TC1',
                channelLogo: i.ch_telecinepremium,
                channelTitle: 'Telecine premium',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-telecine-premium-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-telecine-premium-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=telecinepremium',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=telecinepremium',
                        embed: true
                    }
                ]
            },
            {
                
                channelGuide: 'TC2',
                channelLogo: i.ch_telecineaction,
                channelTitle: 'Telecine action',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-telecine-action-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-telecine-action-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=telecineaction',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=telecineaction',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TC4',
                channelLogo: i.ch_telecinepipoca,
                channelTitle: 'Telecine pipoca',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-telecine-pipoca-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-telecine-pipoca-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=telecinepipoca',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=telecinepipoca',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TC3',
                channelLogo: i.ch_telecinetouch,
                channelTitle: 'Telecine touch',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-telecine-touch-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-telecine-touch-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=telecinetouch',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=telecinetouch',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TC6',
                channelLogo: i.ch_telecinefun,
                channelTitle: 'Telecine fun',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-telecine-fun-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-telecine-fun-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=telecinefun',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=telecinefun',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TC5',
                channelLogo: i.ch_telecinecult,
                channelTitle: 'Telecine cult',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-telecine-cult-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-telecine-cult-ao-vivo-em-hd/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=telecinecult',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=telecinecult',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'HBO',
                channelLogo: i.ch_hbo,
                channelTitle: 'HBO',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-hbo-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-hbo-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=hbo',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=hbo',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'HB2',
                channelLogo: i.ch_hbo2,
                channelTitle: 'HBO 2',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-hbo-2-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-hbo-2-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=hbo2',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=hbo2',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'HPL',
                channelLogo: i.ch_hboplus,
                channelTitle: 'HBO plus',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-hbo-plus-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-hbo-plus-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=hboplus',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=hboplus',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'HFA',
                channelLogo: i.ch_hbofamily,
                channelTitle: 'HBO family',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-hbo-family-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-hbo-family-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=hbofamily',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=hbofamily',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'HFE',
                channelLogo: i.ch_hbosignature,
                channelTitle: 'HBO signature',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-hbo-signature-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-hbo-signature-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=hbosignature',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=hbosignature',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'MPX',
                channelLogo: i.ch_megapix,
                channelTitle: 'Megapix',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-megapix-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=megapix',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=megapix',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TNT',
                channelLogo: i.ch_tnt,
                channelTitle: 'TNT',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-tnt-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-oscars-2022-premiacao-ao-vivo-tnt-27032022-gratis/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=tnt',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=tnt',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TNS',
                channelLogo: i.ch_tntseries,
                channelTitle: 'TNT séries',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-tnt-series-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=tntseries',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=tntseries',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TRV',
                channelLogo: i.ch_tlc,
                channelTitle: 'TLC',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-tlc-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=tlc',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=tlc',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'HAL',
                channelLogo: i.ch_studiouniversal,
                channelTitle: 'Studio universal',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=studiouniversal',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=studiouniversal',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'USA',
                channelLogo: i.ch_universal,
                channelTitle: 'Universal',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-universal-tv-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la//',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=universaltv',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=universal',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TCM',
                channelLogo: i.ch_tcm,
                channelTitle: 'TCM',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=tcm',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'SET',
                channelLogo: i.ch_sony,
                channelTitle: 'Sony',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-sony-channel-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=sonychannel',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=sony',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'SPA',
                channelLogo: i.ch_space,
                channelTitle: 'Space',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-space-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=space',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=space',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_maxprime,
                channelTitle: 'Maxprime',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=maxprime',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'MNX',
                channelLogo: i.ch_cinemax,
                channelTitle: 'Cinemax',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-cinemax-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-cinemax-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=cinemax',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=cinemax',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'AXN',
                channelLogo: i.ch_axn,
                channelTitle: 'AXN',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-axn-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=axn',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=axn',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'SCI',
                channelLogo: i.ch_syfy,
                channelTitle: 'Syfy',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=syfy',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=syfy',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'CCE',
                channelLogo: i.ch_comedycentral,
                channelTitle: 'Comedy central',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=comedycentral',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=comedycentral',
                        embed: true
                    }
                ]
            }
        ],
        sports: [
            {
                channelGuide: 'SPO',
                channelLogo: i.ch_sportv,
                channelTitle: 'Sportv',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-sportv-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-sportv-ao-vivo-gratis-24-horas-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=sportv',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=sportv1',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'SP2',
                channelLogo: i.ch_sportv2,
                channelTitle: 'Sportv 2',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-sportv-2-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-sportv-2-ao-vivo-hd-24-horas-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=sportv2',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=sportv2',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'SP3',
                channelLogo: i.ch_sportv3,
                channelTitle: 'Sportv 3',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-sportv-ao-vivo-online-3/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-sportv-3-ao-vivo-online-24-horas-em-hd/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=sportv3',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=sportv3',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '135',
                channelLogo: i.ch_combate,
                channelTitle: 'Combate',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-combate-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-ufc-combate-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=combate',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=combate',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '121',
                channelLogo: i.ch_premiereclubes,
                channelTitle: 'Premiere clubes',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-premiere-clubes-ao-vivo-online-gratis/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=premiereclubes',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=premiereclubes',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_premiere2,
                channelTitle: 'Premiere 2',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=premiere2',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=premiere2',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_premiere3,
                channelTitle: 'Premiere 3',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=premiere3',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=premiere3',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_premiere4,
                channelTitle: 'Premiere 4',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=premiere4',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=premiere4',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_premiere5,
                channelTitle: 'Premiere 5',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=premiere5',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=premiere5',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_premiere6,
                channelTitle: 'Premiere 6',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=premiere6',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=premiere6',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_premiere7,
                channelTitle: 'Premiere 7',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=premiere7',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=premiere7',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'FSP',
                channelLogo: i.ch_foxsports,
                channelTitle: 'Foxsports',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-fox-sports-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=foxsports1',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'FS2',
                channelLogo: i.ch_foxsports2,
                channelTitle: 'Foxsports 2',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-fox-sports-2-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=foxsports2',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=foxsports2',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'ESP',
                channelLogo: i.ch_espn,
                channelTitle: 'Espn',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-espn-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-espn-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=espn',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=espn',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'ESB',
                channelLogo: i.ch_espnbrasil,
                channelTitle: 'Espn brasil',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-espn-brasil-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=espnbrasil',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_espnextra,
                channelTitle: 'Espn extra',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-espn-extra-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=espnextra',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=espnextra',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'BSP',
                channelLogo: i.ch_bandsports,
                channelTitle: 'Bandsports',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-bandsports-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=bandsports',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=bandsports',
                        embed: true
                    }
                ]
            }
        ],
        kids: [
            {
                channelGuide: 'CAR',
                channelLogo: i.ch_cartoonnetwork,
                channelTitle: 'Cartoonnetwork',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-cartoon-network-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-cartoon-network-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'xhttps://reidoscanais.com/embed/?id=cartoonnetwork',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=cartoon',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'DNY',
                channelLogo: i.ch_disney,
                channelTitle: 'Disney',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-disney-channel-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-disney-channel-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=disneychannel',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=disney',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_disneyxd,
                channelTitle: 'Disneyxd',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-disney-xd-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=disneyxd',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_disneyjunior,
                channelTitle: 'Disney junior',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=disneyjunior',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_discoverykids,
                channelTitle: 'Discovery kids',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-discovery-kids-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-discovery-kids-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=discoverykids',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=discoverykids',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'GOB',
                channelLogo: i.ch_gloob,
                channelTitle: 'Gloob',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-gloob-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-gloob-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=gloob',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=gloob',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'NIC',
                channelLogo: i.ch_nickelodeon,
                channelTitle: 'Nickelodeon',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-nickelodeon-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-nickelodeon-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=nickelodeon',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=nick',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'NJR',
                channelLogo: i.ch_nickjr,
                channelTitle: 'Nick jr',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-nick-jr-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-nick-jr-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=nickjr',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=nickjr',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'TOC',
                channelLogo: i.ch_tooncast,
                channelTitle: 'Tooncast',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-tooncast-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=tooncast',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_boomerang,
                channelTitle: 'Boomerang',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-boomerang-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=boomerang',
                        embed: true
                    }
                ]
            }
        ],
        documentaries: [
            {
                channelGuide: '',
                channelLogo: i.ch_history,
                channelTitle: 'History',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-history-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=history',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=history',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_history2,
                channelTitle: 'History 2',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-history-2-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=history2',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=history2',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'SUP',
                channelLogo: i.ch_natgeo,
                channelTitle: 'Natgeo',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-national-geographic-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=nationalgeographic',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=natgeo',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_natgeowild,
                channelTitle: 'Natgeo wild',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=natgeowild',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'DIS',
                channelLogo: i.ch_discovery,
                channelTitle: 'Discovery',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-discovery-channel-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-discovery-channel-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=discoverychannel',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=discovery',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'DSC',
                channelLogo: i.ch_discoveryscience,
                channelTitle: 'Discovery science',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-discovery-science-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-discovery-science-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=discoveryscience',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=discoverysience',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_discoverycivilization,
                channelTitle: 'Discovery civilization',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-discovery-civilization-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=discoverycivilization',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'DTU',
                channelLogo: i.ch_discoveryturbo,
                channelTitle: 'Discovery turbo',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-discovery-turbo-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-discovery-turbo-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=discoveryturbo',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=discoveryturbo',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'DIW',
                channelLogo: i.ch_discoveryworld,
                channelTitle: 'Discovery world',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://futemax.la/assistir-discovery-world-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=discoveryworld',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=discoveryworld',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: '',
                channelLogo: i.ch_discoveryid,
                channelTitle: 'Discovery id',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-discovery-id-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-investigacao-discovery-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=discoveryid',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=investigacaodiscovery',
                        embed: true
                    }
                ]
            },
            {
                channelGuide: 'APL',
                channelLogo: i.ch_animalplanet,
                channelTitle: 'Animal planet',
                playerServers: [
                    {
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: 'https://multicanais.fans/assistir-animal-planet-ao-vivo-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://futemax.la/assistir-animal-planet-ao-vivo-em-hd-online/',
                        embed: false
                    },
                    {
                        title: t.titlePlayerPrincipalHD,
                        desc: t.descPlayerRecomended,
                        url: 'https://reidoscanais.com/embed/?id=animalplanet',
                        embed: true
                    },
                    {
                        title: t.titlePlayerOpcionalHD,
                        desc: t.descPlayerNoRecomended,
                        url: 'https://sinalpublico.com/player3/ch.php?canal=animalplanet',
                        embed: true
                    }
                ]
            }
        ]
    },
    colletionList: {
        vizer: [
            {
                itemTitle: '2023',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2023&categoryFilterYearMax=2023&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2022',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2022&categoryFilterYearMax=2022&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2021',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2021&categoryFilterYearMax=2021&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2020',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2020&categoryFilterYearMax=2020&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2019',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2019&categoryFilterYearMax=2019&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2018',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2018&categoryFilterYearMax=2018&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2017',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2017&categoryFilterYearMax=2017&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2016',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2016&categoryFilterYearMax=2016&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2015',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2015&categoryFilterYearMax=2015&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2014',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2014&categoryFilterYearMax=2014&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2013',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2013&categoryFilterYearMax=2013&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2012',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2012&categoryFilterYearMax=2012&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2011',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2011&categoryFilterYearMax=2011&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            },
            {
                itemTitle: '2010',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2010&categoryFilterYearMax=2010&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0',
                    params: '',
                    validator: '"list":',
                    timeExpire: v.timeExpire,
                    font: v.fontVizerJs
                }
            }
        ],
        cinemao: [
            {
                itemTitle: '2023',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2023/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2022',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2022/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2021',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2021/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2020',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2020/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2019',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2019/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2018',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2018/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2017',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2017/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2016',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2016/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2015',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2015/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2014',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2014/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2013',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2013/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2012',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2012/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2011',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2011/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            },
            {
                itemTitle: '2010',
                itemRequestSettings: {
                    convertType: v.convertList,
                    method: v.methodGET,
                    url: 'https://vfilmesonline.net/ano/2010/',
                    params: '',
                    validator: 'class="items"',
                    timeExpire: v.timeExpire,
                    font: v.fontCinemaoSite
                }
            }
        ]
    },
    optionsButtonList: (itemId, itemType = 'movie', itemPlayerType = 'vizer', itemPlayerServers = 'W10=') => {
        const imgSave = d.userDB.myListStore.checkItemData(itemId) ? i.saved : i.save;
        const lastViewed = d.userDB.lastViewedStore.checkItemData(itemId) ? t.lastViewed + d.userDB.lastViewedStore.getItemData(itemId).lastViewed ?? '' : t.noLastViewed;

        return (itemType === 'movie') ? [
            {
                class: 'btn larger bg-white ripple bold retangle',
                attrs: `data-action="${v.actionOpenPlayerOptions}" data-visibility="play" data-type="${itemPlayerType}" data-servers="${itemPlayerServers}"`,
                text: t.assistir,
                imgSettings: {
                    leftImg: i.playBlack,
                    leftClass: 'medium-img-left'
                }
            },
            {
                class: 'btn larger bg-darken-btn round ripple',
                attrs: `data-action="${v.actionOpenPlayerOptions}" data-visibility="down" data-type="${itemPlayerType}" data-servers="${itemPlayerServers}"`,
                imgSettings: {
                    leftImg: i.down,
                    leftClass: 'large-img'
                }
            },
            {
                class: 'btn larger bg-darken-btn ripple round',
                attrs: `data-action="${v.actionOpenPlayerOptions}" data-visibility="cast" data-type="${itemPlayerType}" data-servers="${itemPlayerServers}"`,
                imgSettings: {
                    leftImg: i.cast,
                    leftClass: 'large-img'
                }
            },
            {
                class: 'btn larger bg-darken-btn ripple round save',
                attrs: `data-action="${v.actionToggleSaveItem}"`,
                imgSettings: {
                    leftImg: imgSave,
                    leftClass: 'large-img'
                }
            },
            {
                class: 'btn larger bg-darken-btn round ripple',
                attrs: `data-action="${v.actionShare}"`,
                imgSettings: {
                    leftImg: i.share,
                    leftClass: 'large-img'
                }
            }
        ] : [
            {
                class: 'btn larger bg-white ripple bold retangle',
                attrs: `data-action="${v.actionShowLastViewed}"`,
                text: lastViewed ?? t.noLastViewed,
                imgSettings: {
                    leftImg: i.timeBlack,
                    leftClass: 'medium-img-left'
                }
            },
            {
                class: 'btn larger bg-darken-btn ripple round save',
                attrs: `data-action="${v.actionToggleSaveItem}"`,
                imgSettings: {
                    leftImg: imgSave,
                    leftClass: 'large-img'
                }
            },
            {
                class: 'btn larger bg-darken-btn round ripple',
                attrs: `data-action="${v.actionShare}"`,
                imgSettings: {
                    leftImg: i.share,
                    leftClass: 'large-img'
                }
            }
        ];
    },
    errorButtonList: {
        errorInContainer: [
            {
                text: t.resolve, 
                class:'btn medium bg-borded-white-btn ripple bold',
                attrs: `data-action="${v.actionOpenDnsAlert}"`,
                imgSettings: {
                    leftImg: i.info2,
                    leftClass: 'large-img-left'
                }
            },
            {
                text: t.retry, 
                class:'btn medium bg-white-btn ripple bold',
                attrs: `data-action="${v.actionRetryContent}"`,
                imgSettings: {
                    leftImg: i.retryBlack,
                    leftClass: 'large-img-left'
                }
            }
        ],
        errorInList: [
            {
                text: t.resolve, 
                class:'btn medium bg-borded-white-btn ripple bold',
                attrs: `data-action="${v.actionOpenDnsAlert}"`,
                imgSettings: {
                    leftImg: i.info2,
                    leftClass: 'large-img-left'
                }
            },
            {
                text: t.retry, 
                class:'btn medium bg-white-btn ripple bold',
                attrs: `data-action="${v.actionRetryList}"`,
                imgSettings: {
                    leftImg: i.retryBlack,
                    leftClass: 'large-img-left'
                }
            }
        ],
        errorInScroller: [
            {
                class:'btn big bg-borded-white-50-btn ripple bold',
                attrs: `data-action="${v.actionOpenDnsAlert}"`,
                imgSettings: {
                    leftImg: i.whats,
                    leftClass: 'large-img'
                }
            },
            {
                class:'btn big bg-borded-white-50-btn ripple bold',
                attrs: `data-action="${v.actionRetryScrollerList}"`,
                imgSettings: {
                    leftImg: i.retryWhite,
                    leftClass: 'large-img'
                }
            }
        ],
        errorInSearchResult: [
            {
                text: t.resolve, 
                class:'btn medium bg-borded-white-btn ripple bold',
                attrs: `data-action="${v.actionOpenDnsAlert}"`,
                imgSettings: {
                    leftImg: i.info2,
                    leftClass: 'large-img-left'
                }
            },
            {
                text: t.retry, 
                class:'btn medium bg-white-btn ripple bold',
                attrs: `data-action="${v.actionRetryAllList}"`,
                imgSettings: {
                    leftImg: i.retryBlack,
                    leftClass: 'large-img-left'
                }
            }
        ],
        errorInEmbed: [
            {
                text: t.resolve,
                class:'btn medium bg-borded-white-btn ripple bold',
                attrs: `data-action="${v.actionOpenDnsAlert}"`,
                imgSettings: {
                    leftImg: i.info2,
                    leftClass: 'large-img-left'
                }
            },
            {
                text: t.reload, 
                class:'btn medium bg-white-btn ripple bold',
                attrs: `data-action="${v.actionReloadPage}"`,
                imgSettings: {
                    leftImg: i.retryBlack,
                    leftClass: 'large-img-left'
                }
            }
        ],
        errorInDns: [
            {
                text: t.contact, 
                class:'btn medium bg-borded-white-btn ripple bold',
                attrs: `onclick="if(window.wv) window.wv.openLink('mailto:suporte.9max@proton.me'); else window.open('mailto:suporte.9max@proton.me', '_blank');"`,
            },
            {
                text: t.dnsChange, 
                class:'btn medium bg-white-btn ripple bold',
                attrs: `onclick="if(window.wv) window.wv.openLink('https://play.google.com/store/apps/details?id=com.frostnerd.dnschanger'); else window.open('https://play.google.com/store/apps/details?id=com.frostnerd.dnschanger', '_blank');"`,
            }
        ]
    },
    guideButtonList: [
        {
            class: 'btn medium bg-darken-50-solid round ripple',
            attrs: `data-action="${v.actionShowGuideList}"`,
            imgSettings: {
                leftImg: i.positive,
                leftClass: ''
            }
        }
    ],
    termsButtonList: [
        {
            class: 'btn medium',
            text: t.messageTermsOne,
            imgSettings: {
                leftImg: i.checkBox,
                leftClass: ''
            }
        },
        {
            class: 'btn medium',
            text: t.messageTermsTwo,
            imgSettings: {
                leftImg: i.checkBox,
                leftClass: ''
            }
        },
        {
            class: 'btn medium',
            text: t.messageTermsTree,
            imgSettings: {
                leftImg: i.checkBox,
                leftClass: ''
            }
        }
    ],
    updateButtonList: [
        {
            class: 'btn medium',
            text: 'Melhorias no desempenho do app',
            imgSettings: {
                rightImg: i.checkBox,
                rightClass: ''
            }
        },
        {
            class: 'btn medium',
            text: 'Correção de bugs no app',
            imgSettings: {
                rightImg: i.checkBox,
                rightClass: ''
            }
        },
        {
            class: 'btn medium',
            text: 'Atualização no catalogo do app',
            imgSettings: {
                rightImg: i.checkBox,
                rightClass: ''
            }
        }
    ],
    playerButtonList: [
        {
            class: 'btn medium bg-white round ripple',
            attrs: `data-action="${v.actionOpenEmbedPlayer}"`,
            imgSettings: {
                leftImg: i.playBlack,
                leftClass: ''
            }
        },
        {
           class: 'btn medium bg-darken-50-solid round ripple',
            attrs: `data-action="${v.actionOpenCastPlayer}"`,
            imgSettings: {
                leftImg: i.cast,
                leftClass: ''
            }
        },
        {
           class: 'btn medium bg-darken-50-solid round ripple',
            attrs: `data-action="${v.actionOpenCastPlayer}"`,
            imgSettings: {
                leftImg: i.down,
                leftClass: ''
            }
        }
    ],
    utilsButtonList: [
        {
            text: t.whatsCast, 
            class:'btn medium bold no-padding',
            attrs: `onclick="if(window.wv) window.wv.openLink('https://www.youtube.com/watch?v=TjPIVuhMJ-c'); else window.open('https://www.youtube.com/watch?v=TjPIVuhMJ-c', '_blank');"`,
            imgSettings: {
                leftImg: i.youtube,
                leftClass: 'large-img-left'
            }
        }
    ],
    shareButtonList: [
        {
            class:'btn larger bg-55 round ripple',
            attrs: `onclick="if(window.wv) window.wv.openLink('https://api.whatsapp.com/send?text=https://9max.wap.sh'); else window.open('https://api.whatsapp.com/send?text=https://9max.wap.sh', '_blank');"`,
            imgSettings: {
                leftImg: 'https://img.icons8.com/ios-filled/100/202020/phone.png',
                leftClass: ''
            }
        },
        {
            class:'btn larger bg-55 round ripple',
            attrs: `onclick="if(window.wv) window.wv.openLink('https://telegram.me/share/url?url=https://9max.wap.sh'); else window.open('https://telegram.me/share/url?url=https://9max.wap.sh', '_blank');"`,
            imgSettings: {
                leftImg: 'https://img.icons8.com/ios-filled/100/202020/telegram-app.png',
                leftClass: ''
            }
        },
        {
            class:'btn larger bg-55 round ripple',
            attrs: `onclick="if(window.wv) window.wv.openLink('https://www.facebook.com/sharer.php?u=https://9max.wap.sh'); else window.open('https://www.facebook.com/sharer.php?u=https://9max.wap.sh', '_blank');"`,
            imgSettings: {
                leftImg: 'https://img.icons8.com/ios-glyphs/100/202020/facebook-f.png',
                leftClass: ''
            }
        },
        {
            class:'btn larger bg-55 round ripple',
            attrs: `onclick="if(window.wv) window.wv.openLink('https://twitter.com/intent/tweet?text=https://9max.wap.sh'); else window.open('https://twitter.com/intent/tweet?text=https://9max.wap.sh', '_blank');"`,
            imgSettings: {
                leftImg: 'https://img.icons8.com/material-outlined/100/202020/twitterx--v2.png',
                leftClass: ''
            }
        },
        {
            class:'btn larger bg-55 round ripple',
            attrs: `onclick="if(window.wv) window.wv.openText('https://9max.wap.sh'); else window.open('https://9max.wap.sh', '_blank');"`,
            imgSettings: {
                leftImg: 'https://img.icons8.com/ios-glyphs/100/202020/plus-math.png',
                leftClass: ''
            }
        }
    ],
    errorTextList: {
        errorInContainer: {
            titles: [
                t.titleOffline,
                t.titleOfflineServer 
            ],
            messages: [
                t.messageOffline,
                t.messageOfflineServer
            ]
        },
        errorInList: {
            titles: [
                t.titleOffline,
                t.titleOfflineServer 
            ],
            messages: [
                t.messageOffline,
                t.messageOfflineServerInList
            ]
        },
        errorInScroller: {
            titles: [
                t.titleOffline,
                t.titleOfflineServer 
            ],
            messages: [
                t.messageOffline,
                t.messageOfflineServerInScroller
            ]
        },
        errorInSearchResult: {
            titles: [
                t.titleOffline,
                t.titleOfflineServer
            ],
            messages: [
                t.messageOffline,
                t.messageOfflineServer
            ]
        }
    },
    categoriesButtonList: {
        vizerMovie: [
            {
                text: t.catAll,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catLatest,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=all&search=&saga=0&categoryFilterYearMin=2023&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catComedy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=comedia&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catDramy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=drama&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catAventure,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=aventura&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catSuspense,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=suspense&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catAction,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=acao&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catCrime,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=crime&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catWar,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=guerra&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catWest,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=faroeste&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catFamily,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=familia&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catAnimation,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=animacao&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catLove,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=romance&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catHorror,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=terror&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catMistery,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=misterio&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catDocumenty,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=documentario&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catMusic,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=musical&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catFantasy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=fantasia&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catLGBTQ,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListMovies=lgbt&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            }
        ],
        vizerSerie: [
            {
                text: t.catAll,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=all&anime=0&search=&saga=0&categoryFilterYearMin=1950&categoryFilterYearMax=2100&categoryFilterOrderBy=vzViews&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catLatest,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=all&search=&saga=0&categoryFilterYearMin=2023&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catComedy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=comedia&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catDramy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=drama&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catAventure,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=aventura&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catAction,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=acao&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catCrime,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=crime&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catFamily,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=familia&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catAnimation,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=animacao&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catMistery,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=misterio&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catDocumenty,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=documentario&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            },
            {
                text: t.catFantasy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vizer.tv/includes/ajax/ajaxPagination.php?categoriesListSeries=fantasia&search=&saga=0&categoryFilterYearMin=1890&categoryFilterYearMax=2100&categoryFilterOrderBy=year&categoryFilterOrderWay=desc&page=0" data-validator="${btoa('"list":')}"`
            }
        ],
        cinemaoMovie: [
            {
                text: t.catAll,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/filme/" data-validator="${btoa('id="archive-content"')}"`
            },
            {
                text: t.catLatest,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/lancamentos/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catTopRated,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/classificacoes/?get=movies" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catViews,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/popular/?get=movies" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catComedy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/comedia/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catDramy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/drama/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catAventure,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/aventura/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catSuspense,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/thriller/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catAction,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/acao/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catCrime,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/crime/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catWar,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/guerra/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catWest,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/faroeste/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catFamily,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/familia/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catAnimation,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/animacao/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catLove,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/romance/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catHorror,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/terror/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catMistery,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/misterio/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catDocumenty,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/documentario/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catMusic,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/musica/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catFantasy,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/fantasia/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catClassic,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/classico/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catNational,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/nacional/" data-validator="${btoa('class="items"')}"`
            },
            {
                text: t.catFiccao,
                class:'btn bg-transparent big',
                attrs: `data-action="${v.actionLoadCat}" data-url="https://vfilmesonline.net/genero/ficcao-cientifica/" data-validator="${btoa('class="items"')}"`
            }
        ]
    },
    colorAlpha: [
        "00","03","05","08","0A","0D","0F","12","14","17","1A","1C","1F","21","24","26","29","2B","2E","30","33","36","38","3B","3D","40","42","45","47","4A","4D","4F","52","54","57","59","5C","5E","61","63","66","69","6B","6E","70","73","75","78","7A","7D","80","82","85","87","8A","8C","8F","91","94","96","99","9C","9E","A1","A3","A6","A8","AB","AD","B0","B3","B5","B8","BA","BD","BF","C2","C4","C7","C9","CC","CF","D1","D4","D6","D9","DB","DE","E0","E3","E6","E8","EB","ED","F0","F2","F5","F","FA","FC","FF"
    ],
    itemType: [
        (v.tagPage === v.moviesPage) ? 'movie' : (v.tagPage === v.seriesPage) ? 'serie' : 'movie',
        (v.tagPage === v.moviesPage) ? 'movie' : (v.tagPage === v.seriesPage) ? 'serie' : 'serie'
    ],
    userDB: {
        myListStore: [],
        topRatedStore: [],
        searchStore: [],
        lastViewedStore: [],
        itemStore: [],
        userSettingsStore: [],

        myList: () => d.userDB.myListStore.getList,
        topRatedList: () => d.userDB.topRatedStore.getList,
        searchList: () => d.userDB.searchStore.getList,
        lastViewedList: () => d.userDB.lastViewedStore.getList,
        itemList: () => d.userDB.itemStore.getList,
        userSettings: () => d.userDB.userSettingsStore.getList,

        getList: (type, defaultList) => {
            try {
                switch(type) {
                    case v.storeMyList: return d.userDB.myList();
                    case v.storeTopRated: return d.userDB.topRatedList();
                    case v.storeSearch: return d.userDB.searchList();
                    case v.storeItem: return d.userDB.itemList();
                    default: return defaultList;
                }
            } catch (err) {}
            return defaultList;
        },
        listCheck: (type) => {
            switch(type) {
                case v.storeCache:
                case v.storeLastViewed:
                case v.storeItem:
                case v.storeMyList:
                case v.storeSearch:
                case v.storeTopRated:
                case v.storeUserSettings: return true;
                default: return false;
            }
        },
        initializer: async() => {
            return new Promise(async(resolve, reject) => {
                d.userDB.myListStore = await new StorageData(v.storeMyList, true, 500);
                d.userDB.topRatedStore = await new StorageData(v.storeTopRated, false, 10);
                d.userDB.searchStore = await new StorageData(v.storeSearch, false, 20);
                d.userDB.lastViewedStore = await new StorageData(v.storeLastViewed, false);
                d.userDB.itemStore = await new StorageData(v.storeItem, false, 20);
                d.userDB.userSettingsStore = await new StorageData(v.storeUserSettings, true, 1);
                resolve();
            });
        },
        userSettingsInit: () => {
            const isUpdate = !(parseInt(document.title ?? '0') >= 1);
            const isExist =  injectObjCheck(d.userDB.userSettings());
            const dialogData = JSON.stringify({
                params: `lang=${v.lang}&tagPage=${v.tagPage}&dialogType=${isUpdate ? v.dialogShowUpdate : v.dialogShowIntro}`,
                bgColor: `#000000`,
                backStack: false
            });

            if(isUpdate && v.tagPage !== v.dialogPage) {
                if(window.wv) window.wv.openDialog(dialogData, false);
                else pageBroadcast.postMessage({ action: v.broadcastOpenDialog, dialogData: dialogData });
            }
            else if(!isExist && v.tagPage !== v.dialogPage) {
                if(window.wv) window.wv.openDialog(dialogData, false);
                else pageBroadcast.postMessage({ action: v.broadcastOpenDialog, dialogData: dialogData });
            }
            return v.tagPage === v.dialogPage || isUpdate || isExist;
        }
    },
    genres: [
        {
            id: 28,
            name: "<b>Ação</b>"
        },
        {
            id: 12,
            name: "<b>Aventura</b>"
        },
        {
            id: 16,
            name: "<b>Animação</b>"
        },
        {
            id: 35,
            name: "<b>Comédia</b>"
        },
        {
            id: 80,
            name: "<b>Crime</b>"
        },
        {
            id: 99,
            name: "<b>Documentário</b>"
        },
        {
            id: 18,
            name: "<b>Drama</b>"
        },
        {
            id: 10751,
            name: "<b>Família</b>"
        },
        {
            id: 14,
            name: "<b>Fantasia</b>"
        },
        {
            id: 36,
            name: "<b>História</b>"
        },
        {
            id: 27,
            name: "<b>Terror</b>"
        },
        {
            id: 10402,
            name: "<b>Música</b>"
        },
        {
            id: 9648,
            name: "<b>Mistério</b>"
        },
        {
            id: 10749,
            name: "<b>Romance</b>"
        },
        {
            id: 878,
            name: "<b>Ficção científica</b>"
        },
        {
            id: 10770,
            name: "<b>Cinema TV</b>"
        },
        {
            id: 53,
            name: "<b>Thriller</b>"
        },
        {
            id: 10752,
            name: "<b>Guerra</b>"
        },
        {
            id: 37,
            name: "<b>Faroeste</b>"
        }
    ],
    adStatus: {
        ready: "0",
        fail: "1",
        open: "2",
        close: "3",
        showFail: "4",
        clicked: "5",
        success: "6"
    },
    createUser: () => {
        return {
            itemId: 'user-9max',
            userUUID: (window.wv) ? window.wv.createUUID() :  (new Date().getTime()).toString(36),
            userLang: getParam('lang') ?? 'pt',
            userPremium: false,
            userErrorDNS: false,
            userRegistred: false
        }
    }
}
const pageBroadcast = new AllInclusiveBroadcaster((data) => {
    switch(data.action) {
        case v.broadcastLoadCat: {
            if(injectObjCheck(data.settings)) {
                const listElem = $('#list');
                const buttonCatElem = $('.font-list button.activated span');
                const title = data.settings.title;
                const url = data.settings.url;
                const validator = valCheck(data.settings.validator) ? atob(data.settings.validator) : '';
                const catType = data.settings.catType;
                const itemDecodeData = (parseJSON($(`[data-list-id=${catType}]`).attr('data-list-details') ?? 'e30=') ?? {});
                const loadList = async() => {
                    buttonCatElem.text(title);
                    itemDecodeData.itemRequestSettings.url = url;
                    itemDecodeData.itemRequestSettings.validator = validator;
                    itemDecodeData.itemEndless = true;
                    itemDecodeData.itemList = await promiseFetch(itemDecodeData);

                    listElem.changeHtml(v.titleList, [itemDecodeData]);
                }

                if(title !== buttonCatElem.text()) htmlElem.animScrollTo([v.scrollVertical, 430, 300], () => listElem.changeHtml(v.cardProgress, v.progressPoster, () => loadList()));
                if(!window.wv) bodyElem.css('overflow-y', 'auto').find('#dialog').remove();
            }
            break;
        }
        case v.broadcastOpenDialog: { 
            data.dialogData = JSON.parse(data.dialogData);
            if(!window.wv) bodyElem.css('overflow-y', 'hidden').append(`<div id="dialog" style="background-color: ${data.dialogData.bgColor.replace(/[1-9a-zA-Z]/g, '') + data.dialogData.bgColor.replace(/[#0]/g, '')}"><iframe src="./pageDialog.html?${data.dialogData.params}"></iframe></div>`);
            break;
        }
        case v.broadcastCloseDialog: {
            if(!window.wv) bodyElem.css('overflow-y', 'auto').find('#dialog').remove();
            break;
        }
    }
}, v.tagPage);

const generateSystemColors = (color) => {
    color = shadeColor(color, (colorModeCheck(color) === 'light' ? -60 : 60));
    color = colorModeCheck(color) === 'light' ? shadeColor(color, -60) : shadeColor(color, 0);
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
const rgba2hex = (rgba) => {
    return `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;
}
const colorPercentage = (percentage) => {
    return d.colorAlpha[percentage];
}
const ratePercentage = (rate) => {
    rate = parseFloat((valCheck(rate) && rate !== '0') ? rate : '5.8');
    if(rate >= 10.0) return '100%';
    return Math.floor((100 * rate) / 10) + '%';
}
const valueComparePercentage = (s1, s2) => {
    try {
        var longer = textNormalize(s1);
        var shorter = textNormalize(s2);
        if (s1.length < s2.length) {
          longer = s2;
          shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
          return 1.0;
        }
        return Math.floor(((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) * 100));
    }catch(err) {
    }
    return 0;
}
const textNormalize = (text = '') => {
    try {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().replace(/\s+/g, ' ');
    }catch(err) {}
    return text.toLowerCase().replace(/\s+/g, ' ');
}
const textValueNormalize = (text = '') => {
    return text.replace(/'|"|<|>/g, '');
}
const textInputNormalize = (text = '') => {
    try {
        const character = text.charAt(0);
        return ((text.length>0 && character !== character.toUpperCase()) ? text.charAt(0).toUpperCase()+text.substr(1) : text).replace(/[^a-zA-Z 0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕÇç]+/g, '').replace(/\s+/g, ' ');
    }catch(err) {}
    return text.replace(/[^a-zA-Z 0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕÇç]+/g, '').replace(/\s+/g, ' ');
}
const omit = (obj, arr) => {
    return Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
}
const observerEndless = (type, endlessElem) => {
    if(type === v.scrollHorizontal ? endlessElem.percentHorizontalInViewport() : endlessElem.percentVerticalInViewport()) {
        const listDataElem = getViewByAttr(endlessElem, '[data-list-details]');
        const itemDecodeData = (parseJSON(listDataElem.attr('data-list-details') ?? 'e30=') ?? {});
        const isLoading = (endlessElem.attr('data-loading') ?? 'false') === 'true';
        const removeEndeless = () => {
            endlessElem.delay(500).animate({ 
                height: 0, 
                padding: 0 
            },
            {
                duration: 200, 
                complete: () => endlessElem.remove()
            });
        }
        const addMoreItems = (data) => {
            if(!data.pagination) removeEndeless();
            if(injectObjCheck(data.data.itemList)) {
                setTimeout(() => {
                    data.data.itemEndless = false;
                    $(requestHtml(v.itemList, data.data)).insertBefore(endlessElem).ready(function() {
                        listDataElem.attr('data-list-details', btoa(encodeURIComponent(JSON.stringify(omit(data.data, 'itemList')))));
                        if(data.pagination) endlessElem.attr('data-loading', 'false');
                    });
                }, 500);
            }
        }
        let page = parseInt(endlessElem.attr('data-page') ?? '1');
                
        if(!isLoading) {
            page++;
            endlessElem.attr('data-loading', 'true');
            endlessElem.attr('data-page', page);

            promiseFetchPagination(itemDecodeData, page)
            .then(data => addMoreItems(data))
            .catch(err => removeEndeless());
        }
    }
}
const observerGuideChannel = (guideElem = $('.tv-results .vertical-scroller')) => {
    guideElem.find('[data-guide-id]').each(function() {
        const guideElem = $(this);
        const guideId = guideElem.attr('data-guide-id') ?? '';
        const data = {
            itemRequestSettings: {
                convertType: v.convertList,
                method: v.methodGET,
                url: 'https://meuguia.tv/programacao/canal/' + guideId,
                params: '',
                validator: 'class="mw"',
                timeExpire: 60,
                font: v.fontMeuGuia
            }
        };

        if(getViewByAttr(guideElem, '[data-id]').hasClass('disabled')) {
            let lastIntersection = new IntersectionObserver(async(entries) => {
                let entry = entries[0];
                if (!entry.isIntersecting) return;
                setTimeout(() => {
                    if(valCheck(guideId)) {
                        promiseFetch(data)
                        .then(data => guideElem.changeHtml(v.cardGuide, data))
                        .catch(err => console.log('aborted'));
                    }
                    else guideElem.changeHtml(v.cardGuide);
                }, 300);
                lastIntersection.unobserve(guideElem[0]);
            }, 
            {
                root: null,
                threshold: 0.5
            });
            
            lastIntersection.observe(guideElem[0]);
        }
        getViewByAttr(guideElem, '[data-id]').removeClass('disabled');
    });
}
const observerColorsChanges = (viewFlagElem) => {
    const contentElem = $('.content');
    
    if(contentElem[0]) {
        const color = document.documentElement.style.getPropertyValue('--color-muted');
        const viewPercent = viewFlagElem.percentVerticalInViewport() ?? 0;
        let viewPercentAccelerate = (100 - viewPercent) * 2;
        viewPercentAccelerate = (viewPercentAccelerate > 90) ? 90 : viewPercentAccelerate;

        const colorPercent = colorPercentage(viewPercent);
        const colorPercentAccelerate = colorPercentage(viewPercentAccelerate)

        contentElem.css('background-color', `${color + colorPercent}`);
        changeAppToolBarColor('actionBarLayout', `#${colorPercentAccelerate}000000`);
    }
}
const decodeURIFormat = (text) => {
    try {
        return decodeURIComponent(escape(text ?? ''));
    } catch (err) {}
    return text;
}

const promiseAllList = (object, val = '') => {
    callback.abortAllPromises();
    return Promise.all(object.map(async(data, index) => {
        if(!data.setItemList) {
            data.setItemList = async(index, val) => {
                data.itemList = await promiseFetch(data);
                return data;
            }
        }
        return await data.setItemList(index, val);
    }));
}
const adsRun = (onRetun) => {
    const key = `asyncAds_0`;
    const adFirst = !valCheck(localStorage.getItem('adFirst'));
    let adFinalStatus = '0';
    let adRetry = 0;
    const expire = setInterval(() => {
        if(adRetry >= 1) {
            window[key].resolve(d.adStatus.success);
            clearInterval(expire);
        }
        else if(adFinalStatus === '6') clearInterval(expire);
        else window[key].run(key, 'ca-app-pub-3940256099942544/1033173712', 1);

        adRetry++;
    }, 15000);

    window[key] = {
        resolve: (adStatus) => {
            adFinalStatus = adStatus;
            onRetun(adStatus);
        },
        run: (key, id, type) => {
            if(window.wv) window.wv.runAsyncAds(key, id, type);
            else window[key].resolve(d.adStatus.success);
        }
    };

    if(adFirst) {
        window[key].resolve(d.adStatus.success);
        localStorage.setItem('adFirst', 'false');
    }
    else if(v.developerMode) window[key].resolve(d.adStatus.success);
    else setTimeout(() => window[key].run(key, 'e2f22299', 0), 1000);

}
const promiseFetch = async(data) => {
    const itemRequestSettings = data.itemRequestSettings;
    const key = `asyncExternal_${encodeString(itemRequestSettings.url + itemRequestSettings.params)}`;
    callback.fetchPendingPromises.add(key);
    const result = (await androidAsyncFetch(key, itemRequestSettings)) ?? {};

    return result.itemList ?? result;
}
const promiseFetchSearch = async(data, val) => {
    const itemRequestSettings = data.itemRequestSettings;
    itemRequestSettings.url = itemRequestSettings.url + encodeURIComponent(textNormalize(val));
    const key = `asyncExternal_${encodeString(itemRequestSettings.url + itemRequestSettings.params)}`;
    callback.fetchPendingPromises.add(key);
    const result = (await androidAsyncFetch(key, itemRequestSettings)) ?? {};

    return result.itemList ?? result;
}
const promiseFetchPagination = async(data, page) => {
    return await new Promise(async(resolve, reject) => {
        const itemRequestSettings = data.itemRequestSettings;
        itemRequestSettings.url = getUrlPagination(itemRequestSettings.url, page);
        const key = `asyncExternal_${encodeString(itemRequestSettings.url + itemRequestSettings.params)}`;
        const resultData = await androidAsyncFetch(key, itemRequestSettings) ?? {};

        data.itemList = resultData.itemList;
        resolve({ pagination: resultData.pagination, data: data });
    });
}
const init = () => {
    d.userDB.myListStore.onChange = () => {
        const saveBtnElem = $(`[data-action=${v.actionToggleSaveItem}]`);
        const myListElem = $(`[data-list-id=myList]`);
        if(saveBtnElem[0]) {
            saveBtnElem.each(function() {
                const itemId = getViewByAttr($(this), '[data-details]').attr('data-id');
                const saveImg = injectObjCheck(getDataInListByValue(d.userDB.myList(), ["itemId", itemId])) ? i.saved : i.save;
                $(this).find('img').attr('src', saveImg);
            });
        }
        if(myListElem[0]) {
            d.userDB.myList()
            .map((data) => {
                const elem = myListElem.find(`.horizontal-scroller > section > [data-id='${data.itemId}']`);
                if(!elem[0]) {
                    myListElem.find('.horizontal-scroller > section').prependHtml(v.cardPosterSeved, data);
                    myListElem.find('.horizontal-scroller').animScrollTo([v.scrollHorizontal, 0, 300]);
                }
            });
            myListElem.find('.horizontal-scroller > section > *').each(function() {
                if(!injectObjCheck(getDataInListByValue(d.userDB.myList(), ["itemId", $(this).attr('data-id')]))) $(this).remove();
            });
            
            if(!myListElem.find('.horizontal-scroller > section > *')[0]) myListElem.addClass('hide');
            else myListElem.removeClass('hide');
        }
    }
    d.userDB.userSettingsStore.onChange = () => initPage(v.tagPage);
    documentElem.on('click', async function(event){
        const clickedElem = $(event.target);
        const actionType = parseInt(clickedElem.attr('data-action') ?? '-1');

        switch(actionType) {
            case v.actionToggleSaveItem: {
                d.userDB.myListStore.toggleItemData(getViewByAttr(clickedElem, '[data-details]').attr('data-details'));
                break;
            }
            case v.actionLoadCat: {
                const title = clickedElem.text() ?? "";
                const url = clickedElem.attr('data-url') ?? "";
                const validator = clickedElem.attr('data-validator') ?? "";
                const catType = getParam('catType') ?? '';
                const pageTag = getParam('tagPage') ?? v.tagPage;
                
                if(window.wv) window.wv.finishActivity();
                new AllInclusiveBroadcaster(() => {}, pageTag).postMessage({ action: v.broadcastLoadCat, settings: { title: title, url: url, validator: validator, catType: catType } });
                break;
            }
            case v.actionLoadDefaultCat: {
                const listElem = $('#list');
                const buttonsScrollerElem = getViewByAttr(clickedElem, '.horizontal-scroller');
                const loadList = () => {
                    buttonsScrollerElem.find('.activated span').text(t.catAll).ready(function() {
                        htmlElem.animScrollTo([v.scrollVertical, 430, 300], () => listElem.changeHtml(v.cardProgress, v.progressPoster, () => {
                            promiseAllList(d.pageList[clickedElem.attr('data-cat-id') ?? v.defaultId])
                            .then(data => listElem.changeHtml(v.titleList, data))
                            .catch(err => console.log('aborted'));
                        }));
                    });
                }

                if(!clickedElem.hasClass('active')) {

                    if(buttonsScrollerElem.find('.activated')[0]) {
                        buttonsScrollerElem.animScrollTo([v.scrollHorizontal, 0, 300]);
                        buttonsScrollerElem.find('section > button:first-of-type').after(clickedElem);
                    }
                    else buttonsScrollerElem.tabScroll(clickedElem);
                    buttonsScrollerElem.find('.active').removeClass('active');
                    clickedElem.addClass('active');
                    loadList();
                }
                break;
            }
            case v.actionRetryList:
            case v.actionRetryScrollerList: {
                const listElem = getViewByAttr(clickedElem, '[data-list-id]');
                const itemDecodeData = (parseJSON(listElem.attr('data-list-details') ?? 'e30=') ?? {});
                const loadList = async() => {
                    itemDecodeData.itemList = await promiseFetch(itemDecodeData);
                    listElem.changeHtml(v.titleList, [itemDecodeData]);
                }

                if(actionType === v.actionRetryList) htmlElem.animScrollTo([v.scrollVertical, 430, 300], () => listElem.changeHtml(v.cardProgress, v.progressPoster, () => loadList()));
                else clickedElem.progressBar(0, 'progress-img white', () => loadList());
                break;
            }
            case v.actionRetryAllList: {
                const listElem = getViewByAttr(clickedElem, '[data-list-id]');
                const itemDecodeData = (parseJSON(listElem.attr('data-list-details') ?? 'W10=') ?? []).map(data => {
                    data.setItemList = async() => {
                        data.itemList = await promiseFetch(data);
                        return data;
                    }
                    return data;
                });

                clickedElem.progressBar(1000, 'progress-img black', () => {
                    listElem.changeHtml(v.cardProgress, v.progressSearchResult, () => {
                        promiseAllList(itemDecodeData)
                        .then(data => listElem.changeHtml(v.cardSearchResultsContent, data))
                        .catch(err => console.log('aborted'));
                    });
                });
                break;
            }
            case v.actionChangeVisibleList: {
                const activeId = clickedElem.attr('data-cat-id');
                const listVisibleElem = $('.search-results, .tv-results');
                const run = () => {
                    if(activeId === 'all') {
                        listVisibleElem
                        .find('#list .active')
                        .removeClass('active');
                        listVisibleElem
                        .find(`[data-list-id]`)
                        .addClass('active');
                    }
                    else {
                        listVisibleElem
                        .find('#list .active')
                        .removeClass('active');
                        listVisibleElem
                        .find(`[data-list-id=${activeId}]`)
                        .addClass('active');
                    }
                }

                if(!clickedElem.hasClass('active')) {
                    getViewByAttr(clickedElem, '.horizontal-scroller, .vertical-scroller').tabScroll(clickedElem);
                    listVisibleElem
                    .find('.font-list .active')
                    .removeClass('active');
                    listVisibleElem
                    .find(`[data-cat-id=${activeId}]`)
                    .addClass('active');

                    if(listVisibleElem.find('.scroller')[0]) listVisibleElem.find('.scroller').animScrollTo([v.scrollVertical, 0, 300], () => run());
                    else run();
                }
                break;
            }
            case v.actionRetryContent: {
                clickedElem.progressBar(1000, 'progress-img black', () => initPage(v.tagPage));
                break;
            }
            case v.actionContact: {
                console.log('contact');
                break;
            }
            case v.actionOpenCategories: {
                const catType = $('.active[data-cats]').attr('data-cats');
                const catActive = clickedElem.text();
                const dialogData = JSON.stringify({
                    params: `tagPage=${v.tagPage}&dialogType=${v.dialogShowCategories}&catType=${catType}&catActive=${catActive}`,
                    bgColor: `#${d.colorAlpha[90]}000000`,
                    backStack: true
                });

                getViewByAttr(clickedElem, '.horizontal-scroller').tabScroll(clickedElem);
                if(window.wv) window.wv.openDialog(dialogData, false);
                else pageBroadcast.postMessage({ action: v.broadcastOpenDialog, dialogData: dialogData });
                break;
            }
            case v.actionCloseCategories: {
                const pageTag = getParam('tagPage') ?? v.tagPage;

                if(window.wv) window.wv.finishActivity();
                else new AllInclusiveBroadcaster(() => {}, pageTag).postMessage({ action: v.broadcastCloseDialog });
                break;
            }
            case v.actionCloseBottomSheet: {
                const pageTag = getParam('tagPage') ?? v.tagPage;

                $('.item-bottomsheet')
                .removeClass('active')
                .delay(100)
                .queue(function() {
                    if(window.wv) window.wv.finishActivity();
                    else new AllInclusiveBroadcaster(() => {}, pageTag).postMessage({ action: v.broadcastCloseDialog });
                });
                break;
            }
            case v.actionOpenSearchBox: {
                const val = getViewByAttr(clickedElem, '[data-search-val]').attr('data-search-val') ?? '';
                const isAutoSubmit = clickedElem.hasClass('submit') ?? false;
                const historySearchElem = `<div class="show-all" data-list-id="historySearch">${$('[data-list-id=historySearch] .vertical-scroller').prop('outerHTML')}</div><div data-list-id="resultsSearch"></div>`;
                const run = () => {
                    if(isAutoSubmit) {
                        if(!searchAreaElem.hasClass('active')) searchAreaElem.addClass('active').ready(function() { 
                            searchInputElem.val(val).ready(function() { 
                                searchFormElem.submit();
                            });
                        });
                        else searchInputElem.val(val).ready(function() { 
                            searchFormElem.submit();
                        });
                    }
                    else if(!searchAreaElem.hasClass('active')) searchAreaElem.addClass('active').ready(function() { 
                        searchInputElem.val(val).focus();
                    });
                    else searchInputElem.val(val).focus();
                }
                
                if(!searchResultsContainerElem.hasClass('active')) searchResultsContainerElem
                .delay(200)
                .queue(function() { 
                    $(this).css('opacity', '1');
                    $(this).dequeue();
                })
                .addClass('active')
                .html(historySearchElem)
                .ready(function() {
                    run();
                });
                else run();
                break;
            }
            case v.actionCloseSearchBox: {
                const isHaveResults = !searchResultsContainerElem.find('[data-list-id=resultsSearch]').hasClass('active') && !searchResultsContainerElem.find('[data-list-id=resultsSearch]').is(':empty');
            
                if(isHaveResults) searchResultsContainerElem.find('[data-list-id=resultsSearch]').addClass('active');
                else {
                    searchResultsContainerElem.removeClass('active').removeAttr('style').html('').ready(function() {
                        const isActive = searchAreaElem.hasClass('active');
                        
                        if(isActive) searchAreaElem.removeClass('active').ready(function() { 
                            searchInputElem.val('').blur();
                        });
                        else searchInputElem.blur();
                        callback.abortAllPromises();
                    });
                }
                break;
            }
            case v.actionClearSearchBox: {
                searchInputElem.val('').attr('value', '').focus();
                break;
            }
            case v.actionAudioRecognizerSearchBox: {
                if(window.wv) window.wv.sendBroadCast(v.tagPage, JSON.stringify({ action: v.ACTION_AUDIO_RECOGNIZER_START }));
                break;
            }
            case v.actionOpenColletion: {
                const itemDecodeData = (parseJSON(getViewByAttr(clickedElem, '[data-details]').attr('data-details') ?? 'e30=') ?? {});
                const object = btoa(encodeURIComponent(JSON.stringify({
                    itemTitle: itemDecodeData.itemTitle,
                    itemDesc: '',
                    itemId: 'colletion',
                    itemScrollType: v.verticalScrollerElem,
                    itemCardType: v.cardPoster,
                    itemRandomize: true,
                    itemEndless: true,
                    itemScrollAlert: v.errorInList,
                    itemRequestSettings: itemDecodeData.itemRequestSettings,
                    itemList: []
                })));
                const dialogData = JSON.stringify({
                    params: `tagPage=${v.tagPage}&dialogType=${v.dialogShowColletion}&data=${object}`,
                    bgColor: `#${d.colorAlpha[50]}000000`,
                    backStack: true
                });

                if(window.wv) window.wv.openDialog(dialogData, false);
                else pageBroadcast.postMessage({ action: v.broadcastOpenDialog, dialogData: dialogData });
                break;
            }
            case v.actionShowGuideList: {
                const channelListGuideElem = getViewByAttr(clickedElem, '[data-id]');
                const timeExpand = ($('[data-id]').length !== $('[data-id].inactive').length) ? 500 : 0;

                if(channelListGuideElem.find('.channel-list-guide section').length >= 2 &&channelListGuideElem.hasClass('inactive')) setTimeout(() => channelListGuideElem.removeClass('inactive'), timeExpand);
                $('[data-id]').addClass('inactive');
                break; 
            }
            case v.actionOpenEmbedPlayer: {
                const pageTag = getParam('tagPage') ?? v.tagPage;
                const playerElem = getViewByAttr(clickedElem, '[data-url]');
                const embed = (/true/).test(playerElem.attr('data-embed') ?? 'false');
                const url = playerElem.attr('data-url') ?? '';
                
                if(window.wv) window.wv.openEmbed(url, embed);
                else window.open(url, '_blank');
                $('.item-bottomsheet')
                .removeClass('active')
                .delay(100)
                .queue(function() {
                    if(window.wv) window.wv.finishActivity();
                    else new AllInclusiveBroadcaster(() => {}, pageTag).postMessage({ action: v.broadcastCloseDialog });
                });
                break;
            }
            case v.actionOpenCastPlayer: {
                const pageTag = getParam('tagPage') ?? v.tagPage;
                const playerElem = getViewByAttr(clickedElem, '[data-url]');
                const embed = (/true/).test(playerElem.attr('data-embed') ?? 'false');
                const type = playerElem.attr('data-type') ?? v.playerTv;
                const url = (type === v.playerTv) ? $('[data-embed="true"]').last().attr('data-url') : playerElem.attr('data-url') ?? '';
                
                if(window.wv) window.wv.openLink(url);
                else window.open(url, '_blank');
                $('.item-bottomsheet')
                .removeClass('active')
                .delay(100)
                .queue(function() {
                    if(window.wv) window.wv.finishActivity();
                    else new AllInclusiveBroadcaster(() => {}, pageTag).postMessage({ action: v.broadcastCloseDialog });
                });
                break;
            }
            case v.actionOpenTvPlayerOptions: {
                const itemDecodeData = (parseJSON(clickedElem.attr('data-details') ?? 'e30=') ?? {});
                const object = btoa(encodeURIComponent(JSON.stringify({
                    playerTitle: itemDecodeData.channelTitle ?? '',
                    playerType: v.playerTv,
                    playerVisibility: 'cast, play',
                    playerServers: itemDecodeData.playerServers ?? ''
                })));
                const dialogData = JSON.stringify({
                    params: `tagPage=${v.tagPage}&dialogType=${v.dialogShowPlayerOptions}&data=${object}`,
                    bgColor: `#${d.colorAlpha[50]}000000`,
                    backStack: true
                });

                if(window.wv) window.wv.openDialog(dialogData, false);
                else pageBroadcast.postMessage({ action: v.broadcastOpenDialog, dialogData: dialogData });
                break;
            }
            case v.actionOpenPlayerOptions: {
                const playerType = clickedElem.attr('data-type') ?? 'vizer';
                const playerVisibility = clickedElem.attr('data-visibility') ?? 'all';
                let playerServers = (parseJSON(clickedElem.attr('data-servers') ?? 'W10=') ?? []);
                if(playerType === v.playerVizerSerie) {
                    const itemDecodeData = (parseJSON(getParam('data') ?? 'e30=') ?? {});
                    const lastViewed = clickedElem.attr('data-id');
                    const data = {
                        itemRequestSettings: {
                            convertType: v.convertDetails,
                            method: v.methodPOST,
                            url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                            params: 'getEpisodeLanguages=' + playerServers[0].id ?? '',
                            validator: '"list":',
                            timeExpire: v.timeExpire,
                            font: v.fontVizerJs
                        }
                    }

                    playerServers = await promiseFetch(data);
                    itemDecodeData.lastViewed = lastViewed;
                    d.userDB.lastViewedStore.replaceItemData(itemDecodeData);
                    $(`[data-action=${v.actionShowLastViewed}]`).find('span').text(t.lastViewed + lastViewed);
                    $('.episodes button.active').removeClass('active');
                    clickedElem.addClass('active');
                }
                const object = btoa(encodeURIComponent(JSON.stringify({
                    playerTitle: (playerType === v.playerVizerSerie ? clickedElem.attr('data-id') ?? t.assistir : t.assistir).toLowerCase(),
                    playerType: playerType,
                    playerVisibility: playerVisibility,
                    playerServers: playerServers
                })));
                const dialogData = JSON.stringify({
                    params: `tagPage=${v.tagPage}&dialogType=${v.dialogShowPlayerOptions}&data=${object}`,
                    bgColor: `#${d.colorAlpha[50]}000000`,
                    backStack: true
                });

                if(window.wv) window.wv.openDialog(dialogData, false);
                else pageBroadcast.postMessage({ action: v.broadcastOpenDialog, dialogData: dialogData });
                break;
            }
            case v.actionReloadPage: {
                if(window.wv) window.wv.hide();
                setTimeout(() => window.location.href = window.location.href?.substring(window.location.href?.indexOf("?") + 1), 100);
                break;
            }
            case v.actionOpenDnsAlert: {
                const object = btoa(encodeURIComponent(JSON.stringify({
                    title: t.titleErro,
                    contentType: v.errorInDns
                })));
                const dialogData = JSON.stringify({
                    params: `tagPage=${v.tagPage}&dialogType=${v.dialogShowAlert}&data=${object}`,
                    bgColor: `#${d.colorAlpha[50]}000000`,
                    backStack: true
                });

                if(window.wv) window.wv.openDialog(dialogData, true);
                else pageBroadcast.postMessage({ action: v.broadcastOpenDialog, dialogData: dialogData });
                break;
            }
            case v.actionOpenDetails: {
                const detailsElem = getViewByAttr(clickedElem, '[data-details]');
                const itemEncodedData = detailsElem.attr('data-details') ?? {};
                
                if(v.tagPage === v.searchPage) d.userDB.itemStore.replaceItemData(detailsElem.attr('data-details'));
                if(v.tagPage === v.detailsPage) window.location.href = './pageDetails.html?data=' + itemEncodedData;
                else if(window.wv) window.wv.openDetails(itemEncodedData);
                else window.open('./pageDetails.html?data=' + itemEncodedData, '_blank');
                break;
            }
            case v.actionPlayTrailer: {
                ytPlayer.ytCallback.onPlay();
                break;
            }
            case v.actionLoadLangServers: {
                const id = clickedElem.attr('data-id') ?? '';
                const data = {
                    itemRequestSettings: {
                        convertType: v.convertPlayer,
                        method: v.methodPOST,
                        url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                        params: 'showPlayer=' + id,
                        validator: '"status":"success"',
                        timeExpire: v.timeExpire,
                        font: v.fontVizerJs
                    }
                }
                const init = () => promiseFetch(data)
                .then(sv => {
                    const playerServers = (valCheck(sv)) ? [{
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: `https://embed.warezcdn.com/video/${id}`,
                        embed: false
                    },
                    {
                        title: t.titlePlayerOpcional,
                        desc: t.descPlayerNoRecomended,
                        url: `https://vizer.tv/embed/getPlay.php?id=${id}&sv=${sv}`,
                        embed: false
                    }] : [{
                        title: t.titlePlayerPrincipal,
                        desc: t.descPlayerRecomended,
                        url: `https://embed.warezcdn.com/video/${id}`,
                        embed: false
                    }];

                    getViewByAttr(clickedElem, '#list').changeHtml(v.cardPlayer, { playerType: v.playerVizerLang, playerServers: playerServers });
                })
                .catch(err => {
                    clickedElem.find('.pr').remove();
                    clickedElem.removeClass('enabled');
                    if(window.wv) window.wv.showActionSnackBar(t.messageErrorLang);
                    else console.log(t.messageErrorLang);
                });

                clickedElem.progressBar(0, 'progress-img black', () => init());
                break;
            }
            case v.actionLoadEpisodes: {
                const seasonId = clickedElem.attr('data-season-id') ?? '';
                const data = {
                    itemRequestSettings: {
                        convertType: v.convertEpisodes,
                        method: v.methodPOST,
                        url: 'https://vizer.tv/includes/ajax/publicFunctions.php',
                        params: 'getEpisodes=' + seasonId,
                        validator: '"list":',
                        timeExpire: v.timeExpire,
                        font: v.fontVizerJs
                    }
                }
                const init = () => {
                    clickedElem[0].scrollIntoView({behavior: "smooth"});
                    $('.suggestionsOrSeasons .active .pr').remove();
                    $('.suggestionsOrSeasons .active.enabled').removeClass('enabled');
                    $('.suggestionsOrSeasons .active').removeClass('active');
                    clickedElem.addClass('active');
                    promiseFetch(data)
                    .then(data => {
                        if(injectObjCheck(data)) {
                            $('.episodes').changeHtml(v.btnList, data);
                        }
                        else {
                            clickedElem.removeClass('active');
                            if(window.wv) window.wv.showActionSnackBar(t.messageErrorEpisodes);
                            else console.log(t.messageErrorEpisodes);
                        }
                        clickedElem.find('.pr').remove();
                        clickedElem.removeClass('enabled');
                    })
                    .catch(err => {
                        clickedElem.find('.pr').remove();
                        clickedElem.removeClass('enabled');
                        clickedElem.removeClass('active');
                        if(window.wv) window.wv.showActionSnackBar(t.messageErrorEpisodes);
                        else console.log(t.messageErrorEpisodes);
                    });
                }

                if(!clickedElem.hasClass('active')) clickedElem.progressBar(0, 'progress-img black', () => init());
                break;
            }
            case v.actionShare: {
                if(window.wv) window.wv.openText('https://9max.wap.sh'); 
                else window.open('https://9max.wap.sh', '_blank');
                break;
            }
            case v.actionShowLastViewed: {
                if(clickedElem.find('span').text().includes(t.lastViewed)) {
                    const lastViewed = clickedElem.find('span').text()?.split(t.lastViewed)[1] ?? '';
                    const season = lastViewed?.split('T:')[1]?.split('E')[0] ?? '1';

                    $(`[data-list-id=seasons] [data-season=${season}]`)[0].click();
                }
                break;
            }
            case v.actionRemoveSaved: {
                const itemId = getViewByAttr(clickedElem, '[data-id]').attr('data-id') ?? '';

                d.userDB.myListStore.removeItemData(itemId);
                break;
            }
            case v.actionRegisterUser: {
                const pageTag = getParam('tagPage') ?? v.tagPage;

                d.userDB.userSettingsStore.replaceItemData(d.createUser());
                if(window.wv) window.wv.finishActivity();
                else new AllInclusiveBroadcaster(() => {}, pageTag).postMessage({ action: v.broadcastCloseDialog });
                break;
            }
        }
    });
    document.addEventListener('scroll', function (event) {
        const scrollElem = $(event.target),
        endlessElem = scrollElem.find('[data-endless-id]'),
        viewFlagElem = scrollElem.find('.view-flags');

        if(scrollElem.hasClass('horizontal-scroller') && endlessElem[0]) observerEndless(v.scrollHorizontal, endlessElem);
        else if((scrollElem.find('.vertical-scroller')[0] || scrollElem.hasClass('.vertical-scroller')[0]) && endlessElem[0]) observerEndless(v.scrollVertical, endlessElem);  
        if(viewFlagElem[0]) observerColorsChanges(viewFlagElem); 
    }, true);
    if(v.tagPage === v.searchPage) {
        searchFormElem.submit(function(e) {
            const val = textInputNormalize(searchInputElem.val()).trim();

            if(val.length !== 0 && /[a-zA-Z0-9]/i.test(val)) searchInputElem.blur().ready(function() { 
                requestAction(v.requestActionStartSearch, { val: val});
                searchResultsContainerElem.find('[data-list-id=resultsSearch]').addClass('active');
            });
            e.preventDefault();
        });
        searchInputElem.on("input focus blur", function(ev) {
            const savedVal = searchInputElem.attr('value') ?? '';
            const val = (ev.type === 'focus' && savedVal !== '' && ev.target.value === '') ? searchInputElem.attr('value') : textInputNormalize(ev.target.value);

            searchInputElem.val(val).attr('value', val);
            searchClearBtnElem.css('display', val.length>0 ? 'flex' : 'none');
            searchVoiceBtnElem.css('display', val.length>0 ? 'none' : 'flex');
            if(ev.type !== 'blur') {
                searchResultsContainerElem.find('[data-list-id=resultsSearch]').removeClass('active');
            }

        });
        d.userDB.searchStore.onChange = () => {
            const searchListElem = $('[data-list-id=historySearch]');
            
            if(searchListElem[0]) {
                d.userDB.searchList()
                .map((data, index) => {
                    const elem = searchListElem.find(`.vertical-scroller > section > [data-search-val='${data.itemId}']`);
                    if(!elem[0]) {
                        searchListElem.find('.vertical-scroller > section').prependHtml(v.cardHistoryText, data)
                    }
                    else if(elem.index() !== index) {
                        elem.remove();
                        searchListElem.find('.vertical-scroller > section').prependHtml(v.cardHistoryText, data);
                    }
                });
                
                if(!searchListElem.find('.vertical-scroller > section > *')[0]) searchListElem.addClass('hide');
                else searchListElem.removeClass('hide');
                if(d.userDB.searchList().length <= 5) searchListElem.find('.show-search-history').addClass('inactive');
                else searchListElem.find('.show-search-history').removeClass('inactive');
            }
        }
    }
    if(v.isIframe) bodyElem.css('background-color', 'transparent');
    initPage(v.tagPage);
}

function initPage(type) {
    changeAppToolBarColor('actionBarLayout', '#00000000');
    if(!containerElem.find('.content.progress')[0]) containerElem.changeHtml(v.cardProgress, v.progressPage, () => changeAppToolBarColor('actionBarLayout', '#00000000'));
    
    if(d.userDB.userSettingsInit()) {
        try {
            switch(type) {
                case v.homePage:
                case v.moviesPage:
                case v.seriesPage: {
                    promiseAllList(d.pageList[v.defaultId])
                    .then(data => containerElem.changeHtml(v.cardHomeContent, data))
                    .catch(err => console.log('aborted'));
                    break;
                }
                case v.searchPage: {
                    promiseAllList(d.pageList)
                    .then(data => searchContainerElem.changeHtml(v.cardSearchContent, data))
                    .catch(err => console.log('aborted'));
                    break;
                }
                case v.tvPage: {
                    promiseAllList(d.pageList)
                    .then(data => containerElem.changeHtml(v.cardTvContent, data, () => observerGuideChannel()))
                    .catch(err => console.log('aborted'));
                    break;
                }
                case v.dialogPage: {
                    switch(parseInt(getParam('dialogType') ?? '-1')) {
                        case v.dialogShowCategories: {
                            containerElem.changeHtml(v.cardCategoriesContent, { catType: getParam('catType'), catActive: getParam('catActive') });
                            break;
                        }
                        case v.dialogShowColletion: {
                            const itemDecodeData = (parseJSON(getParam('data') ?? 'e30=') ?? {});
                            const bottomSheetTitle = t.colletion + ' ' + itemDecodeData.itemTitle;
                            
                            containerElem.changeHtml(v.cardBottomSheetContent, {
                                itemTitle: bottomSheetTitle,
                                content: requestHtml(v.cardProgress, v.progressBar)
                            }, () => {
                                $('.item-bottomsheet')
                                .delay(100)
                                .queue(function() {
                                    $(this).addClass('active');
                                    setTimeout(() => {
                                        if(window.wv) window.wv.changeNavigationBarColor(rgba2hex($(this).css('background-color')));
                                        promiseAllList([itemDecodeData])
                                        .then(data => $(this).find('#list').changeHtml(v.titleList, data))
                                        .catch(err => console.log('aborted'));
                                    }, 100);
                                    $(this).dequeue();
                                });
                            });
                            break;
                        }
                        case v.dialogShowPlayerOptions: {
                            const itemDecodeData = (parseJSON(getParam('data') ?? 'e30=') ?? {});
                            const bottomSheetTitle = t.options + ' ' + itemDecodeData.playerTitle.toLowerCase();
                            const playerType = itemDecodeData.playerType ?? v.playerVizer;
                            const playerServers = itemDecodeData.playerServers ?? [];
                            const playerVisibility = itemDecodeData.playerVisibility ?? 'all';
                            containerElem.changeHtml(v.cardBottomSheetContent, {
                                itemTitle: bottomSheetTitle,
                                content: requestHtml(v.cardProgress, v.progressBar)
                            }, () => {
                                $('.item-bottomsheet')
                                .delay(100)
                                .queue(function() {
                                    $(this).addClass('active');
                                    setTimeout(() => {
                                        const init = () => {
                                            $(this).find('#list').changeHtml(v.cardPlayer, { playerType: playerType, playerServers: playerServers });
                                        }
        
                                        if(window.wv) window.wv.changeNavigationBarColor(rgba2hex($(this).css('background-color')));
                                        adsRun((adStatus) => {
                                            if(adStatus === '6') init();
                                        });
                                    }, 100);
                                    $(this).dequeue();
                                });
                            });
                            bodyElem.append(`<style>
                                ${playerVisibility === 'play' ? '.player-options > button:not(:first-child)' : playerVisibility === 'down' ? '.player-options > button:not(:last-child)' : playerVisibility === 'cast' ? '.player-options > button:last-of-type, .player-options > button:first-of-type' : playerVisibility === 'cast, play' ? '.player-options > button:last-of-type' : ''} {
                                    display: none;
                                }
                            </style>`);
                            break;
                        }
                        case v.dialogShowAlert: {
                            const itemDecodeData = (parseJSON(getParam('data') ?? 'e30=') ?? {});
                            const title = itemDecodeData.title;
                            const contentType = itemDecodeData.contentType;
        
                            containerElem.changeHtml(v.cardBottomSheetContent, {
                                itemTitle: title,
                                content: requestHtml(v.cardProgress, v.progressBar)
                            }, () => {
                                $('.item-bottomsheet')
                                .delay(100)
                                .queue(function() {
                                    $(this).addClass('active');
                                    setTimeout(() => {
                                        if(window.wv) window.wv.changeNavigationBarColor(rgba2hex($(this).css('background-color')));
                                        $(this).find('#list').changeHtml(v.cardAlert, { type: contentType });
                                    }, 100);
                                    $(this).dequeue();
                                });
                            });
                            break;
                        }
                        case v.dialogShowIntro: {
                            containerElem.changeHtml(v.cardAlert, { type: v.errorInUserRegister });
                            break;
                        }
                        case v.dialogShowUpdate: {
                            containerElem.changeHtml(v.cardAlert, { type: v.errorInUpdate });
                            break;
                        }
                    }
                    break;
                }
                case v.errorPage: {
                    containerElem.changeHtml(v.cardAlert, { type: v.errorInEmbed }, () => show());
                    break;
                }
                case v.detailsPage: {            
                    d.pageList.init()
                    .then(data => containerElem.changeHtml(v.cardDetailsContent, data))
                    .catch(err => console.log(err));
                    break;
                }
                default: {}
            }
        }
        catch(err) {
            containerElem.changeHtml(v.cardAlert, { type: v.errorInContainer });
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
async function androidAsyncFetch(key, itemRequestSettings) {
    return await new Promise((resolve, reject) => {
        let retry = 0;
        const font = itemRequestSettings.font,
        validator = itemRequestSettings.validator,
        url = (itemRequestSettings.url.includes("/gh/")) ? itemRequestSettings.url : 'https://zbigz.in/req.php?data=' + btoa(JSON.stringify(itemRequestSettings)),
        timeExpire = itemRequestSettings.timeExpire,
        convertType = itemRequestSettings.convertType,
        controller = new AbortController();

        window[key] = {
            resolve: (data, isCached = false) => {
                if(!injectObjCheck(data) && retry <= 4 && !validator.includes('search')) window[key].run();
                else if(!injectObjCheck(data) && retry <= 0 && validator.includes('search')) window[key].run();
                else {
                    resolve(data);
                    callback.fetchPendingPromises.remove(key);
                    delete window[key];
                }
                if(v.developerMode) console.log(`Fetch cached: ${isCached} || Retry: ${retry} || List: ${itemRequestSettings.url} || Params: ${valCheck(itemRequestSettings.params) ? itemRequestSettings.params : 'no have'}`);
                retry++;
            },
            androidResolve: (isCached) => {
                const response = htmlDecode(window.wv.getFetchValue(key));
                const resolveData = isCached ? JSON.parse(response) : convertElementToJson(convertType, font, (!valCheck(validator) || response.includes(validator)) ? response : v.null);

                if(valCheck(validator) && response.includes(validator) && !isCached) window.wv.putStorage(v.storeCache, key, timeExpire, JSON.stringify(resolveData));
                window[key].resolve(resolveData, isCached);
            },
            reject: () => {
                reject();
                callback.fetchPendingPromises.remove(key);
                if(window.wv) window.wv.abortAndroidAsyncFetch();
                else controller.abort();
                delete window[key];
            },
            run: () => {
                if(window.wv) window.wv.runAsyncFetch(key, JSON.stringify(itemRequestSettings));
                else {
                    fetch(url, { cache: "no-cache", signal: controller.signal })
                    .then(async response => await response.text())
                    .then(response => {
                        if(window[key]) window[key].resolve(convertElementToJson(convertType, font, (!valCheck(validator) || response.includes(validator)) ? response : v.null), true);
                    })
                    .catch(err => {
                        if(window[key]) window[key].resolve(v.null, false);
                    });
                }
            }
        };
        
        window[key].run();
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
function injectObjCheck(obj) {
    try {
        return Object.keys(obj).length !== 0;
    }catch (err) {}
    return false;
}
function objValidCheck(obj) {
    try {
        return Object.keys(obj).length !== 0 ? true : true;
    }catch (err) {}
    return false;
}
function topRatedCheck(data, itemTitle) {
    try {
        return injectObjCheck(data.filter((data) => valueComparePercentage(data.itemTitle, itemTitle) >= 80));
    }catch (err) {}
    return false;
}
function colorModeCheck(hex) {
    const hexCode = hex.charAt(0) === '#' 
                        ? hex.substr(1, 6)
                        : hex;

    const hexR = parseInt(hexCode.substr(0, 2), 16);
    const hexG = parseInt(hexCode.substr(2, 2), 16);
    const hexB = parseInt(hexCode.substr(4, 2), 16);
    // Gets the average value of the colors
    const contrastRatio = (hexR + hexG + hexB) / (255 * 3);

    return contrastRatio >= 0.3
        ? 'light'
        : 'dark';
}
function valReturn(v, r = '') {
    try {
        return textValueNormalize((v === '' || typeof v === 'undefined' || v === null || v === 'null') ? r ?? '' : v);
    } catch(err) {
        return textValueNormalize(r ?? '');
    }
}
function objReturn(data, key) {
    try {
        return data[key];
    }catch (err) {}
    return [];
}

function isObject(value) {
    try {
        return JSON.parse(value) instanceof Object;
    }catch(err) {}
    return false;
}

function changeDialog(data) {
    if(window.wv) {
        window.wv.sendBroadCast(v.tagPage, JSON.stringify(data));
    }
    else {
        if(data.action === v.ACTION_ClOSE_DIALOG) bodyElem.css('overflow-y', 'auto').find('#dialog').remove();
        else bodyElem.css('overflow-y', 'hidden').append(`<div id="dialog" style="background-color: ${data.bgColor.replace(/[1-9a-zA-Z]/g, '') + data.bgColor.replace(/[#0]/g, '')}"><iframe src="./pageDialog.html?${data.params}"></iframe></div>`);
    }
}
function changeAppToolBarColor(id, color) {
    try {
        window.wv.sendBroadCast(v.tagPage, JSON.stringify({
            action: v.ACTION_CHANGE_BG_COLOR,
            viewId: id,
            bgColor: color
        }));
    } catch(err) {}
}
function isMarquee(textWidth, maxWidth) {
    return textWidth[0] >= maxWidth || textWidth[1] ? true : false;
}
function randColor(url) {
    try {
        const color = window.wv.getImageColor(url);
        if(color !== '0' && color !== '#000000' && color !== '#ffffff') return color;
    }catch(err) {}
    let r = ('0'+(Math.random()*256|0).toString(16)).slice(-2),
        g = ('0'+(Math.random()*256|0).toString(16)).slice(-2),
        b = ('0'+(Math.random()*256|0).toString(16)).slice(-2);
    return '#'+r+g+b;
}
function encodeLetterToNumber(str) {
    const start = 96;
    const len = str.length;
    const out = [...str.toLowerCase()].reduce((out, char, index) => {
        const val = char.charCodeAt(0) - start
        const pow = Math.pow(26, len - index - 1);
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
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
function validateData(array, name) {
    let valid = false;
    try {
        array.map(data => { if(data.itemId !== v.storeMyList && data[name].length !== 0) valid = true; });
    } catch (err) {}
    return valid;
}
function clearArray(array) {
    try {
        while (array.length > 0) {
          array.pop();
        }
    } catch (err) {}
}

function getUrlPagination(url, page) {
    switch(true) {
        case url.includes('vizer'): {
            const lastPage = (page !== 0) ? (page-1) : 0;
            url = (url.includes('page=')) ? url.replace(`page=${lastPage}`, `page=${page}`) : `${url}&page=${page}`;
            break;
        }
        case url.includes('flixei'): {
            page++;
            const lastPage = (page !== 0) ? (page-1) : 0;
            url = url?.split(`/${lastPage}`)[0];
            url = `${url}/${page}`;
            break;
        }
        case url.includes('vfilmesonline') || url.includes('megafilmeshd50'): {
            page++;
            const lastPage = (page !== 0) ? (page-1) : 0;
            url = (url.includes('/page/')) ? url.replace(`page/${lastPage}`, `page/${page}`) : (url.includes('/?')) ? url.replace('/?', `/page/${page}/?`) : `${url}page/${page}/`;
            break;
        }
    }
    return url;
}
function getBodyContent(content) {
    content = content?.split('<body')[1]?.split('</body')[0];
    return `<body${content}</body>`;
}
function getPathNameByPosition(str, index) {
    try {
        return str.replace(/^.*\/\/[^\/]+/, '')?.split("/")[index];
    } catch(err) {
        return '';
    }
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
function getViewByAttr(elem, attr) {
    let loop =  true;
    let index = 0;
    let el = null;
    try {
        do
        {
            el = elem.parents().eq(index).filter(attr);
            const isDone = (!valCheck(el.html()) && index !== 99) ? true : false;
            index++;
            loop = isDone;
        } while (loop);
    }catch (err) {}
    
    return el;
}
function convertElementToJson(convertType, font, content) {
    const list = [];
    let pagination = false;

    switch(convertType) {
        case v.convertList: {
            switch(font) {
                case v.fontMySite: {
                    try {
                        const elem = $(content);
                        elem.find('div').each(function(index, elem) {
                            const el = $(elem);
                            const item = {};
        
                            const id = valReturn(el.attr('data-itemid')).trim();
                            const cardType = valReturn(el.attr('data-itemcardtype')).trim();
                            const type = valReturn(el.attr('data-itemtype')).trim();
                            const title = valReturn(el.attr('data-itemtitle')).trim();
                            const poster = valReturn(el.attr('data-itemposter')).trim();
                            const posterBackground = valReturn(el.attr('data-itemposterbackground')).trim();
                            const details = parseJSON(valReturn(el.attr('data-itemdetails') ?? 'e30=') ?? {});
                            const year = valReturn(el.attr('data-itemyear')).trim();
                            const rate = valReturn(el.attr('data-itemrate')).trim();
        
                            item.itemId = id;
                            item.itemCardType = cardType;
                            item.itemType = type;
                            item.itemTitle = title;
                            item.itemPoster = poster;
                            item.itemPosterBackground = posterBackground;
                            item.itemDetails = details;
                            item.itemYear = year;
                            item.itemRate = rate;
                            item.order = index;
                            list.push(item);
                        });
                    } catch(err) {console.log(err);}
                    break;
                }
                case v.fontVizerJs: {
                    try {
                        const json = JSON.parse(content) ?? {};
                        pagination = json.quantity >= 34;
                        $.each(json.list, function(index, data) {
                            const item = {};
                            const url = valReturn(data.url).trim();
                            const id = valReturn(data.id).trim();
                            const type = (!valCheck(data.status)) ? 'movie' : 'serie'.trim()
                            const title = valReturn(data.title).trim();
                            const poster = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/posterPt/185/${id}.webp`).trim();
                            const posterBackground = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/background/1280/${id}.jpg`).trim();
                            const year = valReturn(data.year).trim();
                            const rate = valReturn(data.rating).trim();
                            
        
                            item.itemId = url;
                            item.itemCardType = null;
                            item.itemType = type;
                            item.itemTitle = title;
                            item.itemPoster = poster;
                            item.itemPosterBackground = posterBackground;
                            item.itemDetails = {
                                itemType: `vizer-${type}`,
                                itemId: id,
                                itemName: textNormalize(title),
                                itemYear: year
                            };
                            item.itemYear = year;
                            item.itemRate = rate;
                            item.order = index;
                            
                            list.push(item);
                        });
                    } catch(err) {console.log(err);}
                    break;
                }
                case v.fontVizerSite: {
                    try {
                        const elem = $(getBodyContent(content));
                        elem.find('.listItems:last a').each(function(index, elem) {
                            const el = $(elem);
                            const item = {};
        
                            const url = valReturn(getPathNameByPosition(el.attr('href'), 2)).trim();
                            const id = valReturn(getPathNameByPosition(el.find('img').attr('src'), 5)?.split('.')[0]).trim();
                            const type = valReturn(getPathNameByPosition(el.attr('href'), 0).replace('filme', 'movie').replace('series', 'serie')).trim();
                            const title = valReturn(el.find('.infos span').text()).trim();
                            const poster = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/posterPt/185/${id}.webp`).trim();
                            const posterBackground = valReturn(`https://vizer.tv/content/${type === "movie" ? 'movies' : 'series'}/background/1280/${id}.jpg`).trim();
                            const year = valReturn(el.find(type === 'movie' ? '.y' : '.r').text()).trim();
                            const rate = valReturn(el.find(type === 'movie' ? '.r' : '.y').text()).trim();
        
                            item.itemId = url;
                            item.itemCardType = null;
                            item.itemType = type;
                            item.itemTitle = title;
                            item.itemPoster = poster;
                            item.itemPosterBackground = posterBackground;
                            item.itemDetails = {
                                itemType: `vizer-${type}`,
                                itemId: id,
                                itemName: textNormalize(title),
                                itemYear: year
                            };
                            item.itemYear = year;
                            item.itemRate = rate;
                            item.order = index;
                            
                            list.push(item);
                        });
                    } catch(err) {console.log(err);}
                    break;
                }
                case v.fontFlixeiSite: {
                    try {
                        const elem = $(getBodyContent(content));
                        pagination = elem.find('[rel=next]')[0] ? true : false;
                        elem.find('.generalMoviesList:last a').each(function(index, elem) {
                            const el = $(elem);
                            const item = {};
        
                            const url = valReturn(getPathNameByPosition(el.attr('href'), 2)).trim();
                            const id = valReturn(getPathNameByPosition(el.find('img').attr('src'), 5)?.split('.')[0]).trim();
                            const type = valReturn(getPathNameByPosition(el.attr('href'), 1).replace('filme', 'movie').replace('series', 'serie')).trim();
                            const title = valReturn(el.find('.i span').text()).trim();
                            const poster = valReturn(`https://flixei.com/content/${type === 'movie' ? 'movies' : 'series'}/posterPt/185/${id}.webp`).trim();
                            const posterBackground = valReturn(`https://flixei.com/content/${type === 'movie' ? 'movies' : 'series'}/background/1280/${id}.jpg`).trim();
                            const year = valReturn(el.find('.y').text()).trim();
                            const rate = valReturn(el.find('.r').text()).trim();
        
                            item.itemId = url;
                            item.itemCardType = null;
                            item.itemType = type;
                            item.itemTitle = title;
                            item.itemPoster = poster;
                            item.itemPosterBackground = posterBackground;
                            item.itemDetails = {
                                itemType: `vizer-${type}`,
                                itemId: id,
                                itemName: textNormalize(title),
                                itemYear: year
                            };
                            item.itemYear = year;
                            item.itemRate = rate;
                            item.order = index;
                            
                            list.push(item);
                        });
                    } catch(err) {console.log(err);}
                    break;
                }
                case v.fontCinemaoSite: {
                    try {
                        const elem = $(getBodyContent(content));
                        pagination = elem.find('#nextpagination')[0] ? true : false;
                        elem.find('.items:last article, .search-page .result-item article').each(function(index, elem) {
                            const el = $(elem);
                            const item = {};
        
                            const url = valReturn(getPathNameByPosition(el.find('a').attr('href'), 2)).trim();
                            const type = valReturn(getPathNameByPosition(el.find('a').attr('href'), 1).replace('filme', 'movie').replace('series', 'serie')).trim();
                            const title = valReturn(el.find('img').attr('alt')?.split(' (')[0]).trim();
                            const poster = valReturn(el.find('img').attr('data-wpfc-original-src') ?? el.find('img').attr('src')).replace('-150x150','-185x278').trim();
                            const posterBackground = valReturn(el.find('img').attr('data-wpfc-original-src') ?? el.find('img').attr('src')).replace('-185x278', '').replace('-150x150','').trim();
                            const year = (el.find('span [rel=tag]')[0]) ? valReturn(el.find('span [rel=tag]').text()).trim() : valReturn(el.find('.year').text()).trim();
                            const rate = valReturn(el.find('.rating').text()?.split(' ')[1] ?? el.find('.rating').text()).trim();
        
                            item.itemId = url;
                            item.itemCardType = null;
                            item.itemType = type;
                            item.itemTitle = title;
                            item.itemPoster = poster;
                            item.itemPosterBackground = posterBackground;
                            item.itemDetails = {
                                itemType: `cinemao-${type}`,
                                itemName: textNormalize(title),
                                itemYear: year
                            };
                            item.itemYear = year;
                            item.itemRate = rate;
                            item.order = index;
        
                            if(type === 'movie') {
                                list.push(item);
                            }
                        });
                    } catch(err) {console.log(err);}
                    break;
                }
                case v.fontMeuGuia: {
                    try {
                        const elem = $(getBodyContent(content));
                        let counter = 0;
                        elem.find('.mw li').each(function() {
                            const elem = $(this);

                            if(counter === 5) return false;
                            if(!elem.hasAttr("class")) {
                                const item = {};

                                item.guideTime = valReturn(elem.find('.time').text()).trim();
                                item.guideTitle = valReturn(elem.find('.licontent h2').text()).trim();
                                item.guideDesc = valReturn(elem.find('.licontent h3').text(), t.entretenimento).trim();
                                list.push(item);
                                counter++;
                            }
                        });

                    } catch(err) {console.log(err);}
                }
                default: return (injectObjCheck(list)) ? { itemList: list, pagination: pagination } : null;
            }
            return (injectObjCheck(list)) ? { itemList: list.sort((a, b) => a.order - b.order).map(({order, ...rest}) => rest), pagination: pagination } : null;
        }
        case v.convertDetails: {
            switch(font) {
                case v.fontVizerSite: {
                    try {
                        if(content.includes('class="list bslider"')) {
                            const elem = $(getBodyContent(content));

                            elem.find('.list.bslider div').each(function() {
                                const el = $(this);
                                const item = {};
                                
                                item.season = el.text() ?? '';
                                item.seasonId = el.attr('data-season-id') ?? '';
                                list.push(item);
                            });
                            return list;
                        }
                        else {
                            const json = JSON.parse(`{${(content?.split('videoPlayerBox({')[1])?.split('}}});')[0]}}}}`) ?? {};
                            const array = Object.keys(json.list ?? {});
                            array.map((key, index) => {
                                const data = json.list[key];
                                const item = {}
        
                                item.lang = (array.length <= 1) ? (t.oneLang + ((data.lang === "2") ? t.dublado : t.legendado).toLowerCase()) : ((data.lang === "2") ? t.dublado : t.legendado);
                                item.id = data.id;
                                list.push(item);
                            });
                            return { playerServers: list };
                        }
                    } catch (err) {console.log(err);}
                    return null;
                }
                case v.fontVizerJs: {
                    try {
                        const json = JSON.parse(content) ?? {};
                        const array = Object.keys(json.list ?? {});
                            array.map((key, index) => {
                                const data = json.list[key];
                                const item = {}
        
                                item.lang = (array.length <= 1) ? (t.oneLang + ((data.lang === "2") ? t.dublado : t.legendado).toLowerCase()) : ((data.lang === "2") ? t.dublado : t.legendado);
                                item.id = data.id;
                                list.push(item);
                            });

                            return list;
                    } catch(err) {console.log(err);}
                    return null;
                }
                case v.fontCinemaoSite: {
                    try {
                        const elem = $(getBodyContent(content));
                        const src = (elem.find('.metaframe').attr('data-wpfc-original-src') ?? elem.find('.metaframe').attr('src') ?? '')?.split('video.php?url=')[1];
                        const item = {
                            title: t.titlePlayerPrincipal,
                            desc: t.descPlayerRecomended,
                            url: src,
                            embed: false
                        };

                        list.push(item);
                        return { playerServers: list };
                    } catch (err) {console.log(err);}
                    return null;

                }
                case v.fontTmdbTrailerJs: {
                    try {
                        return { itemTmdbTrailer: ((JSON.parse(content)).results[0] ?? {})?.key ?? '' };
                    } catch (err) {console.log(err);}
                    return null;
                }
                case v.fontTmdbJs: {
                    try {
                        const itemDecodeData = (parseJSON(getParam('data') ?? 'e30=') ?? {});
                        let json = (JSON.parse(content)).results.filter(({ title }) => valueComparePercentage(textNormalize(title), textNormalize(itemDecodeData.itemTitle)) >= 55)[0] ?? {};
                        json = injectObjCheck(json) ? json : (JSON.parse(content)).results[0] ?? {};

                        return { itemTmdbId: json.id ?? 0, itemSinopse: json.overview ?? '', itemGeners: d.genres.filter(data => injectObjCheck(json.genre_ids.filter(id => id === data.id))).map(data => data.name) ?? [] };
                    } catch (err) {console.log(err);}
                    return null;
                }
            }
            return null;
        }
        case v.convertPlayer: {
            switch(font) {
                case v.fontVizerJs: {
                    try {
                        const json = JSON.parse(content) ?? {};
                        return json.mixdrop ? 'mixdrop' : json.streamtape ? 'streamtape' : '';
                    } catch(err) {console.log(err);}
                    return null;
                }
            }
            return null;
        }
        case v.convertEpisodes: {
            switch(font) {
                case v.fontVizerJs: {
                    try {
                        const json = JSON.parse(content) ?? {};
                        const season = $('[data-list-id=seasons] .active').attr('data-season') ?? '';
                        const lastViewed = $(`[data-action=${v.actionShowLastViewed}]`).find('span').text()?.split(t.lastViewed)[1] ?? '';
                        let episode = 0;

                        $.each(json.list, function(index, data) {
                            episode++;
                            const item = {};
                            const title = valReturn(data.title, t.episode + episode);
                            const subTitle = t.episode + episode;
                            const poster = 'https://image.tmdb.org/t/p/w300/' + data.img;
                            const servers = btoa(encodeURIComponent(JSON.stringify([{ id: data.id ?? '' }])));
                            const isLastViewed = lastViewed === `T:${season}E:${episode}`; 
                            

                            item.text = `<span class="title">${title}</span><br><span class="subtitle">${subTitle}</span>`;
                            item.class = `btn larger retangle ${isLastViewed ? ' active' : ''} width-spaces-pd`;
                            item.attrs = `data-action="${v.actionOpenPlayerOptions}" data-visibility="all" data-type="${v.playerVizerSerie}" data-servers="${servers}" data-id="T:${season}E:${episode}"`;
                            item.imgSettings = {
                                leftImg: poster,
                                leftClass: 'poster-img-left',
                                leftLazy: true
                            }

                            list.push(item);
                        });
                        return list;
                    } catch(err) {console.log(err);}
                    return null;
                }
            }
            return null;
        }
    }
}

$.fn.progressBar = function(time, className, onRetun) {
    if(!this.hasClass('enabled')) {
        this.prependHtml(v.progressBarElem, { class: 'pr ' + className }, () => {
            if(time === 0) {
                try { onRetun(this.find('.pr'), 'enabled'); }catch(err) {}
            }
            else {
                setTimeout(() => {
                    this.find('.pr').remove();
                    this.removeClass('enabled');
                    try { onRetun(); }catch(err) {}
                }, time);
            }
        });
        this.addClass('enabled');
    }
}
$.fn.tabScroll = function(elem, onRetun) {
    if(elem.percentHorizontalInViewport() !== 100 && !elem.hasClass('active')) this.animScrollTo([v.scrollHorizontal, elem.position().left + this.scrollLeft() - 15, 300], () => { try { onRetun('end'); }catch (err) {} });
    else try { onRetun('end'); }catch (err) {}
}
$.fn.animScrollTo = function(obj, onRetun) {
    const scrollValidate = (obj[0] === v.scrollHorizontal ? this.scrollLeft() : this.scrollTop()) !== obj[1];
    if(scrollValidate) {
        const animAction = obj[0] === v.scrollHorizontal ? { scrollLeft: obj[1] } : { scrollTop: obj[1] };
        const animSettings = { duration: obj[2], complete: () => { try { onRetun('end'); }catch (err) {} } };
        this.animate(animAction, animSettings);
    }
    else try { onRetun('end'); }catch (err) {}
}
$.fn.changeHtml = function(type, data, onReady) {
    this.html(requestHtml(type, data)).ready(function() { try { onReady(); }catch (err) {} });
}
$.fn.replaceHtml = function(type, data, onReady) {
    this.replaceWith(requestHtml(type, data)).ready(function() { try { onReady(); }catch (err) {} });
}
$.fn.prependHtml = function(type, data, onReady) {
    this.prepend(requestHtml(type, data)).ready(function() { try { onReady(); }catch (err) {} });
}
$.fn.appendHtml = function(type, data, onReady) {
    this.append(requestHtml(type, data)).ready(function() { try { onReady(); }catch (err) {} });
}
$.fn.percentVerticalInViewport = function(elem = $(document)) {
    var windowHeight = $(window).height(),
        docScroll = elem.scrollTop(),
        divPosition = this.offset().top,
        divHeight = this.height(),
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
}
$.fn.percentHorizontalInViewport = function(elem = $(document)) {
    var windowHeight = $(window).width(),
        docScroll = elem.scrollLeft(),
        divPosition = this.offset().left,
        divHeight = this.width(),
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
}
$.fn.hasAttr = function(name) {  
    return this.attr(name) !== undefined;
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val); 
    if (index >= 0) this.splice(index, 1);
    return this;
}
Array.prototype.add = function(val) {
    if(!this.includes(val)) this.push(val);
}

d.userDB.initializer().then(() => init());
parentSuccessScript = true;
