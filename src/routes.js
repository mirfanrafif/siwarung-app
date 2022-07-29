import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Produk
const ProdukHome = React.lazy(() => import('./views/produk/home'))
const ProdukKeranjang = React.lazy(() => import('./views/produk/keranjang'))

//Admin manage Produk
const OwnerProdukHome = React.lazy(() => import('./views/owner/produk/home'))
const OwnerProdukAdd = React.lazy(() => import('./views/owner/produk/add'))
const OwnerProdukEdit = React.lazy(() => import('./views/owner/produk/edit'))

const OwnerProductCategoryHome = React.lazy(() => import('./views/owner/product_category/home'))
const OwnerProductCategoryAdd = React.lazy(() => import('./views/owner/product_category/add'))
const OwnerProductCategoryEdit = React.lazy(() => import('./views/owner/product_category/edit'))

const OwnerKasirHome = React.lazy(() => import('./views/owner/kasir/home'))
const OwnerKasirAdd = React.lazy(() => import('./views/owner/kasir/add'))
const OwnerKasirEdit = React.lazy(() => import('./views/owner/kasir/edit'))

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/owner/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/produk', name: 'Produk', element: ProdukHome },
  { path: '/cart', name: 'Keranjang', element: ProdukKeranjang },
  //Produk
  { path: '/owner/produk', name: 'Atur produk', element: OwnerProdukHome },
  { path: '/owner/produk/add', name: 'Tambah produk', element: OwnerProdukAdd },
  { path: '/owner/produk/:id', name: 'Ubah produk', element: OwnerProdukEdit },
  //Produk Category
  {
    path: '/owner/product_category',
    name: 'Atur kategori produk',
    element: OwnerProductCategoryHome,
  },
  {
    path: '/owner/product_category/add',
    name: 'Tambah kategori produk',
    element: OwnerProductCategoryAdd,
  },
  {
    path: '/owner/product_category/:id',
    name: 'Ubah kategori produk',
    element: OwnerProductCategoryEdit,
  },
  {
    path: '/owner/kasir',
    name: 'Atur kategori produk',
    element: OwnerKasirHome,
  },
  {
    path: '/owner/kasir/add',
    name: 'Tambah kategori produk',
    element: OwnerKasirAdd,
  },
  {
    path: '/owner/kasir/:id',
    name: 'Ubah kategori produk',
    element: OwnerKasirEdit,
  },
]

export default routes
