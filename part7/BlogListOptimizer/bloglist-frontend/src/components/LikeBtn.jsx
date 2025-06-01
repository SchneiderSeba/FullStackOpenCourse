import './BlogSection.css'

export const LikeBtn = ({ updateLikes }) => {
  return (
    <button className="likeBtn" data-testid="like-button" onClick={updateLikes}>
      Like 👍
    </button>
  )
}
