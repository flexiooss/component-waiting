# component-waiting
component to display a view that indicate to wait


```javascript
let component = new ComponentViewLoaderBuilder()
  .application(application())
  .build()

let view = new ViewLoaderMounter().buildView(
  new ViewLoaderMounterConfig()
    .componentContext(application().addComponentContext())
    .componentViewLoader(component)
    .parentNode(document.body)
    .styles(styles())
    .view(ViewBuildersViewLoader.viewWaiting())
)

component.actionRegisterLoading('test')
setTimeout(() => {  component.actionUnregisterLoading('test') }, 2000);
```
