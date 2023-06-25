const handleActionEdit = async (elementId) => {
  const inputTitle = document.getElementById('inputTitle')
  const inputDesc = document.getElementById('inputDesc')
  const inputDeadline = document.getElementById('inputDeadline')

  let todoId = elementId.split('-')[2]
  const resp = await fetch(`http://localhost:30000/todos/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: todoId,
      title: inputTitle.value,
      description: inputDesc.value,
      deadlineAt: inputDeadline.value
    })
  })

  location.reload()
}

const handleInsertTodo = async () => {
  const inputTitle = document.getElementById('inputTitle')
  const inputDesc = document.getElementById('inputDesc')
  const inputDeadline = document.getElementById('inputDeadline')

  const resp = await fetch(`http://localhost:30000/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: inputTitle.value,
      description: inputDesc.value,
      deadlineAt: inputDeadline.value
    })
  })

  location.reload()
}


const handleDelete = async (todoId) => {
  alert('Are you sure?')

  const resp = await fetch(`http://localhost:30000/todos/${todoId}`, {
    method: 'DELETE',
  })
  location.reload()
}
