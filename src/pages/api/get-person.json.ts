import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: 'John Doe',
    age: 30,
    email: 'mail@test.com'
  }
  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
