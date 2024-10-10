import './BlogSection.css'

export const LikeBtn = ({ updateLikes }) => {

  return (
    <button className="likeBtn" onClick={updateLikes}>Like 👍</button>
  )
}