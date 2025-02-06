
injectApp = (() => {
    try { if(typeof injectApp !== 'undefined') return injectApp; } catch (err) {}
    return null;
})();
injectApp?.success(true);
parentSuccessScript = true;
