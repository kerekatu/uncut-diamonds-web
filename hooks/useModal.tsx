import { useState } from 'react'

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleToggle = () => setModalOpen(!modalOpen)

  const handleCancel = () => setModalOpen(false)

  return { modalOpen, setModalOpen, handleToggle, handleCancel }
}
