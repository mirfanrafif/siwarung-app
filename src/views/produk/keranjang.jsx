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
import ReactToPrint from 'react-to-print'
import { cartCleanAction, setKeranjangAction } from 'src/utils/redux/actions/menuactions'
import { TransactionService } from 'src/utils/services/transactions.service'

export default function ProdukKeranjang() {
  const keranjang = useSelector((state) => state.keranjangReducer)
  const auth = useSelector((state) => state.AuthReducers)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [successModalVisible, setSuccessModalVisible] = React.useState(false)
  const [jumlahBayar, setJumlahBayar] = React.useState(0)
  const [transaksi, setTransaksi] = React.useState({})
  const navigate = useNavigate()

  let componentRef = React.useRef()

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
              {currency(
                keranjang.keranjang.length > 0
                  ? keranjang.keranjang
                      .map((item) => item.jumlah * item.menu.price)
                      .reduce((prev, cur, index) => prev + cur)
                  : 0,
                {
                  symbol: 'Rp. ',
                  separator: '.',
                  precision: 0,
                },
              ).format()}
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
              feedbackInvalid="Uang bayar kurang"
              value={jumlahBayar}
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
              .then((response) => {
                console.log('success save transaction')
                setModalVisible(false)
                setSuccessModalVisible(true)
                setTransaksi(response.data)
                console.log(response.data)
                dispatch(cartCleanAction())
                // navigate('/produk')
              })
              .catch({})
          }}
        >
          Selesai
        </CButton>
      </CModalFooter>
    </CModal>
  )

  const renderSuccessModal = () => (
    <CModal visible={successModalVisible} onClose={() => setModalVisible(false)} alignment="center">
      <CModalHeader onClose={() => setModalVisible(false)}>
        <CModalTitle>Pembayaran</CModalTitle>
      </CModalHeader>
      <CModalBody>Berhasil melakukan transaksi</CModalBody>
      <CModalFooter>
        <ReactToPrint trigger={() => <CButton>Cetak Struk</CButton>} content={() => componentRef} />
      </CModalFooter>
    </CModal>
  )

  const componentToPrint = () => (
    <div ref={(el) => (componentRef = el)}>
      {transaksi.message === undefined ? (
        <></>
      ) : (
        <div style={{ margin: '60px' }}>
          <div>
            <div style={{ marginBottom: '60px' }}>
              <h5>{auth.user.warung.name}</h5>
              <h6>{auth.user.warung.address}</h6>
            </div>
            <table className="table table-borderless" style={{ marginBottom: '60px' }}>
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>@</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.data.details.map((item) => {
                  return (
                    <tr key={item.product.id}>
                      <td>{item.product.name}</td>
                      <td>
                        {currency(item.product.price, {
                          symbol: 'Rp. ',
                          separator: '.',
                          precision: 0,
                        }).format()}
                      </td>
                      <td>{item.count}</td>
                      <td>
                        {currency(item.count * item.product.price, {
                          symbol: 'Rp. ',
                          separator: '.',
                          precision: 0,
                        }).format()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <h6>
                Total :{' '}
                {currency(transaksi.data.total, {
                  symbol: 'Rp. ',
                  separator: '.',
                  precision: 0,
                }).format()}
              </h6>
            </div>
          </div>
        </div>
      )}
    </div>
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
                    <div className="mr-2 ml-2">{item.jumlah}</div>
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
        {renderSuccessModal()}
      </div>

      <div style={{ display: 'none' }}>
        <h5>Contoh struk: </h5>
        <CCard>{componentToPrint()}</CCard>
      </div>
    </>
  )
}
