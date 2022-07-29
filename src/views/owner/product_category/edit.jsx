import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductCategoryService } from 'src/utils/services/productcategory.service'

export default function OwnerProductCategoryEdit() {
  const [name, setName] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)

  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()
  const param = useParams()

  React.useEffect(() => {
    ProductCategoryService()
      .detailMenu(param.id, auth.token)
      .then((response) => {
        console.log(response.data)
        setName(response.data.name)
      })
  }, [auth.token, param.id])

  const renderModal = () => (
    <CModal visible={modalVisible} onClose={() => setModalVisible(false)} alignment="center">
      <CModalHeader onClose={() => setModalVisible(false)}>
        <CModalTitle>Hapus menu</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Apakah kamu yakin ingin menghapus data menu {name}?</p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          className="text-white"
          onClick={() => {
            ProductCategoryService()
              .deleteMenu(param.id, auth.token)
              .then((response) => {
                navigate('/owner/product_category')
              })
              .catch((error) => {
                console.log(error)
              })
          }}
        >
          Ya
        </CButton>
        <CButton
          color="secondary"
          variant="outline"
          onClick={() => {
            setModalVisible(false)
          }}
        >
          Batal
        </CButton>
      </CModalFooter>
    </CModal>
  )

  const updateMenu = () => {
    //TODO: Menambahkan produk ke API
    if (name.length === 0) {
      return
    }

    const request = {
      name: name,
    }

    console.log(request)

    ProductCategoryService()
      .updateMenu(param.id, request, auth.token)
      .then((response) => {
        navigate('/owner/product_category')
      })
      .catch((error) => {})
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Ubah kategori produk</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm>
            <CFormInput
              type="text"
              placeholder="Cth: Nasi Goreng"
              label="Nama produk/menu"
              className="mb-4"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </CForm>
          <div className="d-flex justify-content-between">
            <CButton className="mt-4" onClick={updateMenu}>
              Ubah menu
            </CButton>
            <CButton
              color="danger text-white"
              className="mt-4"
              onClick={() => {
                setModalVisible(true)
              }}
            >
              Hapus menu
            </CButton>
          </div>
        </CCardBody>
      </CCard>
      {renderModal()}
    </div>
  )
}
