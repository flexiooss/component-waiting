import {assertType} from '@flexio-oss/assert'
import {ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewContainerLoader} from '../ViewContainerLoader'
import {ViewLoaderMounterConfig} from './ViewLoaderMounterConfig'

export class ViewLoaderMounter {
  constructor() {
    /**
     *
     * @type {?ViewContainerLoader}
     * @private
     */
    this.__viewContainer = null
  }

  /**
   *
   * @param {ViewLoaderMounterConfig} viewMounterConfig
   * @return {ViewLoaderMounter}
   */
  buildView(viewMounterConfig) {
    assertType(
      viewMounterConfig instanceof ViewLoaderMounterConfig,
      'ViewLogsMounter:buildView: `viewMounterConfig` argument should be a ViewLoaderMounterConfig'
    )
    this.__viewContainer = new ViewContainerLoader(
      new ViewContainerParameters(
        viewMounterConfig.getComponentContext(),
        viewMounterConfig.getComponentContext().nextID(),
        viewMounterConfig.getParentNode()
      ),
      viewMounterConfig.getStores(),
      viewMounterConfig.getStyles(),
      viewMounterConfig.getView()
    )

    assertType(
      this.__viewContainer instanceof ViewContainerLoader,
      '`viewContainer` should be ViewContainerLoader'
    )

    this.__viewContainer.renderAndMount()

    return this
  }

  /**
   * @return {?ViewContainerLoader}
   */
  viewContainer() {
    return this.__viewContainer
  }
}

/**
 *
 * @param instance
 * @return {boolean}
 */
export const isViewPaginationMounter = (instance) => instance instanceof ViewLoaderMounter

