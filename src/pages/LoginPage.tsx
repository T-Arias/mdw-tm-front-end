import { useForm, type SubmitHandler } from "react-hook-form";
import { authService } from "../services/authService";
import { login } from "../store/auth/slice";
import { useAppDispatch } from "../hooks/store";
import { useNavigate } from "react-router";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const {email, password } = data;
            const result = await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await result.user.getIdToken();
            const response = await authService.socialLogin(firebaseToken);

            dispatch(login(response));
            navigate("/home");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result);
            
            const firebaseToken = await result.user.getIdToken();

            const data = await authService.socialLogin(firebaseToken);

            dispatch(login(data));
            navigate("/home");
        } catch (error) {
            console.error("Google login failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-white mb-6">
                    Iniciar sesión
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            {...register("email", {
                                required: "Email requerido",
                                minLength: { value: 15, message: "Mínimo 15 caracteres" },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-400 text-sm mt-1">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="text-red-400 text-sm mt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-all"
                    >
                        Ingresar
                    </button>
                </form>

                <div className="mt-4 text-center text-gray-400 text-sm">
                    o continúa con
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <button
                        type="button"
                        onClick={loginWithGoogle}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-all w-full flex items-center justify-center gap-2"
                    >
                        Continuar con Google
                    </button>
                </div>
            </div>
        </div>
    );
}