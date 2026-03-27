import { ref } from 'vue'

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration: number
  dismissible: boolean
}

export interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  dismissible?: boolean
}

// Singleton reactive array — shared across all consumers
const toasts = ref<Toast[]>([])

let counter = 0

function generateId(): string {
  return `toast-${++counter}-${Date.now()}`
}

export function useToast() {
  function toast(options: ToastOptions): string {
    const id = generateId()
    const entry: Toast = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 5000,
      dismissible: options.dismissible ?? true,
    }

    toasts.value = [...toasts.value, entry]

    if (entry.duration > 0) {
      setTimeout(() => dismiss(id), entry.duration)
    }

    return id
  }

  function success(title: string, description?: string): string {
    return toast({ title, description, variant: 'success' })
  }

  function error(title: string, description?: string): string {
    return toast({ title, description, variant: 'danger' })
  }

  function info(title: string, description?: string): string {
    return toast({ title, description, variant: 'info' })
  }

  function warning(title: string, description?: string): string {
    return toast({ title, description, variant: 'warning' })
  }

  function dismiss(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function dismissAll() {
    toasts.value = []
  }

  return { toasts, toast, success, error, info, warning, dismiss, dismissAll }
}
