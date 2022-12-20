import { Pagination } from 'antd'

function CustomPagination({ currPage, pages, onChange }) {
  return (
    <Pagination
      className="app__pagination pagination"
      defaultCurrent={currPage}
      onChange={onChange}
      total={pages}
      showSizeChanger={false}
    />
  )
}

export default CustomPagination
