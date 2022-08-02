import { CButton, CCard, CCardBody, CForm, CFormInput } from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ProductCategoryService } from 'src/utils/services/productcategory.service'

export default function OwnerProductCategoryAdd() {
  const [name, setName] = React.useState('')

  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Tambah kategori produk</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm>
            <CFormInput
              type="text"
              placeholder="Cth: Nasi, Sayur, Minum, dll"
              label="Nama kategori"
              className="mb-4"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </CForm>
          <CButton
            onClick={() => {
              //TODO: Menambahkan produk ke API
              if (name.length === 0) {
                return
              }

              const request = {
                name: name,
              }

              console.log(request)

              ProductCategoryService()
                .addMenu(request, auth.token)
                .then((response) => {
                  navigate('/owner/product_category')
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
