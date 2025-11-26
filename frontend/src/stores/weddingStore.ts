import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// API base URL - adjust based on your backend deployment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Types
import type { ToBuyItem } from '@/types/toBuyItem'
import type { BoughtItem } from '@/types/boughtItem'
export const useWeddingStore = defineStore('wedding', () => {
  // State
  const toBuyItems = ref<ToBuyItem[]>([])
  const boughtItems = ref<BoughtItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const totalToBuyPrice = computed(() => {
    return toBuyItems.value.reduce((sum, item) => sum + item.price, 0)
  })

  const totalBoughtPrice = computed(() => {
    return boughtItems.value.reduce((sum, item) => sum + item.price, 0)
  })

  const totalPrice = computed(() => totalToBuyPrice.value + totalBoughtPrice.value)

  const boughtByAlaa = computed(() => {
    return boughtItems.value.filter((item) => item.boughtBy === 'alaa')
  })

  const boughtByMohamed = computed(() => {
    return boughtItems.value.filter((item) => item.boughtBy === 'mohamed')
  })

  // Helper: Handle API errors
  const handleError = (err: unknown) => {
    const message = err instanceof Error ? err.message : 'An unknown error occurred'
    error.value = message
    console.error('Error:', message)
    throw err
  }

  // ===================================
  // TO BUY ITEM FUNCTIONS
  // ===================================

  /**
   * Fetch all items to buy
   */
  const fetchToBuyItems = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tobuy`)
      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to fetch items')
      }

      toBuyItems.value = json.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Add a new item to the toBuy list
   */
  const addToBuyItem = async (name: string, price: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tobuy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price }),
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to add item')
      }

      toBuyItems.value.unshift(json.data)
      return json.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update a toBuy item
   */
  const updateToBuyItem = async (id: string, updates: Partial<ToBuyItem>) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tobuy/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to update item')
      }

      // Update local state
      const index = toBuyItems.value.findIndex((item) => item._id === id)
      if (index !== -1) {
        toBuyItems.value[index] = json.data
      }

      return json.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a toBuy item (item is NOT moved to bought)
   */
  const deleteToBuyItem = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tobuy/${id}`, {
        method: 'DELETE',
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to delete item')
      }

      // Remove from local state
      toBuyItems.value = toBuyItems.value.filter((item) => item._id !== id)
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  // ===================================
  // BOUGHT ITEM FUNCTIONS
  // ===================================

  /**
   * Fetch all bought items
   */
  const fetchBoughtItems = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/bought`)
      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to fetch items')
      }

      boughtItems.value = json.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Move an item from toBuy to bought
   * Deletes from toBuy and creates in Bought
   */
  const markAsBought = async (toBuyId: string, boughtBy: 'alaa' | 'mohamed') => {
    loading.value = true
    error.value = null
    try {
      // Get the item from toBuy
      const toBuyItem = toBuyItems.value.find((item) => item._id === toBuyId)
      if (!toBuyItem) {
        throw new Error('Item not found in toBuy list')
      }

      // Create in Bought
      const boughtResponse = await fetch(`${API_URL}/bought`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: toBuyItem.name,
          price: toBuyItem.price,
          boughtBy,
        }),
      })

      const boughtJson = await boughtResponse.json()

      if (!boughtJson.success) {
        throw new Error(boughtJson.error || 'Failed to mark as bought')
      }

      // Delete from toBuy
      await deleteToBuyItem(toBuyId)

      // Add to local bought items
      boughtItems.value.unshift(boughtJson.data)

      return boughtJson.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Add a new bought item directly
   */
  const addBoughtItem = async (name: string, price: number, boughtBy: 'alaa' | 'mohamed') => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/bought`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, boughtBy }),
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to add bought item')
      }

      boughtItems.value.unshift(json.data)
      return json.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update a bought item
   */
  const updateBoughtItem = async (id: string, updates: Partial<BoughtItem>) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/bought/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to update item')
      }

      // Update local state
      const index = boughtItems.value.findIndex((item) => item._id === id)
      if (index !== -1) {
        boughtItems.value[index] = json.data
      }

      return json.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a bought item
   */
  const deleteBoughtItem = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/bought/${id}`, {
        method: 'DELETE',
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Failed to delete item')
      }

      // Remove from local state
      boughtItems.value = boughtItems.value.filter((item) => item._id !== id)
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Move a bought item back to toBuy (undo purchase)
   */
  const undoPurchase = async (boughtId: string) => {
    loading.value = true
    error.value = null
    try {
      // Get the item from bought
      const boughtItem = boughtItems.value.find((item) => item._id === boughtId)
      if (!boughtItem) {
        throw new Error('Item not found in bought list')
      }

      // Create in ToBuy
      const toBuyResponse = await fetch(`${API_URL}/tobuy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: boughtItem.name,
          price: boughtItem.price,
        }),
      })

      const toBuyJson = await toBuyResponse.json()

      if (!toBuyJson.success) {
        throw new Error(toBuyJson.error || 'Failed to undo purchase')
      }

      // Delete from Bought
      await deleteBoughtItem(boughtId)

      // Add to local toBuy items
      toBuyItems.value.unshift(toBuyJson.data)

      return toBuyJson.data
    } catch (err) {
      handleError(err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Clear all errors
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    toBuyItems,
    boughtItems,
    loading,
    error,

    // Computed
    totalToBuyPrice,
    totalBoughtPrice,
    totalPrice,
    boughtByAlaa,
    boughtByMohamed,

    // Methods - ToBuy
    fetchToBuyItems,
    addToBuyItem,
    updateToBuyItem,
    deleteToBuyItem,

    // Methods - Bought
    fetchBoughtItems,
    addBoughtItem,
    updateBoughtItem,
    deleteBoughtItem,

    // Methods - Cross-list
    markAsBought,
    undoPurchase,

    // Utility
    clearError,
  }
})
