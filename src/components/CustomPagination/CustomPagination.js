import { Pagination } from 'antd'
import PropTypes from 'prop-types'

function CustomPagination({ currPage, pages, onChange }) {
  return (
    <Pagination
      className="app__pagination pagination"
      defaultCurrent="1"
      defaultPageSize="1"
      current={currPage}
      onChange={onChange}
      total={pages}
      showSizeChanger={false}
    />
  )
}

CustomPagination.defaultProps = {
  currPage: 1,
  pages: 1,
}

CustomPagination.propTypes = {
  currPage: PropTypes.number,
  pages: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default CustomPagination
