import { Tabs } from 'antd'
import PropTypes from 'prop-types'

function CustomTabs({ onTabChange }) {
  return (
    <Tabs
      destroyInactiveTabPane="true"
      defaultActiveKey="1"
      onChange={(key) => onTabChange(key)}
      items={[
        {
          label: 'Search',
          key: 'search',
        },
        {
          label: 'Rated',
          key: 'rated',
        },
      ]}
    />
  )
}

CustomTabs.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}

export default CustomTabs
