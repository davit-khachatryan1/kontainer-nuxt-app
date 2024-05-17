import { prepareWPObjectsToLinks } from '~/components/composables/prepareWPObjectsToLinks';

export function usePrepLink() {
  const prepLink = (obj) => prepareWPObjectsToLinks(obj);

  return { prepLink };
}
