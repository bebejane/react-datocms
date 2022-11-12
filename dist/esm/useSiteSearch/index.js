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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useCallback, useEffect, useState } from 'react';
import reactStringReplace from 'react-string-replace';
var defaultHighlighter = function (text, key) { return (React.createElement("mark", { key: key }, text)); };
function MatchHighlighter(_a) {
    var children = _a.children, highlighter = _a.highlighter, context = _a.context;
    return (React.createElement(React.Fragment, null, reactStringReplace(children, /\[h\](.+?)\[\/h\]/g, function (match, index) {
        return highlighter(match, index.toString(), context);
    })));
}
export function useSiteSearch(config) {
    var _this = this;
    var _a, _b, _c;
    var _d = useState({
        query: ((_a = config.initialState) === null || _a === void 0 ? void 0 : _a.query) || '',
        page: ((_b = config.initialState) === null || _b === void 0 ? void 0 : _b.page) || 0,
        locale: (_c = config.initialState) === null || _c === void 0 ? void 0 : _c.locale
    }), state = _d[0], setState = _d[1];
    var _e = useState(), error = _e[0], setError = _e[1];
    var _f = useState(), response = _f[0], setResponse = _f[1];
    var resultsPerPage = config.resultsPerPage || 8;
    useEffect(function () {
        var isCancelled = false;
        var run = function () { return __awaiter(_this, void 0, void 0, function () {
            var request, response_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        setError(undefined);
                        if (!state.query) {
                            setResponse({ data: [], meta: { total_count: 0 } });
                            return [2 /*return*/];
                        }
                        setResponse(undefined);
                        request = {
                            filter: {
                                query: state.query,
                                locale: state.locale,
                                build_trigger_id: config.buildTriggerId
                            },
                            page: {
                                limit: resultsPerPage,
                                offset: resultsPerPage * state.page
                            }
                        };
                        if (config.fuzzySearch) {
                            request.fuzzy = 'true';
                        }
                        return [4 /*yield*/, config.client.searchResults.rawList(request)];
                    case 1:
                        response_1 = _a.sent();
                        if (!isCancelled) {
                            setResponse(response_1);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (isCancelled) {
                            return [2 /*return*/];
                        }
                        if (e_1 instanceof Error) {
                            setError(e_1.message);
                        }
                        else {
                            setError('Unknown error!');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        run();
        return function () {
            isCancelled = true;
        };
    }, [
        resultsPerPage,
        state,
        config.buildTriggerId,
        config.fuzzySearch,
        config.client.config.apiToken,
    ]);
    var publicSetQuery = useCallback(function (newQuery) {
        setState(function (oldState) { return (__assign(__assign({}, oldState), { query: newQuery, page: 0 })); });
    }, [setState]);
    var publicSetPage = useCallback(function (newPage) {
        setState(function (oldState) { return (__assign(__assign({}, oldState), { page: newPage })); });
    }, [setState]);
    var publicSetLocale = useCallback(function (newLocale) {
        setState(function (oldState) { return (__assign(__assign({}, oldState), { locale: newLocale, page: 0 })); });
    }, [setState]);
    var highlighter = config.highlightMatch || defaultHighlighter;
    return {
        state: {
            query: state.query,
            setQuery: publicSetQuery,
            page: state.page,
            setPage: publicSetPage,
            locale: state.locale,
            setLocale: publicSetLocale
        },
        error: error,
        data: state.query === ''
            ? {
                pageResults: [],
                totalResults: 0,
                totalPages: 0
            }
            : response
                ? {
                    pageResults: response.data.map(function (rawSearchResult) { return ({
                        id: rawSearchResult.id,
                        url: rawSearchResult.attributes.url,
                        title: rawSearchResult.attributes.highlight.title ? (React.createElement(MatchHighlighter, { highlighter: highlighter, context: "title" }, rawSearchResult.attributes.highlight.title[0])) : (rawSearchResult.attributes.title),
                        bodyExcerpt: rawSearchResult.attributes.highlight.body ? (React.createElement(MatchHighlighter, { highlighter: highlighter, context: "bodyExcerpt" }, rawSearchResult.attributes.highlight.body[0])) : (rawSearchResult.attributes.body_excerpt),
                        raw: rawSearchResult
                    }); }),
                    totalResults: response.meta.total_count,
                    totalPages: Math.ceil(response.meta.total_count / resultsPerPage)
                }
                : undefined
    };
}
//# sourceMappingURL=index.js.map