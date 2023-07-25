import React, {useEffect, useState} from 'react'
import { ReactReader } from 'react-reader'
import { axiosInstance } from '../axios/axios'
import { Document, Page } from 'react-pdf';
import eb from '../assets/e-book.pdf'
import { pdfjs } from 'react-pdf';
import axios from 'axios';
import Contents from './Contents';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const spis = {
    "wprowadzenie": 3,
    "o autorze": 4,
    "finasteryd": 6,
    "minoxidil": 8,
    "microneedling": 9,
    "conclusion": 11
}

const Reader = ({filePath}) => {
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [page, setPage] = useState(1)
    const [ebook, setEbook] = useState();
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
 

    const getEbook = async () => {
        await axiosInstance(filePath, {
            withCredentials:true,
            responseType: 'blob',
        }).then(res => {
            setEbook(res?.data);
        })
    }

    const handleNextPage = () => {
        if(pageNumber < numPages) {
            setPageNumber(prev => prev + 1)
        }
    }
    
    const handlePrevPage = () => {
        if(pageNumber > 1) {
            setPageNumber(prev => prev - 1)
        }
    }

    const handleChangePage = (event) => {
        setPage(event.target.value);
    }

    const handleClickChangePage = () => {
        if (page < numPages && page > 0) {
            setPageNumber(parseInt(page))
        }
    }

    useEffect(() => {
        getEbook();
    }, [])


    return (
      <div class='w-full h-full flex flex-col gap-2 justify-center items-center'>
        {
            ebook ? (
                <>
                    <Document file={ebook} onLoadSuccess={onDocumentLoadSuccess}  style='display:flex; align-items:center; justify-content: center;'>
                        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} 
                        width={window.screen.width *0.7}
                        />
                    </Document>
                </>
                ) :
                ''
        }
       
        <div class='flex flex-row gap-4 align-center items-center bg-slate-50 shadow-lg  rounded-md mt-5'>
            <button onClick={handlePrevPage} class='p-2 rounded-md lg:hover:bg-slate-600 lg:hover:text-white'>Poprzednia</button>
            <p>
                {pageNumber} z {numPages}
            </p>
            <button class='p-2 rounded-md lg:hover:bg-slate-600 lg:hover:text-white' onClick={handleNextPage}>Następna</button>
        </div>
        <div class='flex gap-2'>
            <button onClick={() => handleClickChangePage()} class='p-2 rounded-md bg-slate-50 lg:hover:bg-slate-600 lg:hover:text-white'>Przejdź do</button>
            <input class='text-center' type='number' placeholder='podaj strone' min={1} max={numPages} value={page}  onChange={handleChangePage}/>
        </div>
      </div>
    )
}

export default Reader