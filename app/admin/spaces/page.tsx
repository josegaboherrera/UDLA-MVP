'use client'

import { mockSpaces, Space } from '@/lib/mockData'
import { useState } from 'react'

export default function SpacesPage() {
  const [spaces, setSpaces] = useState(mockSpaces)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState<Omit<Space, 'id'>>({
    name: '',
    category: '',
    capacity: 0,
    rate: 0,
    image: '',
    description: '',
    location: '',
    calendarEmail: '',
    rentalPurposes: [],
  })

  const filteredSpaces = spaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddClick = () => {
    setFormData({
      name: '',
      category: '',
      capacity: 0,
      rate: 0,
      image: '',
      description: '',
      location: '',
      calendarEmail: '',
      rentalPurposes: [],
    })
    setImagePreview('')
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (space: Space) => {
    setFormData({
      name: space.name,
      category: space.category,
      capacity: space.capacity,
      rate: space.rate,
      image: space.image,
      description: space.description,
      location: space.location,
      calendarEmail: space.calendarEmail,
      rentalPurposes: space.rentalPurposes,
    })
    setImagePreview(space.image)
    setEditingId(space.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este espacio?')) {
      setSpaces(spaces.filter((space) => space.id !== id))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' || name === 'rate' ? parseFloat(value) : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData((prev) => ({
          ...prev,
          image: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.category || !formData.location) {
      alert('Por favor rellene los campos obligatorios')
      return
    }

    if (editingId !== null) {
      // Edit existing space
      setSpaces(
        spaces.map((space) =>
          space.id === editingId
            ? {
                id: space.id,
                ...formData,
              }
            : space
        )
      )
    } else {
      // Add new space
      const newSpace: Space = {
        id: Math.max(...spaces.map((s) => s.id), 0) + 1,
        ...formData,
      }
      setSpaces([...spaces, newSpace])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setImagePreview('')
  }

  return (
    <div className="py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Espacios</h1>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
          >
            ➕ Añadir Nuevo Espacio
          </button>
        )}
      </div>

      {/* Space Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? '✏️ Editar Espacio' : '📝 Registrar Nuevo Espacio'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="ej., Auditorio A"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Categoría *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="ej., Auditorio"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Ubicación *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="ej., Edificio A, Planta 2"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Capacidad (personas)</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="ej., 50"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tarifa por Hora ($)</label>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  placeholder="ej., 50"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Correo del Calendario</label>
                <input
                  type="email"
                  name="calendarEmail"
                  value={formData.calendarEmail}
                  onChange={handleInputChange}
                  placeholder="ej., auditorium@udla.edu"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Destino del Alquiler (separador por comas)</label>
                <input
                  type="text"
                  placeholder="ej., Conferencias, Seminarios, Presentaciones"
                  value={formData.rentalPurposes.join(', ')}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    rentalPurposes: e.target.value.split(',').map(p => p.trim()).filter(p => p)
                  }))}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                <p className="text-xs text-gray-500 mt-1">Ingrese los propósitos separados por comas</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Foto del Espacio</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-600 mb-2">Vista previa:</p>
                    <img src={imagePreview} alt="Vista previa" className="h-40 w-full object-cover rounded" />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descripción del espacio..."
                  className="w-full p-3 border border-gray-300 rounded"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-semibold transition"
              >
                {editingId ? '💾 Actualizar Espacio' : '✅ Registrar Espacio'}
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

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Buscar espacios por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpaces.map((space) => (
          <div key={space.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="h-40 bg-gray-300 rounded-t-lg flex items-center justify-center overflow-hidden">
              {space.image ? (
                <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">📷</span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Categoría:</strong> {space.category}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Ubicación:</strong> {space.location}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Capacidad:</strong> {space.capacity} personas
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tarifa:</strong> ${space.rate}/hora
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Correo Calendario:</strong> <a href={`mailto:${space.calendarEmail}`} className="text-blue-600 hover:underline">{space.calendarEmail}</a>
                </p>
                {space.rentalPurposes && space.rentalPurposes.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    <strong>Destinos del Alquiler:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {space.rentalPurposes.map((purpose, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {purpose}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">{space.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(space)}
                  className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm font-semibold"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(space.id)}
                  className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 text-sm font-semibold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSpaces.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron espacios</p>
        </div>
      )}
    </div>
  )
}