import { prepareWPObjectsToLinks } from '~/components/helper/smartlink/index.vue';

export function usePrepLink() {
  const prepLink = (obj) => prepareWPObjectsToLinks(obj);

  return { prepLink };
}
