'use strict'
import '../../../../generated/io/package'
import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {isNode, assertType} from '@flexio-oss/assert'
import {ActionRequestLoading} from '../actions/ActionRequestLoading'
import {StoreRegistry} from '../stores/StoreRegistry'
import {ViewContainerLoader} from '../../views/ViewContainerLoader'
import {ViewLoaderStoreManager} from '../../views/utils/ViewLoaderStoreManager'

export class ComponentViewLoader {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    assertType(
      TypeCheck.isComponentContext(componentContext),
      'ComponentViewLoader:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__componentContext = componentContext
    this.__actionRequestLoading = ActionRequestLoading.create(this.__componentContext.dispatcher())
    this.__storeRegistry = StoreRegistry.create(this.__componentContext)

    this.__actionRequestLoading.listen(this.__componentContext, this.__storeRegistry.store())
  }

  /**
   *
   * @param {Element} parentNode
   * @returns {ComponentViewLoader}
   */
  mountView(parentNode) {
    assertType(!!isNode(parentNode),
      'ComponentViewLoader:constructor: `parentNode` argument should be NodeType'
    )
    this.__viewContainer = new ViewContainerLoader(
      new ViewContainerParameters(
        this.__componentContext,
        this.__componentContext.nextID(),
        parentNode
      ),
      new ViewLoaderStoreManager(this.__storeRegistry.storePublic())
    )
    this.__componentContext.addViewContainer(this.__viewContainer)
    this.__viewContainer.renderAndMount()
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<RequestLoading, RequestLoadingBuilder>}
   */
  actionRequestLoading() {
    return this.__actionRequestLoading.action()
  }

  storeRegistry() {
    return this.__storeRegistry.storePublic()
  }

  remove() {
    this.__componentContext.logger().log(
      this.__componentContext.logger().builder()
        .info()
        .pushLog(this.constructor.name + ': Hotballoon killed me'),
      {color: '#ca4ee2', titleSize: 3}
    )
    this.__componentContext.remove()
    this.__componentContext = null
  }
}
