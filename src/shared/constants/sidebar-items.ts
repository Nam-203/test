import { AiOutlineBulb, AiOutlineFileSearch } from 'react-icons/ai'
import { BiDollarCircle, BiHistory } from 'react-icons/bi'
import { BsGearFill, BsGraphUp } from 'react-icons/bs'
import { FaCog, FaUsers, FaUserTie } from 'react-icons/fa'
import { IoIosNotificationsOutline } from 'react-icons/io'
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAdminPanelSettings,
  MdOutlineCategory,
  MdOutlineGroup,
  MdOutlineHistoryEdu
} from 'react-icons/md'
import { RiBarChartGroupedLine } from 'react-icons/ri'

import { APP_ROUTES } from '~/config/routes'

const icons = {
  dashboard: RiBarChartGroupedLine,
  stocks: BsGraphUp,
  pendingOrders: MdOutlineCategory,
  exchangeConfig: BsGearFill,
  userGuide: AiOutlineFileSearch,
  userAssets: MdOutlineAccountBalanceWallet,
  depositWithdraw: BiDollarCircle,
  transactionHistory: BiHistory,
  approvalHistory: MdOutlineHistoryEdu,
  loginHistory: FaUserTie,
  adminHistory: FaUsers,
  userManagement: MdOutlineGroup,
  languages: FaCog,
  notifications: IoIosNotificationsOutline,
  news: AiOutlineBulb,
  admin: MdOutlineAdminPanelSettings
}

export const menuItems = [
  {
    category: 'Menu',
    items: [
      { link: '/dashboard', name: 'Thống kê', icon: icons.dashboard },
      { link: '/stocks', name: 'Quản lý mã Chứng khoán', icon: icons.stocks },
      { link: '/users', name: 'Quản lý người dùng', icon: icons.userManagement },
      { link: '/roles', name: 'Quản lý vai trò', icon: icons.admin }
    ]
  },
  {
    category: 'Quản lý sàn giao dịch',
    items: [
      { link: '/pending-orders', name: 'Quản lý lệnh chờ khớp', icon: icons.pendingOrders },
      { link: '/exchange-config', name: 'Cấu hình sàn giao dịch', icon: icons.exchangeConfig },
      { link: '/user-guide', name: 'Hướng dẫn sử dụng', icon: icons.userGuide }
    ]
  },
  {
    category: 'Quản lý giao dịch tiền',
    items: [
      { link: '/user-assets', name: 'Tài sản người dùng', icon: icons.userAssets },
      { link: '/deposit-withdraw', name: 'Các lệnh nạp rút', icon: icons.depositWithdraw },
      { link: '/transaction-history', name: 'Lịch sử nạp rút', icon: icons.transactionHistory }
    ]
  },
  {
    category: 'Lịch sử giao dịch',
    items: [
      { link: '/approval-history', name: 'Lịch sử duyệt lệnh', icon: icons.approvalHistory },
      { link: '/transaction-history', name: 'Lịch sử giao dịch', icon: icons.transactionHistory },
      { link: '/login-history', name: 'Lịch sử đăng nhập', icon: icons.loginHistory },
      { link: '/admin-history', name: 'Lịch sử admin', icon: icons.adminHistory }
    ]
  },
  {
    category: 'Quản lý hệ thống',
    items: [
      { link: '/languages', name: 'Ngôn ngữ', icon: icons.languages },
      { link: '/notifications', name: 'Thông báo', icon: icons.notifications },
      { link: '/user-guide', name: 'Hướng dẫn sử dụng', icon: icons.userGuide },
      { link: '/news', name: 'Tin tức', icon: icons.news }
    ]
  },
  {
    category: 'Quản lý admin',
    items: [{ link: '/admin-management', name: 'Quản lý Admin', icon: icons.admin }]
  }
]

export const SETTINGS_SIDEBAR_ITEMS = [
  {
    category: 'accountSetting',
    items: [
      {
        label: 'profile',
        icon: '/assets/icons/profile.svg',
        path: APP_ROUTES.COMMON.SETTINGS.PROFILE
      }
    ]
  },
  {
    category: 'authentication',
    items: [
      {
        label: 'logout',
        icon: '/assets/icons/logout.svg',
        path: APP_ROUTES.AUTH.LOGOUT
      }
    ]
  }
]
