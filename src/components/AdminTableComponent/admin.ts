import { type Admin, AdminStatus } from '~/shared/types/common.type'

export const fetchAdminData = async (): Promise<Admin[]> => {
  return [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      password: '**********',
      status: AdminStatus.Active,
      roles: ['Admin', 'Manager'],
      createdAt: new Date('2023-01-01T00:00:00Z').toLocaleDateString(),
      createdBy: 'System',
      notes: 'Ghi chú 1'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      password: '**********',
      status: AdminStatus.Inactive,
      roles: ['Editor'],
      createdAt: new Date('2023-02-01T00:00:00Z').toLocaleDateString(),
      createdBy: 'System',
      notes: 'Ghi chú 2'
    }
  ]
}
