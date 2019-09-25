import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
      <div style={hideWhenVisible}>
        <div onClick={toggleVisibility}>{blog.title} {blog.author}</div>
      </div>
      <div style={showWhenVisible}>
        <div onClick={toggleVisibility}>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} likes</div>
        {blog.user !== undefined && blog.user.name !== undefined &&
            <div>{blog.user.name}</div>
        }
        {/* {console.log(blog.user.username)} */}
      </div>
    </div>
  )
}

export default Blog