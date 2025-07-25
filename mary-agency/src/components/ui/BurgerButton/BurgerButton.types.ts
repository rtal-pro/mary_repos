export interface IBurgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
  size?: 'small' | 'medium' | 'large'
}