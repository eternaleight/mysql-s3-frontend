import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

const App = () => {
  const [file, setFile] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [posts, setPosts] = useState<any>([])

  useEffect(() => {
    (async() => {
      const result = await axios.get("/posts")
      setPosts(result.data.posts)
    console.log(result.data)
    })()
  },[])

  const submit = async (e: any) => {
    e.preventDefault()
    const data = new FormData()
    data.append("image", file)
    data.append("description", description)
    const result = await axios.post("/posts", data)
    setPosts([result.data, ...posts])
    window.location.reload()
  }

  return (
    <div className="App">
      <header>
        <h1 className="mb-8 text-white bg-gray-700">Mysql-s3</h1>
      </header>
      <form onSubmit={submit}>
        <input
          onChange={(e: any) => {
            setFile(e.target.files[0])
          }}
          type="file"
          accept="image/*"
        ></input>
        <input onChange={(e: any) => setDescription(e.target.value)} type="text" placeholder="description" className='outline-[#1119] outline outline-[1px] rounded-[2px] m-2'></input>
        <button type="submit" className='text-white bg-black px-1 py-[2px] rounded-[2px]'>Submit</button>
      </form>
      <main>
        {posts?.map((post: any) => (
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
