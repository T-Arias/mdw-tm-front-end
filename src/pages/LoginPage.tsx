import { useForm, type SubmitHandler } from "react-hook-form";
import { authService } from "../services/authService";
import { login } from "../store/auth/slice";
import { useAppDispatch } from "../hooks/store";
import { useNavigate } from "react-router";

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
            const response = await authService.login(data);
            if (response) {
                dispatch(login(response));
                navigate("/home");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    console.log('render');

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
                                maxLength: { value: 50, message: "Máximo 50 caracteres" },
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
                                Contraseña requerida
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
            </div>
        </div>
    );
}