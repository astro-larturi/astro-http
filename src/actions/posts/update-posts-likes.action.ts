import { actions, defineAction } from 'astro:actions'
import { z } from 'astro:content'
import { db, eq, Posts } from 'astro:db'

export const updatePostLikes = defineAction({
  accept: 'json',
  input: z.object({
    postId: z.string(),
    increment: z.number()
  }),

  handler: async ({ postId, increment }) => {
    // const { data, error } = await actions.getPostsLikes(postId)

    // if (error) {
    //   console.log(error)
    //   throw new Error('Error getting posts')
    // }

    // const { exists, likes } = data

    const [posts] = await db.select().from(Posts).where(eq(Posts.id, postId))

    if (!posts) {
      const newPost = {
        id: postId,
        title: 'Post not found',
        likes: 0
      }

      await db.insert(Posts).values(newPost)
    }

    await db
      .update(Posts)
      .set({
        likes: posts.likes + increment
      })
      .where(eq(Posts.id, postId))

    return true
  }
})
