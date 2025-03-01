import { getLikes } from './posts/get-likes.action'
import { updateLikeCount } from './posts/update-like-count.action'

export const server = {
  getLikes,
  updateLikeCount
}
