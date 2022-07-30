// import { query } from 'express'
import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
  button.addEventListener('click', (event) => handleClick(event, true))
})

const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
  button.addEventListener('click', handleClick)
})

function handleClick(event, check = false) {
  event.preventDefault()

  check ? modalButton.classList.remove('red'): modalButton.classList.add('red')

  const text = check ? 'Marcar como lida': 'Excluir'
  const slug = check ? 'check': 'delete'

  const form = document.querySelector('.modal form')

  const roomId = document.querySelector('#room-id').dataset.id

  const questionId = event.target.dataset.id

  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = check ? `${text} esta pergunta`: `${text} esta pergunta`
  modalDescription.innerHTML = check ? `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`: `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
  modalButton.innerHTML = check ? `Sim, ${text.toLowerCase()}`: `Sim, ${text.toLowerCase()}`

  modal.open()
}