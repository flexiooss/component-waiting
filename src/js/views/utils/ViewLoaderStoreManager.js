import {assert} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class ViewLoaderStoreManager {
  /**
   *
   * @param {PublicStoreHandler<Registry, RegistryBuilder>} publicStoreRegistry
   */
  constructor(publicStoreRegistry) {
    assert(
      publicStoreRegistry.isTypeOf(globalFlexioImport.io.flexio.component_waiting.stores.Registry),
      'ViewLoaderStoreManager: `publicStoreWaitingList ` should be a Store of WaitingList')

    this.__publicStoreRegistry = TypeCheck.assertStoreBase(publicStoreRegistry)
  }

  /**
   *
   * @return {PublicStoreHandler<Registry, RegistryBuilder>}
   */
  storeRegistry() {
    return this.__publicStoreRegistry
  }
}
