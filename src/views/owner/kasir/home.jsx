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
import { KasirService } from 'src/utils/services/kasir.service'

export default function OwnerProductCategoryHome() {
  const [produk, setProduk] = React.useState([])
  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()

  React.useEffect(() => {
    KasirService()
      .getKasir(auth.token)
      .then((response) => {
        console.log(response.data)
        setProduk(response.data)
      })
  }, [auth.token])

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h3>Kasir yang melayani</h3>
        <CButton href="/owner/kasir/add">Tambah</CButton>
      </div>
      <CCard>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Nama</CTableHeaderCell>
              <CTableHeaderCell>Username</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {produk.map((item) => (
              <CTableRow
                key={item.id}
                onClick={() => {
                  navigate('/owner/kasir/' + item.id)
                }}
              >
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.username}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}
