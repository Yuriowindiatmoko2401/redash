import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Modal from 'antd/lib/modal';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';


export default function MenuButton({ doDelete, canEdit }) {
  const [loading, setLoading] = useState(false);

  const confirmDelete = useCallback(() => {
    Modal.confirm({
      title: 'Delete Alert',
      content: 'Are you sure you want to delete this alert?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        setLoading(true);
        doDelete().catch(() => {
          setLoading(false);
        });
      },
      maskClosable: true,
      autoFocusButton: null,
    });
  }, []);

  return (
    <Dropdown
      className={cx('m-l-5', { disabled: !canEdit })}
      trigger={[canEdit ? 'click' : undefined]}
      placement="bottomRight"
      overlay={(
        <Menu>
          <Menu.Item>
            <a onClick={confirmDelete}>Delete Alert</a>
          </Menu.Item>
        </Menu>
      )}
    >
      <Button>
        {loading ? <Icon type="loading" /> : <Icon type="ellipsis" rotate={90} />}
      </Button>
    </Dropdown>
  );
}

MenuButton.propTypes = {
  doDelete: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
};
