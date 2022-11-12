export function renderMetaTagsToString(data) {
    return data
        .map(function (tag) {
        if (tag.tag === 'title') {
            return "<title>".concat(tag.content, "</title>");
        }
        var serializedAttrs = [];
        for (var key in tag.attributes) {
            if (Object.prototype.hasOwnProperty.call(tag.attributes, key)) {
                serializedAttrs.push("".concat(key, "=\"").concat(tag.attributes[key], "\""));
            }
        }
        return "<".concat(tag.tag, " ").concat(serializedAttrs.join(' '), " />");
    })
        .join('\n');
}
//# sourceMappingURL=renderMetaTagsToString.js.map