import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContextProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
// import { SidebarProvider } from 'react-pro-sidebar'
import { ClientContextProvider } from './contexts/ClientContext'
import { ProfileContextProvider } from './contexts/ProfileContext'
import { UserContextProvider } from './contexts/UserContext'
import { JobContextProvider } from './contexts/JobContext'
import { InvoiceContextProvider } from './contexts/InvoiceContext'
import { ContactContextProvider } from './contexts/ContactContext'
import { DownloadContextProvider } from './contexts/DownloadContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
          <ClientContextProvider>
            <ProfileContextProvider>
              <UserContextProvider>
                <JobContextProvider>
                  <InvoiceContextProvider>
                    <ContactContextProvider>
                      <DownloadContextProvider>
                        <App />
                      </DownloadContextProvider>
                    </ContactContextProvider>
                  </InvoiceContextProvider>
                </JobContextProvider>
              </UserContextProvider>
            </ProfileContextProvider>
          </ClientContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)
