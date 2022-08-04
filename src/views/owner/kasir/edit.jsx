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
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormLabel,
} from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { KasirService } from 'src/utils/services/kasir.service'

export default function OwnerProductCategoryEdit() {
  const [name, setName] = React.useState('')
  const [username, setusername] = React.useState('')
  const [password, setpassword] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const [role, setRole] = React.useState('kasir')

  const auth = useSelector((state) => state.AuthReducers)
  const navigate = useNavigate()
  const param = useParams()

  React.useEffect(() => {
    KasirService()
      .detailKasir(param.id, auth.token)
      .then((response) => {
        setName(response.data.name)
        setusername(response.data.username)
        setRole(response.data.role)
      })
  }, [auth.token, param.id])

  const renderModal = () => (
    <CModal visible={modalVisible} onClose={() => setModalVisible(false)} alignment="center">
      <CModalHeader onClose={() => setModalVisible(false)}>
        <CModalTitle>Hapus kasir</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Apakah kamu yakin ingin menghapus data kasir {name}?</p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          className="text-white"
          onClick={() => {
            KasirService()
              .deleteKasir(param.id, auth.token)
              .then((response) => {
                navigate('/owner/kasir')
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

    if (username.length === 0) {
      return
    }

    const request = {
      name: name,
      username: username,
      role: role,
    }

    console.log(request)

    KasirService()
      .updateKasir(param.id, request, auth.token)
      .then((response) => {
        navigate('/owner/kasir')
      })
      .catch((error) => {})
  }

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
