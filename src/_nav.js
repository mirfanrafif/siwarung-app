import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilApps, cilCart, cilFastfood, cilGroup, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Pemilik',
    role: ['owner'],
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/owner/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    role: ['owner'],
  },
  {
    component: CNavItem,
    name: 'Kasir',
    to: '/owner/kasir',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    role: ['owner'],
  },
  {
    component: CNavItem,
    name: 'Kategori',
    to: '/owner/product_category',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
    role: ['owner'],
  },
  {
    component: CNavItem,
    name: 'Produk',
    to: '/owner/produk',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    role: ['owner'],
  },
  {
    component: CNavTitle,
    name: 'Kasir',
    role: ['owner'],
  },
  {
    component: CNavItem,
    name: 'Produk',
    to: '/produk',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    role: ['owner', 'kasir'],
  },
  {
    component: CNavItem,
    name: 'Keranjang',
    to: '/cart',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    role: ['owner', 'kasir'],
  },
]

export default _nav
