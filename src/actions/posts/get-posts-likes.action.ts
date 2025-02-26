import { defineAction } from 'astro:actions'
import { z } from 'astro:content'
import { db, eq, Posts } from 'astro:db'

export const getPostsLikes = defineAction({
  input: z.string(),

  handler: async (postId) => {
    const [posts] = await db.select().from(Posts).where(eq(Posts.id, postId))

    if (!posts) {
      return { likes: 0, exists: false }
    }
    return {
      likes: posts.likes,
      exists: true
    }
  }
})
