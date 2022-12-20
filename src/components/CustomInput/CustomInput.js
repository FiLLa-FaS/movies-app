import React from 'react'
import { Input } from 'antd'

import './CustomInput.css'

function CustomInput({ label, onLabelChange }) {
  return <Input className="input" placeholder="Type to search..." value={label} onChange={onLabelChange} />
}

export default CustomInput
