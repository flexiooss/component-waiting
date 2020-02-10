import {isFunction, isNode} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {isTheme} from '@flexio-oss/js-style-theme-interface'
import {isComponentViewLoaderPublic} from '../../component/component/ComponentViewLoaderPublic.js'
import {ViewLoaderStoreManager} from '../utils/ViewLoaderStoreManager'
import {ViewWaiting} from '../views/ViewWaiting'

export class ViewLoaderMounterConfig {
  constructor() {
    /**
     *
     * @type {ComponentContext}
     * @private
     */
    this.__componentContext = null

    /**
     *
     * @type {Element}
     * @private
     */
    this.__parentNode = null

    /**
     *
     * @type {ComponentViewLoaderPublic}
     * @private
     */
    this.__componentViewLoader = null

    /**
     *
     * @type {ThemeStyle}
     * @private
     */
    this.__styles = null

    /**
     *
     * @type {function(ViewContainer, PublicStoreHandler<Registry, RegistryBuilder>, ThemeStyle): ViewLoaderInterface}
     * @private
     */
    this.__view = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return {ViewLoaderMounterConfig}
   */
  componentContext(componentContext) {
    TypeCheck.isComponentContext(componentContext)
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return {ViewLoaderMounterConfig}
   */
  parentNode(parentNode) {
    isNode(parentNode)
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {ComponentViewLoaderPublic} componentViewLoader
   * @returns {ViewLoaderMounterConfig}
   */
  componentViewLoader(componentViewLoader) {
    isComponentViewLoaderPublic(componentViewLoader)
    this.__componentViewLoader = componentViewLoader
    return this
  }

  /**
   *
   * @param {ThemeStyle} styles
   * @returns {ViewLoaderMounterConfig}
   */
  styles(styles) {
    isTheme(styles)
    this.__styles = styles
    return this
  }

  /**
   *
   * @param {function(ViewContainer, PublicStoreHandler<Registry, RegistryBuilder>, ThemeStyle): ViewLoaderInterface} view
   * @returns {ViewLoaderMounterConfig}
   */
  view(view) {
    isFunction(view)
    this.__view = view
    return this
  }

  /**
   *
   * @returns {ComponentContext}
   */
  getComponentContext() {
    return this.__componentContext
  }

  /**
   *
   * @returns {Element}
   */
  getParentNode() {
    return this.__parentNode
  }

  /**
   *
   * @returns {ViewLoaderStoreManager}
   */
  getStores() {
    return new ViewLoaderStoreManager(this.__componentViewLoader.storeRegistry())
  }

  /**
   *
   * @returns {ThemeStyle}
   */
  getStyles() {
    return this.__styles
  }

  /**
   *
   * @returns {function(ViewContainer, PublicStoreHandler<Registry, RegistryBuilder>, ThemeStyle): ViewLoaderInterface}
   */
  getView() {
    return this.__view
  }
}

export class ViewBuildersViewLoader {
  /**
   *
   * @returns {function(ViewContainer, PublicStoreHandler<Registry, RegistryBuilder>, ThemeStyle): ViewLoaderInterface}
   */
  static viewWaiting() {
    return (viewContainer, storeRegistry, styles) => new ViewWaiting(viewContainer, storeRegistry, styles)
  }
}
