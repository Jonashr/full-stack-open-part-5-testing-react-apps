import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs, notify }) => {

  console.log('Blog, blog')
  
  const handleLikeButton = async () => {
    const blogId = blog.id
    const searchedBlog = blogs.find(b => b.id === blogId)

    const newUpdatedBlog = {
       user: searchedBlog.user.id,
       likes: searchedBlog.likes + 1,
       title: searchedBlog.title,
       author: searchedBlog.author,
       url: searchedBlog.url
    }

    const updatedBlog = await blogsService.update(blogId, newUpdatedBlog)

    setBlogs(blogs.map(b => b.id !== blogId ? b : updatedBlog))
  }

  const handleDeleteButton = async () => {
    if(window.confirm('Delete this blog ? ')) {
      const blogId = blog.id
      try {        
        await blogsService.deleteItem(blogId)
        notify('Blog was removed from the notebook')
        const updatedBlogList = blogs.filter(b => b.id !== blogId)
        setBlogs(updatedBlogList)
      } catch(error) {
        console.log('Error occured during deletion...')
      }
    }
  }
  
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    font: 'italic',
    borderWidth: 2,
    marginBottom: 10
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='collapsedBlog'>
        <div onClick={toggleVisibility} className='toggleOn'>{blog.title} {blog.author}</div>
      </div>
      <div style={showWhenVisible} className='openedBlog'>
        <div onClick={toggleVisibility} className='toggleOff'>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} likes<button onClick={handleLikeButton} value={blog.id}>like</button></div>
        {blog.user !== undefined && blog.user.name !== undefined &&
            <div>{blog.user.name}</div>
        }
        {blog.user && (blog.user.username === user.username || blog.user === user.id) && 
        <div>
          <button onClick={handleDeleteButton}>Delete blog</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Blog