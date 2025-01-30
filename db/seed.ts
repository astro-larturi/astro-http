import { getCollection } from 'astro:content'
import { Clients, db, Posts } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: 'Juan', age: 43, isActive: true },
    { id: 2, name: 'Pedro', age: 33, isActive: true },
    { id: 3, name: 'Lara', age: 44, isActive: true },
    { id: 4, name: 'Raul', age: 22, isActive: true },
    { id: 5, name: 'Maria', age: 12, isActive: true },
    { id: 6, name: 'Marcos', age: 43, isActive: true },
    { id: 7, name: 'Julia', age: 65, isActive: true },
    { id: 8, name: 'Raquel', age: 90, isActive: false },
    { id: 9, name: 'Mabel', age: 76, isActive: true },
    { id: 10, name: 'Ana', age: 19, isActive: true }
  ])

  const posts = await getCollection('blog')

  await db.insert(Posts).values(
    posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      likes: Math.floor(Math.random() * 1000)
    }))
  )
}
