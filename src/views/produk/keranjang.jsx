import {
  CButton,
  CCard,
  CFormInput,
  CInputGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CRow,
  CCol,
  CHeaderDivider,
} from '@coreui/react'
import currency from 'currency.js'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartCleanAction, setKeranjangAction } from 'src/utils/redux/actions/menuactions'
import { TransactionService } from 'src/utils/services/transactions.service'

export default function ProdukKeranjang() {
  const keranjang = useSelector((state) => state.keranjangReducer)
  const auth = useSelector((state) => state.AuthReducers)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [jumlahBayar, setJumlahBayar] = React.useState(0)
  const navigate = useNavigate()

  const renderModal = () => (
    <CModal visible={modalVisible} onClose={() => setModalVisible(false)} alignment="center">
      <CModalHeader onClose={() => setModalVisible(false)}>
        <CModalTitle>Pembayaran</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs={3}>Total</CCol>
          <CCol xs={9}>
            <div className="mb-4">
              {currency(keranjang.total, {
                symbol: 'Rp. ',
                separator: '.',
                precision: 0,
              }).format()}
            </div>
          </CCol>
          <CCol xs={3}>
            <div className="mb-4">Jumlah Bayar</div>
          </CCol>
          <CCol xs={9}>
            <CFormInput
              type="number"
              onChange={(event) => setJumlahBayar(event.target.value)}
              invalid={jumlahBayar < keranjang.total}
              feedbackInvalid="Uang bayar kurang "
            />
          </CCol>
          <CCol xs={3}>Kembali</CCol>
          <CCol xs={9}>
            <div className="mb-6">
              {currency(jumlahBayar - keranjang.total, {
                symbol: 'Rp. ',
                separator: '.',
                precision: 0,
              }).format()}
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            if (jumlahBayar < keranjang.total) {
              return
            }

            const request = {
              items: keranjang.keranjang.map((item) => ({
                productId: item.menu.id,
                count: item.jumlah,
              })),
            }

            console.log(JSON.stringify(request))

            const token = auth.token

            TransactionService()
              .saveTransaction(request, token)
              .then((data) => {
                console.log('success save transaction')
                setModalVisible(false)
                dispatch(cartCleanAction())
                navigate('/produk')
              })
              .catch({})
          }}
        >
          Selesai
        </CButton>
      </CModalFooter>
    </CModal>
  )

  return (
    <>
      <CCard className="mb-4">
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Nama Produk</CTableHeaderCell>
              <CTableHeaderCell>Harga</CTableHeaderCell>
              <CTableHeaderCell>@</CTableHeaderCell>
              <CTableHeaderCell>Jumlah</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {keranjang.keranjang.map((item) => (
              <CTableRow key={item.menu.id}>
                <CTableDataCell>{item.menu.name}</CTableDataCell>
                <CTableDataCell>
                  {currency(item.menu.price, {
                    symbol: 'Rp. ',
                    separator: '.',
                    precision: 0,
                  }).format()}
                </CTableDataCell>
                <CTableDataCell>
                  <CInputGroup size="sm">
                    <CButton
                      variant="outline"
                      color="success"
                      type="button"
                      onClick={() => {
                        const newJumlah = item.jumlah + 1
                        const newCart = {
                          menu: item.menu,
                          jumlah: newJumlah,
                        }
                        dispatch(setKeranjangAction(newCart))
                      }}
                    >
                      +
                    </CButton>
                    <CFormInput value={item.jumlah} disabled />
                    <CButton
                      variant="outline"
                      color="danger"
                      type="button"
                      onClick={() => {
                        const newJumlah = item.jumlah - 1
                        const newCart = {
                          menu: item.menu,
                          jumlah: newJumlah,
                        }
                        dispatch(setKeranjangAction(newCart))
                      }}
                    >
                      -
                    </CButton>
                  </CInputGroup>
                </CTableDataCell>
                <CTableDataCell>
                  {currency(item.jumlah * item.menu.price, {
                    symbol: 'Rp. ',
                    separator: '.',
                    precision: 0,
                  }).format()}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Total:</h6>
          <h5>
            {currency(keranjang.total, {
              symbol: 'Rp. ',
              separator: '.',
              precision: 0,
            }).format()}
          </h5>
        </div>
        <CButton
          onClick={() => {
            if (keranjang.total === 0) {
              return
            }
            setModalVisible(true)
          }}
        >
          Bayar
        </CButton>
        {renderModal()}
      </div>
    </>
  )
}
