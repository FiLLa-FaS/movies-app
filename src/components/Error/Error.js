import { Alert } from 'antd'

function Error({ text }) {
  return <Alert message={text} type="error" />
}

export default Error
