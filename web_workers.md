# Web Workers
With the integration of Excelerator inside Labs, we're now using web workers. This allows the Excel to JS conversion to happen in its own "thread" outside of the rest of Labs, and thus avoids freezing the app during the conversion. This document gives a brief overview of workers along with how this browser feature is put to use in Labs and issues to be aware of.

Web workers allow you to approximate the idea of multi-threading in a web browser. They're not true threads but basically simulated in modern browsers so the code running in the worker does not block I/O or rendering in the parent of the worker. This makes sense for long-running processes that would otherwise make Labs freeze... such as converting an analysis file to JavaScript. With workers, the conversion starts but runs in its own process and does not lock up MapCraft while it's working.

## Mozilla Documentation
Some official docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Simple Overview
While it's tempting to just take a long-running process and dump it inside a worker.js file, this isn't how Web Workers operate. You need to establish an event listener and sender in each of the parent and child (worker) processes. The parent posts messages to the worker and listens in the onmessage handler. Likewise, the worker listens for messages in a message handler and uses postMessage to send data back to the parent. Web workers stay alive processing messages from the parent until terminated by the parent. Workers can also self terminate with close().
```javascript
// index.js
let myWorker = new Worker('worker.js')
myWorker.postMessage('hello worker')
myWorker.onmessage = (e) => {
    // e.data contains message from worker
}
// worker.js - self is similar to window in the browser, but no DOM
self.addEventListener('message', (e) => {
    // e.data contains message from parent
    self.postMessage('message back to parent')
})
```

## Message Types
Messages between the parent and worker are limited to literals and objects of literals, but no functions or DOM elements. For example, you can pass numbers, strings, and arrays. You can also pass objects with key-value pairs as long as there are no functions or complex objects like a Blob. You can't pass DOM elements by design. This is key because the worker doesn't have access to the DOM and shouldn't anyhow. It's for processing only, no UI.

## Integration with React and Webpack
You need a webpack loader to get things to work in React and webpack. This is kinda tricky because the worker lives outside of the React lifecycle, but you can tie the worker termination to a React event related to the component getting removed.

### Webpack Loader
A webpack loader is needed to make this work. It's already configured in package.json, but it was installed with npm..
```javascript
npm install worker-loader --save-dev
```
Then it's used like this...
```javascript
import ConverterWorker from 'worker-loader!./utils/excelerator/converter.worker';
```
You can see this in action [here](https://github.com/mapcraftlabs/labs/blob/08c8440a80202a9dd7500a0b12a89bbf5c0fd41c/app/navbar/configurer_modal/analysis_configuration.jsx). The worker is created and a [listener setup](https://github.com/mapcraftlabs/labs/blob/08c8440a80202a9dd7500a0b12a89bbf5c0fd41c/app/navbar/configurer_modal/analysis_configuration.jsx#L195-L223). After the Excel file is uploaded and read, it's [posted](https://github.com/mapcraftlabs/labs/blob/08c8440a80202a9dd7500a0b12a89bbf5c0fd41c/app/navbar/configurer_modal/analysis_configuration.jsx#L194) to the worker. The worker does its thing and sends a response to the parent.

### Deployment - Dev vs. Prod
There's currently an issue in the version of webpack we use which prevents a more ideal configuration. Right now, we need to have two separate imports in the analysis configuration... one used when developing, another for production. Typically the dev version is active. We only need to comment this out and uncomment the production version when doing a release. We might be able to fix this with a future update to webpack that makes the publicPath option usable on worker loaders. [Here's](https://github.com/webpack-contrib/worker-loader/issues/123) a related issue.

### CORS Considerations
[Workers only work](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Web_Workers_API) in the same origin as the parent calling them. We currently have Labs deployed to cdn.mapcraft.io and we run labs in live.mapcraft.io. The worker can't be deployed to the former, so all the releases live in the workers folder under live.mapcraft.io. We'll need to keep prior versions of the worker.js file here for older labs (just like we do with the Labs core). Note: this is why [the publicPath points to live](https://github.com/mapcraftlabs/labs/blob/08c8440a80202a9dd7500a0b12a89bbf5c0fd41c/app/navbar/configurer_modal/analysis_configuration.jsx#L25) in the prod version of importing the worker.
