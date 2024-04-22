export function useImgUrl() {
    const imgUrl = (obj, size) => {
        if (size === 'url') {
            return obj.url;
        }
        if (obj.sizes[size]) {
            return obj.sizes[size];
        }
        return obj.url; // fallback if size is not generated, i.e. image uploaded too small
    };

    return { imgUrl };
}