/* eslint-env browser */

/**
 * LazyLoad for Post Images
 * Used for lazyLoading the imageds of the post cards
 *
 * Usage:
 * ```
 * Casper.lazyLoad({
 *     navSelector: '.site-nav-main',
 *     titleSelector: '.post-full-title',
 *     activeClass: 'nav-post-title-active'
 * });
 * ```
 */

(function (window, document) {

    var ticking = false;

    function onScroll() {
        requestTick();
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }
    
    function update() {
        var notLoaded = [].slice.call(document.querySelectorAll('.loader'));

        for(var i = 0; i < notLoaded.length; i++) {
            var el = notLoaded[i];
            var pos = el.getBoundingClientRect();
            if (
                (pos.top >= 0 && pos.top <= window.innerHeight + 50)
                || (pos.bottom >= 0 && pos.bottom <= window.innerHeight)
            ) {
                var img = el.querySelector('img');
                img.setAttribute('src', img.getAttribute('data-src'));
                img.setAttribute('srcset', img.getAttribute('data-srcset'));
                el.classList.remove('loader');
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive: true});

    update();

})(window, document);
