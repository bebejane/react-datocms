import React, { CSSProperties } from 'react';
declare type Maybe<T> = T | null;
export declare type ResponsiveImageType = {
    /** A base64-encoded thumbnail to offer during image loading */
    base64?: Maybe<string>;
    /** The height of the image */
    height?: Maybe<number>;
    /** The width of the image */
    width: number;
    /** The aspect ratio (width/height) of the image */
    aspectRatio?: number;
    /** The HTML5 `sizes` attribute for the image */
    sizes?: Maybe<string>;
    /** The fallback `src` attribute for the image */
    src?: Maybe<string>;
    /** The HTML5 `srcSet` attribute for the image */
    srcSet?: Maybe<string>;
    /** The HTML5 `srcSet` attribute for the image in WebP format, for browsers that support the format */
    webpSrcSet?: Maybe<string>;
    /** The background color for the image placeholder */
    bgColor?: Maybe<string>;
    /** Alternate text (`alt`) for the image */
    alt?: Maybe<string>;
    /** Title attribute (`title`) for the image */
    title?: Maybe<string>;
};
export declare type ImagePropTypes = {
    /** The actual response you get from a DatoCMS `responsiveImage` GraphQL query */
    data: ResponsiveImageType;
    /** Additional CSS className for root node */
    className?: string;
    /** Additional CSS class for the image inside the `<picture />` tag */
    pictureClassName?: string;
    /** Additional CSS class for the placeholder image */
    placeholderClassName?: string;
    /** Duration (in ms) of the fade-in transition effect upoad image loading */
    fadeInDuration?: number;
    /** @deprecated Use the intersectionThreshold prop */
    intersectionTreshold?: number;
    /** Indicate at what percentage of the placeholder visibility the loading of the image should be triggered. A value of 0 means that as soon as even one pixel is visible, the callback will be run. A value of 1.0 means that the threshold isn't considered passed until every pixel is visible */
    intersectionThreshold?: number;
    /** Margin around the placeholder. Can have values similar to the CSS margin property (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the placeholder element's bounding box before computing intersections */
    intersectionMargin?: string;
    /** Whether enable lazy loading or not */
    lazyLoad?: boolean;
    /** Additional CSS rules to add to the root node */
    style?: React.CSSProperties;
    /** Additional CSS rules to add to the image inside the `<picture />` tag */
    pictureStyle?: React.CSSProperties;
    /** Additional CSS rules to add to the placeholder image */
    placeholderStyle?: React.CSSProperties;
    /**
     * The layout behavior of the image as the viewport changes size
     *
     * Possible values:
     *
     * * `intrinsic` (default): the image will scale the dimensions down for smaller viewports, but maintain the original dimensions for larger viewports
     * * `fixed`: the image dimensions will not change as the viewport changes (no responsiveness) similar to the native img element
     * * `responsive`: the image will scale the dimensions down for smaller viewports and scale up for larger viewports
     * * `fill`: image will stretch both width and height to the dimensions of the parent element, provided the parent element is `relative`
     **/
    layout?: 'intrinsic' | 'fixed' | 'responsive' | 'fill';
    /** Defines how the image will fit into its parent container when using layout="fill" */
    objectFit?: CSSProperties['objectFit'];
    /** Defines how the image is positioned within its parent element when using layout="fill". */
    objectPosition?: CSSProperties['objectPosition'];
    /** Triggered when the image finishes loading */
    onLoad?(): void;
    /** Whether the component should use a blurred image placeholder */
    usePlaceholder?: boolean;
    /**
     * The HTML5 `sizes` attribute for the image
     *
     * Learn more about srcset and sizes:
     * -> https://web.dev/learn/design/responsive-images/#sizes
     * -> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes
     **/
    sizes?: HTMLImageElement['sizes'];
    /**
     * When true, the image will be considered high priority. Lazy loading is automatically disabled, and fetchpriority="high" is added to the image.
     * You should use the priority property on any image detected as the Largest Contentful Paint (LCP) element. It may be appropriate to have multiple priority images, as different images may be the LCP element for different viewport sizes.
     * Should only be used when the image is visible above the fold.
     **/
    priority?: boolean;
    /**
     * If `data` does not contain `srcSet`, the candidates for the `srcset` of the image will be auto-generated based on these width multipliers
     *
     * Default candidate multipliers are [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4]
     **/
    srcSetCandidates?: number[];
};
export declare const Image: React.ForwardRefExoticComponent<ImagePropTypes & React.RefAttributes<HTMLDivElement>>;
export {};
