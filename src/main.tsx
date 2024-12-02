
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import rootRouter from "./routers/RootRouter.tsx";
import { RouterProvider } from "react-router-dom";
import { ModalProvider } from './providers/context/context.tsx';
import { pdfjs } from 'react-pdf';
import { Toaster } from 'react-hot-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

createRoot(document.getElementById('root')!).render(
  <ModalProvider>
     <RouterProvider router={rootRouter} />
     <Toaster position="top-center" reverseOrder={true} toastOptions={{
      duration: 2000
     }} containerStyle={{
      zIndex:"100009"
     }}
     gutter={14}
     />
  </ModalProvider>
 
)
