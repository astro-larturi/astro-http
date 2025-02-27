import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {
  try {
    return new Response(JSON.stringify({}), {
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
    return new Response(JSON.stringify({}), {
      status: 201,
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
