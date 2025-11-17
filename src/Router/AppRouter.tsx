import { Navigate, Route, Routes } from 'react-router'
import { DashboardComponent } from '../components/DashboardComponent'
import { AdminComponent } from '../components/AdminComponent'
import { ProtectedRouter } from './ProtectedRouter'
import Login from '../pages/LoginPage'
import { useAppSelector } from '../hooks/store'

export const AppRouter = () => {
    const user = useAppSelector(state => state.auth.user);
    console.log(user);
    

    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRouter isAllowed={!!user} />}>
                <Route path="/home" element={<DashboardComponent />} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/admin" element={<AdminComponent />} />
            </Route>
            <Route path="/analytics" element={
                <ProtectedRouter isAllowed={!!user && user.role.includes('ADMIN')} redirectTo="/about">
                    <h1>Analytics</h1>
                </ProtectedRouter>} />
            <Route path='/*' element={<Navigate to="/login" />} />
        </Routes>
    )
}
