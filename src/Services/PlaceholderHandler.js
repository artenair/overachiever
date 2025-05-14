export default class PlaceholderHandler {
    replace( source, placeholders) {
        for(const placeholder in placeholders) {
            source = source.replace(
                new RegExp(`:${placeholder}:`, "gm"),
                placeholders[placeholder]
            );
        }
        return source;
    }
}
