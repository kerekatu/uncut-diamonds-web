import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  acceptButton: {
    title: string
    handleAccept: () => void
  }
  cancelButton: {
    title: string
    handleCancel: () => void
  }
  children?: ReactNode
}

const Modal = ({ acceptButton, cancelButton, children }: ModalProps) => {
  return createPortal(
    <div className="top-0 left-0 fixed w-full h-screen z-40 transition-all overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:opacity-70 before:pointer-events-none">
      <div className="absolute flex flex-col gap-6 bg-zinc-800 w-[600px] max-w-full rounded-xl p-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex items-center justify-center text-2xl mb-auto font-semibold">
          {children}
        </div>
        <div className="flex justify-center gap-6">
          <button
            className="bg-green-600 px-12 py-2 rounded-xl text-white font-bold text-xl transition-all cursor-pointer hover:bg-green-500"
            onClick={acceptButton.handleAccept}
          >
            {acceptButton.title}
          </button>
          <button
            className="bg-rose-600 px-12 py-2 rounded-xl text-white font-bold text-xl transition-all cursor-pointer hover:bg-rose-500"
            onClick={cancelButton.handleCancel}
          >
            {cancelButton.title}
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal') as HTMLElement
  )
}

export default Modal
