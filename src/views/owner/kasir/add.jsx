import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { KasirService } from 'src/utils/services/kasir.service'

export default function OwnerProductCategoryAdd() {
  const [name, setName] = React.useState('')
  const [username, setusername] = React.useState('')
  const [password, setpassword] = React.useState('')
  const [role, setRole] = React.useState('kasir')

  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h3>Tambah kasir</h3>
      </div>
      <CCard>
        <CCardBody>
          <CForm>
            <CFormInput
              type="text"
              label="Nama"
              className="mb-4"
              value={name}
              invalid={name.length === 0}
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
            <CFormInput
              type="text"
              label="Username"
              className="mb-4"
              value={username}
              invalid={username.length === 0}
              onChange={(event) => {
                setusername(event.target.value)
              }}
            />
            <CFormInput
              type="password"
              label="Password"
              className="mb-4"
              value={password}
              invalid={password.length === 0}
              onChange={(event) => {
                setpassword(event.target.value)
              }}
            />
            <CFormLabel className="mr-4">Kategori</CFormLabel>
            <br />
            <CDropdown className="flex-fill mb-4">
              <CDropdownToggle color="secondary">
                {role === 'owner' ? 'Pemilik' : 'Kasir'}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
                  onClick={() => {
                    setRole('owner')
                  }}
                >
                  Pemilik warung
                </CDropdownItem>
                <CDropdownItem
                  onClick={() => {
                    setRole('kasir')
                  }}
                >
                  Kasir
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CForm>
          <CButton
            onClick={() => {
              //TODO: Menambahkan produk ke API
              if (name.length === 0) {
                return
              }

              if (username.length === 0) {
                return
              }

              if (password.length === 0) {
                return
              }

              const request = {
                name: name,
                username: username,
                password: password,
                role: role,
              }

              console.log(request)

              KasirService()
                .addKasir(request, auth.token)
                .then((response) => {
                  navigate('/owner/kasir')
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
