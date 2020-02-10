'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {implementsViewLoaderInterface} from './views/ViewLoaderInterface'

export class ViewContainerLoader extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {ViewLoaderStoreManager} viewLoaderStoreManager
   * @param {ThemeStyle} styles
   * @param {function(ViewContainer, PublicStoreHandler<Registry, RegistryBuilder>, ThemeStyle): ViewLoaderInterface} view
   */
  constructor(viewContainerParameters, viewLoaderStoreManager, styles, view) {
    super(viewContainerParameters)
    this.__stores = viewLoaderStoreManager
    this.__styles = styles

    this.__view = view(this, this.__stores.storeRegistry(), this.__styles)

    assertType(implementsViewLoaderInterface(this.__view),
      'ViewContainerLoader: `view` should be a ViewLoaderInterface'
    )
    this.addView(this.__view)
  }
}
