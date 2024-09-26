import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import appStore from './framework/ReduxStore/appStore'
import appRouter from './framework/router/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={appStore}>
        <RouterProvider router={appRouter}/>
      </Provider>
  </React.StrictMode>,
)
