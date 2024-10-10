
export const ToggleBtn = ({ showCreateForm, handleToggle }) => {
  return (
    <div>
      <button onClick={handleToggle}>{showCreateForm ? 'Cancel' : 'Create'}</button>
    </div>
  )
}