import styles from './index.less'
import AntResetStyle from '../components/AntResetStyle'
import { Button, Modal } from 'antd'
import { useState } from 'react'

export default function Home() {
  const [show, setShow] = useState(false)
  return (
    <>
      <AntResetStyle primaryColor="#ed695e" />
      <Modal visible={show} onCancel={() => setShow(false)} />
      <Button className={styles.text} onClick={() => setShow(true)}>
        btn
      </Button>
    </>
  )
}
