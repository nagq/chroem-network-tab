import React, { useEffect, useState } from 'react';
import { ClearOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-json';
import * as ace from 'ace-builds/src-noconflict/ace';
import JsonStringfy from 'json-stable-stringify';

import styles from './index.less';

ace.config.set('basePath', '/');

let globalList = [];

const DevTools = () => {
  const [list, setList] = useState([]);
  const [active, setActive] = useState(0);
  const item = list && list[active] && list[active];

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e && e.data) {
        const { type, details } = e && e.data;

        if (type === 'my-network-message') {
          globalList = globalList.concat(details);
          setList(globalList);
        }
      }
    });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.header}>
          <span>服务器请求概览</span>
          <Tooltip title="点击清空数据">
            <div
              className={styles.icon}
              onClick={() => {
                setList([]);
                globalList = [];
                setActive(0);
              }}
            >
              <ClearOutlined />
            </div>
          </Tooltip>
        </div>
        <div className={styles.list}>
          {list.map(({ id, url }, idx) => {
            return (
              <div
                key={id}
                className={styles.item}
                style={{
                  borderLeft: idx === active ? '4px solid #00bc70' : 'none',
                }}
                onClick={() => setActive(idx)}
              >
                <div className={styles.eventName}>{url}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>服务器请求详情</div>

        <AceEditor
          mode="json"
          theme="github"
          name={'UNIQUE_ID_OF_DIV'}
          editorProps={{ $blockScrolling: true }}
          value={JsonStringfy(item || {}, { space: '  ' })}
          style={{ width: '100%' }}
          maxLines={120}
          readOnly={true}
          showPrintMargin={false}
          setOptions={{ useWorker: false }}
        />
      </div>
    </div>
  );
};

export default DevTools;
