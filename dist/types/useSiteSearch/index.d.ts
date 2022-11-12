import React from 'react';
declare type SearchResultInstancesHrefSchema = {
    page?: {
        offset?: number;
        limit?: number;
        [k: string]: unknown;
    };
    filter: {
        fuzzy?: string;
        query: string;
        build_trigger_id?: string;
        locale?: string;
        [k: string]: unknown;
    };
    [k: string]: unknown;
};
declare type SearchResultInstancesTargetSchema = {
    data: RawSearchResult[];
    meta: {
        total_count: number;
    };
};
export declare type RawSearchResult = {
    type: 'search_result';
    id: string;
    attributes: {
        title: string;
        body_excerpt: string;
        url: string;
        score: number;
        highlight: {
            title?: string[] | null;
            body?: string[] | null;
        };
    };
};
declare class GenericClient {
    config: {
        apiToken: string | null;
    };
    searchResults: {
        rawList(queryParams: SearchResultInstancesHrefSchema): Promise<SearchResultInstancesTargetSchema>;
    };
}
declare type Highlighter = (match: string, key: string, context: 'title' | 'bodyExcerpt') => React.ReactNode;
export declare type UseSiteSearchConfig<Client extends GenericClient> = {
    client: Client;
    buildTriggerId: string;
    fuzzySearch?: boolean;
    resultsPerPage?: number;
    highlightMatch?: Highlighter;
    initialState?: {
        locale?: string;
        page?: number;
        query?: string;
    };
};
declare type SearchResult = {
    id: string;
    title: React.ReactNode;
    bodyExcerpt: React.ReactNode;
    url: string;
    raw: RawSearchResult;
};
export declare type UseSiteSearchData = {
    pageResults: SearchResult[];
    totalResults: number;
    totalPages: number;
};
export declare type UseSiteSearchResult = {
    state: {
        query: string;
        setQuery: (newQuery: string) => void;
        locale: string | undefined;
        setLocale: (newLocale: string) => void;
        page: number;
        setPage: (newPage: number) => void;
    };
    data?: UseSiteSearchData;
    error?: string;
};
export declare function useSiteSearch<Client extends GenericClient>(config: UseSiteSearchConfig<Client>): UseSiteSearchResult;
export {};
