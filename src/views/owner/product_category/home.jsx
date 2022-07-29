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
import { ProductCategoryService } from 'src/utils/services/productcategory.service'

export default function OwnerProductCategoryHome() {
  const [produk, setProduk] = React.useState([])
  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()

  React.useEffect(() => {
    ProductCategoryService()
      .getMenu(auth.token)
      .then((response) => {
        console.log(response.data)
        setProduk(response.data)
      })
  }, [auth.token])

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h3>Kategori</h3>
        <CButton href="/owner/product_category/add">Tambah</CButton>
      </div>
      <CCard>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nama</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {produk.map((item) => (
              <CTableRow
                key={item.id}
                onClick={() => {
                  navigate('/owner/product_category/' + item.id)
                }}
              >
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}
