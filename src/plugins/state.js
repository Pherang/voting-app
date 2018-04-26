export default {
  // The install method is required for to be able to install this plugin
  // 
  install (Vue, state) {
    // The install actually adds an instance property called $state
    // This can be used for multiple instances of our app
    // In our case, an instance of the app is created for every user
    // that connects to the app.
    // Additionally we initialize it by passing state to it.
    Object.defineProperty(Vue.prototype, '$state', {
      get: () => state
    })
  }
}
