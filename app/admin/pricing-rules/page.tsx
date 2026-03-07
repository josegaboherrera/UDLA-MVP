'use client'

import { useState } from 'react'
import { mockSpaces } from '@/lib/mockData'

interface PricingRule {
  id: number
  name: string
  spaceId: number
  baseRate: number
  peakRate: number
  bulkDiscount: number
  minHours: number
}

export default function PricingRulesPage() {
  const [rules, setRules] = useState<PricingRule[]>([
    {
      id: 1,
      name: 'Auditorium A',
      spaceId: 1,
      baseRate: 150,
      peakRate: 200,
      bulkDiscount: 10,
      minHours: 4,
    },
    {
      id: 2,
      name: 'Gym Court 1',
      spaceId: 2,
      baseRate: 75,
      peakRate: 100,
      bulkDiscount: 5,
      minHours: 2,
    },
    {
      id: 3,
      name: 'Classroom 101',
      spaceId: 3,
      baseRate: 50,
      peakRate: 70,
      bulkDiscount: 5,
      minHours: 2,
    },
    {
      id: 4,
      name: 'Auditorium B',
      spaceId: 4,
      baseRate: 120,
      peakRate: 160,
      bulkDiscount: 10,
      minHours: 4,
    },
    {
      id: 5,
      name: 'Tennis Court',
      spaceId: 5,
      baseRate: 60,
      peakRate: 80,
      bulkDiscount: 15,
      minHours: 2,
    },
    {
      id: 6,
      name: 'Meeting Room 201',
      spaceId: 6,
      baseRate: 30,
      peakRate: 40,
      bulkDiscount: 5,
      minHours: 2,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState<Omit<PricingRule, 'id'>>({
    name: '',
    spaceId: 0,
    baseRate: 0,
    peakRate: 0,
    bulkDiscount: 0,
    minHours: 0,
  })

  const filteredRules = rules.filter(
    (rule) => {
      const space = mockSpaces.find(s => s.id === rule.spaceId)
      return rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             (space && space.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  )

  const handleAddClick = () => {
    setFormData({
      name: '',
      spaceId: 0,
      baseRate: 0,
      peakRate: 0,
      bulkDiscount: 0,
      minHours: 0,
    })
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (rule: PricingRule) => {
    setFormData({
      name: rule.name,
      spaceId: rule.spaceId,
      baseRate: rule.baseRate,
      peakRate: rule.peakRate,
      bulkDiscount: rule.bulkDiscount,
      minHours: rule.minHours,
    })
    setEditingId(rule.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta regla de precios?')) {
      setRules(rules.filter((rule) => rule.id !== id))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: ['baseRate', 'peakRate', 'bulkDiscount', 'minHours'].includes(name)
        ? parseFloat(value)
        : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.spaceId) {
      alert('Por favor rellene los campos obligatorios')
      return
    }

    if (editingId !== null) {
      setRules(
        rules.map((rule) =>
          rule.id === editingId
            ? {
                id: rule.id,
                ...formData,
              }
            : rule
        )
      )
    } else {
      const newRule: PricingRule = {
        id: Math.max(...rules.map((r) => r.id), 0) + 1,
        ...formData,
      }
      setRules([...rules, newRule])
    }

    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Reglas de Precios</h1>
          <p className="text-gray-600 mt-2">Configure las reglas de precios por espacio</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            ➕ Nueva Regla de Precios
          </button>
        )}
      </div>

      {/* Pricing Form */}
      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? '✏️ Editar Regla de Precios' : '📝 Nueva Regla de Precios'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre de la Regla *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="ej., Auditorios Premium"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Espacio *</label>
                <select
                  name="spaceId"
                  value={formData.spaceId}
                  onChange={(e) => setFormData(prev => ({ ...prev, spaceId: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                >
                  <option value={0}>Seleccione un espacio</option>
                  {mockSpaces.map(space => (
                    <option key={space.id} value={space.id}>{space.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tarifa Base ($/hora)</label>
                <input
                  type="number"
                  name="baseRate"
                  value={formData.baseRate}
                  onChange={handleInputChange}
                  placeholder="ej., 50"
                  className="w-full p-3 border border-gray-300 rounded"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tarifa de Hora Pico ($/hora)</label>
                <input
                  type="number"
                  name="peakRate"
                  value={formData.peakRate}
                  onChange={handleInputChange}
                  placeholder="ej., 75"
                  className="w-full p-3 border border-gray-300 rounded"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Descuento por Volumen (%)</label>
                <input
                  type="number"
                  name="bulkDiscount"
                  value={formData.bulkDiscount}
                  onChange={handleInputChange}
                  placeholder="ej., 10"
                  className="w-full p-3 border border-gray-300 rounded"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Horas Mínimas para Descuento</label>
                <input
                  type="number"
                  name="minHours"
                  value={formData.minHours}
                  onChange={handleInputChange}
                  placeholder="ej., 4"
                  className="w-full p-3 border border-gray-300 rounded"
                  step="0.5"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-semibold transition"
              >
                {editingId ? '💾 Actualizar Regla' : '✅ Crear Regla'}
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
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <p className="text-sm text-gray-600 mt-2">
          Mostrando {filteredRules.length} de {rules.length} reglas de precios
        </p>
      </div>

      {/* Pricing Rules Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {filteredRules.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 text-left font-semibold">Nombre</th>
                <th className="p-4 text-left font-semibold">Espacio</th>
                <th className="p-4 text-left font-semibold">Tarifa Base</th>
                <th className="p-4 text-left font-semibold">Hora Pico</th>
                <th className="p-4 text-left font-semibold">Descuento</th>
                <th className="p-4 text-left font-semibold">Mín. Horas</th>
                <th className="p-4 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => {
                const space = mockSpaces.find(s => s.id === rule.spaceId)
                return (
                  <tr key={rule.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-semibold">{rule.name}</td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {space ? space.name : 'Espacio no encontrado'}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-green-600">${rule.baseRate.toFixed(2)}/h</td>
                    <td className="p-4 font-semibold text-orange-600">${rule.peakRate.toFixed(2)}/h</td>
                    <td className="p-4">{rule.bulkDiscount}%</td>
                    <td className="p-4">{rule.minHours}h</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(rule)}
                        className="text-blue-600 hover:text-blue-800 hover:underline mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(rule.id)}
                        className="text-red-600 hover:text-red-800 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-lg">No se encontraron reglas de precios</p>
            {searchTerm && <p className="text-sm text-gray-400 mt-2">Intenta con un término de búsqueda diferente</p>}
          </div>
        )}
      </div>
    </div>
  )
}
