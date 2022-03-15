import React from 'react'

const ErrorMessage = ({status,message,close,duration}) => {

    if(duration){
     setTimeout(close,Number(duration))
    }

    return (
        <div className="w-max max-w-full flex items-center justify-between px-4 py-2 rounded-md shadow-lg
         border-mc absolute right-0 -top-4 bg-slate-200 message z-10">
            <span className='mr-2 mb-1' style={{color:status=="success"?"#025955":"#000"}} data-testid="alert-message">
                {message}
            </span>
            <span data-testid="error_message_btn" className=" top-0 md:-right-6 cursor-pointer" onClick={close}>
                <svg className="hover:animate-spin-slow" fill={`${status=="success"?"#025955":"#000"}`} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px"><path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 30.486328 15.978516 A 1.50015 1.50015 0 0 0 29.439453 16.439453 L 24 21.878906 L 18.560547 16.439453 A 1.50015 1.50015 0 0 0 17.484375 15.984375 A 1.50015 1.50015 0 0 0 16.439453 18.560547 L 21.878906 24 L 16.439453 29.439453 A 1.50015 1.50015 0 1 0 18.560547 31.560547 L 24 26.121094 L 29.439453 31.560547 A 1.50015 1.50015 0 1 0 31.560547 29.439453 L 26.121094 24 L 31.560547 18.560547 A 1.50015 1.50015 0 0 0 30.486328 15.978516 z"/></svg>
            </span>
        </div>
    )
}

export default ErrorMessage