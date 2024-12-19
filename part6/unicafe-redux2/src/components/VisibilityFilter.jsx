import { useDispatch, useSelector } from 'react-redux'

export const VisibilityFilter = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector(state => state.filter)

  const handleFilterChange = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }

  return (
    <div>
      <label>
        All
        <input 
          type="radio" 
          name="filter" 
          checked={currentFilter === 'ALL'}
          onChange={() => handleFilterChange('ALL')}
        />
      </label>
      <label>
        Only Important
        <input
          type="radio"
          name="filter"
          checked={currentFilter === 'IMPORTANT'}
          onChange={() => handleFilterChange('IMPORTANT')}
        />
      </label>
      <label>
        Only Non Important
        <input
          type="radio"
          name="filter"
          checked={currentFilter === 'NONIMPORTANT'}
          onChange={() => handleFilterChange('NONIMPORTANT')}
        />
      </label>
    </div>
  )
}
