import type { APIRoute } from 'astro'
import { Clients, db, eq } from 'astro:db'

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const clientId = params.clientId ?? ''
    const client = await db.select().from(Clients).where(eq(Clients.id, +clientId))

    // Si no lo encuentra, devolvemos un error 404
    if (client.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'El cliente no existe'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    return new Response(JSON.stringify(client[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Ha ocurrido un error al intentar buscar el cliente en la BD' }),
      { status: 400 }
    )
  }
}

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json()

    const clientId = params.clientId ?? ''

    await db.update(Clients).set(body).where(eq(Clients.id, +clientId))

    const updatedClient = await db.select().from(Clients).where(eq(Clients.id, +clientId))

    return new Response(
      JSON.stringify({
        updatedClient: updatedClient[0]
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Ha ocurrido un error al intentar updetear el cliente' }),
      { status: 400 }
    )
  }
}

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const clientId = params.clientId ?? ''

    const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +clientId))

    if (rowsAffected === 0) {
      return new Response(
        JSON.stringify({
          error: 'El cliente no existe'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    return new Response(
      JSON.stringify({
        msg: 'Cliente eliminado correctamente'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Ha ocurrido un error al intentar eliminar el cliente' }),
      { status: 400 }
    )
  }
}
