import React, { useState } from 'react'
import blogsService from '../services/blogs'
import { useField} from '../hooks'

const BlogForm = ({ blogs, setBlogs,  notify }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmitNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      const createdBlog = await blogsService.create(blog)
      setBlogs(blogs.concat(createdBlog))
      title.value = ''
      author.value = ''
      url.value = ''
    } catch(error) {
      notify(error.toString(), 'error')
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmitNewBlog}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
           author
          <input {...author} />
        </div>
        <div>
           url
          <input {...url} />
        </div>
        <button type='submit'>Create blog entry</button>
      </form>
    </div>)
}

export default BlogForm