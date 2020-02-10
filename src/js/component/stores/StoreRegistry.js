import {TypeCheck, PublicStoreHandler, InMemoryStoreBuilder} from '@flexio-oss/hotballoon'
import {assertType, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class StoreRegistry {
  /**
   *
   * @private
   * @param {Store<Registry, RegistryBuilder>} store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {StoreRegistry}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreLogsUtils:constructor: `componentContext` should be a ComponentContext'
    )
    return new StoreRegistry(
      componentContext.addStore(
        new InMemoryStoreBuilder()
          .type(globalFlexioImport.io.flexio.component_waiting.stores.Registry)
          .initialData(new globalFlexioImport.io.flexio.component_waiting.stores.RegistryBuilder()
            .registered(new globalFlexioImport.io.flexio.flex_types.arrays.StringArray())
            .build())
          .defaultChecker((data) => {
            if (isNull(data.registered())) {
              return data
                .withRegistered(new globalFlexioImport.io.flexio.flex_types.arrays.StringArray())
            }
            return data
          })
          .build()
      )
    )
  }

  /**
   *
   * @returns {Store<Registry, RegistryBuilder>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<Registry, RegistryBuilder>}
   */
  storePublic() {
    return new PublicStoreHandler(this.__store)
  }
}
