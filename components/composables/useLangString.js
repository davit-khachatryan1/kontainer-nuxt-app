import useStore from '@/store'

export function useLangString() {
    const store = useStore();

    const langString = (stringName, fallback) => {
        const globalOptions = store.pageOptions;
        const translation = globalOptions[stringName];

        if (translation === '' || translation === undefined) {
            if (fallback === undefined) {
                // fallback to string definition
                const stringCleaned = stringName.substr(1).replace(/_/g, ' '); // remove underscores
                return stringCleaned.charAt(0).toUpperCase() + stringCleaned.slice(1); // first char uppercase
            }
            // fallback to second parameter
            return fallback;
        }

        return translation;
    };

    return { langString };
}