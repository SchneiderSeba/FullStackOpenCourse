import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from "./requests"

const App = () => {

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: ( newNote ) => { const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData( ['notes'], notes.concat(newNote) )
     } })
  
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => { queryClient.invalidateQueries('notes') }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
    // await createNote({ content, important: false })
    // queryClient.invalidateQueries(['notes'])
    // console.log(content)
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
          <button onClick={() => toggleImportance(note)}>🔁</button>
        </li>
      )}
    </div>
  )
}

export default App