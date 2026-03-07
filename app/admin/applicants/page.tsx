'use client'

import { useState } from 'react'
import { mockApplicants, Applicant } from '@/lib/mockData'

interface FormData {
  id: string
  name: string
  email: string
  phone: string
  department: string
}

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
  })

  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.id.includes(searchTerm.toLowerCase()) ||
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.id || !formData.name || !formData.email || !formData.phone) {
      alert('Por favor, rellene todos los campos obligatorios')
      return
    }

    // Check if ID already exists (unless editing)
    if (!editingId && applicants.some((a) => a.id === formData.id)) {
      alert('Este ID ya está registrado')
      return
    }

    if (editingId) {
      // Edit existing applicant
      setApplicants(
        applicants.map((a) =>
          a.id === editingId
            ? {
                id: editingId, // Keep original ID
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                department: formData.department,
              }
            : a
        )
      )
      setEditingId(null)
    } else {
      // Add new applicant
      const newApplicant: Applicant = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
      }
      setApplicants([...applicants, newApplicant])
    }

    // Reset form
    setFormData({ id: '', name: '', email: '', phone: '', department: '' })
    setShowForm(false)
  }

  const handleEdit = (applicant: Applicant) => {
    setFormData({
      id: applicant.id,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      department: applicant.department || '',
    })
    setEditingId(applicant.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm(`¿Está seguro de que desea eliminar a este solicitante (${id})?`)) {
      setApplicants(applicants.filter((a) => a.id !== id))
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ id: '', name: '', email: '', phone: '', department: '' })
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Solicitantes Autorizados</h1>
          <p className="text-gray-600 mt-2">Registre y gestione usuarios autorizados que puedan hacer reservas</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            ➕ Registrar Nuevo ID
          </button>
        )}
      </div>

      {/* Registration Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? '✏️ Editar Solicitante' : '📝 Registrar Nuevo Solicitante'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Número de Identificación *
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="ej., 123456"
                  disabled={!!editingId}
                  className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100 disabled:text-gray-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {editingId ? 'No se puede cambiar' : 'Identificador único para el solicitante'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="ej., Juan Pérez"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Dirección de Correo Electrónico *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ej., juan@udla.edu"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Número de Teléfono *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="ej., (555) 123-4567"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Departamento</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="ej., Ingeniería, Negocios, Ciencias"
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <p className="text-xs text-gray-500 mt-1">Campo opcional</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-semibold transition"
              >
                {editingId ? '💾 Actualizar Solicitante' : '✅ Registrar Solicitante'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 font-semibold transition"
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Buscar por ID, nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <p className="text-sm text-gray-600 mt-2">
          Mostrando {filteredApplicants.length} de {applicants.length} solicitantes
        </p>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {filteredApplicants.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left font-semibold">ID</th>
                <th className="p-4 text-left font-semibold">Nombre</th>
                <th className="p-4 text-left font-semibold">Correo</th>
                <th className="p-4 text-left font-semibold">Teléfono</th>
                <th className="p-4 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold text-blue-600">{applicant.id}</td>
                  <td className="p-4">{applicant.name}</td>
                  <td className="p-4">{applicant.email}</td>
                  <td className="p-4">{applicant.phone}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(applicant)}
                      className="text-blue-600 hover:text-blue-800 hover:underline mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(applicant.id)}
                      className="text-red-600 hover:text-red-800 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No se encontraron solicitantes</p>
            {searchTerm && <p className="text-sm text-gray-400 mt-2">Intenta con un término de búsqueda diferente</p>}
          </div>
        )}
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Total Registrados</p>
          <p className="text-3xl font-bold mt-2">{applicants.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Solicitantes Activos</p>
          <p className="text-3xl font-bold mt-2">{applicants.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Última Actualización</p>
          <p className="text-sm mt-2">Hoy</p>
        </div>
      </div>
    </div>
  )
}