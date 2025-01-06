'use client'

import { useEffect, useState } from 'react'
import { type ColDef, type RowClickedEvent, type ValueGetterParams } from 'ag-grid-community'
import { useRouter } from 'next/navigation'

import AgGridComponent from '~/components/ag-gridtable/ag-gridtable'
import { fetchUsersData } from '~/components/UsersTableComponent/users'
import { type User } from '~/shared/types'

const UserData = () => {
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  useEffect(() => {
    const data = fetchUsersData()
    setUsers(data)
  }, [])

  const handleRowClick = (params: RowClickedEvent<User>) => {
    const userId = params.data?.id
    if (userId) {
      router.push(`/users/${userId}`)
    }
  }

  const columnDefs: ColDef<User>[] = [
    {
      headerName: 'STT',
      valueGetter: (params: ValueGetterParams<User>) => {
        return params.node?.rowIndex != null ? params.node.rowIndex + 1 : 0
      },
      width: 80
    },
    {
      headerName: 'Tên người dùng',
      field: 'name'
    },
    { headerName: 'Mật khẩu', field: 'password', filter: false },
    { headerName: 'Mật khẩu C2', field: 'passwordC2', filter: false },
    { headerName: 'Liên hệ', field: 'contact', filter: false },
    { headerName: 'Trạng thái', field: 'status' },
    { headerName: 'Người giới thiệu', field: 'referral', filter: false },
    { headerName: 'Tài sản', field: 'assets' },
    { headerName: 'Báo cáo', field: 'report' },
    { headerName: 'Ghi chú', field: 'notes', filter: false }
  ]

  return (
    <div className='p-6'>
      <AgGridComponent
        data={users}
        columnDefs={columnDefs}
        handleClick={handleRowClick}
        defaultColDef={{
          flex: 1,
          minWidth: 150,
          resizable: true,
          sortable: true,
          filter: true
        }}
      />
    </div>
  )
}

export default UserData
