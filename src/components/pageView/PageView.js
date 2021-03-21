
import React from 'react'

const PageView = ({name, total, text}) => {
  return (
  <li>{`${name} ${total} ${text}`}</li>
  )
}

export default PageView