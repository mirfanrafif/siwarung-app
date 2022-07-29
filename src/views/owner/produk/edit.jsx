import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MenuService } from 'src/utils/services/menu.service'
import { ProductCategoryService } from 'src/utils/services/productcategory.service'

export default function OwnerProdukEdit() {
  const [selectedCategory, setSelectedCategory] = React.useState(0)
  const [productCategory, setProductCategory] = React.useState([])
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [modalVisible, setModalVisible] = React.useState(false)

  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()
  const param = useParams()

  React.useEffect(() => {
    ProductCategoryService()
      .getMenu(auth.token)
      .then((data) => {
        console.log(data.data)
        setProductCategory(data.data)
      })
      .catch((error) => {
        console.log(error)
      })

    MenuService()
      .detailMenu(param.id, auth.token)
      .then((response) => {
        console.log(response.data)
        setName(response.data.name)
        setPrice(response.data.price)
        setSelectedCategory(response.data.category.id)
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
            MenuService()
              .deleteMenu(param.id, auth.token)
              .then((response) => {
                navigate('/owner/produk')
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
          className="text-white"
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

    if (price === 0) {
      return
    }

    if (selectedCategory === 0) {
      return
    }

    const request = {
      name: name,
      price: parseInt(price),
      categoryId: selectedCategory,
    }

    console.log(request)

    MenuService()
      .updateMenu(param.id, request, auth.token)
      .then((response) => {
        navigate('/owner/produk')
      })
      .catch((error) => {})
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Ubah menu/produk</h3>
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
            <CFormInput
              type="number"
              placeholder="Cth: 10000"
              label="Harga"
              className="mb-4"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value)
              }}
            />
            <CFormLabel className="mr-4">Kategori</CFormLabel>
            <br />
            <CDropdown className="flex-fill">
              <CDropdownToggle
                color={selectedCategory === 0 ? 'success' : 'white'}
                className={selectedCategory === 0 ? 'text-white' : undefined}
              >
                {selectedCategory !== 0 && productCategory.length > 0
                  ? productCategory.find((item) => item.id === selectedCategory).name
                  : 'Pilih kategori'}
              </CDropdownToggle>
              <CDropdownMenu>
                {productCategory.map((item, index) => (
                  <CDropdownItem
                    key={index}
                    onClick={() => {
                      setSelectedCategory(item.id)
                    }}
                  >
                    {item.name}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
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
