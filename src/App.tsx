import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

type Posts = {
  description: string
  id: number
  image_url: string
  timestamp: string
}[]

type Post = {
  description: string
  id: number
  image_url: string
  timestamp: string
}


const App = () => {
  const [file, setFile] = useState<string|Blob>("")
  const [description, setDescription] = useState<string>("")
  const [posts, setPosts] = useState<Posts>([])

  useEffect(() => {
    (async() => {
      const result = await axios.get("/posts")
      setPosts(result.data.posts)
    })()
  },[])

  const submit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData()
    data.append("image", file)
    data.append("description", description)
    const result = await axios.post("/posts", data)
    setPosts([result.data, ...posts])
      console.log(file)
  }

  return (
    <div className="App">
      <header>
        <h1 className="mb-8 text-white bg-gray-700">mysql-s3</h1>
      </header>
      <form onSubmit={submit}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.files !== null) {
              setFile(e.currentTarget.files[0])}
          }}
          type="file"
          accept="image/*"
        ></input>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} type="text" placeholder="description" className='outline-[#1119] outline outline-[1px] rounded-[2px] m-2'></input>
        <button type="submit" className='text-white bg-black px-1 py-[2px] rounded-[2px]'>Submit</button>
      </form>
      <main>
        {posts?.map((post: Post) => (
          <figure key={post.id}>
            <img className='w-[70%] mx-auto max-w-[500px]' src={post.image_url}/>
            <figcaption>{post.image_url}</figcaption>
            <figcaption>{post.description}</figcaption>
          </figure>
        ))}
      </main>
    </div>
  )
}

export default App
