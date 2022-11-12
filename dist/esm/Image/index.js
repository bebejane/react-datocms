var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { encode } from 'universal-base64';
var isSsr = typeof window === 'undefined';
var isIntersectionObserverAvailable = isSsr
    ? false
    : !!window.IntersectionObserver;
var imageAddStrategy = function (_a) {
    var lazyLoad = _a.lazyLoad, inView = _a.inView, loaded = _a.loaded;
    if (!lazyLoad) {
        return true;
    }
    if (isSsr) {
        return false;
    }
    if (isIntersectionObserverAvailable) {
        return inView || loaded;
    }
    return true;
};
var imageShowStrategy = function (_a) {
    var lazyLoad = _a.lazyLoad, loaded = _a.loaded;
    if (!lazyLoad) {
        return true;
    }
    if (isSsr) {
        return false;
    }
    if (isIntersectionObserverAvailable) {
        return loaded;
    }
    return true;
};
var buildSrcSet = function (src, width, candidateMultipliers) {
    if (!src || !width) {
        return undefined;
    }
    return candidateMultipliers
        .map(function (multiplier) {
        var url = new URL(src);
        if (multiplier !== 1) {
            url.searchParams.set('dpr', "".concat(multiplier));
            var maxH = url.searchParams.get('max-h');
            var maxW = url.searchParams.get('max-w');
            if (maxH) {
                url.searchParams.set('max-h', "".concat(Math.floor(parseInt(maxH) * multiplier)));
            }
            if (maxW) {
                url.searchParams.set('max-w', "".concat(Math.floor(parseInt(maxW) * multiplier)));
            }
        }
        var finalWidth = Math.floor(width * multiplier);
        if (finalWidth < 50) {
            return null;
        }
        return "".concat(url.toString(), " ").concat(finalWidth, "w");
    })
        .filter(Boolean)
        .join(',');
};
export var Image = forwardRef(function (_a, ref) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var className = _a.className, _m = _a.fadeInDuration, fadeInDuration = _m === void 0 ? 500 : _m, intersectionTreshold = _a.intersectionTreshold, intersectionThreshold = _a.intersectionThreshold, intersectionMargin = _a.intersectionMargin, pictureClassName = _a.pictureClassName, _o = _a.lazyLoad, rawLazyLoad = _o === void 0 ? true : _o, style = _a.style, pictureStyle = _a.pictureStyle, _p = _a.layout, layout = _p === void 0 ? 'intrinsic' : _p, objectFit = _a.objectFit, objectPosition = _a.objectPosition, data = _a.data, onLoad = _a.onLoad, _q = _a.usePlaceholder, usePlaceholder = _q === void 0 ? true : _q, _r = _a.priority, priority = _r === void 0 ? false : _r, sizes = _a.sizes, _s = _a.srcSetCandidates, srcSetCandidates = _s === void 0 ? [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4] : _s;
    var lazyLoad = priority ? false : rawLazyLoad;
    var imageRef = useRef(null);
    var _t = useState(false), loaded = _t[0], setLoaded = _t[1];
    var handleLoad = function () {
        onLoad === null || onLoad === void 0 ? void 0 : onLoad();
        setLoaded(true);
    };
    var _u = useInView({
        threshold: intersectionThreshold || intersectionTreshold || 0,
        rootMargin: intersectionMargin || '0px 0px 0px 0px',
        triggerOnce: true,
        fallbackInView: true
    }), viewRef = _u[0], inView = _u[1];
    var callbackRef = useCallback(function (_ref) {
        viewRef(_ref);
        if (ref)
            ref.current = _ref;
    }, [viewRef]);
    useEffect(function () {
        if (imageRef.current === null)
            return;
        if (imageRef.current.complete) {
            console.log('image loaded from cache');
            handleLoad();
        }
    }, [imageRef]);
    var absolutePositioning = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    };
    var addImage = imageAddStrategy({
        lazyLoad: lazyLoad,
        inView: inView,
        loaded: loaded
    });
    var showImage = imageShowStrategy({
        lazyLoad: lazyLoad,
        inView: inView,
        loaded: loaded
    });
    var webpSource = data.webpSrcSet && (React.createElement("source", { srcSet: data.webpSrcSet, sizes: (_b = sizes !== null && sizes !== void 0 ? sizes : data.sizes) !== null && _b !== void 0 ? _b : undefined, type: "image/webp" }));
    var regularSource = (React.createElement("source", { srcSet: (_c = data.srcSet) !== null && _c !== void 0 ? _c : buildSrcSet(data.src, data.width, srcSetCandidates), sizes: (_d = sizes !== null && sizes !== void 0 ? sizes : data.sizes) !== null && _d !== void 0 ? _d : undefined }));
    var transition = fadeInDuration > 0 ? "opacity ".concat(fadeInDuration, "ms") : undefined;
    var placeholder = usePlaceholder && (data.bgColor || data.base64) ? (React.createElement("img", { role: "presentation", "aria-hidden": "true", alt: "", src: (_e = data.base64) !== null && _e !== void 0 ? _e : undefined, style: __assign({ backgroundColor: (_f = data.bgColor) !== null && _f !== void 0 ? _f : undefined, objectFit: objectFit, objectPosition: objectPosition, transition: transition, opacity: showImage ? 0 : 1, 
            // During the opacity transition of the placeholder to the definitive version,
            // hardware acceleration is triggered. This results in the browser trying to render the
            // placeholder with your GPU, causing blurred edges. Solution: style the placeholder
            // so the edges overflow the container
            position: 'absolute', left: '-5%', top: '-5%', width: '110%', height: '110%' }, pictureStyle) })) : null;
    var width = data.width, aspectRatio = data.aspectRatio;
    var height = (_g = data.height) !== null && _g !== void 0 ? _g : (aspectRatio ? width / aspectRatio : 0);
    var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(width, "\" height=\"").concat(height, "\"></svg>");
    var sizer = layout !== 'fill' ? (React.createElement("img", { className: pictureClassName, style: {
            display: 'block',
            width: '100%'
        }, src: "data:image/svg+xml;base64,".concat(encode(svg)), "aria-hidden": "true", alt: "" })) : null;
    return (React.createElement("div", { ref: callbackRef, className: className, style: __assign(__assign({ overflow: 'hidden' }, (layout === 'fill'
            ? absolutePositioning
            : layout === 'intrinsic'
                ? { position: 'relative', width: '100%', maxWidth: width }
                : layout === 'fixed'
                    ? { position: 'relative', width: width }
                    : { position: 'relative', width: '100%' })), style) },
        sizer,
        placeholder,
        addImage && (React.createElement("picture", null,
            webpSource,
            regularSource,
            data.src && (React.createElement("img", { ref: imageRef, src: data.src, alt: (_h = data.alt) !== null && _h !== void 0 ? _h : '', title: (_j = data.title) !== null && _j !== void 0 ? _j : undefined, onLoad: handleLoad, fetchpriority: priority ? 'high' : undefined, className: pictureClassName, style: __assign(__assign(__assign({ opacity: showImage ? 1 : 0, transition: transition }, absolutePositioning), { objectFit: objectFit, objectPosition: objectPosition }), pictureStyle) })))),
        React.createElement("noscript", null,
            React.createElement("picture", null,
                webpSource,
                regularSource,
                data.src && (React.createElement("img", { src: data.src, alt: (_k = data.alt) !== null && _k !== void 0 ? _k : '', title: (_l = data.title) !== null && _l !== void 0 ? _l : undefined, className: pictureClassName, style: __assign(__assign({}, absolutePositioning), pictureStyle), loading: lazyLoad ? 'lazy' : undefined, fetchpriority: priority ? 'high' : undefined }))))));
});
//# sourceMappingURL=index.js.map