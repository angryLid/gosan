import { WithChildren } from '@/typings/props'
import Navbar from './navbar'
 
export default function Layout({ children }: WithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      
    </>
  )
}