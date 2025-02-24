import { renderNodeRule, renderMarkRule, TransformedMeta, TransformMetaFn, RenderMarkRule } from 'datocms-structured-text-generic-html-renderer';
import { Record as StructuredTextGraphQlResponseRecord, Document as StructuredTextDocument, RenderError, RenderResult, RenderRule, Node, StructuredText as StructuredTextGraphQlResponse } from 'datocms-structured-text-utils';
import { ReactElement } from 'react';
export { renderNodeRule, renderMarkRule, RenderError };
export { renderNodeRule as renderRule };
export type { StructuredTextGraphQlResponse, StructuredTextDocument, StructuredTextGraphQlResponseRecord, };
declare type AdapterReturn = ReactElement | string | null;
export declare const defaultAdapter: {
    renderNode: (...args: any) => AdapterReturn;
    renderFragment: (children: ReactElement | null[], key: string) => AdapterReturn;
    renderText: (text: string, key: string) => AdapterReturn;
};
export declare function appendKeyToValidElement(element: ReactElement | null, key: string): ReactElement | null;
declare type H = typeof defaultAdapter.renderNode;
declare type T = typeof defaultAdapter.renderText;
declare type F = typeof defaultAdapter.renderFragment;
export declare type RenderInlineRecordContext<R extends StructuredTextGraphQlResponseRecord> = {
    record: R;
};
export declare type RenderRecordLinkContext<R extends StructuredTextGraphQlResponseRecord> = {
    record: R;
    children: RenderResult<H, T, F>;
    transformedMeta: TransformedMeta;
};
export declare type RenderBlockContext<R extends StructuredTextGraphQlResponseRecord> = {
    record: R;
};
export declare type StructuredTextPropTypes<R1 extends StructuredTextGraphQlResponseRecord, R2 extends StructuredTextGraphQlResponseRecord = R1> = {
    /** The actual field value you get from DatoCMS **/
    data: StructuredTextGraphQlResponse<R1, R2> | StructuredTextDocument | Node | null | undefined;
    /** A set of additional rules to convert nodes to JSX **/
    customNodeRules?: RenderRule<H, T, F>[];
    /** A set of additional rules to convert marks to JSX **/
    customMarkRules?: RenderMarkRule<H, T, F>[];
    /** Fuction that converts an 'inlineItem' node into React **/
    renderInlineRecord?: (context: RenderInlineRecordContext<R2>) => ReactElement | null;
    /** Fuction that converts an 'itemLink' node into React **/
    renderLinkToRecord?: (context: RenderRecordLinkContext<R2>) => ReactElement | null;
    /** Fuction that converts a 'block' node into React **/
    renderBlock?: (context: RenderBlockContext<R1>) => ReactElement | null;
    /** Function that converts 'link' and 'itemLink' `meta` into HTML props */
    metaTransformer?: TransformMetaFn;
    /** Fuction that converts a simple string text into React **/
    renderText?: T;
    /** React.createElement-like function to use to convert a node into React **/
    renderNode?: H;
    /** Function to use to generate a React.Fragment **/
    renderFragment?: F;
    /** @deprecated use customNodeRules **/
    customRules?: RenderRule<H, T, F>[];
};
export declare function StructuredText<R1 extends StructuredTextGraphQlResponseRecord, R2 extends StructuredTextGraphQlResponseRecord = R1>({ data, renderInlineRecord, renderLinkToRecord, renderBlock, renderText, renderNode, renderFragment, customMarkRules, customRules, customNodeRules, metaTransformer, }: StructuredTextPropTypes<R1, R2>): ReactElement | null;
