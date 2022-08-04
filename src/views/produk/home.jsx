import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToaster,
  CBadge,
  CFormInput,
} from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addKeranjangAction } from 'src/utils/redux/actions/menuactions'
import { MenuService } from 'src/utils/services/menu.service'
import currency from 'currency.js'

export default function ProdukHome() {
  const [produk, setProduk] = React.useState([])
  const [kategori, setKategori] = React.useState([])
  const auth = useSelector((state) => state.AuthReducers)
  const [selectedCategory, setSelectedCategory] = React.useState(0)
  const [cari, setCari] = React.useState('')

  React.useEffect(() => {
    MenuService()
      .getMenu(auth.token)
      .then((response) => {
        setProduk(response.data)
      })
  }, [auth.token])

  React.useEffect(() => {
    const categoryList = produk.map((el) => el.category)
    const finalCategory = []
    categoryList.forEach((item) => {
      if (finalCategory.findIndex((addedCategory) => item.id === addedCategory.id) !== -1) {
        return
      }

      finalCategory.push(item)
    })

    setKategori(finalCategory)
  }, [produk])

  return (
    <>
      <CFormInput
        placeholder="Cari menu..."
        className="mb-4"
        onChange={(event) => {
          setCari(event.target.value)
        }}
      />
      <div className="mb-4">
        <CButton
          color={selectedCategory === 0 ? 'info' : 'light'}
          className="m-2"
          onClick={() => {
            setSelectedCategory(0)
          }}
        >
          Semua Menu
        </CButton>
        {kategori.map((item) => (
          <CButton
            key={item.id}
            color={selectedCategory === item.id ? 'info' : 'light'}
            className="m-2"
            onClick={() => {
              setSelectedCategory(item.id)
            }}
          >
            {item.name}
          </CButton>
        ))}
      </div>
      <CRow>
        {produk
          .filter((item) => (selectedCategory !== 0 ? item.category.id === selectedCategory : true))
          .filter((item) => {
            if (cari === '') {
              return true
            }
            const regex = new RegExp(cari, 'gi')

            // const found = regex.test(item.name)
            // console.log(found)
            return regex.test(item.name)
          })
          .map((produkItem) => {
            return <ProdukItem key={produkItem.id} produk={produkItem}></ProdukItem>
          })}
      </CRow>
    </>
  )
}

export function ProdukItem(props) {
  const [toast, addToast] = React.useState(0)
  const toaster = React.useRef()
  const keranjang = useSelector((state) => state.keranjangReducer.keranjang)
  const dispatch = useDispatch()
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const keranjangIndex = keranjang.findIndex((item) => item.menu.id === props.produk.id)
    if (keranjangIndex === -1) {
      return
    }
    setCount(keranjang[keranjangIndex].jumlah)
  }, [keranjang, props.produk.id])

  const addToCartToast = (produk) => (
    <CToast title="CoreUI for React.js" color="primary" className="text-white align-items-center">
      <CToastBody>
        <div className="d-flex">
          {produk.name} berhasil ditambahkan ke keranjang
          <CToastClose white />
        </div>
      </CToastBody>
    </CToast>
  )

  return (
    <CCol sm={6} lg={3}>
      <CCard className="mb-4">
        <CCardBody>
          <h6>{props.produk.name}</h6>
          <p>
            {currency(props.produk.price, {
              symbol: 'Rp ',
              separator: '.',
              precision: 0,
            }).format()}
          </p>
          <CButton
            onClick={() => {
              dispatch(addKeranjangAction(props.produk))
              addToast(addToCartToast(props.produk))
            }}
            color="success"
            shape="rounded-pill"
          >
            Tambah
            {count > 0 && (
              <CBadge color="danger" position="top-start" shape="rounded-pill">
                {count}
              </CBadge>
            )}
          </CButton>
          <CToaster ref={toaster} push={toast} placement="top-end" />
        </CCardBody>
      </CCard>
    </CCol>
  )
}
