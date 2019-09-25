import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('Renders content succesfully', () => {
    const simpleBlog = {
        title: 'Simple blog title',
        author: 'Author of the blog',
        likes: 10
    }

    const component = render(
        <SimpleBlog blog={simpleBlog} />
    )

    expect(component.container).toHaveTextContent('Simple blog title')
    expect(component.container).toHaveTextContent('Author of the blog')
    expect(component.container).toHaveTextContent('10')

    component.debug()
})