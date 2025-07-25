import { INavigationItem } from '@/types'

export interface IHeaderProps {
  navigationItems: INavigationItem[]
  isTransparent?: boolean
  className?: string
}