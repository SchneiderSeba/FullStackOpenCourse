import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

export const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      All    
      <input 
        type="radio" 
        name="filter" 
        onChange={() => dispatch(filterChange('ALL'))}
      />
      Only Important   
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      Only Non Important 
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  )
}
