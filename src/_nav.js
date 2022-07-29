import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilApps, cilCart, cilFastfood, cilGroup, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Pemilik',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/owner/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kasir',
    to: '/owner/kasir',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kategori',
    to: '/owner/product_category',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Produk',
    to: '/owner/produk',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Kasir',
  },
  {
    component: CNavItem,
    name: 'Produk',
    to: '/produk',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Keranjang',
    to: '/cart',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
]

export default _nav
