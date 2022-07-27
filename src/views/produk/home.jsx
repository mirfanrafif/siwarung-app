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
} from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addKeranjangAction } from 'src/utils/redux/actions/menuactions'
import { MenuService } from 'src/utils/services/menu.service'
import currency from 'currency.js'

export default function ProdukHome() {
  const [produk, setProduk] = React.useState([])

  React.useEffect(() => {
    MenuService()
      .getMenu()
      .then((response) => {
        console.log(response.data)
        setProduk(response.data)
      })
  }, [])

  return (
    <>
      <CRow>
        {produk.map((produkItem) => {
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

  const addToCartToast = (produk) => (
    <CToast title="CoreUI for React.js" color="primary" className="text-white align-items-center">
      <CToastBody>
        <div className="d-flex">
          {produk.name} berhasil ditambahkan ke keranjang. Jumlah {produk.name} yang dibeli{' '}
          {keranjang.find((value, index) => value.menu.id === produk.id).jumlah + 1}
          <CToastClose white />
        </div>
      </CToastBody>
    </CToast>
  )

  return (
    <CCol sm={6} lg={3}>
      <CCard className="mb-4">
        <CCardBody>
          <h5>{props.produk.name}</h5>
          <h6>
            {currency(props.produk.price, {
              symbol: 'Rp.',
              separator: '.',
              precision: 0,
            }).format()}
          </h6>
        </CCardBody>
        <CCardFooter>
          <CButton
            onClick={() => {
              dispatch(addKeranjangAction(props.produk))
              // addToast(addToCartToast(props.produk))
            }}
          >
            Tambah ke Keranjang
          </CButton>
          <CToaster ref={toaster} push={toast} placement="top-end" />
        </CCardFooter>
      </CCard>
    </CCol>
  )
}
