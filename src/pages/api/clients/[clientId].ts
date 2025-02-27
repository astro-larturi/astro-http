import prisma from '@/db'
import type { APIRoute } from 'astro'

export const prerender = false

const findClientbyId = async (clientId: string) => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId
      }
    })
    return client
  } catch (error) {
    console.error(error)
    return null
  }
}

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const { clientId = '' } = params

    const client = await findClientbyId(clientId)

    if (!client) {
      return new Response(
        JSON.stringify({
          error: `No se ha encontrado el cliente con el id ${params.clientId}`
        }),
        { status: 404 }
      )
    }

    return new Response(JSON.stringify(client), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Ha ocurrido un error al intentar buscar el cliente en la BD'
      }),
      { status: 400 }
    )
  }
}

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { clientId = '' } = params

    const client = await findClientbyId(clientId)

    if (!client) {
      return new Response(
        JSON.stringify({
          error: `No se ha encontrado el cliente con el id ${params.clientId}`
        }),
        { status: 404 }
      )
    }

    const { id, ...body } = await request.json()

    const updatedClient = await prisma.client.update({
      where: {
        id: clientId
      },
      data: body
    })

    return new Response(JSON.stringify(updatedClient), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Ha ocurrido un error al intentar updetear el cliente'
      }),
      { status: 400 }
    )
  }
}

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const { clientId = '' } = params

    const client = await findClientbyId(clientId)

    if (!client) {
      return new Response(
        JSON.stringify({
          error: `No se ha encontrado el cliente con el id ${params.clientId}`
        }),
        { status: 404 }
      )
    }

    await prisma.client.delete({
      where: {
        id: clientId
      }
    })

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
      JSON.stringify({
        error: 'Ha ocurrido un error al intentar eliminar el cliente'
      }),
      { status: 400 }
    )
  }
}
