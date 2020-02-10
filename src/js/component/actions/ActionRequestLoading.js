import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ActionDispatcherBuilder, TypeCheck} from '@flexio-oss/hotballoon'
import {BooleanValidator, StringValidator, ValueObjectValidator} from '@flexio-oss/js-validator-helper'

export class ActionRequestLoading {
  /**
   *
   * @private
   * @param {ActionDispatcher<RequestLoading, RequestLoadingBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionRequestLoading}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionRequestLoading:constructor: `dispatcher` should be a Dispatcher'
    )
    return new ActionRequestLoading(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.component_waiting.actions.RequestLoading)
        .dispatcher(dispatcher)
        .defaultChecker((data) => {
          return data
        })
        .validator(new ValidatorActionTransactionMaker())
        .build()
    )
  }

  /**
   *
   * @param {componentContext} componentContext
   * @param {Store<Registry, RegistryBuilder>} storeWaitingList
   * @returns {ActionRequestLoading}
   */
  listen(componentContext, storeWaitingList) {
    assertType(TypeCheck.isStore(storeWaitingList),
      'ActionRequestLoading:listen: `store` should be a Store'
    )
    this.__action.listenWithCallback(
      /** @param {RequestWaiting} payload */
      (payload) => {
        let registered = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray(...storeWaitingList.state().data().registered())
        if (payload.active()) {
          if (!storeWaitingList.state().data().registered().includes((payload.token()))) {
            registered.push(payload.token())
            storeWaitingList.set(
              storeWaitingList.state().data().withRegistered(registered)
            )
          }
        } else {
          if (storeWaitingList.state().data().registered().includes((payload.token()))) {
            let newRegistered = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray()
            registered.forEach(function(ticket) {
              if (ticket !== payload.token()) {
                newRegistered.push(ticket)
              }
            })
            storeWaitingList.set(
              storeWaitingList.state().data().withRegistered(newRegistered)
            )
          }
        }
      },
      componentContext
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<RequestLoading, RequestLoadingBuilder>}
   */
  action() {
    return this.__action
  }
}

class ValidatorActionTransactionMaker extends ValueObjectValidator {
  isValid(object) {
    return new StringValidator().validateNotEmpty(object.token()) &&
      new BooleanValidator().validateNotEmpty(object.active())
  }
}