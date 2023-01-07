import { Alert } from 'antd'
import PropTypes from 'prop-types'

function Error({ text }) {
  return <Alert className="app__error" message={text} type="error" />
}

Error.defaultProps = {
  text: 'Произошла ошибка',
}

Error.propTypes = {
  text: PropTypes.string,
}

export default Error
