import {View, e} from '@flexio-oss/hotballoon'
import style from '../../component/assets/css/style.css'
import {viewLoaderInterface} from './ViewLoaderInterface'

export class ViewWaiting extends viewLoaderInterface(View) {
  /**
   *
   * @param {ViewContainerBase} viewContainer
   * @param {PublicStoreHandler<Registry, RegistryBuilder>} storeRegistry
   * @param {ThemeStyle} styles
   */
  constructor(viewContainer, storeRegistry, styles) {
    super(viewContainer)
    this.__storeRegistry = storeRegistry
    this.__styles = styles
    this.subscribeToStore(this.__storeRegistry)
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    console.log(this.__storeRegistry)
    return this.html(
      e('div')
        .className((this.__storeRegistry.data().registered().length ? style.loader : style.loaderHidden))
    )
  }
}
