export function useGetClosest() {
    const getClosest = (elem, selector) => {
        let el = elem;
        const matchesSelector =
            el.matches ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }

            el = el.parentElement;
        }

        return el;
    };

    return { getClosest };
}