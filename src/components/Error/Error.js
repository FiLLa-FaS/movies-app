import { Alert } from 'antd'

function Error({ text }) {
  return <Alert className="app__error" message={text} type="error" />
}

export default Error
