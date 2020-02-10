import {assertType} from '@flexio-oss/assert'
import {ComponentViewLoader} from './ComponentViewLoader'
import {ComponentPagination} from '../../../../../../flexio-corp/component-pagination/src/js/component/ComponentPagination'

const __component = Symbol('__componentViewLoaderPublic')

export class ComponentViewLoaderPublic {
  constructor(component) {
    assertType(component instanceof ComponentViewLoader, 'ComponentViewLoaderPublic:constructor: `component` should be a ComponentViewLoader')
    /**
     * @private
     * @property {ComponentViewLoader} ComponentViewLoaderPublic.__component
     */
    this[__component] = component
  }

  /**
   *
   * @param {Element} parentNode
   * @returns {ComponentViewLoaderPublic}
   */
  mountView(parentNode) {
    this[__component].mountView(parentNode)
    return this
  }

  /**
   *
   * @param {String} token
   * @returns {ComponentViewLoaderPublic}
   */
  actionRegisterLoading(token) {
    this[__component].actionRequestLoading().dispatch(
      this[__component].actionRequestLoading().payloadBuilder()
        .token(token)
        .active(true)
        .build()
    )
  }

  /**
   *
   * @param {String} token
   * @returns {ComponentViewLoaderPublic}
   */
  actionUnregisterLoading(token) {
    this[__component].actionRequestLoading().dispatch(
      this[__component].actionRequestLoading().payloadBuilder()
        .token(token)
        .active(false)
        .build()
    )
  }


  /**
   *
   * @returns {ActionDispatcher<RequestLoading, RequestLoadingBuilder>}
   */
  actionRequestLoading() {
    return this[__component].actionRequestLoading()
  }

  /**
   *
   * @returns {PublicStoreHandler<Registry, RegistryBuilder>}
   */
  storeRegistry() {
    return this[__component].storeRegistry()
  }
}

/**
 *
 * @param instance
 * @returns {boolean}
 */
export const isComponentViewLoaderPublic = (instance) => {return instance instanceof ComponentViewLoaderPublic}
