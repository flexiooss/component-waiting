import {isImplement} from '@flexio-oss/js-helpers'

export const viewLoaderInterface = (Base) => {
  /**
   * @interface
   */
  return class ViewLoaderInterface extends Base {
  }

}

const constructorString = Object.getPrototypeOf(new (viewLoaderInterface((class e {
})))).constructor.toString()

/**
 *
 * @param {ViewLoaderInterface} inst
 * @return {boolean}
 */
export const implementsViewLoaderInterface = (inst) => {
  return isImplement(inst, constructorString)
}
