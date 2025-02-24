"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var React = __importStar(require("react"));
var enzyme_1 = require("enzyme");
require("intersection-observer");
var index_1 = require("../index");
var test_utils_1 = require("react-intersection-observer/test-utils");
var data = {
    alt: 'DatoCMS swag',
    aspectRatio: 1.7777777777777777,
    base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLFQoLDhgQDg0NDh0eHREYIx8lJCIrHB0dLSs7GikyKSEuKjUlKDk1MjIyHyo4PTc+PDcxPjUBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7OzsvOzs7Ozs7Ozs7Lzs7Ozs7Ozs7OzsvOzs7NTsvLy87NTU1Ly8vLzsvL//AABEIAA0AGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAGBwABBP/EACEQAAEEAAYDAAAAAAAAAAAAAAEAAgMEBQYHESEiFWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwL/xAAZEQADAAMAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEQA/AFxLgDWTsAd1J5TGy7hEYqNAaNgECX7sjLMQAHJTEy1Zcarfia4lJMauAxqBhLY6ZlaOzDurWvUOd3jZPfCiEh4xs//Z',
    height: 421,
    sizes: '(max-width: 750px) 100vw, 750px',
    src: 'https://www.datocms-assets.com/205/image.png?ar=16%3A9&fit=crop&w=750',
    srcSet: 'https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=0.25&fit=crop&w=750 187w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=0.5&fit=crop&w=750 375w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=0.75&fit=crop&w=750 562w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=1&fit=crop&w=750 750w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=1.5&fit=crop&w=750 1125w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=2&fit=crop&w=750 1500w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=3&fit=crop&w=750 2250w,↵https://www.datocms-assets.com/205/image.png?ar=16%3A9&dpr=4&fit=crop&w=750 3000w',
    title: 'These are awesome, we know that.',
    width: 750
};
var minimalData = {
    base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLFQoLDhgQDg0NDh0eHREYIx8lJCIrHB0dLSs7GikyKSEuKjUlKDk1MjIyHyo4PTc+PDcxPjUBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7OzsvOzs7Ozs7Ozs7Lzs7Ozs7Ozs7OzsvOzs7NTsvLy87NTU1Ly8vLzsvL//AABEIAA0AGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAGBwABBP/EACEQAAEEAAYDAAAAAAAAAAAAAAEAAgMEBQYHESEiFWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwL/xAAZEQADAAMAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEQA/AFxLgDWTsAd1J5TGy7hEYqNAaNgECX7sjLMQAHJTEy1Zcarfia4lJMauAxqBhLY6ZlaOzDurWvUOd3jZPfCiEh4xs//Z',
    height: 421,
    src: 'https://www.datocms-assets.com/205/image.png?ar=16%3A9&fit=crop&w=750',
    width: 750
};
describe('Image', function () {
    // intersectionThreshold is an hack to make tests work
    // we need the library to generate a different IntersectionObserver for each test
    // otherwise the IntersectionObserver mocking won't work
    ['intrinsic', 'fixed', 'responsive', 'fill'].forEach(function (layout) {
        describe("layout=".concat(layout), function () {
            describe('not visible', function () {
                it('renders the blur-up thumb', function () {
                    var wrapper = (0, enzyme_1.mount)(React.createElement(index_1.Image, { data: data, layout: layout, intersectionThreshold: 0.1 }));
                    expect(wrapper).toMatchSnapshot();
                });
            });
            describe('visible', function () {
                it('renders the image', function () {
                    var wrapper = (0, enzyme_1.mount)(React.createElement(index_1.Image, { data: data, layout: layout, intersectionThreshold: 0.2 }));
                    (0, test_utils_1.mockAllIsIntersecting)(true);
                    wrapper.update();
                    expect(wrapper).toMatchSnapshot();
                });
                it('renders the image (minimal data)', function () {
                    var wrapper = (0, enzyme_1.mount)(React.createElement(index_1.Image, { data: minimalData, layout: layout, intersectionThreshold: 0.2 }));
                    (0, test_utils_1.mockAllIsIntersecting)(true);
                    wrapper.update();
                    expect(wrapper).toMatchSnapshot();
                });
                describe('image loaded', function () {
                    it('shows the image', function () {
                        var wrapper = (0, enzyme_1.mount)(React.createElement(index_1.Image, { data: data, layout: layout, intersectionThreshold: 0.3 }));
                        (0, test_utils_1.mockAllIsIntersecting)(true);
                        wrapper.update();
                        wrapper.find('img').last().simulate('load');
                        wrapper.update();
                        expect(wrapper).toMatchSnapshot();
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map