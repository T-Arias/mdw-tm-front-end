import { Link } from "react-router"

export const DashboardComponent = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <nav>
        <Link to={'/home'}>Home</Link>
        <Link to={'/admin'}>Admin</Link>
        <Link to={'/analytics'}>analytics</Link>
        <Link to={'/home'}>Home</Link>
      </nav>
    </>
  )
}
