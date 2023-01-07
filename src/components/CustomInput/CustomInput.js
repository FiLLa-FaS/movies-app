import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

import './CustomInput.css'

function CustomInput({ label, onLabelChange }) {
  return <Input className="input" placeholder="Type to search..." value={label} onChange={onLabelChange} />
}

CustomInput.defaultProps = {
  label: '',
}

CustomInput.propTypes = {
  label: PropTypes.string,
  onLabelChange: PropTypes.func.isRequired,
}

export default CustomInput
