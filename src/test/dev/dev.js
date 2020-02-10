import {ComponentViewLoaderBuilder} from '../../js/component/component/ComponentViewLoaderBuilder'
import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/index-view'
import {ViewLoaderMounter} from '../../js/views/ViewLoaderMounter/ViewLoaderMounter'
import {ViewBuildersViewLoader, ViewLoaderMounterConfig} from '../../js/views/ViewLoaderMounter/ViewLoaderMounterConfig'

const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)

let component = new ComponentViewLoaderBuilder()
  .application(applicationDev.application())
  .build()

let view = new ViewLoaderMounter().buildView(
  new ViewLoaderMounterConfig()
    .componentContext(applicationDev.application().addComponentContext())
    .componentViewLoader(component)
    .parentNode(document.body)
    .styles(applicationDev.styles())
    .view(ViewBuildersViewLoader.viewWaiting())
)

component.actionRegisterLoading('test')
setTimeout(() => {  component.actionUnregisterLoading('test') }, 2000);









