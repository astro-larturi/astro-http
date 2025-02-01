import { getGreeting } from './greetings/get-greetings.actions'
import { getPostsLikes } from './posts/get-posts-likes.action'
import { updatePostLikes } from './posts/update-posts-likes.action'

export const server = {
  getGreeting,
  getPostsLikes,
  updatePostLikes
}
