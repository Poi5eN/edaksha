import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
const Modal = ({ children, isOpen, setIsOpen, title }) => {
    const { currentColor } = useStateContext();
  return (
        <>
             {
                isOpen && (
                    <div
                    id="default-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-[99999999] flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
                  >
                    <div className="relative p-4" data-aos="fade-down">
                      <div className="relative  rounded-lg shadow dark:bg-gray-700 overflow-auto ">
                        <div className="flex items-center justify-between px-2 md:px-2 border-b rounded-t dark:border-gray-600 bg-white rounded-tl-lg rounded-tr-lg"
                        style={{ borderTop: ` solid 2px ${currentColor}` }}
                        >
                          <h3 className="text-xl font-semibold  dark:text-white" 
                          style={{color:currentColor}}
                          >
                           {title}
                          </h3>
                          <button
                            onClick={()=>setIsOpen(false)}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>
                        <div className="overflow-auto  bg-gray-50">
                        {children}
                        </div>
                      </div>
                    </div>
                  </div>
                )
               }
            </>
  );
};

export default Modal;

