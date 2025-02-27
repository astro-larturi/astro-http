import prisma from '@/db'
import type { APIRoute } from 'astro'
import { v4 as UUID } from 'uuid'

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const clients = await prisma.client.findMany()
    return new Response(JSON.stringify(clients), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Ha ocurrido un error al intentar leer los clientes de la BD'
      }),
      { status: 400 }
    )
  }
}

export const POST: APIRoute = async ({ params, request }) => {
  const { id, ...body } = await request.json()

  const client = await prisma.client.create({
    data: {
      id: UUID(),
      ...body
    }
  })

  try {
    return new Response(JSON.stringify(client), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Ha ocurrido un error al intentar crear el cliente'
      }),
      { status: 400 }
    )
  }
}
