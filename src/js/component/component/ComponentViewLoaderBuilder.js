import {TypeCheck} from '@flexio-oss/hotballoon'
import {ComponentViewLoaderPublic} from './ComponentViewLoaderPublic'
import {ComponentViewLoader} from './ComponentViewLoader'

export class ComponentViewLoaderBuilder {
  constructor() {
    /**
     *
     * @type {HotBalloonApplication}
     * @private
     */
    this.__application = null
  }

  /**
   * @param {HotBalloonApplication} application
   * @return {ComponentViewLoaderBuilder}
   */
  application(application) {
    TypeCheck.isHotballoonApplication(application)
    this.__application = application
    return this
  }

  build() {

    return new ComponentViewLoaderPublic(
      new ComponentViewLoader(
        this.__application.addComponentContext()
      )
    )
  }
}
