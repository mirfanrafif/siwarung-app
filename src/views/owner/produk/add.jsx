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
} from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MenuService } from 'src/utils/services/menu.service'
import { ProductCategoryService } from 'src/utils/services/productcategory.service'

export default function OwnerProdukAdd() {
  const [selectedCategory, setSelectedCategory] = React.useState(0)
  const [productCategory, setProductCategory] = React.useState([])
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState(0)

  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()

  React.useEffect(() => {
    ProductCategoryService()
      .getMenu(auth.token)
      .then((data) => {
        console.log(data.data)
        setProductCategory(data.data)
      })
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Tambah menu/produk</h3>
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
            <CDropdown className="flex-fill mb-4">
              <CDropdownToggle
                color={selectedCategory === 0 ? 'success' : 'white'}
                className={selectedCategory === 0 ? 'text-white' : undefined}
              >
                {selectedCategory !== 0
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
          <CButton
            onClick={() => {
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
                .addMenu(request, auth.token)
                .then((response) => {
                  navigate('/owner/produk')
                })
                .catch((error) => {})
            }}
          >
            Tambah menu
          </CButton>
        </CCardBody>
      </CCard>
    </div>
  )
}
