import { INavigationItem } from '@/types'

export interface IMobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: INavigationItem[]
  className?: string
}