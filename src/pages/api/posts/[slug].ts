import type { APIRoute } from 'astro'
import { getEntry } from 'astro:content'

export const prerender = false

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params

  if (slug) {
    const post = await getEntry('blog', slug)

    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  return new Response(
    JSON.stringify({
      error: 'Post not found'
    }),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
