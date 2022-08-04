import {
  CButton,
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MenuService } from 'src/utils/services/menu.service'
import currency from 'currency.js'

export default function OwnerProdukHome() {
  const [produk, setProduk] = React.useState([])
  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()

  React.useEffect(() => {
    MenuService()
      .getMenu(auth.token)
      .then((response) => {
        console.log(response.data)
        setProduk(response.data)
      })
  }, [auth.token])

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h3>Menu</h3>
        <CButton href="/owner/produk/add">Tambah</CButton>
      </div>
      <CCard>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nama</CTableHeaderCell>
              <CTableHeaderCell>Harga</CTableHeaderCell>
              <CTableHeaderCell>Kategori</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {produk.map((item) => (
              <CTableRow
                key={item.id}
                onClick={() => {
                  navigate('/owner/produk/' + item.id)
                }}
              >
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>
                  {currency(item.price, {
                    symbol: 'Rp ',
                    separator: '.',
                    precision: 0,
                  }).format()}
                </CTableDataCell>
                <CTableDataCell>{item.category.name}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}
